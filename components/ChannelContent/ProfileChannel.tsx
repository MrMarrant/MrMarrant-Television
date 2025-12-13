import React from 'react';

const ProfileChannel: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#f0f0f0] text-neutral-900 font-sans overflow-y-auto relative scroll-smooth">
      {/* Hide Scrollbar but allow scrolling */}
      <style>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>

      {/* Broadcast Header Overlay */}
      <div className="sticky top-0 z-20 bg-[#f0f0f0]/95 backdrop-blur-sm border-b-2 border-red-600 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Profile</span>
            <span className="text-neutral-500 text-xs font-mono">LIVE_FEED_894</span>
        </div>
        <div className="text-red-600 font-bold text-xs animate-pulse">● REC</div>
      </div>

      <div className="max-w-3xl mx-auto p-6 md:p-10 pb-20">
        {/* Main Subject Header */}
        <header className="mb-8 border-b border-neutral-300 pb-8">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-neutral-800">
                Eleanor <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Vance</span>
            </h1>
            <p className="font-mono text-sm text-neutral-500">CHIEF XENO-ARCHITECT // SECTOR 7</p>
        </header>

        {/* Content Layout */}
        <div className="flex flex-col gap-8">
            
            {/* Lead Image */}
            <div className="relative w-full aspect-video bg-neutral-800 overflow-hidden shadow-xl rounded-sm">
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                    alt="Eleanor Vance Portrait" 
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-xs font-mono">FIG A. SUBJECT AT THE 2042 SYMPOSIUM</p>
                </div>
            </div>

            {/* Introduction Text */}
            <div className="prose prose-neutral max-w-none">
                <p className="text-lg font-serif leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-red-600">
                    In a world increasingly dominated by synthetic algorithms and cold steel, Eleanor Vance stands as a bastion of organic integration. Born in the subterranean levels of Neo-Tokyo, her early exposure to the stark lack of natural light fueled a lifelong obsession with "bioluminescent architecture."
                </p>
            </div>

            {/* Illustrations Grid */}
            <div className="grid grid-cols-2 gap-4 my-4">
                <div className="bg-white p-2 shadow-md rotate-1 transition-transform hover:rotate-0 hover:z-10 hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=400&q=80" alt="Work 1" className="w-full h-32 object-cover mb-2 grayscale hover:grayscale-0 transition-all"/>
                     <p className="text-[10px] font-mono leading-tight text-neutral-500">EARLY SKETCHES OF THE 'HIVE' STRUCTURE.</p>
                </div>
                <div className="bg-white p-2 shadow-md -rotate-1 transition-transform hover:rotate-0 hover:z-10 hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80" alt="Work 2" className="w-full h-32 object-cover mb-2 grayscale hover:grayscale-0 transition-all"/>
                     <p className="text-[10px] font-mono leading-tight text-neutral-500">COMPLETED MOSS-WALL PROTOTYPE.</p>
                </div>
            </div>

            {/* Detailed Text Sections */}
            <div className="flex flex-col gap-6">
                <section className="bg-white p-6 border-l-4 border-red-500 shadow-sm">
                    <h3 className="font-bold text-lg uppercase tracking-wide mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Strategic Choices
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                        Vance famously rejected the "Glass Spire" initiative of 2035, choosing instead to focus on retrofitting brutalist concrete structures with self-sustaining algae systems. This choice was widely criticized by the High Council but ultimately proved to be the only viable solution during the Oxygen Crisis of '38.
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600">
                        Her decision to use mycelium-based composites over carbon fiber reduced construction costs by 40% while increasing structural resilience to seismic activity.
                    </p>
                </section>

                <section className="bg-neutral-800 text-neutral-200 p-6 shadow-lg rounded-sm">
                    <h3 className="font-bold text-lg uppercase tracking-wide mb-3 text-red-400">Core Motivations</h3>
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <p className="text-sm leading-relaxed opacity-90 italic mb-4">
                                "We do not inherit the earth from our ancestors; we borrow it from our children. And right now, we are returning it broken."
                            </p>
                            <p className="text-xs leading-relaxed opacity-70">
                                Her primary motivation remains the psychological well-being of deep-urban inhabitants. Vance believes that the separation from nature is the root cause of modern societal friction.
                            </p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=200&q=80" alt="Nature" className="w-20 h-20 object-cover rounded-full border-2 border-neutral-600" />
                    </div>
                </section>
            </div>
            
            <div className="text-center mt-8 mb-4">
                <span className="inline-block w-16 h-1 bg-red-600 mb-2"></span>
                <p className="font-mono text-xs text-neutral-400">END OF FILE // ARCHIVE 2045</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileChannel;