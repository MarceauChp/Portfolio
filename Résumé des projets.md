# DOSSIER DE RÉFÉRENCE TECHNIQUE & TEXTUEL — PROJETS DE MARCEAU CHAPON
Ce document rassemble l'ensemble des données sources, extraits de rapports, méthodologies, modélisations mathématiques, résultats chiffrés et réflexions critiques issus de mes travaux universitaires et de recherche. Il sert de base textuelle brute pour rédiger les pages détaillées du portfolio dans mon style d'écriture personnel (première personne, regard critique, rigueur scientifique).

================================================================================
PROJET 1 : MÉMOIRE DE RECHERCHE MASTER 1 (AVIGNON UNIVERSITÉ / UMR 7300 ESPACE)
================================================================================
- Titre officiel : Analyse quantitative de la spatialisation des logements sociaux selon leurs méthodes d'acquisition dans la métropole Aix-Marseille Provence
- Auteur : Marceau Chapon (Major de promotion, 2025-2026)
- Direction : Guilhem Boulay (MCF) & Thibault Lecourt (Enseignant-chercheur contractuel)
- Cadre : Master 1 GéoTer / UMR 7300 ESPACE
- Dépôt GitHub open source : https://github.com/MarceauChp/Memoire_M1GEOTER (licence CC-BY 4.0)

1. PROBLÉMATIQUE & CADRE THÉORIQUE (EXTRAITS DU MÉMOIRE)
Le secteur du logement social traverse une mutation structurelle : le passage historique du modèle de « bailleur-constructeur » privilégiant la Maîtrise d'Ouvrage Directe (MOD) à la figure dominante de « bailleur-acquéreur » via la Vente en l'État Futur d'Achèvement (VEFA HLM). Marginal avant 2007 (< 5 % des agréments nationaux), l'achat sur plan auprès de promoteurs privés représente aujourd'hui plus de 30 % à 50 % de la production neuve.

Ce basculement s'analyse à travers l'économie politique urbaine :
- Démarchandisation vs Marchandisation (Esping-Andersen, 2007) : historiquement soustrait aux lois du marché, le logement social devient un actif marchand de bouclage financier pour les promoteurs privés.
- Valeur d'usage vs Valeur d'échange (Marx, 1867) : dans le modèle MOD (« construire pour gérer »), le bailleur optimise la durabilité et la surface pour réduire les charges futures. En VEFA, le promoteur privilégie la rentabilité immédiate et compense les prix encadrés du social par la péréquation financière sur les logements libres, risquant de sacrifier la qualité d'usage.
- Théorie des machines de croissance (Logan & Molotch, 1987) et Régimes urbains (Stone, 1993) : alliance d'intérêts au sein du trinôme maire-promoteur-bailleur. La VEFA permet aux maires d'atteindre les quotas de la loi SRU (2000) de façon « invisibilisée » dans des copropriétés mixtes, contournant les réticences électorales associées aux grands ensembles.
- Question centrale : La délégation de l'acte de bâtir au secteur privé génère-t-elle une géographie de l'offre distincte de celle de la MOD, et quels déterminants socio-économiques et territoriaux structurent cette distribution ?
- Hypothèse 1 (« Effet-commune ») : Le cadre réglementaire local (PLU, Secteurs de Mixité Sociale - SMS, volonté politique municipale) constitue le premier filtre de localisation.
- Hypothèse 2 (« Effet de marché ») : À commune égale, les promoteurs orientent les lots sociaux vers les secteurs où le foncier est le moins valorisé pour préserver leur marge, renforçant la ségrégation infra-communale.

