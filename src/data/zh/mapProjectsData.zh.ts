import type { MapProject } from '../mapProjectsData';

export const CLIPPY_WELCOME_ZH = "您好！我是您的导览助手 Clippy。看起来您正在探索 Marceau 在空间建模与地理信息科学方面的代表作。点击地图上的地标或使用上方的项目选择器，我将为您快速总结关键研究发现！";

export const mapProjectsZh: MapProject[] = [
  {
    id: "marseille-vefa",
    name: "普罗旺斯地区艾克斯-马赛大都会区",
    shortTitle: "VEFA开发模式与公共住房",
    territory: "55个市镇（罗讷河口省）",
    coordinates: [43.2965, 5.3698],
    zoom: 11,
    badge: "M1硕士论文 · 学术科研",
    accent: "violet",
    date: "2025-2026",
    metrics: [
      "分析 55,758 套保障性住房数据",
      "ICC = 73.4%（市镇政治偏好具有决定性影响）",
      "AUC = 0.82（lme4 Logistic 混合效应模型）"
    ],
    description: "基于 R 语言广义线性混合效应模型（GLMM），深入解析通过 VEFA（楼花预售模式）将公共住房建设外包给私营开发商所造成的空间重组机制。",
    clippySummary: "您正在浏览马赛大都会区的公共住房研究！Marceau 运用 Logistic GLMM 模型分析了 55,758 套公共住房。核心发现是组内相关系数（ICC）高达 73.4%，证明决定是否外包给私营开发商的关键在于各市镇的地方政治意志，而非房地产市场价格。",
    slug: "memoire-vefa"
  },
  {
    id: "grand-avignon-climat",
    name: "大阿维尼翁城市社区",
    shortTitle: "城市过热与气候韧性诊断",
    territory: "16个市镇（沃克吕兹省与加尔省）",
    coordinates: [43.9780, 4.8020],
    zoom: 12,
    badge: "公共课题（本科大三）· 164页",
    accent: "emerald",
    date: "2024-2025",
    badgeOffset: "left",
    metrics: [
      "164页完整公共研究诊断报告",
      "商业物流区聚集了 72.1% 的热岛面积",
      "50米高分辨率 LCZ 气候分区与 Landsat 8 遥感反演"
    ],
    description: "基于 Landsat 8 地表温度（LST）反演、局地气候区（LCZ）50米精细分类，并设计了 120 个 IoT 微气候监测传感器的空间布局方案。",
    clippySummary: "这是大阿维尼翁的气候诊断研究报告！这是一份长达 164 页的大型政府课题。Marceau 领导了 GIS 与卫星遥感团队：查明 72.1% 的热岛面积集中在商业物流园区，规划了 120 个微气候传感器的布设并定位了 130 处清凉绿道。",
    slug: "grand-avignon-climat"
  },
  {
    id: "avignon-ipa",
    name: "阿维尼翁都市圈",
    shortTitle: "空间可达性压力指数 (IPA)",
    territory: "阿维尼翁大学各校区辐射圈",
    coordinates: [43.9260, 4.8480],
    zoom: 13,
    badge: "学术论文与发表",
    accent: "cyan",
    date: "2025",
    badgeOffset: "right",
    metrics: [
      "基于 QNEAT3 的真实路网拓扑路由分析",
      "融合 INSEE 200米人口普查高精网格",
      "数据匮乏环境下 2SFCA 模型的轻量化替代方案"
    ],
    description: "针对公共服务容量数据缺失的情境，构建了透明且稳健的“空间可达性压力指数（IPA）”，有效量化出行距离阻力与目的地需求过载叠加的“空间双重惩罚”。",
    clippySummary: "这是阿维尼翁的公共服务可达性研究！Marceau 设计了空间可达性压力指数（IPA），在无需获取私营机构容量数据的前提下有效评估空间服务不平等，已在阿维尼翁 18-24 岁青年就学出行场景中得到验证。",
    slug: "article-ipa"
  },
  {
    id: "rennes-3d",
    name: "雷恩大都会区",
    shortTitle: "三维垂直增建潜力与土地循环",
    territory: "43个市镇（伊勒-维莱讷省）",
    coordinates: [48.1173, -1.6778],
    zoom: 12,
    badge: "三维 GIS 工程 · 本科大三",
    accent: "amber",
    date: "2025",
    metrics: [
      "对 208,351 栋既有建筑进行高精 3D 建模",
      "自动识别出 33,304 处适宜加层的屋顶",
      "基于 50cm LiDAR 高精度 DSM/DTM 栅格地图代数"
    ],
    description: "在法国《净零土地人工化法》(ZAN) 严格限制农地开发的背景下，构建高分辨率栅格地图代数模型，自动识别建筑垂直加层与内部填隙开发的潜在空间。",
    clippySummary: "这是雷恩大都市区的三维空间工程！面对严控农地新增开发的 ZAN 法案，Marceau 开发了一套基于 50cm LiDAR 点云的栅格代数算法。全面扫描了 20.8 万栋建筑，成功筛选出 33,304 处可垂直增建一层的理想屋顶。",
    slug: "rennes-foncier-sig"
  }
];
