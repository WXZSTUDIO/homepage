import { defineType } from 'sanity';
import { maxFileSize, LIMITS } from './validate';

/* 个人资料 —— 单例文档 */
export const resumeProfile = defineType({
  name: 'resumeProfile',
  title: '个人资料',
  type: 'document',
  fields: [
    { name: 'name', title: '姓名 *', type: 'string', validation: (R: any) => R.required() },
    { name: 'role', title: '职位 / 身份', type: 'localeString' },
    {
      name: 'avatar',
      title: '头像',
      type: 'image',
      options: { hotspot: true, metadata: ['lqip', 'dimensions'] },
      validation: maxFileSize(LIMITS.image, '头像'),
      fields: [{ name: 'alt', title: '图片替代文本（Alt）', type: 'string' }],
    },
    { name: 'bio', title: '个人简介', type: 'localeText' },
    { name: 'location', title: '所在地', type: 'localeString' },
    { name: 'email', title: '邮箱', type: 'string', validation: (R: any) => R.email() },
    { name: 'phone', title: '电话', type: 'string' },
    {
      name: 'resumeFile',
      title: '简历下载文件',
      type: 'file',
      description: '上传 PDF；也可在「网站设置 → 联系方式」里填外链地址。',
      options: { accept: 'application/pdf' },
      validation: maxFileSize(LIMITS.pdf, '简历文件'),
    },
  ],
  preview: { select: { title: 'name', subtitle: 'email', media: 'avatar' } },
});

/* 工作经历 */
export const experience = defineType({
  name: 'experience',
  title: '工作经历',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: '公司 / 客户名称 *',
      type: 'localeString',
      validation: (R: any) =>
        R.custom((v: any) => (!v?.zh && !v?.ko ? '公司名称必填' : true)),
    },
    { name: 'role', title: '职位', type: 'localeString' },
    { name: 'start', title: '开始时间', type: 'string', description: '例如：2021.03 或 2021' },
    { name: 'end', title: '结束时间', type: 'string', hidden: ({ parent }: any) => !!parent?.current },
    {
      name: 'current',
      title: '至今在职',
      type: 'boolean',
      initialValue: false,
      description: '勾选后前台显示「开始时间 ~ 至今」，并隐藏结束时间。',
    },
    { name: 'description', title: '工作描述', type: 'localeText' },
    {
      name: 'order',
      title: '展示顺序',
      type: 'number',
      initialValue: 999,
      description: '数字越小越靠前。',
    },
  ],
  orderings: [{ title: '展示顺序', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'company.zh', subtitle: 'role.zh', period: 'start', current: 'current' },
    prepare({ title, subtitle, period, current }: any) {
      return {
        title: title || '（未命名公司）',
        subtitle: [subtitle, `${period || ''}${current ? ' ~ 至今' : ''}`].filter(Boolean).join(' · '),
      };
    },
  },
});

/* 教育 / 获奖 / 展览 / 服务 / 技能 —— 同一结构，用 kind 区分 */
export const resumeEntry = defineType({
  name: 'resumeEntry',
  title: '履历条目（教育 / 获奖 / 展览 / 服务 / 技能）',
  type: 'document',
  fields: [
    {
      name: 'kind',
      title: '条目类型 *',
      type: 'string',
      initialValue: 'education',
      options: {
        layout: 'radio',
        list: [
          { title: '教育经历', value: 'education' },
          { title: '获奖经历', value: 'award' },
          { title: '展览 / 活动', value: 'exhibition' },
          { title: '服务能力', value: 'service' },
          { title: '技能标签', value: 'skill' },
        ],
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'title',
      title: '标题 *',
      type: 'localeString',
      validation: (R: any) => R.custom((v: any) => (!v?.zh && !v?.ko ? '标题必填' : true)),
    },
    { name: 'subtitle', title: '副标题', type: 'localeString' },
    { name: 'meta', title: '补充信息', type: 'string', description: '例如时间、主办方、等级等短信息。' },
    { name: 'description', title: '描述', type: 'localeText' },
    { name: 'order', title: '展示顺序', type: 'number', initialValue: 999 },
  ],
  orderings: [{ title: '展示顺序', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title.zh', kind: 'kind', meta: 'meta' },
    prepare({ title, kind, meta }: any) {
      const k: Record<string, string> = {
        education: '教育',
        award: '获奖',
        exhibition: '展览',
        service: '服务',
        skill: '技能',
      };
      return { title: title || '（未命名条目）', subtitle: [k[kind] || kind, meta].filter(Boolean).join(' · ') };
    },
  },
});

/* 首页指标数字 */
export const metric = defineType({
  name: 'metric',
  title: '指标数字',
  type: 'document',
  fields: [
    { name: 'value', title: '数值 *', type: 'number', validation: (R: any) => R.required().min(0) },
    { name: 'suffix', title: '后缀', type: 'string', description: '例如：+ / % / 만（韩文“万”）' },
    { name: 'unit', title: '单位 *', type: 'localeString', validation: (R: any) => R.required() },
    { name: 'sub', title: '补充说明', type: 'localeString' },
    { name: 'order', title: '展示顺序', type: 'number', initialValue: 999 },
  ],
  orderings: [{ title: '展示顺序', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { value: 'value', suffix: 'suffix', unit: 'unit.zh' },
    prepare({ value, suffix, unit }: any) {
      return { title: `${value ?? 0}${suffix || ''} ${unit || ''}`.trim() };
    },
  },
});

/* 合作品牌 / 客户 */
export const client = defineType({
  name: 'client',
  title: '合作品牌 / 客户',
  type: 'document',
  fields: [
    { name: 'name', title: '名称 *', type: 'string', validation: (R: any) => R.required() },
    {
      name: 'logo',
      title: '品牌标识（Logo）',
      type: 'image',
      description: '建议上传已处理为白色、透明底的版本。',
      options: { metadata: ['dimensions'] },
      validation: maxFileSize(LIMITS.image, 'Logo'),
      fields: [{ name: 'alt', title: '图片替代文本（Alt）', type: 'string' }],
    },
    { name: 'order', title: '展示顺序', type: 'number', initialValue: 999 },
  ],
  orderings: [{ title: '展示顺序', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'logo' } },
});

/* 联系方式 / 社交平台 */
export const contactLink = defineType({
  name: 'contactLink',
  title: '联系方式 / 社交平台',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: '平台标识 *',
      type: 'string',
      description: '用于前台匹配：wechat / xiaohongshu / instagram / email / behance …',
      validation: (R: any) => R.required(),
    },
    { name: 'label', title: '显示名称', type: 'localeString' },
    { name: 'url', title: '链接地址', type: 'url' },
    { name: 'handle', title: '账号 / ID', type: 'string', description: '例如微信号、@用户名。' },
    { name: 'order', title: '展示顺序', type: 'number', initialValue: 999 },
  ],
  preview: {
    select: { title: 'platform', subtitle: 'handle', label: 'label.zh' },
    prepare({ title, subtitle, label }: any) {
      return { title: label || title || '（未命名）', subtitle: subtitle || title };
    },
  },
});
