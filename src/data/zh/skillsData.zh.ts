import type { SkillsData } from '../../types';

export const skillsDataZh: SkillsData = {
  categories: [
    {
      id: "stats",
      title: "高级统计学与数据科学编程",
      subtitle: "严谨的空间建模、多元统计方法与数据工程语言",
      accent: "cyan",
      items: [
        {
          name: "多元统计分析",
          level: "精通",
          highlight: true,
          description: "主成分分析 (PCA)、系统聚类 (HCA)、多重对应分析 (MCA)、对应分析 (CA)、简单及多元线性回归。针对地理空间大数据集的探索性与降维分析方法。"
        },
        {
          name: "GLMM 混合效应模型",
          level: "高级",
          highlight: true,
          description: "基于 R 语言 (lme4) 的广义线性混合效应模型。在 55,758 套公共住房数据上构建纳入市镇随机截距的 Logistic 混合模型（计算组内相关系数 ICC、似然比检验及向后逐步回归法）。"
        },
        {
          name: "R 语言",
          level: "高级",
          highlight: false,
          description: "核心科研开发环境，用于数据清洗、高级空间统计学、空间拓扑连接算法以及学术发表级图表绘制。"
        },
        {
          name: "Python",
          level: "中级",
          highlight: false,
          description: "编写地理空间数据预处理脚本、矢量与栅格批量计算、API 接口调用及自动化处理流水线。"
        },
        {
          name: "SQL",
          level: "中级",
          highlight: false,
          description: "关系型数据库查询、空间统计聚合、多表复杂连接、空间索引构建及大规模空间表格查询性能调优。"
        }
      ]
    },
    {
      id: "sig",
      title: "GIS、卫星遥感与制图学",
      subtitle: "高级地理空间数据工程、对地观测解译、三维空间建模与交互式 Web-GIS。",
      accent: "emerald",
      items: [
        {
          name: "QGIS",
          level: "精通",
          highlight: true,
          description: "核心 GIS 工程工作站。高级空间运算、栅格地图代数、Model Builder 自动化流水线构建、局地气候区 (LCZ) 建模及路网拓扑分析。"
        },
        {
          name: "地图符号学与版面制图",
          level: "精通",
          highlight: true,
          description: "精通 QGIS 制图版面设计，熟练运用 Inkscape 进行矢量地图后期精修，并使用 Flourish 制作动态交互式数据可视化。"
        },
        {
          name: "卫星遥感影像处理",
          level: "高级",
          highlight: true,
          description: "基于 QGIS 与 R 语言处理 Landsat 8 等多光谱遥感影像，计算光谱指数 (NDVI、NDBI)，反演地表温度 (LST) 及监督分类。"
        },
        {
          name: "ArcGIS Pro",
          level: "高级",
          highlight: false,
          description: "熟练运用空间分析工具箱、专题地图制作与符合企业工程标准的企业级 GIS 应用交付。"
        },
        {
          name: "PostgreSQL / PostGIS",
          level: "中级",
          highlight: false,
          description: "PostGIS 空间数据库管理，空间 SQL 查询、坐标参考系转换、空间索引优化与复杂拓扑求交计算。"
        }
      ]
    }
  ],
  languages: [
    {
      lang: "法语",
      level: "母语 (Native)",
      code: "FR"
    },
    {
      lang: "英语",
      level: "B2 等级 (学术与专业工作能力)",
      description: "熟练阅读国际学术文献、撰写英文科研论文及参与国际技术合作。",
      code: "B2"
    }
  ],
  pipelineSteps: [
    {
      number: "01",
      title: "数据溯源与批判性校验",
      color: "emerald",
      icon: "Download",
      description: "首要阶段专注于数据获取、评估抽样方案规范性、识别潜在样本偏差并完成严格质检。",
      items: [
        "法国国家地理院 IGN (BD TOPO, LiDAR HD 高精点云, OCS 土地利用覆盖)",
        "法国国家统计局 INSEE (Filosofi 200米人口普查网格)",
        "USGS / NASA (Landsat 8 陆地卫星对地观测)",
        "DVF 不动产真实成交税务库、地籍图及政府开放空间数据"
      ]
    },
    {
      number: "02",
      title: "数据运算与地理空间建模",
      color: "cyan",
      icon: "Cpu",
      description: "第二阶段根据项目尺度、算法复杂度与算力限制，选定最优计算框架与空间算法组合。",
      items: [
        "R : 高级混合效应模型与多尺度空间连接",
        "PostGIS : 空间数据库建模与索引调优",
        "QGIS : 复杂空间拓扑分析与路网最短路径算法",
        "Python : 批处理任务自动化与全流程流水线"
      ]
    },
    {
      number: "03",
      title: "成果呈现与方法论反思",
      color: "violet",
      icon: "MapPin",
      description: "通过精致的专题地图设计、务实的辅助决策报告与坦诚的方法论边界讨论，实现科研成果价值最大化。",
      items: [
        "专题制图表达 : QGIS 与 Inkscape 精修",
        "辅助决策型区域空间诊断报告",
        "交互式 Web-GIS 动态地图发布",
        "可复现科学研究与代码规范文档 (GitHub)"
      ]
    }
  ]
};
