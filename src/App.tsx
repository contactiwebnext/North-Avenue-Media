import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TheLatestSection } from "./components/TheLatestSection";
import { FeaturedPanelsSection } from "./components/FeaturedPanelsSection";
import { AboutSection } from "./components/AboutSection";
import { EditorialHub } from "./components/EditorialHub";
import { GlobalEventsSection } from "./components/GlobalEventsSection";
import { IndustryInsightsSection } from "./components/IndustryInsightsSection";
import { InnovationSection } from "./components/InnovationSection";
import { MediaGallerySection } from "./components/MediaGallerySection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { AIChatbot } from "./components/AIChatbot";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { ArticleModal } from "./components/ArticleModal";
import { BookmarksDrawer } from "./components/BookmarksDrawer";
import { SearchModal } from "./components/SearchModal";
import { NewsletterModal } from "./components/NewsletterModal";
import { EventRegisterModal } from "./components/EventRegisterModal";
import { ARTICLES_DATA, GLOBAL_EVENTS_DATA, INSIGHTS_DATA, INNOVATIONS_DATA } from "./data/mockData";
import { Article, GlobalEvent, InsightReport, InnovationItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<GlobalEvent | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [subscribeOpen, setSubscribeOpen] = useState<boolean>(false);

  // Local storage bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("nam_bookmarks");
      return saved ? JSON.parse(saved) : ["art-1"];
    } catch {
      return ["art-1"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("nam_bookmarks", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Check URL query parameters for direct article link
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get("article");
      if (articleId) {
        const found = ARTICLES_DATA.find((a) => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
        }
      }
    } catch {
      // Ignored
    }
  }, []);
  useEffect(() => {
    const sectionIds = ["hero", "latest", "about", "editorial", "events", "insights", "innovation", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  const bookmarkedArticles = ARTICLES_DATA.filter((a) => bookmarkedIds.includes(a.id));
  const coverArticle = ARTICLES_DATA.find((a) => a.isCoverStory) || ARTICLES_DATA[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between font-sans relative">
      {/* Scroll Progress Bar at the absolute top of the viewport */}
      <ScrollProgress />

      {/* Top Fixed Navigation: White Background, Black North Avenue Media Branding */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenSubscribe={() => setSubscribeOpen(true)}
        bookmarksCount={bookmarkedIds.length}
      />

      {/* Main Page Flow Matching Layout.jpeg */}
      <main className="flex-1">
        {/* 1. Hero Section: Split 2-Column with Pure White Canvas & Luxury Serif Headline */}
        <HeroSection
          coverArticle={coverArticle}
          onReadArticle={(art) => setSelectedArticle(art)}
          onExploreSection={handleNavigate}
          onPlayAudioPreview={(art) => setSelectedArticle(art)}
          onOpenSubscribe={() => setSubscribeOpen(true)}
        />

        {/* 2. THE LATEST Section (3-Column Editorial Cards matching Layout.jpeg) */}
        <TheLatestSection
          onReadArticle={(art) => setSelectedArticle(art)}
          onViewAllEditorial={() => handleNavigate("editorial")}
          onExploreReports={() => handleNavigate("insights")}
        />

        {/* 3. Featured 3-Panel Editorial Grid (State of Beauty, North Avenue Week, Global Events) */}
        <FeaturedPanelsSection
          onExploreReport={() => handleNavigate("insights")}
          onExploreWeek={() => handleNavigate("editorial")}
          onViewEvents={() => handleNavigate("events")}
        />

        {/* 4. About Section: Mission & Global Bureau Footprint */}
        <AboutSection />

        {/* 5. Editorial Hub: Categorized Archive & In-Depth Search */}
        <EditorialHub
          articles={ARTICLES_DATA}
          onReadArticle={(art) => setSelectedArticle(art)}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedIds={bookmarkedIds}
        />

        {/* 6. Global Events: Summits & Conclaves in Paris, New York, Milan, Tokyo */}
        <GlobalEventsSection
          events={GLOBAL_EVENTS_DATA}
          onRegisterEvent={(evt) => setSelectedEvent(evt)}
        />

        {/* 7. Industry Insights & Market Intelligence Index */}
        <IndustryInsightsSection
          reports={INSIGHTS_DATA}
          onDownloadReport={(rep) => {
            setSelectedArticle(ARTICLES_DATA[0]);
          }}
        />

        {/* 8. Innovation & Future Tech */}
        <InnovationSection
          innovations={INNOVATIONS_DATA}
          onSelectInnovation={(item) => {
            const related = ARTICLES_DATA.find((a) => a.category === "Innovation") || ARTICLES_DATA[0];
            setSelectedArticle(related);
          }}
        />

        {/* 9. Media Gallery & Runway Cinema */}
        <MediaGallerySection />

        {/* 10. Contact & Partnership Bureau */}
        <ContactSection />
      </main>

      {/* Footer matching Layout.jpeg with 3 columns, newsletter form, social links, and iWebNext attribution */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSubscribe={() => setSubscribeOpen(true)}
      />

      {/* Floating AI Chatbot Concierge (Powered by Gemini) */}
      <AIChatbot />

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTop />

      {/* Full Editorial Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onSelectRelated={(art) => setSelectedArticle(art)}
        allArticles={ARTICLES_DATA}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onRemoveBookmark={handleToggleBookmark}
        onReadArticle={(art) => setSelectedArticle(art)}
        onClearAll={handleClearBookmarks}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES_DATA}
        events={GLOBAL_EVENTS_DATA}
        insights={INSIGHTS_DATA}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onSelectEvent={(evt) => setSelectedEvent(evt)}
      />

      {/* Newsletter Subscription Modal */}
      <NewsletterModal
        isOpen={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />

      {/* Global Summit Registration Modal */}
      <EventRegisterModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
