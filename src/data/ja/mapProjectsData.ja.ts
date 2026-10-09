import type { MapProject } from '../mapProjectsData';

export const CLIPPY_WELCOME_JA = "こんにちは！案内アシスタントのClippyです。マルソーの空間モデリングやGISプロジェクトをご覧いただいていますね。地図上のピンをクリックするか、セレクターでプロジェクトを選択してください。主要な知見を要約してご案内します！";

export const mapProjectsJa: MapProject[] = [
  {
    id: "marseille-vefa",
    name: "エクス＝マルセイユ＝プロヴァンス都市圏",
    shortTitle: "VEFA方式 ＆ 公営住宅",
    territory: "55自治体（ブーシュ＝デュ＝ローヌ県）",
    coordinates: [43.2965, 5.3698],
    zoom: 11,
    badge: "M1修士論文 · 学術研究",
    accent: "violet",
    date: "2025-2026",
    metrics: [
      "55,758戸の公営住宅データを解析",
      "ICC = 73.4%（自治体固有の政治的影響が支配的）",
      "AUC = 0.82（lme4ロジスティック混合モデル）"
    ],
    description: "R言語による一般化線形混合モデル（GLMM）を用い、VEFA（青田買い方式）を通じた公営住宅生産の民間委託メカニズムを解明。",
    clippySummary: "マルセイユ都市圏の公営住宅動態をご覧ですね！マルソーは55,758戸の公営住宅をロジスティックGLMMモデルで分析しました。主な発見として、級内相関係数（ICC）が73.4%に達し、民間開発委託の決定要因は不動産相場ではなく各自治体の政治的選択であることが実証されました。",
    slug: "memoire-vefa"
  },
  {
    id: "grand-avignon-climat",
    name: "グラン・アヴィニョン都市共同体",
    shortTitle: "都市部過熱 ＆ 気候適応",
    territory: "16自治体（ヴォクリューズ県・ガール県）",
    coordinates: [43.9780, 4.8020],
    zoom: 12,
    badge: "公共受託研究（学部3年）· 164頁",
    accent: "emerald",
    date: "2024-2025",
    badgeOffset: "left",
    metrics: [
      "164ページの調査診断報告書",
      "商業地域に表面ヒートアイランドの72.1%が集中",
      "50m解像度LCZ分類 ＆ Landsat 8衛星解析"
    ],
    description: "Landsat 8衛星による地表面温度（LST）解析、ローカル気候帯（LCZ）分類、および120台のIoT気候センサー網の配置計画策定。",
    clippySummary: "グラン・アヴィニョンの気候診断報告書です！公的委託による164頁の詳細レポートです。マルソーがGISと衛星リモートセンシングを統括し、ヒートアイランドの72.1%が商業地域に集中していることを特定、120台のIoTセンサー配置と130箇所のクールスポットを抽出しました。",
    slug: "grand-avignon-climat"
  },
  {
    id: "avignon-ipa",
    name: "アヴィニョン都市圏",
    shortTitle: "アクセス圧力指数 (IPA)",
    territory: "アヴィニョン大学キャンパス周辺",
    coordinates: [43.9260, 4.8480],
    zoom: 13,
    badge: "学術論文・研究出版",
    accent: "cyan",
    date: "2025",
    badgeOffset: "right",
    metrics: [
      "QNEAT3による実道路網トポロジー経路探索",
      "INSEE 200mメッシュ人口データとの統合",
      "2SFCAモデルの軽量・実用的代替手法"
    ],
    description: "民間供給データが不足する地域において、距離的遠隔性と需要集中が複合する「空間的二重格差」を定量化する透明性の高いアクセシビリティ指標を考案。",
    clippySummary: "アヴィニョンのアクセシビリティ研究ですね！マルソーは、施設定員データが欠落している環境でも機能する頑健な「アクセス圧力指数（IPA）」を開発しました。実道路網グラフと若年層人口メッシュを統合して検証されています。",
    slug: "article-ipa"
  },
  {
    id: "rennes-3d",
    name: "レンヌ都市圏",
    shortTitle: "3D土地潜在力 ＆ ZAN法",
    territory: "43自治体（イル＝エ＝ヴィレーヌ県）",
    coordinates: [48.1173, -1.6778],
    zoom: 12,
    badge: "3D-GIS工学 · 学部3年",
    accent: "amber",
    date: "2025",
    metrics: [
      "208,351棟の建物を高精度3Dモデリング",
      "33,304棟の増築可能屋根を自動検出",
      "LiDAR HD 50cm解像度ラスタマップ代数"
    ],
    description: "フランスの「自然地不増加（ZAN法）」制約下において、建物の垂直増築および水平充填の潜在力を検出する多基準ラスタ代数アルゴリズムを構築。",
    clippySummary: "レンヌ都市圏のプロジェクトです！新規農地開発を抑制するZAN法に対応し、マルソーはLiDAR HD（50cm）を用いたラスタ代数アルゴリズムを開発しました。20万8千棟の建物を解析し、増築可能な33,304棟の屋根を自動抽出しました。",
    slug: "rennes-foncier-sig"
  }
];