2. DONNÉES & FILTRAGE (ÉCHANTILLON D'ÉTUDE)
- Source principale : Répertoire du Parc Locatif Social (RPLS) millésime 2025 (SDES / DHUP).
- Données contextuelles : Carroyage Insee Filosofi 2021 (carreaux de 200 m), BD TOPO IGN, BDNB.
- Entonnoir de filtrage :
  * Plage temporelle : entrées au patrimoine entre le 01/01/2000 et le 31/12/2024 (25 ans de recul, isolant la montée en puissance de la VEFA).
  * Statut : conventions APL toujours actives au 1er janvier 2025.
  * Qualité géomatique : géolocalisation au niveau le plus précis uniquement (adresses interpolées ou imprécises exclues).
  * Représentativité statistique communale : exclusion des communes ayant produit moins de 20 logements sur la période (13 communes écartées, représentant seulement une poignée de logements ruraux).
  * Traitement de Marseille : regroupement des 16 arrondissements en une entité communale unique (échelle de pilotage du PLH).
- Échantillon final : 55 758 logements conventionnés analysés (74,7 % en MOD, 25,3 % en VEFA sur l'ensemble de la période, avec une accélération marquée post-2009 et un pic de marché VEFA à 35,9 % en 2022).

3. MÉTHODOLOGIE GÉOMATIQUE & STATISTIQUE
A. Analyse centrographique par Ellipses d'Écart-Type (SDE) :
- Fonction sdellipse() (package R phonTools), calculée à 1 écart-type par commune et par mode d'acquisition (MOD, VEFA, Ensemble).
- Calcul du barycentre (centre de gravité moyen en EPSG:2154), de la surface de dispersion (étalement du parc) et de l'orientation du grand axe.
- Calcul de la distance euclidienne inter-barycentres (VEFA vs MOD) par commune.

B. Construction d'indicateurs socio-économiques bi-scalaires :
- Approche conceptuelle : reproduction de la perception multiscalaire du promoteur immobilier (environnement immédiat vs dynamique de quartier, Le Brun 2024).
- Tampons concentriques de 500 m (micro-local / rue) et 2 000 m (macro-local / quartier) autour de chaque bâtiment.
- Intersection surfacique itérative sous R avec les carreaux Insee 200 m : chaque carreau contribue aux métriques proportionnellement à la surface intersectée (évite les effets de rupture administrative).
- Recomposition de 40 variables relatives standardisées (taux de pauvreté, part de ménages monoparentaux, typologie du bâti avant 1945, 1945-1970, 1970-1990, après 1990, tranches d'âge, densité) + distance logarithmique au centre urbain (Log_Dist) + année d'expiration de convention (Annee_Exp).

C. Modélisation GLMM (Generalized Linear Mixed Model) :
- Régression logistique binomiale pondérée par le nombre de logements du bâtiment (Poids_Logements = NB_LOGE).
- Spécification : intercept aléatoire par commune `(1 | Commune)` via la fonction glmer() du package lme4, optimiseur bobyqa (maxfun = 200 000), seed(28).
- Protocole de sélection rigoureux :
  1. Filtre de corrélation bivariée (seuil max |r| = 0,49 avec conservation de la variable la plus corrélée à Y).
  2. Filtre de colinéarité multivariée : suppression itérative des variables avec VIF > 5.
  3. Sélection descendante pas-à-pas backward par rapport de vraisemblance (LRT / Likelihood Ratio Test via drop1(..., test="Chisq"), seuil p <= 0,05).

4. RÉSULTATS & MÉTRIQUES DÉTAILLÉES
- Validation de l'Hypothèse 1 (Effet-commune écrasant) :
  * ICC (Intraclass Correlation Coefficient) = 0,734. 73,4 % de la variabilité du mode d'acquisition dépend de la commune d'implantation.
  * Pseudo-R² de Nakagawa : R² marginal (effets fixes seuls) = 0,059 ; R² conditionnel (effets fixes + aléatoire communal) = 0,750. La contribution institutionnelle communale pure s'élève à 69,1 % (R²c - R²m).
- Validation de l'Hypothèse 2 (Effet de marché infra-communal) :
  * Performance globale du modèle : AUC = 0,8215 (excellente discrimination).
  * Les 12 variables retenues au seuil p < 0,05 (Forest Plot) :
    - Prédicteurs positifs de la VEFA :
      * Part_Log_ap90_500m (OR = 1,50) : un tissu résidentiel récent post-1990 augmente de 50 % la cote d'être en VEFA.
      * Taux_Pauvrete_500m (OR = 1,32) : sur-représentation dans les poches de pauvreté immédiate (opportunités foncières moins chères, minoration de la perte de marge promoteur).
      * Part_25_39_2000m (OR = 1,27) : quartiers attractifs pour jeunes actifs.
      * Part_4_5_500m (OR = 1,13) : présence d'enfants en bas âge.
      * Log_Dist (OR = 1,07) : probabilité accrue en périphérie urbaine.
    - Prédicteurs négatifs de la VEFA (fiefs de la MOD) :
      * Annee_Exp (OR = 0,70) : conventions APL plus courtes en VEFA (moyenne 2077) qu'en MOD (moyenne 2118), lié au recours massif aux prêts PLS moins contraignants.
      * Part_Monop_500m (OR = 0,75) : évitement des secteurs à forte monoparentalité par les promoteurs.
      * Part_55_64_2000m (OR = 0,81), Part_6_10_2000m (OR = 0,85), Part_5_Indiv_2000m (OR = 0,87), Part_18_24_2000m (OR = 0,89) : rejet des tissus familiaux traditionnels ou vieillissants.
      * Part_Log_70_90_500m (OR = 0,88) : moindre implantation dans les parcs de grands ensembles de la reconstruction.
- Résultats centrographiques SDE :
  * Décorrélation spatiale flagrante entre MOD et VEFA dans les communes de deuxième couronne métropolitaine : Vitrolles, Éguilles, Le Rove, Gémenos, Plan-de-Cuques présentent des écarts de barycentres dépassant 1 000 à 1 800 mètres. Les ellipses MOD sont nettement plus étalées que les ellipses VEFA, très concentrées.

5. DISCUSSION CRITIQUE & LIMITES
- Corrélation vs Causalité : le GLMM mesure des associations statistiques. La sur-présence de VEFA dans les tissus récents et pauvres peut traduire la localisation préférentielle des opérations de rénovation urbaine (PNRU) et des ZAC plutôt qu'une seule stratégie unilatérale des promoteurs.
- Angle mort de la loi SRU : la loi impose un quota à l'échelle communale sans prescrire de répartition infra-communale. La VEFA permet de valider les obligations quantitatives tout en reléguant le parc social dans des secteurs périphériques ou spécifiques.
- Fragilité du parc VEFA : copropriétés mixtes, surcoûts de charges pour les ménages modestes, absence de maîtrise d'ouvrage publique sur les matériaux et finitions.
- Biais des données : décalage de 2 à 4 ans entre agrément et livraison RPLS ; absence d'indicateur direct de valeur foncière vénale dans le modèle de base ; sous-représentation des dynamiques qualitatives (nécessité d'entretiens d'acteurs pour expliquer les faux négatifs du modèle situés sur la bande littorale : Carry-le-Rouet, Cassis, La Ciotat).


================================================================================
PROJET 2 : ARTICLE SCIENTIFIQUE — INDICE DE PRESSION D'ACCÈS (IPA)
================================================================================
- Titre officiel : Analyse de pression d'accès aux espaces d'un territoire pauvre en données, l'indice de pression d'accès (IPA)
- Auteur unique : Marceau Chapon (2026)
- Cible : Manuscrit en cours de révision pour soumission à Cybergeo (Revue européenne de géographie)

1. POSITIONNEMENT ÉPISTÉMOLOGIQUE & PROBLÉMATIQUE
Dans la littérature internationale, la méthode de référence pour mesurer l'accessibilité spatiale aux services est la 2SFCA (Two-Step Floating Catchment Area, Luo & Wang 2003). Bien qu'élégante, elle repose sur un postulat lourd : la disponibilité de données précises sur la capacité d'accueil réelle de chaque infrastructure (nombre de places, jauges, effectifs de personnel, créneaux d'ouverture).
Or, dans la réalité des collectivités territoriales françaises, ces données d'offre sont lacunaires, désuètes, voire inexistantes. Appliquer des modèles complexes dans ces contextes de « données restreintes » relève du piège du « Garbage in, Garbage out » : l'illusion mathématique masque l'incertitude des données d'entrée. Cela accentue le « usability gap » (Geertman 2017, Pelzer 2017), créant une défiance des décideurs face à des modèles perçus comme des boîtes noires.
L'Indice de Pression d'Accès (IPA) est conçu comme une alternative parcimonieuse, transparente et directement actionnable. Plutôt que de lisser l'accessibilité par des zones de chalandise flottantes, il modélise la dépendance territoriale en assignant la population au pôle le plus proche par le réseau viaire, mesurant ainsi le risque de rupture de service.

2. CADRE MATHÉMATIQUE & FORMULATION
L'IPA formalise la notion de « double peine territoriale » (éloignement kilométrique cumulé à la congestion démographique à destination) :
Formule brute :
  IPA = (M * DR) * (NB_M / NB_INF)
où :
- M : Population demandeuse de la maille d'origine (ex. jeunes 18-24 ans issus du carroyage Insee Filosofi 200 m).
- DR : Distance minimale par le réseau de voirie (network_cost calculé via l'algorithme QNEAT3 sous QGIS), traduisant la friction spatiale réelle sans biais euclidien.
- NB_M : Population totale du bassin d'attraction théorique convergeant vers la même infrastructure (charge totale d'usagers).
- NB_INF : Nombre d'infrastructures équivalentes disponibles dans la maille de destination.

3. NORMALISATION & GESTION DE LA DISTRIBUTION
- Variable Y1 (Rigueur statistique) : transformation logarithmique log_indice_brut = log(IPA_brut + 1e-6) pour stabiliser la variance asymétrique.
- Variable Y2 (Aide à la décision) : normalisation Min-Max ramenée sur une échelle de 0 à 100 pour rendre l'indicateur universellement intelligible.
- Représentation cartographique : discrétisation par seuils naturels de Jenks afin de maximiser la variance inter-classes et faire ressortir visuellement les points de rupture.

4. ÉVALUATION ÉCONOMÉTRIQUE SOUS R & APPLICATION SUR AVIGNON
- Étude de cas : Accès des 18-24 ans aux pôles universitaires d'Avignon.
- Modèle linéaire simple naïf (IPA brut sur 100 ~ Ménages pauvres) : R² apparent de 0,679, mais invalidé par le test de normalité des résidus de Shapiro-Wilk et une forte hétéroscédasticité.
- Modèle log-linéaire corrigé : log(IPA) ~ Ménages pauvres.
- Protocole de robustesse : analyse des résidus studentisés (R-student) et exclusion de 10 outliers statistiques via la correction conservatrice de Bonferroni (seuil alpha = 0,05 ajusté à la taille de l'échantillon).
- Résultats du modèle final :
  * Relation hautement significative : p-value < 2,2e-16.
  * R² = 0,138.
  * MAE = 38,8 points sur échelle 100.
- Interprétation géographique : Bien que la pauvreté n'explique pas à elle seule toute la variance de l'accessibilité, son effet aggravant est systématique. L'IPA valide empiriquement les théories de l'injustice spatiale (Spatial Mismatch de Kain 1968, exclusion par les transports de Lucas 2012) : les quartiers périphériques défavorisés cumulent un temps de trajet important et une saturation critique sur leur pôle de rattachement.

5. LIMITES ASSUMÉES DE L'IPA
- Postulat de l'équipement le plus proche : simplification des comportements de mobilité réelle (pas de prise en compte des préférences qualitatives, des habitudes ou du chaînage de déplacements, Cervero 1996).
- Unité d'offre indifférenciée : assimile des infrastructures de capacités inégales faute de données d'entrée.
- Maille spatiale fixe : dépendance au carroyage Insee 200 m (effet MAUP potentiel).


================================================================================
PROJET 3 : COMMANDE PUBLIQUE GRAND AVIGNON — SURCHAUFFE URBAINE & RÉSILIENCE
================================================================================
- Titre officiel : Surchauffe urbaine dans le Grand Avignon : entre îlots de fraîcheur et prévention (Rapport de 164 pages, 2024-2025)
- Auteurs : Aurélien Aymé, Alexi Berthe, Marceau Chapon, Éthan Guinot (dédié à la mémoire de l'enseignant Mounir Redjimi)
- Commanditaire : Régis Auriol, Directeur Général Adjoint « Transition et Mobilités » du Grand Avignon
- Cadre : Plan National d'Adaptation au Changement Climatique (PNACC-3 « La France à +4°C »), PCAET, SCoT, ZAN
- Mon rôle personnel : Responsable du pôle SIG et modélisation, mise en place des bases de données PostgreSQL/PostGIS, automatisation sous QGIS Model Builder, modélisation des LCZ, conception de la charte graphique et production de la majorité des cartes de l'atlas.

1. CONTEXTE CLIMATIQUE & RÉGLEMENTAIRE LOCAL
- Climat méditerranéen soumis au Mistral (rafales > 100 km/h) et à des sécheresses estivales intenses (précipitations annuelles concentrées de 752 mm).
- Nuits tropicales (température nocturne ne descendant pas sous 20 °C) : projection alarmante selon le scénario RCP 8.5, passant de 18-30 nuits historiques à plus de 50 nuits tropicales par an d'ici 2100 sur le Vaucluse.
- Critique de la définition Météo-France de la canicule : exiger 3 jours consécutifs de dépassement de seuil (36 °C jour / 21 °C nuit dans le Vaucluse) conduit à ignorer 33 % des journées caniculaires réelles (épisodes de 1 ou 2 jours), pourtant létales pour les publics fragiles.

2. PROTOCOLE DE GÉOTRAITEMENT & TÉLÉDÉTECTION
A. Télédétection thermique de surface (LST Landsat) :
- Images Landsat 8 (bande 10 TIRS, USGS) acquises sur les étés 1990, 2001, 2010 (conditions normales) et moyenne des journées de canicules avérées (29/06/2019, 15/07/2022, 10/07/2023, 20/07/2024).
- Résultats thermiques : réchauffement de surface moyen de +2,5 °C entre 1990 et 2010. Lors des canicules récentes, la température de surface moyenne métropolitaine atteint 35,2 °C (zones bâties à 36,9 °C, surfaces en eau à 28,6 °C).

B. Classification des Zones Climatiques Locales (LCZ à 50 m) :
- Implémentation du protocole Cerema sur une maille fine de 50 m croisant la BD TOPO v3 IGN (hauteurs, emprises) et l'OCS GE (6 classes d'occupation du sol : bâti, minéral imperméable, sols nus perméables, eau, végétation haute, végétation basse).
- Modélisation de la rugosité urbaine et des effets canyons (Sky View Factor / SVF, rapport hauteur/largeur H/L).

C. Modélisation biométéorologique du Heat Index :
- Mesure du stress thermique combinant température et humidité relative (extension Lu & Romps, 2022).
- Interpolation linéaire sur 11 stations météorologiques (Avignon, Pujaut, Orange, Carpentras, Cavaillon, etc.) pour les journées > 36 °C.
- Résultat spatial : 100 % des secteurs classés en « Extrême attention » et « Danger extrême » coïncident strictement avec la continuité urbaine (tampon de 200 m autour du bâti).

D. Analyse statistique multivariée des vulnérabilités et des enjeux (ACP + CAH Ward) :
- Maillage INSPIRE 200 m (carreaux Filosofi ayant plus de 11 ménages) croisé avec la BDNB (DPE interpolé par triangulation TIN).
- Typologie de vulnérabilité sociale (4 classes) : isole 46 carreaux d'hyper-vulnérabilité concentrant ménages pauvres, familles monoparentales, seniors isolés et passoires thermiques.
- Typologie des enjeux (5 classes) : cartographie des infrastructures scolaires, sanitaires (EHPAD, hôpitaux), mobilités douces et réseaux de transport.
- Matrice de synthèse : identification des « espaces très sensibles » (notamment la seconde ceinture autour de la rocade sud d'Avignon, Saint-Chamand, Le Pontet).

3. DIAGNOSTIC DES ICU ET DES IFU
- Typologie des ICU (seuil surface >= 39 °C, écart > 5 °C à la moyenne) :
  * Si les champs agricoles représentent 42 % du nombre d'îlots (58 sites), ils ne pèsent que 18,6 % de la surface et présentent peu d'enjeux humains.
  * Les zones commerciales et d'activités (Mistral 7, Le Pontet, Courtine) ne représentent que 31,2 % des ICU en nombre, mais concentrent **72,1 % de la surface cumulée des îlots de chaleur (12,08 km² soit plus de 1 200 ha)**, grimpant à 94,5 % de la surface des ICU si l'on exclut les champs et friches.
- Typologie des IFU (seuil surface <= 34 °C, soit -1,5 °C sous la moyenne) :
  * Grands IFU arborés majeurs : Île de la Barthelasse (minimum 26 °C), massif nord-ouest de Rochefort-du-Gard.
  * Tissu d'IFU diffus et fragmenté en milieu urbain.

4. PROPOSITIONS OPÉRATIONNELLES D'AMÉNAGEMENT
- Continuité et « Pierres de gué » : modélisation sous QGIS de **130 îlots de fraîcheur connectables à moins de 500 m**. Proposition d'un grand corridor urbain reliant la Barthelasse au centre-ville d'Avignon via le pont Daladier.
- Mobilisation du foncier public et des délaissés :
  * Analyse multicritère de 1 179 parcelles publiques pour la création de parcs et refuges climatiques.
  * Valorisation des friches urbaines (recensement Cartofriche Cerema / OpenFricheMap).
  * Exploitation de l'article 52 de la loi LOM : récupération des 5 mètres en amont des passages piétons (11,5 m² récupérables par traversée) pour désimperméabiliser et planter.
- Planification et outils réglementaires : création d'OAP thématiques « Rafraîchissement urbain » dans les PLU (art. L.151-6), intégration des prescriptions d'ombrières photovoltaïques et désimperméabilisation sur les parkings commerciaux > 1 500 m² (art. 40 loi ApER).
- Stratégie IoT de déploiement de capteurs : plan d'implantation de **120 capteurs thermohygrométriques** phasé en 6 vagues (Scénario 1 : santé/vulnérabilités ; Scénario 2 : dynamique physique des ICU/IFU ; Scénario 3 mixte équilibré : 80 % de sondes fixes et 20 % de capteurs mobiles pour l'évaluation post-aménagement).


================================================================================
PROJET 4 : PROJET SIG LICENCE 3 — GISEMENTS FONCIERS À RENNES MÉTROPOLE
================================================================================
- Titre officiel : Rapport SIG: Recherche de gisements fonciers dans Rennes Métropole (2024)
- Auteurs : Alexi Berthe, Marceau Chapon, Hugo Bentolila, Gwendoline Beuchat
- Mon rôle personnel : Responsable technique et méthodologique, modélisation raster haute résolution, requêtes SQL spatiales, formalisation des expressions PLUi, sémiologie et mise en page cartographique.

1. CONTEXTE TERRITORIAL & PRESSION FONCIÈRE
- Croissance démographique soutenue de Rennes Métropole : 467 858 habitants en 2021 (+14,8 % entre 2010 et 2021), record d'attractivité nationale (7,6 % de nouveaux arrivants en un an).
- Injonction contradictoire des politiques publiques :
  * Programme Local de l'Habitat (PLH 2023-2028) : construire 5 000 logements par an (dont 1 250 logements sociaux et 10 % de recyclage urbain).
  * Loi Climat et Résilience : Zéro Artificialisation Nette (ZAN) d'ici 2050, avec division par deux du rythme de consommation d'espaces naturels, agricoles et forestiers d'ici 2030.
- Objectif de l'étude : Identifier l'ensemble des gisements fonciers mobilisables selon une double approche : aérienne (surélévation du bâti) et horizontale (dents creuses et extensions urbanisables scorées).

2. MÉTHODOLOGIE GÉOMATIQUE AVANCÉE
A. Harmonisation géodésique :
- Projection intégrale en Conique Conforme 48 (CC48 - EPSG: 3948) pour garantir une précision métrique rigoureuse sans distorsion d'échelle sur l'Ille-et-Vilaine.

B. Modélisation du foncier aérien (Potentiel 3D de surélévation) :
- Fusion et nettoyage géométrique des référentiels bâtis : appariement spatial du cadastre Etalab (respect des limites de parcelles), de la BD TOPO v3 et de la BDNB.
- Calcul altimétrique de précision : soustraction matricielle MNS (Modèle Numérique de Surface à 50 cm de Rennes Métropole) - MNT (RGE ALTI IGN) -> application de statistiques de zones (stat_majority et stat_mean) pour corriger les hauteurs négatives et les artéfacts de toitures.
- Algorithme de conformité au PLUi : écriture d'une expression conditionnelle complexe traduisant les zonages et hauteurs maximales autorisées (soit valeurs brutes en mètres, soit gabarits de type R+n+C où le RDC = 3 m et les étages = 3 m).
- Extraction du gisement : calcul de la capacité résiduelle = (Hauteur maximale PLUi) - (Hauteur réelle du bâti).
- Filtre d'éligibilité : différentiel >= 3,0 m (permettant la création d'au moins un étage complet) et surface au sol >= 20 m² (surface minimale viable).

C. Modélisation du foncier horizontal (Analyse multicritère raster - MCE) :
- Rasterisation intégrale à **1 m de résolution** sur les 705 km² de l'intercommunalité.
- Couche 1 : Masque exclusif binaire (terrains strictement inconstructibles) :
  * Contraintes physiques : pentes > 8 % (RGE ALTI 5 m, seuil de viabilité technique sans étude géotechnique lourde), cours d'eau (tampon 10 m), voiries et ponts (BD TOPO v3).
  * Emprises du bâti existant et parcelles < 20 m².
  * Servitudes juridiques et environnementales strictes : zonages non constructibles des PLU/POS (Naturel, Agricole, À urbaniser bloqué), périmètres ABF et abords des monuments historiques (RLPi 2019), Espaces Boisés Classés (EBC), Espaces d'Intérêt Paysager ou Écologique (EIPE), ZAC, ZAD, PAE, PUP, Périmètres de Prise en Considération (PPC), servitudes aéronautiques T5, droits de préemption urbain.
- Couche 2 : Matrice de scoring d'aménités pondéré [0-100] normalisé sur 29 coefficients :
  * Distance à la voirie (poids 11) : calibrée sur un coût moyen d'infrastructure de 2 000 000 €/km (décroissance par paliers jusqu'à 200 m).
  * Équipements de santé lourds (hôpitaux / urgences, poids 3, rayon 1 500 m).
  * Pente modérée 0-8 % (poids 3).
  * Température de surface LST Landsat (poids 2).
  * Espaces verts publics (poids 2, rayon 1 500 m).
  * Aires de jeux (poids 2, rayon 1 500 m).
  * EHPAD (poids 2, rayon 1 500 m).
  * Équipements scolaires et universitaires (écoles primaires, secondaires, universités, UFR, poids 1 chacun).
- Équation finale : `Raster_Urbanisable = (Score_Pondéré_Complet) * (Masque_Exclusif_Inversé)`. Vectorisation et filtrage des polygones >= 20 m².

3. RÉSULTATS CHIFFRÉS MAJEURS
- Foncier aérien : sur les 208 351 bâtiments de la métropole, **33 304 bâtiments présentent un potentiel de surélévation d'au moins un étage (soit 16 % du parc)**, représentant une surface de plancher potentiel de **22 km²** sans aucune artificialisation au sol.
- Foncier horizontal : détection de **27 km² de surfaces foncières urbanisables et scorées** (superficie équivalente à celle de la commune de Versailles), dont l'essentiel se concentre le long des axes de transport structurants et en dents creuses.

4. LIMITES MÉTHODOLOGIQUES & PRUDENCE OPÉRATIONNELLE
- Absence de diagnostic structurel du bâti : les bases de données n'indiquent pas la vétusté ou la résistance des fondations des immeubles anciens, qui pourraient ne pas supporter la charge d'un étage additionnel.
- Biais des coûts de rénovation thermique : la surélévation implique une remise aux normes globale du bâtiment (isolation, façades, toitures), pouvant freiner la rentabilité financière des opérations.
- Limite de l'analyse matricielle raster : absence de prise en compte de la compacité géométrique des parcelles (risque de sélectionner des formes en lanières ou trop morcelées, difficilement constructibles pour des promoteurs).