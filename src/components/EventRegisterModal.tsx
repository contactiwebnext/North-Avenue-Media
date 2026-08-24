import React, { useState } from "react";
import { X, Calendar, MapPin, Sparkles, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { GlobalEvent } from "../types";
import confetti from "canvas-confetti";

interface EventRegisterModalProps {
  event: GlobalEvent | null;
  onClose: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ event, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [passType, setPassType] = useState<"Executive VIP" | "Press Accreditation" | "Speaker Candidate">("Executive VIP");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: `${organization} (${role})`,
          category: "Events",
          message: `Registration request for [${event.title} - ${event.dates}] Pass Type: ${passType}`,
        }),
      });

      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#c5a880", "#fbf9f5"],
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
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

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#FDFCF8]">Accreditation Dossier Received</h3>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Your delegate credentials request for <strong>{event.title}</strong> has been assigned to our Event Secretariat. Official confirmation will be delivered to <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#C5A059]/15 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest">
                {event.category} REGISTRATION
              </span>
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl text-[#FDFCF8] leading-snug">
                {event.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-[#C5A059] mt-1.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.dates}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.city}, {event.country}
                </span>
              </div>
            </div>

            {/* Pass Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Requested Pass Type
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["Executive VIP", "Press Accreditation", "Speaker Candidate"] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setPassType(type)}
                    className={`py-2 px-2 rounded-lg border text-center transition-all text-[11px] ${
                      passType === type
                        ? "bg-[#C5A059] text-black font-bold border-[#C5A059]"
                        : "bg-[#121212] text-neutral-400 border-white/5"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Charlotte Dubois"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="c.dubois@house.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Organization / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dior / Kering / Shiseido"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Executive Title</label>
                <input
                  type="text"
                  placeholder="e.g. VP Brand Strategy"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC17B] to-[#B38D46] text-black font-bold uppercase tracking-wider text-xs hover:opacity-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Transmitting..." : "Submit Accreditation Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
