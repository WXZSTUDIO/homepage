// Complete Portfolio & Resume Data for 정찬봉 (CHANBONG JUNG)

export interface ProjectItem {
  id: string;
  title: string;
  titleKr: string;
  category: 'brand' | 'video' | 'ai' | 'package';
  categoryLabel: string;
  client: string;
  year: string;
  description: string;
  descriptionKr: string;
  deliverables: string[];
  src: string;
  videoSrc?: string;
  tags: string[];
  featured?: boolean;
  span?: string;
}

export interface CareerItem {
  id: string;
  company: string;
  companyEn: string;
  period: string;
  duration: string;
  role: string;
  roleKr: string;
  type: string;
  highlights: string[];
  highlightsKr: string[];
}

export interface StrengthItem {
  id: string;
  number: string;
  title: string;
  titleKr: string;
  subtitle: string;
  desc: string;
  descKr: string;
  keyPoints: string[];
  tags: string[];
}

export const PERSONAL_INFO = {
  nameZh: '郑灿峰',
  nameKr: '정찬봉',
  nameEn: 'CHANBONG JUNG',
  title: '视觉设计师 · AI设计师 · 品牌设计师',
  titleEn: 'Senior Visual Designer & AI Creative Director',
  birth: '1994 (32세)',
  experienceYears: '13년 (2013 ~ 2026)',
  location: '서울 광진구 자양동 (Seoul, South Korea)',
  email: 'ro3eandcat@gmail.com',
  phone: '010-****-8388',
  wechat: 'icf304',
  portfolioUrl: 'https://naver.me/5fdFDeXr',
  xiaohongshuUrl: 'https://www.xiaohongshu.com/user/profile/5fd363ac000000000101cffc',
  education: '하얼빈청공업학교대학 (시각/그래픽디자인 졸업)',
  bio: `디자인을 전공하며 시각적 사고의 단단한 기초를 다졌고, 콘텐츠의 완성도를 타협하지 않기 위해 사진과 영상 촬영·편집까지 마스터했습니다. 2021년부터 다양한 브랜드의 파트너로 일하며 기획, 촬영, 후반 편집, 그래픽 디자인, 오프라인 출력에 이르기까지 콘텐츠의 제작 전 공정을 스케일업할 수 있는 내재화된 프로세스를 구축해 왔습니다.

자체 전문 장비를 기반으로 외주 섭외에 드는 리드 타임과 제작 비용을 획기적으로 절감하며 중소규모의 상업 촬영 및 숏폼 프로덕션을 독립적으로 완수할 수 있습니다.

중화권 시장으로 비즈니스를 확장하거나 글로벌 마케팅을 전개할 때, 현지 트렌드를 관통하는 비주얼 전략과 로컬라이징 콘텐츠로 가장 강력하고 실질적인 지원을 제공합니다.`,
  bioZh: `以设计专业为根基，深耕视觉设计领域13年。坚持对作品完整度的高要求，打通了商业摄影、摄像拍摄、剪辑调色至平面输出的全流程。自2021年起作为品牌核心伙伴，构建起涵盖策划、拍摄、后期到线下落地的全闭环内生化制作体系。

依托自备的专业影视级拍摄与灯光设备，极大压缩外部沟通与外包成本，能够独立高效完成中小型商业拍摄与高质感短视频制作。

在品牌出海或中韩跨国社交媒体营销（小红书、抖音、TikTok）中，凭借对中国本土流行趋势与点击率逻辑的深刻理解，提供最具实效的视觉战略支持与本地化内容方案。`,
};

export const METRICS = [
  { label: '从业经验 (Total Experience)', value: '13+', unit: 'Years', sub: '2013 - 2026 深耕视觉设计与影像' },
  { label: '商业项目交付 (Projects Delivered)', value: '120+', unit: 'Cases', sub: '涵盖品牌VI、TVC、短视频与包装' },
  { label: '跨国社媒传播量 (Cross-Border Views)', value: '15M+', unit: 'Impressions', sub: '小红书 · 抖音 · TikTok爆款内容' },
  { label: '自备专业设备独立执行 (In-House Pipeline)', value: '100%', unit: 'Autonomous', sub: '零外包等待 · 端到端极速响应' },
];

