import type { Project } from '../../types';

export const projectsDataKo: Project[] = [
  {
    id: "memoire-vefa",
    slug: "memoire-vefa",
    title: "엑스-마르세유-프로방스 대도시권의 공급 방식별 공공임대주택 배분에 관한 공간 계량경제 분석",
    shortTitle: "VEFA 민간 위탁과 공공임대주택 공간 동태",
    category: "Recherche M1",
    statusBadge: "M1 석사논문",
    statusText: "아비뇽 대학교 GéoTer 석사 1년차 연구논문 · 2025/2026",
    statusColor: "violet",
    thumbnail: "/assets/img/projet_vefa.png",
    subtitle: "프랑스 최대 광역도시권 중 하나에서 민간 선분양 방식(VEFA)을 통한 공공임대주택의 민간 의존이 공간 배치를 어떻게 재편하는지 약 55,800호의 데이터를 일반화 선형 혼합 모형(GLMM)으로 규명.",
    excerpt: "공공주택 공급 주체가 공공 시행자에서 민간 디벨로퍼로 전환되면서 임대주택의 공간적 배치가 구조적으로 변하고 있습니다. 마르세유 도시권에서 지자체 랜덤 절편 로지스틱 GLMM을 적용한 결과, 급내상관계수(ICC)가 73.4%에 달해 부동산 시세보다 지자체 단체장의 정치적 요인이 민간 위탁을 압도적으로 좌우함을 밝혔습니다.",
    tags: ["R", "GLMM", "QGIS", "Filosofi INSEE", "BD TOPO IGN", "RPLS"],
    summaryFooter: "55개 지자체 | ICC = 73.4% | 55,758호 주택 분석",
    meta: [
      { label: "연구 유형", value: "석사 1년차 논문: 2025-2026" },
      { label: "성과", value: "수석 졸업 및 우등상 (Mention Bien)" },
      { label: "분석 지역", value: "마르세유 대도시권 (55개 지자체)" },
      { label: "핵심 방법론", value: "GLMM / R 언어", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Memoire_M1GEOTER_Marceau_Chapon.pdf",
      github: "https://github.com/MarceauChp/Memoire_M1GEOTER"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "연구 문제의식 및 가설",
        content: [
          "프랑스 사회주택 분야는 중대한 구조적 변화를 겪고 있습니다. 전통적인 공공 직접 시행에서 민간 디벨로퍼로부터 완공 전 일괄 매입하는 선분양(VEFA) 방식으로의 전환입니다. 2007년 이전에는 미미했던 VEFA는 현재 전국 신규 공공임대 공급의 30%~50%를 차지합니다. 이러한 민간 위탁은 공간적 정의 관점에서 중요한 질문을 제기합니다.",
          "석사 과정 현장 조사를 통해 세운 가설은 민간 위탁 공공주택이 직접 개발된 주택과는 다른 지역에, 다른 건축 양식으로 배치된다는 점이었습니다. 주요 가설로 '지자체 효과(각 지자체장의 정치적 인허가 필터)'와 '시장 효과(디벨로퍼가 수익성 보전을 위해 저가 부지로 유도)'를 설정했습니다.",
          "대상 지역으로 55개 지자체로 구성된 엑스-마르세유-프로방스 도시권을 선정했습니다. 도시계획 기조와 사회주택 법정의무비율(SRU법) 준수율이 지자체별로 극단적으로 양극화되어 있는 지역입니다."
        ],
        callout: {
          icon: "📐",
          title: "이론적 배경",
          text: "탈상품화 vs 재상품화 이론(Esping-Andersen), 성장연합론(Logan & Molotch 1987), 도시 레짐 이론(Stone 1993), 공간적 정의(Harvey, Soja), 거주지 분리 모델(Lelévrier, Epstein)."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "데이터 엔지니어링 및 공간 처리",
        content: [
          "실증 데이터로 프랑스 국가 사회주택 등록부(RPLS 2025), 통계청 200m 센서스 격자(Filosofi 2021), 국가지형 DB, 건축물DB(BDNB)를 교차 연계했습니다. 필터링과 지오코딩 검증을 거친 최종 표본은 55,758호(직접 개발 74.7%, VEFA 25.3%)입니다.",
          "다중 스케일 사회 환경을 측정하기 위해 R 언어로 500m 및 2,000m 동심원 버퍼 공간 교차 분석을 수행하고, DVF 실거래가 DB를 집계하여 총 40개의 표준화 변수를 투입했습니다.",
          "주택 데이터가 55개 지자체에 계층적으로 내포되어 있으므로 lme4 패키지를 사용해 지자체 랜덤 절편을 고려한 일반화 선형 혼합 모형(GLMM)을 구축했습니다."
        ],
        codeSnippet: {
          lang: "R",
          title: "로지스틱 GLMM 모델 사양 (R / lme4)",
          code: `# 일반화 선형 혼합 모형
# 종속변수: vefa_bin (1 = VEFA 민간매입, 0 = 공공 직접개발)

library(lme4)
library(performance)

mod_glmm <- glmer(
  vefa_bin ~
    scale(prix_median_iris)     +  # 통계구 실거래가
    scale(taux_pauvrete_500m)   +  # 500m 근린 빈곤율
    scale(taux_pauvrete_2000m)  +  # 2000m 생활권 빈곤율
    scale(deficit_sru)          +  # 지자체 법정 의무부족률
    scale(dist_transport_m)     +  # 대중교통 접근거리
    (1 | code_commune),            # 지자체 랜덤 절편
  data   = df_vefa,
  family = binomial(link = "logit")
)

# 급내상관계수 ICC = 0.734 (73.4%)
icc(mod_glmm)`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "실증 분석 결과 및 주요 발견",
        content: [
          "가장 핵심적인 발견은 급내상관계수(ICC)입니다. 공급 방식 분산의 73.4%가 지자체 경계에 기인했습니다. 고정효과만 반영한 주변 R²은 0.059인 반면, 지자체 랜덤효과를 포함한 조건부 R²은 0.750에 달해 지자체의 제도적 기여도가 69.1%에 달했습니다.",
          "고정효과 측면에서는 1990년 이후 조성된 신흥 주거지역일수록 VEFA 오즈비가 50% 높았고(OR = 1.50), 근린 빈곤율도 정(+)의 상관관계를 보여 저가 부지 선호 경향이 확인되었습니다. 모델의 판별력은 AUC 0.8215를 달성했습니다.",
          "표준편차 타원을 활용한 중심 분석 결과, 외곽 교외지역에서 공공 직접개발과 민간 위탁 공급의 공간적 무게중심이 1,000~1,800m 이상 벌어져 있음이 드러났습니다."
        ],
        figure: {
          src: "/assets/img/projet_vefa.png",
          title: "그림 1 : GLMM으로 추정된 지자체별 랜덤 효과 (로그 오즈비)",
          tag: "QGIS / BD TOPO IGN / RPLS",
          caption: "지자체별 랜덤 절편 단계구분도. 파란색은 시장 여건을 뛰어넘어 민간 VEFA를 적극 위탁하는 지자체, 주황색은 공공 직접 개발을 유지하는 지자체."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "고찰 및 정책적 함의",
        content: [
          "상관관계가 곧 인과관계를 의미하지는 않으며, 저소득 지역의 VEFA 집적은 도시재생지구(PNRU) 공공 개입의 결과일 수도 있습니다.",
          "SRU 법률이 지자체 내부의 미시적 배치를 강제하지 않는 한, 단체장이 수치 목표만 채우기 위해 민간에 일임함으로써 미세 거주지 분리가 심화될 수 있음을 시사합니다."
        ]
      }
    ]
  },
  {
    id: "article-ipa",
    slug: "article-ipa",
    title: "데이터 희소 환경에서의 공간 접근성 평가: 접근성 압력 지수 (IPA)",
    shortTitle: "접근성 압력 지수(IPA)를 통한 공간 격차 측정",
    category: "Recherche & Publication",
    statusBadge: "논문 투고 준비 중",
    statusText: "방법론적 공간 연구 및 학술 논문 준비 중",
    statusColor: "cyan",
    thumbnail: "/assets/img/projet_ipa.png",
    subtitle: "시설 정원 및 수용력 데이터가 부재한 환경에서 공공서비스의 지리적 불평등을 측정하는 parsimonious 대안 지표 '접근성 압력 지수(IPA)'를 개발. 이동 거리 마찰과 인구 집중이 결합된 '공간적 이중 격차'를 모델링.",
    excerpt: "시설 용량 데이터가 제한된 환경에서 기존 2SFCA 모델의 한계를 극복하는 접근성 평가 모델로 IPA를 개발. QNEAT3 기반 실제 도로망 토폴로지, 인구 배후지 압력 및 시설 경쟁을 통합하여 아비뇽 청년층(18-24세)의 대학 접근성에 실증 적용했습니다.",
    tags: ["R", "QNEAT3", "QGIS", "Road Network"],
    summaryFooter: "아비뇽 | 18-24세 청년층 | 대학 캠퍼스 접근성",
    meta: [
      { label: "연구 상태", value: "학술지 투고를 위한 논문 집필 중" },
      { label: "연구 분야", value: "공공시설 및 이동성 지리학" },
      { label: "대상 지역", value: "그랜드 아비뇽 도시권" },
      { label: "핵심 도구", value: "QNEAT3 도로망 분석 + R 언어" }
    ],
    links: {
      pdf: "/assets/pdf/Indice de Pression d'Accès (IPA), Marceau Chapon.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "연구 배경 및 방법론적 도전",
        content: [
          "공공시설 접근성 측정의 국제 표준은 2단계 부유 집수역 모델(2SFCA, Luo & Wang 2003)입니다. 그러나 이 모델은 모든 시설의 정확한 정원 데이터를 전제합니다. 실제 행정 현장에서는 이러한 데이터가 부재하여 분석 결과의 왜곡이 발생합니다.",
          "이에 투명하고 실용적인 대안으로 '접근성 압력 지수(IPA)'를 설계했습니다. 실제 도로망 토폴로지를 통해 최단 시설로 수요를 배정함으로써 장거리 이동과 목적지 수용 압력이 겹치는 '이중 격차'를 포착합니다."
        ],
        callout: {
          icon: "📐",
          title: "IPA 수식 정의",
          text: "IPA = (M × DR) × (NB_M / NB_INF) [M: 출발지 인구, DR: 도로망 최단 이동거리, NB_M: 동일 시설을 공유하는 총 인구, NB_INF: 동등한 목적지 시설 수]."
        }
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "네트워크 라우팅 및 데이터 가공",
        content: [
          "QGIS QNEAT3를 이용해 위상학적 도로망 분석을 수행하고 R 언어로 지표 정규화를 진행했습니다. IGN BD TOPO 도로망에 교차로 제약과 보행·자전거 마찰계수를 반영했습니다.",
          "출발지 단위는 통계청 200m 인구 격자에서 청년층(18~24세)을 추출하여 사용했습니다."
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "분석 결과 및 공간 패턴",
        content: [
          "외곽 교외 지역에서 장거리 이동과 시설 배후지 과밀이 결합된 극심한 '이중 격차'가 뚜렷이 확인되었습니다. 반면 도심 지역은 인구 밀도가 높음에도 대중교통 인프라의 다중성으로 인해 IPA 값이 안정적이었습니다.",
          "기존 중력 모델 대비 경계 효과에 대한 민감도가 현저히 낮아 지자체에서 즉각 활용 가능한 지표임이 입증되었습니다."
        ]
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "고찰 및 활용 방안",
        content: [
          "이 모델은 최단 시설에 대한 결정론적 이동을 가정하므로, 상업·여가 등 선택적 시설에 적용할 경우 확률적 중력 모형과의 결합이 권장됩니다.",
          "예산 제약 하에서 지자체가 신규 공공서비스 입지를 신속히 평가할 수 있는 진단 도구를 제공합니다."
        ]
      }
    ]
  },
  {
    id: "grand-avignon-climat",
    slug: "grand-avignon-climat",
    title: "그랜드 아비뇽(16개 지자체) 도시 열섬 현상 및 열적 취약성 진단",
    shortTitle: "도시 과열, 쿨아일랜드 및 기후 적응",
    category: "Commande publique",
    statusBadge: "공공 연구 용역 (학부 3년)",
    statusText: "공공 연구 보고서 (164쪽) | 그랜드 아비뇽 도시공동체 | 2024-2025",
    statusColor: "emerald",
    thumbnail: "/assets/img/projet_chaleur.png",
    subtitle: "기술 및 GIS 책임자로서 16개 지자체를 포괄하는 164쪽 분량의 기후 진단 프로젝트를 총괄. Landsat 8 지표면 온도(LST) 매핑, 50m 해상도 국지기후대(LCZ) 분류, 다변량 취약성 군집화 및 120개 IoT 미기후 센서 배치 설계.",
    excerpt: "프랑스 국가 기후적응계획(PNACC-3)에 따라 수행된 실무형 열환경 진단. 다중시기 Landsat 8 위성 열영상과 LCZ 모델링을 결합하여 상업·유통 지구가 누적 열섬 면적의 72.1%를 차지함을 규명. 130개 쿨스팟 도출 및 120개 IoT 센서 모니터링 배치를 완료했습니다.",
    tags: ["Landsat 8", "LCZ", "QGIS Model Builder", "PostGIS", "PCA/HCA", "IoT Network"],
    summaryFooter: "16개 지자체 | 164쪽 보고서 | 120개 IoT 센서 | 50m LCZ",
    meta: [
      { label: "사업 유형", value: "공공 연구 용역 (164쪽) | 2024-2025" },
      { label: "발주처", value: "그랜드 아비뇽 도시공동체" },
      { label: "대상 지역", value: "16개 지자체 (보클뤼즈·가르 주)" },
      { label: "주요 방법", value: "Landsat / LCZ / PCA-HCA / PostGIS", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/La surchauffe urbaine dans le Grand Avignon, entre îlots de fraîcheur et prévention.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "배경 및 사업 목표",
        content: [
          "국가 기후 적응 전략(+4℃ 대비)에 맞춰 그랜드 아비뇽 도시공동체로부터 열환경 진단 용역을 수주했습니다. 지중해성 폭염과 극심한 가뭄이 반복되는 지역으로, 2100년에는 연간 50일 이상의 열대야가 예상됩니다.",
          "저는 GIS 및 모델링 팀장으로서 PostGIS 데이터베이스 설계, QGIS Model Builder 자동화, LCZ 모델링 및 지도 아틀라스 제작을 총괄했습니다."
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "위성영상 처리 및 공간 분석 파이프라인",
        content: [
          "Landsat 8 열적외선 밴드 10(TIRS)을 이용해 1990년, 2001년, 2010년 및 최근 폭염기(2019-2024)를 분석했습니다. 평균 지표면 온도는 1990년 대비 +2.5℃ 상승했으며 최근 폭염 시 시가화 구역에서 평균 36.9℃를 기록했습니다.",
          "Stewart & Oke의 체계에 따른 50m LCZ 분류를 수행하고, 200m 인구 격자 상에서 주성분분석(PCA)과 군집분석(HCA)을 통해 저소득·고령자·단열 취약 가구가 밀집한 46개 극초취약 격자를 특정했습니다."
        ]
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "핵심 발견 및 실무적 파급 효과",
        content: [
          "대형 상업·유통 지구(Mistral 7, Le Pontet 등)가 열섬 총면적의 72.1%(12.08 km²)를 차지하고 있음을 규명했습니다. 아스팔트 주차장과 평지붕이 주요 개선 표적입니다.",
          "좁은 골목길 그늘로 낮 동안 표면 온도가 억제되지만 밤에 열을 방출하는 역사 지구의 특성을 파악하고, 500m 이내 접근 가능한 130개 쿨아일랜드와 바람길 회랑을 설계했습니다.",
          "120개 온습도 IoT 센서의 단계별 배치 계획 및 1,500m² 이상 상업 주차장의 태양광 그늘막 의무화 규정이 도시종합계획(PLUi-H 2025-2030)에 공식 반영되었습니다."
        ],
        figure: {
          src: "/assets/img/projet_chaleur.png",
          title: "그림 1 : 지표면 온도(LST) 및 열섬 분류도",
          tag: "Landsat 8 / QGIS Model Builder / PostGIS",
          caption: "하절기 지표면 온도 분포. 붉은색은 심각한 핫스팟(상업·물류단지), 청록색은 론강과 뒤랑스강을 따른 냉각 회랑."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "위성 관측의 한계와 실무적 고려",
        content: [
          "위성으로 측정한 방사 지표면 온도(LST)가 보행자가 체감하는 지상 2m 기온과 일치하지 않는 한계를 극복하기 위해 실시간 지상 IoT 센서망 배치가 필수적이었습니다."
        ]
      }
    ]
  },
  {
    id: "rennes-foncier-sig",
    slug: "rennes-foncier-sig",
    title: "렌 대도시권 3D 수직 증축 및 유휴 부지 순환 잠재력 모델링",
    shortTitle: "지속가능한 도시 고밀화를 위한 3D 수직 증축 모델링",
    category: "Modélisation & 3D",
    statusBadge: "학부 졸업 캡스톤 (L3)",
    statusText: "GIS 공학 캡스톤 프로젝트 | 아비뇽 대학교 | 2025",
    statusColor: "muted",
    thumbnail: "/assets/img/projet_rennes.png",
    subtitle: "기술 및 방법론 총괄로서 고해상도(1m) 래스터 맵 대수를 활용한 건물 수직 증축 자동 검출 모델을 설계. 프랑스 토지 인공화 제로(ZAN) 법률과 지구단위계획 규제 하에서 렌 대도시권 208,351동의 건축물을 전수 분석.",
    excerpt: "주택 수요(연간 5,000호)와 2030년 토지 소비 반감(ZAN 법)의 충돌 속에서 기존 건축물의 상부 공간을 활용하는 수직 증축(33,304개 동, 22 km² 바닥면적 잠재력)과 수평 유휴지 순환(27 km²)을 결합한 알고리즘을 구축했습니다.",
    tags: ["50cm DSM/DTM", "PLUi", "ZAN Law", "Spatial SQL"],
    summaryFooter: "렌 대도시권 | 3D GIS 모델링 | 자동화 | ZAN 법",
    meta: [
      { label: "프로젝트 구분", value: "학부 3년 캡스톤 | 2025" },
      { label: "전공 과정", value: "지리학 및 지리정보학 학사" },
      { label: "대상 지역", value: "렌 대도시권 | 43개 지자체" },
      { label: "해상도", value: "LiDAR 50cm / 1m 래스터", isMono: true }
    ],
    links: {
      pdf: "/assets/pdf/Devoir maison SIG, Rennes Métropole, Alexi, Gwendoline, Hugo, Marceau.pdf",
      github: "https://github.com/MarceauChp"
    },
    sections: [
      {
        id: "problematique",
        num: "PHASE 01",
        title: "도시 고밀화 딜레마와 수직 잠재력",
        content: [
          "프랑스 기후회복력법(2021)은 2030년까지 토지 개발 면적을 절반으로 줄이고 2050년까지 토지 인공화 제로(ZAN)를 달성하도록 규정합니다. 렌과 같은 성장 도시에서 외곽 농지 확장은 불가능해졌습니다.",
          "해결책은 '보이지 않는 상부 공간'의 동원입니다. 도시계획(PLUi) 허용 최고 높이까지 추가 층 증축이 가능한 건축물을 자동 탐색하는 알고리즘을 설계하여 43개 지자체(20만 8천여 동)를 분석했습니다."
        ]
      },
      {
        id: "geotraitement",
        num: "PHASE 02",
        title: "3D 수치표고 및 래스터 맵 대수학",
        content: [
          "IGN LiDAR HD 수치표면모델(DSM)과 수치표고모델(DTM)을 1m 해상도로 결합했습니다. 도시계획 규제 최고 높이와의 매트릭스 연산을 통해 최소 1개 층(3m 이상)의 증축 여유를 가진 건물을 추출했습니다."
        ],
        codeSnippet: {
          lang: "QGIS",
          title: "래스터 계산기 수식 (CC48 판별)",
          code: `# 1. 건물 순높이 추출
building_height = ( "DSM@1" - "DTM@1" )

# 2. 규제 높이 대비 비율
CC48 = building_height / "H_max_PLUi@1"

# 3. 다기준 증축 적격 마스크
# - CC48 < 0.75 (최소 1개 층 증축 여유)
# - building_height > 4m (차고 및 부속건물 제외)
# - 농업 및 자연보호구역 배제
eligible = (CC48 < 0.75) AND (building_height > 4)
           AND ("PLUi_Zone@1" NOT IN (1, 2))`
        }
      },
      {
        id: "resultats",
        num: "PHASE 03",
        title: "공간 정량화 및 우선순위 등급화",
        content: [
          "알고리즘은 렌 대도시권 전역에서 33,304동의 증축 적격 건물을 검출했습니다. 신규 토지 잠식 없이 약 23,000호의 주택을 공급할 수 있는 규모입니다.",
          "대중교통 접근성과 문화재 보호 구역을 반영한 다기준 우선순위 분류를 통해 14,065동의 최우선 건물을 특정했습니다. 이는 2030년 대도시권 주택 공급 목표의 60%에 해당합니다."
        ],
        figure: {
          src: "/assets/img/projet_rennes.png",
          title: "그림 1 : 3D 도시 모델에서의 수직 증축 적격 건물 시각화",
          tag: "LiDAR HD / QGIS 3D / EPSG 3948",
          caption: "분석된 지붕들의 3D 렌더링. 청록색은 규제 높이에 여유가 있는 건물, 주황색은 경관 보호 구역이나 대중교통 원거리 건물."
        }
      },
      {
        id: "discussion",
        num: "PHASE 04",
        title: "기술적 한계 및 실무적 제언",
        content: [
          "1m 해상도 래스터는 굴뚝이나 복잡한 지붕선을 단순화하므로 50m² 미만 소형 필지는 현장 실측이 필요합니다. 이후 집합건물 구분소유자 간 합의가 주요 실무 과제입니다."
        ]
      }
    ]
  }
];
