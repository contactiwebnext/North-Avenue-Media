import React, { useState, useEffect } from "react";
import { X, Bookmark, Share2, Volume2, VolumeX, Clock, Check, ArrowRight, Type, Sparkles } from "lucide-react";
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"normal" | "large" | "xl">("normal");
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case "large":
        return "text-base sm:text-lg leading-relaxed";
      case "xl":
        return "text-lg sm:text-xl leading-loose";
      default:
        return "text-sm sm:text-base leading-relaxed";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-4xl bg-[#0A0A0A] border border-[#C5A059]/30 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Floating Top Reader Bar */}
        <div className="sticky top-0 z-20 px-6 py-3.5 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#FDFCF8] text-[10px] font-bold uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">• {article.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio narration toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? "bg-[#C5A059] text-black font-bold"
                  : "bg-white/5 text-neutral-300 hover:text-white"
              }`}
              title="Toggle audio recitation"
            >
              {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAudio ? "Playing Briefing" : "Listen (AI Voice)"}</span>
            </button>

            {/* Font size switcher */}
            <button
              onClick={() => {
                if (fontSizeLevel === "normal") setFontSizeLevel("large");
                else if (fontSizeLevel === "large") setFontSizeLevel("xl");
                else setFontSizeLevel("normal");
              }}
              className="p-1.5 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
              title="Adjust typography scale"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded-lg transition-all ${
                isBookmarked ? "bg-[#C5A059] text-black" : "bg-white/5 text-neutral-300 hover:text-white"
              }`}
              title="Save to reading list"
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-white/5 text-neutral-300 hover:text-white relative"
              title="Copy article link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white ml-2"
              title="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Wave Bar when playing */}
        {isPlayingAudio && (
          <div className="bg-[#141414] px-6 py-2 border-b border-[#C5A059]/30 flex items-center justify-between text-xs text-[#C5A059] font-mono animate-pulse">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              AI Synthesizing Audio Dossier: {article.title.slice(0, 45)}...
            </span>
            <span>24 kHz High Fidelity</span>
          </div>
        )}

        {/* Article Content Body */}
        <div className="overflow-y-auto p-6 sm:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
              {article.subtitle}
            </p>

            {/* Author Byline */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#C5A059]/50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-[#FDFCF8]">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-neutral-400">{article.author.role}</p>
                </div>
              </div>

              <div className="text-right text-xs text-neutral-400">
                <span>Published on {article.publishedAt}</span>
                <p className="text-[11px] text-[#C5A059] mt-0.5">{article.viewsCount || "18K"} Reads</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-white/10">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {article.caption && (
            <p className="text-xs text-neutral-400 italic text-center -mt-4">
              {article.caption}
            </p>
          )}

          {/* Pull Quote */}
          {article.pullQuote && (
            <blockquote className="my-8 p-6 rounded-2xl bg-[#141414] border-l-4 border-[#C5A059] text-lg sm:text-xl font-serif-luxury italic text-[#E5D7BF] leading-relaxed">
              "{article.pullQuote}"
            </blockquote>
          )}

          {/* Paragraphs with Drop Cap */}
          <div className={`space-y-6 text-neutral-200 ${getFontSizeClass()}`}>
            {article.content.map((p, pIdx) => (
              <p
                key={pIdx}
                className={pIdx === 0 ? "editorial-dropcap leading-relaxed" : "leading-relaxed"}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Key Strategic Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl glass-panel border border-[#C5A059]/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block">
                Executive Takeaways
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {article.keyTakeaways.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-10 border-t border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl text-[#FDFCF8]">Related Intelligence</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-4 rounded-xl glass-panel border border-white/10 hover:border-[#C5A059]/50 transition-all cursor-pointer group flex items-center gap-4"
                  >
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C5A059]">
                        {rel.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors line-clamp-2 mt-0.5">
                        {rel.title}
                      </h4>
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
