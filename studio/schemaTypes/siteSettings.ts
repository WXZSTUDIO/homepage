import { defineType } from 'sanity';

/* 网站全局设置 —— 单例文档 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: '网站全局设置',
  type: 'document',
  groups: [
    { name: 'basic', title: '基本信息', default: true },
    { name: 'hero', title: '首页' },
    { name: 'seo', title: 'SEO 与分享' },
    { name: 'contact', title: '联系方式' },
    { name: 'music', title: '背景音乐' },
  ],
  fields: [
    { name: 'siteName', title: '网站名称 *', type: 'string', group: 'basic', validation: (R: any) => R.required() },

    /* 首页 */
    { name: 'heroHeadline1', title: '首页主标题（第一行）', type: 'localeString', group: 'hero' },
    { name: 'heroHeadline2', title: '首页主标题（第二行）', type: 'localeString', group: 'hero' },
    { name: 'heroNarrative', title: '首页介绍文案', type: 'localeText', group: 'hero' },
    {
      name: 'heroVideoFile',
      title: '首页背景视频文件',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/mp4,video/webm' },
    },
    { name: 'heroVideoUrl', title: '首页背景视频地址（外链）', type: 'url', group: 'hero' },

    /* SEO */
    { name: 'seoTitle', title: 'SEO 标题', type: 'localeString', group: 'seo' },
    { name: 'seoDescription', title: 'SEO 描述', type: 'localeText', group: 'seo' },
    {
      name: 'shareImage',
      title: '分享封面图',
      type: 'image',
      group: 'seo',
      options: { metadata: ['dimensions'] },
      fields: [{ name: 'alt', title: '图片替代文本（Alt）', type: 'string' }],
    },
    { name: 'footerCopyright', title: '页脚版权文案', type: 'localeString', group: 'seo' },
    { name: 'footerLocation', title: '页脚补充信息', type: 'localeString', group: 'seo' },

    /* 联系方式 */
    { name: 'contactEmail', title: '联系邮箱', type: 'string', group: 'contact', validation: (R: any) => R.email() },
    { name: 'contactPhone', title: '联系电话', type: 'string', group: 'contact' },
    { name: 'contactWechat', title: '微信号', type: 'string', group: 'contact' },
    {
      name: 'resumeFile',
      title: '作品集 / 简历下载文件',
      type: 'file',
      group: 'contact',
      options: { accept: 'application/pdf' },
    },
    {
      name: 'socials',
      title: '社交平台链接',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: '平台标识 *',
              type: 'string',
              validation: (R: any) => R.required(),
              description: 'wechat / xiaohongshu / instagram / behance …',
            },
            { name: 'label', title: '显示名称', type: 'localeString' },
            { name: 'url', title: '链接地址', type: 'url' },
            { name: 'handle', title: '账号 / ID', type: 'string' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'handle', label: 'label.zh' },
            prepare: ({ title, subtitle, label }: any) => ({
              title: label || title,
              subtitle: subtitle || title,
            }),
          },
        },
      ],
    },

    /* 背景音乐 */
    {
      name: 'backgroundMusic',
      title: '背景音乐',
      type: 'object',
      group: 'music',
      description: '浏览器禁止未经交互的自动播放。默认由访客点击开启，播放偏好会记在本地。',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'audioFile',
          title: '音频文件',
          type: 'file',
          options: { accept: 'audio/mpeg,audio/mp4,audio/ogg,audio/wav' },
        },
        { name: 'audioUrl', title: '音频地址（外链）', type: 'url' },
        { name: 'name', title: '音乐名称', type: 'string' },
        { name: 'enabled', title: '启用背景音乐', type: 'boolean', initialValue: false },
        { name: 'loop', title: '循环播放', type: 'boolean', initialValue: true },
        {
          name: 'volume',
          title: '默认音量（0–1）',
          type: 'number',
          initialValue: 0.5,
          validation: (R: any) => R.min(0).max(1),
        },
      ],
    },
  ],
  preview: { select: { title: 'siteName' }, prepare: ({ title }: any) => ({ title: title || '网站设置' }) },
});
