// Complete Multilingual Data & Localization System (ZH / EN / KO)

export type Language = 'zh' | 'ko';

export const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ko';
  try {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved === 'zh' || saved === 'ko') return saved;
  } catch (e) {
    // private mode
  }
  return 'ko';
};

export interface LocalizedProject {
  id: string;
  category: 'brand' | 'video' | 'ai' | 'package';
  categoryLabel: { zh: string; en: string; ko: string };
  title: { zh: string; en: string; ko: string };
  client: { zh: string; en: string; ko: string };
  year: string;
  description: { zh: string; en: string; ko: string };
  deliverables: { zh: string[]; en: string[]; ko: string[] };
  videoSrc?: string;
  tags: { zh: string[]; en: string[]; ko: string[] };
  featured?: boolean;
}

export interface LocalizedCareer {
  id: string;
  company: { zh: string; en: string; ko: string };
  period: string;
  duration: { zh: string; en: string; ko: string };
  role: { zh: string; en: string; ko: string };
  type: { zh: string; en: string; ko: string };
  highlights: { zh: string[]; en: string[]; ko: string[] };
}

export interface LocalizedStrength {
  id: string;
  number: string;
  title: { zh: string; en: string; ko: string };
  subtitle: { zh: string; en: string; ko: string };
  desc: { zh: string; en: string; ko: string };
  keyPoints: { zh: string[]; en: string[]; ko: string[] };
  tags: { zh: string[]; en: string[]; ko: string[] };
}

