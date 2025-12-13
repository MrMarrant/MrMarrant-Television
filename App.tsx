import React, { useState, useCallback } from 'react';
import TV from './components/TV';
import Remote from './components/Remote';
import { TVState } from './types';
import { MAX_VOLUME, TOTAL_CHANNELS } from './constants';

export default function App() {
  const [tvState, setTvState] = useState<TVState>({
    isOn: false,
    currentChannel: 1,
    volume: 10,
    isMuted: false,
    showOSD: false,
  });

  const [showRemote, setShowRemote] = useState(true);
  const [osdTimeout, setOsdTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const triggerOSD = useCallback(() => {
    if (!tvState.isOn) return;
    
    setTvState(prev => ({ ...prev, showOSD: true }));
    if (osdTimeout) clearTimeout(osdTimeout);
    
    const timeout = setTimeout(() => {
        setTvState(prev => ({ ...prev, showOSD: false }));
    }, 3000);
    setOsdTimeout(timeout);
  }, [tvState.isOn, osdTimeout]);

  const handlePower = () => {
    setTvState(prev => ({ 
        ...prev, 
        isOn: !prev.isOn,
        showOSD: !prev.isOn // Show OSD briefly on boot
    }));
    if (!tvState.isOn) {
        // Turning on logic
        setTimeout(() => setTvState(prev => ({ ...prev, showOSD: false })), 3000);
    }
  };

  const handleChannelChange = (num: number) => {
    if (!tvState.isOn) return;
    setTvState(prev => ({ ...prev, currentChannel: num }));
    triggerOSD();
  };

  const handleChannelStep = (delta: number) => {
    if (!tvState.isOn) return;
    setTvState(prev => {
        let next = prev.currentChannel + delta;
        if (next > TOTAL_CHANNELS) next = 1;
        if (next < 1) next = TOTAL_CHANNELS;
        return { ...prev, currentChannel: next };
    });
    triggerOSD();
  };

  const handleVolumeChange = (delta: number) => {
     if (!tvState.isOn) return;
     setTvState(prev => {
         const newVol = Math.max(0, Math.min(MAX_VOLUME, prev.volume + delta));
         return { ...prev, volume: newVol, isMuted: false };
     });
     triggerOSD();
  };

  const handleMute = () => {
      if (!tvState.isOn) return;
      setTvState(prev => ({ ...prev, isMuted: !prev.isMuted }));
      triggerOSD();
  };

  return (
    <div className="h-screen w-screen bg-[#111] overflow-hidden relative flex items-center justify-center">
        {/* Environment Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,40,1)_0%,rgba(0,0,0,1)_100%)] pointer-events-none -z-10"></div>
        
        {/* Glow behind TV */}
        {tvState.isOn && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 -z-0"></div>}

        {/* TV Container - takes available space */}
        <div className="relative z-10 p-4">
            <TV state={tvState} />
        </div>

        {/* Remote Toggle Button */}
        <button 
            onClick={() => setShowRemote(!showRemote)}
            className="absolute top-4 right-4 z-50 bg-neutral-800/80 text-white p-2 rounded-full border border-neutral-600 hover:bg-neutral-700 transition-colors backdrop-blur-sm group"
            title={showRemote ? "Hide Remote" : "Show Remote"}
        >
            {showRemote ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
        </button>

        {/* Remote Overlay */}
        <div 
            className={`absolute right-4 md:right-10 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 transition-all duration-500 ease-in-out transform ${
                showRemote 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-[150%] opacity-0'
            }`}
        >
            <Remote 
                onPower={handlePower}
                onChannelChange={handleChannelChange}
                onVolumeChange={handleVolumeChange}
                onChannelStep={handleChannelStep}
                onMute={handleMute}
                currentChannel={tvState.currentChannel}
            />
        </div>
    </div>
  );
}