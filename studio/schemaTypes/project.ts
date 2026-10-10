import { defineType } from 'sanity';
import { maxFileSize, LIMITS } from './validate';

/* slug 唯一性校验 —— slug 必须是全站唯一的地址。 */
const isUniqueSlug = async (slug: string, context: any) => {
  const { document, getClient } = context;
  if (!slug) return true;
  const client = getClient({ apiVersion: '2024-10-01' });
  const id = document?._id?.replace(/^drafts\./, '');
  const query = `!defined(*[
    _type == "project" &&
    slug.current == $slug &&
    !(_id in path("drafts.**")) &&
    !(_id == $id)
  ][0]._id)`;
  const params = { slug, id };
  return client.fetch(query, params);
};

export const project = defineType({
  name: 'project',
  title: '作品',
  type: 'document',
  groups: [
    { name: 'basic', title: '基本信息', default: true },
    { name: 'cover', title: '封面媒体' },
    { name: 'detail', title: '详情页媒体' },
    { name: 'meta', title: '排序与数据' },
  ],
  fields: [
    {
      name: 'title',
      title: '作品标题 *',
      type: 'localeString',
      group: 'basic',
      description: '至少填写中文与韩语，前台按当前语言显示。',
      validation: (Rule: any) =>
        Rule.custom((v: any) => (!v?.zh && !v?.ko ? '标题必填（中文或韩语）' : true)),
    },
    {
      name: 'slug',
      title: '唯一地址（Slug）*',
      type: 'slug',
      group: 'basic',
      description: '详情页地址，只能包含小写字母、数字与连字符。留空将根据标题自动生成，也可手动修改。',
      options: {
        source: (doc: any) => doc?.title?.en || doc?.title?.ko || doc?.title?.zh || '',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 96),
        isUnique: isUniqueSlug,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'group',
      title: '所属板块 *',
      type: 'string',
      group: 'basic',
      initialValue: 'film',
      options: {
        layout: 'radio',
        list: [
          { title: '平面 / 视觉（图片作品）', value: 'visual' },
          { title: '视频作品', value: 'film' },
          { title: 'BTS 幕后花絮', value: 'star' },
          { title: 'TVC 品牌影片（置顶）', value: 'tvc' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'year', title: '年份', type: 'string', group: 'basic', description: '例如：2026' },
    { name: 'category', title: '分类', type: 'string', group: 'basic', description: '例如：品牌视觉 / 商业广告' },
    { name: 'brand', title: '品牌 / 客户', type: 'localeString', group: 'basic' },
    { name: 'tag', title: '标签', type: 'localeString', group: 'basic' },
    { name: 'description', title: '作品简介', type: 'localeText', group: 'basic' },

    /* --- 封面 --- */
    {
      name: 'coverType',
      title: '封面类型 *',
      type: 'string',
      group: 'cover',
      initialValue: 'image',
      options: {
        layout: 'radio',
        list: [
          { title: '图片封面', value: 'image' },
          { title: '视频封面', value: 'video' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      group: 'cover',
      hidden: ({ parent }: any) => parent?.coverType !== 'image',
      options: { hotspot: true, metadata: ['lqip', 'dimensions'] },
      fields: [
        {
          name: 'alt',
          title: '图片替代文本（Alt）*',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => [
        Rule.custom((v: any, ctx: any) =>
          ctx.parent?.coverType === 'image' && !v ? '图片封面必须上传封面图片' : true
        ),
        maxFileSize(LIMITS.image, '封面图片')(Rule),
      ],
    },
    {
      name: 'coverVideoFile',
      title: '视频文件',
      type: 'file',
      group: 'cover',
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
      options: { accept: 'video/mp4,video/webm,video/ogg' },
      description: '支持 mp4 / webm，建议先压缩后上传。',
      validation: maxFileSize(LIMITS.video, '视频'),
    },
    {
      name: 'coverVideoUrl',
      title: '视频地址（外链）',
      type: 'url',
      group: 'cover',
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
    },
    {
      name: 'coverPoster',
      title: '视频封面（Poster）',
      type: 'image',
      group: 'cover',
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
      options: { hotspot: true, metadata: ['lqip', 'dimensions'] },
      fields: [{ name: 'alt', title: '图片替代文本（Alt）', type: 'string' }],
    },
    {
      name: 'coverAutoplay',
      title: '自动播放',
      type: 'boolean',
      group: 'cover',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
    },
    {
      name: 'coverLoop',
      title: '循环播放',
      type: 'boolean',
      group: 'cover',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
    },
    {
      name: 'coverMuted',
      title: '静音播放',
      type: 'boolean',
      group: 'cover',
      initialValue: true,
      hidden: ({ parent }: any) => parent?.coverType !== 'video',
    },

    /* --- 详情 --- */
    {
      name: 'mediaBlocks',
      title: '详情页媒体模块（可拖拽排序）',
      type: 'array',
      group: 'detail',
      description: '留空时前台自动使用封面媒体。',
      of: [{ type: 'mediaBlock' }],
    },

    /* --- 排序 / 数据 --- */
    {
      name: 'order',
      title: '展示顺序',
      type: 'number',
      group: 'meta',
      description: '数字越小越靠前。可留空（默认 999，排在最后）。',
      initialValue: 999,
    },
    { name: 'likes', title: '点赞数', type: 'number', group: 'meta', initialValue: 0 },
    { name: 'saves', title: '收藏数', type: 'number', group: 'meta', initialValue: 0 },
  ],
  orderings: [
    { title: '展示顺序', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
    { title: '最近更新', name: 'updated', by: [{ field: '_updatedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title.zh',
      subtitle: 'brand.zh',
      group: 'group',
      media: 'coverImage',
      poster: 'coverPoster',
      year: 'year',
    },
    prepare({ title, subtitle, group, media, poster, year }: any) {
      const g: Record<string, string> = {
        visual: '平面/视觉',
        film: '视频',
        star: 'BTS',
        tvc: 'TVC',
      };
      return {
        title: title || '（未命名作品）',
        subtitle: [g[group] || group, year, subtitle].filter(Boolean).join(' · '),
        media: media || poster,
      };
    },
  },
});
