import React, { useState } from "react";
import { X, Calendar, MapPin, CheckCircle2, ShieldCheck, Send } from "lucide-react";
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
        colors: ["#000000", "#333333", "#C5A059"],
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
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

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-neutral-100 text-black mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-black">
              Accreditation Requested
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-sans">
              Thank you, {name}. Your delegate application for <strong>{event.title}</strong> has been received. Our summit protocol committee will review your dossier.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 font-sans">
                SUMMIT REGISTRATION
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-black mt-1">
                {event.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-neutral-600 mt-2 font-sans">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  {event.dates}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  {event.city}, {event.country}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1 font-sans">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Ross"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1 font-sans">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="j.ross@hautebeauty.com"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1 font-sans">
                  Organization / House
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. LVMH Beauty"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1 font-sans">
                  Title / Position
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Chief Brand Officer"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                Pass Classification
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Executive VIP", "Press Accreditation", "Speaker Candidate"] as const).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPassType(p)}
                    className={`py-2 px-2 text-[10px] font-bold uppercase tracking-wider border transition-all text-center ${
                      passType === p
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Submitting Application..." : "Request Accreditation"}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-sans">
              <ShieldCheck className="w-3 h-3" />
              <span>Accreditation is subject to confirmation by North Avenue Media.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
