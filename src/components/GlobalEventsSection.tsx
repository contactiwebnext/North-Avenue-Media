import React, { useState } from "react";
import { Calendar, MapPin, Users, ArrowUpRight, Sparkles, Check, Globe } from "lucide-react";
import { GlobalEvent } from "../types";

interface GlobalEventsSectionProps {
  events: GlobalEvent[];
  onRegisterEvent: (event: GlobalEvent) => void;
}

export const GlobalEventsSection: React.FC<GlobalEventsSectionProps> = ({ events, onRegisterEvent }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const filteredEvents = events.filter((evt) => {
    if (selectedRegion === "All") return true;
    return evt.region === selectedRegion;
  });

  const regions = ["All", "Europe", "Americas", "Asia-Pacific", "Middle East"];

  return (
    <section id="events" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>GLOBAL SUMMITS & CONCLAVES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Worldwide Event Calendar
            </h2>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedRegion === reg
                    ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                    : "bg-[#141414] text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Event Hero image */}
                <div className="relative aspect-[16/10] overflow-hidden img-zoom-container">
                  <img
                    src={evt.heroImage}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-widest">
                      {evt.category}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[#FDFCF8] text-[10px] uppercase tracking-wider border border-white/10 font-sans">
                      {evt.city}, {evt.country}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] font-semibold mb-2 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.dates}</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
                    {evt.title}
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 font-sans">
                    {evt.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-neutral-400 font-sans">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] mt-0.5 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{evt.expectedAttendees} • {evt.speakersCount} Keynote Leaders</span>
                    </div>
                  </div>

                  {/* Key Topics Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4 font-sans">
                    {evt.keyTopics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-neutral-300 border border-white/5"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event RSVP / Registration Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onRegisterEvent(evt)}
                  className="w-full py-2.5 rounded-xl bg-[#141414] hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/30 text-xs font-bold uppercase tracking-wider text-[#FDFCF8] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.25)] font-sans"
                >
                  <span>Request VIP Delegate Access</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
