import React, { useState, useEffect } from "react";
import { Search, X, ArrowUpRight, Calendar, Sparkles, FileText } from "lucide-react";
import { Article, GlobalEvent, InsightReport } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  events: GlobalEvent[];
  insights: InsightReport[];
  onSelectArticle: (article: Article) => void;
  onSelectEvent: (event: GlobalEvent) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  events,
  insights,
  onSelectArticle,
  onSelectEvent,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.city.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-start justify-center p-4 sm:p-8 pt-20 animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#121212]">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type keywords, topics, summits, or authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#FDFCF8] placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {/* Quick Keywords */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                Trending Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Biotech Longevity",
                  "Paris Summit",
                  "Neuro-Fragrance",
                  "Zero-Trace Packaging",
                  "Private Equity M&A",
                  "Milan Conclave",
                ].map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059]/40 text-neutral-300 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Stories */}
          {matchedArticles.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Editorial Stories ({matchedArticles.length})
              </span>
              <div className="space-y-2">
                {matchedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/40 hover:bg-white/[0.04] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C5A059]">{art.category}</span>
                      <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug">
                        {art.title}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C5A059] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Global Events */}
          {matchedEvents.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Global Events & Summits ({matchedEvents.length})
              </span>
              <div className="space-y-2">
                {matchedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onSelectEvent(evt);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/40 hover:bg-white/[0.04] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        {evt.city} • {evt.dates}
                      </span>
                      <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug">
                        {evt.title}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C5A059] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && matchedArticles.length === 0 && matchedEvents.length === 0 && (
            <div className="text-center py-10 text-neutral-400">
              <p>No results found for "{query}".</p>
              <p className="text-neutral-500 text-[11px] mt-1">Try another keyword or browse our editorial categories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
