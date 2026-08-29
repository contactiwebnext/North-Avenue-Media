import React, { useState } from "react";
import { X, Mail, CheckCircle2, ShieldCheck } from "lucide-react";
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
        colors: ["#000000", "#333333", "#C5A059"],
      });
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-lg bg-white border border-neutral-300 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-neutral-100 text-black mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-black">Welcome to Beauty Intelligence</h3>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-sans">
              Your credentials have been authenticated. You will now receive private briefings and market indexes directly in your inbox.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 font-sans">
                NORTH AVENUE MEDIA INTELLIGENCE
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-black">
                Subscribe to Beauty Intelligence
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                Join 48,000+ luxury beauty founders, creative directors, and investment partners receiving our proprietary analyses.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive@luxuryhouse.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                  Briefing Frequency
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {["Weekly Executive Dispatch", "Monthly Strategic Index"].map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`p-2.5 border text-xs font-bold uppercase tracking-wider transition-all text-center ${
                        frequency === f
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                      }`}
                    >
                      {f.replace(" Executive Dispatch", "").replace(" Strategic Index", "")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              {isSubmitting ? "Authenticating..." : "Subscribe to Beauty Intelligence"}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-sans">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Complimentary access. No promotional spam. Unsubscribe anytime.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
