import type { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: "m1-geodata",
    period: "2026-2027",
    status: "En cours",
    isCurrent: true,
    title: "Master 1 Géomatique",
    institution: "GeoData Paris, Université Gustave Eiffel (ex-ENSG)",
    location: "Champs-sur-Marne (Paris)",
    description: "Approfondissement des méthodes de pointe en science des données spatiales, modélisation géostatistique avancée, télédétection et développement de chaînes d'analyse automatisées et reproductibles à grande échelle.",
    badges: [
      { text: "Science des données spatiales", color: "yellow" },
      { text: "En cours", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "stage-cedre",
    period: "Juin - Septembre 2026",
    status: "Stage R&D",
    isCurrent: false,
    title: "Assistant R&D : La pollution lumineuse dans le Gard",
    institution: "CEDRE",
    location: "Alès",
    description: "Stage de recherche et développement portant sur l'analyse spatiale et la modélisation de la pollution lumineuse. Traitement de données nocturnes, estimation des pertes économiques liées à la pollution lumineuse et modélisation multicritère des besoins d'éclairement. L'ensemble de cette démarche a ensuite été mis en production et vendu, créant un outil d'aide à la décision pour les collectivités locales.",
    badges: [
      { text: "R&D", color: "emerald" },
      { text: "Pollution lumineuse", color: "muted" }
    ],
    accent: "emerald"
  },
  {
    id: "m1-geoter",
    period: "2025-2026",
    status: "Diplômé",
    isCurrent: false,
    title: "Master 1 Géomatique et conduite de projets territoriaux (GEOTER)",
    institution: "Avignon Université",
    location: "Avignon",
    description: "Ce cursus articule analyse spatiale quantitative complexe, diagnostic territorial et conduite de projet. La formation est articulée autour de deux grands projets. Le premier, une commande de la mairie d'Avignon concernant la constitution et la modernisation de la base de données patrimoniale communale, au premier semestre. Le second projet, au deuxième semestre, est le mémoire de recherche. Mon sujet portait sur l'analyse et la modélisation spatiale et statistique de l'habitat social en Métropole AMP.",
    badges: [
      { text: "Major de promotion", color: "red" },
      { text: "Mention Bien", color: "emerald" },
      { text: "Délégué de promotion", color: "yellow" }
    ],
    accent: "emerald"
  },
  {
    id: "asso-bang",
    period: "2025-2026",
    status: "Engagement",
    isCurrent: false,
    title: "Co-président de l'association BANG",
    institution: "Avignon Université",
    location: "Avignon",
    description: "J'ai occupé le poste de co-président de l'association étudiante BANG au sein de l'Université d'Avignon, durant l'année scolaire 2025-2026. Ce poste m'a permis de prendre la responsabilité des animations, de l'administration et de la coordination d'événements collectifs.",
    badges: [
      { text: "Vie associative", color: "yellow" },
      { text: "Co-président", color: "emerald" }
    ],
    accent: "muted"
  },
  {
    id: "stage-espace",
    period: "2025",
    status: "Stage recherche",
    isCurrent: false,
    title: "Stagiaire de recherche sur l'analyse spatiale et statistique des logements sociaux",
    institution: "UMR 7300 ESPACE CNRS / Avignon Université",
    location: "Avignon",
    description: "Ce stage de recherche a été consacré à l'analyse spatiale et statistique des logements sociaux dans la Métropole Aix-Marseille-Provence. Le but étant de contribuer à l'approfondissement des connaissances quantitatives sur le sujet en croisant les données du RPLS, de l'INSEE et de l'IGN.",
    badges: [
      { text: "Recherche", color: "yellow" },
      { text: "CNRS", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "licence-geo",
    period: "2022-2025",
    status: "Diplômé",
    isCurrent: false,
    title: "Licence de Géographie & Aménagement du Territoire",
    institution: "Avignon Université",
    location: "Avignon",
    description: "Cette licence m'a permis d'acquérir un socle solide en géographie humaine, physique et en aménagement, avec une spécialisation marquée dès la L1 en géomatique puis en L2 en méthodes quantitatives poussées (statistique multivariée et modélisation). Le projet de L3 en géomatique sur la surélévation potentielle des bâtiments à Rennes Métropole, ou encore la commande d'analyse territoriale de l'agglomération du Grand Avignon démontrent cette spécialisation technique précoce, ainsi que la solidité du socle de géographie qui nous a été enseigné.",
    badges: [
      { text: "Major en géomatique & stats", color: "red" },
      { text: "Mention Assez Bien", color: "emerald" },
      { text: "Délégué de promotion", color: "yellow" }
    ],
    accent: "red"
  }
];
