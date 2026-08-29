import React from "react";
import { X, Bookmark, Trash2, ArrowRight, Clock } from "lucide-react";
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-md bg-white border-l border-neutral-300 h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-black" />
              <h3 className="font-serif-luxury text-xl font-bold text-black">Saved Reading List</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bookmarks List */}
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20 text-neutral-500 space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-neutral-400" />
              <p className="text-sm font-medium text-black">Your reading list is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Bookmark articles across the platform to review research and editorial stories anytime.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 border border-neutral-200 bg-neutral-50 hover:border-black transition-all flex flex-col justify-between group"
                >
                  <div
                    onClick={() => {
                      onReadArticle(article);
                      onClose();
                    }}
                    className="cursor-pointer space-y-2"
                  >
                    <span className="text-[10px] font-bold uppercase text-black">
                      {article.category}
                    </span>
                    <h4 className="font-serif-luxury text-sm font-bold text-black group-hover:opacity-80 transition-opacity">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-200">
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={() => {
                        onReadArticle(article);
                        onClose();
                      }}
                      className="text-xs font-bold text-black flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {bookmarkedArticles.length > 0 && (
          <div className="pt-6 border-t border-neutral-200">
            <button
              onClick={onClearAll}
              className="w-full py-2.5 bg-neutral-100 hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider text-neutral-700 transition-colors"
            >
              Clear All Bookmarks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
