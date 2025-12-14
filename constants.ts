import { Channel, ChannelType } from './types';

export const CHANNELS: Channel[] = [
  { number: 1, name: "GUIDE", type: ChannelType.GUIDE, description: "Channel Listings" },
  { number: 2, name: "BIO", type: ChannelType.PROFILE, description: "Featured Profile" },
  { number: 3, name: "SHOW", type: ChannelType.PROJECTS, description: "Project Showcase" },
  { number: 4, name: "SCP", type: ChannelType.SCP, description: "[REDACTED]" },
  { number: 5, name: "ARTS", type: ChannelType.ART, description: "Generative Art" },
];

export const TOTAL_CHANNELS = CHANNELS.length;
export const MAX_VOLUME = 10;
export const MRMARRANT_DATAS = await fetch("https://pastebin.com/raw/3UkfrnXe")
console.log(MRMARRANT_DATAS)