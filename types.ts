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