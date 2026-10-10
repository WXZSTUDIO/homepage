import { defineType } from 'sanity';

/* 详情页媒体块 —— 单张图片 / 多图画廊 / 视频 / 图文块。
   数组本身可拖拽排序，模块类型切换时只显示对应字段。 */

const isType =
  (...types: string[]) =>
  ({ parent }: { parent?: any }) =>
    !types.includes(parent?.type);

const imageField = (name: string, title: string) => ({
  name,
  title,
  type: 'image',
  options: { hotspot: true, metadata: ['lqip', 'palette', 'dimensions'] },
  fields: [
    {
      name: 'alt',
      title: '图片替代文本（Alt）*',
      type: 'string',
      description: '用于无障碍与 SEO，请简短描述画面内容。',
      validation: (Rule: any) => Rule.required(),
    },
  ],
});

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: '媒体模块',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: '模块类型 *',
      type: 'string',
      initialValue: 'image',
      options: {
        layout: 'radio',
        list: [
          { title: '单张图片', value: 'image' },
          { title: '多图画廊', value: 'gallery' },
          { title: '视频', value: 'video' },
          { title: '图文块', value: 'richText' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },

    /* --- 单张图片 --- */
    { ...imageField('image', '图片'), hidden: isType('image') },

    /* --- 多图画廊 --- */
    {
      name: 'gallery',
      title: '图片列表（可拖拽排序）',
      type: 'array',
      hidden: isType('gallery'),
      validation: (Rule: any) => Rule.max(12),
      of: [
        {
          type: 'image',
          options: { hotspot: true, metadata: ['lqip', 'dimensions'] },
          fields: [
            {
              name: 'alt',
              title: '图片替代文本（Alt）*',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },

    /* --- 视频 --- */
    {
      name: 'videoFile',
      title: '视频文件',
      type: 'file',
      description: '支持 mp4 / webm，建议先压缩后再上传（≤ 100MB）。',
      hidden: isType('video'),
      options: { accept: 'video/mp4,video/webm,video/ogg' },
    },
    {
      name: 'videoUrl',
      title: '视频地址（外链）',
      type: 'url',
      description: '若使用第三方托管（如 Vimeo / 云存储直链），填写后可不上传文件。',
      hidden: isType('video'),
    },
    {
      name: 'poster',
      title: '视频封面（Poster）',
      type: 'image',
      options: { hotspot: true, metadata: ['lqip', 'dimensions'] },
      hidden: isType('video'),
      fields: [{ name: 'alt', title: '图片替代文本（Alt）', type: 'string' }],
    },
    {
      name: 'autoplay',
      title: '自动播放',
      type: 'boolean',
      initialValue: true,
      hidden: isType('video'),
    },
    { name: 'loop', title: '循环播放', type: 'boolean', initialValue: true, hidden: isType('video') },
    { name: 'muted', title: '静音播放', type: 'boolean', initialValue: true, hidden: isType('video') },

    /* --- 图文块 --- */
    {
      name: 'title',
      title: '小标题',
      type: 'localeString',
      hidden: isType('richText'),
    },
    {
      name: 'body',
      title: '正文',
      type: 'localeText',
      hidden: isType('richText'),
    },
    {
      name: 'bullets',
      title: '要点列表',
      type: 'array',
      hidden: isType('richText'),
      of: [{ type: 'localeString' }],
    },

    /* --- 通用 --- */
    {
      name: 'caption',
      title: '说明文字',
      type: 'localeString',
      hidden: isType('image', 'gallery', 'video'),
    },
  ],
  preview: {
    select: { type: 'type', image: 'image', poster: 'poster', title: 'title' },
    prepare({ type, image, poster, title }: any) {
      const label: Record<string, string> = {
        image: '单张图片',
        gallery: '多图画廊',
        video: '视频',
        richText: '图文块',
      };
      return {
        title: title?.zh || title?.ko || label[type] || '媒体模块',
        subtitle: label[type] || '未选择类型',
        media: image || poster,
      };
    },
  },
});
