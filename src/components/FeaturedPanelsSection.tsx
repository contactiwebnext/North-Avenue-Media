import React from "react";
import { ArrowRight } from "lucide-react";
import reportImg from "../assets/images/featured_report_model_1787950706811.jpg";
import eventsImg from "../assets/images/featured_events_dinner_1787950721499.jpg";

interface FeaturedPanelsSectionProps {
  onExploreReport: () => void;
  onExploreWeek: () => void;
  onViewEvents: () => void;
}

export const FeaturedPanelsSection: React.FC<FeaturedPanelsSectionProps> = ({
  onExploreReport,
  onExploreWeek,
  onViewEvents,
}) => {
  const panels = [
    {
      id: "featured-report",
      tag: "FEATURED REPORT",
      title: "STATE OF BEAUTY REPORT 2026",
      desc: "Trends. Innovation. Influence. The future of beauty starts here.",
      btnText: "EXPLORE REPORT",
      image: reportImg,
      watermark: "NORTH AVENUE",
      onClick: onExploreReport,
    },
    {
      id: "featured-week",
      tag: "NORTH AVENUE WEEK",
      title: "NORTH AVENUE WEEK",
      desc: "Your front row seat to fashion, culture and everything in between.",
      btnText: "EXPLORE WEEK",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      watermark: "WEEK",
      onClick: onExploreWeek,
    },
    {
      id: "featured-events",
      tag: "GLOBAL EVENTS",
      title: "EXPERIENCES THAT INSPIRE",
      desc: "From private dinners to global activations — we create moments that move the industry.",
      btnText: "VIEW EVENTS",
      image: eventsImg,
      watermark: "EXPERIENCE",
      onClick: onViewEvents,
    },
  ];

  return (
    <section className="bg-white py-4 sm:py-6 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {panels.map((panel) => (
            <div
              key={panel.id}
              onClick={panel.onClick}
              className="group relative h-[480px] sm:h-[520px] lg:h-[560px] overflow-hidden bg-neutral-900 cursor-pointer shadow-md"
            >
              {/* Background Photographic Image */}
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85"
                referrerPolicy="no-referrer"
              />

              {/* Dark Gradient Vignette for clear typography legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/50 transition-colors duration-500" />

              {/* Watermark typography in background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <span className="font-serif-luxury text-5xl sm:text-6xl font-extrabold uppercase text-white tracking-[0.25em] text-center">
                  {panel.watermark}
                </span>
              </div>

              {/* Foreground Content */}
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end text-white z-10 space-y-4">
                {/* Category Tag */}
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-neutral-300">
                  {panel.tag}
                </span>

                {/* Heading */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-tight text-white">
                  {panel.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {panel.desc}
                </p>

                {/* Bordered Button matching Layout.jpeg */}
                <div className="pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      panel.onClick();
                    }}
                    className="px-6 py-3 border border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    {panel.btnText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
