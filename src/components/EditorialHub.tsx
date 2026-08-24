import React, { useState, useMemo } from "react";
import { Search, Bookmark, Clock, ArrowUpRight, Filter, Sparkles, SlidersHorizontal, Check } from "lucide-react";
import { Article, ArticleCategory } from "../types";

interface EditorialHubProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: string[];
}

const CATEGORIES: ("All" | ArticleCategory)[] = [
  "All",
  "Beauty",
  "Culture",
  "Business",
  "Innovation",
  "Trends",
  "People",
  "Global",
];

export const EditorialHub: React.FC<EditorialHubProps> = ({
  articles,
  onReadArticle,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArticleCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === "All" || art.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        searchQuery === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <section id="editorial" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>THE EDITORIAL DISPATCH</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Stories & Cultural Intelligence
            </h2>
          </div>

          {/* Search bar inside hub */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stories, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] placeholder:text-neutral-500 focus:outline-none focus:border-[#C5A059] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                    : "bg-[#141414] text-neutral-400 hover:text-[#FDFCF8] hover:bg-[#1C1C1C] border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        {displayedArticles.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl">
            <p className="font-serif-luxury text-2xl text-neutral-300">No stories match your criteria</p>
            <p className="text-xs text-neutral-500 mt-2 font-sans">Try adjusting your keyword search or category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 px-4 py-2 rounded-lg bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, idx) => {
              const isSaved = bookmarkedIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/18 hover:border-[#C5A059]/45 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Hero image with zoom */}
                    <div
                      onClick={() => onReadArticle(article)}
                      className="relative aspect-[16/10] overflow-hidden cursor-pointer img-zoom-container"
                    >
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />

                      {/* Category badge */}
                      <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#0A0A0A]/85 backdrop-blur-md border border-[#C5A059]/30 text-[#E5D7BF] text-[10px] font-bold uppercase tracking-widest">
                        {article.category}
                      </span>

                      {/* Bookmark button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-[#C5A059] text-black"
                            : "bg-[#0A0A0A]/70 text-neutral-300 hover:text-white hover:bg-black"
                        }`}
                        title={isSaved ? "Remove from bookmarks" : "Save for later"}
                        aria-label="Bookmark story"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Content area */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] text-neutral-400 mb-2.5 font-sans">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C5A059]" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                      </div>

                      <h3
                        onClick={() => onReadArticle(article)}
                        className="font-serif-luxury text-xl sm:text-2xl text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug cursor-pointer mb-2.5 line-clamp-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-sans">
                        {article.subtitle}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2 font-sans">
                        {article.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-neutral-400 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer with Author and Read Trigger */}
                  <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-black/20 font-sans">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#C5A059]/30"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs text-neutral-300 font-medium truncate max-w-[120px]">
                        {article.author.name}
                      </span>
                    </div>

                    <button
                      onClick={() => onReadArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] group-hover:text-[#DFC17B] group-hover:translate-x-0.5 transition-all uppercase tracking-wider"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > displayedArticles.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#C5A059]/30 hover:border-[#C5A059] text-xs font-bold uppercase tracking-widest text-[#FDFCF8] transition-all shadow-md"
            >
              Load More Editorial Stories ({filteredArticles.length - displayedArticles.length} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
