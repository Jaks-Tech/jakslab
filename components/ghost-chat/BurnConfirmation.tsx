'use client';

import { useState } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

interface BurnConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  isBurning: boolean;
}

export default function BurnConfirmation({ onConfirm, onCancel, isBurning }: BurnConfirmationProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-transparent border border-red-900/50 w-full max-w-md rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
        {/* Warning Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-[80px]" />
        
        <button 
          onClick={onCancel}
          disabled={isBurning}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-950/30 border border-red-500/30 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2 titlecase tracking-tight">Initiate Burn Sequence?</h2>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            This action is irreversible. All messages, shared files, and session metadata will be wiped from the JaksLab servers immediately.
          </p>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={isBurning}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
            >
              {isBurning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Deleting Session...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Confirm Burn
                </>
              )}
            </button>

            <button
              onClick={onCancel}
              disabled={isBurning}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </div>
    </div>
  );
}