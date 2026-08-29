import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Article } from "../types";

interface HeroSectionProps {
  coverArticle?: Article;
  onReadArticle?: (article: Article) => void;
  onExploreSection: (sectionId: string) => void;
  onPlayAudioPreview?: (article: Article) => void;
  onOpenSubscribe?: () => void;
}

const HERO_VIDEO_URL = "https://kwlri12qqowyib0q.public.blob.vercel-storage.com/Create_video_for_North_Avenue_202608250115.mp4";
const FALLBACK_POSTER = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400&auto=format&fit=crop";

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSection,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented:", err);
          setIsPlaying(false);
          const handleFirstClick = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
            window.removeEventListener("click", handleFirstClick);
          };
          window.addEventListener("click", handleFirstClick, { once: true });
        });
      }
    }
  }, []);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const newMutedState = !isMuted;
      video.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-[640px] lg:min-h-[740px] flex items-center pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Editorial Background Video Container - 50% More Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={FALLBACK_POSTER}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 transition-opacity duration-700 scale-100"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Lightweight Subtle Overlays to ensure video is 50% more visible while text stays crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />
      </div>

      {/* Video Media Control Bar: Mute/Unmute and Play/Pause */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-30 flex items-center gap-2">
        <button
          onClick={togglePlayPause}
          className="p-2 sm:px-3 sm:py-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold tracking-wider shadow-lg"
          title={isPlaying ? "Pause video" : "Play video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          id="hero-video-play-toggle"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-neutral-200 fill-current" />
              <span className="hidden md:inline text-[11px] text-neutral-200">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-white fill-current" />
              <span className="hidden md:inline text-[11px] text-white">Play</span>
            </>
          )}
        </button>

        <button
          onClick={toggleMute}
          className={`p-2 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md border transition-all flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase shadow-lg ${
            isMuted 
              ? "bg-black/60 hover:bg-black/85 border-white/20 text-neutral-200" 
              : "bg-white text-black hover:bg-neutral-200 border-white shadow-white/20"
          }`}
          title={isMuted ? "Unmute video sound" : "Mute video sound"}
          aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          id="hero-video-audio-toggle"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
              <span className="text-[11px]">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-black animate-pulse" />
              <span className="text-[11px] font-bold">Mute</span>
            </>
          )}
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-white">
          {/* Eyebrow Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
            <span>THE VOICE OF THE NEXT ERA IN BEAUTY, FASHION &amp; CULTURE</span>
          </div>

          {/* Display Headline in Bold Luxury Serif */}
          <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] uppercase mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            A NEW ERA<br />
            BEGINS.
          </h1>

          {/* Description Paragraph */}
          <p className="text-lg sm:text-xl text-neutral-100 font-normal leading-relaxed max-w-2xl mb-10 font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            North Avenue Media is an independent media platform covering the culture, business and innovation shaping the global beauty and fashion industry.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => onExploreSection("latest")}
              className="px-8 py-4 bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group shadow-xl"
              id="hero-read-latest-btn"
            >
              <span>READ THE LATEST</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onExploreSection("contact")}
              className="px-8 py-4 bg-black/40 border-2 border-white text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center backdrop-blur-sm shadow-lg"
              id="hero-partner-btn"
            >
              <span>PARTNER WITH US</span>
            </button>
          </div>

          {/* Publication Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/30 backdrop-blur-[2px]">
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block drop-shadow-md">45K+</span>
              <span className="text-xs text-neutral-200 uppercase tracking-wider block font-sans drop-shadow-sm">Industry Leaders</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block drop-shadow-md">18</span>
              <span className="text-xs text-neutral-200 uppercase tracking-wider block font-sans drop-shadow-sm">Global Summits</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block drop-shadow-md">120+</span>
              <span className="text-xs text-neutral-200 uppercase tracking-wider block font-sans drop-shadow-sm">Annual Dossiers</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white block drop-shadow-md">30+</span>
              <span className="text-xs text-neutral-200 uppercase tracking-wider block font-sans drop-shadow-sm">Global Markets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
