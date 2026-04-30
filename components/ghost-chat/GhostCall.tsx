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
  | (BaseSignal & { kind: 'webrtc-offer'; targetId: string; description: RTCSessionDescriptionInit })
  | (BaseSignal & { kind: 'webrtc-answer'; targetId: string; description: RTCSessionDescriptionInit })
  | (BaseSignal & { kind: 'ice-candidate'; targetId: string; candidate: RTCIceCandidateInit | null })
  | (BaseSignal & { kind: 'media-state'; targetId?: string; muted: boolean });

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
    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);

  return <audio ref={audioRef} autoPlay playsInline />;
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return 'Call setup failed.';

  if (error.name === 'NotAllowedError') {
    return 'Microphone permission was blocked. Allow microphone access to answer the call.';
  }

  if (error.name === 'NotFoundError') {
    return 'No microphone was found on this device.';
  }

  if (error.name === 'NotReadableError') {
    return 'The microphone is already in use by another app.';
  }

  return error.message;
}

export default function GhostCall({ sessionId, currentUser, onlineCount }: GhostCallProps) {
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

  const sendCallRequest = async (callId: string) => {
    await sendSignal({
      ...buildSignalBase(callId),
      kind: 'call-request',
    });
  };

  const startRinging = (callId: string) => {
    stopRinging();

    ringingTimerRef.current = window.setInterval(() => {
      if (activeCallIdRef.current !== callId || callStateRef.current !== 'calling') {
        stopRinging();
        return;
      }

      void sendCallRequest(callId).catch((error) => {
        console.error('Call request retry failed:', error);
      });
    }, 1800);
  };

  const sendSignal = async (signal: CallSignal) => {
    const channel = channelRef.current;
    if (!channel || !isChannelReadyRef.current) {
      throw new Error('Call channel is still connecting.');
    }

    const result = await channel.send({
      type: 'broadcast',
      event: CALL_SIGNAL_EVENT,
      payload: signal,
    });

    if (result !== 'ok') {
      throw new Error(`Call signal failed: ${result}`);
    }
  };

  const buildSignalBase = (callId: string): BaseSignal => ({
    callId,
    senderId: currentUserRef.current.id,
    senderName: currentUserRef.current.displayName || currentUserRef.current.email?.split('@')[0] || 'GHOST',
    sentAt: new Date().toISOString(),
  });

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

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Audio calls need HTTPS or localhost so the browser can use the microphone.');
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
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
    await Promise.all(candidates.map((candidate) => peer.addIceCandidate(new RTCIceCandidate(candidate))));
  };

  const createPeer = (peerId: string, peerName: string) => {
    const existingPeer = peersRef.current[peerId];
    if (existingPeer) return existingPeer;

    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const callId = activeCallIdRef.current;

    localStreamRef.current?.getTracks().forEach((track) => {
      if (localStreamRef.current) {
        peer.addTrack(track, localStreamRef.current);
      }
    });

    peer.onicecandidate = ({ candidate }) => {
      const latestCallId = activeCallIdRef.current || callId;
      if (!latestCallId) return;

      void sendSignal({
        ...buildSignalBase(latestCallId),
        kind: 'ice-candidate',
        targetId: peerId,
        candidate: candidate ? candidate.toJSON() : null,
      }).catch((error) => {
        console.error('ICE candidate signal failed:', error);
      });
    };

    peer.ontrack = (event) => {
      const [stream] = event.streams;
      const remoteStream = stream || new MediaStream([event.track]);

      setRemoteStreams((current) => {
        const next = { ...current, [peerId]: remoteStream };
        remoteStreamsRef.current = next;
        return next;
      });

      setRemoteNames((current) => ({ ...current, [peerId]: peerName }));

      if (callStateRef.current !== 'connected') {
        updateCallState('connected');
      }
    };

    peer.onconnectionstatechange = () => {
      if (peer.connectionState === 'connected') {
        updateCallState('connected');
      }

      if (peer.connectionState === 'failed' || peer.connectionState === 'closed') {
        closePeer(peerId);
      }
    };

    peersRef.current[peerId] = peer;
    setRemoteNames((current) => ({ ...current, [peerId]: peerName }));
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
        if (signal.callId === activeCallIdRef.current && callStateRef.current === 'incoming') {
          setIncomingCall({
            callId: signal.callId,
            callerId: signal.senderId,
            callerName: signal.senderName,
          });
          return;
        }

        if (callStateRef.current !== 'idle') {
          await sendSignal({
            ...buildSignalBase(signal.callId),
            kind: 'call-declined',
          });
          return;
        }

        setIncomingCall({
          callId: signal.callId,
          callerId: signal.senderId,
          callerName: signal.senderName,
        });
        updateActiveCallId(signal.callId);
        updateCallState('incoming');
        break;
      }

      case 'call-accepted': {
        if (signal.callId !== activeCallIdRef.current || callStateRef.current === 'idle') return;
        if (!localStreamRef.current) return;
        if (peersRef.current[signal.senderId]) return;

        stopRinging();
        setCallError(null);
        if (callStateRef.current !== 'connected') {
          updateCallState('connecting');
        }

        await createOfferForPeer(signal.senderId, signal.senderName);
        break;
      }

      case 'call-declined': {
        if (signal.callId !== activeCallIdRef.current) return;

        setCallError(`${signal.senderName} declined the call.`);
        if (callPeerCountRef.current <= 2 && remoteStreamsRef.current && Object.keys(remoteStreamsRef.current).length === 0) {
          resetCall();
        }
        break;
      }

      case 'webrtc-offer': {
        if (signal.targetId !== currentUserRef.current.id) return;
        if (activeCallIdRef.current && signal.callId !== activeCallIdRef.current) return;

        updateActiveCallId(signal.callId);
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
        if (signal.targetId !== currentUserRef.current.id) return;
        if (signal.callId !== activeCallIdRef.current) return;

        const peer = peersRef.current[signal.senderId];
        if (!peer) return;

        await peer.setRemoteDescription(new RTCSessionDescription(signal.description));
        await flushQueuedIce(signal.senderId);
        break;
      }

      case 'ice-candidate': {
        if (signal.targetId !== currentUserRef.current.id) return;
        if (signal.callId !== activeCallIdRef.current || !signal.candidate) return;

        const peer = peersRef.current[signal.senderId];
        if (!peer) {
          queuedIceRef.current[signal.senderId] = [
            ...(queuedIceRef.current[signal.senderId] || []),
            signal.candidate,
          ];
          return;
        }

        if (!peer.remoteDescription) {
          queuedIceRef.current[signal.senderId] = [
            ...(queuedIceRef.current[signal.senderId] || []),
            signal.candidate,
          ];
          return;
        }

        await peer.addIceCandidate(new RTCIceCandidate(signal.candidate));
        break;
      }

      case 'call-ended': {
        if (signal.callId !== activeCallIdRef.current) return;

        closePeer(signal.senderId);
        setCallError(`${signal.senderName} left the call.`);

        window.setTimeout(() => {
          if (Object.keys(peersRef.current).length === 0 && callStateRef.current !== 'calling') {
            resetCall();
          }
        }, 300);
        break;
      }

      case 'media-state': {
        if (signal.callId !== activeCallIdRef.current) return;
        if (signal.targetId && signal.targetId !== currentUserRef.current.id) return;

        setRemoteMuteState((current) => ({ ...current, [signal.senderId]: signal.muted }));
        break;
      }
    }
  };

  const startCall = async () => {
    if (!hasCallablePeer) {
      setCallError('Invite someone into the session before starting a call.');
      return;
    }

    const callId = `${sessionId}-${Date.now()}-${currentUser.id}`;
    setCallError(null);
    updateActiveCallId(callId);
    updateCallState('calling');

    try {
      await startLocalAudio();
      await sendCallRequest(callId);
      startRinging(callId);
    } catch (error) {
      setCallError(getErrorMessage(error));
      resetCall();
    }
  };

  const acceptCall = async () => {
    if (!incomingCall || isAccepting) return;

    const callToAccept = incomingCall;
    setCallError(null);
    setIsAccepting(true);
    updateActiveCallId(callToAccept.callId);
    updateCallState('connecting');

    try {
      await startLocalAudio();
      await sendSignal({
        ...buildSignalBase(callToAccept.callId),
        kind: 'call-accepted',
      });

      [900, 1800].forEach((delay) => {
        window.setTimeout(() => {
          if (activeCallIdRef.current !== callToAccept.callId || callStateRef.current !== 'connecting') return;
          if (peersRef.current[callToAccept.callerId]) return;

          void sendSignal({
            ...buildSignalBase(callToAccept.callId),
            kind: 'call-accepted',
          }).catch((error) => {
            console.error('Call accept retry failed:', error);
          });
        }, delay);
      });

      setIncomingCall(null);
    } catch (error) {
      setCallError(getErrorMessage(error));
      await sendSignal({
        ...buildSignalBase(callToAccept.callId),
        kind: 'call-declined',
      }).catch(() => undefined);
      resetCall();
    } finally {
      setIsAccepting(false);
    }
  };

  const declineCall = async () => {
    if (!incomingCall) {
      resetCall();
      return;
    }

    await sendSignal({
      ...buildSignalBase(incomingCall.callId),
      kind: 'call-declined',
    }).catch(() => undefined);

    resetCall();
  };

  const hangUp = async () => {
    const callId = activeCallIdRef.current || incomingCall?.callId;

    if (callId) {
      await sendSignal({
        ...buildSignalBase(callId),
        kind: 'call-ended',
      }).catch(() => undefined);
    }

    resetCall();
  };

  const toggleMute = async () => {
    const nextMuted = !isMutedRef.current;
    const callId = activeCallIdRef.current;
    updateMuted(nextMuted);

    if (!callId) return;

    await sendSignal({
      ...buildSignalBase(callId),
      kind: 'media-state',
      muted: nextMuted,
    }).catch(() => undefined);
  };

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    remoteStreamsRef.current = remoteStreams;
  }, [remoteStreams]);

  useEffect(() => {
    if (!callError) return;

    const timer = window.setTimeout(() => setCallError(null), 4200);
    return () => window.clearTimeout(timer);
  }, [callError]);

  useEffect(() => {
    const channel = supabase.channel(`ghost_call_${sessionId}`, {
      config: {
        broadcast: { self: false, ack: true },
        presence: { key: currentUser.id },
      },
    });

    channelRef.current = channel;
    updateChannelReady(false);

    channel
      .on('presence', { event: 'sync' }, () => {
        updateCallPeerCount(Object.keys(channel.presenceState()).length);
      })
      .on('broadcast', { event: CALL_SIGNAL_EVENT }, ({ payload }) => {
        void handleSignal(payload as CallSignal).catch((error) => {
          console.error('Call signal failed:', error);
          setCallError(getErrorMessage(error));
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          updateChannelReady(true);
          await channel.track({
            user_id: currentUser.id,
            display_name: displayName,
            online_at: new Date().toISOString(),
          });
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          updateChannelReady(false);
        }
      });

    return () => {
      resetCall();
      updateChannelReady(false);
      updateCallPeerCount(0);
      channelRef.current = null;
      supabase.removeChannel(channel);
    };
    // The call channel is intentionally recreated only when the session/user identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, currentUser.id]);

  const callLabel =
    callState === 'calling'
      ? 'Calling'
      : callState === 'connecting'
        ? 'Connecting'
        : remoteCount > 0
          ? `${remoteCount + 1} live`
          : 'Live';

  return (
    <>
      <div className="flex items-center gap-1">
        {!isCallActive ? (
          <button
            type="button"
            onClick={startCall}
            disabled={!isChannelReady || !hasCallablePeer}
            title={!hasCallablePeer ? 'Waiting for another participant to be call-ready' : 'Start voice call'}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-300 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {!isChannelReady ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
            <span className="hidden sm:inline">Call</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-1 text-emerald-300">
            <div className="hidden md:flex items-center gap-1.5 px-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase">{callLabel}</span>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              className="p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={hangUp}
              title="End call"
              className="p-1.5 rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {incomingCall && callState === 'incoming' && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <PhoneCall className="h-7 w-7 text-emerald-400" />
            </div>

            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">Incoming voice call</p>
            <h2 className="mt-2 text-lg font-bold text-white">{incomingCall.callerName}</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              This call uses Wi-Fi or mobile data through the secure session.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={declineCall}
                disabled={isAccepting}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
                Decline
              </button>

              <button
                type="button"
                onClick={acceptCall}
                disabled={isAccepting}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
              >
                {isAccepting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
                {isAccepting ? 'Accepting' : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      )}

      {callError && (
        <div className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-zinc-800 bg-zinc-950/95 px-4 py-3 text-center text-xs text-zinc-300 shadow-2xl backdrop-blur">
          {callError}
        </div>
      )}

      <div className="hidden">
        {Object.entries(remoteStreams).map(([peerId, stream]) => (
          <RemoteAudio key={peerId} stream={stream} />
        ))}
      </div>

      {isCallActive && remoteCount > 0 && (
        <div className="fixed bottom-4 right-4 z-[70] hidden max-w-xs rounded-xl border border-zinc-800 bg-zinc-950/95 px-3 py-2 text-xs text-zinc-400 shadow-2xl backdrop-blur md:block">
          {Object.entries(remoteNames).map(([peerId, name]) => (
            <div key={peerId} className="flex items-center justify-between gap-4 py-1">
              <span className="truncate font-mono uppercase">{name}</span>
              <span className="text-[10px] text-zinc-600">{remoteMuteState[peerId] ? 'muted' : 'live'}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
