/* ------------------------------------------------------------------
   上传限制 —— 格式用 options.accept，体积用异步校验。

   Sanity 的 asset 文档里带 originalFileSize（字节），校验规则里可以
   通过 context.getClient 读出来，超限就在保存前拦下并给出中文提示。
   ------------------------------------------------------------------ */

const MB = 1024 * 1024;

/** 返回一条可直接赋给 field.validation 的规则函数。 */
export const maxFileSize = (maxMb: number, label = '文件') => (Rule: any) =>
  Rule.custom(async (value: any, ctx: any) => {
    const ref = value?.asset?._ref;
    if (!ref) return true;
    try {
      const client = ctx.getClient({ apiVersion: '2024-10-01' });
      const size: number | null = await client.fetch(
        `*[_id == $id][0].originalFileSize`,
        { id: ref }
      );
      if (typeof size === 'number' && size > maxMb * MB) {
        return `${label}过大（${(size / MB).toFixed(1)}MB），请压缩到 ${maxMb}MB 以内再上传`;
      }
    } catch {
      /* 读不到体积时不阻断保存 */
    }
    return true;
  });

/** 各类资源的体积上限（MB） */
export const LIMITS = {
  image: 15,
  video: 100,
  audio: 20,
  pdf: 20,
} as const;
