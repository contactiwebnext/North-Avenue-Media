import React, { useState } from "react";
import { TrendingUp, FileText, Download, CheckCircle, ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
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
    <section id="insights" className="py-20 sm:py-24 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-3 text-black text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-6 h-[1.5px] bg-black" />
              <span>MARKET INTELLIGENCE &amp; RESEARCH</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-black font-bold">
              Industry Insights &amp; Quarterly Index
            </h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-sm font-sans leading-relaxed">
            Proprietary research, private equity valuation multiples, and formulation chemistry market forecasts vetted by our global analytical desk.
          </p>
        </div>

        {/* Intelligence Hub Grid: Report Selector + Dynamic Executive Briefing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Report Tabs list */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-black block mb-2 font-sans">
              Featured Research Reports
            </span>
            {reports.map((rep, idx) => {
              const isActive = activeReportIndex === idx;
              return (
                <div
                  key={rep.id}
                  onClick={() => setActiveReportIndex(idx)}
                  className={`p-5 cursor-pointer transition-all border ${
                    isActive
                      ? "bg-neutral-50 border-black shadow-md"
                      : "bg-white border-neutral-200 hover:border-black"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                      {rep.quarter} {rep.year} &bull; {rep.category}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-sans">{rep.readTime}</span>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-black mb-1.5 leading-snug">
                    {rep.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 font-sans leading-relaxed">
                    {rep.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Selected Report Detailed Visual Card */}
          <div className="lg:col-span-7 border border-neutral-200 bg-neutral-50 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                EXECUTIVE DOSSIER
              </span>
              <span className="text-xs text-neutral-500 font-medium font-sans">
                Format: {activeReport.downloadSize || "Digital PDF"} &bull; {activeReport.readTime}
              </span>
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-black leading-tight mb-3">
                {activeReport.title}
              </h3>
              <p className="text-sm text-neutral-700 font-sans leading-relaxed">
                {activeReport.summary}
              </p>
            </div>

            {/* Metrics Snapshot */}
            {activeReport.metrics && activeReport.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {activeReport.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-white border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="font-serif-luxury text-lg font-bold text-black block mt-0.5">
                      {m.value}
                    </span>
                    {m.change && (
                      <span className="text-[10px] text-neutral-600 font-medium block">
                        {m.change}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Key Findings List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2 font-sans">
                <TrendingUp className="w-4 h-4" />
                Core Market Takeaways &amp; Findings
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {(activeReport.keyFindings || []).map((finding, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-neutral-200 text-xs text-neutral-800 flex items-start gap-2.5 font-sans leading-relaxed"
                  >
                    <CheckCircle className="w-4 h-4 text-black mt-0.5 shrink-0" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CTA */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-600 font-sans">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Verified by North Avenue Media Intelligence Bureau</span>
              </div>

              <button
                onClick={() => onDownloadReport(activeReport)}
                className="w-full sm:w-auto px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Access Full Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
