import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Compass, 
  MapPin, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Info,
  Key,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Crosshair,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';
import { 
  FRANCE_CENTER, 
  FRANCE_ZOOM, 
  type MapProject 
} from '../data/mapProjectsData';
import { useTranslation } from 'react-i18next';
import { getMapProjectsData, getClippyWelcome } from '../data/localizedData';
import ClippyAssistant from '../components/ClippyAssistant';
import { GIS_LAYERS_CONFIG, VEFA_CATEGORIES, type GisLayerConfig } from '../data/gisLayersConfig';

type BaseLayerId = 'carto' | 'osm' | 'satellite';

const CARTO_API_KEY = (import.meta.env.VITE_CARTO_API_KEY as string | undefined)?.trim() || '';

const BASE_LAYERS: Record<BaseLayerId, {
  name: string;
  shortName: string;
  badge: string;
  getUrl: (dark: boolean) => string;
  attribution: string;
  maxZoom: number;
  subdomains?: string;
}> = {
  carto: {
    name: 'CARTO Thème Auto',
    shortName: 'CARTO',
    badge: CARTO_API_KEY ? 'CLÉ OK' : 'CLÉ REQUISE',
    getUrl: (dark: boolean) => {
      const keyQuery = CARTO_API_KEY ? `?key=${CARTO_API_KEY}` : '';
      return dark
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png${keyQuery}`
        : `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png${keyQuery}`;
    },
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    maxZoom: 19,
    subdomains: 'abcd'
  },
  osm: {
    name: 'OpenStreetMap Standard',
    shortName: 'OSM',
    badge: 'LIBRE / SANS CLÉ',
    getUrl: () => 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: 'abc'
  },
  satellite: {
    name: 'Esri Satellite Ortho',
    shortName: 'SATELLITE',
    badge: 'ORTHOPHOTO',
    getUrl: () => 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 18
  }
};

export default function InteractiveMapPage(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'fr';
  const mapProjects = getMapProjectsData(lang);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [activeProject, setActiveProject] = useState<MapProject | null>(null);
  const [clippyMessage, setClippyMessage] = useState<string>(() => getClippyWelcome(lang));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [baseLayer, setBaseLayer] = useState<BaseLayerId>('carto');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isBasemapDropdownOpen, setIsBasemapDropdownOpen] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: FRANCE_CENTER[0], lng: FRANCE_CENTER[1], zoom: FRANCE_ZOOM });

  // GIS vector layers state
  const [activeGisLayers, setActiveGisLayers] = useState<Record<string, boolean>>({
    'ipa-avignon': false,
    'lcz-avignon': false,
    'vefa-marseille': false
  });
  const [layerOpacity, setLayerOpacity] = useState<number>(0.85);
  const [loadingLayers, setLoadingLayers] = useState<Record<string, boolean>>({});
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [activeLegendLayerId, setActiveLegendLayerId] = useState<string | null>(null);

  // Hidden/unchecked legend items for dynamic interactive filtering: layerId -> { itemId: boolean }
  const [hiddenLegendItems, setHiddenLegendItems] = useState<Record<string, Record<string, boolean>>>({});
  const hiddenLegendItemsRef = useRef<Record<string, Record<string, boolean>>>({});
  hiddenLegendItemsRef.current = hiddenLegendItems;

  const toggleLegendItem = (layerId: string, itemId: string): void => {
    setHiddenLegendItems((prev) => {
      const currentLayerHidden = { ...(prev[layerId] || {}) };
      currentLayerHidden[itemId] = !currentLayerHidden[itemId];
      return { ...prev, [layerId]: currentLayerHidden };
    });
  };

  const toggleAllLegendItems = (layerId: string, hideAll: boolean): void => {
    const config = GIS_LAYERS_CONFIG[layerId];
    if (!config) return;
    setHiddenLegendItems((prev) => {
      const currentLayerHidden: Record<string, boolean> = {};
      if (hideAll) {
        config.legend.forEach((it) => {
          currentLayerHidden[it.id] = true;
        });
      }
      return { ...prev, [layerId]: currentLayerHidden };
    });
  };

  const gisLayersRef = useRef<Record<string, L.GeoJSON>>({});
  const gisDataCacheRef = useRef<Record<string, any>>({});
  const layerOpacityRef = useRef<number>(layerOpacity);
  layerOpacityRef.current = layerOpacity;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const basemapDropdownRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<BaseLayerId>('carto');
  baseLayerRef.current = baseLayer;

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProjectsDropdownOpen(false);
      }
      if (basemapDropdownRef.current && !basemapDropdownRef.current.contains(event.target as Node)) {
        setIsBasemapDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dark mode detector
  const isDarkMode = (): boolean => {
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  };

  // Fullscreen toggle
  const toggleFullscreen = async (): Promise<void> => {
    if (!mapWrapperRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await mapWrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback: toggle state for CSS fullscreen if native is blocked
      setIsFullscreen(!isFullscreen);
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 200);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

// Helper to create cartographic callout pin markers:
// A pinpoint beacon at (0,0) with a sleek callout banner and pointer arrow above it
// carto & osm -> NOIR (text-slate-950 font-black)
// satellite -> BLANC (text-white font-bold)
const createMarkerIcon = (proj: MapProject, layer: BaseLayerId): L.DivIcon => {
  const isSatellite = layer === 'satellite';
  const fontColor = isSatellite ? 'text-white font-bold' : 'text-slate-950 font-black';
  const textShadow = isSatellite
    ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
    : 'drop-shadow-[0_0_1px_rgba(255,255,255,0.9)]';

  const styleConfig = {
    emerald: {
      lightBg: 'bg-emerald-50 border-emerald-600 text-slate-950',
      lightPointer: 'border-t-emerald-600',
      lightTarget: 'bg-emerald-600 border-white',
      darkBg: 'bg-slate-950/95 border-emerald-400 text-white',
      darkPointer: 'border-t-emerald-400',
      darkTarget: 'bg-emerald-400 border-slate-950',
    },
    violet: {
      lightBg: 'bg-purple-50 border-purple-600 text-slate-950',
      lightPointer: 'border-t-purple-600',
      lightTarget: 'bg-purple-600 border-white',
      darkBg: 'bg-slate-950/95 border-purple-400 text-white',
      darkPointer: 'border-t-purple-400',
      darkTarget: 'bg-purple-400 border-slate-950',
    },
    amber: {
      lightBg: 'bg-amber-50 border-amber-600 text-slate-950',
      lightPointer: 'border-t-amber-600',
      lightTarget: 'bg-amber-600 border-white',
      darkBg: 'bg-slate-950/95 border-amber-400 text-white',
      darkPointer: 'border-t-amber-400',
      darkTarget: 'bg-amber-400 border-slate-950',
    },
    rose: {
      lightBg: 'bg-rose-50 border-rose-600 text-slate-950',
      lightPointer: 'border-t-rose-600',
      lightTarget: 'bg-rose-600 border-white',
      darkBg: 'bg-slate-950/95 border-rose-400 text-white',
      darkPointer: 'border-t-rose-400',
      darkTarget: 'bg-rose-400 border-slate-950',
    },
    blue: {
      lightBg: 'bg-sky-50 border-sky-600 text-slate-950',
      lightPointer: 'border-t-sky-600',
      lightTarget: 'bg-sky-600 border-white',
      darkBg: 'bg-slate-950/95 border-sky-400 text-white',
      darkPointer: 'border-t-sky-400',
      darkTarget: 'bg-sky-400 border-slate-950',
    },
    cyan: {
      lightBg: 'bg-cyan-50 border-cyan-600 text-slate-950',
      lightPointer: 'border-t-cyan-600',
      lightTarget: 'bg-cyan-600 border-white',
      darkBg: 'bg-slate-950/95 border-retro-cyan text-white',
      darkPointer: 'border-t-retro-cyan',
      darkTarget: 'bg-retro-cyan border-slate-950',
    },
  }[proj.accent || 'cyan'];

  const badgeBg = isSatellite ? styleConfig.darkBg : styleConfig.lightBg;
  const pointerColor = isSatellite ? styleConfig.darkPointer : styleConfig.lightPointer;
  const targetColor = isSatellite ? styleConfig.darkTarget : styleConfig.lightTarget;

  // Horizontal alignment for callout banner:
  // Grand Avignon (left): banner extends to the left, arrow at the right side
  // IPA (right): banner extends to the right, arrow at the left side
  // Default: banner centered above pointer
  let horizontalAlign = '-translate-x-1/2';
  let arrowAlign = 'self-center';

  if (proj.badgeOffset === 'left') {
    horizontalAlign = '-translate-x-[85%]';
    arrowAlign = 'self-end mr-3';
  } else if (proj.badgeOffset === 'right') {
    horizontalAlign = '-translate-x-[15%]';
    arrowAlign = 'self-start ml-3';
  }

  return L.divIcon({
    className: 'custom-cad-callout-marker',
    html: `
      <div class="relative cursor-pointer group select-none pointer-events-auto">
        <!-- Floating Callout Banner positioned above the coordinate -->
        <div class="absolute bottom-2 left-0 ${horizontalAlign} flex flex-col group-hover:scale-105 active:scale-95 transition-transform">
          <!-- Text Badge -->
          <div class="flex items-center px-2.5 py-1 rounded-sm border-2 font-mono text-[0.6875rem] shadow-xl ${badgeBg} whitespace-nowrap">
            <span class="font-pixel text-[0.625rem] tracking-wider uppercase ${fontColor} ${textShadow}">
              ${proj.shortTitle}
            </span>
          </div>

          <!-- Downward Pointer Arrow targeting the coordinate -->
          <div class="w-0 h-0 border-x-4 border-x-transparent border-t-[6px] ${pointerColor} ${arrowAlign}"></div>
        </div>

        <!-- Pinpoint Target Beacon at exact location (0,0) -->
        <div class="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full border-2 ${targetColor} shadow-md group-hover:scale-125 transition-transform"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

  // Switch base layer dynamically and harmonize marker font colors
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const cfg = BASE_LAYERS[baseLayer];
    tileLayerRef.current.setUrl(cfg.getUrl(isDarkMode()));

    // Dynamically re-render all marker labels to match font color of active basemap
    mapProjects.forEach((proj) => {
      const marker = markersRef.current[proj.id];
      if (marker) {
        marker.setIcon(createMarkerIcon(proj, baseLayer));
      }
    });
  }, [baseLayer]);

  // Update marker icons and clippy message when language changes
  useEffect(() => {
    mapProjects.forEach((proj) => {
      const marker = markersRef.current[proj.id];
      if (marker) {
        marker.setIcon(createMarkerIcon(proj, baseLayerRef.current));
      }
    });
    if (activeProject) {
      const updated = mapProjects.find((p) => p.id === activeProject.id);
      if (updated) {
        setActiveProject(updated);
        setClippyMessage(updated.clippySummary);
      }
    } else {
      setClippyMessage(getClippyWelcome(lang));
    }
  }, [lang]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: FRANCE_CENTER,
      zoom: FRANCE_ZOOM,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true
    });

    mapInstanceRef.current = map;

    // Attribution
    L.control.attribution({ position: 'bottomleft', prefix: false })
      .addAttribution('&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>')
      .addTo(map);

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add Base Tile Layer
    const initialConfig = BASE_LAYERS[baseLayerRef.current];
    const tileLayer = L.tileLayer(initialConfig.getUrl(isDarkMode()), {
      maxZoom: initialConfig.maxZoom,
      subdomains: initialConfig.subdomains || 'abc',
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Update coordinates in status bar
    map.on('moveend', () => {
      const center = map.getCenter();
      setMapCoords({
        lat: Number(center.lat.toFixed(4)),
        lng: Number(center.lng.toFixed(4)),
        zoom: map.getZoom()
      });
    });

    // Create Custom Markers with initial font harmonization
    mapProjects.forEach((proj) => {
      const customIcon = createMarkerIcon(proj, baseLayerRef.current);
      const marker = L.marker(proj.coordinates, { icon: customIcon }).addTo(map);
      markersRef.current[proj.id] = marker;

      marker.on('click', () => {
        handleSelectProject(proj);
      });
    });

    // Dark mode observer
    const observer = new MutationObserver(() => {
      if (tileLayerRef.current && baseLayerRef.current === 'carto') {
        tileLayerRef.current.setUrl(BASE_LAYERS.carto.getUrl(isDarkMode()));
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Invalidate size on first render
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      observer.disconnect();
      Object.values(gisLayersRef.current).forEach((l) => l.remove());
      gisLayersRef.current = {};
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update opacity & filter visibility dynamically on all instantiated Leaflet GeoJSON layers
  useEffect(() => {
    layerOpacityRef.current = layerOpacity;
    hiddenLegendItemsRef.current = hiddenLegendItems;

    Object.entries(gisLayersRef.current).forEach(([id, layer]) => {
      const config = GIS_LAYERS_CONFIG[id];
      if (!config) return;
      const hiddenForLayer = hiddenLegendItems[id] || {};

      if (config.geomType === 'points') {
        layer.eachLayer((childLayer: any) => {
          if (!childLayer.setStyle) return;
          const catKey = config.getFeatureCategoryKey(childLayer.feature);
          const isHidden = Boolean(hiddenForLayer[catKey]);

          if (isHidden) {
            childLayer.setStyle({
              radius: 0,
              fillOpacity: 0,
              opacity: 0,
            });
            if (childLayer._path) {
              childLayer._path.style.display = 'none';
            }
          } else {
            const cat = VEFA_CATEGORIES[catKey] || { color: '#0284c7' };
            const poids = Number(childLayer.feature?.properties?.Poids_Logements || 10);
            const radius = Math.max(3, Math.min(9, Math.sqrt(poids) * 1.1));
            childLayer.setStyle({
              radius,
              fillColor: cat.color,
              fillOpacity: Math.min(1, layerOpacity * 0.9),
              color: '#ffffff',
              weight: 1,
              opacity: Math.min(1, layerOpacity * 0.95),
            });
            if (childLayer._path) {
              childLayer._path.style.display = '';
            }
          }
        });
      } else {
        layer.setStyle((feature: any) => {
          const catKey = config.getFeatureCategoryKey(feature);
          const isHidden = Boolean(hiddenForLayer[catKey]);
          if (isHidden) {
            return {
              fillOpacity: 0,
              opacity: 0,
              weight: 0,
              stroke: false,
            };
          }
          return config.getStyle(feature, layerOpacity);
        });
      }
    });
  }, [layerOpacity, hiddenLegendItems]);

  // Toggle GIS Vector Layer (lazy fetch + caching)
  const toggleGisLayer = async (layerId: string, forceState?: boolean): Promise<void> => {
    const config = GIS_LAYERS_CONFIG[layerId];
    if (!config || !mapInstanceRef.current) return;

    const isCurrentlyActive = Boolean(
      gisLayersRef.current[layerId] && mapInstanceRef.current.hasLayer(gisLayersRef.current[layerId])
    );
    const nextState = forceState !== undefined ? forceState : !isCurrentlyActive;

    if (!nextState) {
      if (gisLayersRef.current[layerId]) {
        gisLayersRef.current[layerId].remove();
      }
      setActiveGisLayers((prev) => ({ ...prev, [layerId]: false }));
      if (activeLegendLayerId === layerId) {
        const remaining = Object.keys(GIS_LAYERS_CONFIG).find(
          (k) => k !== layerId && activeGisLayers[k]
        );
        setActiveLegendLayerId(remaining || null);
      }
      return;
    }

    setActiveGisLayers((prev) => ({ ...prev, [layerId]: true }));
    setActiveLegendLayerId(layerId);
    setIsLegendOpen(true);

    if (gisLayersRef.current[layerId]) {
      if (!mapInstanceRef.current.hasLayer(gisLayersRef.current[layerId])) {
        gisLayersRef.current[layerId].addTo(mapInstanceRef.current);
      }
      return;
    }

    try {
      setLoadingLayers((prev) => ({ ...prev, [layerId]: true }));
      let geojson = gisDataCacheRef.current[layerId];
      if (!geojson) {
        const res = await fetch(config.file);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        geojson = await res.json();
        gisDataCacheRef.current[layerId] = geojson;
      }

      if (!mapInstanceRef.current) return;

      const layerInstance = L.geoJSON(geojson, {
        style: (feature) => {
          const catKey = config.getFeatureCategoryKey(feature);
          const isHidden = Boolean(hiddenLegendItemsRef.current[layerId]?.[catKey]);
          if (isHidden) {
            return { fillOpacity: 0, opacity: 0, weight: 0, stroke: false };
          }
          return config.getStyle(feature, layerOpacityRef.current);
        },
        pointToLayer: config.pointToLayer
          ? (feature, latlng) => {
              const marker = config.pointToLayer!(feature, latlng, layerOpacityRef.current);
              const catKey = config.getFeatureCategoryKey(feature);
              const isHidden = Boolean(hiddenLegendItemsRef.current[layerId]?.[catKey]);
              if (isHidden && (marker as any).setStyle) {
                (marker as any).setStyle({ radius: 0, fillOpacity: 0, opacity: 0 });
              }
              return marker;
            }
          : undefined,
        onEachFeature: (feature, layer) => {
          const popupHtml = config.getPopupContent(feature);
          layer.bindPopup(popupHtml, {
            maxWidth: 320,
            className: 'custom-cad-geojson-popup'
          });

          layer.on({
            mouseover: (e) => {
              const catKey = config.getFeatureCategoryKey(feature);
              if (hiddenLegendItemsRef.current[layerId]?.[catKey]) return;
              const target = e.target;
              if (target.setStyle) {
                target.setStyle({
                  weight: config.geomType === 'points' ? 2.5 : 2,
                  color: '#38bdf8'
                });
              }
            },
            mouseout: (e) => {
              const catKey = config.getFeatureCategoryKey(feature);
              if (hiddenLegendItemsRef.current[layerId]?.[catKey]) return;
              const target = e.target;
              if (target.setStyle) {
                if (config.geomType === 'points') {
                  target.setStyle({ weight: 1, color: '#ffffff' });
                } else {
                  target.setStyle(config.getStyle(feature, layerOpacityRef.current));
                }
              }
            }
          });
        }
      });

      gisLayersRef.current[layerId] = layerInstance;
      layerInstance.addTo(mapInstanceRef.current);
    } catch (err) {
      console.error(`Erreur chargement couche ${layerId}:`, err);
    } finally {
      setLoadingLayers((prev) => ({ ...prev, [layerId]: false }));
    }
  };

  const zoomToGisLayer = (layerId: string): void => {
    const layer = gisLayersRef.current[layerId];
    if (layer && mapInstanceRef.current) {
      try {
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Teleport to project
  const handleSelectProject = (project: MapProject): void => {
    setActiveProject(project);
    setIsInspectorOpen(true);
    setIsProjectsDropdownOpen(false);

    // Auto-activate corresponding layer if exists
    const matchingLayer = Object.values(GIS_LAYERS_CONFIG).find(
      (l) => l.projectId === project.id
    );

    if (matchingLayer) {
      toggleGisLayer(matchingLayer.id, true);
      setClippyMessage(
        `${project.clippySummary} 💡 J'ai activé la couche vectorielle « ${matchingLayer.shortName} » avec sa symbologie ! Cliquez sur un élément pour explorer ses attributs métier.`
      );
    } else {
      setClippyMessage(project.clippySummary);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(project.coordinates, project.zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  // Reset to France and close active layers
  const handleResetView = (): void => {
    setActiveProject(null);
    setClippyMessage(getClippyWelcome(lang));
    setIsProjectsDropdownOpen(false);

    // Deactivate and remove all vector layers
    Object.values(gisLayersRef.current).forEach((layer) => {
      if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(layer)) {
        layer.remove();
      }
    });

    setActiveGisLayers({
      'ipa-avignon': false,
      'lcz-avignon': false,
      'vefa-marseille': false
    });
    setIsLegendOpen(false);
    setActiveLegendLayerId(null);
    setHiddenLegendItems({});

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(FRANCE_CENTER, FRANCE_ZOOM, { duration: 1.2 });
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'p-0' : 'pt-24 pb-12'} min-h-screen bg-bp-canvas transition-all duration-200`}>
      <div className={`${isFullscreen ? 'w-full h-screen' : 'max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-4'}`}>

        {/* ── Dimension Line (hidden in full screen) ── */}
        {!isFullscreen && (
          <div className="dimension-line flex items-center justify-between">
            <span>{t('map.breadcrumb', 'ACCUEIL > STATION CARTOGRAPHIQUE > WEB-SIG INTERACTIF PLEIN ÉCRAN')}</span>
            <span className="font-pixel text-[0.625rem] text-retro-cyan">{t('map.projection', 'PROJECTION : WGS 84 / EPSG:3857')}</span>
          </div>
        )}

        {/* ── Main Map Workstation Shell ── */}
        <div
          ref={mapWrapperRef}
          className={`bevel-window p-2 sm:p-3 relative overflow-hidden flex flex-col ${
            isFullscreen
              ? 'fixed inset-0 z-50 rounded-none border-0 h-screen w-screen'
              : 'h-[calc(100vh-8.5rem)] min-h-[640px] shadow-2xl'
          }`}
        >
          {/* ── Window Titlebar ── */}
          <div className="bevel-titlebar -mx-2 -mt-2 sm:-mx-3 sm:-mt-3 mb-2 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-retro-cyan shadow-[0_0_8px_rgba(2,132,199,0.9)] flex-shrink-0 animate-pulse" />
              <span className="font-pixel text-[0.6875rem] font-bold tracking-wider uppercase text-slate-950 dark:text-white">
                {t('map.titlebar', 'STATION SIG WEB · CONSOLE DE TÉLÉPORTATION TERRITORIALE')}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
              {/* Basemap Switcher Dropdown */}
              <div ref={basemapDropdownRef} className="relative">
                <button
                  onClick={() => setIsBasemapDropdownOpen(!isBasemapDropdownOpen)}
                  className="bevel-btn text-xs sm:text-[0.8125rem] font-pixel flex items-center gap-2 px-3 py-1.5 text-slate-900 dark:text-white hover:scale-105 transition-all"
                  title={t('map.layers', 'Sélectionner le fond cartographique')}
                  aria-expanded={isBasemapDropdownOpen}
                >
                  <Layers className="w-4 h-4 text-retro-cyan flex-shrink-0" />
                  <span className="font-bold">{t('map.basemap', 'FOND')} : {BASE_LAYERS[baseLayer].shortName}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-retro-cyan transition-transform duration-200 flex-shrink-0 ${
                      isBasemapDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isBasemapDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] right-0 w-48 bevel-window p-1.5 bg-bp-surface/98 backdrop-blur-md shadow-2xl border-2 border-retro-cyan/80 z-40 space-y-1">
                    <div className="px-2 py-1 border-b border-bevel-mid mb-1">
                      <span className="font-pixel text-[0.5625rem] font-bold text-retro-cyan uppercase">
                        {t('map.basemapTitle', 'FOND CARTOGRAPHIQUE')}
                      </span>
                    </div>
                    {(Object.keys(BASE_LAYERS) as BaseLayerId[]).map((key) => {
                      const layer = BASE_LAYERS[key];
                      const isSelected = baseLayer === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setBaseLayer(key);
                            setIsBasemapDropdownOpen(false);
                          }}
                          className={`w-full text-left p-1.5 rounded bevel-inset flex items-center justify-between text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-retro-cyan/20 border-l-4 border-l-retro-cyan font-bold text-slate-950 dark:text-white'
                              : 'hover:bg-white/10 text-bp-text'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-pixel text-[0.6875rem]">{layer.shortName}</span>
                            <span className="text-[0.5625rem] text-bp-muted">{layer.name}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-retro-cyan flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* GIS Vector Layers Button (Larger) */}
              {(() => {
                const activeCount = Object.values(activeGisLayers).filter(Boolean).length;
                return (
                  <button
                    onClick={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
                    className={`bevel-btn text-xs sm:text-[0.8125rem] font-pixel flex items-center gap-2 px-3 sm:px-3.5 py-1.5 transition-all hover:scale-105 ${
                      activeCount > 0
                        ? 'bg-retro-cyan/20 border-retro-cyan text-slate-950 dark:text-retro-cyan font-bold shadow-sm'
                        : 'text-bp-text hover:text-retro-cyan'
                    }`}
                    title={t('map.gisManagerTitle', 'Ouvrir le gestionnaire des couches vectorielles SIG')}
                  >
                    <Layers className="w-4 h-4 text-retro-cyan" />
                    <span className="hidden sm:inline">{t('map.gisLayersBtn', 'COUCHES SIG')}</span>
                    <span className="sm:hidden">SIG</span>
                    <span className={`px-1.5 py-0.5 rounded text-[0.5625rem] font-mono ${
                      activeCount > 0 ? 'bg-retro-cyan text-slate-950 font-black' : 'bg-black/30 text-bp-muted'
                    }`}>
                      {activeCount}/3
                    </span>
                  </button>
                );
              })()}

              {/* Cartographic Legend Toggle Button (Larger) */}
              <button
                onClick={() => {
                  if (!activeLegendLayerId) {
                    const firstActive = Object.keys(GIS_LAYERS_CONFIG).find((k) => activeGisLayers[k]) || 'lcz-avignon';
                    setActiveLegendLayerId(firstActive);
                  }
                  setIsLegendOpen(!isLegendOpen);
                }}
                className={`bevel-btn text-xs sm:text-[0.8125rem] font-pixel flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 transition-all hover:scale-105 ${
                  isLegendOpen
                    ? 'bg-purple-500/20 border-purple-400 text-purple-900 dark:text-purple-300 font-bold'
                    : 'text-bp-text hover:text-retro-cyan'
                }`}
                title={t('map.legend', 'Afficher ou masquer la légende thématique')}
              >
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline">{t('map.legend', 'LÉGENDE')}</span>
              </button>

              {/* CARTO Key Helper Button (Larger) */}
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className={`bevel-btn text-xs sm:text-[0.8125rem] font-pixel flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 hover:scale-105 ${
                  CARTO_API_KEY
                    ? 'text-emerald-700 dark:text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
                    : 'text-amber-800 dark:text-amber-300 border-amber-500/60 bg-amber-400/15'
                }`}
                title="Configuration de la clé API CARTO"
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{CARTO_API_KEY ? t('map.cartoKeyOk', 'CLÉ CARTO OK') : t('map.cartoKeyMissing', 'CLÉ CARTO ?')}</span>
                <span className="sm:hidden">{CARTO_API_KEY ? 'OK' : '?'}</span>
              </button>

              <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-bp-muted">
                <span>LAT: {mapCoords.lat}°</span>
                <span>LON: {mapCoords.lng}°</span>
                <span>ZOOM: {mapCoords.zoom}x</span>
              </div>

              {/* Fullscreen Toggle Button (Larger) */}
              <button
                onClick={toggleFullscreen}
                className="bevel-btn text-xs sm:text-[0.8125rem] font-pixel flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-slate-900 dark:text-retro-cyan hover:scale-105 transition-transform"
                title={isFullscreen ? t('map.exitFullscreenBtn', "Quitter le plein écran") : t('map.fullscreenBtn', "Afficher la carte en plein écran")}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('map.exitFullscreenBtn', 'QUITTER PLEIN ÉCRAN')}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('map.fullscreenBtn', 'PLEIN ÉCRAN')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Floating Teleportation Command Bar (Top HUD) with Dropdown ── */}
          <div className="absolute top-12 left-4 right-4 z-20 pointer-events-none flex justify-center">
            <div
              ref={dropdownRef}
              className="bevel-window p-1.5 sm:p-2 bg-bp-surface/95 backdrop-blur-md shadow-2xl border-2 border-bevel-mid pointer-events-auto flex items-center gap-2 relative"
            >
              {/* Reset to France button (Larger) */}
              <button
                onClick={handleResetView}
                className={`bevel-btn text-xs sm:text-[0.8125rem] flex items-center gap-2 px-3.5 sm:px-4 py-2 whitespace-nowrap transition-all ${
                  !activeProject ? 'bevel-btn-primary font-bold' : 'text-bp-text hover:text-retro-cyan'
                }`}
                title={t('map.resetZoom', "Vue d'ensemble de la France (ferme les couches actives)")}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="font-pixel text-[0.6875rem] sm:text-xs">{t('map.france', 'FRANCE')}</span>
              </button>

              <div className="h-6 w-px bg-bevel-mid mx-0.5 flex-shrink-0" />

              {/* Projects Dropdown Trigger Button (Larger) */}
              <button
                onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                className={`bevel-btn text-xs sm:text-[0.8125rem] flex items-center gap-2.5 px-4 py-2 whitespace-nowrap transition-all ${
                  activeProject
                    ? 'bevel-btn-primary font-bold shadow-sm'
                    : 'text-bp-text hover:text-retro-cyan'
                }`}
                title={t('map.projectsList', "Ouvrir le menu des projets")}
                aria-expanded={isProjectsDropdownOpen}
              >
                <Compass className="w-4 h-4 text-retro-cyan flex-shrink-0" />
                <span className="font-pixel text-[0.6875rem] sm:text-xs tracking-wider uppercase truncate max-w-[200px] sm:max-w-[320px]">
                  {activeProject ? activeProject.shortTitle : t('map.selectProjectPrompt', 'SÉLECTIONNER UN PROJET...')}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-retro-cyan transition-transform duration-200 flex-shrink-0 ${
                    isProjectsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu List */}
              {isProjectsDropdownOpen && (
                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] max-w-[calc(100vw-2rem)] bevel-window p-2 bg-bp-surface/98 backdrop-blur-md shadow-2xl border-2 border-retro-cyan/70 z-30 space-y-1.5">
                  <div className="px-2 py-1 flex items-center justify-between border-b border-bevel-mid mb-1">
                    <span className="font-pixel text-[0.5625rem] font-bold text-retro-cyan uppercase tracking-wider">
                      TERRITOIRES & ÉTUDES SPATIALES
                    </span>
                    <span className="font-mono text-[0.5625rem] text-bp-muted">
                      {mapProjects.length} projets
                    </span>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                    {mapProjects.map((p) => {
                      const isSelected = activeProject?.id === p.id;
                      const accentColor = 
                        p.accent === 'emerald' ? 'bg-emerald-500' :
                        p.accent === 'violet' ? 'bg-purple-500' :
                        p.accent === 'amber' ? 'bg-amber-500' :
                        p.accent === 'rose' ? 'bg-rose-500' :
                        p.accent === 'blue' ? 'bg-sky-500' :
                        'bg-retro-cyan';

                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectProject(p)}
                          className={`w-full text-left p-2 rounded bevel-inset flex items-start gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-retro-cyan/20 border-l-4 border-l-retro-cyan font-bold'
                              : 'hover:bg-white/5 border-l-2 border-l-transparent hover:border-l-retro-cyan'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${accentColor} flex-shrink-0 mt-1 shadow-sm`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-pixel text-[0.625rem] text-slate-900 dark:text-white uppercase truncate">
                                {p.shortTitle}
                              </span>
                              <span className="font-mono text-[0.5625rem] text-bp-muted flex-shrink-0">
                                {p.date}
                              </span>
                            </div>
                            <p className="font-mono text-[0.625rem] text-bp-muted truncate mt-0.5">
                              📍 {p.territory}
                            </p>
                          </div>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-retro-cyan flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Floating Project Inspector (Left Drawer / HUD) ── */}
          {activeProject && (
            <div className="absolute top-28 left-4 z-20 w-80 sm:w-88 max-w-[calc(100vw-2rem)] pointer-events-auto">
              <div className="bevel-window p-3 bg-bp-surface/95 backdrop-blur-md shadow-2xl border-2 border-bevel-mid">
                <div className="bevel-titlebar -mx-3 -mt-3 mb-2 px-2 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-pixel text-[0.5625rem] font-bold uppercase text-slate-900 dark:text-white">
                      FICHE TERRITOIRE
                    </span>
                  </div>
                  <button
                    onClick={() => setIsInspectorOpen(!isInspectorOpen)}
                    className="bevel-control-btn text-[0.625rem] px-1"
                    title={isInspectorOpen ? "Réduire la fiche" : "Déplier la fiche"}
                  >
                    {isInspectorOpen ? '▲' : '▼'}
                  </button>
                </div>

                {isInspectorOpen ? (
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="bevel-inset px-2 py-0.5 text-[0.5625rem] font-pixel text-retro-cyan font-bold uppercase">
                        {activeProject.badge}
                      </span>
                      <span className="text-[0.625rem] text-bp-muted">
                        {activeProject.date}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-slate-950 dark:text-white leading-tight">
                        {activeProject.name}
                      </h3>
                      <p className="text-[0.6875rem] text-bp-muted">
                        📍 {activeProject.territory}
                      </p>
                    </div>

                    <div className="space-y-1">
                      {activeProject.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bevel-inset p-1.5 text-[0.6875rem] font-bold text-slate-900 dark:text-white border-l-2 border-l-retro-cyan flex items-center gap-1.5"
                        >
                          <span className="text-retro-cyan font-pixel text-[0.5rem]">►</span>
                          <span className="truncate">{m}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick GIS Layer toggle for active project */}
                    {(() => {
                      const matchingLayer = Object.values(GIS_LAYERS_CONFIG).find(
                        (l) => l.projectId === activeProject.id
                      );
                      if (!matchingLayer) return null;
                      const isLoaded = activeGisLayers[matchingLayer.id];
                      const isLoading = loadingLayers[matchingLayer.id];

                      return (
                        <div className="pt-1.5 border-t border-bevel-mid">
                          <button
                            onClick={() => toggleGisLayer(matchingLayer.id)}
                            disabled={isLoading}
                            className={`w-full py-1.5 px-2 rounded text-[0.625rem] font-pixel flex items-center justify-between border transition-all ${
                              isLoaded
                                ? 'bg-retro-cyan/15 border-retro-cyan text-slate-900 dark:text-retro-cyan font-bold shadow-sm'
                                : 'bevel-btn text-bp-muted hover:text-retro-cyan'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {isLoading ? (
                                <Loader2 className="w-3 h-3 animate-spin text-retro-cyan" />
                              ) : isLoaded ? (
                                <Eye className="w-3 h-3 text-retro-cyan" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                              <span>{isLoaded ? t('map.quickGisLayerLoaded', 'COUCHE SIG CHARGÉE') : t('map.quickGisLayerLoad', 'CHARGER COUCHE SIG')}</span>
                            </span>
                            <span className="text-[0.5rem] font-mono px-1 py-0.2 rounded bg-black/30 text-retro-cyan">
                              {matchingLayer.badge}
                            </span>
                          </button>
                        </div>
                      );
                    })()}

                    {activeProject.slug && (
                      <Link
                        to={`/projet/${activeProject.slug}`}
                        className="bevel-btn-primary w-full py-1.5 text-[0.6875rem] flex items-center justify-center gap-1.5 font-bold mt-1"
                      >
                        <span>{t('map.fullReportBtn', 'DOSSIER TECHNIQUE COMPLET')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {activeProject.name}
                    </span>
                    <button
                      onClick={() => setIsInspectorOpen(true)}
                      className="text-retro-cyan text-[0.625rem] font-pixel ml-2 underline"
                    >
                      {t('map.unfold', 'DÉPLIER')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Leaflet Map Canvas (Full Height) ── */}
          <div
            ref={mapContainerRef}
            className={`w-full flex-grow rounded bevel-inset relative z-10 bg-bp-canvas ${
              baseLayer === 'satellite' ? 'leaflet-theme-satellite' : 'leaflet-theme-light'
            }`}
          />

          {/* Scoped CSS for Leaflet controls and GeoJSON popups */}
          <style>{`
            .leaflet-theme-satellite .leaflet-control-attribution {
              background: rgba(15, 23, 42, 0.85) !important;
              color: #f8fafc !important;
            }
            .leaflet-theme-satellite .leaflet-control-attribution a {
              color: #38bdf8 !important;
            }
            .leaflet-theme-satellite .leaflet-bar a {
              background-color: #0f172a !important;
              color: #ffffff !important;
              border-bottom-color: #334155 !important;
            }
            .leaflet-theme-satellite .leaflet-bar a:hover {
              background-color: #1e293b !important;
              color: #38bdf8 !important;
            }
            .leaflet-theme-light .leaflet-control-attribution {
              background: rgba(255, 255, 255, 0.9) !important;
              color: #020617 !important;
            }
            .leaflet-theme-light .leaflet-control-attribution a {
              color: #0284c7 !important;
            }
            .leaflet-theme-light .leaflet-bar a {
              background-color: #ffffff !important;
              color: #020617 !important;
              border-bottom-color: #e2e8f0 !important;
            }
            .leaflet-theme-light .leaflet-bar a:hover {
              background-color: #f1f5f9 !important;
              color: #0284c7 !important;
            }

            /* Custom CAD GeoJSON Popup */
            .custom-cad-geojson-popup .leaflet-popup-content-wrapper {
              background: #ffffff !important;
              color: #0f172a !important;
              border: 2px solid #0284c7 !important;
              border-radius: 4px !important;
              box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.4) !important;
              padding: 0 !important;
            }
            .custom-cad-geojson-popup .leaflet-popup-content {
              margin: 10px 12px !important;
              line-height: 1.4 !important;
            }
            .custom-cad-geojson-popup .leaflet-popup-tip {
              background: #0284c7 !important;
            }
            .dark .custom-cad-geojson-popup .leaflet-popup-content-wrapper {
              background: #090d16 !important;
              color: #f8fafc !important;
              border-color: #38bdf8 !important;
            }
            .dark .custom-cad-geojson-popup .leaflet-popup-content-wrapper * {
              color: #f8fafc !important;
            }
            .dark .custom-cad-geojson-popup .leaflet-popup-content-wrapper .bg-slate-100 {
              background-color: rgba(255, 255, 255, 0.08) !important;
            }
            .dark .custom-cad-geojson-popup .leaflet-popup-content-wrapper .bg-purple-50,
            .dark .custom-cad-geojson-popup .leaflet-popup-content-wrapper .bg-emerald-50 {
              background-color: rgba(2, 132, 199, 0.15) !important;
            }
          `}</style>

          {/* ── Floating Cartographic Legend Window ── */}
          {isLegendOpen && activeLegendLayerId && GIS_LAYERS_CONFIG[activeLegendLayerId] && (
            <div className="absolute bottom-6 right-4 z-20 w-72 sm:w-80 max-w-[calc(100vw-2rem)] pointer-events-auto">
              <div className="bevel-window p-2.5 bg-bp-surface/98 backdrop-blur-md shadow-2xl border-2 border-bevel-mid space-y-2">
                <div className="bevel-titlebar -mx-2.5 -mt-2.5 mb-1.5 px-2 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse flex-shrink-0" />
                    <span className="font-pixel text-[0.5625rem] font-bold uppercase text-slate-900 dark:text-white truncate">
                      {GIS_LAYERS_CONFIG[activeLegendLayerId].legendTitle}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsLegendOpen(false)}
                    className="bevel-control-btn text-[0.625rem] px-1 hover:bg-red-500 hover:text-white"
                    title="Fermer la légende"
                  >
                    ✕
                  </button>
                </div>

                {/* Layer selector tabs if multiple layers are active */}
                {Object.values(activeGisLayers).filter(Boolean).length > 1 && (
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                    {Object.values(GIS_LAYERS_CONFIG)
                      .filter((l) => activeGisLayers[l.id])
                      .map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setActiveLegendLayerId(l.id)}
                          className={`px-1.5 py-0.5 rounded text-[0.5rem] font-pixel whitespace-nowrap transition-all ${
                            activeLegendLayerId === l.id
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bevel-btn text-bp-muted hover:text-white'
                          }`}
                        >
                          {l.shortName}
                        </button>
                      ))}
                  </div>
                )}

                {/* Interactive Legend filter header */}
                <div className="flex items-center justify-between pb-1 border-b border-bevel-mid/50 text-[0.5625rem] font-mono text-bp-muted">
                  <span className="font-pixel text-[0.5rem] tracking-wider uppercase text-purple-400">
                    {t('map.filterClasses', 'FILTRER LES CLASSES :')}
                  </span>
                  <div className="flex items-center gap-1.5 font-bold">
                    <button
                      type="button"
                      onClick={() => toggleAllLegendItems(activeLegendLayerId, false)}
                      className="hover:text-retro-cyan hover:underline transition-colors"
                      title={t('map.filterAll', 'Afficher toutes les classes')}
                    >
                      {t('map.filterAll', 'TOUT')}
                    </button>
                    <span className="text-bp-dim">/</span>
                    <button
                      type="button"
                      onClick={() => toggleAllLegendItems(activeLegendLayerId, true)}
                      className="hover:text-rose-400 hover:underline transition-colors"
                      title={t('map.filterNone', 'Masquer toutes les classes')}
                    >
                      {t('map.filterNone', 'AUCUN')}
                    </button>
                  </div>
                </div>

                {/* Legend items list with checkable toggle rows */}
                <div className="max-h-52 overflow-y-auto pr-1 space-y-1 font-mono scrollbar-thin text-xs">
                  {GIS_LAYERS_CONFIG[activeLegendLayerId].legend.map((item) => {
                    const isHidden = Boolean(hiddenLegendItems[activeLegendLayerId]?.[item.id]);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleLegendItem(activeLegendLayerId, item.id)}
                        className={`w-full flex items-center gap-2 p-1 rounded text-left transition-all ${
                          isHidden
                            ? 'opacity-40 bg-black/10 text-bp-dim hover:opacity-60'
                            : 'hover:bg-white/5 text-slate-900 dark:text-white'
                        }`}
                        title={isHidden ? t('map.clickToShowClass', 'Cliquer pour afficher cette classe') : t('map.clickToHideClass', 'Cliquer pour masquer cette classe')}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center flex-shrink-0 border transition-all ${
                            isHidden
                              ? 'border-dashed border-bp-dim/80 bg-transparent'
                              : 'border-black/50 shadow-xs'
                          }`}
                          style={{ backgroundColor: isHidden ? 'transparent' : item.color }}
                        >
                          {!isHidden && (
                            <Check className="w-2.5 h-2.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-[0.625rem] font-bold truncate leading-tight ${isHidden ? 'line-through text-bp-dim' : ''}`}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-[0.5625rem] text-bp-muted truncate leading-tight">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <span className={`font-pixel text-[0.5rem] px-1 py-0.2 rounded border flex-shrink-0 ${
                          isHidden
                            ? 'bg-transparent text-bp-dim border-bevel-mid/50'
                            : 'bg-bp-canvas text-retro-cyan border-retro-cyan/40 font-bold'
                        }`}>
                          {isHidden ? 'OFF' : 'ON'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1 border-t border-bevel-mid flex items-center justify-between text-[0.5625rem] font-mono text-bp-muted">
                  <span>{t('map.thematicLegend', 'Légende thématique')}</span>
                  <button
                    onClick={() => zoomToGisLayer(activeLegendLayerId)}
                    className="text-retro-cyan hover:underline flex items-center gap-1"
                  >
                    <Crosshair className="w-2.5 h-2.5" />
                    <span>{t('map.zoomExtent', 'Zoom emprise')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Floating Layer Manager CAD Window ── */}
          {isLayersPanelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
              <div className="bevel-window p-3 sm:p-4 bg-bp-surface max-w-2xl w-full border-2 border-retro-cyan shadow-2xl space-y-3">
                <div className="bevel-titlebar -mx-3 -mt-3 sm:-mx-4 sm:-mt-4 mb-2 px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-retro-cyan" />
                    <span className="font-pixel text-[0.6875rem] font-bold uppercase text-slate-950 dark:text-retro-cyan">
                      {t('map.gisManagerTitle', 'GESTIONNAIRE DES COUCHES VECTORIELLES SIG')}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsLayersPanelOpen(false)}
                    className="bevel-control-btn text-xs px-2 py-0.5 hover:bg-red-500 hover:text-white"
                    title={t('clippy.close', 'Fermer')}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {Object.values(GIS_LAYERS_CONFIG).map((l) => {
                    const isActive = activeGisLayers[l.id];
                    const isLoading = loadingLayers[l.id];

                    return (
                      <div
                        key={l.id}
                        className={`p-2.5 rounded bevel-inset border-l-4 transition-all ${
                          isActive
                            ? 'border-l-retro-cyan bg-retro-cyan/10'
                            : 'border-l-bevel-mid bg-black/10'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => toggleGisLayer(l.id)}
                                disabled={isLoading}
                                className="flex items-center gap-2 text-left cursor-pointer group"
                              >
                                <span className={`w-3 h-3 rounded-full flex-shrink-0 border transition-all ${
                                  isActive
                                    ? 'bg-retro-cyan border-retro-cyan shadow-[0_0_6px_rgba(2,132,199,0.8)]'
                                    : 'bg-transparent border-bevel-mid group-hover:border-retro-cyan'
                                }`} />
                                <span className="font-pixel text-[0.6875rem] font-bold text-slate-900 dark:text-white uppercase">
                                  {l.name}
                                </span>
                              </button>
                              <span className="px-1.5 py-0.2 rounded text-[0.5rem] font-mono bg-black/30 text-retro-cyan border border-retro-cyan/30 flex-shrink-0">
                                {l.badge}
                              </span>
                            </div>
                            <p className="font-mono text-[0.625rem] text-bp-muted mt-1 leading-snug">
                              {l.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0">
                            {isLoading ? (
                              <span className="text-[0.625rem] font-mono text-retro-cyan flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>{t('map.loading', 'CHARGEMENT')}</span>
                              </span>
                            ) : (
                              <>
                                {isActive && (
                                  <>
                                    <button
                                      onClick={() => {
                                        zoomToGisLayer(l.id);
                                        setIsLayersPanelOpen(false);
                                      }}
                                      className="bevel-btn px-1.5 py-1 text-[0.5625rem] font-pixel flex items-center gap-1 text-bp-text hover:text-retro-cyan"
                                      title={t('map.zoomExtent', "Centrer la carte sur l'emprise de la couche")}
                                    >
                                      <Crosshair className="w-3 h-3" />
                                      <span className="hidden sm:inline">{t('map.center', 'CENTRER')}</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setActiveLegendLayerId(l.id);
                                        setIsLegendOpen(true);
                                        setIsLayersPanelOpen(false);
                                      }}
                                      className="bevel-btn px-1.5 py-1 text-[0.5625rem] font-pixel flex items-center gap-1 text-purple-400 hover:text-purple-300"
                                      title={t('map.legend', "Afficher la légende thématique")}
                                    >
                                      <SlidersHorizontal className="w-3 h-3" />
                                      <span className="hidden sm:inline">{t('map.legend', 'LÉGENDE')}</span>
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => toggleGisLayer(l.id)}
                                  className={`bevel-btn px-2 py-1 text-[0.5625rem] font-pixel ${
                                    isActive
                                      ? 'bevel-btn-primary font-bold'
                                      : 'text-bp-muted hover:text-white'
                                  }`}
                                >
                                  {isActive ? t('map.deactivate', 'DÉSACTIVER') : t('map.activate', 'ACTIVER')}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-bevel-mid flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-[0.625rem] font-pixel text-bp-muted">{t('map.opacity', 'OPACITÉ')} :</span>
                    <div className="flex items-center gap-1">
                      {[0.5, 0.75, 0.95].map((op) => (
                        <button
                          key={op}
                          onClick={() => setLayerOpacity(op)}
                          className={`px-2 py-0.5 rounded text-[0.5625rem] font-pixel ${
                            layerOpacity === op
                              ? 'bg-retro-cyan text-slate-950 font-bold'
                              : 'bevel-btn text-bp-text hover:text-retro-cyan'
                          }`}
                        >
                          {Math.round(op * 100)}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        Object.keys(GIS_LAYERS_CONFIG).forEach((id) => toggleGisLayer(id, false));
                      }}
                      className="bevel-btn px-2.5 py-1 text-[0.5625rem] font-pixel text-rose-400 hover:text-rose-300"
                    >
                      {t('map.deactivateAll', 'TOUT DÉSACTIVER')}
                    </button>
                    <button
                      onClick={() => setIsLayersPanelOpen(false)}
                      className="bevel-btn-primary px-3 py-1 text-[0.5625rem] font-pixel font-bold"
                    >
                      {t('map.validate', 'VALIDER')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Clippy Assistant (Placed on bottom-left to prevent legend overlap) ── */}
          <ClippyAssistant
            message={clippyMessage}
            projectName={activeProject?.shortTitle}
            projectSlug={activeProject?.slug}
            metrics={activeProject?.metrics}
            position="left"
          />
        </div>

        {/* ── CARTO API Key Modal / Dialog ── */}
        {isKeyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bevel-window p-4 sm:p-6 bg-bp-surface max-w-lg w-full border-2 border-retro-cyan shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
              <div className="bevel-titlebar -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-3 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-retro-cyan" />
                  <span className="font-pixel text-[0.6875rem] sm:text-xs font-bold uppercase text-slate-950 dark:text-retro-cyan">
                    CONFIGURATION DE LA CLÉ CARTO
                  </span>
                </div>
                <button
                  onClick={() => setIsKeyModalOpen(false)}
                  className="bevel-control-btn text-xs px-2 py-0.5 hover:bg-red-500 hover:text-white"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs text-bp-text leading-relaxed">
                <div className={`p-3 bevel-inset border-l-4 ${CARTO_API_KEY ? 'border-l-emerald-500 bg-emerald-500/10' : 'border-l-amber-500 bg-amber-500/10'}`}>
                  <p className="font-bold flex items-center gap-2">
                    {CARTO_API_KEY ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-800 dark:text-emerald-300">Clé API active détectée dans l&apos;environnement !</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="text-amber-900 dark:text-amber-300">Aucune clé détectée (filigrane présent sur CARTO)</span>
                      </>
                    )}
                  </p>
                </div>

                <p className="text-xs">
                  CARTO exige désormais une clé API (100% gratuite) pour ses tuiles raster externes. Sans cette clé, le filigrane <em>&quot;API key required&quot;</em> s&apos;affiche.
                </p>

                <div className="bevel-inset p-3 bg-black/20 space-y-2">
                  <div className="font-pixel text-[0.625rem] text-retro-cyan uppercase font-bold">
                    Comment l&apos;activer en 30 secondes :
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-bp-text">
                    <li>
                      Générez votre clé gratuite sur{' '}
                      <a
                        href="https://carto.com/basemaps/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-retro-cyan underline font-bold inline-flex items-center gap-1 hover:text-cyan-300"
                      >
                        carto.com/basemaps/apikey
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      Ouvrez le fichier <code className="px-1 py-0.5 bg-black/40 rounded text-retro-cyan font-bold">.env.local</code> à la racine du projet.
                    </li>
                    <li>
                      Ajoutez votre clé :
                      <pre className="mt-1 p-2 bg-black/60 rounded text-retro-cyan border border-bevel-mid select-all overflow-x-auto text-[0.6875rem]">
VITE_CARTO_API_KEY=votre_cle_ici
                      </pre>
                    </li>
                    <li>
                      Redémarrez le serveur Vite (<code className="text-retro-cyan">npm run dev</code>) pour recharger les variables.
                    </li>
                  </ol>
                </div>

                <div className="pt-2 border-t border-bevel-mid flex flex-col sm:flex-row items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setBaseLayer('osm');
                      setIsKeyModalOpen(false);
                    }}
                    className="bevel-btn w-full sm:w-auto px-3 py-1.5 text-xs text-retro-cyan hover:scale-105"
                  >
                    BASCULER SUR OPENSTREETMAP (SANS CLÉ)
                  </button>
                  <button
                    onClick={() => setIsKeyModalOpen(false)}
                    className="bevel-btn-primary w-full sm:w-auto px-4 py-1.5 text-xs font-bold"
                  >
                    FERMER
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
