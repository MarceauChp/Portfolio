import type { SkillsData } from '../../types';

export const skillsDataJa: SkillsData = {
  categories: [
    {
      id: "stats",
      title: "高度統計解析 ＆ プログラミング",
      subtitle: "厳密な空間モデリング、多変量解析、データエンジニアリング言語",
      accent: "cyan",
      items: [
        {
          name: "多変量統計解析",
          level: "エキスパート",
          highlight: true,
          description: "主成分分析（PCA）、階層的クラスター分析（HCA）、多重対応分析（MCA）、対応分析（CA）、単回帰および重回帰分析。空間データセットに対する探索的・要約的解析。"
        },
        {
          name: "GLMM 混合モデル",
          level: "上級",
          highlight: true,
          description: "R（lme4）による一般化線形混合モデル。55,758戸の公営住宅データを対象に、自治体ランダム効果を組み込んだロジスティック回帰を実装（ICC算出、尤度比検定、変数減少法）。"
        },
        {
          name: "R言語",
          level: "上級",
          highlight: false,
          description: "データクレンジング、空間統計、空間結合アルゴリズム、学術論文品質の可視化チャート作成における中心的な研究開発環境。"
        },
        {
          name: "Python",
          level: "中級",
          highlight: false,
          description: "地理空間データの前処理、ベクター・ラスター一括バッチ処理、API連携、ワークフロー自動化スクリプトの開発。"
        },
        {
          name: "SQL",
          level: "中級",
          highlight: false,
          description: "リレーショナルデータベース検索、空間集計、複雑なテーブル結合、インデックス最適化、大規模空間テーブルの処理高速化。"
        }
      ]
    },
    {
      id: "sig",
      title: "GIS、リモートセンシング ＆ カルトグラフィ",
      subtitle: "空間データエンジニアリング、地球観測、3D解析、インタラクティブWeb-GIS地図。",
      accent: "emerald",
      items: [
        {
          name: "QGIS",
          level: "エキスパート",
          highlight: true,
          description: "GIS業務の基幹ワークステーション。高度空間分析、ラスターマップ代数、Model Builderによる自動化、ローカル気候帯（LCZ）モデリング、ネットワーク経路探索。"
        },
        {
          name: "地図表現法・グラフィック",
          level: "エキスパート",
          highlight: true,
          description: "QGISでのレイアウト構成に加え、Inkscapeを用いたベクター仕上げ、Flourishを用いた対話型データビジュアライゼーション。"
        },
        {
          name: "衛星リモートセンシング",
          level: "上級",
          highlight: true,
          description: "QGISとRを用いたLandsat 8衛星画像処理、分光指標算出（NDVI、NDBI）、地表面温度（LST）導出、教師あり分類。"
        },
        {
          name: "ArcGIS Pro",
          level: "上級",
          highlight: false,
          description: "空間解析ツールセットの運用、主題図作成、エンタープライズ標準に準拠した業務GISの構築。"
        },
        {
          name: "PostgreSQL / PostGIS",
          level: "中級",
          highlight: false,
          description: "PostGISデータベース管理、空間クエリ、座標参照系変換、空間インデックス、空間交差判定、処理パフォーマンスチューニング。"
        }
      ]
    }
  ],
  languages: [
    {
      lang: "フランス語",
      level: "母国語 (Native)",
      code: "FR"
    },
    {
      lang: "英語",
      level: "B2（学術・実務レベル）",
      description: "学術論文の読解、研究ペーパー執筆、国際的な技術共同作業。",
      code: "B2"
    }
  ],
  pipelineSteps: [
    {
      number: "01",
      title: "データ収集 ＆ 批判的評価",
      color: "emerald",
      icon: "Download",
      description: "初期フェーズでは、データ取得プロトコルの検証、標本バイアスの特定、品質チェックを実施します。",
      items: [
        "IGN（BD TOPO、LiDAR HD高密度点群、OCS土地被覆）",
        "INSEE（Filosofi 200mメッシュ ＆ 国勢調査表）",
        "USGS / NASA（Landsat 8衛星ミッション）",
        "DVF（不動産取引価格）、土地台帳 ＆ 自治体オープンデータ"
      ]
    },
    {
      number: "02",
      title: "データ処理 ＆ 地理空間モデリング",
      color: "cyan",
      icon: "Cpu",
      description: "第2フェーズでは、プロジェクトの規模とアルゴリズム要件に応じた最適な処理基盤を選定します。",
      items: [
        "R : 高度統計モデリング ＆ 空間結合アルゴリズム",
        "PostGIS : 空間データベース設計 ＆ インデックス",
        "QGIS : 複合空間処理 ＆ 道路網経路解析",
        "Python : バッチタスク自動化 ＆ パイプライン連携"
      ]
    },
    {
      number: "03",
      title: "成果還元 ＆ 方法論の考察",
      color: "violet",
      icon: "MapPin",
      description: "明瞭な地図デザイン、実効的な意思決定支援レポート、方法論的限界の率直な検証により分析の価値を最大化します。",
      items: [
        "主題図作成 : QGIS ＆ Inkscape",
        "政策・事業決定支援型の地域診断レポート",
        "対話型Webマップによる空間可視化",
        "再現可能な科学研究 ＆ コードドキュメント (GitHub)"
      ]
    }
  ]
};
