import React from "react";
import { ArrowRight } from "lucide-react";
import { Article } from "../types";
import reportCoverImg from "../assets/images/featured_report_model_1787950706811.jpg";

interface TheLatestSectionProps {
  onReadArticle: (article: Article) => void;
  onViewAllEditorial: () => void;
  onExploreReports: () => void;
}

export const TheLatestSection: React.FC<TheLatestSectionProps> = ({
  onReadArticle,
  onViewAllEditorial,
  onExploreReports,
}) => {
  // 3 Articles strictly matching the layout in Layout.jpeg
  const latestItems = [
    {
      id: "latest-1",
      category: "REPORT",
      title: "STATE OF BEAUTY REPORT 2026",
      description: "An independent look at the forces reshaping beauty, influence and the modern consumer.",
      ctaText: "READ THE REPORT",
      isReport: true,
      image: reportCoverImg,
      badgeText: "NORTH AVENUE MEDIA\nSTATE OF BEAUTY REPORT",
    },
    {
      id: "latest-2",
      category: "EDITORIAL",
      title: "FASHION WEEK: THE BILLION DOLLAR BOREDOM",
      description: "A look at the system, the spectacle and what the industry refuses to talk about.",
      ctaText: "READ ARTICLE",
      isReport: false,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      badgeText: "FASHION WEEK:\nTHE BILLION DOLLAR BOREDOM",
    },
    {
      id: "latest-3",
      category: "CULTURE",
      title: "A NEW ERA FOR BEAUTY",
      description: "The faces, voices and movements redefining inclusivity, influence and representation.",
      ctaText: "READ ARTICLE",
      isReport: false,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      badgeText: "NORTH AVENUE MEDIA\nA NEW ERA OF BEAUTY",
    },
  ];

  const handleCardClick = (item: typeof latestItems[0]) => {
    if (item.isReport) {
      onExploreReports();
    } else {
      onReadArticle({
        id: item.id,
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: item.title,
        subtitle: item.description,
        category: item.category,
        publishedAt: "August 2026",
        readTime: "6 min read",
        author: {
          name: "North Avenue Editorial Board",
          role: "Senior Intelligence Desk",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
        },
        heroImage: item.image,
        caption: item.title,
        pullQuote: item.description,
        content: [
          item.description,
          "The global beauty and fashion matrix is undergoing structural reinvention. Modern brands are abandoning conventional marketing tropes to build authentic cultural resonance and rigorous clinical transparency.",
          "As high-society consumers and digital native audiences merge, the definition of influence has evolved from vanity metrics to meaningful cultural capital."
        ],
        keyTakeaways: [
          "Consumer skepticism has driven a 40% increase in demand for verifiable brand authority.",
          "Luxury buyers prioritize bespoke cultural storytelling over ubiquitous legacy branding."
        ],
        tags: [item.category, "Fashion", "Beauty", "Culture"],
        viewsCount: "28.4K"
      });
    }
  };

  return (
    <section id="latest" className="bg-white py-14 sm:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Layout.jpeg: "THE LATEST" and "VIEW ALL EDITORIAL →" */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-neutral-200">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black uppercase">
            THE LATEST
          </h2>

          <button
            onClick={onViewAllEditorial}
            className="group flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-black hover:text-neutral-600 transition-colors"
          >
            <span>VIEW ALL EDITORIAL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Grid matching Layout.jpeg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-10 sm:pt-12">
          {latestItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group cursor-pointer flex flex-col justify-between border border-neutral-200 bg-white p-6 sm:p-7 hover:border-black transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Category Tag */}
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-red-700">
                  {item.category}
                </span>

                {/* Article / Report Title */}
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-black group-hover:opacity-80 transition-opacity leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row: CTA Link on left, Thumbnail Card on right */}
              <div className="pt-8 flex items-end justify-between gap-4 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-black group-hover:translate-x-1 transition-transform pb-2">
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Miniature Visual Magazine/Report Thumbnail */}
                <div className="w-24 sm:w-28 h-32 sm:h-36 relative overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0 shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                  <div className="absolute inset-0 p-2 flex flex-col justify-between text-white text-[8px] leading-tight font-serif-luxury">
                    <span className="uppercase tracking-widest text-[6px] text-neutral-300 font-sans">
                      NORTH AVENUE
                    </span>
                    <span className="font-bold text-[8px] uppercase leading-tight line-clamp-3 text-neutral-100">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
