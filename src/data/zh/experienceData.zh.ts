import type { ExperienceItem } from '../../types';

export const experienceDataZh: ExperienceItem[] = [
  {
    id: "m1-geodata",
    period: "2026-2027",
    status: "在读",
    isCurrent: true,
    title: "地理信息科学与空间数据科学 硕士一年级 (M1)",
    institution: "GeoData Paris，居斯塔夫·埃菲尔大学（原 ENSG）",
    location: "巴黎大区（马恩河谷 Champs-sur-Marne）",
    description: "深入学习前沿空间数据科学、高级空间统计学、卫星对地观测解译，以及构建大规模、可复现自动化空间分析流水线的专业研究生课程。",
    badges: [
      { text: "空间数据科学", color: "yellow" },
      { text: "在读", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "stage-cedre",
    period: "2026年6月 - 9月",
    status: "研发实习",
    isCurrent: false,
    title: "研发工程师助理：南法夜间光污染空间建模",
    institution: "CEDRE",
    location: "阿莱斯 (加尔省)",
    description: "夜间光污染空间分析与预测建模的研发实习。量化光污染对地方财政造成的电力经济损失，构建街道照明需求的多准则评估模型。所开发的空间分析框架已成功产品化，作为决策支持平台向各地政府推广应用。",
    badges: [
      { text: "科研与开发 (R&D)", color: "emerald" },
      { text: "光污染空间建模", color: "muted" }
    ],
    accent: "emerald"
  },
  {
    id: "m1-geoter",
    period: "2025-2026",
    status: "已毕业 (第一名)",
    isCurrent: false,
    title: "地理信息学与区域项目管理 硕士一年级 (GEOTER)",
    institution: "阿维尼翁大学",
    location: "阿维尼翁",
    description: "融合定量空间分析、区域诊断与项目管理能力的跨学科培养。主导两大重点研究：一是阿维尼翁市政府历史文化遗产GIS数据库升级项目；二是解析马赛大都市区公共住房供给空间分布的计量经济实证硕士论文。",
    badges: [
      { text: "专业第一名 (Top of Class)", color: "red" },
      { text: "优秀评级 (Mention Bien)", color: "emerald" },
      { text: "班级学生代表", color: "yellow" }
    ],
    accent: "emerald"
  },
  {
    id: "asso-bang",
    period: "2025-2026",
    status: "社团联合主席",
    isCurrent: false,
    title: "BANG 学生非营利组织联合主席",
    institution: "阿维尼翁大学",
    location: "阿维尼翁",
    description: "担任2025-2026学年大学注册非营利学生组织联合主席。统筹青年公益活动、管理财务预算并协调校际合作项目。",
    badges: [
      { text: "青年领导力", color: "yellow" },
      { text: "联合主席", color: "emerald" }
    ],
    accent: "muted"
  },
  {
    id: "stage-espace",
    period: "2025",
    status: "学术科研实习",
    isCurrent: false,
    title: "科研实习生：公共住房空间与计量经济建模",
    institution: "法国国家科学研究中心 (CNRS) UMR 7300 ESPACE 联合实验室 / 阿维尼翁大学",
    location: "阿维尼翁",
    description: "马赛大都市区保障性住房空间与计量经济分析研究实习。整合国家公共住房登记册(RPLS)、法国国家统计局200米人口普查网格(Filosofi)与国家地形底图的高精度地理数据库。",
    badges: [
      { text: "学术研究", color: "yellow" },
      { text: "CNRS国家实验室", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "licence-geo",
    period: "2022-2025",
    status: "学士毕业",
    isCurrent: false,
    title: "地理学与国土空间规划学士 (B.Sc.)",
    institution: "阿维尼翁大学",
    location: "阿维尼翁",
    description: "打下坚实的自然与人文地理学理论基础，从本科大一开始专修GIS空间信息技术，并在大二和大三深化多变量统计与空间建模。主导了雷恩大都市区三维垂直增建潜力分析和大阿维尼翁都市区气候诊断等重大课程设计。",
    badges: [
      { text: "GIS与统计专业第一名", color: "red" },
      { text: "优等毕业", color: "emerald" },
      { text: "班级代表", color: "yellow" }
    ],
    accent: "red"
  }
];
