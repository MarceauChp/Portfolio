import type { Project } from '../../types';

export const projectsDataZh: Project[] = [
  {
    id: "memoire-vefa",
    slug: "memoire-vefa",
    title: "普罗旺斯地区艾克斯-马赛大都会区公共住房供给方式的空间计量经济学分析",
    shortTitle: "VEFA开发模式与公共住房空间重组",
    category: "Recherche M1",
    statusBadge: "M1硕士论文",
    statusText: "阿维尼翁大学 GéoTer 硕士一年级科研论文 · 2025/2026",
    statusColor: "violet",
    thumbnail: "/assets/img/projet_vefa.png",
    subtitle: "深入研究在法国第二大都会区中，将公共保障房建设外包给私营开发商的预售模式（VEFA）如何重塑公共住房的空间分布。通过对近 55,800 套住房数据构建广义线性混合效应模型（GLMM）展开实证剖析。",
    excerpt: "公共住房供给主体从传统公营建设向私营开发商楼花预售（VEFA）的结构性转变，深刻改变了保障房的微观区位。在马赛大都会区，纳入市镇随机截距的 Logistic GLMM 模型揭示出组内相关系数（ICC）高达 73.4%：市镇行政边界与地方政治偏好对是否依赖私营开发商具有绝对支配力，其影响远超单纯的房地产市场价格机制。",
    tags: ["R", "GLMM", "QGIS", "Filosofi INSEE", "BD TOPO IGN", "RPLS"],
    summaryFooter: "55个市镇 | ICC = 73.4% | 分析 55,758 套住房",
    meta: [
      { label: "研究阶段", value: "硕士一年级论文: 2025-2026" },
      { label: "学术成绩", value: "专业第一名 / 优秀评级 (Mention Bien)" },
      { label: "研究范围", value: "马赛大都会区 (55个市镇)" },
      { label: "中核方法", value: "GLMM 混合模型 / R语言", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Memoire_M1GEOTER_Marceau_Chapon.pdf",
      github: "https://github.com/MarceauChp/Memoire_M1GEOTER"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "研究议题与核心假设",
        content: [
          "法国公共保障性住房领域正经历深刻的结构性转变：从传统的公营住房机构自主开发建设，转向直接向私营地产开发商收购在建楼盘（即 VEFA 模式）。2007年以前该模式在法国占比微乎其微，而如今已占据全国每年新增公共住房的30%至50%。将建设行为外包给追求利润最大化的私营资本，是否会导致公共住房的空间分布发生偏离？",
          "我在硕士一年的实地调研中验证了这一直觉：私营开发商交付的保障房往往集中在特定街区，其建筑形态与公营直接建设的项目截然不同。本研究提出了两大假说：“市镇效应”（各市镇市长的规划许可与政治过滤）与“市场效应”（开发商倾向于将保障房配建份额安置在低地价地块以保全私有住房利润）。",
          "研究选定马赛大都会区（55个市镇）作为案例地。该区域呈现出显著的空间异质性：各市镇城市规划方针高度分化，住房市场极化严重，法定保障房指标（SRU 法案）落实情况参差不齐。"
        ],
        callout: {
          icon: "📐",
          title: "理论分析框架",
          text: "去商品化与再商品化理论 (Esping-Andersen)、城市增长机器论 (Logan & Molotch 1987)、城市政体理论 (Stone 1993)、空间正义 (Harvey, Soja) 与居住空间分异模型 (Lelévrier, Epstein)。"
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "数据工程与空间处理流程",
        content: [
          "实证数据库整合了法国国家公共住房登记册 (RPLS 2025)、法国统计局200米人口普查网格 (Filosofi 2021)、IGN 国家地形底图以及国家建筑数据库 (BDNB)。经过时间段筛选 (2000-2024)、空间地理编码校验并剔除保障房存量少于20套的边际市镇后，最终建模样本包含 55,758 套公共住房（直接建设占 74.7%，VEFA 占 25.3%）。",
          "为多尺度刻画邻里环境，基于 R 语言空间求交算法构建了 500 米（微观步行圈）和 2,000 米（宏观生活圈）的双尺度同心圆缓冲区指标。从 DVF 税务交易库中提取统计区（IRIS）中位数房价。最终汇总了 40 个标准化变量输入模型。",
          "由于住房数据嵌套在 55 个市镇行政单元内部，传统二元 Logistic 回归会违反观测独立性假定。本研究使用 R 语言 lme4 包构建了纳入市镇随机截距的广义线性混合效应模型（GLMM），并执行了双变量共线性排查、方差膨胀因子裁剪 (VIF < 5) 及基于似然比检验 (LRT) 的向后逐步回归筛选。"
        ],
        codeSnippet: {
          lang: "R",
          title: "Logistic GLMM 模型代码规范 (R / lme4)",
          code: `# 广义线性混合效应模型 (GLMM)
# 因变量: vefa_bin (1 = 私营预售收购 VEFA, 0 = 公营直接投资建设)

library(lme4)
library(performance)

mod_glmm <- glmer(
  vefa_bin ~
    scale(prix_median_iris)     +  # 区域房地产中位数单价
    scale(taux_pauvrete_500m)   +  # 500米微观贫困率
    scale(taux_pauvrete_2000m)  +  # 2000米宏观贫困率
    scale(deficit_sru)          +  # 市镇法定保障房缺口率
    scale(dist_transport_m)     +  # 距公共交通站点距离
    (1 | code_commune),            # 市镇随机截距项
  data   = df_vefa,
  family = binomial(link = "logit")
)

# 组内相关系数 ICC = 0.734 (73.4%)
icc(mod_glmm)`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "实证结果与核心发现",
        content: [
          "最重大的实证发现是组内相关系数（ICC）：供给模式总方差的 73.4% 归因于市镇边界。Nakagawa 伪决定系数进一步证实了这一制度性支配地位：边际 R²（仅固定效应）仅为 0.059，而条件 R²（固定效应 + 市镇随机效应）高达 0.750，纯市镇制度层面的贡献率达到 69.1%。大都会区并非一体化的住房统筹体，而是 55 个市镇各自为政的制度拼贴。",
          "在固定效应方面，1990年以后的新建住宅区中 VEFA 的发生比高出 50%（OR = 1.50）。500米范围内的邻里贫困率呈正相关（OR = 1.32），印证了私营资本倾向于在低土地成本区域落子的市场逻辑。模型总体分类准确度达到 AUC = 0.8215。",
          "利用标准差椭圆的空间中心分析表明，在远郊次中心（如 Vitrolles、Éguilles），公营直建与私营代建保障房的空间分布重心相距达 1,000 至 1,800 米以上。"
        ],
        figure: {
          src: "/assets/img/projet_vefa.png",
          title: "图 1 : 基于 Logistic GLMM 估算的市镇随机效应空间分布",
          tag: "QGIS / BD TOPO IGN / RPLS",
          caption: "市镇随机截距分级设色图（对数发生比）。蓝色市镇表明其超越当地市场基础、强烈依赖私营开发商；橙色市镇则体现出对公营自主投资建设的制度坚持。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "方法论反思与政策建议",
        content: [
          "相关关系不等于因果关系：低收入社区中高密度的 VEFA 布局，可能部分反映了国家城市更新政策（PNRU）的政府主动干预，而非单纯是开发商的自发偏好。",
          "法国 SRU 法案仅对市镇整体保障房总量提出强制要求，未细化市镇内部的微观空间布局。市镇领导为达成考核指标将建设委托给私营市场，可能在客观上加剧微观层面的居住隔离。建立都市圈尺度的空间配建指导细则是破解这一困境的关键。"
        ]
      }
    ]
  },
  {
    id: "article-ipa",
    slug: "article-ipa",
    title: "数据匮乏环境下的空间可达性建模：空间可达性压力指数 (IPA)",
    shortTitle: "基于可达性压力指数（IPA）的空间不平等评价",
    category: "Recherche & Publication",
    statusBadge: "学术论文撰写中",
    statusText: "方法论研究与国际期刊论文准备中",
    statusColor: "cyan",
    thumbnail: "/assets/img/projet_ipa.png",
    subtitle: "在公共设施容量数据匮乏的情境下，开发了一套替代传统 2SFCA 模型的轻量化指标——空间可达性压力指数（IPA）。该模型有效刻画了出行距离阻力与目的地需求过载相互叠加的“空间双重惩罚”。",
    excerpt: "空间可达性压力指数（IPA）是评估公共服务空间配置不平等的稳健工具。它有效整合了真实路网拓扑摩擦（QNEAT3）、人口集水区竞争压力以及设施可替代性。以阿维尼翁 18-24 岁青年就学交通为案例进行了实证检验。",
    tags: ["R", "QNEAT3", "QGIS", "Road Network"],
    summaryFooter: "阿维尼翁 | 18-24岁青年群体 | 大学设施空间可达性",
    meta: [
      { label: "研究进展", value: "正准备投递同行评议期刊" },
      { label: "学科领域", value: "公共服务地理学与交通规划" },
      { label: "实证区域", value: "大阿维尼翁都市区" },
      { label: "核心算法", value: "QNEAT3 路网拓扑分析 + R语言" }
    ],
    links: {
      pdf: "/assets/pdf/Indice de Pression d'Accès (IPA), Marceau Chapon.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "研究问题与方法论挑战",
        content: [
          "在国际空间可达性研究中，两步移动搜寻法（2SFCA, Luo & Wang 2003）被广泛视为标准方法。然而该模型严格依赖于所有公共设施的准确接待容量数据。在地方行政实践中，这些数据往往高度缺失，极易导致分析失真并加大决策鸿沟。",
          "为此，我设计了空间可达性压力指数（IPA）作为透明且简约的替代方案。模型基于真实路网拓扑将需求确定性分配至最近的枢纽，直观捕捉空间距离阻碍与目的地承载过载叠加的双重不平等风险。"
        ],
        callout: {
          icon: "📐",
          title: "IPA 指数数学公式",
          text: "IPA = (M × DR) × (NB_M / NB_INF) [M: 出发单元目标人口, DR: 真实路网拓扑最短距离, NB_M: 竞争同一设施的总人口, NB_INF: 等效目的设施数量]。"
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "路网拓扑分析与数据处理",
        content: [
          "使用 QGIS QNEAT3 插件执行高精路网拓扑路径规划，并在 R 语言中实现指标标准化与概率分布拟合。空间底图采用法国 IGN BD TOPO 道路网，并赋以交叉口转弯阻抗与步行/骑行摩擦系数。",
          "出发点数据提取自 INSEE 200米人口普查网格中的 18-24 岁青年群体。"
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "实证结果与空间格局",
        content: [
          "分析揭示出显著的空间极化：远郊边缘地区承受着严峻的“双重惩罚”，即漫长的出行距离与落后的设施容量双重叠加。相反，中心城区凭借公共交通的高度冗余，即使人口密度极高，其 IPA 压力指数依然保持在低位。",
          "相比传统缓冲区模型，该指数对边界效应的敏感度显著更低，地方政府可在无需昂贵私营容量审计的前提下直接部署应用。"
        ]
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "讨论与应用前景",
        content: [
          "模型假定人们严格选择最近的设施；对于具有选择弹性的商业设施，可进一步拓展引入重力概率选择机制。",
          "该工具为预算紧缩背景下的公共设施科学合理布局提供了高性价比的量化诊断手段。"
        ]
      }
    ]
  },
  {
    id: "grand-avignon-climat",
    slug: "grand-avignon-climat",
    title: "大阿维尼翁都市区（16个市镇）城市热岛效应与热脆弱性综合诊断",
    shortTitle: "城市过热、清凉绿道与气候适应性治理",
    category: "Commande publique",
    statusBadge: "公共咨询课题（本科大三）",
    statusText: "政府委托研究报告（共164页）| 大阿维尼翁城市社区 | 2024-2025",
    statusColor: "emerald",
    thumbnail: "/assets/img/projet_chaleur.png",
    subtitle: "担任技术与 GIS 负责人，主导了覆盖 16 个市镇、长达 164 页的气候诊断课题。项目融合了 Landsat 8 地表温度（LST）反演、50米分辨率局地气候区（LCZ）分类、多变量脆弱性聚类建模，以及 120 个微气候传感器的布网规划。",
    excerpt: "根据法国国家气候适应计划（PNACC-3），大阿维尼翁委托开展全域热环境诊断。通过结合 Landsat 8 多时相卫星热红外遥感与 LCZ 气候分类，查明商业仓储物流区聚集了累积热岛面积的 72.1%。最终绘制了 130 处清凉庇护绿道，并完成了 120 个 IoT 微气候监测节点的布局方案。",
    tags: ["Landsat 8", "LCZ", "QGIS Model Builder", "PostGIS", "PCA/HCA", "IoT Network"],
    summaryFooter: "16个市镇 | 164页研究报告 | 120个IoT微气候传感器 | 50米LCZ",
    meta: [
      { label: "课题性质", value: "政府委托课题 (164页) | 2024-2025" },
      { label: "委托方", value: "大阿维尼翁都市区城市社区" },
      { label: "区域范围", value: "16个市镇 (沃克吕兹省与加尔省)" },
      { label: "核心方法", value: "Landsat / LCZ / PCA-HCA / PostGIS", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/La surchauffe urbaine dans le Grand Avignon, entre îlots de fraîcheur et prévention.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "研究背景与工作目标",
        content: [
          "响应法国国家应对气候变暖战略（适应+4℃情景），大阿维尼翁都市区委托开展了全域热环境实操诊断。该地区地处地中海气候区，常年饱受夏季极端热浪与严峻干旱困扰，RCP 8.5 气候情景预测到 2100 年该地每年热带夜天数将超过 50 天。",
          "我担任 GIS 与空间建模小组负责人：负责构建 PostgreSQL/PostGIS 空间数据库、使用 QGIS Model Builder 开发自动化数据处理流程、执行 LCZ 气候建模并编制全套地图集。"
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "卫星遥感反演与数据处理流水线",
        content: [
          "处理了 Landsat 8 TIRS 热红外波段（第10波段），覆盖 1990、2001、2010 年夏季及近年极端热浪事件（2019-2024）。数据显示 1990 至 2010 年间平均地表温度上升了 2.5℃，近年热浪期间建成区平均地表温度高达 36.9℃。",
          "依据 Stewart & Oke 规范构建了 50 米分辨率的局地气候区（LCZ）。在 200 米人口格网尺度上运用主成分分析（PCA）与 Ward 层次系统聚类（HCA），精准锁定了 46 个叠加了低收入、老龄化与建筑高能耗的极高脆弱性网格。"
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "核心发现与实际落地成效",
        content: [
          "最重大的反直觉发现：大型商业购物中心与物流园区（如 Mistral 7、Le Pontet）按数量计仅占热岛的 31.2%，但却聚集了 72.1% 的热岛累积面积（12.08 平方公里）。大面积暗色平屋顶与无遮阴露天沥青停车场是最关键的治理靶点。",
          "狭窄的古城历史街区白天受街道阴影庇护地表温度受控，但在夜间具有明显的滞热效应。项目标注了 500 米可达的 130 处清凉绿道，并设计了连通罗讷河至城区的通风廊道。",
          "课题提出了 120 个温湿度 IoT 传感器分 6 批次布网方案，以及针对超过 1,500 平方米商业停车场强制加装光伏遮阳棚等规划管理要求，已被都市区法定总体规划（PLUi-H 2025-2030）正式采纳。"
        ],
        figure: {
          src: "/assets/img/projet_chaleur.png",
          title: "图 1 : 地表温度（LST）反演与热岛分区分类图",
          tag: "Landsat 8 / QGIS Model Builder / PostGIS",
          caption: "夏季地表温度空间分布。红/橙色代表严重过热热点（商业物流带），绿/青色代表沿罗讷河与迪朗斯河延伸的冷岛降温走廊。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "遥感局限性与实务考虑",
        content: [
          "卫星遥感反演的辐射地表温度（LST）并不完全等同于行人所感知的 2 米近地表气温。搭建地面 IoT 微气候物联感知网络正是为了弥合这一尺度鸿沟。"
        ]
      }
    ]
  },
  {
    id: "rennes-foncier-sig",
    slug: "rennes-foncier-sig",
    title: "雷恩大都会区三维垂直增建潜力与土地循环利用空间建模",
    shortTitle: "面向存量土地紧凑利用的三维建筑垂直增建潜力建模",
    category: "Modélisation & 3D",
    statusBadge: "本科毕业设计 (L3)",
    statusText: "GIS工程毕业设计课题 | 阿维尼翁大学 | 2025",
    statusColor: "muted",
    thumbnail: "/assets/img/projet_rennes.png",
    subtitle: "担任技术与方法论负责人，构建基于高分辨率（1米）栅格地图代数的建筑屋顶垂直加层自动识别模型。在法国《净零土地人工化法》(ZAN) 及法定规划限高约束下，对雷恩大都会区 208,351 栋建筑进行了全域定量评估。",
    excerpt: "面对新增住房刚需（每年5,000套）与 2030 年建设用地新增减半（ZAN法案）的尖锐矛盾，本课题构建了一套立体式存量用地挖潜模型：空中垂直加层（识别出 33,304 栋适宜增建建筑，释放 22 平方公里建筑容量）与地面存量循环（27 平方公里高潜力用地）。",
    tags: ["50cm DSM/DTM", "PLUi", "ZAN Law", "Spatial SQL"],
    summaryFooter: "雷恩大都会区 | 三维GIS空间建模 | 流程自动化 | ZAN净零法案",
    meta: [
      { label: "课题阶段", value: "大三毕业设计 | 2025" },
      { label: "专业背景", value: "地理学与地理信息科学学士" },
      { label: "研究范围", value: "雷恩大都会区 | 43个市镇" },
      { label: "数据精度", value: "LiDAR 50cm / 1米栅格", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Devoir maison SIG, Rennes Métropole, Alexi, Gwendoline, Hugo, Marceau.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "高密度紧凑城市困境与空中土地红利",
        content: [
          "法国《气候与韧性法案》(2021) 明确要求到 2030 年将土地开发速度减半，并在 2050 年前实现净零土地人工化 (ZAN)。在雷恩这样人口持续流入的区域中心城市，向外蔓延占用农田的发展路径已难以为继。",
          "破局之道在于盘活“隐形空中土地”：在符合城市法定规划限高 (PLUi) 的前提下对既有建筑实施屋顶加层。我设计了一套自动化空间算法，全面扫描了雷恩大都会区 43 个市镇全部 20.8 万栋建筑。"
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "三维高程工程与栅格地图代数",
        content: [
          "融合处理了法国 IGN 提供的 50cm 高精数字表面模型 (DSM) 与数字高程模型 (DTM)，并在统一坐标系下重采样至 1米分辨率。将规划限高栅格化后进行矩阵差分运算，精确提取建筑净高并筛除车库等低矮附属物（低于4米排除）。"
        ],
        codeSnippet: {
          lang: "QGIS",
          title: "栅格计算器表达式 (CC48判定)",
          code: `# 1. 建筑净高度提取
building_height = ( "DSM@1" - "DTM@1" )

# 2. 占规划法定最高限高比例
CC48 = building_height / "H_max_PLUi@1"

# 3. 多准则适宜加层屋顶筛选掩模
# - CC48 < 0.75 (至少预留出一层完整使用高度)
# - building_height > 4米 (剔除单层车库与杂物间)
# - 严格剔除农业保护区与自然保护区
eligible = (CC48 < 0.75) AND (building_height > 4)
           AND ("PLUi_Zone@1" NOT IN (1, 2))`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "空间量化结果与优先级分级",
        content: [
          "算法在雷恩大都会区共识别出 33,304 栋适宜加层的建筑。在不侵占任何一平方米农田的前提下，理论上可满足约 23,000 套新住房的空间需求。",
          "结合公交站点可达性、商业服务配套与历史遗产风貌保护区等综合条件进行多准则分级，筛选出 14,065 栋最高优先级建筑。仅这部分建筑即可覆盖雷恩大都会区到 2030 年规划住房目标的 60%。"
        ],
        figure: {
          src: "/assets/img/projet_rennes.png",
          title: "图 1 : 三维城市模型中垂直增建潜力建筑的可视化",
          tag: "LiDAR HD / QGIS 3D / EPSG 3948",
          caption: "三维透视渲染图。青色为规划高度充裕、适宜加层的建筑，橙色为受历史保护或远离交通站点的受限建筑。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "工程局限性与实务展望",
        content: [
          "1米栅格分辨率在复杂坡屋顶或局部烟囱处有一定平滑效应，对于小于 50 平方米的地块需要地籍人工复核；建筑结构的实际承重荷载和业主共有产权决议是实际动工前的后续关键环节。"
        ]
      }
    ]
  }
];
