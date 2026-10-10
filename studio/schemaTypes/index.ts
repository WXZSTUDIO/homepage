import { localeString, localeText } from './locale';
import { mediaBlock } from './mediaBlock';
import { project } from './project';
import {
  resumeProfile,
  experience,
  resumeEntry,
  metric,
  client,
  contactLink,
} from './resume';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  /* 作品 */
  project,
  mediaBlock,
  /* 履历 */
  resumeProfile,
  experience,
  resumeEntry,
  metric,
  client,
  contactLink,
  /* 全局 */
  siteSettings,
  /* 共用字段类型 */
  localeString,
  localeText,
];

/* 单例文档 —— 只允许存在一篇，后台不显示“新建”按钮 */
export const SINGLETONS = ['siteSettings', 'resumeProfile'];
