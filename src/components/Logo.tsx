import React from "react";

export const HOSTED_LOGO_URL = "https://kwlri12qqowyib0q.public.blob.vercel-storage.com/Logo.jpeg";

interface LogoProps {
  variant?: "full" | "monogram" | "horizontal" | "stacked" | "image";
  theme?: "dark" | "light" | "auto";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  theme = "dark",
  className = "",
  size = "md",
}) => {
  // Theme color definitions
  const fillColor =
    theme === "light"
      ? "#FFFFFF"
      : theme === "dark"
      ? "#000000"
      : "currentColor";

  const textColor =
    theme === "light"
      ? "text-white"
      : theme === "dark"
      ? "text-black"
      : "text-current";

  // Monogram geometry strictly matched to North Avenue Media logo
  const renderMonogram = (svgClassName: string = "w-6 h-6") => (
    <svg
      viewBox="0 0 170 114"
      className={svgClassName}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Topmost Horizontal Master Bar */}
      <rect x="0" y="0" width="170" height="9" />

      {/* Sub Bars - Left over N and Right over A */}
      <rect x="0" y="19" width="70" height="9" />
      <rect x="100" y="19" width="70" height="9" />

      {/* N Left Vertical Leg */}
      <rect x="0" y="19" width="9" height="95" />

      {/* N Diagonal Stroke to Center Base */}
      <polygon points="9,28 9,43 91,114 100,114 100,99 18,28" />

      {/* A Center Vertical Pillar */}
      <rect x="91" y="19" width="9" height="95" />

      {/* A Right Vertical Leg */}
      <rect x="161" y="19" width="9" height="95" />

      {/* A Horizontal Crossbar */}
      <rect x="100" y="68" width="70" height="9" />
    </svg>
  );

  if (variant === "image") {
    const sizeMap = {
      sm: "h-7",
      md: "h-9",
      lg: "h-12",
      xl: "h-16",
    };
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={HOSTED_LOGO_URL}
          alt="North Avenue Media"
          className={`${sizeMap[size] || "h-9"} object-contain ${
            theme === "dark" ? "invert mix-blend-multiply" : ""
          }`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === "monogram") {
    const sizeMap = {
      sm: "w-5 h-5",
      md: "w-7 h-7",
      lg: "w-10 h-10",
      xl: "w-14 h-14",
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderMonogram(sizeMap[size] || "w-7 h-7")}
      </div>
    );
  }

  if (variant === "stacked" || variant === "full") {
    const sizeMap = {
      sm: { icon: "w-8 h-6", text: "text-xs tracking-[0.25em]" },
      md: { icon: "w-12 h-9", text: "text-sm tracking-[0.28em]" },
      lg: { icon: "w-16 h-12", text: "text-base tracking-[0.32em]" },
      xl: { icon: "w-24 h-18", text: "text-xl tracking-[0.35em]" },
    };
    const currentSize = sizeMap[size] || sizeMap.md;

    return (
      <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
        {renderMonogram(currentSize.icon)}
        <span
          className={`font-sans font-bold uppercase ${textColor} ${currentSize.text}`}
        >
          NORTH AVENUE MEDIA
        </span>
      </div>
    );
  }

  // Default: Horizontal (Monogram + Text)
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {renderMonogram(size === "sm" ? "w-6 h-5" : size === "lg" ? "w-9 h-7" : "w-7 h-5.5")}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif-luxury font-bold tracking-[0.18em] uppercase ${textColor} ${
            size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          NORTH AVENUE
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.45em] mt-1 ${textColor}`}
        >
          MEDIA
        </span>
      </div>
    </div>
  );
};
