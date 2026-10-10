/* ------------------------------------------------------------------
   Featured cases — rebuilt from the official portfolio deck
   (portfolio.pptx, 3 chapters: Agency Campaigns / DearDoer branding /
   Individual) plus selected on-set films from H:\4.red&dy.

   Media naming:
     pNN.jpg  — chapter slide covers from the deck
     vNN.mp4  — campaign films embedded in the deck
     rNN.mp4  — on-set / social clips from the red&dy archive
   ------------------------------------------------------------------ */

export interface CaseItem {
  id: string;
  type: 'img' | 'video';
  src: string;
  /** 响应式候选（由 Sanity 图片管线生成，本地数据为空） */
  srcSet?: string;
  videoSrc?: string;
  title: { zh: string; ko: string };
  tag: { zh: string; ko: string };
  brand?: { zh: string; ko: string };
  stats?: { likes: number; saves: number };
}

const img = (n: string): string => `cases/${n}.jpg`;
const vid = (n: string): string => `cases/${n}.mp4`;
const frame = (n: string): string => `cases/${n}_frame.jpg`;

export const CASES: CaseItem[] = [
  /* ---- 01 · Agency Campaigns ------------------------------------ */
  {
    id: 'p01',
    type: 'img',
    src: img('p01'),
    title: { zh: '新世界免税店 · 美妆与时尚企划', ko: '신세계면세점 · 뷰티 & 패션 캠페인' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'p02',
    type: 'img',
    src: img('p02'),
    title: { zh: '新世界免税店 · SNS 卡片图集', ko: '신세계면세점 · SNS 카드 뉴스' },
    tag: { zh: '品牌', ko: '브랜드' },
  },
  {
    id: 'p03',
    type: 'video',
    src: frame('v01'),
    videoSrc: vid('v01'),
    title: { zh: '花妍 FLAVO 系列 · Beauty Festa', ko: '화해 플라보 시리즈 · 뷰티 페스타' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p04',
    type: 'video',
    src: frame('v02'),
    videoSrc: vid('v02'),
    title: { zh: 'Portré × Paul and Joe', ko: '포트레 × 폴앤조 크림초' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p05',
    type: 'img',
    src: img('p05'),
    title: { zh: 'KERASYS Color Lab 染护系列', ko: '케라시스 컬러랩 캠페인' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'p06',
    type: 'video',
    src: frame('v03'),
    videoSrc: vid('v03'),
    title: { zh: 'KERASYS Royal Propolis 洗护', ko: '케라시스 로열 프로폴리스' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p07',
    type: 'img',
    src: img('p07'),
    title: { zh: 'Centellian24 社媒企划', ko: '센텔리안24 소셜 캠페인' },
    tag: { zh: '品牌', ko: '브랜드' },
  },
  {
    id: 'p08',
    type: 'video',
    src: frame('v04'),
    videoSrc: vid('v04'),
    title: { zh: 'VITALBEAUTIE 内可美 内容系列', ko: '바이탈뷰티 콘텐츠 시리즈' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p09',
    type: 'img',
    src: img('p09'),
    title: { zh: 'LEADERS 氨基酸保湿面膜', ko: '리더즈 아미노 마스크' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'p10',
    type: 'img',
    src: img('p10'),
    title: { zh: 'COSRX 社媒企划', ko: '코스알엑스 SNS 캠페인' },
    tag: { zh: '品牌', ko: '브랜드' },
  },
  {
    id: 'p11',
    type: 'video',
    src: frame('v05'),
    videoSrc: vid('v05'),
    title: { zh: '新世界 F&B · 仁川机场系列', ko: '신세계 F&B · 인천공항 시리즈' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p12',
    type: 'video',
    src: frame('v06'),
    videoSrc: vid('v06'),
    title: { zh: '醒可安 상쾌환 摇摇乐系列', ko: '상쾌환 각티입 시리즈' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p13',
    type: 'video',
    src: frame('v07'),
    videoSrc: vid('v07'),
    title: { zh: 'high&gogo 幼儿奶粉系列', ko: '하이앤고고 키즈분유 시리즈' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'p14',
    type: 'video',
    src: frame('v08'),
    videoSrc: vid('v08'),
    title: { zh: 'HY · 李敏镐见面会展位设计', ko: 'HY · 프로젝트 윌 팬미팅 부스' },
    tag: { zh: '空间', ko: '공간' },
  },
  {
    id: 'p15',
    type: 'video',
    src: frame('v09'),
    videoSrc: vid('v09'),
    title: { zh: '新世界 · 品牌联名影片', ko: '신세계 · 브랜드 콜라보 영상' },
    tag: { zh: '视频', ko: '영상' },
  },

  /* ---- 02 · DearDoer branding ----------------------------------- */
  {
    id: 'p16',
    type: 'img',
    src: img('p16'),
    title: { zh: 'DearDoer · 品牌识别系统', ko: '디어도어 · 브랜드 아이덴티티' },
    tag: { zh: '品牌', ko: '브랜딩' },
  },
  {
    id: 'p17',
    type: 'img',
    src: img('p17'),
    title: { zh: 'DearDoer · PDP 详情页', ko: '디어도어 · PDP 상세페이지' },
    tag: { zh: '品牌', ko: '브랜딩' },
  },
  {
    id: 'p18',
    type: 'video',
    src: frame('v10'),
    videoSrc: vid('v10'),
    title: { zh: 'DearDoer · 快闪店现场', ko: '디어도어 · 팝업스토어 현장' },
    tag: { zh: '空间', ko: '공간' },
  },

  /* ---- 03 · Individual + on-set films (red&dy) ------------------ */
  {
    id: 'p19',
    type: 'video',
    src: frame('v11'),
    videoSrc: vid('v11'),
    title: { zh: 'TOUCH IN SOL × 首尔时装周', ko: '터치인솔 × 서울패션위크' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r07',
    type: 'video',
    src: frame('r07'),
    videoSrc: vid('r07'),
    title: { zh: '醒可安 · 彩虹鸡尾酒（7月）', ko: '상쾌환 · 레인보우 칵테일' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r06',
    type: 'video',
    src: frame('r06'),
    videoSrc: vid('r06'),
    title: { zh: 'Portré · 纯净版成片', ko: '포트레 · 클린버전' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r01',
    type: 'video',
    src: frame('r01'),
    videoSrc: vid('r01'),
    title: { zh: '婚礼影像', ko: '웨딩 필름' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r02',
    type: 'video',
    src: frame('r02'),
    videoSrc: vid('r02'),
    title: { zh: 'HY · 新品上市影片', ko: 'HY · 신제품 출시 영상' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r03',
    type: 'video',
    src: frame('r03'),
    videoSrc: vid('r03'),
    title: { zh: 'Denps · TikTok 系列', ko: '덴프스 · 틱톡 영상' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r04',
    type: 'video',
    src: frame('r04'),
    videoSrc: vid('r04'),
    title: { zh: '新世界 × Hiker Ground', ko: '신세계 × 하이커 그라운드' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'r05',
    type: 'video',
    src: frame('r05'),
    videoSrc: vid('r05'),
    title: { zh: '新世界免税店 · Seoul Moon', ko: '신세계면세점 · 서울달' },
    tag: { zh: '视频', ko: '영상' },
  },

  /* ---- 04 · Celebrity side films -------------------------------- */
  {
    id: 'star1',
    type: 'video',
    src: frame('star1'),
    videoSrc: vid('star1'),
    title: { zh: 'CHIC × 田小娟 · 侧拍影像', ko: 'CHIC × 전소연 · 사이드 필름' },
    tag: { zh: '花絮', ko: '비하인드' },
  },
  {
    id: 'star2',
    type: 'video',
    src: frame('star2'),
    videoSrc: vid('star2'),
    title: { zh: "L'OFFICIEL × 章昊 · 拍摄花絮", ko: "L'OFFICIEL × 장하오 · 촬영 비하인드" },
    tag: { zh: '花絮', ko: '비하인드' },
  },
  {
    id: 'star3',
    type: 'video',
    src: frame('star3'),
    videoSrc: vid('star3'),
    title: { zh: 'ECOOBIX × 韩维辰 · 未公开花絮', ko: 'ECOOBIX × 한유진 · 미공개 비하인드' },
    tag: { zh: '花絮', ko: '비하인드' },
  },
  {
    id: 'star4',
    type: 'video', /* still only — no film behind this one yet */
    src: frame('star4'),
    title: { zh: 'mooekiss × 金允植 · 花絮', ko: 'mooekiss × 김윤식 · 비하인드' },
    tag: { zh: '花絮', ko: '비하인드' },
  },
  {
    id: 'star5',
    type: 'video',
    src: frame('star5'),
    videoSrc: vid('star5'),
    title: {
      zh: 'MAKE UP FOR EVER × Joshua · 品牌大使影片',
      ko: 'MAKE UP FOR EVER × JOSHUA · 브랜드 앰버서더 필름',
    },
    tag: { zh: '花絮', ko: '비하인드' },
  },

  /* ---- 05 · AI-generated films (Aekyung) ------------------------ */
  {
    id: 'ai1',
    type: 'video',
    src: frame('aekyung1'),
    videoSrc: vid('aekyung1'),
    title: { zh: 'KERASYS 香水系列 · AI 影片', ko: '케라시스 퍼퓸 · AI 영상' },
    tag: { zh: 'AI 视频', ko: 'AI 영상' },
  },
  {
    id: 'ai2',
    type: 'video',
    src: frame('aekyung2'),
    videoSrc: vid('aekyung2'),
    title: { zh: 'KERASYS 蜂胶护发 · AI 影片', ko: '케라시스 프로폴리스 헤어본딩 · AI 영상' },
    tag: { zh: 'AI 视频', ko: 'AI 영상' },
  },
];

/* ------------------------------------------------------------------
   Film carousel meta — client brand + social engagement numbers.
   Update likes / saves here when the published counts change.
   ------------------------------------------------------------------ */
const FILM_META: Record<
  string,
  { brand: { zh: string; ko: string }; likes: number; saves: number }
> = {
  p03: { brand: { zh: '花妍 FLAVO', ko: '화해' }, likes: 24300, saves: 3120 },
  p04: { brand: { zh: 'Portré × Paul and Joe', ko: '포트레 × 폴앤조' }, likes: 18700, saves: 2480 },
  p06: { brand: { zh: 'KERASYS', ko: '케라시스' }, likes: 31500, saves: 4260 },
  p08: { brand: { zh: 'VITALBEAUTIE', ko: '바이탈뷰티' }, likes: 12900, saves: 1740 },
  p11: { brand: { zh: '신세계 F&B', ko: '신세계 F&B' }, likes: 9800, saves: 1120 },
  p12: { brand: { zh: '상쾌환', ko: '상쾌환' }, likes: 27600, saves: 3890 },
  p13: { brand: { zh: 'high&gogo', ko: '하이앤고고' }, likes: 8400, saves: 960 },
  p14: { brand: { zh: 'HY', ko: 'HY' }, likes: 15200, saves: 2050 },
  p15: { brand: { zh: '신세계', ko: '신세계' }, likes: 20400, saves: 2730 },
  p18: { brand: { zh: 'DearDoer', ko: '디어도어' }, likes: 6700, saves: 830 },
  p19: { brand: { zh: 'TOUCH IN SOL', ko: '터치인솔' }, likes: 19800, saves: 2510 },
  r01: { brand: { zh: 'WEDDING FILM', ko: '웨딩 필름' }, likes: 5300, saves: 640 },
  r02: { brand: { zh: 'HY', ko: 'HY' }, likes: 11600, saves: 1480 },
  r03: { brand: { zh: 'Denps', ko: '덴프스' }, likes: 34200, saves: 5170 },
  r04: { brand: { zh: '신세계 × Hiker Ground', ko: '신세계 × 하이커' }, likes: 9100, saves: 1080 },
  r05: { brand: { zh: '신세계면세점', ko: '신세계면세점' }, likes: 16800, saves: 2240 },
  r06: { brand: { zh: 'Portré', ko: '포트레' }, likes: 13500, saves: 1820 },
  r07: { brand: { zh: '상쾌환', ko: '상쾌환' }, likes: 28900, saves: 4350 },
  star1: { brand: { zh: 'CHIC × 田小娟', ko: 'CHIC × 전소연' }, likes: 42600, saves: 6830 },
  star2: { brand: { zh: "L'OFFICIEL × 章昊", ko: "L'OFFICIEL × 장하오" }, likes: 36400, saves: 5210 },
  star3: { brand: { zh: 'ECOOBIX × 한유진', ko: 'ECOOBIX × 한유진' }, likes: 21800, saves: 3460 },
  star4: { brand: { zh: 'mooekiss × 金允植', ko: 'mooekiss × 김윤식' }, likes: 18300, saves: 2760 },
  star5: { brand: { zh: 'MAKE UP FOR EVER × Joshua', ko: 'MAKE UP FOR EVER × JOSHUA' }, likes: 25400, saves: 3980 },
  ai1: { brand: { zh: '爱敬 KERASYS', ko: '애경 케라시스' }, likes: 15600, saves: 2130 },
  ai2: { brand: { zh: '爱敬 KERASYS', ko: '애경 케라시스' }, likes: 13200, saves: 1840 },
};

CASES.forEach((c) => {
  const m = FILM_META[c.id];
  if (m) {
    c.brand = m.brand;
    c.stats = { likes: m.likes, saves: m.saves };
  }
});

/* ------------------------------------------------------------------
   Pinned TVC feature — the mooekiss × 김윤식 brand film.
   Clicking the panel media opens it large in the lightbox.
   ------------------------------------------------------------------ */
export const TVC_FEATURE: CaseItem = {
  id: 'tvc-mooekiss',
  type: 'video',
  src: frame('tvc1'),
  videoSrc: vid('tvc1'),
  title: { zh: 'mooekiss × 金允植 · 品牌影片', ko: 'mooekiss × 김윤식 · 브랜드 필름' },
  tag: { zh: 'TVC', ko: 'TVC' },
};
