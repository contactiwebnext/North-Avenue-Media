import React, { useState } from "react";
import { X, Sparkles, Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("Weekly Executive Dispatch");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frequency }),
      });
      setIsSuccess(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#c5a880", "#fbf9f5"],
      });
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/40 shadow-2xl bg-[#0A0A0A]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#FDFCF8]">Welcome to The Dispatch</h3>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Your subscription for <strong>{email}</strong> has been confirmed. You will receive our next curated market intelligence dossier.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
            >
              Back to Experience
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE NORTH AVENUE DISPATCH</span>
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFCF8]">
                Subscribe to Global Beauty Intelligence
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Join 45,000+ luxury executives, cosmetic chemists, venture partners, and creative directors receiving our weekly editorial analysis.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="executive@maison.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Dispatch Frequency
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {["Weekly Executive Dispatch", "Monthly Research Digest"].map((freq) => (
                  <button
                    type="button"
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`py-2 px-3 rounded-lg border text-center transition-all ${
                      frequency === freq
                        ? "bg-[#C5A059] text-black font-bold border-[#C5A059]"
                        : "bg-[#121212] text-neutral-400 border-white/5"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC17B] to-[#B38D46] text-black font-bold uppercase tracking-wider text-xs hover:opacity-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.25)]"
            >
              {isSubmitting ? "Confirming..." : "Join The Editorial Dispatch"}
            </button>

            <p className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Zero spam. Unsubscribe anytime with one click.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