export const I18N_PROJECTS: LocalizedProject[] = [
  {
    id: 'shinsegae-dutyfree',
    category: 'video',
    categoryLabel: {
      zh: '商业视频与短视频',
      en: 'Commercial & Video',
      ko: '상업 영상 & 숏폼'
    },
    title: {
      zh: '新世界免税店 × 中韩跨境美妆宣传战役',
      en: 'Shinsegae Duty Free Global Campaign',
      ko: '신세계면세점 중화권 글로벌 뷰티 캠페인'
    },
    client: {
      zh: '新世界免税店',
      en: 'Shinsegae Duty Free',
      ko: '신세계면세점'
    },
    year: '2023 - 2024',
    description: {
      zh: '主导策划并摄制新世界免税店中韩跨境短视频系列。将首尔都市奢华夜景与高端美妆完美融合，针对抖音平台算法优化，达成数百万次曝光与高转化。',
      en: 'Engineered high-conversion commercial short-form campaigns for Shinsegae Duty Free in Seoul, pairing nocturnal cityscapes with luxury skincare.',
      ko: '신세계면세점의 중화권 타깃 숏폼 영상 시리즈 기획·연출·촬영. 세련된 서울의 도시 야경과 프리미엄 뷰티 제품을 결합하여 높은 조회수와 전환을 견인.'
    },
    deliverables: {
      zh: ['短视频全案策划与分镜大纲', '现场双机位拍摄与电影级构图', '达芬奇色彩科学调色与特效合成', '抖音与TikTok高点击率封面设计'],
      en: ['Creative Concept & Scriptwriting', 'On-Site Cinematography & Lighting', 'DaVinci Resolve HDR Color Grading', 'Social Thumbnail Optimization'],
      ko: ['영상 기획 및 숏폼 대본 작성', '현장 촬영 디렉팅 & 카메라 세팅', '다빈치 리졸브 색보정 & 모션 그래픽', '도우인/틱톡 썸네일 최적화']
    },
    videoSrc: 'https://wxzstudio.github.io/videos/portfolio-shinsegae.mp4',
    tags: {
      zh: ['商业广告', '短视频', '免税美妆', '抖音营销'],
      en: ['Commercial', 'Short-form', 'Duty Free', 'Douyin'],
      ko: ['상업 광고', '숏폼', '면세 뷰티', '도우인 마케팅']
    },
    featured: true,
  },
  {
    id: 'amorepacific-social-assets',
    category: 'brand',
    categoryLabel: {
      zh: '品牌与视觉识别',
      en: 'Brand & Identity',
      ko: '브랜드 & VI'
    },
    title: {
      zh: '爱茉莉太平洋 (HERA · IOPE) 社交营销视觉体系',
      en: 'Amorepacific (HERA · IOPE) Social Visual Suite',
      ko: '아모레퍼시픽 헤라·아이오페 소셜 비주얼 에셋'
    },
    client: {
      zh: '爱茉莉太平洋集团',
      en: 'Amorepacific Group',
      ko: '아모레퍼시픽'
    },
    year: '2023 - 2025',
    description: {
      zh: '统筹爱茉莉太平洋旗下代表性品牌HERA（赫妍）与IOPE（艾诺碧）的小红书官方视觉。建立符合中国市场审美的高点击率图文规范与新潮排版系统。',
      en: 'Designed high-CTR Xiaohongshu social asset guidelines and product detail pages for leading Korean luxury skincare brands.',
      ko: '아모레퍼시픽 대표 브랜드 헤라와 아이오페의 샤오홍슈 소셜 미디어 비주얼 에셋 총괄. 클릭률과 브랜드 감도를 동시 만족하는 비주얼 가이드 수립.'
    },
    deliverables: {
      zh: ['小红书高点击率信息流封面', '电商新品上市详细介绍长图', '官方社媒视觉规范资产库', '跨境营销图文模板组件化'],
      en: ['High-CTR Xiaohongshu Feed Covers', 'Launch Detail Pages Layout', 'Official Visual Asset Guidelines', 'Cross-Border Graphic Components'],
      ko: ['샤오홍슈 피드 썸네일 디자인 (CTR 특화)', '신제품 런칭 상세페이지 레이아웃', '브랜드 톤앤매너 비주얼 에셋 가이드', '소셜 인터랙티브 비주얼']
    },
    tags: {
      zh: ['高端美妆', '社交物料', '点击率提升', '小红书'],
      en: ['K-Beauty', 'Social Assets', 'CTR Boost', 'Xiaohongshu'],
      ko: ['K-뷰티', '소셜 에셋', '클릭률 최적화', '샤오홍슈']
    },
    featured: true,
  },
  {
    id: 'ai-generative-visual-system',
    category: 'ai',
    categoryLabel: {
      zh: 'AI生成探索',
      en: 'AI Generative',
      ko: 'AI 생성 디자인'
    },
    title: {
      zh: 'AI生成视觉工作流与未来空间雕塑探索',
      en: 'AI Generative Synthesis & 3D Spatial Systems',
      ko: 'AI 제너레이티브 비주얼 워크플로우 & 3D 조형'
    },
    client: {
      zh: '独立创新研发实验室',
      en: 'Autonomous Creative Lab',
      ko: '자체 크리에이티브 R&D 랩'
    },
    year: '2024 - 2026',
    description: {
      zh: '深度结合 ComfyUI 节点工作流、Midjourney 与 3D 建筑有机造型，重构商业视觉出图管线，将概念验证到高精度成图周期缩短70%以上。',
      en: 'Advanced generative AI pipeline uniting ComfyUI, custom prompts, and biomimetic 3D forms, reducing commercial concept lead times by 70%.',
      ko: '최신 ComfyUI 워크플로우와 프롬프트 엔지니어링, 3D 조형을 결합한 차세대 비주얼 프로덕션 파이프라인. 상업 룩북과 콘셉트 시각화의 리드 타임을 70% 단축.'
    },
    deliverables: {
      zh: ['ComfyUI定制化图像生成工作流', 'Midjourney高精度商业提示词库', '未来主义参数化3D造型渲染', '超高分辨率多通道合成修图'],
      en: ['Custom ComfyUI Node Pipelines', 'Midjourney Commercial Prompt Library', 'Futuristic 3D Spatial Renders', 'High-Res Multi-Pass Compositing'],
      ko: ['ComfyUI 커스텀 파이프라인 구축', 'Midjourney 프롬프트 튜닝', '초현실 미래주의 3D 조형 시각화', '고해상도 커머셜 에셋 합성']
    },
    tags: {
      zh: ['AI生产力', 'ComfyUI', 'Midjourney', '未来概念'],
      en: ['AI Workflow', 'ComfyUI', 'Midjourney', 'Future Concept'],
      ko: ['AI 워크플로우', 'ComfyUI', 'Midjourney', '미래 콘셉트']
    },
    featured: true,
  },
  {
    id: 'eke-organic-skincare-vi',
    category: 'brand',
    categoryLabel: {
      zh: '品牌与视觉识别',
      en: 'Brand & Identity',
      ko: '브랜드 & VI'
    },
    title: {
      zh: 'eke 有机美妆品牌视觉全案与包材工程',
      en: 'eke Cosmetics Full Brand Identity System',
      ko: '이케이(eke) 유기농 코스메틱 BI/VI 및 패키지'
    },
    client: {
      zh: '三友生命科学 (eke)',
      en: 'Samwoo Life Science (eke)',
      ko: '삼우생명과학㈜ (eke)'
    },
    year: '2021 - 2022',
    description: {
      zh: '为纯天然极简护肤品牌 eke 构建完整品牌识别系统，包含定制字标、洞石色调外包装、容器丝网印工艺规范及全套线下印刷品落地。',
      en: 'Comprehensive brand identity system for organic skincare eke, featuring bespoke typography, travertine-toned packaging, and print standards.',
      ko: '내추럴 럭셔리 코스메틱 브랜드 eke의 브랜드 로고마크, 트래버틴 톤의 패키지 지함 및 용기 실크인쇄, 소셜미디어 런칭 비주얼 아이덴티티 전면 구축.'
    },
    deliverables: {
      zh: ['品牌VI视觉规范手册制定', '化妆品容器与包装外盒工业设计', '线下特种纸选材与印刷实地监理', '品牌创刊号全套静物大片拍摄'],
      en: ['Brand Identity Guidelines Manual', 'Cosmetic Packaging & Box Structural Design', 'Paper Selection & Print Production Supervision', 'Launch Still-Life Art Direction'],
      ko: ['브랜드 BI/VI 가이드라인 수립', '화장품 용기 및 패키지 박스 설계', '오프라인 인쇄 감리 및 지질 선정', '런칭 캠페인 화보 기획']
    },
    tags: {
      zh: ['品牌设计', '包装设计', '视觉识别', '美妆护肤'],
      en: ['Branding', 'Package Design', 'VI System', 'Cosmetics'],
      ko: ['브랜딩', '패키지 디자인', 'VI 시스템', '코스메틱']
    },
    featured: false,
  },
  {
    id: 'seoul-fashion-runway-reel',
    category: 'video',
    categoryLabel: {
      zh: '商业视频与短视频',
      en: 'Commercial & Video',
      ko: '상업 영상 & 숏폼'
    },
    title: {
      zh: '首尔时装周秀场记录与明星直拍剪辑',
      en: 'Seoul Fashion Week Runway & Celebrity Reel',
      ko: '서울패션위크 런웨이 & 아티스트 직캠'
    },
    client: {
      zh: '首尔时装周 / ZEROBASEONE 直拍',
      en: 'Seoul Fashion Week / ZEROBASEONE Cam',
      ko: '서울패션위크 / ZEROBASEONE 현장 촬영'
    },
    year: '2024',
    description: {
      zh: '在时装周现场单人执机抓拍走秀动态与明星后台瞬间。精准把控现场多变灯光，通过慢门特写与高速机位捕捉极具情绪张力的短视频成片。',
      en: 'High-energy fashion runway documentation and dynamic artist side-shot production featuring cinematic handheld gimbal and HDR color grading.',
      ko: '패션위크 런웨이 및 K-POP 셀러브리티 현장 촬영. 현장의 다이내믹한 텐션을 즉각적으로 포착하고 고속 숏폼 릴스로 가공하여 글로벌 팬덤에 확산.'
    },
    deliverables: {
      zh: ['现场单兵多机位高速拍摄', '明星舞台与秀场特写镜头', '专业稳定器行进运镜设计', '社交媒体快节奏爆款节奏剪辑'],
      en: ['Solo Multi-Angle High-Speed Capture', 'Artist Stage Close-Up Direction', 'Gimbal Stabilization Choreography', 'Fast-Paced Social Montage Editing'],
      ko: ['현장 1인 다캠 촬영 운용', 'K-POP 아이돌 포커스 직캠', '슬로우모션 및 짐벌 워크', '숏폼 전용 다이내믹 컷편집']
    },
    videoSrc: 'https://wxzstudio.github.io/videos/portfolio-seoul-fashion.mp4',
    tags: {
      zh: ['时装周秀场', '明星直拍', '电影感机位', '活动记录'],
      en: ['Fashion Runway', 'Celebrity', 'Cinematic Cam', 'Event Video'],
      ko: ['패션위크', '셀러브리티', '시네마틱 영상', '행사 스케치']
    },
    featured: false,
  },
  {
    id: 'high-and-gogo-fmcg-packaging',
    category: 'package',
    categoryLabel: {
      zh: '包装与社交物料',
      en: 'Packaging & Social',
      ko: '패키지 & 소셜'
    },
    title: {
      zh: 'high & gogo · 三养食品中国出海包装与视觉',
      en: 'high & gogo · Samyang Global Export Packaging',
      ko: '하이앤고고 · 삼양식품 중국 수출용 패키지 & 비주얼'
    },
    client: {
      zh: 'high & gogo / 三养食品 / 上快丸',
      en: 'high & gogo / Samyang Food / Sangwhahwan',
      ko: '하이앤고고 / 삼양식품 / 상쾌환'
    },
    year: '2023 - 2024',
    description: {
      zh: '为韩国知名快消及大健康品牌进军中国市场提供全套本地化视觉重构。涵盖中国消费者审美偏好的外包装改良、电商主图及现场模特拍摄。',
      en: 'Packaging design renewals and localized e-commerce visual assets tailored to Chinese consumer behavior for Korean food and health brands.',
      ko: '한국 식품 및 건강기능식품의 중국 수출을 위한 패키지 리뉴얼 및 샤오홍슈/도우인 커머스용 상세페이지, 모델 프로덕션 촬영 전과정 지원.'
    },
    deliverables: {
      zh: ['中国市场定制化包装版面升级', '小红书与天猫电商产品详情页', '商业模特物色与专业影棚拍摄', '跨文化消费心理视觉设计'],
      en: ['China Market Packaging Layout Renewal', 'E-Commerce Product Detail Pages', 'Commercial Model Casting & Studio Shoot', 'Cross-Border Localization Strategy'],
      ko: ['수출용 패키지 레이아웃 리뉴얼', '중화권 타깃 상세페이지 기획/제작', '외국인 모델 섭외 및 스튜디오 촬영', '커머스 썸네일 비주얼']
    },
    tags: {
      zh: ['包装升级', '出海本土化', '快消品', '电商视觉'],
      en: ['Packaging', 'Localization', 'FMCG', 'E-Commerce'],
      ko: ['패키지', '현지화 전략', '식품 유통', '이커머스']
    },
    featured: false,
  },
  {
    id: 'qoook-tech-summit-exhibition',
    category: 'brand',
    categoryLabel: {
      zh: '品牌与视觉识别',
      en: 'Brand & Identity',
      ko: '브랜드 & VI'
    },
    title: {
      zh: 'QOOOK 跨境科技峰会主视觉与展陈空间',
      en: 'QOOOK Global Tech Summit & Spatial VMD',
      ko: '글로벌 테크 서밋 & QOOOK 전시 공간 비주얼'
    },
    client: {
      zh: '夸克媒体 (QOOOK 海淘平台)',
      en: 'QuarkMedia (QOOOK Platform)',
      ko: '㈜ 쿼크미디어 (QOOOK)'
    },
    year: '2022 - 2024',
    description: {
      zh: '大型跨境电商行业峰会主视觉全案开发。打通线下展台空间动线规划、大型主幕墙Art Wall、宣传手册至线上互动主页的一体化视觉。',
      en: 'Key visual identity and exhibition spatial experience design for international cross-border tech summits and convention booths.',
      ko: '대형 국제 박람회 및 테크 서밋의 메인 키비주얼 디자인. 오프라인 부스 공간 그래픽, 포토월, 브로슈어에 이르는 통합 공간 VMD 연출.'
    },
    deliverables: {
      zh: ['峰会主视觉全套规范设计', '展厅动线空间与美陈展示规划', '线下大型喷绘与宣传品输出监督', '动态主屏迎宾动画设计'],
      en: ['Conference Key Visual System', 'Booth Spatial Flow & VMD Layout', 'Large-Format Print Production Oversight', 'Digital Signage Welcome Motion'],
      ko: ['컨퍼런스 메인 키비주얼 설계', '전시 부스 동선 및 그래픽 월 VMD', '오프라인 리플렛 및 홍보물 출력 감리', '디지털 사이니지 모션 배너']
    },
    tags: {
      zh: ['主视觉设计', '空间美陈', '展会展陈', '会议全案'],
      en: ['Key Visual', 'Spatial Design', 'Exhibition VMD', 'Conference'],
      ko: ['키비주얼', '공간 디자인', '전시 VMD', '컨퍼런스']
    },
    featured: false,
  },
  {
    id: 'luxury-holiday-special-visual',
    category: 'ai',
    categoryLabel: {
      zh: 'AI生成探索',
      en: 'AI Generative',
      ko: 'AI 생성 디자인'
    },
    title: {
      zh: '黑金暗调奢华假日限定艺术视觉',
      en: 'Luxury Holiday Limited Edition Campaign',
      ko: '홀리데이 스페셜 리미티드 에디션 비주얼'
    },
    client: {
      zh: '独立高端品牌定制合作',
      en: 'Private Brand Collaboration',
      ko: '프라이빗 브랜드 컬래버레이션'
    },
    year: '2025',
    description: {
      zh: '专为年末假日限定打造的暗调高奢视觉大片。利用黑曜石哑光与高反射金质丝带的对比，塑造极致克制、沉静且尊贵的现代品牌气质。',
      en: 'Nocturnal luxury aesthetic featuring golden studio reflections and obsidian textures engineered for prestige brand festive campaigns.',
      ko: '연말 리미티드 에디션을 위한 프리미엄 다크 무드 비주얼. 골드 리본과 정제된 흑요석 질감의 대비를 통해 브랜드의 하이엔드 아이덴티티를 극대화.'
    },
    deliverables: {
      zh: ['限定版视觉概念方向把控', '暗调商业产品布光摄影执行', '数字标牌高保真动态海报', '社交圈层限量传播物料'],
      en: ['Limited Edition Concept Direction', 'Nocturnal Studio Lighting Execution', 'High-Fidelity Motion Posters', 'Exclusive Social Campaign Assets'],
      ko: ['시즌 한정판 비주얼 콘셉트', '다크 럭셔리 포토그래피 디렉팅', '디지털 사이니지 모션 포스터', '소셜 프로모션 키트 구성']
    },
    tags: {
      zh: ['奢华暗调', '节日限定', '商业大片', '视觉特辑'],
      en: ['Luxury Mood', 'Campaign Visual', 'Holiday Edition', 'Editorial'],
      ko: ['럭셔리 무드', '캠페인 비주얼', '홀리데이 에디션', '에디토리얼']
    },
    featured: false,
  }
];

