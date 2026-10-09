import type { Project } from '../../types';

export const projectsDataEn: Project[] = [
  {
    id: "memoire-vefa",
    slug: "memoire-vefa",
    title: "Quantitative Spatial Analysis of Social Housing Allocation by Acquisition Mode in the Aix-Marseille-Provence Metropolis",
    shortTitle: "Off-Plan Social Housing (AMP Metropolis)",
    category: "Recherche M1",
    statusBadge: "M1 Thesis",
    statusText: "Master 1 Research Thesis, GéoTer - Avignon University - 2025/2026",
    statusColor: "violet",
    thumbnail: "/assets/img/projet_vefa.png",
    subtitle: "This research examines how private developer delegation of social housing via off-plan acquisition (VEFA) spatially reorganizes subsidized housing in one of France's largest metropolitan areas, utilizing a Generalized Linear Mixed-Effects Model (GLMM) on nearly 55,800 dwellings.",
    excerpt: "The structural transition from developer-landlords to buyer-landlords through off-plan social acquisitions transforms the spatial distribution of public housing. In the Aix-Marseille-Provence Metropolis, a logistic GLMM with municipal random intercepts reveals an ICC of 73.4%: municipal boundaries decisively dictate reliance on private developers, far exceeding local market fundamentals.",
    tags: ["R", "GLMM", "QGIS", "Filosofi INSEE", "BD TOPO IGN", "RPLS"],
    summaryFooter: "55 municipalities | ICC = 73.4% | 55,758 dwellings analyzed",
    meta: [
      { label: "Status", value: "M1 Thesis: 2025-2026" },
      { label: "Honors", value: "Valedictorian, Honors (Mention Bien)" },
      { label: "Territory", value: "AMP Metropolis: 55 municipalities" },
      { label: "Core Method", value: "GLMM / R", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Memoire_M1GEOTER_Marceau_Chapon.pdf",
      github: "https://github.com/MarceauChp/Memoire_M1GEOTER"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Research Problem & Hypotheses",
        content: [
          "The French social housing sector is undergoing a profound structural transformation: shifting from direct public development towards turnkey off-plan acquisition (VEFA) from private developers. Marginal prior to 2007, off-plan turnkey procurement now accounts for 30% to 50% of new social housing production nationwide. This shift fundamentally challenges territorial equity: does outsourcing the act of building to private developers generate distinct spatial clustering for subsidized housing?",
          "Field intuition during Master's studies was corroborated: off-plan social units appeared neither in the same neighborhoods nor with the same architectural typology as directly commissioned developments. Two hypotheses were formulated: a 'municipality effect' (local regulatory frameworks acting as primary institutional filters) and a 'market effect' (developers steering social quotas toward lower-value sectors to safeguard private profit margins).",
          "The Aix-Marseille-Provence Metropolis was selected for its pronounced territorial heterogeneity: 55 municipalities with contrasting urban planning policies, a sharply polarized housing market, uneven enforcement of statutory social quotas (SRU law), and diverse housing association strategies."
        ],
        callout: {
          icon: "📐",
          title: "Theoretical Framework",
          text: "Decommodification vs. Commodification (Esping-Andersen); Growth Machine Theory (Logan & Molotch, 1987) and Urban Regime Theory (Stone, 1993) to decode coalitions between mayors, developers, and social landlords; Spatial Justice (Harvey, Soja); and Residential Segregation models (Lelévrier, Epstein)."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Data Engineering & Geoprocessing",
        content: [
          "The empirical corpus integrates the French National Social Housing Registry (RPLS 2025) cross-referenced with the INSEE Filosofi 2021 demographic micro-grid (200m cells), IGN BD TOPO, and the BDNB national building database. Following temporal filtering (2000-2024), geocoding validation, and exclusion of municipalities with under 20 units, the final sample totaled 55,758 social dwellings (74.7% direct development, 25.3% off-plan VEFA).",
          "To characterize the social environment across multiple scales, bi-scalar indicators were computed using concentric buffers of 500m (immediate neighborhood) and 2,000m (wider living basin) via iterative spatial intersections in R. Median real estate transaction prices were derived from the DVF tax database aggregated at the IRIS statistical tract level. In total, 40 standardized variables fed into the model.",
          "Because housing units are nested within distinct municipal jurisdictions, standard logistic regression would violate observation independence assumptions. The specified GLMM incorporates a municipal random intercept estimated using the lme4 package in R, coupled with a strict selection pipeline: bivariate collinearity screening, iterative variance inflation factor pruning (VIF < 5), and backward step selection via Likelihood Ratio Tests (LRT)."
        ],
        table: {
          title: "Mobilized Geospatial Data Sources",
          headers: ["Source", "Producer", "Analytical Role", "Spatial Granularity"],
          rows: [
            ["RPLS 2025", "SDES / DHUP", "Dependent variable (VEFA = 1 / 0)", "Building address"],
            ["BD TOPO®", "IGN", "Geocoding & spatial joins", "Building polygon"],
            ["Filosofi 200m", "INSEE", "Bi-scalar socio-demographic context", "200m grid cell"],
            ["DVF", "DGFIP", "Median real estate prices", "Property sale / IRIS tract"],
            ["SRU Inventory", "DHUP / Prefecture", "Statutory social housing deficit", "Municipality"],
            ["BDNB", "Cerema", "Physical building characteristics", "Building footprint"]
          ]
        },
        codeSnippet: {
          lang: "R",
          title: "Logistic GLMM Specification (lme4)",
          code: `# Generalized Linear Mixed-Effects Model
# Dependent variable: vefa_bin (1 = VEFA turnkey, 0 = direct public dev)

library(lme4)
library(performance)

mod_glmm <- glmer(
  vefa_bin ~
    scale(prix_median_iris)     +  # local market price (DVF)
    scale(taux_pauvrete_500m)   +  # immediate poverty rate
    scale(taux_pauvrete_2000m)  +  # regional poverty rate
    scale(deficit_sru)          +  # statutory SRU quota deficit
    scale(dist_transport_m)     +  # distance to transit
    (1 | code_commune),            # municipal random intercept
  data   = df_vefa,
  family = binomial(link = "logit")
)

# ICC = 0.734 (73.4%)
icc(mod_glmm)`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Empirical Results & Findings",
        content: [
          "The most striking empirical discovery is the Intra-Class Correlation Coefficient (ICC): 73.4% of the variance in procurement mode is attributable to municipal boundaries. Nakagawa's Pseudo-R² confirms this structural dominance: Marginal R² (fixed effects alone) = 0.059, while Conditional R² (fixed effects + municipal random intercept) = 0.750. The pure institutional municipal contribution reaches 69.1%. The Metropolis acts not as an integrated housing authority, but as a fragmented mosaic of 55 autonomous municipal policies.",
          "Regarding fixed effects, post-1990 residential fabric increases the odds of turnkey VEFA by 50% (OR = 1.50). Neighborhood poverty within 500m is positively associated (OR = 1.32), indicating that private developers seek lower-cost land opportunities. Conversely, rental subsidy covenants are significantly shorter under VEFA (OR = 0.70), and single-parent neighborhoods are avoided (OR = 0.75). The overall predictive accuracy achieved an AUC of 0.8215.",
          "Spatial centrographic analysis using standard deviational ellipses reveals substantial spatial divergence between direct public builds and private turnkey deliveries in outer-ring suburbs: Vitrolles, Éguilles, and Le Rove exhibit barycenter separations exceeding 1,000 to 1,800 meters. These findings are currently being synthesized into a peer-reviewed research paper."
        ],
        figure: {
          src: "/assets/img/projet_vefa.png",
          title: "Fig. 1: Municipal Random Effects Estimated by Logistic GLMM",
          tag: "QGIS / BD TOPO IGN / RPLS",
          caption: "Choropleth map of municipal intercepts (centered log-odds). Blue municipalities favor private turnkey delivery beyond local market fundamentals. Amber municipalities exhibit structural resistance."
        },
        oddsTable: {
          headers: ["Predictor Variable", "Odds Ratio (OR)", "95% CI", "p-value", "Territorial Interpretation"],
          rows: [
            ["Share_Housing_Post90_500m", "1.50", "-", "< 0.05", "Recent housing fabric → high VEFA odds"],
            ["Poverty_Rate_500m", "1.32", "-", "< 0.05", "Immediate poverty → lower land acquisition costs"],
            ["Share_Age25_39_2000m", "1.27", "-", "< 0.05", "Attractive hubs for young working households"],
            ["Covenant_Duration", "0.70", "-", "< 0.05", "Shorter subsidy commitment in VEFA units"],
            ["Single_Parent_Share_500m", "0.75", "-", "< 0.05", "Avoidance of single-parent clusters"],
            ["(1 | code_commune)", "sigma² = 2.85", "ICC = 73.4%", "-", "Overwhelming municipal institutional effect"]
          ]
        },
        infoBox: {
          type: "cyan",
          title: "Research Article in Preparation",
          text: "These findings are currently being prepared for co-authored academic publication, expanding multilevel comparative analysis to other metropolitan areas. Scripts and data pipelines are documented on GitHub."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Critical Discussion & Policy Implications",
        content: [
          "Correlation does not imply causality: higher VEFA concentration in recent, low-income areas may reflect public urban renewal zones (PNRU) rather than developers' unilateral profit-maximizing choices. Instrumental variable models on panel data would be required to isolate pure causal mechanisms.",
          "Additionally, the RPLS registry exhibits a 2-to-4-year reporting lag between building permits and physical tenant occupancy. Marseille, with 870,000 residents, constitutes a massive metropolitan outlier: while sensitivity tests excluding it confirmed coefficient stability, it highlights structural territorial asymmetries.",
          "France's SRU law enforces statutory housing quotas at the municipal boundary without specifying intra-municipal spatial distribution. Turnkey VEFA allows municipal leaders to achieve quantitative quotas while delegating placement to market opportunities, potentially exacerbating micro-segregation. Enforceable metropolitan spatial guidelines are vital to counter this trend."
        ],
        warningBox: {
          title: "Spatial Scope & Extrapolation Limits",
          text: "Conclusions apply at the aggregated scale of the 55 municipalities of the AMP Metropolis. Direct extrapolation to other metropolitan areas without local ICC verification would constitute an ecological fallacy."
        }
      }
    ]
  },
  {
    id: "article-ipa",
    slug: "article-ipa",
    title: "Access Pressure Modeling in Data-Scarce Environments: The Access Pressure Index (IPA)",
    shortTitle: "Spatial Accessibility Metric: Access Pressure Index",
    category: "Recherche & Publication",
    statusBadge: "Paper in Preparation",
    statusText: "Methodological Research & Scientific Paper in Preparation",
    statusColor: "cyan",
    thumbnail: "/assets/img/projet_ipa.png",
    subtitle: "Designed a parsimonious alternative to the 2SFCA framework to assess spatial disparities in public service accessibility when facility capacity data is unavailable. The IPA models territorial double jeopardy: distance friction compounded by destination demographic congestion.",
    excerpt: "The Access Pressure Index (IPA) is a robust alternative to 2SFCA models for evaluating spatial service inequalities under scarce facility supply data. It models real network friction (QNEAT3), demographic catchment pressure, and facility competition. Validated on university accessibility for youth (aged 18-24) in Avignon.",
    tags: ["R", "QNEAT3", "QGIS", "Road Network"],
    summaryFooter: "Avignon | Ages 18-24 | University Hub Access",
    meta: [
      { label: "Status", value: "Manuscript in preparation for submission" },
      { label: "Framework", value: "Public Service Geography Research" },
      { label: "Territory", value: "Greater Avignon" },
      { label: "Core Method", value: "QNEAT3 Network Analysis + R" }
    ],
    links: {
      pdf: "/assets/pdf/Indice de Pression d'Accès (IPA), Marceau Chapon.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Research Problem & Methodological Challenge",
        content: [
          "In international spatial analysis literature, the standard methodology for measuring spatial accessibility to public facilities is the Two-Step Floating Catchment Area model (2SFCA, Luo & Wang 2003). While mathematically elegant, it relies on a heavy assumption: the availability of granular data on the true intake capacity of every facility. In real-world local administration, such capacity data is incomplete or non-existent, leading to 'Garbage in, Garbage out' outcomes and widening the usability gap (Geertman 2017, Pelzer 2017).",
          "I designed the Access Pressure Index (IPA) as a transparent, parsimonious alternative. Rather than smoothing accessibility through arbitrary floating buffers, the IPA models territorial dependency by assigning demand to the closest reachable hub via true road network topology, capturing the acute risk of service bottlenecks."
        ],
        callout: {
          icon: "📐",
          title: "Mathematical Formulation of IPA",
          text: "IPA = (M × DR) × (NB_M / NB_INF), where M = origin cell target population, DR = minimum topological network distance (QNEAT3), NB_M = aggregate population competing for the same facility, NB_INF = number of equivalent destination facilities."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Data Engineering & Network Routing",
        content: [
          "The methodology was implemented using QGIS QNEAT3 for topological network routing, coupled with R for metric standardization and distribution modeling. The spatial framework leverages the IGN BD TOPO road network, enriched with intersection constraints and pedestrian/cyclist friction coefficients.",
          "Origin units were drawn from the INSEE Filosofi 200m population grid, isolating the target demographic cohort (students aged 18-24). Destinations were mapped from open academic and municipal facilities."
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Empirical Results & Spatial Patterns",
        content: [
          "The IPA reveals acute spatial polarization: peripheral peri-urban districts suffer disproportionate access penalties where travel distance is exacerbated by catchment congestion. Conversely, central wards benefit from dense transit redundancy, keeping IPA values low despite intense demographic densities.",
          "The metric demonstrates strong statistical stability and significantly lower sensitivity to edge effects than standard buffer or gravity models, making it directly actionable for local planners without requiring expensive proprietary capacity audits."
        ]
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Critical Discussion & Perspectives",
        content: [
          "The model assumes deterministic routing to the nearest facility, reflecting strict administrative or practical dependencies. For elective services (leisure, retail), incorporating stochastic gravity choices would refine predictive behavior.",
          "The IPA provides local governments with a fast, defensible diagnostic tool to optimize future public facility placement under tight budgetary constraints."
        ]
      }
    ]
  },
  {
    id: "grand-avignon-climat",
    slug: "grand-avignon-climat",
    title: "Urban Heat Island & Thermal Vulnerability Diagnostic in Greater Avignon (16 Municipalities)",
    shortTitle: "Urban Overheating, Cool Islands & Climate Adaptation",
    category: "Commande publique",
    statusBadge: "Public Commission (L3)",
    statusText: "Public Study Commission (164 pages) | Greater Avignon Agglomeration | 2024-2025",
    statusColor: "emerald",
    thumbnail: "/assets/img/projet_chaleur.png",
    subtitle: "As technical and GIS lead, I directed a 164-page municipal climate audit across 16 municipalities. The study combined Landsat 8 Land Surface Temperature (LST) mapping, Local Climate Zones (LCZ) classification at 50m resolution, multi-criteria vulnerability modeling, and the deployment blueprint for a 120-sensor IoT microclimate network.",
    excerpt: "Under France's National Climate Adaptation Plan (PNACC-3), Greater Avignon commissioned an operational thermal diagnostic across its 16 municipalities. By combining multitemporal Landsat 8 satellite thermography with LCZ modeling, the study uncovered that commercial and industrial zones account for 72.1% of cumulative heat island surface area. Resulted in 130 cool corridors mapped and a 120-sensor IoT monitoring deployment.",
    tags: ["Landsat 8", "LCZ", "QGIS Model Builder", "PostGIS", "PCA/HCA", "IoT Network"],
    summaryFooter: "16 municipalities | 164-page report | 120 IoT sensors | LCZ at 50m",
    meta: [
      { label: "Status", value: "Public Study (164 p.) | 2024-2025" },
      { label: "Client", value: "Greater Avignon Agglomeration" },
      { label: "Territory", value: "16 municipalities (Vaucluse & Gard)" },
      { label: "Methods", value: "Landsat / LCZ / PCA/HCA / PostGIS", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/La surchauffe urbaine dans le Grand Avignon, entre îlots de fraîcheur et prévention.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Context & Contractual Objectives",
        content: [
          "Under France's PNACC-3 national climate strategy ('France at +4°C'), the Greater Avignon Urban Community commissioned an operational thermal diagnostic across its 16 member municipalities. The territory experiences intense Mediterranean heatwaves and severe drought, with RCP 8.5 projections indicating over 50 tropical nights annually by 2100.",
          "I served as head of the GIS and modeling unit: architecting PostgreSQL/PostGIS databases, automating workflows in QGIS Model Builder, modeling LCZs, and designing the cartographic atlas.",
          "Deliverables included multitemporal satellite Land Surface Temperature (LST) mapping, Local Climate Zones classification at 50m, bioclimatic Heat Index modeling, multivariate vulnerability clustering, and the operational blueprint for 120 IoT microclimate sensors."
        ],
        callout: {
          icon: "📋",
          title: "Contractual Deliverables",
          text: "1. Heat Island Cartographic Atlas (16 municipalities) | 2. LCZ classification at 50m | 3. Biometeorological Heat Index | 4. PCA/HCA socio-demographic vulnerability audit | 5. 120-sensor IoT monitoring deployment plan | 6. Binding guidelines for the metropolitan Master Plan (PLUi-H)."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Satellite Processing & Geospatial Workflow",
        content: [
          "Processed Landsat 8 TIRS thermal imagery (band 10) covering summers of 1990, 2001, 2010 and confirmed heatwave events (2019-2024). Average surface warming reached +2.5°C between 1990 and 2010. During recent heatwaves, mean urban surface temperature peaked at 35.2°C (built environments reaching 36.9°C). The end-to-end pipeline was automated via QGIS Model Builder.",
          "The 50m LCZ classification combined IGN BD TOPO v3 building heights with OCS GE land cover. Multivariate analysis (PCA on 8 variables followed by Ward's hierarchical clustering) over the 200m INSPIRE grid intersected with the national building registry identified 46 hyper-vulnerability cells concentrating low-income households, seniors, and energy-inefficient buildings."
        ],
        table: {
          title: "Satellite and Vector Data Sources",
          headers: ["Source", "Sensor / Product", "Analytical Purpose", "Resolution"],
          rows: [
            ["Landsat 8 OLI/TIRS", "USGS / NASA", "Land Surface Temperature (LST)", "30m"],
            ["BD TOPO® IGN", "IGN", "Building footprints, roads, canopy", "Metric vector"],
            ["Corine Land Cover", "IGN / Copernicus", "Land cover & green infrastructure", "Vector / 100m"],
            ["MOS Greater Avignon", "Greater Avignon", "Fine-grain land use typology", "Vector"],
            ["BDNB Cerema", "Cerema / ADEME", "Building thermal energy efficiency", "Building level"],
            ["LCZ Cerema", "Cerema", "Reference Local Climate Zones", "Polygon"]
          ]
        },
        methodSteps: [
          { step: "1", title: "Landsat Calibration", desc: "Top-of-Atmosphere (TOA) radiometric correction and NDVI-based emissivity computation." },
          { step: "2", title: "LST Calculation", desc: "Mono-Window map algebra validated against ground Météo-France weather stations." },
          { step: "3", title: "LCZ Typology", desc: "PCA/HCA clustering integrating urban morphology and surface thermal metrics into 5 classes." },
          { step: "4", title: "IoT Sensor Placement", desc: "DBSCAN spatial clustering in PostGIS to optimize ground sensor coverage over critical hotspots." }
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Key Findings & Concrete Territorial Impact",
        content: [
          "Major counter-intuitive insight: retail and commercial zones (Mistral 7, Le Pontet, Courtine) account for only 31.2% of heat islands by count, but concentrate 72.1% of cumulative heat island surface area (12.08 km²), climbing to 94.5% when agricultural bare lands are excluded. Massive dark flat roofs and unshaded asphalt parking lots represent the prime operational intervention target.",
          "The dense historical center exhibits moderate daytime surface heat due to narrow street shade, but traps and re-radiates heat at night. Mapped 130 cool islands reachable within 500m and designed a green-blue urban corridor connecting the Barthelasse island to the city center.",
          "The study resulted in the phasing of 120 thermohygrometric IoT sensors across 6 waves, multi-criteria assessment of 1,179 public parcels for climate shelters, and mandatory photovoltaic shade canopy requirements for commercial parking > 1,500 m². These recommendations were integrated into the metropolitan PLUi-H 2025-2030 master plan."
        ],
        figure: {
          src: "/assets/img/projet_chaleur.png",
          title: "Fig. 1: LST Thermal Surface Map & Heat Island Classification",
          tag: "Landsat 8 / QGIS Model Builder / PostGIS",
          caption: "Spatial distribution of summer LST. Red/orange: critical heat hotspots (Courtine, Le Pontet, Montfavet). Cyan/green: cooling corridors along the Rhône and Durance rivers."
        },
        infoBox: {
          type: "emerald",
          title: "Operational Policy Integration",
          text: "Maps and regulatory prescriptions from this report have been directly integrated into the binding programming guidelines (OAP) of Greater Avignon's PLUi-H 2025-2030."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Critical Assessment & Satellite Resolution Limits",
        content: [
          "Radiometric surface temperature (LST) measured by satellite does not directly equal pedestrian air temperature at 2m. Bridging this gap was the primary rationale behind designing the in-situ IoT microclimate network.",
          "Météo-France's official heatwave definition (requiring 3 consecutive days above threshold) causes planners to miss 33% of extreme heat days (1-2 days) which remain hazardous for vulnerable demographics. Deploying the IoT network adheres to strict GDPR compliance guidelines to protect civil liberties while informing climate adaptation."
        ],
        warningBox: {
          title: "Temporal Satellite Acquisition Windows",
          text: "Landsat overpasses occur in mid-morning. Nighttime thermal inversion dynamics require ground weather station cross-validation."
        }
      }
    ]
  },
  {
    id: "rennes-foncier-sig",
    slug: "rennes-foncier-sig",
    title: "Urban Infill & Vertical Extension Potential in Rennes Metropolis: 3D Modeling & Multi-Criteria GIS",
    shortTitle: "Vertical Building Extensions for Sustainable Urban Density",
    category: "Modélisation & 3D",
    statusBadge: "B.Sc. Capstone (L3)",
    statusText: "GIS Engineering Capstone Project | Avignon University | 2025",
    statusColor: "muted",
    thumbnail: "/assets/img/projet_rennes.png",
    subtitle: "As technical and methodological lead, designed an automated high-resolution (1m) raster map algebra detection model for vertical building additions, coupled with a 29-coefficient horizontal multi-criteria evaluation under Zero Net Artificialization (ZAN) and local master plan constraints across 208,351 buildings in Rennes Metropolis.",
    excerpt: "Confronting contradictory pressures between housing demand (5,000 homes/year) and France's Zero Net Artificialization law (halving land consumption by 2030), this project identifies deployable urban infill via a dual approach: aerial vertical extensions (33,304 viable buildings, yielding 22 km² of floor reserve) and horizontal land recycling (27 km² of scored developable land).",
    tags: ["50cm DSM/DTM", "PLUi", "ZAN Law", "Spatial SQL"],
    summaryFooter: "Rennes Metropolis | 3D GIS Modeling | Automation | ZAN Law",
    meta: [
      { label: "Status", value: "L3 Capstone | 2025" },
      { label: "Curriculum", value: "B.Sc. in Geography & Geomatics" },
      { label: "Territory", value: "Rennes Metropolis | 43 municipalities" },
      { label: "Resolution", value: "50cm DSM/DTM | 1m Raster", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Devoir maison SIG, Rennes Métropole, Alexi, Gwendoline, Hugo, Marceau.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Urban Density Dilemma & Theoretical Reserve",
        content: [
          "France's Climate & Resilience Law (2021) mandates halving land artificialization rates by 2030, targeting Zero Net Artificialization (ZAN) by 2050. In dynamic regional hubs like Rennes, continuous horizontal suburban sprawl onto agricultural land is no longer viable.",
          "The solution lies in mobilizing invisible vertical land reserves: adding floors to existing structures up to the maximum height authorized by municipal zoning (PLUi). I designed a model to automatically scan and quantify buildings capable of supporting at least one additional story across all 43 municipalities of Rennes Metropolis (>208,000 modeled structures)."
        ],
        callout: {
          icon: "📐",
          title: "The CC48 Infill Coefficient",
          text: "CC48 = Actual_Building_Height / Max_Allowed_Height_PLUi. A CC48 < 0.75 indicates an available height reserve of at least 3 meters (a full habitable floor) beneath statutory zoning ceilings."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "3D Altimetry & Raster Map Algebra",
        content: [
          "Merged and resampled 50cm LiDAR Digital Surface Models (DSM) and Digital Terrain Models (DTM) from IGN at 1m resolution under RGF93 / CC48 projection (EPSG:3948).",
          "Following rasterization of municipal PLUi height envelopes, net building heights were extracted via matrix subtraction, filtering out non-habitable annexes and garages (heights < 4m excluded)."
        ],
        codeSnippet: {
          lang: "QGIS",
          title: "Raster Calculator Expression (CC48 Detection)",
          code: `# 1. Net building height computation
building_height = ( "DSM@1" - "DTM@1" )

# 2. Ratio relative to regulatory ceiling
CC48 = building_height / "H_max_PLUi@1"

# 3. Multi-criteria rooftop eligibility mask
# - CC48 < 0.75 (at least 1 habitable floor remaining)
# - building_height > 4m (excludes garages & sheds)
# - Strict exclusion of agricultural & natural zones
eligible = (CC48 < 0.75) AND (building_height > 4)
           AND ("PLUi_Zone@1" NOT IN (1, 2))`
        },
        table: {
          title: "Spatial Datasets Used",
          headers: ["Source", "Producer", "Analytical Role", "Resolution"],
          rows: [
            ["LiDAR HD / DSM / DTM", "IGN / RGE ALTI®", "Altimetric surface & terrain elevation", "50cm native"],
            ["BD TOPO®", "IGN", "Cadastral footprints & buildings", "Metric vector"],
            ["PLUi Rennes Metropolis", "Rennes Metropolis", "Zoning height ceilings & urban rules", "Vector"],
            ["DVF Land Registry", "DGFIP", "Cadastral age & property typology", "Parcel"]
          ]
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Spatial Quantifications & Priority Classification",
        content: [
          "The algorithm detected 33,304 viable buildings across Rennes Metropolis, representing a theoretical capacity of nearly 23,000 new housing units without paving a single square meter of greenfield land. Cumulative rooftop footprint totals 22 km².",
          "A multi-criteria prioritization across 5 classes—combining transit proximity, commercial amenities, and historical heritage perimeters—identified 14,065 high-priority buildings (classes P1 and P2). These structures alone could cover 60% of housing targets set by the metropolitan housing plan for 2030.",
          "This capstone study assesses theoretical reserves: physical structural feasibility and co-ownership voting constraints would require subsequent architectural and financial modeling before operational groundbreak."
        ],
        figure: {
          src: "/assets/img/projet_rennes.png",
          title: "Fig. 1: 3D Visualization and Prioritization of Vertical Extension Potentials",
          tag: "LiDAR HD / QGIS 3D / EPSG 3948",
          caption: "Perspective rendering of analyzed rooftops. Cyan buildings possess favorable CC48 values. Amber: buildings constrained by heritage easements or distant from transit."
        },
        table: {
          title: "Distribution of Buildings by Land Priority Tier",
          headers: ["Priority Tier", "Building Count", "Key Criteria", "Footprint Area"],
          rows: [
            ["P1: Immediate Optimal", "4,218", "Very close to transit + CC48 < 0.5", "3.2 km²"],
            ["P2: High Potential", "9,847", "Good transit access + CC48 < 0.75", "8.1 km²"],
            ["P3: Moderate Potential", "11,203", "Low-density suburban fabric", "9.4 km²"],
            ["P4: Constrained", "6,891", "Heritage protection easements", "5.3 km²"],
            ["P5: Non-Convertible", "1,145", "Natural zones or saturated height", "1.0 km²"]
          ]
        },
        infoBox: {
          type: "emerald",
          title: "Empirical Demonstration of ZAN Feasibility",
          text: "This study demonstrated that Zero Net Artificialization targets do not prevent demographic vitality in growing regions, provided vertical urban capacity is mobilized methodically."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Technical Limits & Perspectives",
        content: [
          "The 1m raster resolution smooths minor rooftop details (chimneys, dormers), warranting cadastral validation for parcels smaller than 50 m². Operational deployment requires structural engineering assessments and financial balance sheet modeling."
        ],
        warningBox: {
          title: "Resolution & Complex Rooflines",
          text: "A 1m grid resolution smooths minor rooftop features (chimneys, dormers), warranting on-site validation for parcels smaller than 50 m²."
        }
      }
    ]
  }
];
