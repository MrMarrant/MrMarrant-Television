import { Channel, ChannelType, SiteData } from './types';
import React from 'react';

export const CHANNELS: Channel[] = [
  { number: 1, name: "GUIDE", type: ChannelType.GUIDE, description: "Channel Listings" },
  { number: 2, name: "BIO", type: ChannelType.PROFILE, description: "Featured Profile" },
  { number: 3, name: "PROJECTS", type: ChannelType.PROJECTS, description: "Project Showcase" },
  { number: 4, name: "LINKS", type: ChannelType.SCP, description: "[REDACTED]" },
  { number: 5, name: "ARTS", type: ChannelType.ART, description: "Media Gallery" },
];

export const MUSICS: string[] = [
  "",
  "/sounds/guide_channel.mp3",
  "/sounds/bio_channel.mp3",
  "/sounds/project_channel.mp3",
  "/sounds/link_channel.mp3",
  "/sounds/art_channel.mp3"
]

export const Redacted: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <span className="bg-black text-black hover:bg-transparent hover:text-black transition-colors duration-300 px-1 cursor-help select-none">
        {children || "REDACTED"}
    </span>
);

export const TOTAL_CHANNELS = CHANNELS.length;
export const MAX_VOLUME = 10;