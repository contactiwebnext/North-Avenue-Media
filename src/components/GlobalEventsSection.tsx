import React, { useState } from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
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
    <section id="events" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>GLOBAL SUMMITS &amp; EXPERIENCES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Worldwide Event Calendar
            </h2>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedRegion === reg
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200"
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
              className="border border-neutral-200 bg-white hover:border-black transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Event Hero image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={evt.heroImage}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                      {evt.category}
                    </span>
                    <span className="px-2 py-1 bg-white/90 text-black text-[10px] uppercase font-bold tracking-wider font-sans">
                      {evt.city}, {evt.country}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-black" />
                      {evt.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-black" />
                      {evt.city}, {evt.country}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-black group-hover:opacity-80 transition-opacity leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 font-sans">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {evt.expectedAttendees}
                    </span>
                    <span className="font-bold text-black uppercase tracking-wider text-[11px]">
                      {evt.isFeatured ? "Registrations Open" : "Waitlist Available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onRegisterEvent(evt)}
                  className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Request Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
