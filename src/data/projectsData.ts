import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "memoire-vefa",
    slug: "memoire-vefa",
    title: "Analyse quantitative de la spatialisation des logements sociaux selon leurs méthodes d'acquisition dans la métropole Aix-Marseille-Provence",
    shortTitle: "VEFA Métropole AMP",
    category: "Recherche M1",
    statusBadge: "Mémoire M1",
    statusText: "Mémoire de Master 1, GéoTer - Avignon Université - 2025/2026",
    statusColor: "violet",
    thumbnail: "/assets/img/projet_vefa.png",
    subtitle: "Ce mémoire analyse comment la délégation au privé de la production HLM via la VEFA organise spatialement l'offre sociale dans l'une des plus grandes métropoles françaises, à travers une modélisation logistique à effets mixtes (GLMM) sur près de 55 800 logements.",
    excerpt: "Le passage du modèle de bailleur-constructeur à celui de bailleur-acquéreur via la VEFA HLM transforme la géographie du logement social. Sur la Métropole AMP, mon GLMM logistique à intercept aléatoire communal révèle un ICC de 73,4 % : la commune d'implantation conditionne massivement le recours à la VEFA, bien au-delà des déterminants de marché.",
    tags: ["R", "GLMM", "QGIS", "Filosofi INSEE", "BD TOPO IGN", "RPLS"],
    summaryFooter: "55 communes traitées | ICC = 73,4 % | 55 758 logements analysés",
    meta: [
      { label: "Statut", value: "Mémoire M1 : 2025-2026" },
      { label: "Mention", value: "Major de promotion, Mention Bien" },
      { label: "Territoire", value: "Métropole AMP : 55 communes" },
      { label: "Méthode principale", value: "GLMM / R", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Memoire_M1GEOTER_Marceau_Chapon.pdf",
      github: "https://github.com/MarceauChp/Memoire_M1GEOTER"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Problématique",
        content: [
          "Le secteur du logement social traverse une mutation structurelle : le passage du modèle de « bailleur-constructeur » en Maîtrise d'Ouvrage Directe (MOD) à celui de « bailleur-acquéreur » via la VEFA HLM. Marginal avant 2007, l'achat sur plan auprès de promoteurs privés représente aujourd'hui 30 à 50 % de la production neuve. Ce basculement interroge directement la géographie de l'offre : la délégation de l'acte de bâtir au privé génère-t-elle une localisation distincte des logements sociaux ?",
          "Mon intuition de terrain en Master s'est confirmée : les logements VEFA n'apparaissaient ni dans les mêmes quartiers ni avec la même facture que les opérations conventionnelles. J'ai formulé deux hypothèses : un « effet-commune » (le cadre réglementaire local comme premier filtre) et un « effet de marché » (les promoteurs orientant les lots sociaux vers les secteurs les moins valorisés pour préserver leur marge).",
          "J'ai choisi la Métropole Aix-Marseille-Provence pour son hétérogénéité territoriale : 55 communes aux politiques d'urbanisme contrastées, un marché immobilier polarisé, une pression SRU différenciée, et des bailleurs aux pratiques dissemblables."
        ],
        callout: {
          icon: "📐",
          title: "Cadre théorique mobilisé",
          text: "Démarchandisation vs Marchandisation (Esping-Andersen) ; Théorie des machines de croissance (Logan & Molotch, 1987) et Régimes urbains (Stone, 1993) pour analyser les coalitions d'acteurs au sein du trinôme maire-promoteur-bailleur ; justice spatiale (Harvey, Soja) pour interroger la légitimité des localisations produites ; ségrégation résidentielle (Lelévrier, Epstein) pour mesurer les effets de peuplement."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Données & géo-traitement",
        content: [
          "Mon corpus repose sur le Répertoire du Parc Locatif Social (RPLS, millésime 2025) croisé avec le carroyage Filosofi 2021 (carreaux de 200 m), la BD TOPO IGN et la BDNB. Après filtrage temporel (2000-2024), exclusion des géolocalisations imprécises et des communes ayant produit moins de 20 logements, l'échantillon final totalise 55 758 logements conventionnés (74,7 % en MOD, 25,3 % en VEFA).",
          "Pour caractériser l'environnement social à deux échelles, j'ai construit des indicateurs bi-scalaires par tampons concentriques de 500 m (voisinage immédiat) et 2 000 m (bassin de vie), avec intersection surfacique itérative sous R. Les prix immobiliers médians proviennent de la base DVF agrégés à l'IRIS. Au total, 40 variables relatives standardisées alimentent le modèle.",
          "Les données présentent une structure hiérarchique : les logements sont nichés dans des communes aux dynamiques contrastées. Une régression logistique classique violerait l'hypothèse d'indépendance. Le GLMM que j'ai spécifié intègre un intercept aléatoire communal via la fonction glmer() du package lme4, avec un protocole de sélection rigoureux : filtre de corrélation bivariée, suppression itérative des variables avec VIF > 5, puis sélection descendante par rapport de vraisemblance (LRT)."
        ],
        table: {
          title: "Sources de données mobilisées",
          headers: ["Source", "Producteur", "Usage dans l'analyse", "Granularité"],
          rows: [
            ["RPLS 2025", "SDES / DHUP", "Variable dépendante (VEFA = 1 / 0)", "Adresse logement"],
            ["BD TOPO®", "IGN", "Géolocalisation & jointure spatiale", "Bâtiment"],
            ["Filosofi 200 m", "INSEE", "Contexte socio-démographique bi-scalaire", "Carreau 200 m"],
            ["DVF", "DGFIP", "Prix médian immobilier à l'IRIS", "Mutation / IRIS"],
            ["Inventaire SRU", "DHUP / Préfecture", "Déficit légal en quota HLM", "Commune"],
            ["BDNB", "Cerema", "Caractéristiques physiques des bâtis", "Bâtiment"]
          ]
        },
        codeSnippet: {
          lang: "R",
          title: "Spécification du GLMM logistique (lme4)",
          code: `# Modèle logistique à effets mixtes
# Variable dépendante : vefa_bin (1 = VEFA, 0 = conventionnel)

library(lme4)
library(performance)

mod_glmm <- glmer(
  vefa_bin ~
    scale(prix_median_iris)     +  # prix du marché local (DVF)
    scale(taux_pauvrete_500m)   +  # contexte social proche
    scale(taux_pauvrete_2000m)  +  # contexte social élargi
    scale(deficit_sru)          +  # pression réglementaire SRU
    scale(dist_transport_m)     +  # accessibilité aux TC
    (1 | code_commune),            # effet aléatoire communal
  data   = df_vefa,
  family = binomial(link = "logit")
)

# ICC = 0.734 (73,4 %)
icc(mod_glmm)`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Résultats & Limites",
        content: [
          "Le résultat empirique le plus marquant est l'ICC : 73,4 % de la variabilité du mode d'acquisition dépend de la commune d'implantation. Le Pseudo-R² de Nakagawa confirme : R² marginal (effets fixes seuls) = 0,059, R² conditionnel (effets fixes + aléatoire communal) = 0,750. La contribution institutionnelle communale pure s'élève à 69,1 %. La Métropole AMP n'agit pas comme un ensemble unifié mais comme une mosaïque de 55 stratégies municipales indépendantes.",
          "Au niveau des effets fixes, le tissu résidentiel récent post-1990 augmente de 50 % la probabilité d'être en VEFA (OR = 1,50). Le taux de pauvreté à 500 m est positivement associé (OR = 1,32) : les promoteurs recherchent les opportunités foncières peu valorisées. À l'inverse, les conventions APL sont plus courtes en VEFA (OR = 0,70) et les secteurs à forte monoparentalité sont évités (OR = 0,75). La performance globale du modèle atteint une AUC de 0,8215.",
          "L'analyse centrographique par ellipses d'écart-type révèle une décorrélation spatiale flagrante entre MOD et VEFA dans les communes de deuxième couronne : Vitrolles, Éguilles, Le Rove présentent des écarts de barycentres dépassant 1 000 à 1 800 mètres. Ces résultats font l'objet d'un article de valorisation scientifique en cours de rédaction."
        ],
        figure: {
          src: "/assets/img/projet_vefa.png",
          title: "Fig. 1 : Effets aléatoires communaux estimés par le GLMM",
          tag: "QGIS / BD TOPO IGN / RPLS",
          caption: "Carte choroplèthe des intercepts communaux (log-odds centrés). Les communes en bleu favorisent la production VEFA au-delà des déterminants de marché. Les communes en ambre témoignent d'une résistance structurelle."
        },
        oddsTable: {
          headers: ["Variable explicative", "Odds-Ratio (OR)", "IC à 95 %", "p-valeur", "Interprétation territoriale"],
          rows: [
            ["Part_Log_ap90_500m", "1,50", "-", "< 0,05", "Tissu résidentiel récent → forte probabilité VEFA"],
            ["Taux_Pauvrete_500m", "1,32", "-", "< 0,05", "Pauvreté immédiate → opportunité foncière"],
            ["Part_25_39_2000m", "1,27", "-", "< 0,05", "Quartiers attractifs pour jeunes actifs"],
            ["Annee_Exp", "0,70", "-", "< 0,05", "Conventions APL plus courtes en VEFA (PLS)"],
            ["Part_Monop_500m", "0,75", "-", "< 0,05", "Évitement des secteurs monoparentaux"],
            ["(1 | code_commune)", "sigma² = 2,85", "ICC = 73,4 %", "-", "Effet de structure communal écrasant"]
          ]
        },
        infoBox: {
          type: "cyan",
          title: "Article de valorisation en préparation",
          text: "Ces résultats font l'objet d'un article en cours de co-rédaction visant à étendre la comparaison multiniveaux à d'autres métropoles. Données et scripts R disponibles sur le dépôt GitHub officiel."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Discussion critique",
        content: [
          "Corrélation ne vaut pas causalité : la sur-présence de VEFA dans les tissus récents et pauvres peut traduire la localisation préférentielle des opérations de rénovation urbaine (PNRU) et des ZAC plutôt qu'une seule stratégie unilatérale des promoteurs. Une régression par variables instrumentales sur données de panel serait requise pour isoler la causalité pure.",
          "Par ailleurs, le RPLS comporte un décalage de 2 à 4 ans entre agrément et livraison, et l'absence d'indicateur direct de valeur foncière vénale dans le modèle de base constitue une limite assumée. Marseille, avec ses 870 000 habitants, constitue un outlier métropolitain majeur : sa neutralisation dans des modèles de sensibilité n'altère pas les coefficients mais rappelle l'asymétrie territoriale.",
          "La loi SRU impose un quota à l'échelle communale sans prescrire de répartition infra-communale. La VEFA permet de valider les obligations quantitatives tout en reléguant le parc social dans des secteurs spécifiques. L'échelon métropolitain doit fixer des prescriptions de localisation opposables pour éviter que la VEFA n'accentue le tri spatial."
        ],
        warningBox: {
          title: "Biais d'échelle & portée",
          text: "Les conclusions valent à l'échelle agrégée des 55 communes de la Métropole AMP. L'extension directe à d'autres métropoles sans vérification de l'ICC locale constituerait un abus d'extrapolation."
        }
      }
    ]
  },
  {
    id: "article-ipa",
    slug: "article-ipa",
    title: "Analyse de pression d'accès aux espaces d'un territoire pauvre en données : l'Indice de Pression d'Accès (IPA)",
    shortTitle: "Mesure de l'accessibilité : l'Indice de Pression d'Accès",
    category: "Recherche & Publication",
    statusBadge: "Article en cours de rédaction",
    statusText: "Manuscrit en révision",
    statusColor: "cyan",
    thumbnail: "/assets/img/projet_ipa.png",
    subtitle: "J'ai conçu une méthode alternative et parcimonieuse au modèle 2SFCA pour diagnostiquer les inégalités d'accès aux services publics lorsque les données d'offre sont indisponibles. L'IPA formalise la notion de double peine territoriale : éloignement kilométrique cumulé à la saturation démographique à destination.",
    excerpt: "L'IPA est une alternative au modèle 2SFCA pour évaluer les tensions d'accès dans un contexte de données d'offre lacunaires. L'approche combine friction réseau réelle (QNEAT3), pression démographique et concurrence entre équipements. Testée sur l'accès des 18-24 ans aux pôles universitaires d'Avignon.",
    tags: ["R", "QNEAT3", "QGIS", "Réseau viaire"],
    summaryFooter: "Avignon | 18-24 ans | Accès aux pôles universitaires",
    meta: [
      { label: "Statut", value: "Manuscrit en révision" },
      { label: "Cadre", value: "Recherche en géographie des services" },
      { label: "Territoire", value: "Avignon" },
      { label: "Méthode principale", value: "Réseau QNEAT3 + R" }
    ],
    links: {
      pdf: "/assets/pdf/Indice de Pression d'Accès (IPA), Marceau Chapon.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Problématique",
        content: [
          "Dans la littérature internationale, la méthode de référence pour mesurer l'accessibilité spatiale aux services est la 2SFCA (Two-Step Floating Catchment Area, Luo & Wang 2003). Bien qu'élégante, elle repose sur un postulat lourd : la disponibilité de données précises sur la capacité d'accueil réelle de chaque infrastructure. Or, dans la réalité des collectivités territoriales françaises, ces données d'offre sont lacunaires, voire inexistantes. Appliquer ces modèles relève du piège du « Garbage in, Garbage out », accentuant le « usability gap » (Geertman 2017, Pelzer 2017).",
          "J'ai conçu l'Indice de Pression d'Accès (IPA), une alternative parcimonieuse et transparente. Plutôt que de lisser l'accessibilité par des zones de chalandise flottantes, l'IPA modélise la dépendance territoriale en assignant la population au pôle le plus proche par le réseau viaire réel, mesurant ainsi le risque de rupture de service."
        ],
        callout: {
          icon: "📐",
          title: "Formulation mathématique de l'IPA",
          text: "IPA = (M × DR) × (NB_M / NB_INF), où M = population demandeuse de la maille d'origine, DR = distance minimale par le réseau viaire (QNEAT3), NB_M = population du bassin d'attraction convergeant vers la même infrastructure, NB_INF = nombre d'infrastructures équivalentes à destination."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Données & géo-traitement",
        content: [
          "Le graphe routier provient d'OpenStreetMap et de la BD CARTO® IGN. J'ai modélisé les isochrones piéton et véhicule à 10, 20 et 30 minutes avec l'extension QNEAT3 sous QGIS.",
          "La demande potentielle est estimée par interpolation aréale du carroyage Filosofi (déciles de revenus, part des bénéficiaires de minima sociaux). La normalisation se fait en deux variables : Y1 (transformation logarithmique pour la rigueur statistique) et Y2 (Min-Max sur 0-100 pour l'aide à la décision), avec discrétisation par seuils naturels de Jenks."
        ],
        table: {
          title: "Bases de données et protocoles d'intégration",
          headers: ["Source", "Producteur", "Usage dans le pipeline", "Granularité"],
          rows: [
            ["OSM / BD CARTO®", "IGN / Contributeurs OSM", "Graphe réseau topologique multimodal", "Tronçon viaire"],
            ["Filosofi 2019", "INSEE", "Population précaire & demande potentielle", "Carreau 200 m / IRIS"],
            ["BPE 2022", "INSEE", "Localisation des équipements et services", "Adresse ponctuelle"],
            ["CNAF Vaucluse", "CNAF", "Taux de non-recours observé (validation)", "Commune / IRIS"]
          ]
        },
        methodSteps: [
          { step: "1", title: "Topologie de graphe viaire", desc: "Nettoyage des discontinuités géométriques et calcul de matrice Origine-Destination sous QNEAT3." },
          { step: "2", title: "Distance-temps minimale", desc: "Temps d'accès au service le plus proche pondéré par mode de transport." },
          { step: "3", title: "Pression de demande", desc: "Cumul des populations précaires dans chaque bassin isochrone." },
          { step: "4", title: "Normalisation & Synthèse", desc: "Calcul de l'IPA, tests de corrélation non paramétriques (Spearman) et ajustement Bonferroni." }
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Résultats & Limites",
        content: [
          "L'application de l'IPA à l'accès des 18-24 ans aux pôles universitaires d'Avignon montre une relation hautement significative (p-value < 2,2e-16) entre l'IPA et la concentration de ménages pauvres, avec un R² de 0,138 et un MAE de 38,8 points sur échelle 100 après correction de Bonferroni et exclusion de 10 outliers.",
          "L'IPA valide empiriquement les théories de l'injustice spatiale (Spatial Mismatch de Kain 1968, exclusion par les transports de Lucas 2012) : les quartiers périphériques défavorisés cumulent un temps de trajet important et une saturation critique sur leur pôle de rattachement, constituant des poches franches de « double peine ». L'absence de dépendance aux données d'offre privées rend l'IPA immédiatement déployable par n'importe quelle agence d'urbanisme disposant de QGIS et des données ouvertes de l'INSEE."
        ],
        figure: {
          src: "/assets/img/projet_ipa.png",
          title: "Fig. 1 : Isochrones réseau et modélisation spatiale de l'IPA",
          tag: "QGIS / QNEAT3 / R",
          caption: "Cartographie de l'IPA par IRIS. Dégradé de bleu (accessibilité fluide) à rouge (double peine d'accès). Les axes majeurs de transport structurent les corridors favorables."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Discussion critique",
        content: [
          "Le postulat de l'équipement le plus proche simplifie les comportements de mobilité réelle : pas de prise en compte des préférences qualitatives, des habitudes ou du chaînage de déplacements (Cervero 1996). L'IPA assimile par ailleurs des infrastructures de capacités inégales faute de données d'entrée, et dépend de la maille spatiale fixe du carroyage Insee 200 m (effet MAUP potentiel).",
          "L'IPA est un outil de ciblage macro pour planifier des permanences mobiles ou de nouveaux équipements. Il ne remplace pas une enquête qualitative de terrain auprès des usagers."
        ],
        warningBox: {
          title: "Précautions d'interprétation",
          text: "L'IPA est un outil de ciblage macro pour planifier des permanences mobiles ou de nouveaux équipements, et ne remplace pas une enquête qualitative de terrain."
        }
      }
    ]
  },
  {
    id: "grand-avignon-climat",
    slug: "grand-avignon-climat",
    title: "Surchauffe urbaine dans le Grand Avignon : entre îlots de fraîcheur et prévention",
    shortTitle: "Analyse du climat urbain dans le Grand Avignon",
    category: "Commande publique",
    statusBadge: "Commande publique",
    statusText: "Rapport commandé par le Grand Avignon pour projet de fin d'année | 164 pages | 2024-2025",
    statusColor: "emerald",
    thumbnail: "/assets/img/projet_chaleur.png",
    subtitle: "En tant que responsable du pôle SIG et modélisation, j'ai piloté la chaîne géomatique complète commandée par la Direction Transition et Mobilités du Grand Avignon : télédétection Landsat multitemporelle, classification LCZ à 50 m, modélisation biométéorologique du Heat Index, et dimensionnement d'un réseau de 120 capteurs IoT.",
    excerpt: "Commandé par le Grand Avignon dans le cadre du PNACC-3, ce rapport de 164 pages couvre la cartographie thermique de surface par télédétection Landsat, la classification LCZ, l'analyse multivariée des vulnérabilités (ACP + CAH) et l'identification de 130 îlots de fraîcheur connectables. Les zones commerciales concentrent 72,1 % de la surface cumulée des îlots de chaleur.",
    tags: ["PostGIS", "Landsat 8", "QGIS Model Builder", "LCZ"],
    summaryFooter: "Grand Avignon | LCZ | PostGIS | QGIS",
    meta: [
      { label: "Statut", value: "Commande publique | 2024-2025" },
      { label: "Commanditaire", value: "Grand Avignon | Direction Transition" },
      { label: "Territoire", value: "Grand Avignon : 16 communes" },
      { label: "Méthodes", value: "Landsat / LCZ / ACP/CAH / PostGIS", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/La surchauffe urbaine dans le Grand Avignon, entre îlots de fraîcheur et prévention.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Problématique",
        content: [
          "Dans le cadre du PNACC-3 (« La France à +4 °C »), la Communauté d'Agglomération du Grand Avignon m'a confié la réalisation d'un diagnostic thermique opérationnel à l'échelle de ses 16 communes. Le territoire avignonnais subit un climat méditerranéen soumis au Mistral et à des sécheresses intenses, avec une projection alarmante selon le scénario RCP 8.5 : plus de 50 nuits tropicales par an d'ici 2100.",
          "J'ai assumé le rôle de responsable du pôle SIG et modélisation : mise en place des bases de données PostgreSQL/PostGIS, automatisation sous QGIS Model Builder, modélisation des LCZ, conception de la charte graphique et production de la majorité des cartes de l'atlas.",
          "Les livrables comprenaient la cartographie satellitaire multitemporelle de la température de surface (LST), la classification des Local Climate Zones (LCZ à 50 m), la modélisation biométéorologique du Heat Index, l'analyse statistique multivariée des vulnérabilités et le plan de déploiement de 120 capteurs IoT."
        ],
        callout: {
          icon: "📋",
          title: "Objectifs contractuels",
          text: "1. Atlas cartographique des ICU (16 communes) | 2. Classification LCZ à 50 m | 3. Modélisation biométéorologique du Heat Index | 4. Analyse ACP/CAH des vulnérabilités | 5. Plan d'implantation de 120 capteurs IoT | 6. Recommandations opposables pour le PLUi-H."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Données & géo-traitement",
        content: [
          "J'ai traité des images thermiques Landsat 8 TIRS (bande 10) sur les étés 1990, 2001, 2010 et les journées de canicules avérées (2019-2024). Le réchauffement de surface moyen atteint +2,5 °C entre 1990 et 2010. Lors des canicules récentes, la température de surface moyenne métropolitaine culmine à 35,2 °C (zones bâties à 36,9 °C). L'automatisation complète du workflow a été réalisée sous QGIS Model Builder.",
          "La classification LCZ à 50 m croise la BD TOPO v3 (hauteurs, emprises) et l'OCS GE (6 classes d'occupation du sol). L'analyse multivariée (ACP sur 8 variables suivie d'une CAH de Ward) sur le maillage INSPIRE 200 m croisé avec la BDNB a permis d'identifier 46 carreaux d'hyper-vulnérabilité concentrant ménages pauvres, familles monoparentales, seniors isolés et passoires thermiques."
        ],
        table: {
          title: "Sources de données satellitaires et vectorielles",
          headers: ["Source", "Capteur / Produit", "Usage", "Résolution"],
          rows: [
            ["Landsat 8 OLI/TIRS", "USGS / NASA", "Température de Surface (LST)", "30 m"],
            ["BD TOPO® IGN", "IGN", "Emprise bâtie, voirie, végétation", "Vecteur métrique"],
            ["RPG & Corine Land Cover", "IGN / Copernicus", "Occupation des sols et trames vertes", "Vecteur / 100 m"],
            ["MOS Grand Avignon", "Grand Avignon", "Typologie d'occupation fine", "Vecteur"],
            ["BDNB Cerema", "Cerema / ADEME", "Performance énergétique du bâti", "Bâtiment"],
            ["LCZ Cerema", "Cerema", "Grille de référence Local Climate Zones", "Polygone"]
          ]
        },
        methodSteps: [
          { step: "1", title: "Calibration Landsat", desc: "Correction radiométrique TOA et calcul d'émissivité à partir du NDVI." },
          { step: "2", title: "Calcul LST", desc: "Algèbre matricielle Mono-Window et validation sur les stations Météo-France." },
          { step: "3", title: "Typologie LCZ", desc: "ACP/CAH combinant morphologie urbaine et thermique de surface en 5 clusters." },
          { step: "4", title: "Réseau IoT", desc: "Clustering spatial DBSCAN sous PostGIS pour maximiser la couverture des zones critiques." }
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Résultats & Limites",
        content: [
          "Résultat majeur et contre-intuitif : les zones commerciales et d'activités (Mistral 7, Le Pontet, Courtine) ne représentent que 31,2 % des îlots de chaleur en nombre, mais concentrent 72,1 % de la surface cumulée des ICU (12,08 km²), grimpant à 94,5 % si l'on exclut les champs et friches. Ces vastes toitures sombres et parkings goudronnés non ombragés constituent le gisement d'action prioritaire.",
          "Le centre historique minéral (intramuros) présente un comportement thermique modéré le jour grâce à l'ombre portée des ruelles étroites, mais restitue la chaleur la nuit. J'ai modélisé 130 îlots de fraîcheur connectables à moins de 500 m et proposé un grand corridor urbain reliant la Barthelasse au centre-ville via le pont Daladier.",
          "Le rapport a abouti au dimensionnement d'un réseau de 120 capteurs thermohygrométriques phasé en 6 vagues, à l'analyse multicritère de 1 179 parcelles publiques pour des refuges climatiques, et à des prescriptions d'ombrières photovoltaïques sur les parkings commerciaux > 1 500 m². Les cartographies ont été intégrées dans les OAP du PLUi-H 2025-2030."
        ],
        figure: {
          src: "/assets/img/projet_chaleur.png",
          title: "Fig. 1 : Carte thermique LST et typologie des îlots de chaleur",
          tag: "Landsat 8 / QGIS Model Builder / PostGIS",
          caption: "Répartition spatiale de la LST estivale. En rouge/orange : îlots de chaleur critiques (ZAC Courtine, Le Pontet, Montfavet). En cyan/vert : corridors de fraîcheur des rives du Rhône et de la Durance."
        },
        infoBox: {
          type: "emerald",
          title: "Impact territorial concret",
          text: "Les cartographies et préconisations de ce rapport ont été intégrées dans les orientations d'aménagement et de programmation (OAP) du PLUi-H 2025-2030 du Grand Avignon."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Discussion critique",
        content: [
          "La température de surface radiométrique (LST) mesurée par satellite ne reflète pas directement la température de l'air ressentie par un piéton à 2 m. C'est précisément pour combler cet écart que j'ai conçu le réseau de capteurs IoT.",
          "La définition Météo-France de la canicule (3 jours consécutifs de dépassement) conduit à ignorer 33 % des journées caniculaires réelles (1-2 jours), pourtant létales pour les publics fragiles. Sur le plan déontologique, le cahier des charges de déploiement des capteurs garantit la conformité RGPD afin que ce réseau serve l'adaptation climatique sans dériver vers la surveillance."
        ],
        warningBox: {
          title: "Précision temporelle des satellites",
          text: "Le passage Landsat intervient en milieu de matinée. Les dynamiques nocturnes d'inversion thermique nécessitent un croisement avec les stations terrestres."
        }
      }
    ]
  },
  {
    id: "rennes-foncier-sig",
    slug: "rennes-foncier-sig",
    title: "Recherche de gisements fonciers dans Rennes Métropole : surélévation 3D et analyse multicritère",
    shortTitle: "La surélévation, levier de la densification urbaine",
    category: "Modélisation & 3D",
    statusBadge: "Projet L3",
    statusText: "Projet d'ingénierie SIG de Licence 3 | Avignon Université | 2025",
    statusColor: "muted",
    thumbnail: "/assets/img/projet_rennes.png",
    subtitle: "En tant que responsable technique et méthodologique, j'ai conçu un modèle de détection automatisée par algèbre raster haute résolution (1 m) des bâtiments surélevables, complété par une analyse multicritère horizontale scorée sur 29 coefficients, sous contrainte ZAN et PLUi, sur les 208 351 bâtiments de la métropole rennaise.",
    excerpt: "Face à l'injonction contradictoire entre le PLH (5 000 logements/an) et la loi ZAN (division par deux de l'artificialisation d'ici 2030), ce projet identifie les gisements fonciers mobilisables selon une double approche : aérienne (33 304 bâtiments surélevables, soit 22 km² de plancher) et horizontale (27 km² de surfaces urbanisables scorées).",
    tags: ["MNS/MNT 50 cm", "PLUi", "ZAN", "SQL spatial"],
    summaryFooter: "Rennes Métropole | Modélisation SIG 3D | Automatisation | ZAN",
    meta: [
      { label: "Statut", value: "Projet L3 |2025" },
      { label: "Cadre", value: "Licence 3 Géographie | Géomatique" },
      { label: "Territoire", value: "Rennes Métropole | 43 communes" },
      { label: "Résolution", value: "MNS/MNT 50 cm | Raster 1 m", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Devoir maison SIG, Rennes Métropole, Alexi, Gwendoline, Hugo, Marceau.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "Problématique",
        content: [
          "La loi Climat & Résilience (2021) impose la division par deux du rythme d'artificialisation d'ici 2030, avant le Zéro Artificialisation Nette (ZAN) en 2050. Pour des métropoles dynamiques comme Rennes, la densification de la nappe pavillonnaire ou l'étalement sur terres agricoles n'est plus soutenable.",
          "L'alternative consiste à mobiliser le gisement intérieur invisible : la surélévation du bâti existant dans le respect des gabarits du PLUi. J'ai voulu quantifier et localiser automatiquement, sur les 43 communes de Rennes Métropole (plus de 208 000 bâtiments modélisés), les constructions techniquement et réglementairement capables d'accueillir au moins un étage supplémentaire."
        ],
        callout: {
          icon: "📐",
          title: "Le Coefficient de Comblement CC48",
          text: "CC48 = Hauteur_réelle_bâti / Hauteur_maximale_PLUi. Un CC48 < 0,75 signale une réserve de hauteur d'au moins 3 mètres (un niveau habitable complet) sous le plafond réglementaire."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "Données & géo-traitement",
        content: [
          "J'ai fusionné et rééchantillonné par interpolation bicubique à 1 m les dalles LiDAR MNS (Modèle Numérique de Surface) et MNT (Modèle Numérique de Terrain) de l'IGN sous projection RGF93 / CC48 (EPSG:3948).",
          "Après rasterisation des zonages du PLUi de Rennes Métropole, j'ai extrait la hauteur bâtie nette par soustraction matricielle, puis filtré les artefacts et les dépendances non habitables (hauteur < 4 m exclue)."
        ],
        codeSnippet: {
          lang: "QGIS",
          title: "Équation de calculatrice raster (détection CC48)",
          code: `# 1. Calcul de la hauteur bâtie nette
hauteur_bati = ( "MNS@1" - "MNT@1" )

# 2. Ratio par rapport au gabarit réglementaire
CC48 = hauteur_bati / "H_max_PLUi@1"

# 3. Masque multicritère des toitures surélevables
# - CC48 < 0.75 (au moins 1 niveau résiduel)
# - hauteur_bati > 4 m (exclusion garages et annexes)
# - Exclusion stricte des zones N et A
surelevable = (CC48 < 0.75) AND (hauteur_bati > 4)
              AND ("Zone_PLUi@1" NOT IN (1, 2))`
        },
        table: {
          title: "Données spatiales mobilisées",
          headers: ["Source", "Producteur", "Usage", "Résolution"],
          rows: [
            ["LiDAR HD / MNS / MNT", "IGN / RGE ALTI®", "Modélisation altimétrique du sol et du sursol", "50 cm natif"],
            ["BD TOPO®", "IGN", "Emprises cadastrales et bâtiments", "Vecteur métrique"],
            ["PLUi Rennes Métropole", "Rennes Métropole", "Gabarits de hauteur et zonages urbains", "Vecteur"],
            ["Fichiers fonciers DVF", "DGFIP", "Ancienneté et typologie foncière", "Parcelle"]
          ]
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "Résultats & Limites",
        content: [
          "Mon algorithme a identifié 33 304 bâtiments surélevables sur l'ensemble de la métropole rennaise, représentant un potentiel théorique de près de 23 000 logements neufs sans artificialiser un seul mètre carré de terre naturelle. L'ensemble couvre 22 km² de surface au sol.",
          "Une classification multicritère en 5 classes de priorité, croisant accessibilité aux transports en commun, proximité des commerces et contraintes patrimoniales (périmètres ABF), a isolé 14 065 bâtiments hautement prioritaires (classes P1 et P2), représentant 11,3 km² et couvrant à eux seuls 60 % des besoins en logements programmés par le PLH à horizon 2030.",
          "Ce travail de Licence 3 évalue un gisement théorique : il ne présume pas de la résistance mécanique des fondations ni de l'accord des copropriétés. Pour une mise en œuvre opérationnelle, ce modèle doit être prolongé par une qualification des typologies architecturales et une modélisation du bilan financier."
        ],
        figure: {
          src: "/assets/img/projet_rennes.png",
          title: "Fig. 1 : Modélisation 3D et classification multicritère des toitures surélevables",
          tag: "LiDAR HD / QGIS 3D / EPSG 3948",
          caption: "Vue perspective des toitures analysées. Les bâtiments en cyan disposent d'un CC48 favorable. En ambre : bâtiments sous servitudes patrimoniales ou éloignés des réseaux de transport."
        },
        table: {
          title: "Distribution des bâtiments par classe de priorité foncière",
          headers: ["Classe de priorité", "Nombre de bâtis", "Critère discriminant", "Surface au sol"],
          rows: [
            ["P1 : Optimal immédiat", "4 218", "Très proche TC + CC48 < 0,5", "3,2 km²"],
            ["P2 : Fort potentiel", "9 847", "Bonne desserte + CC48 < 0,75", "8,1 km²"],
            ["P3 : Potentiel modéré", "11 203", "Contexte pavillonnaire diffus", "9,4 km²"],
            ["P4 : Sous contraintes", "6 891", "Périmètre ABF / Servitudes", "5,3 km²"],
            ["P5 : Non mutabilisable", "1 145", "Zones N / A ou gabarits saturés", "1,0 km²"]
          ]
        },
        infoBox: {
          type: "emerald",
          title: "Démonstration de faisabilité du ZAN",
          text: "Cette étude a démontré que la contrainte ZAN n'interdit pas le développement démographique d'une métropole régionale dynamique, pourvu que la hauteur urbaine résiduelle soit mobilisée rationnellement."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "Discussion critique",
        content: [
          "La résolution raster de 1 m lisse les petites émergences de toiture (lucarnes, cheminées) et justifie un contrôle ponctuel sur plan pour les parcelles inférieures à 50 m². Pour une mise en œuvre opérationnelle par un bailleur ou un promoteur, ce modèle doit être prolongé par une qualification des typologies architecturales (toitures-terrasses vs toitures en pente) et une modélisation du bilan financier de charge foncière résiduelle."
        ],
        warningBox: {
          title: "Résolution & toitures complexes",
          text: "La résolution raster de 1 m lisse les petites émergences de toiture (lucarnes, cheminées) et justifie un contrôle ponctuel sur plan pour les parcelles inférieures à 50 m²."
        }
      }
    ]
  }
];
