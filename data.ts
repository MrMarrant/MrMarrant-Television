import { SiteData } from './types';

export const DEFAULT_DATA: SiteData = {
  projects: [
    {
      id: 1,
      name: "Neon City Racer",
      description: "A high-octane cyberpunk racing game built with WebGL and React Three Fiber.",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
      techIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      link: "https://reactjs.org" 
    },
    {
      id: 2,
      name: "Quantum Chat",
      description: "End-to-end encrypted messaging platform using quantum key distribution simulation.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      techIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      link: "https://python.org"
    },
    {
      id: 3,
      name: "Eco-Scanner AI",
      description: "Mobile app that identifies recyclable materials using on-device machine learning.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      techIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      link: "https://tensorflow.org"
    },
    {
      id: 4,
      name: "Void Walker",
      description: "An immersive VR experience exploring procedural landscapes.",
      image: "https://images.unsplash.com/photo-1622979135228-5b1ed31779b2?auto=format&fit=crop&w=600&q=80",
      techIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
      link: "https://unity.com"
    }
  ],
  socials: [
    {
      id: 'NET_01',
      name: 'GitHub',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      url: 'https://github.com',
      status: 'ACTIVE',
      clearance: 'LEVEL 2'
    },
    {
      id: 'NET_02',
      name: 'Twitter (X)',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg',
      url: 'https://twitter.com',
      status: 'MONITORED',
      clearance: 'LEVEL 1'
    },
    {
      id: 'NET_03',
      name: 'LinkedIn',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
      url: 'https://linkedin.com',
      status: 'RESTRICTED',
      clearance: 'LEVEL 3'
    },
    {
      id: 'NET_04',
      name: 'Discord',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg',
      url: 'https://discord.com',
      status: 'ENCRYPTED',
      clearance: 'LEVEL 4'
    }
  ],
  art: [
    { id: 1, url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80', title: 'Abstract Waves' },
    { id: 2, url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80', title: 'Creative Paint' },
    { id: 3, url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80', title: 'Modern Shapes' },
    { id: 4, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', title: 'Neon Fluid' },
    { id: 5, url: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?auto=format&fit=crop&w=800&q=80', title: 'Digital Texture' },
    { id: 6, url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80', title: 'Cyber Mist' },
    { id: 7, url: 'https://images.unsplash.com/photo-1550100136-e074fa9dc0ea?auto=format&fit=crop&w=800&q=80', title: 'Void Glitch' },
    { id: 8, url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80', title: 'Neon Lights' },
  ]
};