import React, { useState } from "react";
import { Play, Film, Sparkles, X, Volume2, Maximize2 } from "lucide-react";
import { GALLERY_MEDIA } from "../data/mockData";

export const MediaGallerySection: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  return (
    <section id="media-gallery" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>IMMERSIVE CINEMATIC ARCHIVE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Media Gallery & Runway Cinema
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm font-sans">
            High-definition visual recordings from Paris, Milan, and Tokyo runway backstages, distillation laboratories, and spatial exhibits.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_MEDIA.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.videoUrl) {
                  setActiveVideoUrl(item.videoUrl);
                  setVideoTitle(item.title);
                }
              }}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 hover:border-[#C5A059]/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden img-zoom-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />

                {item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#C5A059] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}

                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-[#C5A059]/30 text-[#E5D7BF] text-[10px] uppercase font-bold tracking-wider font-sans">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-serif-luxury text-base sm:text-lg text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 font-sans">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-4xl glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/40 p-2 sm:p-4">
            <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FDFCF8]">
                <Film className="w-4 h-4 text-[#C5A059]" />
                <span>{videoTitle}</span>
              </div>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
