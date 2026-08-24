import React from "react";
import { X, Bookmark, Trash2, ArrowUpRight, Clock } from "lucide-react";
import { Article } from "../types";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onRemoveBookmark: (articleId: string) => void;
  onReadArticle: (article: Article) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onRemoveBookmark,
  onReadArticle,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-md bg-[#0A0A0A] border-l border-[#C5A059]/30 h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif-luxury text-xl text-[#FDFCF8]">Saved Reading List</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookmarks List */}
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20 text-neutral-400 space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-neutral-600" />
              <p className="text-sm font-medium">Your reading list is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Bookmark articles across the platform to review research and editorial stories offline.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 rounded-xl glass-panel border border-white/5 hover:border-[#C5A059]/40 transition-all flex flex-col justify-between group"
                >
                  <div
                    onClick={() => {
                      onReadArticle(article);
                      onClose();
                    }}
                    className="cursor-pointer space-y-1.5"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059]">
                      {article.category}
                    </span>
                    <h4 className="font-serif-luxury text-base text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-1">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-xs">
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="text-neutral-500 hover:text-red-400 flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={() => {
                        onReadArticle(article);
                        onClose();
                      }}
                      className="text-[#C5A059] font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]"
                    >
                      <span>Open Story</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {bookmarkedArticles.length > 0 && (
          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-neutral-400 hover:text-red-400 transition-colors"
            >
              Clear All ({bookmarkedArticles.length})
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
