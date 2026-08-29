import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight, Calendar } from "lucide-react";
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-8 pt-20 animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-2xl bg-white border border-neutral-300 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50">
          <Search className="w-5 h-5 text-neutral-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search dossiers, reports, summits, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-black placeholder:text-neutral-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 bg-neutral-200 hover:bg-black hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 divide-y divide-neutral-200">
          {/* Quick Keywords */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Trending Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "State of Beauty Report",
                  "Haute Couture Paris",
                  "Biotechnology",
                  "Private Equity Beauty",
                  "Seoul Bio-Aesthetics",
                  "Milan Design Atelier",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white text-xs text-neutral-700 transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Articles */}
          {matchedArticles.length > 0 && (
            <div className="space-y-3 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black block">
                Editorial Dossiers ({matchedArticles.length})
              </span>
              <div className="space-y-2">
                {matchedArticles.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-3 bg-white border border-neutral-200 hover:border-black cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-black">
                        {art.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm font-bold text-black group-hover:opacity-80 transition-opacity">
                        {art.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Events */}
          {matchedEvents.length > 0 && (
            <div className="space-y-3 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black block">
                Global Summits ({matchedEvents.length})
              </span>
              <div className="space-y-2">
                {matchedEvents.slice(0, 3).map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onSelectEvent(evt);
                      onClose();
                    }}
                    className="p-3 bg-white border border-neutral-200 hover:border-black cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Calendar className="w-3 h-3 text-black" />
                        <span>{evt.dates} &bull; {evt.city}</span>
                      </div>
                      <h4 className="font-serif-luxury text-sm font-bold text-black group-hover:opacity-80 transition-opacity">
                        {evt.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && matchedArticles.length === 0 && matchedEvents.length === 0 && (
            <div className="text-center py-8 text-neutral-500 text-xs">
              No intelligence dossiers found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
