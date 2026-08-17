"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChannelType, TVState } from '../types';
import { MUSICS, CHANNELS, MAX_VOLUME } from '../constants';
import StaticChannel from './ChannelContent/StaticChannel';
import GuideChannel from './ChannelContent/GuideChannel';
import ArtChannel from './ChannelContent/ArtChannel';
import ProfileChannel from './ChannelContent/ProfileChannel';
import ProjectsChannel from './ChannelContent/ProjectsChannel';
import SCPChannel from './ChannelContent/SCPChannel';
import ArticlesChannel from './ChannelContent/ArticlesChannel';
import { AudioPlayer } from '../lib/audioPlayer';

interface TVProps {
  state: TVState;
  onPowerOff: () => void;
}

const Television: React.FC<TVProps> = ({ state, onPowerOff }) => {
  const [displayChannel, setDisplayChannel] = useState<number>(state.currentChannel);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isTurningOff, setIsTurningOff] = useState(false);
  const wasOn = useRef(state.isOn);

  // Handle Channel Switching Effect
  useEffect(() => {
    if (!state.isOn) return;

    setIsSwitching(true);
    const timeout = setTimeout(() => {
      setDisplayChannel(state.currentChannel);
      AudioPlayer.play("../sounds/switch_channel.mp3");
      setTimeout(() => {
        setIsSwitching(false);
        AudioPlayer.play(MUSICS[state.currentChannel]);
      }, 300); // Duration of static after switch
    }, 200); // Lag before switch

    return () => clearTimeout(timeout);
  }, [state.currentChannel, state.isOn]);

  // Handle Power Off Effect
  useEffect(() => {
    if (wasOn.current && !state.isOn) {
      setIsTurningOff(true);
      const timeout = setTimeout(() => setIsTurningOff(false), 500); // Duration of turn-off animation
      wasOn.current = state.isOn;
      return () => clearTimeout(timeout);
    }
    wasOn.current = state.isOn;
  }, [state.isOn]);

  const renderContent = () => {
    if (!state.isOn && !isTurningOff) return <div className="w-full h-full bg-black" />;

    // While switching, show static
    if (isSwitching) return <StaticChannel />;

    const channel = CHANNELS.find(c => c.number === displayChannel);
    if (!channel) return <StaticChannel />;

    switch (channel.type) {
      case ChannelType.GUIDE: return <GuideChannel />;
      case ChannelType.PROFILE: return <ProfileChannel />;
      case ChannelType.PROJECTS: return <ProjectsChannel />;
      case ChannelType.SCP: return <SCPChannel />;
      case ChannelType.ART: return <ArtChannel />;
      case ChannelType.ARTICLES: return <ArticlesChannel />;
      default: return <StaticChannel />;
    }
  };

  return (
    <div
      className="bottom-5 lg:bottom-auto relative bg-neutral-900 rounded-3xl p-4 md:p-8 shadow-2xl border-4 border-neutral-800 mx-auto transform transition-transform duration-300
          w-[min(180vw,95vh*1.333)] min-[500px]:w-[min(150vw,95vh*1.333)] min-[600px]:w-[min(95vw,95vh*1.333)]
          h-[min(95vh,95vw*1)] lg:h-[min(95vh,95vw*0.75)]
          rotate-90 lg:rotate-0"
                    // h-[min(95vh,95vw*0.75)]"
    >

      {/* The Screen Area */}
      <div className="relative w-full h-full bg-black rounded-[50px/20px] overflow-hidden shadow-inner crt-screen ring-4 ring-black ring-opacity-50">

        {/* Content Layer */}
        <div className={`w-full h-full transition-all duration-200 ${state.isOn ? 'animate-turn-on' : isTurningOff ? 'animate-turn-off' : 'opacity-0'}`}>
          {renderContent()}
        </div>

        {/* Overlay Effects (Glare, Scanlines) */}
        <div className="absolute inset-0 pointer-events-none crt-overlay z-30 opacity-50"></div>
        {state.isOn && <div className="scanline z-40"></div>}

        {/* Screen Reflection/Gloss */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-5 rounded-[50px/20px] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundSize: '200% 200%' }}></div>

        {/* OSD (On Screen Display) */}
        {state.isOn && state.showOSD && (
          <div className="absolute top-8 right-8 text-green-400 font-mono text-2xl z-50 drop-shadow-md bg-black/50 px-4 py-2 rounded border border-green-900/50 backdrop-blur-sm">
            <div>CH {state.currentChannel.toString().padStart(2, '0')}</div>
            <div className="text-sm mt-1 flex items-center">
              VOL{'|'.repeat(state.volume)} <p className="text-gray-500">{'|'.repeat((MAX_VOLUME - state.volume))} {state.volume}</p>
            </div>
            {state.isMuted && <div className="text-red-500 text-sm mt-1">MUTE</div>}
          </div>
        )}
      </div>

      {/* Power LED */}
      <div className={`absolute lg:bottom-3 md:bottom-5 right-8 md:right-12 w-2 h-2 rounded-full transition-colors duration-500 shadow-[0_0_10px_rgba(255,0,0,0.8)] ${state.isOn ? 'bg-green-500 shadow-green-500' : 'bg-red-500 shadow-red-500'}`}></div>
    </div>
  );
};

export default Television;