import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, SINGLETONS } from './schemaTypes';
import { PreviewSiteAction } from './actions/PreviewSiteAction';
import { withUsageWarning } from './actions/DeleteWithUsageWarning';
import { SITE_URL } from './siteUrl';

/* ------------------------------------------------------------------
   配置全部来自环境变量，projectId 绝不硬编码在源码里。
   复制根目录 .env.example 为 .env 后填写即可。
   ------------------------------------------------------------------ */

const env = import.meta.env;

const projectId = (env.VITE_SANITY_PROJECT_ID as string) || '';
const dataset = (env.VITE_SANITY_DATASET as string) || 'production';
const apiVersion = (env.VITE_SANITY_API_VERSION as string) || '2024-10-01';
const studioBasePath = (env.VITE_SANITY_STUDIO_BASE_PATH as string) || '/homepage/studio';

/* 自定义后台结构：
   - 单例文档只显示一篇，隐藏「新建 / 删除」
   - 按内容域分组，中文命名 */
const structure = (S: any) =>
  S.list()
    .title('内容管理后台')
    .items([
      S.listItem()
        .title('作品集')
        .id('project')
        .child(S.documentTypeList('project').title('作品').defaultOrdering([{ field: 'order', direction: 'asc' }])),
      S.divider(),
      S.listItem()
        .title('个人资料')
        .id('resumeProfile')
        .child(S.document().schemaType('resumeProfile').documentId('resumeProfile')),
      S.listItem()
        .title('工作经历')
        .id('experience')
        .child(S.documentTypeList('experience').title('工作经历')),
      S.listItem()
        .title('履历条目')
        .id('resumeEntry')
        .child(
          S.list()
            .title('履历条目')
            .items([
              S.listItem()
                .title('教育经历')
                .child(
                  S.documentTypeList('resumeEntry')
                    .title('教育经历')
                    .filter('_type == $type && kind == $kind')
                    .params({ type: 'resumeEntry', kind: 'education' })
                ),
              S.listItem()
                .title('获奖经历')
                .child(
                  S.documentTypeList('resumeEntry')
                    .title('获奖经历')
                    .filter('_type == $type && kind == $kind')
                    .params({ type: 'resumeEntry', kind: 'award' })
                ),
              S.listItem()
                .title('展览 / 活动')
                .child(
                  S.documentTypeList('resumeEntry')
                    .title('展览 / 活动')
                    .filter('_type == $type && kind == $kind')
                    .params({ type: 'resumeEntry', kind: 'exhibition' })
                ),
              S.listItem()
                .title('服务能力')
                .child(
                  S.documentTypeList('resumeEntry')
                    .title('服务能力')
                    .filter('_type == $type && kind == $kind')
                    .params({ type: 'resumeEntry', kind: 'service' })
                ),
              S.listItem()
                .title('技能标签')
                .child(
                  S.documentTypeList('resumeEntry')
                    .title('技能标签')
                    .filter('_type == $type && kind == $kind')
                    .params({ type: 'resumeEntry', kind: 'skill' })
                ),
            ])
        ),
      S.listItem()
        .title('指标数字')
        .id('metric')
        .child(S.documentTypeList('metric').title('指标数字')),
      S.listItem()
        .title('合作品牌 / 客户')
        .id('client')
        .child(S.documentTypeList('client').title('合作品牌 / 客户')),
      S.listItem()
        .title('联系方式')
        .id('contactLink')
        .child(S.documentTypeList('contactLink').title('联系方式 / 社交平台')),
      S.divider(),
      S.listItem()
        .title('网站全局设置')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);

export default defineConfig({
  basePath: studioBasePath,
  name: 'STUDIO (WXZ) 内容后台',
  title: 'STUDIO (WXZ) · 内容管理',
  projectId: projectId || 'unconfigured',
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // GROQ 调试台，仅用于开发排障
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    /* 发布前在正式网站上预览；删除 / 取消发布等操作二次确认 */
    actions: (prev, context) => {
      const isSingleton = SINGLETONS.includes(context.schemaType);
      let actions = prev;
      if (isSingleton) {
        actions = actions.filter(
          (a) => a.action !== 'duplicate' && a.action !== 'delete' && a.action !== 'unpublish'
        );
      } else {
        /* 删除前检查引用，避免误删正在使用的图片 / 视频 / 内容 */
        actions = actions.map((a) =>
          a.action === 'delete' ? withUsageWarning(a as any) : a
        );
      }
      return [PreviewSiteAction, ...actions];
    },
  },
});