export const I18N_CAREER: LocalizedCareer[] = [
  {
    id: 'icon',
    company: {
      zh: 'Icon Global',
      en: 'Icon Global Co., Ltd.',
      ko: '㈜ 아이콘글로벌 (Icon Global)'
    },
    period: '2022.01 ~ 2026.02',
    duration: {
      zh: '4年 2个月',
      en: '4 Years 2 Mos',
      ko: '4년 2개월'
    },
    role: {
      zh: '创意团队 · 课长 / 组长 (Team Lead)',
      en: 'Creative Team · Team Lead / Director',
      ko: '크리에이티브팀 · 과장 / 파트장'
    },
    type: {
      zh: '商业摄像摄影 · 抖音/小红书视觉总监',
      en: 'Cinematography & Cross-Border Social Visuals',
      ko: '영상 촬영·기획 / 샤오홍슈·도우인 비주얼 총괄'
    },
    highlights: {
      zh: [
        '主导中国短视频平台（抖音 / TikTok）内容策划与实拍导演，涵盖剧本撰写、镜头设计与后期达芬奇调色',
        '负责新世界免税店及一线美妆品牌的针对中韩跨境营销视频制作，精准提升完播率、播放量与商业转化',
        '全权把控小红书（Xiaohongshu）视觉营销，打造高CTR爆款封面、信息流图文及电商产品详情页',
        '统筹爱茉莉太平洋旗下 HERA（赫妍）、IOPE（艾诺碧）、VITAL BEAUTIE 等品牌的社交媒体视觉资产规范',
        '执行 high & gogo、三养食品、上快丸等健康消费品牌的中国出海视觉本地化，管理拍摄预算与演职人员调度'
      ],
      en: [
        'Directed Chinese short-form video content (Douyin/TikTok), handling scripting, lighting setup, and DaVinci color grading.',
        'Produced cross-border luxury commercial campaigns for Shinsegae Duty Free and premier cosmetics brands, driving viral metrics.',
        'Supervised Xiaohongshu visual assets, engineering high-CTR feed covers and e-commerce launch pages for K-beauty giants.',
        'Managed social brand identity guidelines for Amorepacific flagship lines including HERA, IOPE, and Vital Beautie.',
        'Executed localized branding and commercial productions for food and health brands expanding into China (Samyang, high & gogo).'
      ],
      ko: [
        '중국 숏폼 콘텐츠(Douyin / TikTok) 기획 및 제작: 브랜드별 타겟 맞춤형 영상 기획, 대본 작성 및 촬영 디렉팅 수행',
        '신세계면세점 등 주요 면세 및 뷰티 브랜드의 중화권 마케팅 영상 제작 및 조회수/전환 최적화',
        '샤오홍슈(Xiaohongshu) 비주얼 마케팅: 클릭률(CTR) 제고를 위한 썸네일 디자인 및 상세페이지 이미지 제작',
        '아모레퍼시픽(헤라, 아이오페, 바이탈뷰티) K-뷰티 대표 브랜드의 소셜 미디어 맞춤형 비주얼 에셋 관리',
        '하이앤고고, 삼양, 상쾌환 등 식품 및 건강기능식품 브랜드의 중국 시장 진출을 위한 콘텐츠 현지화 및 모델 섭외'
      ]
    }
  },
  {
    id: 'samwoo',
    company: {
      zh: '三友生命科学 (Samwoo Life Science)',
      en: 'Samwoo Life Science Co., Ltd.',
      ko: '삼우생명과학㈜ (Samwoo Life Science)'
    },
    period: '2020.12 ~ 2022.01',
    duration: {
      zh: '1年 2个月',
      en: '1 Year 2 Mos',
      ko: '1년 2개월'
    },
    role: {
      zh: '设计团队 · 代理 / 资深设计师',
      en: 'Design Team · Senior Designer',
      ko: '디자인팀 · 대리'
    },
    type: {
      zh: '品牌BI/VI识别体系构建 · 产品宣传片导演',
      en: 'Brand BI/VI Systems & Product Filmmaking',
      ko: '브랜드 BI/VI 시스템 구축 / 제품 홍보 영상'
    },
    highlights: {
      zh: [
        '主导打造自主美妆品牌“eke”及集团相关品牌的视觉识别系统（BI/VI），制定全面视觉规范手册',
        '负责产品外包装设计、打样输出与供应链色彩校准，确保货架与电商端视觉质感统一',
        '主导产品宣传视频与微电影的全流程制作（分镜绘制、摄影布光、现场导演、达芬奇调色）',
        '设计 Instagram 及小红书双平台官方账号视觉矩阵与排版网格，强化品牌高阶调性'
      ],
      en: [
        'Established full brand identity (BI/VI) and guidelines for natural cosmetics brand eke.',
        'Engineered structural product packaging, label silk-screening, and supply chain color proofing.',
        'Directed promotional product videos from storyboard scripting to production filming and color grading.',
        'Designed social media feed grid layouts across Instagram and Xiaohongshu to elevate brand prestige.'
      ],
      ko: [
        '자사 뷰티 브랜드 \'이케이(eke)\' 및 삼우 관련 브랜드 아이덴티티(BI/VI) 구축 및 브랜드 가이드라인 수립',
        '브랜드 로고, 컬러 가이드, 비주얼 시스템을 통한 일관된 글로벌 브랜드 이미지 확립',
        '멀티미디어 콘텐츠 기획: 제품 홍보 영상 스토리보드 작성, 현장 연출 및 후반 편집',
        '인스타그램 & 샤오홍슈 공식 계정 피드 그리드 설계 및 톤앤매너에 맞춘 비주얼 콘텐츠 제작'
      ]
    }
  },
  {
    id: 'quark',
    company: {
      zh: '夸克媒体 (QuarkMedia)',
      en: 'QuarkMedia Co., Ltd.',
      ko: '㈜ 쿼크미디어 (QuarkMedia)'
    },
    period: '2017.01 ~ 2018.07',
    duration: {
      zh: '1年 7个月',
      en: '1 Year 7 Mos',
      ko: '1년 7개월'
    },
    role: {
      zh: '设计团队 · 网页与空间展陈设计师',
      en: 'Design Team · UI & Spatial Designer',
      ko: '디자인팀 · 사원 / 팀원'
    },
    type: {
      zh: '跨境电商UI设计 · 展会空间设计(VMD)',
      en: 'E-Commerce Platform & Exhibition VMD',
      ko: '해외직구 웹디자인 / 전시회 기획 및 공간 디자인'
    },
    highlights: {
      zh: [
        '负责跨境海淘电商平台“QOOOK”主站界面视觉、活动大促专题页及电商详情页视觉设计',
        '负责国内外大型行业博览会展台空间设计（VMD）、展厅动线规划与全套线下宣传物料设计输出',
        '负责企业级官方网站界面与品牌专题视觉维护'
      ],
      en: [
        'Designed e-commerce interface and landing promotions for global shopping platform QOOOK.',
        'Orchestrated exhibition booth spaces, visitor traffic flow, and large-format promotional graphics.',
        'Maintained corporate websites and campaign digital portals.'
      ],
      ko: [
        '해외 직구 웹사이트 플랫폼 \'QOOOK(쿠크)\' 메인, 상세 페이지, 이벤트 랜딩 페이지 디자인 및 퍼블리싱 관리',
        '온·오프라인 전시 콘텐츠 기획 및 비주얼 아이덴티티(VI) 설계, 전시 부스 디자인 및 공간 큐레이션',
        '기업 공식 홈페이지 및 브랜드 사이트 비주얼 디자인 및 유지보수'
      ]
    }
  },
  {
    id: 'early',
    company: {
      zh: '北京丽贝亚建筑装饰 & 王府井百货 (早期资历)',
      en: 'Beijing Architecture & Wangfujing (Early Foundation)',
      ko: '베이징 리베이야 & 왕푸징 백화점 (초기 경력)'
    },
    period: '2012.07 ~ 2016.12',
    duration: {
      zh: '4年 6个月',
      en: '4 Years 6 Mos',
      ko: '4년 6개월'
    },
    role: {
      zh: '视觉设计 · 空间艺术墙 · 广告美陈',
      en: 'Visual Designer · Art Wall & VMD Specialist',
      ko: '시각디자인 / 공간 아트월 / 광고디자인'
    },
    type: {
      zh: '酒店识别系统 · 空间艺术墙图形 · 百货商场美陈',
      en: 'Hotel BI · Spatial Art Walls · Department Store VMD',
      ko: '호텔 BI · 환경 특화 Art Wall · 백화점 VMD'
    },
    highlights: {
      zh: [
        '北京丽贝亚建筑装饰工程：参与高端酒店品牌识别设计，负责大堂与客房艺术背景墙（Art Wall）图形系统开发',
        '王府井百货：负责春节、国庆等核心大促视觉主画面（Key Visual）、商场大型海报与中庭美陈陈列（VMD）',
        '哈尔滨地铁报社：负责主流地铁报纸媒介广告版面规划与商业客户视觉定制呈现'
      ],
      en: [
        'Beijing Libeya: Engineered hotel visual identities and bespoke architectural Art Wall graphics.',
        'Wangfujing Department Store: Spearheaded festival promotional key visuals, atrium VMD installations, and signage.',
        'Harbin Metro Media: Planned print publication layouts and tailored media advertising visuals.'
      ],
      ko: [
        '베이징 리베이야 건축공사: 프리미엄 호텔 브랜드 아이덴티티 및 호텔 로비/객실 포인트 Art Wall 패턴 디자인',
        '왕푸징 백화점: 주요 명절(춘절, 국경절) 대형 프로모션 포스터 및 백화점 내부 팝업존 VMD 연출 설계',
        '하얼빈 지하철 신문사: 신문 지면 광고 기획 및 지면 비주얼 레이아웃 제작'
      ]
    }
  }
];

