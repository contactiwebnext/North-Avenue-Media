import React, { useState } from "react";
import { TrendingUp, FileText, Download, CheckCircle, ArrowRight, BarChart3, PieChart, ShieldCheck } from "lucide-react";
import { InsightReport } from "../types";

interface IndustryInsightsSectionProps {
  reports: InsightReport[];
  onDownloadReport: (report: InsightReport) => void;
}

export const IndustryInsightsSection: React.FC<IndustryInsightsSectionProps> = ({
  reports,
  onDownloadReport,
}) => {
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const activeReport = reports[activeReportIndex] || reports[0];

  return (
    <section id="insights" className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>MARKET INTELLIGENCE & RESEARCH</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FDFCF8] font-normal">
              Industry Insights & Quarterly Index
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm font-sans">
            Proprietary research, private equity valuation multiples, and formulation chemistry market forecasts vetted by our global analytical desk.
          </p>
        </div>

        {/* Intelligence Hub Grid: Report Selector + Dynamic Executive Briefing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Report Tabs list */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
              Featured Research Reports
            </span>
            {reports.map((rep, idx) => {
              const isActive = activeReportIndex === idx;
              return (
                <div
                  key={rep.id}
                  onClick={() => setActiveReportIndex(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? "bg-[#161616] border-[#C5A059] shadow-[0_0_25px_rgba(197,160,89,0.2)]"
                      : "bg-[#121212]/80 border-white/5 hover:border-[#C5A059]/30 hover:bg-[#181818]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#E5D7BF] text-[10px] font-bold uppercase tracking-widest">
                      {rep.quarter} {rep.year} • {rep.category}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-sans">{rep.readTime}</span>
                  </div>

                  <h3 className={`font-serif-luxury text-lg sm:text-xl font-medium leading-snug ${
                    isActive ? "text-[#C5A059]" : "text-[#FDFCF8]"
                  }`}>
                    {rep.title}
                  </h3>

                  <p className="text-neutral-400 text-xs mt-2 line-clamp-2 leading-relaxed font-sans">
                    {rep.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Active Report Deep Dive Dashboard */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-[#C5A059]/30 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-semibold text-xs uppercase tracking-widest text-[#FDFCF8]">
                    Executive Intelligence Dossier
                  </span>
                </div>
                <span className="text-xs text-[#C5A059] font-mono">{activeReport.downloadSize}</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFCF8] mb-4">
                {activeReport.title}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                {activeReport.summary}
              </p>

              {/* Real-time Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {activeReport.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3.5 rounded-xl bg-black/50 border border-[#C5A059]/15">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 truncate font-sans">
                      {m.label}
                    </div>
                    <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#C5A059]">
                      {m.value}
                    </div>
                    {m.change && (
                      <div className="text-[10px] text-emerald-400 font-medium mt-0.5 font-sans">
                        {m.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Findings List */}
              <div className="space-y-3 mb-8">
                <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  Key Strategic Takeaways
                </span>
                {activeReport.keyFindings.map((finding, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Verified by North Avenue Analytical Bureau</span>
              </div>

              <button
                onClick={() => onDownloadReport(activeReport)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFC17B] text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,160,89,0.25)]"
              >
                <Download className="w-4 h-4" />
                <span>Request Full Briefing PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
