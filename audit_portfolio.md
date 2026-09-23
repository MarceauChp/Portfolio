# 🔬 Audit de Portfolio — Comité de recrutement

> **Évaluateur 1 — Lead Data Engineer / Responsable Géomatique** (rigueur technique, code, modèles, faisabilité)
> **Évaluateur 2 — Talent Acquisition Manager Senior** (positionnement, lisibilité trajectoire, clarté, projection poste)
>
> _Portfolio audité : [marceauchapon.fr](http://localhost:5173/) — React/TS/Tailwind/Framer Motion_
> _Date de l'audit : 22 sept. 2026_

---

## 1. Premier diagnostic (30 secondes chrono)

### 👤 Évaluateur 2 (TA Manager)

**Ce qu'on comprend en 30 secondes :**
- Le nom, le titre « Géographe & Géomaticien », la spécialité « analyse de données spatiales, automatisation des processus, statistiques avancées et modélisation ». ✅
- La disponibilité (avril 2027, stage M1 3-5 mois ou CDD). ✅
- Le lien CV PDF et GitHub immédiats. ✅

**Ce qui ne passe PAS le test des 30 secondes :**

> [!WARNING]
> **Aucune proposition de valeur percutante.** Le hero est un pavé de 3 paragraphes (≈120 mots) en `font-mono` justifié, avec des phrases de 3 lignes. Un recruteur ne lira pas ça. Il verra « Marceau Chapon / Géographe & Géomaticien » puis ses yeux glisseront vers les boutons. **La tagline cyan sous le nom** ("Géographe-géomaticien, spécialisé en analyse de données spatiales…") est bonne mais **trop longue** (25 mots). 

**Verdict :** Le profil est lisible mais pas frappant. Le pitch doit être condensé en 1 phrase de 12 mots max + 1 micro-paragraphe de contexte de 2 lignes. Actuellement c'est un mini-mémoire dans le hero.

### 🔧 Évaluateur 1 (Lead Data Engineer)

Le hero est honnête techniquement : GLMM, ACP, ACM, CAH, Python, R, PostGIS sont mentionnés. Le « cartouche d'ingénierie » en footer (Auteur / Formation / Spécialité / Localisation / Statut / Date) est un **excellent** détail professionnel qui signe l'univers CAD/plan d'ingénieur. Bien joué.

Mais **le texte du hero catalogue des méthodes au lieu de montrer un impact**. "Je conçois des chaînes de traitement automatisées, reproductibles et ouvertes" → OK, mais **prouve-le** en une métrique ou un résultat, pas en affirmation.

---

## 2. Forces distinctives

### ✅ Ce qui est remarquable

| Force | Détail | Évaluateur |
|---|---|---|
| **Identité visuelle unique** | Le design « SimCity 2000 / CAD Workstation » (bevel windows, pixel font, grille blueprint) est **immédiatement mémorable** et cohérent avec un profil géomaticien. C'est le meilleur choix identitaire possible pour ce métier. Aucun autre portfolio géomatique ne ressemble à ça. | TA |
| **Thème jour/nuit fonctionnel** | Le toggle JOUR/NUIT bascule entre un mode « papier calque » (beige/sépia) et un mode « blueprint cyanotype » (fond marine + lignes cyan). Les deux sont excellents en termes de contraste et de lisibilité. Le mode nuit est particulièrement impressionnant. | Lead DE |
| **Architecture de projet exemplaire** | La page projet VEFA est structurée en 4 phases (Problématique → Données & géo-traitement → Résultats & Limites → Discussion critique). C'est **exactement la structure que j'attends d'un dossier technique** : problème → données → méthode → résultats → limites. | Lead DE |
| **Code R embarqué et lisible** | Le snippet `glmer()` avec commentaires inline, la table des sources de données, la figure cartographique annotée → c'est de la preuve technique directe. Pas du name-dropping d'outils. | Lead DE |
| **Auto-critique sincère** | La Phase 04 « Discussion critique » et l'encadré « Biais d'échelle & portée » sont rares dans un portfolio. Ça montre une maturité méthodologique au-dessus du niveau M1 standard. | Lead DE |
| **Sidebar sommaire sticky** | La navigation latérale (Table of Contents) qui suit le scroll avec highlight de la phase active est un **excellent** pattern UX pour des contenus longs et techniques. | TA |
| **Stack technique déployée visible** | Le panel de badges à droite (R, GLMM, QGIS, FILOSOFI INSEE, BD TOPO IGN, RPLS) offre un scan instantané sans lire le texte. | TA |
| **Pipeline workflow en 3 phases** | La section « Chaîne de traitement classique » (Acquisition → Traitement → Restitution) est une pépite de storytelling technique. Elle montre comment tu penses un projet, pas juste quels outils tu connais. | Lead DE |
| **Filtres projets par catégorie** | Les filtres « Tous / Recherche M1 / Commande publique / Modélisation & 3D » permettent un scan ciblé selon l'intérêt du recruteur. | TA |
| **Données chiffrées dans les cards** | "55 communes traitées | ICC = 73,4 % | 55 758 logements analysés" dans le footer de la card projet → c'est du **kill shot** pour un data engineer. Tu quantifies ton travail. | Lead DE |

---

## 3. Red flags & faiblesses critiques

### 🔴 Red flags majeurs

#### RF-1 : Le hero est un pavé indigeste

> [!CAUTION]
> **3 paragraphes de 40+ mots chacun** en `font-mono` justifié en haut de page. Le taux de rebond sera catastrophique. Un recruteur pressé verra le texte justifié en monospace, aura l'impression d'ouvrir un terminal, et fermera l'onglet.

**Impact** : Perte de 60-70% des visiteurs dans les 10 premières secondes.

**Correctif** : Remplacer par 1 accroche de 1 ligne + 3 bullet points de preuve + CTA. Le texte actuel peut descendre dans une section "À propos" dédiée.

---

#### RF-2 : Le mot "Étudiant" dans le cartouche footer

> [!CAUTION]
> Le cartouche affiche `Statut : Étudiant`. C'est **la pire chose que tu puisses écrire** si tu cherches un poste en bureau d'études ou un financement de thèse. Tu n'es pas « étudiant qui postule » — tu es « ingénieur géomaticien en fin de formation ». Remplace par `Statut : Recherche d'opportunités` ou `Recherche stage/CDD` ou simplement retire le champ.

---

#### RF-3 : Auto-évaluation "Expert" sur GLMM à 23 ans → risqué

> [!WARNING]
> Tu as 1 mémoire de M1 utilisant un GLMM logistique. Tu te déclares « Expert » en GLMM ET en statistiques multivariées. Un évaluateur technique senior te demandera :
> - As-tu fait du GLMM Poisson ? Binomial négatif ? Zero-inflated ? 
> - As-tu géré de la non-convergence de `glmer()` ?
> - As-tu comparé avec une approche bayésienne (`brms`) ?
> 
> Si la réponse est non, le label "Expert" sur 1 projet est périlleux. **"Avancé"** serait plus défendable et paradoxalement plus impressionnant (ça montre que tu sais où tu en es).

---

#### RF-4 : Python "Intermédiaire" sans preuve

> [!WARNING]
> Tu listes Python en "Intermédiaire" mais aucun des 4 projets n'utilise Python comme outil principal. La description est vague : "automatiser des tâches de pré-traitement géospatial". **Aucun snippet Python, aucun repo Python.** Pour un recruteur data engineering, c'est un drapeau rouge : ou bien tu le maîtrises et tu montres un notebook, ou bien tu l'enlèves et tu joues la carte R à fond.

---

#### RF-5 : Narration à la première personne → parfois trop académique

Le texte des projets oscille entre le mémoire de recherche et la vulgarisation professionnelle. Des phrases comme :

> *"Les données présentent une structure hiérarchique : les logements sont nichés dans des communes aux dynamiques contrastées. Une régression logistique classique violerait l'hypothèse d'indépendance."*

C'est parfait dans un mémoire. Dans un portfolio lu par un DG de bureau d'études, c'est **trop dense**. Il faut une version courte (3 lignes, avec lien "Lire la méthodologie complète").

---

### 🟡 Faiblesses secondaires

| # | Faiblesse | Impact |
|---|---|---|
| FS-1 | **Pas de résultat visuel (carte/graphique) en haut de la page projet**. La première chose qu'on voit est du texte. La carte choroplèthe arrive après 3 scrolls. | Engagement |
| FS-2 | **Pas de section "À propos" / "Qui suis-je" dédiée** distincte du hero. Le hero essaie de tout faire : pitch + bio + dispo + CTA. | Clarté |
| FS-3 | **L'anglais B2 est mentionné sans preuve**. "Lecture de la littérature scientifique" → oui mais as-tu lu / cité des papiers en anglais dans tes projets ? Lien vers un résumé en anglais ? | Crédibilité |
| FS-4 | **Aucune mention de travail en équipe / collaboration**. Tous les projets sont présentés au "je". Un bureau d'études cherche quelqu'un qui travaille en équipe. | Projection poste |
| FS-5 | **Les boutons _/□/× dans les fenêtres sont purement décoratifs**. Un utilisateur cliquera dessus et rien ne se passera → frustration micro. | UX |
| FS-6 | **Pas de projet personnel / side-project** montrant la curiosité technique en dehors du cursus. Tous les projets sont universitaires. | Différenciation |

---

## 4. Analyse projet par projet

### 📊 Projet 1 — VEFA Métropole AMP (Mémoire M1)

````carousel
![Hero section du projet VEFA — Titre, cartouche métadonnées, liens PDF/GitHub](C:\Users\thema\.gemini\antigravity-ide\brain\eff8950d-5bde-4e96-87e1-8cbfe8de048c\vefa_hero_section_1790106346895.png)
<!-- slide -->
![Code R du GLMM et table des sources de données](C:\Users\thema\.gemini\antigravity-ide\brain\eff8950d-5bde-4e96-87e1-8cbfe8de048c\vefa_results_discussion_section_1790106435560.png)
<!-- slide -->
![Phase 04 Discussion critique en mode nuit](C:\Users\thema\.gemini\antigravity-ide\brain\eff8950d-5bde-4e96-87e1-8cbfe8de048c\vefa_dark_mode_1790107108037.png)
````

**🔧 Évaluateur 1 (Lead DE) :**

| Critère | Note | Commentaire |
|---|:---:|---|
| Rigueur méthodologique | ★★★★★ | GLMM correctement spécifié, ICC interprété, VIF, LRT, AUC = 0.82 |
| Preuve technique | ★★★★☆ | Snippet R lisible. Manque : table d'odds-ratios complète, confusion matrix |
| Reproductibilité | ★★★★☆ | Lien GitHub ✅ mais pas de `README.md` visible avec instructions de reproduction |
| Honnêteté intellectuelle | ★★★★★ | Discussion critique exemplaire, encadré biais, article en préparation mentionné sans sur-vendre |

**👤 Évaluateur 2 (TA Manager) :**

| Critère | Note | Commentaire |
|---|:---:|---|
| Clarté du propos | ★★★☆☆ | Le sujet est passionnant mais le texte est trop long pour un portfolio. 4 phases × 3 paragraphes = article de blog, pas fiche projet |
| Projection opérationnelle | ★★★★☆ | Un DRH de bureau d'études verra immédiatement : "Ce candidat sait traiter 55 000 obs, croiser des bases nationales, modéliser et restituer" |
| Impact visuel | ★★★☆☆ | La carte arrive trop tard dans le scroll. Elle devrait être en hero du projet |
| Mémorabilité | ★★★★★ | L'ICC 73,4% est un chiffre-choc. Garde-le en première ligne |

---

### 📊 Projet 2 — Indice de Pression d'Accès (IPA)

**🔧 Évaluateur 1 :**
- **Force** : Concept original (accessibilité aux espaces d'un territoire pauvre en données). Bonne utilisation de QMesh3 et réseau viaire.
- **Faiblesse** : Le badge "Article en cours de rédaction" sans preuve tangible (pas de lien vers un preprint, pas de nom de revue cible) peut sembler creux. Soit tu montres un draft, soit tu retires le badge.
- **Question technique** : Comment l'IPA se compare-t-il aux indices d'accessibilité existants (DREAL, MOS) ? La comparaison manque.

**👤 Évaluateur 2 :**
- Le tag "ARTICLE EN COURS DE RÉDACTION" est un excellent signal d'ambition académique → parfait si tu vises une thèse. Mais si tu vises un bureau d'études, remplace par une formulation opérationnelle : "Outil d'aide à la décision territorial".

---

### 📊 Projet 3 — Surchauffe urbaine Grand Avignon (PNACC-3)

**🔧 Évaluateur 1 :**
- **Force** : C'est le seul projet de commande publique. PNACC-3, rapport de 164 pages, classification LCZ, télédétection Landsat → c'est du vrai travail opérationnel.
- **Force** : Les tags (PostGIS, Landsat 8, QGIS Model Builder, LCZ) sont les plus "data engineering" de tout le portfolio.
- **Faiblesse** : Le résultat "72,1% des îlots de fraîcheur en zones commerciales" est excellent mais **noyé dans le texte**. Mets-le en KPI visuel (gros chiffre + label).

**👤 Évaluateur 2 :**
- Ce projet devrait être en **premier**, pas en troisième. Pour un bureau d'études, un rapport de commande publique de 164 pages > un mémoire académique. L'ordre actuel privilégie la fierté intellectuelle sur le besoin du recruteur.

> [!IMPORTANT]
> **Recommandation forte :** Réordonner les projets selon le profil cible. Si tu vises un bureau d'études : Grand Avignon en premier. Si tu vises une thèse : VEFA en premier. Idéalement, implémente un tri par cible (toggle "Parcours recherche / Parcours opérationnel").

---

### 📊 Projet 4 — Gisements fonciers Rennes Métropole (L3)

**🔧 Évaluateur 1 :**
- Surélévation 3D + analyse multicritère + PLH/ZAN → sujet d'actualité brûlante.
- Mais c'est un projet de **L3**. Le placer à côté du mémoire M1 crée un décalage de maturité méthodologique. Le snippet MMS/MMT 50 CM + PLH + ZAN est correct mais pas au même niveau que le GLMM.

**👤 Évaluateur 2 :**
- Garde-le mais mets-le en dernier et signale clairement le niveau (L3). Actuellement le badge "Commande publique" peut donner l'impression que c'est un projet professionnel, alors que c'est un projet étudiant. Précise "Projet universitaire L3 – Stage".

---

## 5. Plan d'action priorité (Code & Data)

### 🔴 P0 — Critique (à faire avant toute candidature)

| # | Action | Fichier(s) | Effort |
|---|---|---|---|
| 1 | **Réécrire le hero** : 1 accroche ≤15 mots + 3 bullet points de preuve chiffrée + CTA | [profileData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/profileData.ts), [HomePage.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/pages/HomePage.tsx) | 2h |
| 2 | **Supprimer « Statut : Étudiant »** du cartouche footer ou remplacer par « En recherche active » | [Footer.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/components/Footer.tsx) L49 | 5min |
| 3 | **Rétrograder GLMM de "Expert" à "Avancé"** et ajuster la description | [skillsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/skillsData.ts) L19 | 5min |
| 4 | **Monter une preuve Python** : ajouter un snippet ou un lien GitHub vers un script Python opérationnel, ou retirer Python de la liste | [skillsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/skillsData.ts) L30-33 | 1-4h |

### 🟡 P1 — Important (prochaines 2 semaines)

| # | Action | Fichier(s) | Effort |
|---|---|---|---|
| 5 | **Ajouter une image/carte en hero de chaque page projet** (avant le texte Phase 01) | [ProjectDetailPage.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/pages/ProjectDetailPage.tsx) | 3h |
| 6 | **Condenser le texte de chaque Phase** : max 8 lignes par bloc de texte + lien "Lire la suite" extensible | [projectsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/projectsData.ts) | 4h |
| 7 | **Ajouter une section "Ce que j'apporte"** ou "Pourquoi moi" entre le hero et les projets : 3 cards avec (icône + chiffre + texte court) | [HomePage.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/pages/HomePage.tsx) | 3h |
| 8 | **Remplacer le badge IPA "Article en cours de rédaction"** par un lien vers le preprint ou reformuler en mode opérationnel | [projectsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/projectsData.ts) | 15min |
| 9 | **Ajouter une mention de collaboration/équipe** dans au moins 1 projet (ex: Grand Avignon → rapport produit avec X, stage encadré par Y) | [projectsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/projectsData.ts) | 30min |

### 🟢 P2 — Nice to have (mois suivant)

| # | Action | Fichier(s) | Effort |
|---|---|---|---|
| 10 | **Réordonner les projets** dynamiquement selon le profil cible (toggle Recherche / Opérationnel) ou manuellement (Grand Avignon en premier si cible bureau d'études) | [projectsData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/projectsData.ts), [HomePage.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/pages/HomePage.tsx) | 4h |
| 11 | **Ajouter 1 side-project** personnel (même petit : un dashboard Leaflet, un bot de scraping DVF, un notebook R interactif) pour montrer la curiosité hors cursus | Nouveau projet + data | 8h+ |
| 12 | **Rendre les boutons \_/□/× fonctionnels** (collapse la section ou montrer un toast "C'est un portfolio, pas un OS 😉") | [index.css](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/index.css), composants | 2h |
| 13 | **Ajouter un résumé en anglais** du hero ou de 1 projet pour prouver le B2 revendiqué | [profileData.ts](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/data/profileData.ts) | 2h |
| 14 | **Ajouter des KPI visuels** (gros chiffres) en haut de chaque page projet : "55 758 logements | ICC 73,4% | AUC 0,82" | [ProjectDetailPage.tsx](file:///c:/Users/thema/Desktop/projet%20perso/Programmation/Portfolio/src/pages/ProjectDetailPage.tsx) | 3h |

---

## Conclusion du comité

### 🔧 Évaluateur 1 (Lead Data Engineer)

> Ce portfolio est **techniquement au-dessus de la moyenne des M1 en géomatique**. Le mémoire VEFA est un vrai travail de modélisation statistique, pas du QGIS descriptif. Le code R est montré, les limites sont discutées, les sources sont documentées. Si ce candidat postule chez moi, je le convoque. Mais je testerai son Python et sa capacité à travailler en équipe — deux angles morts du portfolio actuel.

### 👤 Évaluateur 2 (TA Manager)

> L'identité visuelle est **la meilleure que j'ai vue sur un portfolio géomatique**. Le problème est que le contenu textuel est écrit pour un jury de mémoire, pas pour un recruteur. Le hero doit frapper, pas expliquer. Les projets doivent montrer un impact avant de détailler une méthode. Le mot "Étudiant" doit disparaître. Ce portfolio est à **75% de son potentiel** — les 25% restants sont de la reformulation et du re-ordering, pas du travail technique lourd. C'est très bon signe : le fond est solide, c'est l'emballage qui doit changer.

---

> **Note globale : 7.5 / 10**
> _Plafond estimé après corrections P0+P1 : **9 / 10**_
