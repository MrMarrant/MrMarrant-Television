import React from 'react';

const SOCIAL_NETWORKS = [
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
];

const Redacted: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <span className="bg-black text-black hover:bg-transparent hover:text-black transition-colors duration-300 px-1 cursor-help select-none">
    {children || "REDACTED"}
  </span>
);

const SCPChannel: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#f4f1ea] text-neutral-900 overflow-y-auto font-mono relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>

        {/* Warning Header */}
        <div className="sticky top-0 z-10 bg-red-700 text-white text-center py-2 font-bold uppercase tracking-[0.2em] border-b-4 border-black text-xs md:text-sm shadow-md">
            ⚠ Warning: Authorized Personnel Only ⚠
        </div>

        <div className="p-8 max-w-3xl mx-auto">
            
            {/* Header */}
            <header className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase mb-1">SCP Database</h1>
                    <p className="text-sm font-bold">Item #: SCP-<Redacted>7902</Redacted></p>
                    <p className="text-sm font-bold">Object Class: <span className="text-red-700">Keter</span></p>
                </div>
                <div className="border-2 border-black p-2 max-w-[100px] rotate-2 opacity-80">
                    <div className="w-full h-full flex items-center justify-center text-center text-[0.6rem] font-bold uppercase leading-tight">
                        Secure<br/>Contain<br/>Protect
                    </div>
                </div>
            </header>

            {/* Description Body */}
            <div className="mb-8 space-y-4 text-sm md:text-base leading-relaxed text-justify">
                <p>
                    <strong>Special Containment Procedures:</strong> SCP-7902 is to be contained within a digital air-gapped server at Site-<Redacted>19</Redacted>. Access is restricted to personnel with Clearance Level 4 or higher. Any unauthorized attempts to access the following communication channels will result in immediate <Redacted>termination</Redacted>.
                </p>
                <p>
                    <strong>Description:</strong> SCP-7902 appears to be a collection of anomalous <Redacted>hyperlinks</Redacted> capable of transmitting memetic hazards through standard TCP/IP protocols. Subjects viewing these networks report an uncontrollable urge to <Redacted>follow and like</Redacted> the content.
                </p>
            </div>

            {/* Social Links List */}
            <div className="bg-white border border-neutral-400 p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]">
                <h3 className="uppercase font-bold border-b border-black pb-2 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black"></span>
                    External Communication Uplinks
                </h3>
                
                <div className="grid gap-4">
                    {SOCIAL_NETWORKS.map((net) => (
                        <a 
                            key={net.id}
                            href={net.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 border border-neutral-300 hover:bg-neutral-100 transition-colors group relative overflow-hidden"
                        >
                            {/* Icon Box */}
                            <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 border border-neutral-300 rounded-sm group-hover:border-black transition-colors">
                                <img src={net.image} alt={net.name} className="w-8 h-8 filter grayscale group-hover:filter-none transition-all" />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-lg uppercase tracking-tight group-hover:text-red-700 transition-colors">{net.name}</span>
                                    <span className={`text-[10px] px-1 border ${net.status === 'ACTIVE' ? 'border-green-600 text-green-800 bg-green-100' : 'border-red-600 text-red-800 bg-red-100'}`}>
                                        {net.status}
                                    </span>
                                </div>
                                <div className="text-xs text-neutral-500 font-mono flex gap-4">
                                    <span>ID: <Redacted>{net.id}</Redacted></span>
                                    <span>CLR: {net.clearance}</span>
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-red-700">
                                ►
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-black text-center text-xs opacity-60">
                <p>DO NOT DISCUSS OUTSIDE OF SECURE CHANNELS</p>
                <p className="mt-1 font-mono tracking-widest"><Redacted>CONFIDENTIAL</Redacted></p>
            </div>

        </div>
    </div>
  );
};

export default SCPChannel;