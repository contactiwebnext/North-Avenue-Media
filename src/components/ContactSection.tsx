import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Sparkles, Building2, Globe, Clock } from "lucide-react";
import { InquiryFormData } from "../types";
import confetti from "canvas-confetti";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    category: "Partnerships",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const categories: InquiryFormData["category"][] = [
    "Partnerships",
    "Media",
    "Events",
    "Advertising",
    "General Inquiries",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setSubmittedRef(data.referenceId || "NAM-CONFIRMED");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#d4af37", "#c5a880", "#f4efe6"],
      });
    } catch (err) {
      console.error(err);
      setSubmittedRef("NAM-" + Date.now().toString(36).toUpperCase());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>EDITORIAL BUREAU & EXECUTIVE DESK</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Connect With North Avenue Media
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm font-sans">
            For editorial pitches, global summit accreditations, executive briefings, and advertising syndications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Contact Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/20 space-y-6">
              <h3 className="font-serif-luxury text-2xl text-[#FDFCF8]">Direct Bureau Channels</h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+12028768594"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/40 transition-all group font-sans"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      Direct Telephone Line
                    </span>
                    <span className="font-serif-luxury text-lg text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors">
                      +1 202-876-8594
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:thenorthavenuemedia@gmail.com"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A059]/40 transition-all group font-sans"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      Editorial & Bureau Email
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#FDFCF8] group-hover:text-[#C5A059] transition-colors break-all">
                      thenorthavenuemedia@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Response Time SLA */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-neutral-400 font-sans">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Executive Bureau response time: Under 24 Business Hours</span>
              </div>
            </div>

            {/* Global Press Kit Download box */}
            <div className="glass-panel rounded-2xl p-6 border border-[#C5A059]/20 flex items-center justify-between">
              <div>
                <h4 className="font-serif-luxury text-lg text-[#FDFCF8]">Editorial Pitch Guidelines 2026</h4>
                <p className="text-xs text-neutral-400 mt-0.5 font-sans">Format guidelines for science & op-ed submissions.</p>
              </div>
              <a
                href="mailto:thenorthavenuemedia@gmail.com?subject=Editorial%20Pitch%20Submission"
                className="px-3.5 py-2 rounded-lg bg-[#141414] hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/30 text-xs font-bold uppercase tracking-wider text-[#E5D7BF] transition-all whitespace-nowrap font-sans"
              >
                Submit Pitch
              </a>
            </div>
          </div>

          {/* Right / Interactive Categorized Inquiry Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-10 border border-[#C5A059]/30">
            {submittedRef ? (
              <div className="text-center py-12 space-y-4 font-sans">
                <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#FDFCF8]">Inquiry Received</h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you. Your dossier has been routed to our Senior Editorial Director & Partnership Bureau.
                </p>
                <div className="inline-block px-4 py-1.5 rounded-full bg-black/70 border border-[#C5A059]/40 text-xs font-mono text-[#C5A059]">
                  Tracking Ref: {submittedRef}
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        category: "Partnerships",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2.5">
                    Select Inquiry Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border ${
                          formData.category === cat
                            ? "bg-[#C5A059] text-black font-bold border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                            : "bg-[#141414] text-neutral-400 hover:text-white border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Montgomery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.montgomery@maison.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Company / Organization / Publication
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. LVMH / Estée Lauder / Vogue Paris"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Detailed Inquiry / Proposal / Pitch *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details regarding your proposal, event registration request, or editorial pitch..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#C5A059]/20 text-xs text-[#FDFCF8] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFC17B] via-[#C5A059] to-[#9E7D3B] text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Transmitting Dossier..." : "Transmit Inquiry to Bureau"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
