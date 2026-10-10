import { useCallback, useMemo } from 'react';
import {
  useClient,
  type DocumentActionComponent,
  type DocumentActionProps,
} from 'sanity';

/* ------------------------------------------------------------------
   删除前引用检查。

   包装 Studio 自带的删除动作：先查该文档（或图片 / 视频 / 音频资产）
   是否被别的内容引用，命中就列出引用方并要求二次确认，避免误删导致
   前台出现空洞。自身实现确认逻辑，因此不依赖任何内部导出。
   ------------------------------------------------------------------ */

const labelOf = (d: any): string =>
  d?.title?.zh ||
  d?.title?.ko ||
  d?.title ||
  d?.name ||
  d?.slug?.current ||
  d?.originalFilename ||
  d?._id ||
  '未命名内容';

const TYPE_CN: Record<string, string> = {
  project: '作品',
  experience: '工作经历',
  resumeEntry: '履历条目',
  metric: '指标数字',
  client: '合作品牌',
  contactLink: '联系方式',
  resumeProfile: '个人资料',
  siteSettings: '网站设置',
  'sanity.imageAsset': '图片资产',
  'sanity.fileAsset': '文件资产',
};

export const withUsageWarning =
  (Original: DocumentActionComponent): DocumentActionComponent =>
  (props: DocumentActionProps) => {
    const client = useClient({ apiVersion: '2024-10-01' });
    const original = Original(props);
    const baseId = useMemo(() => props.id.replace(/^drafts\./, ''), [props.id]);

    const onHandle = useCallback(async () => {
      let refs: any[] = [];
      try {
        refs = await client.fetch<any[]>(
          `*[references($id) && !(_id in path("drafts.**"))][0...20]{
            _id, _type, title, name, slug, originalFilename
          }`,
          { id: baseId }
        );
      } catch {
        refs = [];
      }

      if (refs.length > 0) {
        const list = refs
          .slice(0, 8)
          .map((r) => `· ${TYPE_CN[r._type] || r._type}：${labelOf(r)}`)
          .join('\n');
        const more = refs.length > 8 ? `\n…以及其他 ${refs.length - 8} 处` : '';
        const ok = window.confirm(
          `⚠️ 该内容正被 ${refs.length} 处引用：\n\n${list}${more}\n\n删除后这些引用会失效，前台可能出现空缺。确定继续删除吗？`
        );
        if (!ok) return;
      }

      await original?.onHandle?.();
    }, [client, baseId, original]);

    if (!original) return null;

    return {
      ...original,
      onHandle,
      title: '删除前会先检查该内容是否被引用',
    } as any;
  };

export default withUsageWarning;
