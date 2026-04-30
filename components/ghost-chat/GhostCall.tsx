'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Mic, MicOff, Phone, PhoneCall, PhoneOff, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type GhostCallUser = {
  id: string;
  displayName?: string;
  email?: string;
  isGuest?: boolean;
};

type CallState = 'idle' | 'incoming' | 'calling' | 'connecting' | 'connected';

type IncomingCall = {
  callId: string;
  callerId: string;
  callerName: string;
};

type BaseSignal = {
  callId: string;
  senderId: string;
  senderName: string;
  sentAt: string;
};

type CallSignal =
  | (BaseSignal & { kind: 'call-request' })
  | (BaseSignal & { kind: 'call-accepted' })
  | (BaseSignal & { kind: 'call-declined' })
  | (BaseSignal & { kind: 'call-ended' })
  | (BaseSignal & {
      kind: 'webrtc-offer';
      targetId: string;
      description: RTCSessionDescriptionInit;
    })
  | (BaseSignal & {
      kind: 'webrtc-answer';
      targetId: string;
      description: RTCSessionDescriptionInit;
    })
  | (BaseSignal & {
      kind: 'ice-candidate';
      targetId: string;
      candidate: RTCIceCandidateInit | null;
    })
  | (BaseSignal & {
      kind: 'media-state';
      targetId?: string;
      muted: boolean;
    });

type GhostCallProps = {
  sessionId: string;
  currentUser: GhostCallUser;
  onlineCount: number;
};

const CALL_SIGNAL_EVENT = 'ghost-call-signal';

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:global.stun.twilio.com:3478' },
];

function RemoteAudio({ stream }: { stream: MediaStream }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.srcObject = stream;
    audio.volume = 1;
    audio.muted = false;
    audio.play().catch((error) => {
      console.warn('Remote audio autoplay blocked:', error);
    });
  }, [stream]);

  return <audio ref={audioRef} autoPlay playsInline />;
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return 'Call setup failed.';
  if (error.name === 'NotAllowedError') return 'Microphone access denied.';
  if (error.name === 'NotFoundError') return 'No microphone found.';
  return error.message;
}