export const I18N_STRENGTHS: LocalizedStrength[] = [
  {
    id: 'end-to-end',
    number: '01',
    title: {
      zh: '全流程闭环内容制作',
      en: 'End-to-End Content Production',
      ko: '기획부터 납품까지 전 공정 완수'
    },
    subtitle: {
      zh: '策划 · 剧本 · 实拍 · 剪辑 · 调色 · 视觉输出',
      en: 'Strategy · Scripting · Cinematography · Editing · Color · Delivery',
      ko: '기획 · 대본 · 촬영 · 컷편집 · 색보정 · 그래픽 · 인쇄'
    },
    desc: {
      zh: '具备从前期创意策划、分镜脚本撰写，到现场专业双机位布光拍摄、达芬奇色彩科学调色与平面物料输出的全闭环制作能力。彻底消除多方外包造成的沟通折损与延误，让最初的创意高精度落地。',
      en: 'A unified single-creator pipeline spanning initial concept, storyboard drafting, commercial camera direction, DaVinci Resolve color grading, and final delivery—eliminating delegation overhead.',
      ko: '기획부터 촬영, 편집, 그래픽 디자인, 오프라인 출력에 이르기까지 콘텐츠의 제작 전 공정을 스케일업할 수 있는 내재화된 프로세스를 구축했습니다. 불필요한 커뮤니케이션 비용을 줄이고 즉시 실무에 투입되는 완성도 높은 결과물을 보장합니다.'
    },
    keyPoints: {
      zh: [
        '独立撰写分镜脚本与短视频3秒抓人开篇',
        '精通专业现场摄制与运镜调度',
        '基于达芬奇色彩科学进行高质感调色处理',
        '线上数字化多尺寸分发与线下特种印刷监理'
      ],
      en: [
        'Direct storyboarding & high-retention video scriptwriting',
        'Professional cinematic lighting & camera choreography',
        'DaVinci Resolve HDR color grading and audio mastering',
        'Digital omnichannel sizing & physical print inspection'
      ],
      ko: [
        '스토리보드 및 숏폼 대본 직접 작성',
        '전문 카메라 세팅 및 현장 연출 디렉팅',
        '다빈치 리졸브 기반 시네마틱 색보정',
        '디지털 배포 및 오프라인 대형 인쇄 감리 대응'
      ]
    },
    tags: {
      zh: ['全流程制作', '分镜脚本', '摄影执导', '达芬奇调色', '物料监理'],
      en: ['Full Pipeline', 'Storyboarding', 'Direction', 'DaVinci Resolve', 'Print Ready'],
      ko: ['전 공정 내재화', '스토리보드', '촬영 디렉팅', '다빈치 리졸브', '인쇄 감리']
    }
  },
  {
    id: 'gear-autonomous',
    number: '02',
    title: {
      zh: '自备专业影视器材独立摄制',
      en: 'Autonomous In-House Studio & Gear',
      ko: '자체 전문 장비 기반 단독 프로덕션'
    },
    subtitle: {
      zh: 'Sony A7M4 全画幅 · 三脚架 · 稳定器 · 无线麦克',
      en: 'Cinema Full-Frame Bodies · Prime Lens Set · Studio Lighting · Wireless Audio',
      ko: 'Sony A7M4 풀프레임 · 삼각대 · 짐벌 · 무선 마이크'
    },
    desc: {
      zh: '不依赖外部设备租赁或繁琐外包，自备 Sony A7M4 全画幅拍摄系统与机动装备，敏捷、独立地承接中小型商业广告、美妆护肤静物特写与快节奏社媒短视频，为品牌节省50%以上的时间与财务成本。',
      en: 'Armed with an owned arsenal of full-frame cinema cameras, prime optics, and studio lighting, allowing rapid-response commercial shoots without rental lead time.',
      ko: '외부 렌탈이나 외주 제작사에 의존하지 않고, 자체 보유한 Sony A7M4 풀프레임 시스템과 기동 장비를 통해 중소규모 상업 촬영, 제품 뷰티 컷, 숏폼 콘텐츠를 언제든 민첩하게 독립 실행합니다.'
    },
    keyPoints: {
      zh: [
        'Sony A7M4 全画幅机身与高解析镜头组',
        '专业三脚架与稳定器系统',
        '无线麦克风与现场收音监听',
        '机动装备箱，随时响应本土及跨国取景'
      ],
      en: [
        'Full-frame cinema bodies & high-resolution prime optics',
        'COB tungsten & full-color RGB studio lighting systems',
        'Wireless lavalier microphones & field audio monitoring',
        'Modular mobile flight kit ready for on-location deployment'
      ],
      ko: [
        'Sony A7M4 풀프레임 바디와 고해상 렌즈',
        '전문 삼각대 및 짐벌 시스템',
        '무선 마이크 및 현장 사운드 모니터링',
        '기동성 장비로 국내외 로케이션 즉시 대응'
      ]
    },
    tags: {
      zh: ['自备器材', '零租借延迟', '高效省本', '单兵作战'],
      en: ['Owned Equipment', 'Zero Lead Time', 'Cost Efficiency', 'Solo Production'],
      ko: ['자체 보유 장비', '신속 실행', '비용 절감', '단독 프로덕션']
    }
  },
  {
    id: 'global-localization',
    number: '03',
    title: {
      zh: '中韩跨境社媒本土化营销',
      en: 'Cross-Border Localization (China & Korea)',
      ko: '중화권 특화 글로벌 플랫폼 최적화'
    },
    subtitle: {
      zh: '小红书 (RED) · 抖音 (Douyin) · TikTok · Instagram',
      en: 'Xiaohongshu · Douyin · TikTok · Instagram',
      ko: '샤오홍슈(小红书) · 도우인(抖音) · 틱톡 · 인스타그램'
    },
    desc: {
      zh: '常年深耕新世界免税店、爱茉莉太平洋、三养等知名品牌的对华传播。深刻洞察小红书爆款封面逻辑与抖音3秒完播率心智，运用最地道的文化语境为品牌带来精准曝光。',
      en: 'Years dedicated to China-bound marketing for leading Korean brands, mastering Xiaohongshu CTR mechanics and Douyin visual retention psychology.',
      ko: '신세계면세점, 아모레퍼시픽, 삼양 등 국내 대표 브랜드의 중국 진출 콘텐츠를 수년간 전담하며, 현지 소비자의 스크롤을 멈추게 하는 썸네일 클릭률(CTR)과 알고리즘 친화적 영상 문법을 꿰뚫고 있습니다.'
    },
    keyPoints: {
      zh: [
        '小红书爆款信息流封面与千人千面视觉设计',
        '抖音3秒抓人黄金视觉结构与爆款节奏控制',
        '中韩双语顺畅对接、本地外籍模特物色与沟通',
        '贴合当代青年消费心理的文案与视觉本地化'
      ],
      en: [
        'Xiaohongshu viral feed cover & CTR-optimized typography',
        'Douyin 3-second hook structural choreography',
        'Bilingual coordination & international model casting',
        'Culturally attuned local messaging and creative adaptation'
      ],
      ko: [
        '샤오홍슈(RED) 爆款(바이럴) 썸네일 및 피드 설계',
        '도우인 3초 후킹(Hooking) 영상 구조 설계',
        '중국 현지 모델/크리에이터 섭외 및 촬영 커뮤니케이션',
        '문화적 맥락과 트렌드를 반영한 카피 및 비주얼 현지화'
      ]
    },
    tags: {
      zh: ['小红书营销', '抖音短视频', '爆款封面', '跨境本地化'],
      en: ['Xiaohongshu', 'Douyin', 'TikTok', 'Viral Thumbnail', 'Localization'],
      ko: ['샤오홍슈', '도우인', '틱톡', '바이럴 썸네일', '현지화 전략']
    }
  },
  {
    id: 'ai-creative-engine',
    number: '04',
    title: {
      zh: 'AI生成技术重构创意生产力',
      en: 'AI-Assisted Generative Workflow',
      ko: 'AI 기반 비주얼 생성 및 제작 효율 극대화'
    },
    subtitle: {
      zh: 'Midjourney · ComfyUI · Runway · Stable Diffusion',
      en: 'Midjourney · ComfyUI · Runway · Stable Diffusion',
      ko: 'Midjourney · ComfyUI · Runway · Stable Diffusion'
    },
    desc: {
      zh: '突破传统设计工具有限边界，将最前沿的生成式AI工具深度融合进实际商业流程。从初期风格概念探索、商业大片分镜预演，到超写实产品场景合成，极大提高输出产能。',
      en: 'Embedding state-of-the-art generative AI into commercial pipelines—from rapid concept moodboarding to photorealistic commercial composites.',
      ko: '단순한 디자인을 넘어 최신 생성형 AI 도구를 실무 파이프라인에 적극 도입하여, 초기 무드보드 탐색부터 초고화질 커머셜 비주얼 합성까지의 제작 생산성을 비약적으로 끌어올립니다.'
    },
    keyPoints: {
      zh: [
        'ComfyUI 节点式高精度商业产品与场景定制合成',
        'Midjourney 提示词工程实现小时级概念探索与提案',
        'Runway 动态影像生成辅助分镜与动态情绪预演',
        'AI生成资产叠加专业平面排版与色彩修正，保证商业严谨度'
      ],
      en: [
        'ComfyUI node-based high-resolution product compositing',
        'Midjourney prompt engineering for same-day concept pitches',
        'Runway moving shot synthesis for video animatics',
        'Refining AI assets with master typography and color fidelity'
      ],
      ko: [
        'ComfyUI 기반 고해상도 제품/배경 커스텀 합성',
        'Midjourney 프롬프트 고도화를 통한 초단기 콘셉트 시각화',
        'Runway 기반 무드보드 무빙 샷 생성',
        'AI 생성물에 디자이너의 타이포그래피 & 후가공을 더한 완성도'
      ]
    },
    tags: {
      zh: ['ComfyUI', 'Midjourney', 'Runway', 'AI生产力', '提示词工程'],
      en: ['ComfyUI', 'Midjourney', 'Runway', 'AI Productivity', 'Prompt Engineering'],
      ko: ['ComfyUI', 'Midjourney', 'Runway', 'AI 생산성', '프롬프트 엔지니어링']
    }
  }
];

