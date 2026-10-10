/* ------------------------------------------------------------------
   把仓库里的本地内容（cases.ts / i18n.ts）一次性导入 Sanity。

   用法（在本地终端执行，写入令牌只存在于你自己的环境变量里）：

     set SANITY_PROJECT_ID=xxxxxxxx
     set SANITY_DATASET=production
     set SANITY_WRITE_TOKEN=skXXXX        # 必须是 Editor/Admin 令牌，且不要提交
     node scripts/seed-sanity.mjs                # 只导入文字字段
     node scripts/seed-sanity.mjs --with-media   # 同时上传本地图片/视频

   --with-media 会读取 public/ 下的实际文件并上传到 Sanity CDN；
   视频文件较大，首次导入可能较慢。
   ------------------------------------------------------------------ */

import { createClient } from '@sanity/client';
import { build } from 'esbuild';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const WITH_MEDIA = process.argv.includes('--with-media');

const projectId = process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || '';

if (!projectId || !token) {
  console.error('缺少 SANITY_PROJECT_ID 或 SANITY_WRITE_TOKEN。');
  console.error('写入操作只允许在本地 / 有权限的环境中执行，令牌不会写入仓库。');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-10-01', token, useCdn: false });

/* --- Load the local dataset (TS) by bundling it with esbuild -------- */
const tmp = await mkdtemp(join(tmpdir(), 'seed-'));
const outfile = join(tmp, 'local.mjs');

await build({
  entryPoints: [join(ROOT, 'data', 'local.ts')],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'error',
});

const local = await import(pathToFileURL(outfile).href);
const projects = local.localProjects();
const resume = local.localResume();
const settings = local.localSettings();

/* --- Asset upload ---------------------------------------------------
   Local content references files under public/ (e.g. "cases/p01.jpg").
   With --with-media we upload them and swap in the Sanity asset ref. */
const assetCache = new Map();

const uploadImage = async (rel) => {
  if (!rel || rel.startsWith('http')) return undefined;
  if (assetCache.has(rel)) return assetCache.get(rel);
  const file = join(ROOT, 'public', rel);
  let asset;
  try {
    const buf = await readFile(file);
    asset = await client.assets.upload('image', buf, { filename: basename(file) });
  } catch {
    asset = undefined;
  }
  assetCache.set(rel, asset);
  return asset;
};

const uploadFile = async (rel) => {
  if (!rel || rel.startsWith('http')) return undefined;
  if (assetCache.has(rel)) return assetCache.get(rel);
  const file = join(ROOT, 'public', rel);
  let asset;
  try {
    const buf = await readFile(file);
    asset = await client.assets.upload('file', buf, { filename: basename(file) });
  } catch {
    asset = undefined;
  }
  assetCache.set(rel, asset);
  return asset;
};

const lang = (v) => (v ? { _type: 'localeString', zh: v.zh || '', ko: v.ko || '', en: v.en || v.zh || '' } : undefined);
const langText = (v) => (v ? { _type: 'localeText', zh: v.zh || '', ko: v.ko || '', en: v.en || v.zh || '' } : undefined);

const imageRef = (asset, alt) =>
  asset ? { _type: 'image', alt: alt || '', asset: { _type: 'reference', _ref: asset._id } } : undefined;

/* --- Build documents ------------------------------------------------ */
const docs = [];

for (const p of projects) {
  const cover = WITH_MEDIA ? await uploadImage(p.coverImage?.url) : undefined;
  const poster = WITH_MEDIA ? await uploadImage(p.coverVideo?.poster) : undefined;
  const video = WITH_MEDIA && p.coverVideo?.url ? await uploadFile(p.coverVideo.url) : undefined;

  const blocks = [];
  for (const [i, b] of (p.media || []).entries()) {
    if (b.type === 'image') {
      const a = WITH_MEDIA ? await uploadImage(b.image?.url) : undefined;
      blocks.push({ _key: b._key || `b${i}`, _type: 'mediaBlock', type: 'image', image: imageRef(a, b.image?.alt) , caption: lang(b.caption)});
    } else if (b.type === 'video') {
      const a = WITH_MEDIA ? await uploadFile(b.video?.url) : undefined;
      const po = WITH_MEDIA ? await uploadImage(b.video?.poster) : undefined;
      blocks.push({
        _key: b._key || `b${i}`,
        _type: 'mediaBlock',
        type: 'video',
        videoFile: a ? { _type: 'file', asset: { _type: 'reference', _ref: a._id } } : undefined,
        poster: imageRef(po),
        autoplay: true,
        loop: b.video?.loop !== false,
        muted: b.video?.muted !== false,
        caption: lang(b.caption),
      });
    }
  }

  docs.push({
    _id: `project-${p.slug}`,
    _type: 'project',
    title: lang(p.title),
    slug: { _type: 'slug', current: p.slug },
    group: p.group,
    year: p.year,
    category: p.category,
    brand: lang(p.brand),
    tag: lang(p.tag),
    description: langText(p.description),
    coverType: p.coverType,
    coverImage: imageRef(cover, p.coverImage?.alt || p.title?.zh),
    coverVideoFile: video ? { _type: 'file', asset: { _type: 'reference', _ref: video._id } } : undefined,
    coverPoster: imageRef(poster),
    coverAutoplay: true,
    coverLoop: true,
    coverMuted: true,
    likes: p.stats?.likes ?? 0,
    saves: p.stats?.saves ?? 0,
    order: p.order,
    mediaBlocks: blocks,
  });
}

/* Resume */
docs.push({
  _id: 'resumeProfile',
  _type: 'resumeProfile',
  name: resume.profile.name,
  role: lang(resume.profile.role),
  bio: langText(resume.profile.bio),
  location: lang(resume.profile.location),
  email: resume.profile.email,
  phone: resume.profile.phone,
});

for (const [i, e] of resume.experiences.entries()) {
  docs.push({
    _id: `experience-${e.id}`,
    _type: 'experience',
    company: lang(e.company),
    role: lang(e.role),
    period: e.period,
    start: e.period,
    current: false,
    order: e.order ?? i,
  });
}

for (const [i, m] of resume.metrics.entries()) {
  docs.push({
    _id: `metric-${i}`,
    _type: 'metric',
    value: m.value,
    suffix: m.suffix,
    unit: lang(m.unit),
    sub: lang(m.sub),
    order: m.order ?? i,
  });
}

for (const [i, c] of resume.contacts.entries()) {
  docs.push({
    _id: `contactLink-${c.id}`,
    _type: 'contactLink',
    platform: c.platform,
    label: lang(c.label),
    url: c.url,
    handle: c.handle,
    order: i,
  });
}

/* Settings */
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: settings.siteName,
  heroHeadline1: lang(settings.hero.headline1),
  heroHeadline2: lang(settings.hero.headline2),
  heroNarrative: langText(settings.hero.narrative),
  heroVideoUrl: settings.hero.video?.url?.startsWith('http') ? settings.hero.video.url : undefined,
  seoTitle: lang(settings.seo.title),
  seoDescription: langText(settings.seo.description),
  footerCopyright: lang(settings.footer.copyright),
  footerLocation: lang(settings.footer.location),
  contactEmail: settings.contact.email,
  contactPhone: settings.contact.phone,
  contactWechat: settings.contact.wechat,
  backgroundMusic: { enabled: false, loop: true, volume: 0.5 },
});

/* --- Commit --------------------------------------------------------- */
const tx = client.transaction();
for (const d of docs) tx.createOrReplace(d);
const res = await tx.commit();

console.log(`已导入 ${docs.length} 篇文档到 ${projectId}/${dataset}`);
console.log(`  · 作品 ${projects.length} 件（媒体上传：${WITH_MEDIA ? '是' : '否'}）`);
if (!WITH_MEDIA) {
  console.log('  · 提示：加 --with-media 可把 public/ 下的图片与视频一并上传到 Sanity CDN。');
}

await rm(tmp, { recursive: true, force: true });
