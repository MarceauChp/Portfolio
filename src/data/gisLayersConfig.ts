import L from 'leaflet';

export interface LegendItem {
  id: string;
  color: string;
  label: string;
  description?: string;
  dashed?: boolean;
}

export interface GisLayerConfig {
  id: 'ipa-avignon' | 'lcz-avignon' | 'vefa-marseille';
  projectId: string; // matches MapProject.id
  name: string;
  shortName: string;
  badge: string;
  description: string;
  file: string;
  geomType: 'polygon' | 'points';
  legendTitle: string;
  legend: LegendItem[];
  getFeatureCategoryKey: (feature: any) => string;
  getStyle: (feature: any, opacity: number) => L.PathOptions;
  pointToLayer?: (feature: any, latlng: L.LatLng, opacity: number) => L.Layer;
  getPopupContent: (feature: any) => string;
}

// ── 1. IPA AVIGNON (Graduated Purples) ──
const IPA_BREAKS = [
  { id: 'break-0', max: 4.3554, color: '#fcfbfd', label: '0,0 – 4,4', desc: 'Très faible tension' },
  { id: 'break-1', max: 12.2845, color: '#dcdbec', label: '4,4 – 12,3', desc: 'Faible tension' },
  { id: 'break-2', max: 22.8974, color: '#a39fcb', label: '12,3 – 22,9', desc: 'Tension modérée' },
  { id: 'break-3', max: 45.2683, color: '#6a51a3', label: '22,9 – 45,3', desc: 'Forte tension' },
  { id: 'break-4', max: 100.0, color: '#3f007d', label: '45,3 – 100', desc: 'Saturation d’accès' },
];

export function getIpaBreakKey(val: number): string {
  if (val == null || isNaN(val)) return 'break-0';
  for (const b of IPA_BREAKS) {
    if (val <= b.max) return b.id;
  }
  return 'break-4';
}

function getIpaColor(val: number): string {
  if (val == null || isNaN(val)) return '#e2e8f0';
  for (const b of IPA_BREAKS) {
    if (val <= b.max) return b.color;
  }
  return '#3f007d';
}

// ── 2. LCZ AVIGNON 50m (Categorized Stewart & Oke) ──
export const LCZ_CATEGORIES: Record<string, { color: string; label: string; desc: string }> = {
  '1': { color: '#e8718d', label: 'LCZ 1 : Bâti compact haut', desc: 'Tours denses, imperméabilisation max' },
  '2': { color: '#67000d', label: 'LCZ 2 : Bâti compact moyen', desc: 'Centres historiques denses' },
  '3': { color: '#900a12', label: 'LCZ 3 : Bâti compact bas', desc: 'Tissu villageois, faubourgs étroits' },
  '4': { color: '#ff0109', label: 'LCZ 4 : Bâti ouvert haut', desc: 'Grands ensembles résidentiels aérés' },
  '5': { color: '#e0212d', label: 'LCZ 5 : Bâti ouvert moyen', desc: 'Collectifs récents en retrait' },
  '6': { color: '#c4696f', label: 'LCZ 6 : Bâti ouvert bas', desc: 'Pavillonnaire individuel discontinu' },
  '7': { color: '#cb9672', label: 'LCZ 7 : Bâti très léger et bas', desc: 'Hangars légers, constructions précaires' },
  '8': { color: '#b4b4b4', label: 'LCZ 8 : Bâti large et bas', desc: 'Zones commerciales & entrepôts' },
  '9': { color: '#d99296', label: 'LCZ 9 : Bâti éparse', desc: 'Habitat rural dispersé' },
  'A': { color: '#206e1f', label: 'LCZ A : Forêt dense arborée', desc: 'Canopée continue, fort rafraîchissement' },
  'B': { color: '#2fa72d', label: 'LCZ B : Végétation arborée éparse', desc: 'Parcs boisés et vergers' },
  'C': { color: '#52b250', label: 'LCZ C : Buissons & broussailles', desc: 'Garrigues, friches et maquis' },
  'D': { color: '#c6ffc5', label: 'LCZ D : Végétation basse herbacée', desc: 'Prairies, pelouses et cultures rases' },
  'E': { color: '#818181', label: 'LCZ E : Roches nues ou pavées', desc: 'Falaises calcaires, dalles minérales' },
  'F': { color: '#ffc57d', label: 'LCZ F : Sols nus ou sable', desc: 'Carrières, alluvions sèches' },
  'G': { color: '#6592c4', label: 'LCZ G : Eau libre', desc: 'Rhône, Durance, canaux et plans d’eau' },
  'low_ocs': { color: '#377eb8', label: 'Low OCS : Surfaces mixtes', desc: 'Transitions à faible occupation du sol' },
};

