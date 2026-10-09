import type { ExperienceItem } from '../../types';

export const experienceDataJa: ExperienceItem[] = [
  {
    id: "m1-geodata",
    period: "2026-2027",
    status: "在学中",
    isCurrent: true,
    title: "ジオマティクス・空間データサイエンス 修士1年（Master 1）",
    institution: "GeoData Paris、ギュスターヴ・エッフェル大学（旧ENSG）",
    location: "パリ大区（シャン＝シュル＝マルヌ）",
    description: "最先端の空間データサイエンス、高度地球統計学、人工衛星による地球観測、大規模かつ再現可能な自動解析パイプラインの開発に関する専門教育。",
    badges: [
      { text: "空間データサイエンス", color: "yellow" },
      { text: "在籍中", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "stage-cedre",
    period: "2026年6月〜9月",
    status: "研究開発インターンシップ",
    isCurrent: false,
    title: "R&Dアシスタント：南仏における夜間光害の空間モデリング",
    institution: "CEDRE",
    location: "アレス（ガール県）",
    description: "夜間光害の空間解析および予測モデリングに関する研究開発インターンシップ。光害による経済的電力損失の推計、街路灯需要の多基準モデル構築。構築した分析基盤は製品化され、自治体向け意思決定プラットフォームとして導入されました。",
    badges: [
      { text: "研究開発 (R&D)", color: "emerald" },
      { text: "光害モデリング", color: "muted" }
    ],
    accent: "emerald"
  },
  {
    id: "m1-geoter",
    period: "2025-2026",
    status: "修了",
    isCurrent: false,
    title: "ジオマティクス・地域プロジェクト管理 修士1年（GEOTER）",
    institution: "アヴィニョン大学",
    location: "アヴィニョン",
    description: "定量的空間分析、地域診断、プロジェクト主導力を育成する教育課程。アヴィニョン市庁舎の都市遺産GISデータベース刷新事業、およびエクス＝マルセイユ都市圏における公営住宅の計量経済・空間分布を解明する実証研究論文を主導。",
    badges: [
      { text: "首席修了 (Top of Class)", color: "red" },
      { text: "優秀賞 (Mention Bien)", color: "emerald" },
      { text: "学生代表", color: "yellow" }
    ],
    accent: "emerald"
  },
  {
    id: "asso-bang",
    period: "2025-2026",
    status: "学生団体共同代表",
    isCurrent: false,
    title: "学生非営利団体 BANG 共同代表",
    institution: "アヴィニョン大学",
    location: "アヴィニョン",
    description: "2025-2026年度における大学公認学生団体の共同代表。地域コミュニティ活動の統括、予算管理、大学間連携プロジェクトの推進。",
    badges: [
      { text: "リーダーシップ", color: "yellow" },
      { text: "共同代表", color: "emerald" }
    ],
    accent: "muted"
  },
  {
    id: "stage-espace",
    period: "2025年",
    status: "学術研究インターンシップ",
    isCurrent: false,
    title: "研究インターン：公営住宅の空間計量経済モデリング",
    institution: "フランス国立科学研究センター (CNRS) UMR 7300 ESPACE / アヴィニョン大学",
    location: "アヴィニョン",
    description: "エクス＝マルセイユ＝プロヴァンス都市圏における公営住宅供給動態の計量経済・空間分析。RPLS住宅台帳、INSEE国勢調査200mメッシュ、IGN地形データを統合した高精度空間DBの構築。",
    badges: [
      { text: "学術研究", color: "yellow" },
      { text: "CNRS研究所", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "licence-geo",
    period: "2022-2025",
    status: "学士取得",
    isCurrent: false,
    title: "地理学・地域計画学 学士（B.Sc.）",
    institution: "アヴィニョン大学",
    location: "アヴィニョン",
    description: "自然地理学・人文地理学の堅固な基礎を修得し、学部1年次よりGIS、2〜3年次に多変量統計・空間モデルへと特化。レンヌ都市圏の建物増築可能性分析やグラン・アヴィニョンの気候診断などを主導。",
    badges: [
      { text: "GIS・統計 専攻首席", color: "red" },
      { text: "優等修了", color: "emerald" },
      { text: "学生代表", color: "yellow" }
    ],
    accent: "red"
  }
];