export const CAREER_HISTORY: CareerItem[] = [
  {
    id: 'icon',
    company: '㈜ 아이콘글로벌 (Icon Global)',
    companyEn: 'Icon Global Co., Ltd.',
    period: '2022.01 ~ 2026.02',
    duration: '4년 2개월',
    role: 'Creative Team · 과장 / 파트장 (Team Lead)',
    roleKr: '크리에이티브팀 과장/파트장',
    type: '영상 촬영·기획 / 샤오홍슈·도우인 비주얼 총괄',
    highlights: [
      '중국 숏폼 콘텐츠(Douyin / TikTok) 기획 및 제작: 브랜드별 타겟 맞춤형 영상 기획, 대본 작성 및 촬영 디렉팅 수행',
      '신세계면세점(Shinsegae Duty Free) 등 주요 면세 및 뷰티 브랜드의 중화권 마케팅 영상 제작 및 조회수/전환 최적화',
      '샤오홍슈(Xiaohongshu) 비주얼 마케팅: 클릭률(CTR) 제고를 위한 썸네일 디자인 및 상세페이지 이미지 제작',
      '아모레퍼시픽(헤라, 아이오페, 바이탈뷰티) K-뷰티 대표 브랜드의 소셜 미디어 맞춤형 비주얼 에셋 관리',
      '하이앤고고, 삼양, 상쾌환 등 식품 및 건강기능식품 브랜드의 중국 시장 진출을 위한 콘텐츠 현지화 및 모델 섭외'
    ],
    highlightsZh: [
      '主导中国短视频平台（抖音 / TikTok）内容策划与实拍导演，涵盖脚本撰写、灯光镜头设计与后期调色',
      '负责新世界免税店及一线美妆品牌的针对中韩跨境营销视频制作，精准提升播放量与互动率',
      '全权把控小红书（Xiaohongshu）视觉营销，打造高CTR爆款封面、信息流图文及电商产品详情页',
      '统筹爱茉莉太平洋旗下 HERA（赫妍）、IOPE（艾诺碧）、VITAL BEAUTIE 等品牌的社交媒体视觉资产规范',
      '执行 high & gogo、三养食品、上快丸等健康消费品牌的中国出海视觉本地化，管理拍摄预算与演职人员调度'
    ] as any,
  },
  {
    id: 'samwoo',
    company: '삼우생명과학㈜ (Samwoo Life Science)',
    companyEn: 'Samwoo Life Science Co., Ltd.',
    period: '2020.12 ~ 2022.01',
    duration: '1년 2개월',
    role: 'Design Team · 대리 (Senior Designer)',
    roleKr: '디자인팀 대리/팀원',
    type: '브랜드 BI/VI 시스템 구축 / 제품 홍보 영상',
    highlights: [
      '자사 뷰티 브랜드 \'이케이(eke)\' 및 삼우 관련 브랜드 아이덴티티(BI/VI) 구축 및 브랜드 가이드라인 수립',
      '브랜드 로고, 컬러 가이드, 비주얼 시스템을 통한 일관된 글로벌 브랜드 이미지 확립',
      '멀티미디어 콘텐츠 기획: 제품 홍보 영상 스토리보드 작성, 현장 연출 및 후반 편집',
      '인스타그램 & 샤오홍슈 공식 계정 피드 그리드 설계 및 톤앤매너에 맞춘 비주얼 콘텐츠 제작'
    ],
    highlightsZh: [
      '主导打造自主美妆品牌“eke”及集团相关品牌的视觉识别系统（BI/VI），制定全面视觉规范手册',
      '负责产品外包装设计、打样输出与供应链色彩校准，确保货架与电商端视觉质感统一',
      '主导产品宣传视频与微电影的全流程制作（分镜绘制、摄影布光、现场导演、达芬奇调色）',
      '设计 Instagram 及小红书双平台官方账号视觉矩阵与排版网格，强化品牌高阶调性'
    ] as any,
  },
  {
    id: 'quark',
    company: '㈜ 쿼크미디어 (QuarkMedia)',
    companyEn: 'QuarkMedia Co., Ltd.',
    period: '2017.01 ~ 2018.07',
    duration: '1년 7개월',
    role: 'Design Team · 사원 / 팀원 (UI & Spatial Designer)',
    roleKr: '디자인팀 사원/팀원',
    type: '해외직구 웹디자인 / 전시회 기획 및 공간 디자인',
    highlights: [
      '해외 직구 웹사이트 플랫폼 \'QOOOK(쿠크)\' 메인, 상세 페이지, 이벤트 랜딩 페이지 디자인 및 퍼블리싱 관리',
      '온·오프라인 전시 콘텐츠 기획 및 비주얼 아이덴티티(VI) 설계, 전시 부스 디자인 및 공간 큐레이션',
      '기업 공식 홈페이지 및 브랜드 사이트 비주얼 디자인 및 유지보수'
    ],
    highlightsZh: [
      '负责跨境海淘电商平台“QOOOK”主站界面视觉、活动大促专题页及电商详情页视觉设计',
      '负责国内外大型行业博览会展台空间设计（VMD）、展厅动线规划与全套线下宣传物料设计输出',
      '负责企业级官方网站界面与品牌专题视觉维护'
    ] as any,
  },
  {
    id: 'early',
    company: '베이징 리배야 & 왕푸징 백화점 (Early Foundation)',
    companyEn: 'Beijing Commercial & Media Early Experience',
    period: '2012.07 ~ 2016.12',
    duration: '4년 6개월',
    role: '시각디자인 / 공간 아트월 / 광고디자인',
    roleKr: '광고 및 시각디자인 담당',
    type: '호텔 BI · 환경 특화 Art Wall · 백화점 VMD',
    highlights: [
      '베이징 리배야 건축공사: 프리미엄 호텔 브랜드 아이덴티티 및 호텔 로비/객실 포인트 Art Wall 패턴 디자인',
      '왕푸징 백화점: 주요 명절(춘절, 국경절) 대형 프로모션 포스터 및 백화점 내부 팝업존 VMD 연출 설계',
      '하얼빈 지하철 신문사: 신문 지면 광고 기획 및 지면 비주얼 레이아웃 제작'
    ],
    highlightsZh: [
      '北京利佰雅建筑装饰工程：参与高端酒店品牌识别设计，负责大堂与客房艺术背景墙（Art Wall）图形系统开发',
      '王府井百货：负责春节、国庆等核心大促视觉主画面（Key Visual）、商场大型海报与中庭美陈陈列（VMD）',
      '哈尔滨地铁报社：负责地铁主流媒介平面报刊广告排版与定制商业客户视觉呈现'
    ] as any,
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'shinsegae-dutyfree',
    title: 'SHINSEGAE DUTY FREE × K-BEAUTY',
    titleKr: '신세계면세점 중화권 글로벌 뷰티 캠페인',
    category: 'video',
    categoryLabel: 'Short-form & Video',
    client: '신세계면세점 (Shinsegae Duty Free)',
    year: '2023 - 2024',
    description: 'High-conversion Douyin/TikTok video campaigns for Seoul luxury duty free, achieving viral reach with cinematic night aesthetic.',
    descriptionKr: '신세계면세점의 중화권 타깃 숏폼 영상 시리즈 기획·연출·촬영. 세련된 서울의 도시 야경과 프리미엄 뷰티 제품을 결합하여 높은 조회수와 전환을 견인.',
    deliverables: ['영상 기획 및 숏폼 대본 작성', '현장 촬영 디렉팅 & 조명 세팅', '모션 그래픽 & 다빈치 리졸브 색보정', '도우인/틱톡 섬네일 최적화'],
    src: '/src/assets/images/shinsegae_luxury_visual_1791140086284.jpg',
    videoSrc: 'https://wxzstudio.github.io/videos/portfolio-shinsegae.mp4',
    tags: ['Short-form', 'Douyin', 'Commercial Video', 'Luxury'],
    featured: true,
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'amorepacific-hera-iope',
    title: 'AMOREPACIFIC (HERA · IOPE) SOCIAL ASSETS',
    titleKr: '아모레퍼시픽 헤라·아이오페 소셜 비주얼 에셋',
    category: 'brand',
    categoryLabel: 'Brand & VI',
    client: '아모레퍼시픽 (HERA / IOPE)',
    year: '2023 - 2025',
    description: 'High-CTR Xiaohongshu editorial feeds and product detail imagery engineered for leading Korean luxury cosmetic brands.',
    descriptionKr: '아모레퍼시픽 대표 브랜드 헤라와 아이오페의 샤오홍슈 소셜 미디어 비주얼 에셋 총괄. 클릭률(CTR)과 브랜드 감도를 동시 만족하는 비주얼 가이드 수립.',
    deliverables: ['샤오홍슈 피드 섬네일 디자인 (CTR 특화)', '신제품 런칭 상세페이지 레이아웃', '브랜드 톤앤매너 비주얼 에셋 가이드', '소셜 인터랙티브 비주얼'],
    src: '/src/assets/images/iope_campaign_visual_1791135904668.jpg',
    tags: ['K-Beauty', 'Social Assets', 'CTR Boost', 'Xiaohongshu'],
    featured: true,
    span: 'col-span-1',
  },
  {
    id: 'ai-generative-visual-system',
    title: 'AI GENERATIVE SYNTHESIS & 3D SPATIAL',
    titleKr: 'AI 제너레이티브 비주얼 디자인 & 미래 3D 탐색',
    category: 'ai',
    categoryLabel: 'AI & Generative',
    client: 'Autonomous Creative Lab / R&D',
    year: '2024 - 2026',
    description: 'Advanced AI image & video generation workflows combining ComfyUI, Midjourney, and 3D architectural biomimicry.',
    descriptionKr: '최신 ComfyUI 워크플로우와 프롬프트 엔지니어링, 3D 조형을 결합한 차세대 비주얼 프로덕션 파이프라인. 상업 룩북과 콘셉트 시각화의 리드 타임을 70% 단축.',
    deliverables: ['ComfyUI 커스텀 파이프라인 구축', 'Midjourney / Runway 프롬프트 튜닝', '초현실 미래주의 3D 조형 시각화', '고해상도 커머셜 에셋 합성'],
    src: '/src/assets/images/ai_generative_sculpture_1791140097764.jpg',
    tags: ['AI Workflow', 'ComfyUI', 'Midjourney', 'Future Concept'],
    featured: true,
    span: 'col-span-1',
  },
  {
    id: 'eke-organic-skincare-vi',
    title: 'EKE COSMETICS BRAND IDENTITY SYSTEM',
    titleKr: '이케이(eke) 유기농 코스메틱 BI/VI 및 패키지',
    category: 'brand',
    categoryLabel: 'Brand & VI',
    client: '삼우생명과학㈜ (eke)',
    year: '2021 - 2022',
    description: 'Full brand identity design system including custom wordmark, tactile packaging, and spatial product guidelines.',
    descriptionKr: '내추럴 럭셔리 코스메틱 브랜드 eke의 브랜드 로고마크, 트래버틴 톤의 패키지 지함 및 용기 실크인쇄, 소셜미디어 런칭 비주얼 아이덴티티 전면 구축.',
    deliverables: ['브랜드 BI/VI 가이드라인 수립', '화장품 용기 및 패키지 박스 설계', '오프라인 인쇄 감리 및 지질 선정', '런칭 캠페인 화보 기획'],
    src: '/src/assets/images/skincare_brand_identity_1791135893057.jpg',
    tags: ['Branding', 'Package Design', 'VI System', 'Cosmetics'],
    featured: false,
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'seoul-fashion-runway-reel',
    title: 'SEOUL FASHION WEEK & IDOL FOCUS CAM',
    titleKr: '서울패션위크 런웨이 & 아이돌 포커스 숏폼',
    category: 'video',
    categoryLabel: 'Short-form & Video',
    client: 'Seoul Fashion Week / ZEROBASEONE Side Cam',
    year: '2024',
    description: 'High-energy runway documentation and dynamic idol side-shot video production with precise cinematic color grading.',
    descriptionKr: '패션위크 런웨이 및 K-POP 셀러브리티 현장 촬영. 현장의 다이내믹한 텐션을 즉각적으로 포착하고 고속 숏폼 릴스로 가공하여 글로벌 팬덤에 확산.',
    deliverables: ['현장 1인 다캠 촬영 운용', 'K-POP 아이돌 포커스 직캠', '슬로우모션 및 짐벌 워크', '숏폼 릴스 전용 다이내믹 컷편집'],
    src: '/src/assets/images/fan_meet_poster_visual_1791135916569.jpg',
    videoSrc: 'https://wxzstudio.github.io/videos/portfolio-seoul-fashion.mp4',
    tags: ['Runway', 'Celebrity', 'Cinematic Cam', 'Event Video'],
    featured: false,
    span: 'col-span-1',
  },
  {
    id: 'high-and-gogo-fmcg-packaging',
    title: 'HIGH & GOGO / SAMYANG GLOBAL LOCALIZATION',
    titleKr: '하이앤고고 · 삼양식품 중국 수출용 패키지 & 비주얼',
    category: 'package',
    categoryLabel: 'Packaging & Social',
    client: 'high & gogo / 삼양식품 / 상쾌환',
    year: '2023 - 2024',
    description: 'Packaging design and localized marketing visuals tailored for Chinese consumer habits and health trends.',
    descriptionKr: '한국 식품 및 건강기능식품의 중국 수출을 위한 패키지 리뉴얼 및 샤오홍슈/도우인 커머스용 상세페이지, 모델 프로덕션 촬영 전과정 지원.',
    deliverables: ['수출용 패키지 레이아웃 리뉴얼', '중화권 타깃 상세페이지 기획/제작', '외국인 모델 섭외 및 스튜디오 촬영', '커머스 섬네일 A/B 테스트 비주얼'],
    src: '/src/assets/images/summer_drinks_packaging_1791135933394.jpg',
    tags: ['Packaging', 'Localization', 'China Commerce', 'FMCG'],
    featured: false,
    span: 'col-span-1',
  },
  {
    id: 'qoook-tech-summit-exhibition',
    title: 'QOOOK TECH SUMMIT & SPATIAL VMD',
    titleKr: '글로벌 테크 서밋 & QOOOK 전시 공간 비주얼',
    category: 'brand',
    categoryLabel: 'Brand & VI',
    client: '㈜ 쿼크미디어 (QOOOK Platform)',
    year: '2022 - 2024',
    description: 'Key visual identity and exhibition booth spatial experience design for cross-border commerce conferences.',
    descriptionKr: '대형 국제 박람회 및 테크 서밋의 메인 키비주얼(Key Visual) 디자인. 오프라인 부스 공간 그래픽, 포토월, 브로슈어에 이르는 통합 공간 VMD 연출.',
    deliverables: ['컨퍼런스 메인 키비주얼 설계', '전시 부스 동선 및 그래픽 월 VMD', '오프라인 리플렛 및 홍보물 출력 감리', '인터랙티브 웹 배너 시스템'],
    src: '/src/assets/images/tech_summit_keyvisual_1791135946591.jpg',
    tags: ['Key Visual', 'Spatial Design', 'Exhibition VMD', 'Conference'],
    featured: false,
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'luxury-holiday-special-visual',
    title: 'LUXURY HOLIDAY SPECIAL CAMPAIGN',
    titleKr: '홀리데이 스페셜 리미티드 에디션 비주얼',
    category: 'ai',
    categoryLabel: 'AI & Generative',
    client: 'Private Brand Collaboration',
    year: '2025',
    description: 'High-contrast nocturnal luxury aesthetic with golden lighting for festive brand promotional assets.',
    descriptionKr: '연말 리미티드 에디션을 위한 프리미엄 다크 무드 비주얼. 골드 리본과 정제된 흑요석 질감의 대비를 통해 브랜드의 하이엔드 아이덴티티를 극대화.',
    deliverables: ['시즌 한정판 비주얼 콘셉트', '다크 럭셔리 포토그래피 디렉팅', '소셜 프로모션 킷 구성', '디지털 사이니지 모션 포스터'],
    src: '/src/assets/images/holiday_special_campaign_1791135965088.jpg',
    tags: ['Luxury Mood', 'Campaign Visual', 'Holiday Edition', 'Editorial'],
    featured: false,
    span: 'col-span-1',
  }
];

