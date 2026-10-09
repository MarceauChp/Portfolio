import type { ExperienceItem } from '../../types';

export const experienceDataKo: ExperienceItem[] = [
  {
    id: "m1-geodata",
    period: "2026-2027",
    status: "재학 중",
    isCurrent: true,
    title: "지리공간정보학 및 공간 데이터 사이언스 석사 1년차 (M1)",
    institution: "GeoData Paris, 귀스타브 에펠 대학교 (구 ENSG)",
    location: "파리 수도권 (샹쉬르마른)",
    description: "최신 공간 데이터 과학, 고급 공간통계학, 위성 기반 지구관측, 대규모 데이터셋을 위한 재현 가능한 자동화 파이프라인 설계 전문 교육과정.",
    badges: [
      { text: "공간 데이터 사이언스", color: "yellow" },
      { text: "재학 중", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "stage-cedre",
    period: "2026년 6월 - 9월",
    status: "R&D 인턴십",
    isCurrent: false,
    title: "R&D 연구원: 남프랑스 야간 빛공해 공간 모델링",
    institution: "CEDRE",
    location: "알레스 (가르 주)",
    description: "야간 빛공해의 공간 분석 및 예측 모델링 R&D 인턴십. 빛공해로 인한 지자체 전력 손실액 정량화 및 가로등 수요 다기준 모델 개발. 개발된 프레임워크는 지자체 의사결정 솔루션으로 상용화되었습니다.",
    badges: [
      { text: "연구개발 (R&D)", color: "emerald" },
      { text: "빛공해 분석", color: "muted" }
    ],
    accent: "emerald"
  },
  {
    id: "m1-geoter",
    period: "2025-2026",
    status: "수석 졸업",
    isCurrent: false,
    title: "지리정보 및 지역 프로젝트 관리 석사 1년차 (GEOTER)",
    institution: "아비뇽 대학교",
    location: "아비뇽",
    description: "정량적 공간 분석, 지역 진단 및 프로젝트 리더십 교육과정. 아비뇽 시청의 역사문화 유산 GIS 데이터베이스 갱신 사업, 및 마르세유 도시권의 공공주택 분포를 규명하는 계량경제 연구 논문 수행.",
    badges: [
      { text: "수석 졸업 (Top of Class)", color: "red" },
      { text: "우등상 (Mention Bien)", color: "emerald" },
      { text: "과대표", color: "yellow" }
    ],
    accent: "emerald"
  },
  {
    id: "asso-bang",
    period: "2025-2026",
    status: "학생회 공동대표",
    isCurrent: false,
    title: "BANG 비영리 학생회 공동대표",
    institution: "아비뇽 대학교",
    location: "아비뇽",
    description: "2025-2026 학년도 학생 자치 비영리 단체 공동대표. 학생 커뮤니티 기획, 예산 집행, 대외 대학 협력 네트워크 총괄.",
    badges: [
      { text: "학생 리더십", color: "yellow" },
      { text: "공동대표", color: "emerald" }
    ],
    accent: "muted"
  },
  {
    id: "stage-espace",
    period: "2025",
    status: "학술 연구 인턴십",
    isCurrent: false,
    title: "연구 인턴: 공공주택의 공간 계량경제 모델링",
    institution: "프랑스 국립과학연구센터 (CNRS) UMR 7300 ESPACE / 아비뇽 대학교",
    location: "아비뇽",
    description: "마르세유 대도시권 공공주택 공급에 대한 계량경제 및 공간 분석 연구. 국가 주택등록부(RPLS), 통계청 200m 센서스 격자 및 국가 지형 데이터를 통합한 고정밀 공간 DB 구축.",
    badges: [
      { text: "학술 연구", color: "yellow" },
      { text: "CNRS 연구소", color: "cyan" }
    ],
    accent: "cyan"
  },
  {
    id: "licence-geo",
    period: "2022-2025",
    status: "학사 졸업",
    isCurrent: false,
    title: "지리학 및 국토계획학 학사 (B.Sc.)",
    institution: "아비뇽 대학교",
    location: "아비뇽",
    description: "자연 및 인문지리학의 기초를 다지고 1학년부터 GIS, 2~3학년에 다변량 통계 및 공간 모델링으로 조기 특화. 렌 도시권 3D 수직 증축 가능성 분석 및 그랜드 아비뇽 기후 진단 등을 주도.",
    badges: [
      { text: "GIS·통계 전공 수석", color: "red" },
      { text: "우등 졸업", color: "emerald" },
      { text: "과대표", color: "yellow" }
    ],
    accent: "red"
  }
];
