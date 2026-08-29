import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { GALLERY_MEDIA } from "../data/mockData";

export const MediaGallerySection: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  return (
    <section id="media-gallery" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>IMMERSIVE CINEMATIC ARCHIVE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Media Gallery &amp; Runway Cinema
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-sm font-sans leading-relaxed">
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
              className="border border-neutral-200 bg-white hover:border-black transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[10px] uppercase font-bold tracking-wider font-sans">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-serif-luxury text-base font-bold text-black group-hover:opacity-80 transition-opacity">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 font-sans">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-black border border-neutral-800 rounded-none overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 text-white">
              <span className="font-serif-luxury font-bold text-sm tracking-wider uppercase">
                {videoTitle}
              </span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-1.5 hover:bg-neutral-800 rounded transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400 hover:text-white" />
              </button>
            </div>
            <div className="aspect-video">
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
