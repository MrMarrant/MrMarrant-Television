import { Channel, ChannelType } from './types';
import React from 'react';

export const CHANNELS: Channel[] = [
  { number: 1, name: "GUIDE", type: ChannelType.GUIDE, description: "Channel Listings" },
  { number: 2, name: "BIO", type: ChannelType.PROFILE, description: "Featured Profile" },
  { number: 3, name: "PROJECTS", type: ChannelType.PROJECTS, description: "Project Showcase" },
  { number: 4, name: "LINKS", type: ChannelType.SCP, description: "[REDACTED]" },
  { number: 5, name: "ARTS", type: ChannelType.ART, description: "Media Gallery" },
  { number: 6, name: "NEWS", type: ChannelType.ARTICLES, description: "Fun Articles" },
];

export const MUSICS: string[] = [
  "",
  "/sounds/guide_channel.mp3",
  "/sounds/bio_channel.mp3",
  "/sounds/project_channel.mp3",
  "/sounds/link_channel.mp3",
  "/sounds/art_channel.mp3",
  "/sounds/article_channel.mp3"
]

export const Redacted: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <span className="bg-black text-black hover:bg-transparent hover:text-black transition-colors duration-300 px-1 cursor-help select-none">
        {children || "REDACTED"}
    </span>
);

export const Loading: React.FC = () => (
    <div className="flex h-[80vh] items-center justify-center bg-black">
      <span className="text-white text-3xl tracking-[0.3em] animate-pulse">
        LOADING
      </span>
    </div>
);

export const TOTAL_CHANNELS = CHANNELS.length;
export const MAX_VOLUME = 10;

export const SoulIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#FF0000" className="inline-block mr-4 scale-150">
        <path d="M10 18l-1-1C4 12 1 9 1 5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 7-8 12l-1 1z" />
    </svg>
);