export default function GhostCall({
  sessionId,
  currentUser,
  onlineCount,
}: GhostCallProps) {
  const [callState, setCallState] = useState<CallState>('idle');
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isChannelReady, setIsChannelReady] = useState(false);
  const [callPeerCount, setCallPeerCount] = useState(0);
  const [callError, setCallError] = useState<string | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const [remoteNames, setRemoteNames] = useState<Record<string, string>>({});
  const [remoteMuteState, setRemoteMuteState] = useState<Record<string, boolean>>({});

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Record<string, RTCPeerConnection>>({});
  const queuedIceRef = useRef<Record<string, RTCIceCandidateInit[]>>({});
  const callStateRef = useRef<CallState>('idle');
  const activeCallIdRef = useRef<string | null>(null);
  const isMutedRef = useRef(false);
  const isChannelReadyRef = useRef(false);
  const callPeerCountRef = useRef(0);
  const currentUserRef = useRef(currentUser);
  const remoteStreamsRef = useRef<Record<string, MediaStream>>({});
  const incomingCallRef = useRef<IncomingCall | null>(null);
  const ringingTimerRef = useRef<number | null>(null);

  const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'GHOST';
  const remoteCount = Object.keys(remoteStreams).length;
  const isCallActive = callState !== 'idle' && callState !== 'incoming';
  const hasCallablePeer = callPeerCount > 1 || onlineCount > 1;

  const updateCallState = (nextState: CallState) => {
    callStateRef.current = nextState;
    setCallState(nextState);
  };

  const updateActiveCallId = (nextCallId: string | null) => {
    activeCallIdRef.current = nextCallId;
  };

  const updateMuted = (nextMuted: boolean) => {
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });
  };

  const updateChannelReady = (nextReady: boolean) => {
    isChannelReadyRef.current = nextReady;
    setIsChannelReady(nextReady);
  };

  const updateCallPeerCount = (nextCount: number) => {
    callPeerCountRef.current = nextCount;
    setCallPeerCount(nextCount);
  };

  const stopRinging = () => {
    if (ringingTimerRef.current) {
      window.clearInterval(ringingTimerRef.current);
      ringingTimerRef.current = null;
    }
  };

  const buildSignalBase = (callId: string): BaseSignal => ({
    callId,
    senderId: currentUserRef.current.id,
    senderName: displayName,
    sentAt: new Date().toISOString(),
  });

  const sendSignal = async (signal: CallSignal) => {
    const channel = channelRef.current;
    if (!channel || !isChannelReadyRef.current) {
      throw new Error('Signal channel not ready.');
    }
    const result = await channel.send({
      type: 'broadcast',
      event: CALL_SIGNAL_EVENT,
      payload: signal,
    });
    if (result !== 'ok') throw new Error(`Signal failed: ${result}`);
  };

  const sendCallRequest = async (callId: string) => {
    await sendSignal({ ...buildSignalBase(callId), kind: 'call-request' });
  };

  const startRinging = (callId: string) => {
    stopRinging();
    ringingTimerRef.current = window.setInterval(() => {
      if (activeCallIdRef.current !== callId || callStateRef.current !== 'calling') {
        stopRinging();
        return;
      }
      void sendCallRequest(callId).catch(() => {});
    }, 2000);
  };

  const closePeer = (peerId: string) => {
    peersRef.current[peerId]?.close();
    delete peersRef.current[peerId];
    delete queuedIceRef.current[peerId];

    setRemoteStreams((current) => {
      const next = { ...current };
      delete next[peerId];
      remoteStreamsRef.current = next;
      return next;
    });
    setRemoteNames((current) => {
      const next = { ...current };
      delete next[peerId];
      return next;
    });
    setRemoteMuteState((current) => {
      const next = { ...current };
      delete next[peerId];
      return next;
    });
  };

  const resetCall = (stopLocalStream = true) => {
    stopRinging();
    Object.keys(peersRef.current).forEach(closePeer);
    peersRef.current = {};
    queuedIceRef.current = {};
    remoteStreamsRef.current = {};
    incomingCallRef.current = null;

    setRemoteStreams({});
    setRemoteNames({});
    setRemoteMuteState({});
    setIncomingCall(null);
    setIsAccepting(false);
    updateActiveCallId(null);
    updateCallState('idle');
    updateMuted(false);

    if (stopLocalStream) {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
  };

  const startLocalAudio = async () => {
    if (localStreamRef.current) return localStreamRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
      video: false,
    });
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !isMutedRef.current;
    });
    localStreamRef.current = stream;
    return stream;
  };

  const flushQueuedIce = async (peerId: string) => {
    const peer = peersRef.current[peerId];
    const candidates = queuedIceRef.current[peerId] || [];
    if (!peer || !peer.remoteDescription || candidates.length === 0) return;
    queuedIceRef.current[peerId] = [];
    await Promise.all(candidates.map((c) => peer.addIceCandidate(new RTCIceCandidate(c))));
  };

  const createPeer = (peerId: string, peerName: string) => {
    if (peersRef.current[peerId]) return peersRef.current[peerId];

    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const callId = activeCallIdRef.current;

    localStreamRef.current?.getTracks().forEach((track) => {
      if (localStreamRef.current) peer.addTrack(track, localStreamRef.current);
    });

    peer.onicecandidate = ({ candidate }) => {
      const latestCallId = activeCallIdRef.current || callId;
      if (!latestCallId || !candidate) return;
      void sendSignal({
        ...buildSignalBase(latestCallId),
        kind: 'ice-candidate',
        targetId: peerId,
        candidate: candidate.toJSON(),
      }).catch(() => {});
    };

    peer.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStreams((prev) => ({ ...prev, [peerId]: stream }));
      setRemoteNames((prev) => ({ ...prev, [peerId]: peerName }));
      updateCallState('connected');
    };

    peer.onconnectionstatechange = () => {
      if (['failed', 'closed', 'disconnected'].includes(peer.connectionState)) {
        closePeer(peerId);
      }
    };

    peersRef.current[peerId] = peer;
    return peer;
  };

  const createOfferForPeer = async (peerId: string, peerName: string) => {
    const callId = activeCallIdRef.current;
    if (!callId) return;
    await startLocalAudio();
    const peer = createPeer(peerId, peerName);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await sendSignal({
      ...buildSignalBase(callId),
      kind: 'webrtc-offer',
      targetId: peerId,
      description: offer,
    });
  };

  const handleSignal = async (signal: CallSignal) => {
    if (signal.senderId === currentUserRef.current.id) return;

    switch (signal.kind) {
      case 'call-request': {
        if (callStateRef.current !== 'idle' && signal.callId !== activeCallIdRef.current) {
          void sendSignal({ ...buildSignalBase(signal.callId), kind: 'call-declined' });
          return;
        }
        const incoming = { callId: signal.callId, callerId: signal.senderId, callerName: signal.senderName };
        incomingCallRef.current = incoming;
        setIncomingCall(incoming);
        updateActiveCallId(signal.callId);
        updateCallState('incoming');
        break;
      }

      case 'call-accepted': {
        if (signal.callId !== activeCallIdRef.current) return;
        stopRinging();
        updateCallState('connecting');
        await createOfferForPeer(signal.senderId, signal.senderName);
        break;
      }

      case 'webrtc-offer': {
        if (signal.targetId !== currentUserRef.current.id) return;
        updateActiveCallId(signal.callId);
        updateCallState('connecting');
        await startLocalAudio();
        const peer = createPeer(signal.senderId, signal.senderName);
        await peer.setRemoteDescription(new RTCSessionDescription(signal.description));
        await flushQueuedIce(signal.senderId);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        await sendSignal({
          ...buildSignalBase(signal.callId),
          kind: 'webrtc-answer',
          targetId: signal.senderId,
          description: answer,
        });
        break;
      }

      case 'webrtc-answer': {
        const peer = peersRef.current[signal.senderId];
        if (!peer) return;
        await peer.setRemoteDescription(new RTCSessionDescription(signal.description));
        await flushQueuedIce(signal.senderId);
        break;
      }

      case 'ice-candidate': {
        const peer = peersRef.current[signal.senderId];
        if (!peer || !peer.remoteDescription) {
          queuedIceRef.current[signal.senderId] = [...(queuedIceRef.current[signal.senderId] || []), signal.candidate!];
          return;
        }
        await peer.addIceCandidate(new RTCIceCandidate(signal.candidate!));
        break;
      }

      case 'call-declined':
      case 'call-ended': {
        if (signal.callId === activeCallIdRef.current) resetCall();
        break;
      }
    }
  };

  const startCall = async () => {
    const callId = `${sessionId}-${Date.now()}`;
    updateActiveCallId(callId);
    updateCallState('calling');
    try {
      await startLocalAudio();
      await sendCallRequest(callId);
      startRinging(callId);
    } catch (e) {
      setCallError(getErrorMessage(e));
      resetCall();
    }
  };

  const acceptCall = async () => {
    const call = incomingCallRef.current;
    if (!call || isAccepting) return;
    setIsAccepting(true);
    try {
      await startLocalAudio();
      createPeer(call.callerId, call.callerName);
      await sendSignal({ ...buildSignalBase(call.callId), kind: 'call-accepted' });
      setIncomingCall(null);
      incomingCallRef.current = null;
      updateCallState('connecting');
    } catch (e) {
      setCallError(getErrorMessage(e));
      resetCall();
    } finally {
      setIsAccepting(false);
    }
  };

  const declineCall = async () => {
    const call = incomingCallRef.current;
    if (call) {
      await sendSignal({ ...buildSignalBase(call.callId), kind: 'call-declined' }).catch(() => {});
    }
    resetCall();
  };

  const hangUp = async () => {
    if (activeCallIdRef.current) {
      await sendSignal({ ...buildSignalBase(activeCallIdRef.current), kind: 'call-ended' }).catch(() => {});
    }
    resetCall();
  };

  const toggleMute = () => updateMuted(!isMutedRef.current);

  useEffect(() => {
    const channel = supabase.channel(`ghost_call_${sessionId}`, {
      config: { broadcast: { self: false, ack: true } },
    });
    channelRef.current = channel;
    channel
      .on('presence', { event: 'sync' }, () => updateCallPeerCount(Object.keys(channel.presenceState()).length))
      .on('broadcast', { event: CALL_SIGNAL_EVENT }, ({ payload }) => handleSignal(payload))
      .subscribe((status) => updateChannelReady(status === 'SUBSCRIBED'));

    return () => {
      supabase.removeChannel(channel);
      resetCall();
    };
  }, [sessionId]);

  return (
    <div className="flex items-center gap-2">
      {!isCallActive ? (
        <button
          onClick={startCall}
          disabled={!isChannelReady || !hasCallablePeer}
          className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs disabled:opacity-40"
        >
          {isChannelReady ? <Phone className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
          Call
        </button>
      ) : (
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 p-1 rounded-lg">
          <button onClick={toggleMute} className="p-1.5 text-zinc-300">
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button onClick={hangUp} className="p-1.5 bg-red-600 rounded-md">
            <PhoneOff className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {incomingCall && callState === 'incoming' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl w-full max-w-xs text-center shadow-2xl">
            <PhoneCall className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-white mb-6">{incomingCall.callerName}</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={declineCall} className="py-3 bg-zinc-900 rounded-xl text-zinc-400 font-bold">Decline</button>
              <button onClick={acceptCall} disabled={isAccepting} className="py-3 bg-emerald-600 rounded-xl text-white font-bold flex justify-center items-center">
                {isAccepting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      )}

      {Object.entries(remoteStreams).map(([id, stream]) => (
        <RemoteAudio key={id} stream={stream} />
      ))}
    </div>
  );
}