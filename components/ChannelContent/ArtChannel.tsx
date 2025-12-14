import React, { useState } from 'react';
import { useData } from '../../lib/useData';

const ArtChannel: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { art } = useData("art");

  return (
    <div className="w-full h-full bg-neutral-900 overflow-y-auto relative art-scrollbar">
      {/* Custom scrollbar hiding for clean TV look */}
      <style>{`
        .art-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 border-b border-white/10 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-white font-tech text-xl tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            Digital Gallery
        </h1>
        <div className="text-xs text-neutral-400 font-mono">[CURATED_BY_AI]</div>
      </div>

      {/* Gallery Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 pb-20">
        {art.map((item) => (
          <button 
            key={item.id}
            onClick={() => setSelectedImage(item.url)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/5 hover:border-pink-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <div className="absolute inset-0 bg-neutral-800 animate-pulse"></div>
            <img 
              src={item.url} 
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
            {/* Overlay Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-xs font-mono tracking-wider border-l-2 border-pink-500 pl-2">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Zoom Modal Overlay */}
      {selectedImage && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
           
           {/* Close area (background click) */}
           <div className="absolute inset-0" onClick={() => setSelectedImage(null)}></div>

           <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <img 
                    src={selectedImage} 
                    alt="Zoomed Art"
                    className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-sm pointer-events-auto"
                />
           </div>

           {/* Close Button */}
           <button 
             onClick={() => setSelectedImage(null)}
             className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-all hover:rotate-90 z-50 border border-white/10"
           >
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
           
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono tracking-widest pointer-events-none">
               VIEWING_MODE: FULL_SCREEN
           </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ArtChannel;