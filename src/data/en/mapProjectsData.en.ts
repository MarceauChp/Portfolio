import type { MapProject } from '../mapProjectsData';

export const CLIPPY_WELCOME_EN = "Hello! I'm Clippy, your portfolio guide. It looks like you're exploring Marceau's spatial modeling and geomatics projects. Click any territory on the map or use the project selector, and I'll summarize the key findings for you!";

export const mapProjectsEn: MapProject[] = [
  {
    id: "marseille-vefa",
    name: "Aix-Marseille-Provence Metropolis",
    shortTitle: "Off-Plan & Social Housing",
    territory: "55 municipalities (Bouches-du-Rhône)",
    coordinates: [43.2965, 5.3698],
    zoom: 11,
    badge: "M1 THESIS · RESEARCH",
    accent: "violet",
    date: "2025-2026",
    metrics: [
      "55,758 subsidized units analyzed",
      "ICC = 73.4% (Decisive municipal effect)",
      "AUC = 0.82 (Logistic lme4 model)"
    ],
    description: "Logistic Generalized Linear Mixed-Effects Model (GLMM) in R assessing the delegation of public housing production to private developers via VEFA.",
    clippySummary: "Looks like you're inspecting social housing dynamics in Marseille! Marceau analyzed 55,758 dwellings with a logistic GLMM. Key finding: an ICC of 73.4%, demonstrating that local municipal zoning politics dictate reliance on private developers far more than real estate prices.",
    slug: "memoire-vefa"
  },
  {
    id: "grand-avignon-climat",
    name: "Greater Avignon",
    shortTitle: "Urban Overheating & Climate Adaptation",
    territory: "16 municipalities (Vaucluse & Gard)",
    coordinates: [43.9780, 4.8020],
    zoom: 12,
    badge: "PUBLIC STUDY (L3) · 164 P.",
    accent: "emerald",
    date: "2024-2025",
    badgeOffset: "left",
    metrics: [
      "164-page public study report",
      "72.1% of heat island area in commercial zones",
      "50m LCZ classification & Landsat 8"
    ],
    description: "Satellite Land Surface Temperature (LST) mapping, Local Climate Zones (LCZ) classification, and deployment plan for 120 IoT microclimate sensors.",
    clippySummary: "You are looking at the Greater Avignon climate diagnostic! It's an extensive 164-page public report. Marceau led the GIS and satellite pipeline: 72.1% of heat island surface was identified within commercial zones, paired with 120 IoT sensor locations and 130 cool corridors.",
    slug: "grand-avignon-climat"
  },
  {
    id: "avignon-ipa",
    name: "Avignon Urban Area",
    shortTitle: "Access Pressure Index (IPA)",
    territory: "Avignon University Campuses",
    coordinates: [43.9260, 4.8480],
    zoom: 13,
    badge: "RESEARCH & PUBLICATION",
    accent: "cyan",
    date: "2025",
    metrics: [
      "Topological routing via QNEAT3",
      "Demographic micro-grid (INSEE 200m)",
      "Parsimonious alternative to 2SFCA"
    ],
    description: "Design of a transparent spatial accessibility metric modeling geographic double jeopardy in data-scarce public service environments.",
    clippySummary: "Interested in public service accessibility? Marceau developed the Access Pressure Index (IPA) as a robust alternative to 2SFCA models when facility capacity data is missing, applied to student transit access.",
    slug: "article-ipa"
  },
  {
    id: "ales-cedre",
    name: "Alès & Gard Territory",
    shortTitle: "Nocturnal Light Pollution & Energy Waste",
    territory: "Gard Department",
    coordinates: [44.1272, 4.0833],
    zoom: 12,
    badge: "R&D INTERNSHIP · CEDRE",
    accent: "amber",
    date: "Summer 2026",
    badgeOffset: "bottom",
    metrics: [
      "Modeling economic energy waste",
      "Multi-criteria illumination needs",
      "Turnkey decision-support tool"
    ],
    description: "Spatial modeling of light pollution, economic loss calculation, and algorithmic optimization of public street lighting schedules.",
    clippySummary: "This was Marceau's R&D internship at CEDRE! He modeled nocturnal light pollution across the Gard department, quantified municipal economic losses, and built an automated decision platform adopted by local governments.",
    slug: undefined
  },
  {
    id: "rennes-foncier",
    name: "Rennes Metropolis",
    shortTitle: "3D Vertical Extensions & Land Reserve",
    territory: "43 municipalities (Ille-et-Vilaine)",
    coordinates: [48.1173, -1.6778],
    zoom: 12,
    badge: "3D GIS MODELING · ZAN LAW",
    accent: "rose",
    date: "2025",
    metrics: [
      "208,351 modeled buildings",
      "33,304 viable rooftops detected",
      "1m LiDAR DSM/DTM map algebra"
    ],
    description: "High-resolution raster map algebra model identifying rooftop vertical additions and horizontal infill reserves under Zero Net Artificialization limits.",
    clippySummary: "Here is the 3D urban densification project for Rennes! Marceau designed a raster algebra script analyzing 208,351 buildings using LiDAR HD. It identified 33,304 viable rooftops capable of adding a new floor without greenfield development.",
    slug: "rennes-foncier-sig"
  }
];
