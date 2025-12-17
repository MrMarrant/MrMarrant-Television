export enum ChannelType {
  STATIC = 'STATIC',
  GUIDE = 'GUIDE',
  IMAGE = 'IMAGE',
  ART = 'ART',
  PROFILE = 'PROFILE',
  PROJECTS = 'PROJECTS',
  SCP = 'SCP',
}

export interface Channel {
  number: number;
  name: string;
  type: ChannelType;
  description: string;
}

export interface TVState {
  isOn: boolean;
  currentChannel: number;
  volume: number;
  isMuted: boolean;
  showOSD: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  techIcon: string;
  link: string;
}

export interface SocialNetwork {
  id: string;
  name: string;
  image: string;
  url: string;
  status: string;
  clearance: string;
}

export interface ArtImage {
  id: number;
  url: string;
  title: string;
}

export interface SiteData {
  projects: Project[];
  socials: SocialNetwork[];
  art: ArtImage[];
}