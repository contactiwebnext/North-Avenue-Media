export type ArticleCategory =
  | "Beauty"
  | "Culture"
  | "Business"
  | "Innovation"
  | "Trends"
  | "People"
  | "Global";

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  publishedAt: string;
  readTime: string;
  author: Author;
  heroImage: string;
  caption?: string;
  pullQuote?: string;
  content: string[];
  keyTakeaways?: string[];
  tags: string[];
  isCoverStory?: boolean;
  isBreaking?: boolean;
  viewsCount?: string;
}

export interface GlobalEvent {
  id: string;
  title: string;
  category: "Summit" | "Fashion Week" | "Symposium" | "Awards" | "Expo";
  city: string;
  country: string;
  region: "Europe" | "Americas" | "Asia-Pacific" | "Middle East";
  venue: string;
  dates: string;
  startDateISO: string;
  heroImage: string;
  description: string;
  keyTopics: string[];
  speakersCount: number;
  expectedAttendees: string;
  isFeatured?: boolean;
}

export interface InsightReport {
  id: string;
  title: string;
  quarter: string;
  year: number;
  category: "Market Index" | "Biotech Report" | "Consumer Shift" | "Investment Analysis";
  summary: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
    isPositive?: boolean;
  }[];
  keyFindings: string[];
  readTime: string;
  downloadSize: string;
}

export interface InnovationItem {
  id: string;
  title: string;
  sector: "Biotechnology" | "Spatial Media" | "AI Formulations" | "Neuro-Cosmetics" | "Circular Packaging";
  status: "In Market" | "Clinical Trials" | "Patented" | "Beta Launch";
  tagline: string;
  description: string;
  breakthrough: string;
  image: string;
  metrics: { label: string; value: string };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  grounded?: boolean;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category: "Partnerships" | "Media" | "Events" | "Advertising" | "General Inquiries";
  message: string;
}