export const STRENGTHS: StrengthItem[] = [
  {
    id: 'end-to-end',
    number: '01',
    title: 'End-to-End Content Production',
    titleKr: '기획부터 납품까지, 전 공정 원스톱 완수',
    subtitle: '기획 · 대본 · 촬영 · 컷편집 · 색보정 · 그래픽 · 인쇄',
    desc: '콘텐츠 제작의 모든 단계를 직접 실행 가능한 풀스택 크리에이터입니다. 외주 파편화로 인한 의사소통 비용과 딜레이를 최소화하며, 초기 콘셉트가 완성본까지 흔들림 없이 일관되게 관철됩니다.',
    descKr: '기획부터 촬영, 편집, 그래픽 디자인, 오프라인 출력에 이르기까지 콘텐츠의 제작 전 공정을 스케일업할 수 있는 내재화된 프로세스를 구축해 왔습니다. 불필요한 커뮤니케이션 비용을 없애고 즉시 현업에 투입되는 결과를 냅니다.',
    keyPoints: [
      '스토리보드 및 숏폼 대본 직접 작성',
      '전문 조명 세팅 및 현장 연출 디렉팅',
      '다빈치 리졸브 기반 시네마틱 색보정 (Color Grading)',
      '디지털 배포 및 오프라인 대형 인쇄 감리 대응'
    ],
    tags: ['Full Pipeline', 'Storyboarding', 'Direction', 'DaVinci Resolve', 'Print Ready']
  },
  {
    id: 'gear-autonomous',
    number: '02',
    title: 'Autonomous In-House Studio & Gear',
    titleKr: '자체 전문 장비 기반 단독 프로덕션 운영',
    subtitle: '시네마/풀프레임 바디 · 단렌즈군 · 무선조명 · 음향 장비 완비',
    desc: '외부 렌탈이나 외주 제작사에 의존하지 않고, 자체 보유한 전문 촬영 및 조명 장비를 통해 중소규모 상업 촬영, 제품 뷰티 컷, 숏폼 콘텐츠를 언제든 민첩하게 독립 실행합니다.',
    descKr: '촬영 장비를 기반으로 외주 섭외에 드는 리드 타임과 제작 비용을 획기적으로 절감하며, 브랜드가 원하는 급박한 일정에도 즉각적으로 고품질 결과물을 제작합니다.',
    keyPoints: [
      '풀프레임 카메라 및 전문 단/줌 렌즈 라인업',
      '소프트박스/COB 텅스텐 & RGB 지속광 조명 시스템',
      '무선 핀마이크 및 현장 사운드 모니터링',
      '이동형 프로덕션 키트로 전국/해외 로케이션 즉시 대응'
    ],
    tags: ['Owned Equipment', 'Zero Lead Time', 'Cost Efficiency', 'Solo Production']
  },
  {
    id: 'global-localization',
    number: '03',
    title: 'Cross-Border Localization (China & Korea)',
    titleKr: '중화권 특화 글로벌 플랫폼 최적화 비주얼 마케팅',
    subtitle: '샤오홍슈(小红书) · 도우인(抖音) · 틱톡 · 인스타그램',
    desc: '신세계면세점, 아모레퍼시픽, 삼양 등 국내 대표 브랜드의 중국 진출 콘텐츠를 수년간 전담하며, 현지 소비자의 스크롤을 멈추게 하는 썸네일 클릭률(CTR)과 알고리즘 친화적 영상 문법을 꿰뚫고 있습니다.',
    descKr: '중화권 시장으로 비즈니스를 확장하거나 글로벌 마케팅을 전개할 때, 현지 트렌드를 관통하는 비주얼 전략과 로컬라이징 콘텐츠로 가장 강력하고 실질적인 지원을 제공합니다.',
    keyPoints: [
      '샤오홍슈(RED) 爆款(바이럴) 썸네일 및 피드 설계',
      '도우인 3초 후킹(Hooking) 영상 구조 설계',
      '중국 현지 모델/크리에이터 섭외 및 촬영 커뮤니케이션',
      '문화적 맥락과 트렌드를 반영한 카피 및 비주얼 현지화'
    ],
    tags: ['Xiaohongshu', 'Douyin', 'TikTok', 'Viral Thumbnail', 'Localization']
  },
  {
    id: 'ai-creative-engine',
    number: '04',
    title: 'AI-Assisted Generative Workflow',
    titleKr: 'AI 기반 비주얼 생성 및 제작 효율 극대화',
    subtitle: 'Midjourney · ComfyUI · Runway · Stable Diffusion',
    desc: '단순한 디자인을 넘어 최신 생성형 AI 도구를 실무 파이프라인에 적극 도입하여, 초기 무드보드 탐색부터 초고화질 커머셜 비주얼 합성까지의 제작 생산성을 비약적으로 끌어올립니다.',
    descKr: '최근에는 AI 기반 이미지 및 영상 제작 툴을 콘텐츠 기획과 제작 과정에 적용하여, 제작 효율을 높이고 새로운 표현 방식을 실험하며 실질적인 비즈니스 임팩트로 연결합니다.',
    keyPoints: [
      'ComfyUI 기반 고해상도 제품/배경 커스텀 합성',
      'Midjourney 프롬프트 고도화를 통한 초단기 콘셉트 시각화',
      'Runway / Luma 기반 무드보드 무빙 샷 생성',
      'AI 생성물에 디자이너의 타이포그래피 & 후가공을 더한 완성도'
    ],
    tags: ['ComfyUI', 'Midjourney', 'Runway', 'AI Productivity', 'Prompt Engineering']
  }
];

export const SKILL_STACK = [
  { category: 'Design Disciplines', items: ['2D 그래픽 디자인', '브랜드 BI/VI 시스템', '광고/포스터 디자인', '패키지 지함 설계', '웹/앱 UI 디자인', '전시 공간 VMD'] },
  { category: 'Video & Motion', items: ['상업 영상 기획/대본', '현장 촬영 디렉팅', '프리미어 프로 컷편집', '애프터이펙트 모션그래픽', '다빈치 리졸브 색보정'] },
  { category: 'AI Tools & Tech', items: ['Midjourney v6', 'ComfyUI Workflow', 'Runway Gen-2/Gen-3', 'Stable Diffusion', 'Figma', 'Photoshop AI'] },
  { category: 'Global Platforms', items: ['샤오홍슈(小红书) 마케팅', '도우인(抖音) 숏폼', 'TikTok 글로벌', 'Instagram 피드 기획', 'WeChat 공식계정'] },
];
