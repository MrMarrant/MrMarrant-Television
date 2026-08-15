"use client";

import React from 'react';
import { CHANNELS } from '../../constants';

const GuideChannel: React.FC = () => {
  return (
    <div className="w-full h-full bg-blue-900 text-white font-mono-retro p-2 lg:p-8 lg:flex lg:flex-col items-center justify-center overflow-y-auto">
      <h1 className="text-4xl mb-6 text-yellow-400 border-b-4 border-yellow-400 w-full text-center pb-2">TV GUIDE</h1>
      <div className="w-full lg:max-w-lg space-y-4">
        {CHANNELS.map((ch) => (
          <div key={ch.number} className="flex justify-between items-center border-b border-blue-700 pb-2">
            <div className="flex items-center gap-4">
              <span className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 text-xl lg:text-2xl w-12 text-center rounded">
                {ch.number}
              </span>
              <span className="text-xl lg:text-2xl uppercase tracking-widest">{ch.name}</span>
            </div>
            <span className="text-xs lg:text-lg text-blue-200 text-right">{ch.description}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xl text-blue-300 animate-pulse text-center">
        USE REMOTE TO SELECT CHANNEL
      </div>
    </div>
  );
};

export default GuideChannel;