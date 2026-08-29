import React, { useState, useMemo } from "react";
import { Search, Bookmark, Clock, ArrowRight } from "lucide-react";
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
    <section id="editorial" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>EDITORIAL ARCHIVE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Stories &amp; Cultural Intelligence
            </h2>
          </div>

          {/* Search bar inside hub */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stories, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-500 focus:outline-none focus:border-black transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-500 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-neutral-200">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((art) => {
            const isBookmarked = bookmarkedIds.includes(art.id);
            return (
              <div
                key={art.id}
                onClick={() => onReadArticle(art)}
                className="group cursor-pointer flex flex-col justify-between border border-neutral-200 bg-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={art.heroImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                      {art.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(art.id);
                    }}
                    className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200 transition-colors ${
                      isBookmarked ? "text-red-600 font-bold" : "text-neutral-600 hover:text-black"
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-sans">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                      <span>&bull;</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl font-bold text-black group-hover:opacity-80 transition-opacity leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                      {art.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-neutral-300"
                      />
                      <span className="text-xs text-neutral-700 font-medium font-sans">
                        {art.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-1 transition-transform">
                      <span>READ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredArticles.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
