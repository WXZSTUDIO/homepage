import type { DocumentActionComponent, DocumentActionProps } from 'sanity';
import { SITE_URL } from '../siteUrl';

/* ------------------------------------------------------------------
   「在网站预览」动作。

   - 已发布：直接打开正式网站对应位置。
   - 只有草稿：提示草稿不会出现在正式网站，并带上 ?preview=1
     （前端在配置了只读 Viewer Token 时才以草稿视角渲染）。
   ------------------------------------------------------------------ */

const PreviewSiteAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const { id, draft, published, type } = props;

  const slug = ((draft as any)?.slug?.current ||
    (published as any)?.slug?.current) as string | undefined;
  const isPublished = Boolean(published);
  const isDraftOnly = Boolean(draft) && !published;

  const buildUrl = () => {
    const base = SITE_URL.replace(/\/$/, '');
    if (type === 'project' && slug) return `${base}/?preview=1#/works/${slug}`;
    if (type === 'project') return `${base}/?preview=1#works`;
    return `${base}/?preview=1`;
  };

  return {
    label: isDraftOnly ? '预览草稿' : '在网站预览',
    tone: isDraftOnly ? 'caution' : 'primary',
    disabled: !isPublished && !draft,
    title: isDraftOnly
      ? '该文档仅有草稿。正式网站只显示已发布内容；如需在线查看草稿，请在正式网站开启预览模式（需要只读 Viewer Token）。'
      : '在新标签页打开正式网站对应内容',
    onHandle: () => {
      window.open(buildUrl(), '_blank', 'noopener,noreferrer');
    },
  } as any;
};

export { PreviewSiteAction };
export default PreviewSiteAction;
