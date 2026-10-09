export interface MapProject {
  id: string;
  name: string;
  shortTitle: string;
  territory: string;
  coordinates: [number, number];
  zoom: number;
  badge: string;
  accent: 'cyan' | 'emerald' | 'amber' | 'violet' | 'rose' | 'blue';
  metrics: string[];
  description: string;
  clippySummary: string;
  slug?: string;
  date: string;
  badgeOffset?: 'top' | 'bottom' | 'center' | 'left' | 'right';
}

export const FRANCE_CENTER: [number, number] = [46.7, 2.3];
export const FRANCE_ZOOM = 6;

export const CLIPPY_WELCOME = "Bonjour ! Je suis Clippy, votre assistant de visite. Il semble que vous cherchiez à évaluer les compétences et les réalisations de Marceau en modélisation spatiale. Cliquez sur un territoire sur la carte ou utilisez la barre de commandes pour que je vous résume chaque projet !";

export const mapProjects: MapProject[] = [
  {
    id: "marseille-vefa",
    name: "Métropole Aix-Marseille-Provence",
    shortTitle: "VEFA & Logement social",
    territory: "55 communes (Bouches-du-Rhône)",
    coordinates: [43.2965, 5.3698],
    zoom: 11,
    badge: "MÉMOIRE M1 · RECHERCHE",
    accent: "violet",
    date: "2025-2026",
    metrics: [
      "55 758 logements conventionnés",
      "ICC = 73,4 % (Effet-commune déterminant)",
      "AUC = 0,82 (Modèle logistique lme4)"
    ],
    description: "Modélisation logistique à effets mixtes (GLMM) sous R pour décrypter la délégation au privé de la production HLM via la VEFA.",
    clippySummary: "Il semble que vous examiniez la production HLM à Marseille ! Marceau a analysé 55 758 logements sous modèle GLMM logistique. Résultat majeur : un ICC de 73,4 %, prouvant que c'est la politique communale locale qui dicte le recours au privé (VEFA), bien plus que le marché immobilier ou les prix DVF.",
    slug: "memoire-vefa"
  },
  {
    id: "grand-avignon-climat",
    name: "Grand Avignon",
    shortTitle: "Surchauffe urbaine & PNACC-3",
    territory: "16 communes (Vaucluse & Gard)",
    coordinates: [43.9780, 4.8020],
    zoom: 12,
    badge: "COMMANDE PUBLIQUE (L3) · 164 P.",
    accent: "emerald",
    date: "2024-2025",
    badgeOffset: "left",
    metrics: [
      "Rapport d'étude de 164 pages",
      "72,1 % îlots de chaleur en zones com.",
      "Classification LCZ à 50 m & Landsat 8"
    ],
    description: "Cartographie thermique de surface et classification des zones climatiques locales (LCZ) par télédétection.",
    clippySummary: "Vous observez l'étude du Grand Avignon ! C'est un rapport de commande publique de 164 pages. Marceau a piloté la chaîne SIG et télédétection Landsat 8 : 72,1 % des îlots de chaleur ont été localisés dans les zones commerciales, avec dimensionnement d'un réseau de 120 capteurs IoT et identification de 130 îlots de fraîcheur.",
    slug: "grand-avignon-climat"
  },
  {
    id: "avignon-ipa",
    name: "Avignon Agglomération",
    shortTitle: "Indice de Pression d'Accès (IPA)",
    territory: "Pôle universitaire d'Avignon",
    coordinates: [43.9260, 4.8480],
    zoom: 13,
    badge: "RECHERCHE & PUBLICATION",
    accent: "cyan",
    date: "2025",
    badgeOffset: "right",
    metrics: [
      "Friction réseau réelle sous QNEAT3",
      "Population 18-24 ans & Filosofi",
      "Alternative frugale au modèle 2SFCA"
    ],
    description: "Méthode innovante d'évaluation de la double peine territoriale (éloignement kilométrique cumulé à la tension démographique) pour les territoires sans données d'offre privées.",
    clippySummary: "Vous explorez les travaux d'accessibilité à Avignon ! Marceau a conçu l'Indice de Pression d'Accès (IPA), une méthode frugale pour mesurer la « double peine » territoriale (éloignement + saturation) sans nécessiter de données privées d'offre. Testé sur les 18-24 ans avec le graphe viaire réel.",
    slug: "article-ipa"
  },
  {
    id: "rennes-3d",
    name: "Rennes Métropole",
    shortTitle: "Gisements fonciers 3D & ZAN",
    territory: "43 communes (Ille-et-Vilaine)",
    coordinates: [48.1173, -1.6778],
    zoom: 12,
    badge: "INGÉNIERIE SIG 3D · L3",
    accent: "amber",
    date: "2025",
    metrics: [
      "208 351 bâtiments modélisés",
      "33 304 constructions surélevables",
      "Algèbre raster MNS/MNT 50 cm"
    ],
    description: "Algorithme d'analyse multicritère 3D et horizontale pour détecter le potentiel de surélévation sous contrainte du Zéro Artificialisation Nette.",
    clippySummary: "Vous voici sur Rennes Métropole ! Face aux injonctions du Zéro Artificialisation Nette (ZAN), Marceau a développé un algorithme raster haute résolution (MNS 50 cm) qui a détecté automatiquement 33 304 bâtiments surélevables sur 208 000 bâtis modélisés.",
    slug: "rennes-foncier-sig"
  },
  {
    id: "ales-cedre",
    name: "Alès & Cévennes",
    shortTitle: "R&D Pollution lumineuse",
    territory: "Bassin alésien & Gard",
    coordinates: [44.1275, 4.0833],
    zoom: 11,
    badge: "STAGE R&D · EN PRODUCTION",
    accent: "blue",
    date: "2026",
    metrics: [
      "Stage R&D au CEDRE (Alès)",
      "Modélisation des pertes économiques",
      "Outil déployé auprès des collectivités"
    ],
    description: "Traitement de données nocturnes satellites et modélisation multicritère des besoins d'éclairage public. Démarche industrialisée et commercialisée.",
    clippySummary: "Vous survolez le Gard et le bassin alésien ! Lors de son stage R&D au CEDRE, Marceau a modélisé la pollution lumineuse et quantifié les pertes économiques pour les communes. La chaîne d'analyse spatiale a ensuite été directement industrialisée et vendue aux collectivités.",
  },
  {
    id: "paris-geodata",
    name: "Paris / Cité Descartes",
    shortTitle: "Master 1 GeoData Paris",
    territory: "Champs-sur-Marne (UGE / ex-ENSG)",
    coordinates: [48.8410, 2.5873],
    zoom: 14,
    badge: "CURSUS ACTUEL · M1",
    accent: "rose",
    date: "2026-2027",
    metrics: [
      "Université Gustave Eiffel (ex-ENSG)",
      "Science des données spatiales & stats",
      "Dispo. stage dès le 15 avril 2027"
    ],
    description: "Formation d'excellence en géomatique avancée, chaînes de traitement reproductibles, Python, R, PostGIS et modélisation territoriale.",
    clippySummary: "Bienvenue à la Cité Descartes ! C'est le campus actuel de Marceau : Master 1 GeoData Paris à l'Université Gustave Eiffel (ex-ENSG). Il y consolide ses compétences de pointe en data spatiale et est disponible dès le 15 avril 2027 pour son stage de fin d'études.",
  }
];