export const I18N_UI = {
  zh: {
    nav: {
      brand: '郑灿峰',
      title: '平面设计师·摄影师',
      overview: '首页概览',
      experience: '个人经历',
      works: '精选项目',
      capabilities: '核心优势',
      contact: '联系合作',
      portfolioDoc: '作品集下载',
      getInTouch: '预约合作',
      menu: '导航菜单',
    },
    hero: {
      status: '可承接 Q2/Q3 项目合作',
      seoulTime: '首尔时间',
      disciplines: '平面设计 / 商业摄影摄像 / 品牌架构',
      roleBadge: '13年资深平面设计师 · 摄影师',
      headline1: '让目光停留，',
      headline2: '让心动发生。',
      narrative1: '视觉设计 · 商业摄制 · 达芬奇调色 · 生成式 AI 工作流',
      narrative2: '自备专业摄影器材与机动装备，独立完成中小型商业广告与短视频制作。',
      btnExplore: '浏览精选作品',
      btnContact: '预约合作',
      statExp: '13年+ 从业资历',
      statProjects: '120件+ 商业项目交付',
      statBrands: '新世界免税店 · 爱茉莉太平洋',
      scroll: '向下滚动探索',
    },
    experience: {
      tag: '个人档案与资历',
      title: '13年实操沉淀。',
      subtitle: '自备专业影视器材 · 全流程端到端独立制作',
      portraitBadge: '首尔 · 1994年生 (32岁)',
      tierBadge: '13年资深总监',
      quote: '“为了绝不妥协内容品质，我将策划、摄影摄像、达芬奇调色到AI生成全链条内化为单兵作战体系。”',
      bioP1: '设计专业出身，扎实奠定视觉思维底蕴。自2021年起作为多家国际知名品牌的核心创意伙伴，以自有专业影视器材独立完成策划大纲、拍摄、调色至交付的全流程。',
      bioP2: '凭借自有专业摄影器材与机动装备，打破传统外包长周期痛点，敏捷执行中小型商业广告与爆款短视频。',
      bioP3: '在品牌出海与中韩跨境社媒中，提供具备高点击率的视觉策略。',
      metrics: [
        { value: 13, suffix: '+', unit: '年 从业资历', sub: '2013-2026 深耕视觉设计与影像' },
        { value: 120, suffix: '+', unit: '件 商业交付', sub: '涵盖品牌全案、TVC、短视频与包装' },
        { value: 1500, suffix: '', unit: '万+ 次 跨国曝光', sub: '小红书 · 抖音 · TikTok爆款内容' },
        { value: 100, suffix: '%', unit: '自备独立设备', sub: '零租赁等待 · 端到端极速响应' },
      ],
      careerHistoryTag: '工作经历与实绩',
      careerHistoryTitle: '职业履历与商业实绩 (共13年)',
      education: '哈尔滨轻工业学校大学 视觉传达设计毕业',
      directTouchpoint: '快速联络方式',
      location: '首尔特别市 广津区 紫阳洞',
      phone: '010-****-8388',
      copy: '复制',
      copied: '已复制',
      coreDuties: '核心职责与商业贡献',
      stats: {
        exp: '13+ 年 从业资历',
        projects: '120+ 商业交付',
        views: '1500万+ 跨国曝光',
        gear: '100% 自备器材',
      },
      bio: '设计专业出身，扎实奠定视觉思维底蕴。自2021年起作为多家知名品牌的核心创意伙伴，构建起涵盖策划大纲、实地拍摄、后期剪辑调色、平面设计到线下印刷交付的全流程内生化制作体系。',
      careerHistory: '职业履历与商业实绩 (共13年)',
      naverPortfolio: '作品集下载',
    },
    projects: {
      tag: '精选商业案例',
      title: '精选商业案例。',
      groupVisual: '平面作品',
      groupFilm: '视频作品',
      subtitle: '新世界免税店、爱茉莉太平洋、eke等品牌商业项目。点击卡片可查看高清成片与详细交付清单。',
      all: '全部项目',
      inspect: '查看详情',
      client: '合作客户',
      year: '交付年份',
      deliverables: '交付范围与成果',
      close: '关闭',
      verified: '作品集下载',
    },
    strengths: {
      tag: '核心优势与能力',
      title: '设备自备 · 独立交付。',
      subtitle: '无需外包等待，以一线摄制经验与AI生成速度直接解决商业诉求。',
      gearTitle: '商业影视摄制与色彩科学',
      gearSubtitle: '全画幅相机 · 达芬奇色彩科学 · 机动装备箱',
      gearReady: '随时出勤部署',
      skillTitle: '生成式 AI 商业设计与节点工作流',
      skillSubtitle: 'ComfyUI 定制节点 · Midjourney 高精出图 · 概念周期压缩70%',
      categories: {
        design: '设计范畴',
        video: '视频摄制与动态',
        ai: 'AI工具与前沿技术',
        platforms: '全球社媒平台运营',
      },
      skills: {
        design: ['2D平面与排版设计', '品牌识别系统 (BI/VI)', '商业海报与大促视觉', '包装结构与工艺工程', 'UI界面视觉设计', '展陈空间美陈 (VMD)'],
        video: ['商业脚本分镜撰写', '现场摄影摄像执导', '达芬奇色彩科学调色', 'PR专业剪辑', 'AE动态视觉合成'],
        ai: ['Midjourney v6 商业出图', 'ComfyUI 节点式定制工作流', 'Runway 动态影像生成', 'Stable Diffusion 深度微调', 'Photoshop AI', 'Figma'],
        platforms: ['小红书高点击率营销', '抖音短视频爆款机制', 'TikTok 全球化传播', 'Instagram 网格排版体系', '微信公众号视觉资产'],
      }
    },
    contact: {
      tag: '开启商务合作',
      headline1: '共同塑造下一段',
      headline2: '标志性商业视觉。',
      subtitle: '新品牌视觉体系构建、中韩跨境短视频商业摄制、美妆护肤视觉资产管理或AI工作流引入，期待与您深入探讨。',
      directChannels: '直接联系通道',
      officialEmail: '官方联系邮箱',
      copyEmail: '复制邮箱',
      wechat: '微信号 (WeChat)',
      location: '工作常驻地',
      locationText: '首尔特别市 广津区 紫阳洞',
      naverDocLink: '作品集下载',
      xiaohongshuLink: '小红书 (Xiaohongshu) 官方创作者主页',
      formTitle: '快捷商务咨询',
      response24h: '24小时内正式回函',
      nameLabel: '您的姓名 / 称呼 *',
      namePlaceholder: '例如：王总监 / 市场负责人',
      contactLabel: '联系邮箱或电话 *',
      contactPlaceholder: '例如：contact@brand.com',
      brandLabel: '所属品牌 / 公司名称',
      brandPlaceholder: '例如：美妆护肤品牌 / 创意机构',
      typeLabel: '合作项目类型',
      typeDefault: '请选择项目类型',
      typeVideo: '商业广告拍摄 / 短视频全案',
      typeBrand: '品牌BI/VI设计 / 包装升级',
      typeChina: '小红书 / 抖音跨境视觉营销',
      typeAi: 'AI生成设计与商业工作流引入',
      detailsLabel: '项目详情与预算排期 *',
      detailsPlaceholder: '请简要说明项目诉求、预计交付周期或希望达成的视觉风格。',
      submitBtn: '联系我们',
      successTitle: '留言已成功发送',
      successDesc: '感谢您的来信。我已收到您的项目简报，将在24小时内按您留下的联系方式回函。',
      phone: '联系电话',
      emailLabel: '联系邮箱或电话 *',
      emailPlaceholder: '例如：contact@brand.com',
      messageTitle: '快捷商务咨询',
      submittedTitle: '留言已成功发送',
      submittedDesc: '感谢您的来信。我已收到您的项目简报，将在24小时内按您留下的联系方式回函。',
      confidentialityNote: '所有咨询内容与项目商业资产均受严格保密条款保护。',
      copyright: '版权所有 © 2026 郑灿峰 (ZHENG CANFENG). 保留所有权利。',
      locationFooter: '韩国首尔 · 视觉设计 · AI生成工程 · 品牌全案',
    }
  },
  en: {
    nav: {
      brand: 'ZHENG CANFENG',
      title: 'Graphic Designer · Photographer',
      overview: 'Overview',
      experience: 'Experience',
      works: 'Selected Works',
      capabilities: 'Capabilities',
      contact: 'Contact',
      portfolioDoc: 'Portfolio Document',
      getInTouch: 'Get in Touch',
      menu: 'Navigation',
    },
    hero: {
      status: 'Available for Q2/Q3 Projects',
      seoulTime: 'Seoul Time',
      disciplines: 'Graphic Design / Commercial Cinematography / Brand Identity',
      roleBadge: '13-Year Senior Graphic Designer & Photographer',
      headline1: 'Hold the gaze,',
      headline2: 'move the heart.',
      narrative1: 'Visual Direction · Commercial Cinema · DaVinci Color · AI Workflows',
      narrative2: 'Equipped with in-house cinema gear to autonomously deliver commercial campaigns.',
      btnExplore: 'Explore Selected Works',
      btnContact: 'Get in Touch',
      statExp: '13+ Years Experience',
      statProjects: '120+ Commercial Deliveries',
      statBrands: 'Shinsegae · Amorepacific',
      scroll: 'Scroll to explore',
    },
    experience: {
      tag: 'Profile & Experience',
      title: '13 Years of Mastery.',
      subtitle: 'Autonomous Production Gear · End-to-End Delivery',
      portraitBadge: 'Seoul · Born 1994 (Age 32)',
      tierBadge: '13Y Master',
      quote: '“To ensure uncompromised fidelity, I built an autonomous pipeline spanning strategy, cinema direction, color grading, and AI.”',
      bioP1: 'Rooted in formal visual design education. Partnering with global prestige brands since 2021 with owned cinema camera systems, handling direction, color grading, and generative AI.',
      bioP2: 'Equipped with owned cinema cameras and lighting systems, removing conventional production delays and reducing client overhead.',
      bioP3: 'In cross-border social commerce (Xiaohongshu, TikTok), delivering data-backed visual strategies.',
      metrics: [
        { value: 13, suffix: '+', unit: 'Years Active', sub: '2013-2026 Dedicated to visual design & cinema' },
        { value: 120, suffix: '+', unit: 'Deliveries', sub: 'Commercial brand systems, TVC, short-form' },
        { value: 1500, suffix: '', unit: '10K+ Impressions', sub: 'Viral reach across Xiaohongshu & Douyin' },
                { value: 100, suffix: '%', unit: 'Autonomous Gear', sub: 'Zero rental waiting · Rapid agile execution' },
      ],
      careerHistoryTag: 'Career Milestones',
      careerHistoryTitle: 'Career History & Business Impact (13 Years)',
      education: 'Harbin Light Industry College · Visual Communication Design',
      directTouchpoint: 'Direct Touchpoint',
      location: 'Jayang-dong, Gwangjin-gu, Seoul, Korea',
      phone: '010-****-8388',
      copy: 'Copy',
      copied: 'Copied',
      coreDuties: 'Core Responsibilities & Business Impact',
      stats: {
        exp: '13+ Years Active',
        projects: '120+ Commercial Deliveries',
        views: '15M+ Impressions',
        gear: '100% In-House Gear',
      },
      bio: 'Rooted in formal visual design education, building robust conceptual foundations. Partnering with prestige brands across cinema, strategy, editing, and physical print execution.',
      careerHistory: 'Career History & Business Impact (13 Years)',
      naverPortfolio: 'Naver Portfolio & Verified Credentials',
    },
    projects: {
      tag: 'Curated Portfolio',
      title: 'Selected Works.',
      groupVisual: 'Graphic Works',
      groupFilm: 'Films',
      subtitle: 'Flagship commercial projects for Shinsegae, Amorepacific, eke, and global brands.',
      all: 'All Projects',
      inspect: 'Inspect',
      client: 'Client',
      year: 'Year',
      deliverables: 'Deliverables & Scope',
      close: 'Close',
      verified: 'Verified Studio Archive',
    },
    strengths: {
      tag: 'Core Capabilities',
      title: 'In-House Gear & Velocity.',
      subtitle: 'Zero rental delays. Solving tangible business objectives with cinematic craft and AI.',
      gearTitle: 'Commercial Cinema & Color Grading',
      gearSubtitle: 'Full-frame cinema line, DaVinci Resolve color science & studio lighting',
      gearReady: 'Deployment Ready',
      skillTitle: 'Generative AI Workflows & 3D Synthesis',
      skillSubtitle: 'ComfyUI custom nodes, Midjourney production & concept compression',
      categories: {
        design: 'Design Disciplines',
        video: 'Video & Motion Production',
        ai: 'AI & Generative Tools',
        platforms: 'Global Platform Marketing',
      },
      skills: {
        design: ['2D Graphic & Editorial Design', 'Brand Identity Systems (BI/VI)', 'Commercial Key Visuals', 'Packaging Structural Engineering', 'UI Design Systems', 'Spatial Experience (VMD)'],
        video: ['Commercial Scriptwriting', 'Camera Direction & Lighting', 'DaVinci Resolve HDR Color', 'Premiere Pro Editing', 'After Effects Motion'],
        ai: ['Midjourney v6 Production', 'ComfyUI Custom Workflows', 'Runway Motion Synthesis', 'Stable Diffusion Fine-tuning', 'Photoshop AI', 'Figma'],
        platforms: ['Xiaohongshu High-CTR Strategy', 'Douyin Short-Form Hooks', 'TikTok Global Virality', 'Instagram Grid Architecture', 'WeChat Official Brand Feeds'],
      }
    },
    contact: {
      tag: 'Start a Conversation',
      headline1: 'Let\'s shape the next',
      headline2: 'iconic moment.',
      subtitle: 'Whether developing a brand identity, filming high-conversion video, or integrating AI workflows, let\'s collaborate.',
      directChannels: 'Direct Channels',
      officialEmail: 'Official Email',
      copyEmail: 'Copy Email',
      wechat: 'WeChat ID',
      location: 'Studio Location',
      locationText: 'Seoul, South Korea (Gwangjin-gu)',
      naverDocLink: 'Naver Portfolio & Verified Credentials',
      xiaohongshuLink: 'Xiaohongshu (RED) Official Creator Profile',
      formTitle: 'Project Inquiry Brief',
      response24h: 'Response within 24 hours',
      nameLabel: 'Your Name *',
      namePlaceholder: 'e.g. Director Wang / Brand Lead',
      contactLabel: 'Email or Phone *',
      contactPlaceholder: 'e.g. contact@brand.com',
      brandLabel: 'Brand / Company Name',
      brandPlaceholder: 'e.g. Cosmetics Brand / Agency',
      typeLabel: 'Project Scope',
      typeDefault: 'Select Project Type',
      typeVideo: 'Commercial Film / Short-form Production',
      typeBrand: 'Brand Identity (BI/VI) & Packaging',
      typeChina: 'China Market (Xiaohongshu/Douyin) Social',
      typeAi: 'AI Generative Design Workflows',
      detailsLabel: 'Project Brief & Timeline *',
      detailsPlaceholder: 'Briefly describe your objectives, deliverables, timeline, or visual expectations.',
      submitBtn: 'Contact',
      successTitle: 'Message Sent Successfully',
      successDesc: 'Thank you for reaching out. Your inquiry has been received. I will reply within 24 hours.',
      phone: 'Direct Line',
      emailLabel: 'Email or Phone *',
      emailPlaceholder: 'e.g. contact@brand.com',
      messageTitle: 'Project Inquiry Brief',
      submittedTitle: 'Message Sent Successfully',
      submittedDesc: 'Thank you for reaching out. Your inquiry has been received. I will reply within 24 hours.',
      confidentialityNote: 'All project inquiries and brand briefs are strictly confidential.',
      copyright: '© 2026 ZHENG CANFENG. All Rights Reserved.',
      locationFooter: 'Seoul, Korea · Visual Design · AI Synthesis · Brand Architecture',
    }
  },
  ko: {
    nav: {
      brand: '정찬봉',
      title: '시각 디자이너 · AI 디렉터 · 브랜드 설계',
      overview: '개요',
      experience: '이력 소개',
      works: '주요 작품',
      capabilities: '핵심 역량',
      contact: '문의하기',
      portfolioDoc: '포트폴리오 다운로드',
      getInTouch: '협업 문의',
      menu: '네비게이션',
    },
    hero: {
      status: 'Q2/Q3 프로젝트 협업 가능',
      seoulTime: '서울 시간',
      disciplines: '비주얼 디렉션 / AI 생성 워크플로우 / 브랜드 아이덴티티',
      roleBadge: '13년차 시각 디자이너 · AI 크리에이티브 디렉터',
      headline1: '시선을 머물게,',
      headline2: '마음을 움직이게.',
      narrative1: '비주얼 디렉션 · 상업 영상 제작 · 다빈치 색보정 · 생성형 AI',
      narrative2: '자체 장비로 촬영부터 색보정까지, 하나의 흐름으로 완성합니다.',
      btnExplore: '주요 작품 둘러보기',
      btnContact: '프로젝트 의뢰',
      statExp: '13년 이상 실무 경력',
      statProjects: '120건 이상 프로젝트 완수',
      statBrands: '신세계면세점 · 아모레퍼시픽',
      scroll: '스크롤하여 확인',
    },
    experience: {
      tag: '프로필 및 주요 경력',
      title: '13년의 현장 감각.',
      subtitle: '자체 영상 장비 보유 · 전 공정 독립 완수',
      portraitBadge: '서울 · 1994년생 (32세)',
      tierBadge: '13년차 총괄',
      quote: '“콘텐츠의 완성도를 타협하지 않기 위해 기획부터 촬영, 편집, 그래픽, AI 워크플로우까지 전 공정을 내재화했습니다.”',
      bioP1: '디자인을 전공하며 시각적 사고의 기초를 다졌고, 2021년부터 국내외 유수 브랜드의 파트너로 일하며 자체 장비를 통해 기획부터 촬영, 편집, 색보정까지 전 공정을 내재화했습니다.',
      bioP2: '자체 보유한 전문 촬영 장비를 기반으로 외주 리드 타임과 제작 비용을 획기적으로 절감합니다.',
      bioP3: '중화권 시장 및 글로벌 마케팅에서 높은 효율의 비주얼 전략을 제공합니다.',
      metrics: [
        { value: 13, suffix: '+', unit: '년 실무 경력', sub: '2013-2026 시각 디자인 및 영상 분야' },
        { value: 120, suffix: '+', unit: '건 상업 프로젝트', sub: '브랜드 전안, TVC, 숏폼, 패키지' },
        { value: 1500, suffix: '', unit: '만+ 회 소셜 노출', sub: '샤오홍슈 · 도우인 · 틱톡 성과' },
        { value: 100, suffix: '%', unit: '자체 장비 운용', sub: '외주 렌탈 대기 없는 즉각 실행' },
      ],
      careerHistoryTag: '주요 경력 사항',
      careerHistoryTitle: '경력 사항 및 실무 성과 (총 13년)',
      education: '하얼빈청공업학교대학 시각디자인 전공 졸업',
      directTouchpoint: '직접 연락처',
      location: '서울특별시 광진구 자양동',
      phone: '010-****-8388',
      copy: '복사',
      copied: '복사됨',
      coreDuties: '주요 역할 및 실무 성과',
      stats: {
        exp: '13+년 실무 경력',
        projects: '120+건 상업 프로젝트',
        views: '1500만+회 소셜 노출',
        gear: '100% 자체 장비 운용',
      },
      bio: '디자인을 전공하며 시각적 사고의 기초를 다졌고, 기획부터 촬영, 편집, 그래픽, AI 워크플로우까지 전 공정을 내재화하여 타협 없는 완성도를 창출합니다.',
      careerHistory: '경력 사항 및 실무 성과 (총 13년)',
      naverPortfolio: '포트폴리오 다운로드',
    },
    projects: {
      tag: '주요 포트폴리오',
      title: '대표 프로젝트.',
      groupVisual: '그래픽 워크',
      groupFilm: '영상 워크',
      subtitle: '신세계면세점 · 아모레퍼시픽 · COSRX 등과 함께한 작업.',
      all: '전체 프로젝트',
      inspect: '자세히 보기',
      client: '고객사',
      year: '수행 연도',
      deliverables: '수행 범위 및 성과물',
      close: '닫기',
      verified: '포트폴리오 다운로드',
    },
    strengths: {
      tag: '핵심 역량 및 강점',
      title: '자체 장비로 완성하는 독립 제작.',
      subtitle: '렌탈 대기 없이, 기획부터 납품까지 한 번에 해결합니다.',
      gearTitle: '상업 영상 연출 및 색보정 시스템',
      gearSubtitle: '풀프레임 카메라 · 다빈치 리졸브 · 기동성 장비',
      gearReady: '즉시 출동 가능',
      skillTitle: '생성형 AI 워크플로우 및 노드 구축',
      skillSubtitle: 'ComfyUI 커스텀 파이프라인 · 미드저니 상업 제작 · 콘셉트 주기 단축',
      categories: {
        design: '디자인 전문 영역',
        video: '영상 및 모션 제작',
        ai: 'AI 도구 및 신기술',
        platforms: '글로벌 플랫폼 마케팅',
      },
      skills: {
        design: ['2D 그래픽 디자인', '브랜드 BI/VI 시스템', '광고/포스터 키비주얼', '패키지 지함 설계', '웹/앱 UI 디자인', '전시 공간 VMD'],
        video: ['상업 영상 기획/대본', '현장 촬영 디렉팅', '다빈치 리졸브 색보정', '프리미어 프로 컷편집', '애프터이펙트 모션'],
        ai: ['Midjourney v6 상업 활용', 'ComfyUI 커스텀 워크플로우', 'Runway 비디오 생성', 'Stable Diffusion 미세조정', 'Photoshop AI', 'Figma'],
        platforms: ['샤오홍슈 클릭률 최적화', '도우인 숏폼 바이럴 설계', 'TikTok 글로벌 마케팅', '인스타그램 그리드 전략', '위챗 공식계정 비주얼'],
      }
    },
    contact: {
      tag: '협업 제안 및 문의',
      headline1: '다음 세대의 상징을',
      headline2: '함께 만들어갑니다.',
      subtitle: '신규 브랜드 아이덴티티, 중화권 타깃 커머스 숏폼, 뷰티 캠페인 비주얼, AI 워크플로우 도입 등 모든 크리에이티브 파트너십을 환영합니다.',
      directChannels: '직접 연락 채널',
      officialEmail: '공식 이메일',
      copyEmail: '이메일 복사',
      wechat: '위챗 (WeChat ID)',
      location: '활동 지역',
      locationText: '서울특별시 광진구 자양동',
      naverDocLink: '포트폴리오 다운로드',
      xiaohongshuLink: '샤오홍슈 (小红书) 공식 크리에이터 홈',
      formTitle: '프로젝트 의뢰 양식',
      response24h: '24시간 이내 공식 회신',
      nameLabel: '담당자 성함 *',
      namePlaceholder: '예: 홍길동 팀장 / 마케팅 디렉터',
      contactLabel: '연락처 또는 이메일 *',
      contactPlaceholder: '예: contact@brand.com',
      brandLabel: '브랜드 / 기업명',
      brandPlaceholder: '예: 뷰티 브랜드 / 에이전시',
      typeLabel: '프로젝트 유형',
      typeDefault: '프로젝트 유형 선택',
      typeVideo: '상업 영상 / 숏폼 프로덕션',
      typeBrand: '브랜드 BI/VI 및 패키지 디자인',
      typeChina: '샤오홍슈 / 도우인 중화권 마케팅',
      typeAi: 'AI 생성 디자인 및 워크플로우 도입',
      detailsLabel: '프로젝트 내용 및 일정 *',
      detailsPlaceholder: '프로젝트 일정, 제작 범위, 희망 콘셉트 등을 간략히 적어주세요.',
      submitBtn: '연락하기',
      successTitle: '문의가 성공적으로 전달되었습니다',
      successDesc: '내용을 검토한 후 24시간 이내에 기재해주신 연락처로 회신드리겠습니다.',
      phone: '직접 연락처',
      emailLabel: '이메일 또는 연락처 *',
      emailPlaceholder: '예: contact@brand.com',
      messageTitle: '프로젝트 의뢰 양식',
      submittedTitle: '문의가 성공적으로 전달되었습니다',
      submittedDesc: '내용을 검토한 후 24시간 이내에 기재해주신 연락처로 회신드리겠습니다.',
      confidentialityNote: '모든 프로젝트 의뢰 및 상업 정보는 철저한 대외비로 취급됩니다.',
      copyright: '© 2026 ZHENG CANFENG (정찬봉). All Rights Reserved.',
      locationFooter: '대한민국 서울 · 시각 디자인 · AI 생성 워크플로우 · 브랜드 설계',
    }
  }
};
