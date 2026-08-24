import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#121212]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#FDFCF8] hover:text-black hover:bg-[#C5A059] shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] transition-all group hover:-translate-y-1 active:scale-95 font-sans"
      title="Scroll back to top"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
    </button>
  );
};
