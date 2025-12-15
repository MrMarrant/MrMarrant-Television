import React from 'react';
import { CHANNELS } from '../constants';

interface RemoteProps {
  onPower: () => void;
  onChannelChange: (num: number) => void;
  onVolumeChange: (delta: number) => void;
  onChannelStep: (delta: number) => void;
  onMute: () => void;
  currentChannel: number;
}

const Remote: React.FC<RemoteProps> = ({ 
  onPower, 
  onChannelChange, 
  onVolumeChange, 
  onChannelStep,
  onMute,
  currentChannel 
}) => {
  return (
    <div className="w-64 bg-neutral-800 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.1)] border-b-8 border-r-8 border-neutral-950 flex flex-col items-center gap-6 select-none relative group transform transition-transform hover:-translate-y-1">
      {/* Texture noise overlay for plastic feel */}
      <div className="absolute inset-0 rounded-[2rem] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

      {/* Top Section: Power */}
      <div className="w-full flex justify-between items-center px-2">
        <span className="text-neutral-500 font-bold tracking-widest text-xs">SONY</span>
        <button 
          onClick={onPower}
          className="w-12 h-12 bg-red-600 rounded-full shadow-[0_4px_0_#7f1d1d,0_5px_10px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center text-white remote-btn"
          aria-label="Power"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </button>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-3 gap-3 w-full p-4 bg-neutral-900/50 rounded-xl border border-neutral-700/50">
        {CHANNELS.map((ch) => (
          <button
            key={ch.number}
            onClick={() => onChannelChange(ch.number)}
            className={`w-full aspect-square rounded-lg font-bold text-lg shadow-[0_3px_0_rgba(0,0,0,0.4)] active:shadow-none active:translate-y-[3px] transition-all flex flex-col items-center justify-center gap-1 border border-neutral-600 ${currentChannel === ch.number ? 'bg-neutral-600 text-yellow-400' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
          >
            <span>{ch.number}</span>
            <span className="text-[0.5rem] uppercase tracking-tighter opacity-70">{ch.name.slice(0,4)}</span>
          </button>
        ))}
        {/* Fillers for 3x3 grid if needed, or just numpad style */}
        {[6,7,8,9].map(n => (
            !CHANNELS.find(c => c.number === n) && (
                <button key={n} disabled className="w-full aspect-square rounded-lg bg-neutral-800 text-neutral-600 font-bold shadow-inner border border-neutral-700/30 flex items-center justify-center cursor-not-allowed p-4">
                    {n}
                </button>
            )
        ))}
      </div>

      {/* Navigation */}
      <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4 px-2">
        <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-500 text-xs font-bold">VOL</span>
            <div className="flex flex-col gap-2 w-full">
                <button onClick={() => onVolumeChange(1)} className="bg-neutral-600 w-full py-3 rounded-t-lg shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-none transition-all text-white border-t border-neutral-500">+</button>
                <button onClick={() => onVolumeChange(-1)} className="bg-neutral-600 w-full py-3 rounded-b-lg shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-none transition-all text-white border-t border-neutral-500">-</button>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-500 text-xs font-bold">CH</span>
            <div className="flex flex-col gap-2 w-full">
                <button onClick={() => onChannelStep(1)} className="bg-neutral-600 w-full py-3 rounded-t-lg shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-none transition-all text-white border-t border-neutral-500">▲</button>
                <button onClick={() => onChannelStep(-1)} className="bg-neutral-600 w-full py-3 rounded-b-lg shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-none transition-all text-white border-t border-neutral-500">▼</button>
            </div>
        </div>
      </div>

      {/* Mute Button */}
      <button 
          onClick={onMute}
          className="w-12 h-12 rounded-full bg-neutral-700 text-neutral-400 shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-[3px] active:shadow-none transition-all text-xs font-bold uppercase"
        >
          Mute
      </button>

    </div>
  );
};

export default Remote;