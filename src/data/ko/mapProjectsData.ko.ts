import type { MapProject } from '../mapProjectsData';

export const CLIPPY_WELCOME_KO = "안녕하세요! 포트폴리오 가이드 Clippy입니다. 마르소의 공간 모델링과 GIS 프로젝트를 탐색하고 계시군요. 지도의 핀을 클릭하시거나 프로젝트 선택기를 사용하시면 핵심 연구 결과를 요약해 드리겠습니다!";

export const mapProjectsKo: MapProject[] = [
  {
    id: "marseille-vefa",
    name: "엑스-마르세유-프로방스 대도시권",
    shortTitle: "VEFA 민간위탁 & 공공임대주택",
    territory: "55개 지자체 (부슈뒤론 주)",
    coordinates: [43.2965, 5.3698],
    zoom: 11,
    badge: "M1 석사논문 · 학술 연구",
    accent: "violet",
    date: "2025-2026",
    metrics: [
      "55,758채의 공공임대주택 분석",
      "ICC = 73.4% (지자체 정치적 요인이 절대적)",
      "AUC = 0.82 (lme4 로지스틱 혼합모형)"
    ],
    description: "R 언어 기반 일반화 선형 혼합 모형(GLMM)을 활용하여 VEFA(선분양 민간위탁)를 통한 공공주택 배분의 공간적 불평등 구조 규명.",
    clippySummary: "마르세유 도시권의 공공주택 분석을 보고 계시네요! 마르소는 55,758채의 주택 데이터를 로지스틱 GLMM 모델로 분석했습니다. 핵심 발견으로 급내상관계수(ICC)가 73.4%에 달하여, 민간 위탁 여부는 부동산 시세보다 지자체 단체장의 정치적 선택에 의해 좌우됨이 입증되었습니다.",
    slug: "memoire-vefa"
  },
  {
    id: "grand-avignon-climat",
    name: "그랜드 아비뇽 도시공동체",
    shortTitle: "도시 과열 & 기후 적응 진단",
    territory: "16개 지자체 (보클뤼즈 및 가르 주)",
    coordinates: [43.9780, 4.8020],
    zoom: 12,
    badge: "공공 연구 용역 (학부 3년) · 164쪽",
    accent: "emerald",
    date: "2024-2025",
    badgeOffset: "left",
    metrics: [
      "164페이지 분량의 공공 진단 보고서",
      "상업·유통 지역에 열섬 면적의 72.1% 집중",
      "50m 해상도 LCZ 분류 및 Landsat 8 분석"
    ],
    description: "Landsat 8 위성 지표면 온도(LST) 매핑, 국지기후대(LCZ) 50m 분류, 및 120개 IoT 미기후 센서 네트워크 최적 배치 설계.",
    clippySummary: "그랜드 아비뇽의 기후 진단 보고서입니다! 공공 입찰로 수행된 164쪽의 방대한 프로젝트입니다. 마르소가 GIS 및 위성 원격탐사를 총괄하여 열섬의 72.1%가 상업지역에 집중됨을 입증하고, 120개 IoT 센서 배치와 130개 쿨스팟을 도출했습니다.",
    slug: "grand-avignon-climat"
  },
  {
    id: "avignon-ipa",
    name: "아비뇽 도시권",
    shortTitle: "접근성 압력 지수 (IPA)",
    territory: "아비뇽 대학교 캠퍼스 일대",
    coordinates: [43.9260, 4.8480],
    zoom: 13,
    badge: "학술 연구 논문 준비",
    accent: "cyan",
    date: "2025",
    badgeOffset: "right",
    metrics: [
      "QNEAT3 기반 실제 도로망 토폴로지 라우팅",
      "통계청 200m 센서스 격자 인구 결합",
      "2SFCA 모형의 실용적 대안 지표"
    ],
    description: "시설 수용능력 데이터가 부재한 환경에서 거리 마찰과 수요 집중이 결합된 '공간적 이중 격차'를 모델링하는 투명한 접근성 지표 개발.",
    clippySummary: "아비뇽의 공간 접근성 연구입니다! 마르소는 시설 수용인원 데이터가 없어도 작동하는 강건한 '접근성 압력 지수(IPA)'를 개발했습니다. 실제 도로망 토폴로지와 18-24세 청년층 인구 격자를 결합해 검증되었습니다.",
    slug: "article-ipa"
  },
  {
    id: "rennes-3d",
    name: "렌 대도시권",
    shortTitle: "3D 수직 증축 & 토지 순환 잠재력",
    territory: "43개 지자체 (일리에빌렌 주)",
    coordinates: [48.1173, -1.6778],
    zoom: 12,
    badge: "3D GIS 공학 · 학부 3년",
    accent: "amber",
    date: "2025",
    metrics: [
      "208,351동의 건축물 3D 모델링",
      "33,304개 증축 가능 옥상 자동 검출",
      "LiDAR HD 50cm 수치표고 래스터 대수학"
    ],
    description: "프랑스 '토지 인공화 제로(ZAN)' 규제 하에서 추가 토지 수용 없이 건물의 수직 증축 잠재력을 자동 검출하는 고해상도 래스터 모델 개발.",
    clippySummary: "렌 대도시권 프로젝트입니다! 신규 농지 개발을 억제하는 ZAN 법률에 대응하여 마르소는 LiDAR HD(50cm)를 활용한 래스터 맵 대수 알고리즘을 개발했습니다. 20만 8천 동의 건축물을 스캔하여 증축 가능한 33,304동의 지붕을 자동 추출했습니다.",
    slug: "rennes-foncier-sig"
  }
];
