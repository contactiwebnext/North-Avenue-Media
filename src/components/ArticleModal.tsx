import React, { useState, useEffect } from "react";
import { X, Bookmark, Share2, Clock, Check, ArrowRight, Sparkles } from "lucide-react";
import { Article } from "../types";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onSelectRelated: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
  onSelectRelated,
  allArticles,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 2);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?article=${article.id}`;
    let success = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch (err) {
        // Fallback below
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }

    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-4xl bg-white border border-neutral-300 my-auto shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-xs text-neutral-500 font-sans">{article.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Share Status Notification */}
            {copiedShare && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Copied!</span>
              </div>
            )}

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 border transition-colors ${
                isBookmarked
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
              }`}
              title={isBookmarked ? "Saved in reading list" : "Save for later"}
              aria-label={isBookmarked ? "Saved in reading list" : "Save for later"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleShare}
              className={`p-2 border transition-all flex items-center gap-1.5 ${
                copiedShare
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-black hover:text-black"
              }`}
              title="Copy article link to clipboard"
              aria-label="Share article"
            >
              {copiedShare ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold sm:hidden">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-black text-white hover:bg-neutral-800 transition-colors ml-2"
              title="Close Dossier"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[21/9] sm:aspect-[2/1] overflow-hidden bg-neutral-100">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white text-xs">
            <p className="font-serif-luxury italic text-sm">{article.caption || article.title}</p>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header & Meta */}
          <div className="space-y-4 border-b border-neutral-200 pb-8">
            <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              {article.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
              {article.subtitle}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-300"
              />
              <div>
                <p className="text-sm font-bold text-black">{article.author.name}</p>
                <p className="text-xs text-neutral-500">{article.author.role}</p>
              </div>
            </div>
          </div>

          {/* Pull Quote */}
          {article.pullQuote && (
            <blockquote className="border-l-4 border-black pl-6 py-2 my-6 font-serif-luxury text-lg sm:text-xl text-neutral-900 italic bg-neutral-50 p-4">
              &ldquo;{article.pullQuote}&rdquo;
            </blockquote>
          )}

          {/* Article Text Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-neutral-800 font-sans leading-relaxed">
            {article.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-3">
              <h4 className="font-serif-luxury text-base font-bold text-black uppercase tracking-wider">
                Strategic Intelligence Takeaways
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {article.keyTakeaways.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Share and Save Dossier Action Card */}
          <div className="p-5 sm:p-6 bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h5 className="font-serif-luxury text-base sm:text-lg font-bold tracking-wide uppercase">
                Share This Intelligence Dossier
              </h5>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Distribute this report across your industry network or save it to your reading list.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className={`flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  copiedShare
                    ? "bg-emerald-500 text-black shadow-lg"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
                id="article-modal-copy-link-btn"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Article Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`px-4 py-2.5 border text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  isBookmarked
                    ? "bg-neutral-800 text-white border-neutral-700"
                    : "bg-transparent text-white border-neutral-700 hover:border-white"
                }`}
                id="article-modal-save-btn"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-neutral-200 space-y-4">
              <h4 className="font-serif-luxury text-lg font-bold text-black uppercase tracking-wider">
                Related Intelligence Dossiers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-4 border border-neutral-200 bg-white hover:border-black cursor-pointer transition-colors space-y-2 group shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase text-black">
                      {rel.category}
                    </span>
                    <h5 className="font-serif-luxury text-sm font-bold text-black group-hover:opacity-80 transition-opacity line-clamp-2">
                      {rel.title}
                    </h5>
                    <div className="flex items-center gap-1 text-xs font-bold text-black pt-1">
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
