import React, { useState, useEffect } from "react";

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-neutral-100/50 pointer-events-none"
      id="scroll-progress-container"
      aria-hidden="true"
    >
      <div
        id="scroll-progress-bar"
        className="h-full bg-black transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
