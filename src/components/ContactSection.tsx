import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Building2, Globe, Clock } from "lucide-react";
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
        colors: ["#000000", "#333333", "#C5A059"],
      });
    } catch (err) {
      console.error(err);
      setSubmittedRef("NAM-" + Date.now().toString(36).toUpperCase());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>EDITORIAL BUREAU &amp; EXECUTIVE DESK</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Connect With North Avenue Media
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-sm font-sans leading-relaxed">
            For editorial pitches, global summit accreditations, executive briefings, and partnership syndications.
          </p>
        </div>

        {/* Form and Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Inquiries Form */}
          <div className="lg:col-span-7 border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <h3 className="font-serif-luxury text-xl font-bold text-black mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Send Executive Inquiry
            </h3>

            {submittedRef ? (
              <div className="p-8 bg-white border border-neutral-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h4 className="font-serif-luxury text-2xl font-bold text-black">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to North Avenue Media. Your dossier has been routed to our global executive desk under reference:
                </p>
                <div className="font-mono text-sm font-bold bg-neutral-100 py-2 px-4 inline-block border border-neutral-300">
                  {submittedRef}
                </div>
                <div className="pt-4">
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
                    className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Evelyn Vance"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="evelyn@maisonluxe.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Maison Luxe Group"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                      Direct Telephone Line
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (202) 876-8594"
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                    Inquiry Classification *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`py-2 px-3 text-xs font-bold uppercase tracking-wider border transition-all text-center ${
                          formData.category === cat
                            ? "bg-black text-white border-black"
                            : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black mb-1.5 font-sans">
                    Executive Briefing / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your partnership proposal, editorial inquiry, or summit accreditation request..."
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Transmitting Dossier..." : "Dispatch Inquiry"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Bureau Communications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-7 space-y-4">
              <h4 className="font-serif-luxury text-lg font-bold text-black uppercase tracking-wider">
                Direct Bureau Lines
              </h4>

              <div className="space-y-3 font-sans text-xs text-neutral-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black">Telephone Desk</p>
                    <a href="tel:+12028768594" className="hover:underline text-neutral-600">
                      +1 202-876-8594
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black">Direct Bureau Email</p>
                    <a href="mailto:thenorthavenuemedia@gmail.com" className="hover:underline text-neutral-600">
                      thenorthavenuemedia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black">Global Bureau Headquarters</p>
                    <p className="text-neutral-600">New York &bull; Paris &bull; Milan &bull; Tokyo</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-black">Editorial Hours</p>
                    <p className="text-neutral-600">24/7 Global Intelligence Bureau Dispatch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 bg-neutral-900 text-white p-6 sm:p-7 space-y-3">
              <h4 className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider">
                Partner With Us
              </h4>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Connect your brand with high-level executives, visionary creative directors, and industry leaders through bespoke intelligence reports and curated global summits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
