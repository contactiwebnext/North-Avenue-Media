import { Article, GlobalEvent, InsightReport, InnovationItem } from "../types";

export const ARTICLES_DATA: Article[] = [
  {
    id: "art-1",
    slug: "cellular-longevity-and-the-biotech-redefinition-of-luxury-skincare",
    title: "Cellular Longevity & The Biotech Redefinition of Luxury Skincare",
    subtitle: "How epigenetic reprogramming and bio-fermented peptides are replacing traditional anti-aging marketing with verifiable cellular science.",
    category: "Innovation",
    publishedAt: "August 24, 2026",
    readTime: "7 min read",
    author: {
      name: "Sébastien Laurent",
      role: "Editor-at-Large, Global Science & Aesthetics",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      bio: "Covering biotechnology convergence and luxury formulation chemistry across Paris and Zurich."
    },
    heroImage: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1400&auto=format&fit=crop",
    caption: "Microscopic lipid crystallization in next-generation cellular delivery systems at the Alpine Bio-Lab, Geneva.",
    pullQuote: "Longevity is no longer an abstract promise of time paused—it is the engineering of cellular resilience, shifting luxury skincare from cosmetic illusion to precision biology.",
    content: [
      "For three decades, prestige beauty relied on poetic narratives of rare orchids and Himalayan waters. Today, the fulcrum of authority has irreversibly shifted toward cellular longevity and epigenetic engineering.",
      "The $680-billion global beauty market is undergoing a seismic realignment. Consumers who once bought into heritage branding are now demanding clinical metabolomic profiles, transcriptomic validation, and proven telomere protection.",
      "At the vanguard of this shift are biotech ventures fusing synthetic biology with bespoke dermatological delivery. Proprietary peptide lattices, bio-identical exosomes, and NAD+ precursors are no longer niche lab concepts; they represent the new baseline for luxury efficacy.",
      "As consumer intelligence rises alongside bio-tracking wearables, formulas that merely hydrate will lose prestige shelf space to formulations designed to alter mitochondrial kinetics at the dermal layer."
    ],
    keyTakeaways: [
      "Epigenetic skincare represents a projected 28.4% CAGR through 2030 in ultra-prestige categories.",
      "Clinical transparency and mitochondrial biomarker testing are becoming non-negotiable standards.",
      "Luxury consumers increasingly view skincare as preventative longevity medicine rather than topical adornment."
    ],
    tags: ["Biotech", "Longevity", "Luxury Skincare", "Science", "Epigenetics"],
    isCoverStory: true,
    isBreaking: true,
    viewsCount: "34.2K"
  },
  {
    id: "art-2",
    slug: "the-haute-parfumerie-renaissance-algorithmic-sillage-and-neuro-olfaction",
    title: "Algorithmic Sillage: The High-Art Fragrance Revolution Meets Neuro-Olfaction",
    subtitle: "Artisanal master perfumers in Grasse and Tokyo collaborate with neuro-imaging labs to compose scents that trigger targeted limbic states.",
    category: "Beauty",
    publishedAt: "August 21, 2026",
    readTime: "5 min read",
    author: {
      name: "Elena Vance",
      role: "Senior Fragrance & Olfactory Critic",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
    caption: "Bespoke flacons featuring hand-blown obsidian crystal and hydro-distilled rare vetiver fractions.",
    pullQuote: "Perfume is the most primal architecture of memory. When paired with neural resonance mapping, it becomes a conscious emotional tuning device.",
    content: [
      "In the sun-drenched terraced hills of Grasse, tradition is encountering computational precision. While hand-harvested centifolia roses remain sacrosanct, the formulation matrix now incorporates neuro-olfactive telemetry.",
      "Independent luxury houses are deploying fMRI-guided scent trials to measure theta wave induction and emotional resonance, crafting fragrances engineered to stimulate calm, vigilance, or deep nostalgic intimacy.",
      "This marks the dawn of 'functional haute parfumerie'—where artistic olfactory storytelling is heightened, not diminished, by psychological science."
    ],
    keyTakeaways: [
      "Functional neuro-fragrances grew 42% in niche prestige retail over the past 18 months.",
      "The intersection of natural botanical distillates and algorithmic ratio testing creates longer-lasting sillage.",
      "Consumers prioritize bespoke identity over ubiquitous designer mass-market releases."
    ],
    tags: ["Haute Parfumerie", "Neuro-Olfaction", "Grasse", "Luxury Fragrance"],
    viewsCount: "22.8K"
  },
  {
    id: "art-3",
    slug: "the-seoul-milan-corridor-hyper-aesthetic-packaging-and-circular-materials",
    title: "The Seoul–Milan Axis: Zero-Trace Monomaterials and Sculptural Packaging",
    subtitle: "How the convergence of Italian industrial design and Korean polymer innovation is dismantling plastic obsolescence without sacrificing tactile grandeur.",
    category: "Innovation",
    publishedAt: "August 19, 2026",
    readTime: "6 min read",
    author: {
      name: "Marcus K. Chen",
      role: "Industrial Design & Circularity Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    caption: "Cast mycelium and infinitely recycled anodized aluminum cosmetic compacts showcased at Milan Design Biennale.",
    pullQuote: "True luxury cannot exist alongside permanence of waste. The ultimate modern flex is heavy tactile elegance that vanishes cleanly into circular streams.",
    content: [
      "The cosmetic industry generates over 120 billion units of packaging annually, much of it multi-layer composite plastics impossible to recycle. That status quo has met its match in the new Seoul–Milan design syndicate.",
      "Design ateliers in Milan are teaming with bio-polymer chemical synthesizers in Daejeon to engineer infinitely recyclable heavy-weight aluminum flacons, bio-glass derivatives, and algae-resin compacts.",
      "The result is a new aesthetic standard: cold-touch metallic heft, magnetic fluid closures, and modular refills that elevate vanity rituals while achieving authentic closed-loop certifications."
    ],
    keyTakeaways: [
      "100% monomaterial refills reduce supply chain emissions by up to 64%.",
      "Consumers rank tactile weight and refill satisfaction as primary luxury signals.",
      "Upcoming EU packaging directives will penalize multi-resin assemblies starting Q1 2027."
    ],
    tags: ["Circular Luxury", "Packaging", "Milan", "Seoul", "Sustainability"],
    viewsCount: "19.4K"
  },
  {
    id: "art-4",
    slug: "global-beauty-capital-private-equity-and-the-next-generation-of-indie-conglomerates",
    title: "Global Beauty Capital: Why Sovereign Funds Are Betting on Founder-Led Prestige",
    subtitle: "An analytical breakdown of M&A activity, private equity valuations, and why agility outperforms legacy holding companies in capturing Gen-Z & Alpha loyalty.",
    category: "Business",
    publishedAt: "August 16, 2026",
    readTime: "8 min read",
    author: {
      name: "Camille Delacroix",
      role: "Head of Financial Intelligence & M&A",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    caption: "The evolving landscape of luxury mergers and private equity syndicates in Paris and London.",
    pullQuote: "The days of 10-brand legacy empires moving slowly are ending. Agile, community-anchored prestige houses command 18x EBITDA multiples because they possess genuine cultural custody.",
    content: [
      "Venture and sovereign wealth allocations toward beauty and wellness intelligence platforms reached historic parity with software tech in late 2025.",
      "Investors are zeroing in on high-retention clinical portfolios and clean color formulations that command organic community advocacy without excessive customer acquisition costs.",
      "The winners are not the conglomerates of old, but specialized micro-conglomerates providing unified supply-chain infrastructure while preserving autonomous founder creative direction."
    ],
    keyTakeaways: [
      "Prestige indie beauty EBITDA multiples averaged 16.8x in the latest quarter.",
      "Direct-to-consumer is giving way to high-touch experiential department store concepts in Dubai and Tokyo.",
      "Cultural authenticity and rapid formula iteration outweigh 50-year heritage narratives."
    ],
    tags: ["Business", "M&A", "Private Equity", "Finance", "Conglomerates"],
    viewsCount: "28.1K"
  },
  {
    id: "art-5",
    slug: "spatial-beauty-and-digital-sensory-identities",
    title: "Spatial Beauty & The Rise of Photorealistic Digital Dermis",
    subtitle: "From Apple Vision ecosystems to mixed-reality fashion weeks, avatar beauty and hyper-real digital makeup are generating direct revenue streams.",
    category: "Trends",
    publishedAt: "August 14, 2026",
    readTime: "4 min read",
    author: {
      name: "Kenji Takahashi",
      role: "Digital Media & Spatial Culture Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    caption: "Volumetric light diffusion and digital skin shader rendering for luxury spatial runway avatars.",
    pullQuote: "We are entering a dual-reality era where an individual's evening skincare regimen and their digital spatial identity are curated with equal reverence.",
    content: [
      "Digital beauty is no longer flat Instagram filters; it has matured into real-time sub-surface light scattering shaders and reactive digital cosmetics.",
      "High-fashion luxury houses are releasing dual-tier collections: physical formulations paired with cryptographically verified spatial digital cosmetics worn seamlessly in high-fidelity mixed reality environments.",
      "This opens unprecedented creative headroom for surreal textures—liquid chrome lips, bioluminescent eyelid pigments, and zero-gravity hair sculpts."
    ],
    keyTakeaways: [
      "Spatial beauty asset sales represent an emerging $4.2B virtual luxury asset class.",
      "Top cosmetic brands are employing 3D shader artists alongside cosmetic chemists.",
      "Gen-Z consumers report equal satisfaction in virtual cosmetic expression as real-world styling."
    ],
    tags: ["Spatial Media", "Trends", "Digital Beauty", "Web3", "Metaverse"],
    viewsCount: "16.7K"
  },
  {
    id: "art-6",
    slug: "the-middle-east-fragrance-conclave-modern-oud-and-global-perfumery",
    title: "The Middle East Olfactory Renaissance: Modern Oud & Global Connoisseurship",
    subtitle: "How Gulf perfumers in Dubai and Riyadh are transforming centuries of artisanal distillation into the world's most coveted contemporary scent codes.",
    category: "Global",
    publishedAt: "August 11, 2026",
    readTime: "6 min read",
    author: {
      name: "Amira Al-Mansoor",
      role: "Middle East Bureau Chief, Luxury Culture",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop",
    caption: "Aged wild oud wood chips undergoing artisanal copper steam distillation in Dubai.",
    pullQuote: "In the Middle East, fragrance is not an accessory you put on when leaving the house; it is the spiritual hospitality and poetic identity of the home.",
    content: [
      "Western fragrance houses used to treat Middle Eastern oud as an exotic seasonal flanker. Today, the global center of olfactory authority is actively anchored in Dubai and Riyadh.",
      "A new cohort of young Gulf perfumers is blending heritage wild dehn al oud and Taif rose with crisp solar aldehydes and crystalline amber molecules, creating a hyper-modern aesthetic that is redefining European luxury boutiques.",
      "This cultural confidence is backed by the world’s highest per-capita fragrance consumption and a discerning consumer base that evaluates sillage and ingredient purity with unprecedented rigor."
    ],
    keyTakeaways: [
      "The Gulf fragrance market maintains the highest global spend per capita at $380/annum.",
      "Heritage ingredient transparency and sustainable wild agarwood cultivation lead investment.",
      "Global luxury conglomerates are establishing dedicated research bureaus in Dubai."
    ],
    tags: ["Global", "Dubai", "Oud", "Fragrance", "Culture"],
    viewsCount: "31.9K"
  },
  {
    id: "art-7",
    slug: "in-conversation-with-dr-isabella-rossi-on-microbiome-restoration",
    title: "The Visionary Profile: Dr. Isabella Rossi on Re-Wilding the Cutaneous Microbiome",
    subtitle: "A deep dive with the Milan-based biochemist pioneering living postbiotic ecosystems that cure chronic skin inflammation at the cellular root.",
    category: "People",
    publishedAt: "August 08, 2026",
    readTime: "9 min read",
    author: {
      name: "Sébastien Laurent",
      role: "Editor-at-Large, Global Science & Aesthetics",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    caption: "Dr. Isabella Rossi at her Milan research facility conducting lipid barrier integrity spectrometry.",
    pullQuote: "We spent sixty years sterilizing our skin with harsh foaming detergents. The future of radiant health is not sterilization—it is cultivating a thriving micro-jungle.",
    content: [
      "Sitting in her minimalist Milanese lab overlooking the Navigli, Dr. Isabella Rossi displays the quiet conviction of someone who has solved a puzzle that baffled the cosmetic establishment for half a century.",
      "Her breakthrough lies in stabilized live commensal bacterial strains that symbiotically colonize human skin, regulating pH and neutralizing inflammatory cytokine cascades in real time.",
      "In this comprehensive interview, Dr. Rossi discusses the end of aggressive chemical exfoliants, the rise of circadian dermal chronobiology, and why true beauty begins with ecological harmony."
    ],
    keyTakeaways: [
      "Postbiotic skincare eliminates dependency on harsh topical steroids and active acids.",
      "Skin barrier microbiome diversity directly correlates with slower optical aging.",
      "Formulation technology now allows live micro-organisms to remain stable at room temperature."
    ],
    tags: ["People", "Interview", "Microbiome", "Science", "Milan"],
    viewsCount: "25.6K"
  },
  {
    id: "art-8",
    slug: "the-culture-of-clean-from-virtue-signaling-to-verifiable-biochemistry",
    title: "The Post-Clean Beauty Manifesto: Rejecting Fear-Marketing for Validated Biochemistry",
    subtitle: "Why the modern luxury consumer is abandoning meaningless 'chemical-free' labels in favor of green chemistry, bio-fermentation, and evidence-based efficacy.",
    category: "Culture",
    publishedAt: "August 04, 2026",
    readTime: "5 min read",
    author: {
      name: "Elena Vance",
      role: "Senior Fragrance & Olfactory Critic",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    heroImage: "https://images.unsplash.com/photo-1512290900672-1f48074900a6?q=80&w=1200&auto=format&fit=crop",
    caption: "Sustainable bioreactor cultivation of rare marine algae without ocean harvesting.",
    pullQuote: "The phrase 'chemical-free' was always a scientific absurdity. Water is a chemical. Modern luxury celebrates intelligent, safe, green chemistry.",
    content: [
      "The first wave of 'clean beauty' was driven by anxiety and exclusionary ingredient blacklists. Today, that rhetoric is widely dismissed by discerning consumers who understand the power of synthetic biology.",
      "Modern sustainability means bioreactor-fermented squalane that saves sharks, lab-grown vanilla that preserves rainforests, and precision-synthesized actives that outperform raw botanicals without irritating sensitive skin.",
      "We are officially in the era of 'smart green'—where high performance and environmental ethics coexist seamlessly through molecular precision."
    ],
    keyTakeaways: [
      "76% of luxury beauty consumers favor lab-synthesized sustainable bio-identical ingredients over wild harvesting.",
      "Clinical peer-reviewed trials are now required by premier department store buyers.",
      "Green chemistry patents in beauty increased by 130% year-over-year."
    ],
    tags: ["Culture", "Green Chemistry", "Sustainability", "Clean Beauty"],
    viewsCount: "20.3K"
  }
];

export const GLOBAL_EVENTS_DATA: GlobalEvent[] = [
  {
    id: "evt-paris-2026",
    title: "Paris Beauty Tech & Longevity Summit",
    category: "Summit",
    city: "Paris",
    country: "France",
    region: "Europe",
    venue: "Palais de Tokyo, 13 Avenue du Président Wilson",
    dates: "October 14–16, 2026",
    startDateISO: "2026-10-14T09:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
    description: "The world's premier gathering of cosmetic scientists, luxury maison executives, and biotech founders charting the next decade of aesthetic longevity.",
    keyTopics: ["Epigenetic Formulations", "AI Formulation Chemistry", "Luxury M&A", "Sustainable Fermentation"],
    speakersCount: 48,
    expectedAttendees: "1,800+ Delegates",
    isFeatured: true
  },
  {
    id: "evt-milan-2026",
    title: "Milan Luxury Fragrance & Design Conclave",
    category: "Symposium",
    city: "Milan",
    country: "Italy",
    region: "Europe",
    venue: "Villa Necchi Campiglio & Triennale di Milano",
    dates: "November 05–07, 2026",
    startDateISO: "2026-11-05T10:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1000&auto=format&fit=crop",
    description: "An exclusive olfactory and sculptural design symposium where master noses and industrial architects converge to unveil next-era bottle aesthetics and neuro-scent breakthroughs.",
    keyTopics: ["Neuro-Olfaction", "Monomaterial Flacon Engineering", "Bespoke Extraction", "The Future of Sillage"],
    speakersCount: 36,
    expectedAttendees: "950 VIP Leaders",
    isFeatured: true
  },
  {
    id: "evt-nyc-2026",
    title: "New York Fashion & Beauty Intelligence Week",
    category: "Fashion Week",
    city: "New York",
    country: "United States",
    region: "Americas",
    venue: "The Shed at Hudson Yards, Manhattan",
    dates: "December 02–05, 2026",
    startDateISO: "2026-12-02T09:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
    description: "North Avenue Media's flagship annual conference examining the convergence of runway culture, digital spatial media, and multi-billion dollar private equity flows.",
    keyTopics: ["Runway Beauty Economics", "Spatial Media Avatars", "Consumer Longevity Trends", "Indie Valuation Dynamics"],
    speakersCount: 62,
    expectedAttendees: "3,200 Industry Executives",
    isFeatured: true
  },
  {
    id: "evt-seoul-2026",
    title: "Seoul K-Beauty Future Lab & Bio-Aesthetics Expo",
    category: "Expo",
    city: "Seoul",
    country: "South Korea",
    region: "Asia-Pacific",
    venue: "Dongdaemun Design Plaza (DDP), Seoul",
    dates: "January 18–20, 2027",
    startDateISO: "2027-01-18T09:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1000&auto=format&fit=crop",
    description: "Asia’s foremost epicenter of rapid formulation innovation, dermal delivery micro-needling, and bio-fermented skin barrier restoration.",
    keyTopics: ["Transdermal Bio-Delivery", "Microbiome Strains", "Glass Skin 2.0", "AI Diagnostic Devices"],
    speakersCount: 54,
    expectedAttendees: "4,500 Global Buyers",
    isFeatured: false
  },
  {
    id: "evt-dubai-2027",
    title: "Dubai Global Luxe Beauty & Olfactory Conclave",
    category: "Awards",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    venue: "Museum of the Future & Armani Hotel Dubai",
    dates: "February 22–24, 2027",
    startDateISO: "2027-02-22T11:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop",
    description: "Celebrating high-luxury heritage craftsmanship, rare oud cultivations, and sovereign investments fueling the global luxury beauty expansion.",
    keyTopics: ["Prestige Perfumery Renaissance", "Gulf Sovereign Fund Allocations", "Rare Botanic Preservation", "Ultra-High Net Worth Retail"],
    speakersCount: 40,
    expectedAttendees: "1,200 High-Level Delegates",
    isFeatured: false
  },
  {
    id: "evt-tokyo-2027",
    title: "Tokyo Spatial Beauty & J-Wellness Symposium",
    category: "Symposium",
    city: "Tokyo",
    country: "Japan",
    region: "Asia-Pacific",
    venue: "Mori Building Digital Art Museum, Odaiba",
    dates: "March 15–17, 2027",
    startDateISO: "2027-03-15T09:00:00Z",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop",
    description: "Exploring the delicate synthesis of traditional Japanese ritual skincare, cellular fermentation, and digital sensory wellness chambers.",
    keyTopics: ["J-Beauty Longevity Rituals", "Fermented Camellia Biotics", "Sensory Pod Environments", "Neuro-Cosmetics"],
    speakersCount: 32,
    expectedAttendees: "1,400 Curators & Chemists",
    isFeatured: false
  }
];

export const INSIGHTS_DATA: InsightReport[] = [
  {
    id: "rep-q3-2026",
    title: "The $680B Beauty Shift: Q3 Global Luxury & Longevity Index",
    quarter: "Q3",
    year: 2026,
    category: "Market Index",
    summary: "Our quarterly flagship market intelligence report tracking consumer spend migrations from traditional prestige beauty into epigenetic skincare and custom olfactory formulations.",
    metrics: [
      { label: "Longevity Skincare Growth", value: "+34.2%", change: "+8.4% vs Q2", isPositive: true },
      { label: "Prestige M&A Valuation Multiple", value: "17.4x", change: "+1.2x YoY", isPositive: true },
      { label: "Refillable Packaging Adoption", value: "68%", change: "+22% YoY", isPositive: true },
      { label: "Global Market Capitalization", value: "$684B", change: "+6.9%", isPositive: true }
    ],
    keyFindings: [
      "Consumers aged 24–40 now prioritize clinical epigenetic biomarkers over celebrity endorsement.",
      "The Middle East and East Asian markets account for 58% of global ultra-niche fragrance demand.",
      "Direct-to-consumer digital models have stabilized, while immersive sensory flagship boutiques in key capitals surged 41% in sales volume."
    ],
    readTime: "12 min briefing",
    downloadSize: "4.8 MB PDF"
  },
  {
    id: "rep-biotech-2026",
    title: "Biotech Cellular Synthesis: The Formulation Whitepaper",
    quarter: "Q2",
    year: 2026,
    category: "Biotech Report",
    summary: "An in-depth technical analysis examining 14 patented synthetic bio-peptides, live microbiome stabilization matrices, and transdermal micro-vesicles.",
    metrics: [
      { label: "Bio-Fermented Actives Yield", value: "99.4%", change: "+14% efficiency", isPositive: true },
      { label: "Cellular Turnover Acceleration", value: "+48%", change: "vs retinoic standard", isPositive: true },
      { label: "Dermal Barrier Resilience", value: "+82%", change: "within 14 days", isPositive: true }
    ],
    keyFindings: [
      "Recombinant human collagen produced via yeast fermentation outperforms animal-derived collagens in bioavailability.",
      "Microbiome diversity stabilization directly impedes photo-induced matrix metalloproteinase destruction.",
      "Zero-carbon bio-reactors are achieving cost parity with traditional petroleum-derived emulsifiers."
    ],
    readTime: "18 min briefing",
    downloadSize: "7.2 MB PDF"
  },
  {
    id: "rep-genz-2026",
    title: "Cultural Custody: The Gen-Z & Alpha Beauty Consumption Manifesto",
    quarter: "Q3",
    year: 2026,
    category: "Consumer Shift",
    summary: "Understanding the radical departure from mass trend cycles toward personal bio-identity, scent layering, and transparent carbon-accounting proof.",
    metrics: [
      { label: "Brand Authenticity Index", value: "91%", change: "Primary buying driver", isPositive: true },
      { label: "Daily Scent Wardrobe Rotation", value: "3.4 scents", change: "vs 1.2 in 2020", isPositive: true },
      { label: "Willingness to Pay for Zero-Waste", value: "+28%", change: "Premium tolerance", isPositive: true }
    ],
    keyFindings: [
      "Younger demographics treat scent and skincare as mental health and bio-optimization rituals rather than vanity routines.",
      "Micro-influencer community advocacy generates 7x higher lifetime customer value than traditional media buy placements.",
      "The convergence of physical cosmetics with spatial mixed-reality avatars is becoming a key loyalty driver."
    ],
    readTime: "10 min briefing",
    downloadSize: "3.6 MB PDF"
  }
];

export const INNOVATIONS_DATA: InnovationItem[] = [
  {
    id: "inn-1",
    title: "Bio-Fermented Exosome Peptides",
    sector: "Biotechnology",
    status: "In Market",
    tagline: "Cell-to-cell signaling matrices that direct natural collagen synthesis without triggering inflammation.",
    description: "Harvested through precision yeast fermentation, these microscopic extracellular vesicles penetrate the stratum corneum intact, delivering targeted RNA instructions directly to aging fibroblasts.",
    breakthrough: "Achieves 4x higher cellular uptake compared to traditional synthetic peptide chains.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    metrics: { label: "Bio-availability Increase", value: "+380%" }
  },
  {
    id: "inn-2",
    title: "Neuro-Adaptive Scent Mapping",
    sector: "Neuro-Cosmetics",
    status: "Patented",
    tagline: "Formulating fragrant molecules with real-time biometric and neural frequency feedback loops.",
    description: "Combining electroencephalography (EEG) data with high-altitude botanical fractions to develop fragrances that tangibly downregulate cortisol and activate alpha brainwave synchrony.",
    breakthrough: "First clinically validated olfactory formulation demonstrating verified heart-rate variability improvement.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop",
    metrics: { label: "Cortisol Reduction Rate", value: "-27.4%" }
  },
  {
    id: "inn-3",
    title: "Photorealistic Spatial Dermis Shaders",
    sector: "Spatial Media",
    status: "Beta Launch",
    tagline: "Sub-surface light scattering engines replicating organic human skin in ultra-high fidelity mixed reality.",
    description: "Collaborations between high-fashion makeup artists and real-time graphics engineers to create digital cosmetic pigments that interact dynamically with physical room lighting and gaze tracking.",
    breakthrough: "Zero-latency real-time rendering of dynamic iridescence and micro-dew skin finishes.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    metrics: { label: "Render Precision", value: "Sub-millimeter" }
  },
  {
    id: "inn-4",
    title: "Bio-Mineral Monomaterial Compacts",
    sector: "Circular Packaging",
    status: "In Market",
    tagline: "Cold-touch, infinitely recyclable luxury cosmetic vessels crafted from seaweed biopolymers and mineral sand.",
    description: "An Italian-Korean design syndicate that completely eliminates glues, magnets, and multi-resin hinge assemblies in favor of gravity-interlocking recyclable aluminum and calcium composites.",
    breakthrough: "Completely home-compostable core with a pristine 100-year metallic outer finish.",
    image: "https://images.unsplash.com/photo-1608248597359-24757cfa457f?q=80&w=800&auto=format&fit=crop",
    metrics: { label: "Carbon Footprint Delta", value: "-72%" }
  }
];

export const GALLERY_MEDIA = [
  {
    id: "gal-1",
    title: "Paris Couture Week Backstage Intelligence",
    location: "Grand Palais Éphémère, Paris",
    category: "Runway & Backstage",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-studio-light-setup-41584-large.mp4",
    aspect: "tall"
  },
  {
    id: "gal-2",
    title: "Botanical Extraction Laboratory",
    location: "Grasse, French Riviera",
    category: "Formulation Chemistry",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-perfume-dropper-pouring-essential-oils-42868-large.mp4",
    aspect: "wide"
  },
  {
    id: "gal-3",
    title: "Sculptural Cosmetic Monoliths",
    location: "Milan Design Triennale",
    category: "Luxury Packaging",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    aspect: "square"
  },
  {
    id: "gal-4",
    title: "Tokyo Digital Light Dermis Exhibition",
    location: "Roppongi Hills, Tokyo",
    category: "Spatial Beauty",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1000&auto=format&fit=crop",
    aspect: "tall"
  }
];

export const BREAKING_TICKER_ITEMS = [
  "EPIGENETIC BEAUTY MARKET VALUATION EXCEEDS $48B IN GLOBAL PROJECTIONS",
  "PARIS BEAUTY TECH SUMMIT 2026 OPENS REGISTRATION FOR 1,800 GLOBAL DELEGATES",
  "SOVEREIGN FUNDS ALLOCATE RECORD $1.2B TO FOUNDER-LED LUXURY INDIE HOUSES",
  "MILAN CONCLAVE UNVEILS 100% ZERO-TRACE MONOMATERIAL FLACON BLUEPRINT",
  "SEOUL FUTURE LAB ANNOUNCES BREAKTHROUGH IN MICROBIOME STABILIZATION MATRIX"
];