// ── 3. MEMOIRE VEFA RESIDUS (Points) ──
export const VEFA_CATEGORIES: Record<string, { color: string; label: string; desc: string }> = {
  '1. Vrai Positif  (VEFA bien prédite)': {
    color: '#987db7',
    label: 'Vrai Positif (VEFA bien prédite)',
    desc: 'Le modèle confirme le recours à la VEFA'
  },
  '2. Vrai Négatif  (MOD bien prédite)': {
    color: '#21305e',
    label: 'Vrai Négatif (MOD bien prédite)',
    desc: 'Maîtrise d’ouvrage directe bien anticipée'
  },
  '3. Faux Positif  (Le modèle croyait VEFA)': {
    color: '#a39b28', // gold-olive visible
    label: 'Faux Positif (MOD atypique)',
    desc: 'Prédit VEFA mais réalisé en MOD directe (résidu +)'
  },
  '4. Faux Négatif  (Le modèle croyait MOD)': {
    color: '#02a8b6', // cyan
    label: 'Faux Négatif (VEFA surprise)',
    desc: 'Prédit MOD mais délégué au promoteur VEFA (résidu -)'
  }
};

export const GIS_LAYERS_CONFIG: Record<string, GisLayerConfig> = {
  'ipa-avignon': {
    id: 'ipa-avignon',
    projectId: 'avignon-ipa',
    name: 'Indice de Pression d\'Accès (IPA)',
    shortName: 'Carroyage IPA',
    badge: 'CARROYAGE 200M',
    description: 'Score composite de double peine territoriale (friction réseau réelle x saturation de l\'offre pour les 18-24 ans).',
    file: '/data/IPA_Avignon.geojson',
    geomType: 'polygon',
    getFeatureCategoryKey: (feature) => {
      const val = feature?.properties?.indice_sur_100;
      return getIpaBreakKey(val);
    },
    legendTitle: 'INDICE IPA (SCORE SUR 100)',
    legend: IPA_BREAKS.map(b => ({
      id: b.id,
      color: b.color,
      label: b.label,
      description: b.desc
    })),
    getStyle: (feature, opacity) => {
      const val = feature?.properties?.indice_sur_100;
      const fillColor = getIpaColor(val);
      return {
        fillColor,
        fillOpacity: Math.min(0.9, opacity * 0.8),
        color: '#232323',
        weight: 0.5,
        opacity: opacity * 0.6
      };
    },
    getPopupContent: (feature) => {
      const p = feature.properties || {};
      const score = Number(p.indice_sur_100 || 0).toFixed(2);
      const pop1824 = p.Ind_18_24 != null ? Math.round(p.Ind_18_24) : '—';
      const popTot = p.Ind != null ? Math.round(p.Ind) : '—';
      const logSoc = p.Log_soc != null ? Math.round(p.Log_soc) : '—';
      const menPauv = p.Men_pauv != null ? Math.round(p.Men_pauv) : '—';

      return `
        <div class="font-mono text-xs p-1 space-y-1.5 min-w-[210px] text-slate-900">
          <div class="flex items-center justify-between border-b border-purple-300 pb-1">
            <span class="font-pixel text-[0.625rem] text-purple-900 font-bold uppercase">Carreau Insee 200m</span>
            <span class="text-[0.5625rem] bg-purple-100 text-purple-900 px-1 py-0.2 rounded font-bold">${p.lcog_geo || '84007'}</span>
          </div>
          <div class="flex items-center justify-between bg-purple-50 p-1.5 rounded border border-purple-200">
            <span class="text-[0.6875rem] font-bold text-slate-700">Score IPA :</span>
            <span class="font-pixel text-sm text-purple-800 font-black">${score} / 100</span>
          </div>
          <div class="grid grid-cols-2 gap-1 text-[0.625rem]">
            <div class="bg-slate-100 p-1 rounded"><strong>18-24 ans :</strong> ${pop1824} hab.</div>
            <div class="bg-slate-100 p-1 rounded"><strong>Pop totale :</strong> ${popTot} hab.</div>
            <div class="bg-slate-100 p-1 rounded"><strong>Mén. pauvres :</strong> ${menPauv}</div>
            <div class="bg-slate-100 p-1 rounded"><strong>HLM existants :</strong> ${logSoc}</div>
          </div>
        </div>
      `;
    }
  },

  'lcz-avignon': {
    id: 'lcz-avignon',
    projectId: 'grand-avignon-climat',
    name: 'Zones Climatiques Locales (LCZ 50m)',
    shortName: 'LCZ Grand Avignon',
    badge: 'CLASSIF. 50M',
    description: 'Typologie micro-climatique de Stewart & Oke croisée aux îlots de chaleur de surface (Landsat 8 & Sentinel-2).',
    file: '/data/LCZ_Avignon_50m.geojson',
    geomType: 'polygon',
    getFeatureCategoryKey: (feature) => {
      return String(feature?.properties?.lcz || '').trim();
    },
    legendTitle: 'CLASSIFICATION LCZ (STEWART & OKE)',
    legend: Object.entries(LCZ_CATEGORIES)
      .filter(([key]) => ['3', '6', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(key))
      .map(([key, cat]) => ({
        id: key,
        color: cat.color,
        label: cat.label,
        description: cat.desc
      })),
    getStyle: (feature, opacity) => {
      const code = String(feature?.properties?.lcz || '').trim();
      const cat = LCZ_CATEGORIES[code] || { color: '#94a3b8' };
      return {
        fillColor: cat.color,
        fillOpacity: Math.min(0.9, opacity * 0.75),
        color: cat.color,
        weight: 0.3,
        opacity: opacity * 0.9
      };
    },
    getPopupContent: (feature) => {
      const code = String(feature?.properties?.lcz || '').trim();
      const cat = LCZ_CATEGORIES[code] || { color: '#94a3b8', label: `LCZ ${code}`, desc: 'Zone micro-climatique' };

      return `
        <div class="font-mono text-xs p-1 space-y-1.5 min-w-[210px] text-slate-900">
          <div class="flex items-center justify-between border-b border-emerald-300 pb-1">
            <span class="font-pixel text-[0.625rem] text-emerald-900 font-bold uppercase">Zone Climatique Locale</span>
            <span class="text-[0.625rem] font-bold px-1.5 py-0.2 rounded text-white" style="background-color: ${cat.color}">Code ${code}</span>
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-900">${cat.label}</h4>
            <p class="text-[0.6875rem] text-slate-600 mt-0.5">${cat.desc}</p>
          </div>
        </div>
      `;
    }
  },

  'vefa-marseille': {
    id: 'vefa-marseille',
    projectId: 'marseille-vefa',
    name: 'Résidus du Modèle Logistique (VEFA vs MOD)',
    shortName: 'Résidus GLMM Marseille',
    badge: '2 843 PROGRAMMES HLM',
    description: 'Programmes de logements sociaux géoréférencés et statut de prédiction du modèle GLMM lme4.',
    file: '/data/Memoire_residus.geojson',
    geomType: 'points',
    getFeatureCategoryKey: (feature) => {
      return String(feature?.properties?.Statut_Carto || '');
    },
    legendTitle: 'STATUT DE PRÉDICTION DU MODÈLE (GLMM)',
    legend: Object.entries(VEFA_CATEGORIES).map(([key, cat]) => ({
      id: key,
      color: cat.color,
      label: cat.label,
      description: cat.desc
    })),
    getStyle: () => ({}),
    pointToLayer: (feature, latlng, opacity) => {
      const statut = String(feature?.properties?.Statut_Carto || '');
      const cat = VEFA_CATEGORIES[statut] || { color: '#0284c7' };
      const poids = Number(feature?.properties?.Poids_Logements || 10);
      
      // Radius scaled moderately according to housing volume
      const radius = Math.max(3, Math.min(9, Math.sqrt(poids) * 1.1));

      return L.circleMarker(latlng, {
        radius,
        fillColor: cat.color,
        fillOpacity: Math.min(1, opacity * 0.9),
        color: '#ffffff',
        weight: 1,
        opacity: Math.min(1, opacity * 0.95)
      });
    },
    getPopupContent: (feature) => {
      const p = feature.properties || {};
      const statut = String(p.Statut_Carto || '');
      const cat = VEFA_CATEGORIES[statut] || { label: statut, color: '#38bdf8' };
      const proba = p.Proba_VEFA != null ? (Number(p.Proba_VEFA) * 100).toFixed(1) : '—';
      const residu = p.Residu != null ? Number(p.Residu).toFixed(3) : '—';
      const logts = p.Poids_Logements || '—';
      const commune = p.Commune || '—';

      return `
        <div class="font-mono text-xs p-1 space-y-1.5 min-w-[220px] text-slate-900">
          <div class="flex items-center justify-between border-b border-indigo-300 pb-1">
            <span class="font-pixel text-[0.625rem] text-indigo-950 font-bold uppercase">Opération HLM</span>
            <span class="text-[0.5625rem] bg-indigo-100 text-indigo-900 px-1 py-0.2 rounded font-bold">Commune ${commune}</span>
          </div>
          <div class="p-1.5 rounded border border-slate-200" style="background-color: ${cat.color}15">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${cat.color}"></span>
              <span class="font-bold text-[0.6875rem] text-slate-900">${cat.label}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1 text-[0.625rem]">
            <div class="bg-slate-100 p-1 rounded"><strong>Volume :</strong> ${logts} lgts</div>
            <div class="bg-slate-100 p-1 rounded"><strong>Proba VEFA :</strong> ${proba} %</div>
            <div class="bg-slate-100 p-1 rounded col-span-2"><strong>Résidu modèle :</strong> ${residu}</div>
          </div>
        </div>
      `;
    }
  }
};
