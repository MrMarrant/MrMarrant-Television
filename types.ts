import React from 'react';

export enum ChannelType {
  STATIC = 'STATIC',
  GUIDE = 'GUIDE',
  IMAGE = 'IMAGE',
  NEWS_AI = 'NEWS_AI',
  STORY_AI = 'STORY_AI',
  DATA_VIZ = 'DATA_VIZ',
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
  showOSD: boolean; // On Screen Display
}

export interface RemoteButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: 'red' | 'gray' | 'blue' | 'black';
  shape?: 'circle' | 'rect';
  className?: string;
}

// Data Models
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

export type DataType = {
  [key: string]: any; // Permet d'accéder à n'importe quelle clé
};