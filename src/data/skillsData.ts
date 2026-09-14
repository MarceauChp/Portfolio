import type { SkillsData } from '../types';

export const skillsData: SkillsData = {
  categories: [
    {
      id: "stats",
      title: "Statistiques avancées & Programmation",
      subtitle: "Modélisation rigoureuse, méthodes multivariées et langages de traitement",
      accent: "cyan",
      items: [
        {
          name: "Statistiques multivariées",
          level: "Expert",
          highlight: true,
          description: "ACP, CAH, ACM, AFC, régressions linéaires simples et multiples. Outils d'analyse exploratoire et de synthèse que je mobilise dans mes travaux."
        },
        {
          name: "Modélisation GLMM",
          level: "Expert",
          highlight: true,
          description: "Modèles linéaires généralisés à effets mixtes. J'ai notamment appris, maîtrisé, puis utilisé cette méthode lors de mon mémoire de Master 1 en réalisant un modèle à intercept aléatoire communal sur 55 000 logements."
        },
        {
          name: "R",
          level: "Avancé",
          highlight: false,
          description: "R représente mon environnement principal pour le nettoyage, la modélisation statistique avancée et la visualisation graphique de données spatiales."
        },
        {
          name: "Python",
          level: "Intermédiaire",
          highlight: false,
          description: "Développement de scripts pour automatiser des tâches de pré-traitement géospatial, de la conversion de formats à la manipulation de rasters et vecteurs."
        },
        {
          name: "SQL",
          level: "Intermédiaire",
          highlight: false,
          description: "SQL est le langage que j'utilise pour les requêtes de base de données relationnelle, le filtrage, l'agrégation de données volumineuses, l'optimisation d'un projet mais également des traitements géomatiques."
        }
      ]
    },
    {
      id: "sig",
      title: "SIG, Télédétection & Cartographie",
      subtitle: "Exploitation poussée des données géospatiales, modélisation, observation de la Terre, visualisation 3D & web interactive 2D.",
      accent: "emerald",
      items: [
        {
          name: "QGIS",
          level: "Expert",
          highlight: true,
          description: "Mon outil principal pour les traitements géomatiques. Analyse spatiale avancée, algèbre raster matricielle, automatisation via Model Builder, modélisation (LCZ), analyses de graphes et réseaux."
        },
        {
          name: "Sémiologie graphique & Cartographie",
          level: "Expert",
          highlight: true,
          description: "Au-delà de la maîtrise de la mise en page de QGIS, j'utilise régulièrement Inkscape pour les finitions, ainsi que Flourish pour la visualisation interactive."
        },
        {
          name: "Télédétection satellitaire",
          level: "Avancé",
          highlight: true,
          description: "Traitement d'images satellites (notamment Landsat) via QGIS et R, calcul d'indices spectraux (NDVI, NDBI), analyses thermiques (LST), et classification (supervisée ou non)."
        },
        {
          name: "ArcGIS Pro",
          level: "Avancé",
          highlight: false,
          description: "Outils de géotraitement spatial, sémiologie graphique et composition de rendus cartographiques opérationnels."
        },
        {
          name: "PostgreSQL / PostGIS",
          level: "Intermédiaire",
          highlight: false,
          description: "PostGIS est l'environnement de travail dans lequel j'utilise SQL, je structure des bases de données relationnelles, et j'optimise un projet (indexation, gestion des projections, géotraitement) lorsque nécessaire (LCZ)."
        }
      ]
    }
  ],
  languages: [
    {
      lang: "Français",
      level: "Langue maternelle",
      code: "FR"
    },
    {
      lang: "Anglais",
      level: "Niveau B2",
      description: "Lecture de publications scientifiques et rédaction académique.",
      code: "B2"
    }
  ],
  pipelineSteps: [
    {
      number: "01",
      title: "Acquisition & Critique des sources",
      color: "emerald",
      icon: "Download",
      description: "Cette première phase correspond à l'acquisition des données, l'évaluation des protocoles de recueil, les limites et les biais de ces dernières.",
      items: [
        "IGN (BD TOPO, LiDAR HD, OCS GE & RGE Alti)",
        "INSEE (Filosofi & Fiches Communales)",
        "USGS / NASA (Landsat)",
        "DVF, Fichiers Fonciers, BDNB & Métropoles"
      ]
    },
    {
      number: "02",
      title: "Traitement & Modélisation",
      color: "cyan",
      icon: "Cpu",
      description: "La seconde phase concerne la réflexion autour des moyens utilisés. En fonction des enjeux et de la taille des projets, il est essentiel d'utiliser des outils adaptés.",
      items: [
        "R : Statistiques avancées & géotraitements",
        "PostGIS : structuration & optimisation",
        "QGIS : géotraitement complexe",
        "Python : Automatisation des traitements"
      ]
    },
    {
      number: "03",
      title: "Restitution & Discussion critique",
      color: "violet",
      icon: "MapPin",
      description: "Enfin, tout travail précis mérite d'être le plus valorisé possible par une cartographie claire, lisible et attrayante, tout en discutant en détail des limites du projet.",
      items: [
        "Cartographie thématique : QGIS & Inkscape",
        "Rapports territoriaux d'aide à la décision",
        "Visualisations web interactives",
        "Reproductibilité des analyses : GitHub"
      ]
    }
  ]
};
