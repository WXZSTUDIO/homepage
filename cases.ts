/* ------------------------------------------------------------------
   Featured cases — the studio's published feed, exactly as posted.
   Media lives in public/cases/ under the original file ids. Titles
   are short bilingual descriptors; the author line is the studio.
   ------------------------------------------------------------------ */

export interface CaseItem {
  id: string;
  type: 'img' | 'video';
  src: string;
  title: { zh: string; ko: string };
  tag: { zh: string; ko: string };
}

const img = (id: string): string => `cases/${id}.jpg`;
const vid = (id: string): string => `cases/${id}.mp4`;

export const CASES: CaseItem[] = [
  {
    id: 'c01',
    type: 'video',
    src: vid('3835002277783016823'),
    title: { zh: '片场直击 · TVC 花絮', ko: '현장 필름 · TVC 메이킹' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'c02',
    type: 'img',
    src: img('3842501173282147534'),
    title: { zh: '素颜感美妆 · 双人记录', ko: '내추럴 메이크업 기록' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'c03',
    type: 'img',
    src: img('3879856868168940267'),
    title: { zh: '复古红裙 · 编辑部造型 I', ko: '레드 드레스 에디토리얼 I' },
    tag: { zh: '时装', ko: '패션' },
  },
  {
    id: 'c04',
    type: 'img',
    src: img('3879856876037466219'),
    title: { zh: '复古红裙 · 编辑部造型 II', ko: '레드 드레스 에디토리얼 II' },
    tag: { zh: '时装', ko: '패션' },
  },
  {
    id: 'c05',
    type: 'img',
    src: img('3879856878310749119'),
    title: { zh: '复古红裙 · 编辑部造型 III', ko: '레드 드레스 에디토리얼 III' },
    tag: { zh: '时装', ko: '패션' },
  },
  {
    id: 'c06',
    type: 'img',
    src: img('3879856880542105084'),
    title: { zh: '复古红裙 · 编辑部造型 IV', ko: '레드 드레스 에디토리얼 IV' },
    tag: { zh: '时装', ko: '패션' },
  },
  {
    id: 'c07',
    type: 'img',
    src: img('3879856882765108713'),
    title: { zh: '复古红裙 · 编辑部造型 V', ko: '레드 드레스 에디토리얼 V' },
    tag: { zh: '时装', ko: '패션' },
  },
  {
    id: 'c08',
    type: 'video',
    src: vid('3890363602232066293'),
    title: { zh: '拍摄现场 · 机位实记', ko: '촬영 현장 스케치' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'c09',
    type: 'img',
    src: img('3917128890585569390'),
    title: { zh: '清透光泽底妆 · 特写 I', ko: '글로시 스킨 클로즈업 I' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'c10',
    type: 'img',
    src: img('3917128893236266242'),
    title: { zh: '清透光泽底妆 · 特写 II', ko: '글로시 스킨 클로즈업 II' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'c11',
    type: 'img',
    src: img('3917128897397163422'),
    title: { zh: '清透光泽底妆 · 特写 III', ko: '글로시 스킨 클로즈업 III' },
    tag: { zh: '美妆', ko: '뷰티' },
  },
  {
    id: 'c12',
    type: 'img',
    src: img('3918375488783355314'),
    title: { zh: '卡帕多奇亚 · 旅拍 I', ko: '카파도키아 여행기 I' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c13',
    type: 'img',
    src: img('3918375555221063446'),
    title: { zh: '卡帕多奇亚 · 旅拍 II', ko: '카파도키아 여행기 II' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c14',
    type: 'img',
    src: img('3918375560891844746'),
    title: { zh: '卡帕多奇亚 · 旅拍 III', ko: '카파도키아 여행기 III' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c15',
    type: 'img',
    src: img('3918375568407911506'),
    title: { zh: '卡帕多奇亚 · 旅拍 IV', ko: '카파도키아 여행기 IV' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c16',
    type: 'img',
    src: img('3918375580605013541'),
    title: { zh: '卡帕多奇亚 · 旅拍 V', ko: '카파도키아 여행기 V' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c17',
    type: 'img',
    src: img('3918375581838001718'),
    title: { zh: '卡帕多奇亚 · 旅拍 VI', ko: '카파도키아 여행기 VI' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c18',
    type: 'img',
    src: img('3918375592600693656'),
    title: { zh: '卡帕多奇亚 · 旅拍 VII', ko: '카파도키아 여행기 VII' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c19',
    type: 'img',
    src: img('3918375596115612921'),
    title: { zh: '卡帕多奇亚 · 旅拍 VIII', ko: '카파도키아 여행기 VIII' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c20',
    type: 'img',
    src: img('3918375603732227943'),
    title: { zh: '卡帕多奇亚 · 旅拍 IX', ko: '카파도키아 여행기 IX' },
    tag: { zh: '旅拍', ko: '여행' },
  },
  {
    id: 'c21',
    type: 'video',
    src: vid('3937121758414849158'),
    title: { zh: '旅拍 · 动态片段', ko: '여행 무빙 클립' },
    tag: { zh: '视频', ko: '영상' },
  },
  {
    id: 'c22',
    type: 'img',
    src: img('3946160993801094351'),
    title: { zh: '2015 · 旧照片里的城市', ko: '2015년, 오래된 사진 속 도시' },
    tag: { zh: '记录', ko: '기록' },
  },
];
