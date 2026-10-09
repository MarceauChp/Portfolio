import type { SkillsData } from '../../types';

export const skillsDataEn: SkillsData = {
  categories: [
    {
      id: "stats",
      title: "Advanced Statistics & Programming",
      subtitle: "Rigorous modeling, multivariate methods, and data engineering languages",
      accent: "cyan",
      items: [
        {
          name: "Multivariate Statistics",
          level: "Expert",
          highlight: true,
          description: "PCA, HCA, MCA, CA, simple and multiple linear regressions. Exploratory and synthetic data analysis methods applied across spatial datasets."
        },
        {
          name: "GLMM Modeling",
          level: "Avancé",
          highlight: true,
          description: "Generalized Linear Mixed-Effects Models in R (lme4). Implementation of a logistic model with municipal random intercepts across 55,758 social housing units (ICC computation, LRT tests, and backward step selection)."
        },
        {
          name: "R",
          level: "Avancé",
          highlight: false,
          description: "R is my core research environment for data cleaning, advanced spatial statistics, spatial join algorithms, and publication-ready charting."
        },
        {
          name: "Python",
          level: "Intermédiaire",
          highlight: false,
          description: "Scripting and workflow automation for geospatial pre-processing, vector/raster manipulation, batch operations, and API integrations."
        },
        {
          name: "SQL",
          level: "Intermédiaire",
          highlight: false,
          description: "Relational database querying, spatial aggregation, complex joins, indexing, and geoprocessing optimization on large spatial tables."
        }
      ]
    },
    {
      id: "sig",
      title: "GIS, Remote Sensing & Cartography",
      subtitle: "Advanced geospatial data engineering, Earth observation, 3D analysis, and 2D interactive web mapping.",
      accent: "emerald",
      items: [
        {
          name: "QGIS",
          level: "Expert",
          highlight: true,
          description: "My primary workstation for GIS workflows. Advanced spatial analysis, raster map algebra, automated Model Builder pipelines, Local Climate Zones (LCZ) modeling, and network graph routing."
        },
        {
          name: "Graphic Semiologies & Cartography",
          level: "Expert",
          highlight: true,
          description: "Beyond QGIS layout composition, I regularly use Inkscape for vector cartographic finishing, and Flourish for interactive dataviz publishing."
        },
        {
          name: "Satellite Remote Sensing",
          level: "Avancé",
          highlight: true,
          description: "Satellite imagery processing (especially Landsat 8) via QGIS and R, spectral index computation (NDVI, NDBI), Land Surface Temperature (LST) derivation, and supervised classifications."
        },
        {
          name: "ArcGIS Pro",
          level: "Avancé",
          highlight: false,
          description: "Spatial analysis toolsets, thematic cartography, and operational GIS delivery according to enterprise standards."
        },
        {
          name: "PostgreSQL / PostGIS",
          level: "Intermédiaire",
          highlight: false,
          description: "PostGIS database management for spatial queries, coordinate reference transformations, indexing, spatial intersections, and performance optimization."
        }
      ]
    }
  ],
  languages: [
    {
      lang: "French",
      level: "Native",
      code: "FR"
    },
    {
      lang: "English",
      level: "B2 Level",
      description: "Scientific literature review, academic writing, and international technical collaboration.",
      code: "B2"
    }
  ],
  pipelineSteps: [
    {
      number: "01",
      title: "Data Sourcing & Critical Assessment",
      color: "emerald",
      icon: "Download",
      description: "The initial phase focuses on data acquisition, evaluation of survey protocols, identification of sample biases, and quality checking.",
      items: [
        "IGN (BD TOPO, LiDAR HD, OCS GE & RGE Alti)",
        "INSEE (Filosofi 200m grid & census tables)",
        "USGS / NASA (Landsat 8 missions)",
        "DVF (Real estate sales), Land registries & Municipal data"
      ]
    },
    {
      number: "02",
      title: "Processing & Geospatial Modeling",
      color: "cyan",
      icon: "Cpu",
      description: "The second phase selects optimal processing frameworks tailored to project scale, algorithmic constraints, and analytical depth.",
      items: [
        "R: Advanced statistical modeling & spatial joins",
        "PostGIS: Database structuring & indexing",
        "QGIS: Complex geoprocessing & network analysis",
        "Python: Task automation & script pipelining"
      ]
    },
    {
      number: "03",
      title: "Restitution & Critical Discussion",
      color: "violet",
      icon: "MapPin",
      description: "Rigorous work deserves maximum impact through crisp cartographic design, actionable decision-support reporting, and honest discussion of methodological limits.",
      items: [
        "Thematic Cartography: QGIS & Inkscape",
        "Decision-support territorial reports",
        "Interactive web mapping visualization",
        "Reproducible science & code documentation (GitHub)"
      ]
    }
  ]
};
