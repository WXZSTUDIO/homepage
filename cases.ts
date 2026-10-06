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
  videoSrc?: string;
  title: { zh: string; ko: string };
  tag: { zh: string; ko: string };
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
];
