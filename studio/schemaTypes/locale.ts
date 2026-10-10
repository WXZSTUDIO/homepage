import { defineType } from 'sanity';

/* 单行多语言文本 —— 用于标题、品牌名、标签等短字段。 */
export const localeString = defineType({
  name: 'localeString',
  title: '多语言文本（单行）',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    { name: 'zh', title: '中文', type: 'string' },
    { name: 'ko', title: '한국어（韩语）', type: 'string' },
    { name: 'en', title: 'English（英语）', type: 'string' },
  ],
});

/* 多行多语言文本 —— 用于简介、描述等长字段。 */
export const localeText = defineType({
  name: 'localeText',
  title: '多语言文本（多行）',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    { name: 'zh', title: '中文', type: 'text', rows: 4 },
    { name: 'ko', title: '한국어（韩语）', type: 'text', rows: 4 },
    { name: 'en', title: 'English（英语）', type: 'text', rows: 4 },
  ],
});
