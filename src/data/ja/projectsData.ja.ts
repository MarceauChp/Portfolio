import type { Project } from '../../types';

export const projectsDataJa: Project[] = [
  {
    id: "memoire-vefa",
    slug: "memoire-vefa",
    title: "エクス＝マルセイユ＝プロヴァンス都市圏における公営住宅供給方式の空間計量経済分析",
    shortTitle: "VEFA方式と公営住宅の空間動態",
    category: "Recherche M1",
    statusBadge: "M1修士論文",
    statusText: "アヴィニョン大学 GéoTer 修士1年研究論文 · 2025/2026",
    statusColor: "violet",
    thumbnail: "/assets/img/projet_vefa.png",
    subtitle: "フランス第2の都市圏において、VEFA（青田買い民間委託方式）を通じた公営住宅の民間依存が空間的配置をいかに再編しているかを、55,758戸の住宅データと一般化線形混合モデル（GLMM）により解明。",
    excerpt: "公営住宅供給における直接事業主から民間デベロッパーへの依存拡大は、住宅の空間的配置を構造的に変容させています。エクス＝マルセイユ都市圏において自治体ランダム効果を考慮したGLMMロジスティック回帰を適用した結果、級内相関係数（ICC）は73.4%に達し、不動産相場以上に自治体の政治的境界が民間委託率を決定づけていることが判明しました。",
    tags: ["R", "GLMM", "QGIS", "Filosofi INSEE", "BD TOPO IGN", "RPLS"],
    summaryFooter: "55自治体 | ICC = 73.4% | 55,758戸を解析",
    meta: [
      { label: "研究種別", value: "修士1年論文: 2025-2026" },
      { label: "成績", value: "首席修了・優秀賞 (Mention Bien)" },
      { label: "分析対象", value: "マルセイユ大都市圏 (55自治体)" },
      { label: "中核手法", value: "GLMM / R言語", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Memoire_M1GEOTER_Marceau_Chapon.pdf",
      github: "https://github.com/MarceauChp/Memoire_M1GEOTER"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "研究課題と仮説設定",
        content: [
          "フランスの公営住宅セクターは歴史的な構造転換期を迎えています。伝統的な公的直接建設から、民間不動産デベロッパーからの完成前買い取り（VEFA方式）への移行です。2007年以前はごくわずかだったVEFAは、現在新規公営住宅供給の30%〜50%を占めています。この民間委託は空間的正義の観点から深刻な問いを投げかけています。",
          "私の修士課程での現地調査から着想を得て仮説を立てました。VEFAによる公営住宅は、直接建設による物件とは異なる地区に、異なる建築形態で集中しているのではないか。検証すべき二大仮説として「自治体効果（各首長の政治的規制フィルター）」と「市場効果（デベロッパーが利潤確保のため低価格帯エリアへ誘導する傾向）」を設定しました。",
          "対象地域として55自治体からなるエクス＝マルセイユ＝プロヴァンス都市圏を選定しました。同地域は極めて強い空間的異質性を持ち、都市計画の方針や法定割当（SRU法）の履行状況が自治体間で大きく二極化しています。"
        ],
        callout: {
          icon: "📐",
          title: "理論的枠組み",
          text: "脱商品化 vs 商品化理論（Esping-Andersen）、成長マシーン論（Logan & Molotch 1987）、都市レジーム論（Stone 1993）、空間的正義（Harvey, Soja）、および居住分異モデル（Lelévrier, Epstein）。"
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "空間データエンジニアリングと処理工程",
        content: [
          "実証データとして、フランス公営住宅台帳（RPLS 2025）、INSEEの国勢調査200mメッシュ（Filosofi 2021）、IGN地形データ、国立建築物DB（BDNB）を統合。年代フィルタリングとジオコーディング検証を経て、最終サンプルは55,758戸（直接建設74.7%、VEFA 25.3%）となりました。",
          "空間環境を多重スケールで評価するため、R言語での反復空間交差により同心円バッファ500m（徒歩圏・近隣）および2,000m（生活圏）の文脈変数を算出。不動産取引価格はDVF税務DBを統計区（IRIS）単位で集計しました。合計40の標準化変数をモデルに投入しました。",
          "各住宅データが55の基礎自治体に階層的にネストされているため、通常のロジスティック回帰では観測の独立性仮定に反します。そこでlme4パッケージを用い、自治体ランダム切片を組み込んだ一般化線形混合モデル（GLMM）を構築しました。"
        ],
        table: {
          title: "使用した地理空間データセット",
          headers: ["データソース", "提供機関", "分析上の役割", "空間解像度"],
          rows: [
            ["RPLS 2025", "住宅省 (DHUP)", "従属変数（VEFA = 1 / 直接 = 0）", "建築物住所"],
            ["BD TOPO®", "国立地理情報院 (IGN)", "ジオコーディングと空間結合", "建物ポリゴン"],
            ["Filosofi 200m", "国立統計経済研究所 (INSEE)", "多重スケール社会経済指標", "200mグリッド"],
            ["DVF 不動産価格", "財務総局 (DGFIP)", "中古・新築平米単価中央値", "取引地点 / IRIS区"],
            ["SRU法定在庫", "県庁 / 住宅省", "自治体の公営住宅不足数", "市町村単位"],
            ["BDNB", "建築技術評価センター (Cerema)", "建物の物理的形態・エネルギー性能", "建物フットプリント"]
          ]
        },
        codeSnippet: {
          lang: "R",
          title: "GLMMモデル仕様コード (R / lme4)",
          code: `# 一般化線形混合モデル (GLMM)
# 従属変数: vefa_bin (1 = VEFA民間買い取り, 0 = 公的直接建設)

library(lme4)
library(performance)

mod_glmm <- glmer(
  vefa_bin ~
    scale(prix_median_iris)     +  # 地区不動産価格
    scale(taux_pauvrete_500m)   +  # 近隣500m貧困率
    scale(taux_pauvrete_2000m)  +  # 生活圏2000m貧困率
    scale(deficit_sru)          +  # 自治体SRU不足率
    scale(dist_transport_m)     +  # 最寄公共交通距離
    (1 | code_commune),            # 自治体ランダム切片
  data   = df_vefa,
  family = binomial(link = "logit")
)

# 級内相関係数 ICC = 0.734 (73.4%)
icc(mod_glmm)`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "分析結果と実証的知見",
        content: [
          "最も決定的な発見は、級内相関係数（ICC）の高さです。調達方式の分散の73.4%が自治体境界に起因していました。中川の疑似決定係数でも、固定効果のみの周辺R²が0.059であるのに対し、ランダム切片を含む条件付きR²は0.750に達しました。純粋な自治体要因の寄与度は69.1%です。",
          "固定効果に関しては、1990年以降の住宅地区においてVEFAのオッズが50%高まる（OR = 1.50）一方、500m圏の貧困率も正の相関を示しました（OR = 1.32）。これはデベロッパーが安価な用地を求めていることを裏付けています。モデル全体の予測精度はAUC 0.8215を記録しました。",
          "標準偏差楕円を用いた重心分析では、郊外地域（Vitrolles、Éguillesなど）において直接建設とVEFAの供給重心が1,000〜1,800m以上乖離していることが明らかになりました。"
        ],
        figure: {
          src: "/assets/img/projet_vefa.png",
          title: "図1 : GLMMにより推定された自治体ランダム効果（対数オッズ）",
          tag: "QGIS / BD TOPO IGN / RPLS",
          caption: "自治体別ランダム切片の階級区分図。青色は市場条件を超えて民間VEFAを積極活用する自治体、橙色は公的直接建設を重視する自治体を示しています。"
        },
        oddsTable: {
          headers: ["説明変数", "オッズ比 (OR)", "95% 信頼区間", "p値", "地域的解釈"],
          rows: [
            ["1990年以降建設比率(500m)", "1.50", "-", "< 0.05", "新興住宅地ほどVEFAオッズが高い"],
            ["近隣貧困率(500m)", "1.32", "-", "< 0.05", "用地取得費の安価なエリアへの誘導"],
            ["25-39歳人口比率(2000m)", "1.27", "-", "< 0.05", "若年労働世帯の集積拠点"],
            ["公営住宅融資期間", "0.70", "-", "< 0.05", "VEFA物件は補助期間が短い傾向"],
            ["ひとり親世帯比率(500m)", "0.75", "-", "< 0.05", "脆弱世帯密集エリアの回避傾向"],
            ["(1 | 自治体コード)", "sigma² = 2.85", "ICC = 73.4%", "-", "自治体の制度的・政治的影響が圧倒的"]
          ]
        },
        infoBox: {
          type: "cyan",
          title: "査読付き学術論文の準備中",
          text: "本研究の成果は共著による国際学術論文として投稿準備中です。分析スクリプトとデータパイプラインはGitHubに完全公開されています。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "考察と政策的示唆",
        content: [
          "相関関係は必ずしも因果関係を意味しません。低所得地域でのVEFA集中は、都市再生指定区域（PNRU）における公的介入の反映である可能性も含まれます。",
          "また、フランスのSRU法は自治体全体の総量規制を課すのみで、自治体内部の空間配置までは規定していません。首長が数値目標を満たすためにデベロッパー任せにした結果、ミクロな居住分異が固定化されるリスクが示唆されます。"
        ],
        warningBox: {
          title: "分析スコープと限界",
          text: "本結論はエクス＝マルセイユ都市圏の55自治体において実証されたものです。他都市圏への無批判な一般化は生態学的誤謬のリスクを伴います。"
        }
      }
    ]
  },
  {
    id: "article-ipa",
    slug: "article-ipa",
    title: "データ制約環境における空間アクセシビリティ評価：アクセス圧力指数 (IPA)",
    shortTitle: "アクセス圧力指数（IPA）による到達性評価",
    category: "Recherche & Publication",
    statusBadge: "論文準備中",
    statusText: "方法論的空間研究 ＆ 学術論文投稿準備中",
    statusColor: "cyan",
    thumbnail: "/assets/img/projet_ipa.png",
    subtitle: "施設計画・定員データが存在しない環境において、公共サービスの地理的格差を測定するための実用的な代替指標「アクセス圧力指数（IPA）」を開発。道路網摩擦と人口集中が引き起こす「空間的二重格差」をモデル化。",
    excerpt: "施設定員データが不足する地域において、従来の2SFCAモデルに代わる頑健なアクセシビリティ評価指標としてIPAを考案。QNEAT3による実道路網トポロジー経路、人口集積による需要圧力、施設間競合を統合。アヴィニョンにおける学生（18-24歳）の大学アクセスにおいて実証しました。",
    tags: ["R", "QNEAT3", "QGIS", "Road Network"],
    summaryFooter: "アヴィニョン | 18-24歳 | 大学拠点アクセシビリティ",
    meta: [
      { label: "研究状況", value: "学術誌投稿に向け原稿執筆中" },
      { label: "研究領域", value: "公共施設配置・アクセシビリティ地理学" },
      { label: "対象地域", value: "グラン・アヴィニョン都市圏" },
      { label: "中核手法", value: "QNEAT3 ネットワーク解析 + R言語" }
    ],
    links: {
      pdf: "/assets/pdf/Indice de Pression d'Accès (IPA), Marceau Chapon.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "研究課題と方法論的挑戦",
        content: [
          "公共施設へのアクセシビリティ評価において、2ステップ浮動集水域法（2SFCA, Luo & Wang 2003）が国際的な標準とされています。しかし同モデルは、全施設の正確な受入定員データが利用可能であるという重い前提に基づいています。実務現場ではこうしたデータが存在しないことが多く、分析の信頼性を損なう要因となっていました。",
          "そこで私は、透明性が高く実用的な代替案として「アクセス圧力指数（IPA）」を考案しました。実道路網トポロジーに基づき最短施設へ需要を割り振ることで、移動距離の長大化と受け入れ先の需要過密が重複する「二重格差」を捕捉します。"
        ],
        callout: {
          icon: "📐",
          title: "IPAの数学的定式化",
          text: "IPA = (M × DR) × (NB_M / NB_INF) [M: 出発地メッシュ人口, DR: 実道路網最短移動距離, NB_M: 同一施設に依存する競合人口, NB_INF: 等価な目的施設の総数]。"
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "ネットワーク処理と空間エンジニアリング",
        content: [
          "QGISのQNEAT3拡張を用いてトポロジー道路網解析を実施し、R言語で指標の正規化と分布モデリングを行いました。IGN BD TOPO道路網に交差点制約と歩行・自転車摩擦係数を組み込んでいます。",
          "出発地にはINSEE 200mメッシュから学生層（18〜24歳）を抽出して適用しました。"
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "分析結果と空間パターン",
        content: [
          "郊外周辺部においてアクセス圧力が極端に高まる「二重格差」が顕著に確認されました。一方で都心部は公共交通網の冗長性により、人口密度が高いにもかかわらずIPA値が低く抑えられています。",
          "標準的な重力モデルやバッファ法と比較して境界効果への感度が著しく低く、自治体の現場で即時導入可能な指標となっています。"
        ]
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "考察と今後の展望",
        content: [
          "本モデルは最短施設への決定的経路選択を前提としています。選択制の高いサービス（商業・レジャー）に応用する場合は確率的選択モデルの導入が有効です。",
          "自治体が限られた予算の中で最適な公共サービス再配置を迅速に評価できるツールを提供します。"
        ]
      }
    ]
  },
  {
    id: "grand-avignon-climat",
    slug: "grand-avignon-climat",
    title: "グラン・アヴィニョン（16自治体）における都市ヒートアイランドと熱的脆弱性診断",
    shortTitle: "都市部過熱、クールアイランドと気候適応",
    category: "Commande publique",
    statusBadge: "公共受託研究（学部3年）",
    statusText: "公的委託研究報告書（全164頁）| グラン・アヴィニョン都市共同体 | 2024-2025",
    statusColor: "emerald",
    thumbnail: "/assets/img/projet_chaleur.png",
    subtitle: "技術・GIS責任者として、16自治体をカバーする164頁の気候診断を主導。Landsat 8衛星による地表面温度（LST）解析、50m解像度でのローカル気候帯（LCZ）分類、多変量社会脆弱性モデリング、および120台のIoT気候センサー網の配置計画を策定。",
    excerpt: "フランス国家気候適応計画（PNACC-3）に基づき、グラン・アヴィニョン都市共同体より委託された熱環境診断。多時期Landsat 8衛星熱画像とLCZモデリングを統合し、商業・工業地域が累積ヒートアイランド面積の72.1%を占めることを解明。130箇所のクールスポット特定と120台のIoTセンサー配置計画を策定しました。",
    tags: ["Landsat 8", "LCZ", "QGIS Model Builder", "PostGIS", "PCA/HCA", "IoT Network"],
    summaryFooter: "16自治体 | 164頁報告書 | 120台のIoTセンサー | 50m LCZ",
    meta: [
      { label: "事業種別", value: "公的受託研究 (164頁) | 2024-2025" },
      { label: "委託機関", value: "グラン・アヴィニョン都市共同体" },
      { label: "対象地域", value: "16自治体 (ヴォクリューズ・ガール県)" },
      { label: "主用手法", value: "Landsat / LCZ / PCA-HCA / PostGIS", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/La surchauffe urbaine dans le Grand Avignon, entre îlots de fraîcheur et prévention.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "背景と契約上の目標",
        content: [
          "フランス国家気候戦略PNACC-3（+4℃の世界）に基づき、グラン・アヴィニョン都市共同体より熱環境診断の委託を受けました。地中海性気候の猛暑と深刻な干ばつに見舞われる地域であり、2100年には年間50日以上の熱帯夜が予測されています。",
          "私はGISおよびモデリング部門の責任者として、PostGISデータベース構築、QGIS Model Builderによる自動化、LCZモデリング、地図アトラスの設計を統括しました。"
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "衛星画像解析と空間処理パイプライン",
        content: [
          "Landsat 8熱赤外バンド10（TIRS）を用い、1990年、2001年、2010年、および近年の猛暑期（2019-2024）を解析。平均地表面温度は1990年から2010年の間に+2.5℃上昇し、近年の猛暑日には市街地で平均36.9℃に達しました。",
          "LCZ分類（50m解像度）ではStewart & Okeの体系を採用。さらにINSEE 200mメッシュ上で主成分分析（PCA）とWard階層的クラスター分析（HCA）を行い、低所得・高齢者・断熱性の低い住宅が重複する46の極度熱的脆弱メッシュを特定しました。"
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "主要知見と具体的地域インパクト",
        content: [
          "極めて重要な知見として、商業・流通地域（Mistral 7、Le Pontetなど）がヒートアイランド総面積の72.1%（12.08 km²）を占めていることが判明しました。巨大な暗色陸屋根と無遮光のアスファルト駐車場が最大の改善対象となります。",
          "歴史的市街地は狭小な街路の日陰により昼間の表面温度は抑制されるものの、夜間に熱を閉じ込める特性を示しました。500m圏内でアクセス可能な130箇所のクールアイランドを特定し、ローヌ川から中心部へ風を通す風の道を設計しました。",
          "120台の温湿度IoTセンサーの6段階配置計画、1,500m²以上の商業駐車場に対する太陽光遮光キャノピー義務化などの提言が、都市圏総合都市計画（PLUi-H 2025-2030）に正式採用されました。"
        ],
        figure: {
          src: "/assets/img/projet_chaleur.png",
          title: "図1 : 地表面温度（LST）分布とヒートアイランド分類図",
          tag: "Landsat 8 / QGIS Model Builder / PostGIS",
          caption: "夏季地表面温度の空間分布。赤・橙色は重大なホットスポット（商業・物流地区）、緑・水色はローヌ川・デュランス川沿いの冷却回廊。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "衛星観測の限界と今後の課題",
        content: [
          "衛星が計測する放射地表面温度（LST）は、歩行者が体感する地上2mの気温とは直接一致しません。このギャップを埋めるため、実地IoTセンサー網の配置計画が不可欠でした。"
        ]
      }
    ]
  },
  {
    id: "rennes-foncier-sig",
    slug: "rennes-foncier-sig",
    title: "レンヌ都市圏における3D建物垂直増築と土地利用潜在力モデリング",
    shortTitle: "持続可能な都市密度のための3D垂直増築モデリング",
    category: "Modélisation & 3D",
    statusBadge: "学部卒業制作（L3）",
    statusText: "GIS工学卒業研究プロジェクト | アヴィニョン大学 | 2025",
    statusColor: "muted",
    thumbnail: "/assets/img/projet_rennes.png",
    subtitle: "技術・方法論責任者として、高解像度（1m）ラスタマップ代数を用いた建物垂直増築自動検出モデルを構築。フランス自然地不増加法（ZAN）と都市計画規制の下、レンヌ都市圏208,351棟の建物を解析。",
    excerpt: "住宅需要（年間5,000戸）と2030年までの土地消費半減（ZAN法）の相克に対し、既存建物の空中空間を活用する垂直増築（33,304棟、22 km²の床面積潜在力）と水平充填（27 km²）を両立するアルゴリズムを開発しました。",
    tags: ["50cm DSM/DTM", "PLUi", "ZAN Law", "Spatial SQL"],
    summaryFooter: "レンヌ都市圏 | 3D-GISモデリング | 自動化 | ZAN法",
    meta: [
      { label: "研究種別", value: "学部3年 卒業研究 | 2025" },
      { label: "専攻課程", value: "地理学・GIS情報科学 学士" },
      { label: "対象地域", value: "レンヌ都市圏 | 43自治体" },
      { label: "解像度", value: "LiDAR 50cm / 1m ラスタ", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Devoir maison SIG, Rennes Métropole, Alexi, Gwendoline, Hugo, Marceau.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "都市密度向上のジレンマと空中土地潜在力",
        content: [
          "フランス気候・回復力法（2021）は、2030年までに農地開発を半減し、2050年までに純人工化ゼロ（ZAN）を達成することを義務付けています。レンヌのような成長都市において、郊外への水平拡大はもはや不可能です。",
          "解決の鍵は「見えない空中土地」の活用です。各都市計画規則（PLUi）の上限高さまで増築可能な建物を自動検出するアルゴリズムを設計し、レンヌ都市圏43自治体（20万8千棟以上）を解析しました。"
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "3D標高データとラスタマップ代数",
        content: [
          "IGNのLiDAR HDによる数値表層モデル（DSM）と数値標高モデル（DTM）を1m解像度で結合処理。都市計画の規制高さエンベロープとラスタ差分演算を行うことで、1フロア（3m以上）の増築余力を持つ建物を自動抽出しました。"
        ],
        codeSnippet: {
          lang: "QGIS",
          title: "ラスタ計算機式 (CC48判定)",
          code: `# 1. 純建物高の抽出
building_height = ( "DSM@1" - "DTM@1" )

# 2. 規制上限高に対する比率
CC48 = building_height / "H_max_PLUi@1"

# 3. 多基準増築適格マスク
# - CC48 < 0.75 (少なくとも1フロア分の余力)
# - building_height > 4m (ガレージ等の除外)
# - 農業・自然保護地区の厳格除外
eligible = (CC48 < 0.75) AND (building_height > 4)
           AND ("PLUi_Zone@1" NOT IN (1, 2))`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "空間定量化と優先順位階層",
        content: [
          "アルゴリズムはレンヌ都市圏全体で33,304棟の適格建物を検出しました。これは農地を1平米も消費することなく約23,000戸の新築住宅を収容できる計算です。",
          "公共交通機関へのアクセス性や歴史的景観規制を組み合わせた多基準優先順位付けにより、最優先建物14,065棟を特定しました。これだけで2030年までの都市圏住宅目標の60%を充足可能です。"
        ],
        figure: {
          src: "/assets/img/projet_rennes.png",
          title: "図1 : 3D都市モデルにおける増築適格建物の可視化",
          tag: "LiDAR HD / QGIS 3D / EPSG 3948",
          caption: "屋根の増築余力を示す3Dパース。水色は規制高に余裕のある建物、橙色は景観保護規制や交通不便により制約のある建物。"
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "技術的限界と実務的展望",
        content: [
          "1mラスタ解像度は細かな煙突や屋根形状を平滑化するため、50m²未満の狭小敷地では建築現地確認が必要です。法的な区分所有者間の合意形成が次の実務ステップとなります。"
        ]
      }
    ]
  }
];
