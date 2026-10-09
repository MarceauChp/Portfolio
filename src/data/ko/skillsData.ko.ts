import type { SkillsData } from '../../types';

export const skillsDataKo: SkillsData = {
  categories: [
    {
      id: "stats",
      title: "고급 통계 분석 및 프로그래밍",
      subtitle: "엄밀한 공간 모델링, 다변량 분석 기법, 데이터 엔지니어링 언어",
      accent: "cyan",
      items: [
        {
          name: "다변량 통계 분석",
          level: "전문가",
          highlight: true,
          description: "주성분 분석(PCA), 계층적 군집 분석(HCA), 다중 대응 분석(MCA), 대응 분석(CA), 단순 및 다중 선형 회귀. 공간 데이터에 대한 탐색적 및 요약 통계 기법."
        },
        {
          name: "GLMM 혼합 모형",
          level: "고급",
          highlight: true,
          description: "R(lme4) 기반 일반화 선형 혼합 모형. 55,758채의 공공임대주택 데이터를 대상으로 지자체 랜덤 절편 로지스틱 회귀 구축 (급내상관계수 ICC 산출, 우도비 검정, 후진 소거법)."
        },
        {
          name: "R 언어",
          level: "고급",
          highlight: false,
          description: "데이터 전처리, 공간 통계, 공간 결합 알고리즘 및 출판 품질의 데이터 시각화를 위한 핵심 연구 개발 환경."
        },
        {
          name: "Python",
          level: "중급",
          highlight: false,
          description: "지리공간 데이터 전처리 스크립팅, 벡터/래스터 배치 처리, API 연동 및 자동화 파이프라인 개발."
        },
        {
          name: "SQL",
          level: "중급",
          highlight: false,
          description: "관계형 데이터베이스 쿼리, 공간 집계, 복합 조인, 공간 인덱싱 및 대규모 공간 테이블 연산 최적화."
        }
      ]
    },
    {
      id: "sig",
      title: "GIS, 원격탐사 및 지도학 (카르토그래피)",
      subtitle: "공간 데이터 엔지니어링, 지구관측, 3D 분석 및 인터랙티브 웹 GIS 지도.",
      accent: "emerald",
      items: [
        {
          name: "QGIS",
          level: "전문가",
          highlight: true,
          description: "지리정보 업무의 메인 워크스테이션. 고급 공간 연산, 래스터 맵 대수학, Model Builder 기반 파이프라인 자동화, 국지기후대(LCZ) 모델링 및 네트워크 경로 분석."
        },
        {
          name: "그래픽 기호학 및 지도학",
          level: "전문가",
          highlight: true,
          description: "QGIS 레이아웃 편집 외에도 Inkscape를 활용한 벡터 지도 마감 및 Flourish를 통한 대화형 데이터 시각화."
        },
        {
          name: "위성 원격탐사",
          level: "고급",
          highlight: true,
          description: "QGIS 및 R을 이용한 Landsat 8 열적외선 위성영상 처리, 분광 지수 계산(NDVI, NDBI), 지표면 온도(LST) 도출 및 지도학적 분류."
        },
        {
          name: "ArcGIS Pro",
          level: "고급",
          highlight: false,
          description: "공간 분석 툴셋 운용, 주제도 제작 및 기업 표준에 부합하는 실무 GIS 구축."
        },
        {
          name: "PostgreSQL / PostGIS",
          level: "중급",
          highlight: false,
          description: "PostGIS 데이터베이스 관리, 공간 질의, 좌표계 변환, 공간 인덱싱 및 성능 최적화."
        }
      ]
    }
  ],
  languages: [
    {
      lang: "프랑스어",
      level: "모국어 (Native)",
      code: "FR"
    },
    {
      lang: "영어",
      level: "B2 레벨 (학술/실무)",
      description: "학술 논문 독해, 연구 페이퍼 작성 및 국제 프로젝트 기술 커뮤니케이션.",
      code: "B2"
    }
  ],
  pipelineSteps: [
    {
      number: "01",
      title: "데이터 수집 및 비판적 검토",
      color: "emerald",
      icon: "Download",
      description: "초기 단계에서는 데이터 획득 프로토콜 평가, 표본 편향 식별 및 품질 검증을 수행합니다.",
      items: [
        "IGN (국가 지형 DB, LiDAR HD 점군, 토지피복 데이터)",
        "INSEE (통계청 200m 센서스 인구 격자)",
        "USGS / NASA (Landsat 8 위성 관측)",
        "DVF (부동산 실거래가), 지적도 및 지자체 공공데이터"
      ]
    },
    {
      number: "02",
      title: "데이터 처리 및 공간 모델링",
      color: "cyan",
      icon: "Cpu",
      description: "두 번째 단계에서는 프로젝트 규모와 연산 제약에 부합하는 최적의 처리 아키텍처를 선정합니다.",
      items: [
        "R : 고급 통계 모델링 및 공간 결합 알고리즘",
        "PostGIS : 공간 DB 설계 및 인덱싱",
        "QGIS : 복합 공간 분석 및 네트워크 경로 분석",
        "Python : 배치 작업 자동화 및 파이프라인 연계"
      ]
    },
    {
      number: "03",
      title: "결과 전달 및 방법론적 고찰",
      color: "violet",
      icon: "MapPin",
      description: "세련된 지도 디자인, 실효성 있는 의사결정 지원 보고서, 방법론적 한계의 투명한 공개로 분석의 가치를 극대화합니다.",
      items: [
        "주제도 제작 : QGIS & Inkscape",
        "정책 및 의사결정 지원형 지역 진단 보고서",
        "인터랙티브 웹맵 기반 시각화",
        "재현 가능한 과학 및 코드 문서화 (GitHub)"
      ]
    }
  ]
};
