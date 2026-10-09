import type { ExperienceItem } from '../../types';

export const experienceDataEn: ExperienceItem[] = [
  {
    id: "m1-geodata",
    period: "2026-2027",
    status: "In progress",
    isCurrent: true,
    title: "Master 1 in Geomatics & Spatial Data Science",
    institution: "GeoData Paris, Gustave Eiffel University (formerly ENSG)",
    location: "Paris Region (Champs-sur-Marne)",
    description: "In-depth training in state-of-the-art spatial data science, advanced geostatistics, satellite Earth observation, and the development of reproducible, automated large-scale analytical pipelines.",
    badges: [
      { text: "Spatial Data Science", color: "yellow" },
      { text: "In Progress", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "stage-cedre",
    period: "June - Sept. 2026",
    status: "R&D Internship",
    isCurrent: false,
    title: "R&D Assistant: Light Pollution Modeling in Southern France",
    institution: "CEDRE",
    location: "Alès",
    description: "Research & Development internship on spatial analysis and predictive modeling of nocturnal light pollution. Nighttime data engineering, economic loss estimation from light spill, and multi-criteria modeling of urban lighting requirements. The resulting framework was productized into a decision-support platform marketed to regional authorities.",
    badges: [
      { text: "R&D", color: "emerald" },
      { text: "Light Pollution", color: "muted" }
    ],
    accent: "emerald"
  },
  {
    id: "m1-geoter",
    period: "2025-2026",
    status: "Graduated",
    isCurrent: false,
    title: "Master 1 in Geomatics & Territorial Project Management (GEOTER)",
    institution: "Avignon University",
    location: "Avignon",
    description: "Curriculum articulating quantitative spatial analysis, territorial diagnostics, and project leadership. Built around two major projects: first, a public municipal commission for the City of Avignon to modernize its municipal heritage spatial database; second, an empirical research thesis examining the spatial and econometric distribution of social housing in the Aix-Marseille-Provence metropolis.",
    badges: [
      { text: "Valedictorian (Top of Class)", color: "red" },
      { text: "Honors (Mention Bien)", color: "emerald" },
      { text: "Class Representative", color: "yellow" }
    ],
    accent: "emerald"
  },
  {
    id: "asso-bang",
    period: "2025-2026",
    status: "Community Leadership",
    isCurrent: false,
    title: "Co-President of BANG Student Association",
    institution: "Avignon University",
    location: "Avignon",
    description: "Co-president of the BANG student non-profit association during the 2025-2026 academic year. Responsible for community initiatives, budget administration, cross-university partnerships, and coordination of collective events.",
    badges: [
      { text: "Student Leadership", color: "yellow" },
      { text: "Co-President", color: "emerald" }
    ],
    accent: "muted"
  },
  {
    id: "stage-espace",
    period: "2025",
    status: "Research Internship",
    isCurrent: false,
    title: "Research Intern: Spatial & Statistical Modeling of Social Housing",
    institution: "UMR 7300 ESPACE CNRS / Avignon University",
    location: "Avignon",
    description: "Research internship dedicated to econometric and spatial analysis of social housing dynamics across the Aix-Marseille-Provence metropolis. Built cross-referenced spatial datasets integrating RPLS registries, INSEE census micro-grids, and IGN topographical layers.",
    badges: [
      { text: "Academic Research", color: "yellow" },
      { text: "CNRS Laboratory", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "licence-geo",
    period: "2022-2025",
    status: "Graduated",
    isCurrent: false,
    title: "B.Sc. in Geography & Spatial Planning",
    institution: "Avignon University",
    location: "Avignon",
    description: "Provided a rigorous foundation in physical and human geography with early specialization in geomatics (Year 1) and advanced multivariate statistics and modeling (Year 2 & 3). Key projects included building vertical extension potential analysis in Rennes Metropolis and a comprehensive territorial audit for Greater Avignon.",
    badges: [
      { text: "Ranked #1 in GIS & Stats", color: "red" },
      { text: "Honors", color: "emerald" },
      { text: "Class Representative", color: "yellow" }
    ],
    accent: "red"
  }
];
