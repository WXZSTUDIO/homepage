# ZHENG CANFENG (정찬봉) — Personal Portfolio & Creative Studio

> **Senior Visual Designer & AI Creative Director**  
> 13 Years Experience (2013 – 2026) · Based in Seoul, South Korea  
> Commercial Cinematography · AI Generative Workflows · K-Beauty & China Cross-Border Brand Architecture

---

## 1. Project Overview (项目概览)

This project is a high-end, bespoke portfolio website for **Zheng Canfeng (郑灿峰 / 정찬봉)**, built as a **dark editorial / magazine layout** — ink-black pages, newsprint-warm type, serif display headlines, hairline rules, folio numbering and an asymmetric grid that gives every work its own measure.

The site serves as an interactive showcase of 13 years of cross-border visual direction, commercial filmmaking, brand identity systems (BI/VI), and generative AI production pipelines for premier brands including **Shinsegae Duty Free (新世界免税店)**, **Amorepacific (爱茉莉太平洋: HERA, IOPE, Vital Beautie)**, **eke Cosmetics**, **Samyang Food**, and **high & gogo**.

---

## 2. Key Motion & Visual Architecture (动效与视觉架构)

Designed to depart completely from generic templates, the site employs cinematic, slow-tempo, high-craft kinetic animations powered by **GSAP (GreenSock Animation Platform)**, **ScrollTrigger**, and **Framer Motion**:

### 🎬 A. Cinema-Grade Opening Animation (首屏开场动效)
- **Preloader & Counter**: Numerical progress counter (`00%` → `100%`) styled in Apple system typography, accompanied by geolocation and studio metadata.
- **Split Mask Reveal**: Upon 100% completion, dual vertical shutters slide away with an organic cubic-bezier curve (`[0.87, 0, 0.13, 1]`), unveiling the fullscreen showreel hero section.
- **Hero Title Kinetic Entrance**: Title lines emerge through hidden overflow masks with a gentle vertical slide, micro-skew (`skewY: 4deg → 0deg`), and subtle scale compression returning to rest.

### 📜 B. Scroll-Triggered Dramatic Typography (滚动视差与大标题进场)
- **Mask Clip Reveals**: As the user scrolls into each section (`Profile`, `Selected Works`, `Capabilities`, `Contact`), massive English display titles trigger a dramatic upward slide with a 1.2s smooth deceleration curve.
- **Staggered Cards Cascade**: Project cards and capability pillars enter with calculated micro-delays (`stagger: 0.12s`), providing depth and rhythm.
- **Curtain Image Wipes & Parallax**: Media assets inside cards feature a delicate clip wipe reveal (`clip-path`) and continuous subtle parallax tracking on hover and scroll.

### 🌐 C. Pure Multilingual Engine (中 · 英 · 韩 三语独立切换)
- **Automatic Browser Detection**: Checks `navigator.language` on first load (`zh` → 简体中文, `ko` → 한국어, others → English).
- **Zero Language Mixing**: Each language state renders 100% pure localized copy across navigation, project titles, client names, deliverables, career histories, and contact forms.
- **Apple-Style Segmented Control**: Seamless pill switcher in the top navigation bar with persistent `localStorage` memory.

---

## 3. Section Breakdown (页面核心模块)

1. **Hero Section (全屏首页)**:
   - Fullscreen video showreel with ambient dark gradients and audio toggle.
   - Restrained Apple-style typography and Seoul live time beacon.
   - Quick statistics and instant scroll navigation triggers.

2. **Experience & Milestones (个人经历与实绩)**:
   - Studio portrait of Zheng Canfeng with status badge and verified coordinates.
   - Executive bio and 4 quantitative milestone metrics (13+ Years, 120+ Commercial Deliveries, 15M+ Views, 100% In-House Gear).
   - Interactive career timeline tabs covering ㈜ 아이콘글로벌 (Icon Global), 삼우생명과학 (Samwoo Life Science), ㈜ 쿼크미디어 (QuarkMedia), and early foundation works.

3. **Selected Works (精选项目卡片流)**:
   - 1700px viewport bento grid featuring expansive cards with Framer Motion interactive hover scaling.
   - Filterable categories: All, Brand & VI, Video & Short-form, AI Generative, Packaging & Social.
   - High-resolution modal lightbox with playable video reels, client deliverables, and technical tags.

4. **Core Capabilities & Gear Arsenal (核心优势与自备器材库)**:
   - 4 fundamental pillars:
     1. *End-to-End Content Production* (全流程闭环内容制作)
     2. *Autonomous In-House Studio & Gear* (自备专业影视器材独立摄制)
     3. *Cross-Border Social Localization* (中韩跨境社媒本土化营销: 小红书/抖音/TikTok)
     4. *AI-Assisted Generative Workflow* (AI生成技术重构创意生产力)
   - Owned equipment catalog (Sony Full-Frame Cinema, G Master Optics, RGB Studio Lighting, Wireless Audio).
   - Technical skill stack matrix across design, cinematography, AI, and platforms.

5. **Contact & Finale (整屏收尾与合作洽谈)**:
   - Full-viewport closing page with commanding typography: *"Let's shape the next iconic moment."*
   - One-click copy for official email (`ro3eandcat@gmail.com`) and WeChat (`icf304`).
   - Interactive project consultation brief form with real-time feedback.
   - Links to Naver Portfolio and Xiaohongshu creator profile.

---

## 4. Technical Stack (技术栈)

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (local PostCSS build, no CDN) with an editorial token set:
  - ink `#09090b` · paper `#F4F1EC` · muted `#9A958C` · faint `#6B675F` · accent `#FFC900`
- **Typography**: a three-voice editorial stack
  - Display (serif): `Instrument Serif` → `Noto Serif SC` → `Songti SC`
  - Text (grotesque): `Inter` → `PingFang SC` / `Apple SD Gothic Neo`
  - Meta (mono): `JetBrains Mono`, used for eyebrows, folios and captions
- **Motion & Kinetic Physics**:
  - `gsap` (GreenSock Animation Platform) + `ScrollTrigger`
  - `framer-motion` (for reactive UI hover states & AnimatePresence modals)
- **Icons**: `lucide-react`
- **Container Math**: 1700px maximum desktop baseline (`max-w-1700 mx-auto px-6 md:px-12`)

---

## 5. Development & Build Commands (开发与构建)

```bash
# Install dependencies
npm install

# Start local development server on port 3000
npm run dev

# Compile and produce production build
npm run build

# Preview production build locally
npm run preview
```

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages. The Vite `base` is relative (`./`), so the same build works at a user-site root or under `/homepage/`.

---

## 6. Content Management — Sanity CMS (内容管理后台)

Site content is maintained in a **Sanity** backend without touching code. The frontend reads it at runtime and always falls back to the bundled dataset, so the page can never go blank.

### 6.1 Architecture (架构)

```
data/types.ts        规范数据形状（组件只认这里）
data/local.ts        本地兜底数据（原 cases.ts / i18n.ts 抽取而来）
data/content.ts      统一接口：getProjects / getProjectBySlug / getResume / getSiteSettings
lib/sanity.ts        Sanity client（只读、published 视角、超时兜底）
lib/queries.ts       全部 GROQ 集中管理
lib/mappers.ts       Sanity 载荷 → 规范类型
hooks/useContent.ts  拉取 + 重新验证（加载时 / 窗口聚焦 / 可选轮询）
ContentContext.tsx   组件唯一的数据入口（useSiteContent / useResume / useSettings）
studio/              Sanity Studio 后台（构建产物部署到 /homepage/studio/）
scripts/seed-sanity.mjs  把本地内容一次性导入 Sanity
```

组件**只调用统一接口**，不直接依赖 Sanity SDK；页面视觉、动画、移动端布局零改动。

### 6.2 Setup (接入步骤)

1. 在 [sanity.io](https://www.sanity.io) 创建项目与 `production` 数据集。
2. 复制 `.env.example` 为 `.env`，填入 `VITE_SANITY_PROJECT_ID`。
3. 在 sanity.io/manage → API → CORS 中添加来源：
   - `https://wxzstudio.github.io`
   - `http://localhost:4173`（本地预览）
4. 后台入口：`https://wxzstudio.github.io/homepage/studio/`（首次需用 Sanity 账号登录）。
5. GitHub 仓库 → Settings → Secrets and variables → Actions，把 `VITE_SANITY_PROJECT_ID` 等加到 **Variables**（只读 Viewer Token 加到 **Secrets**）。

### 6.3 Content migration (内容迁移)

```bash
set SANITY_PROJECT_ID=…          # 或 export
set SANITY_WRITE_TOKEN=…         # Editor 令牌，只在本地用，绝不提交
npm run seed:sanity              # 文字字段
npm run seed:sanity -- --with-media   # 连 public/ 下的图片视频一起上传
```

未导入全部内容前，可设 `VITE_SANITY_MERGE_LOCAL=true` 让本地数据与 CMS 并排显示（同 slug 以 CMS 为准）。

### 6.4 Update strategy (更新策略)

默认（无需任何 Token）：进入页面即取最新已发布内容，窗口重新聚焦时自动重取，可用 `VITE_SANITY_REVALIDATE_SEC` 设定轮询间隔。

**实时更新（可选）**：设 `VITE_SANITY_REALTIME=true` 且配置了**只读 Viewer Token** 时，前台通过 WebSocket 订阅 Sanity 变更事件，后台点「发布」后已打开的页面会自动刷新（600ms 防抖）。之所以默认关闭：监听需要一个浏览器可见的 Token，而写权限 Token 绝不能进前端，所以只在用户主动提供 Viewer Token 时启用。生产环境的另一条升级路径是 Sanity Webhook → GitHub Actions 重建，无需改动任何组件。

- 草稿：仅存于 Studio，前台永远读 `published` 视角。
- 草稿预览：Studio 的「预览草稿」按钮会带 `?preview=1` 打开前台，需配置**只读 Viewer Token**；未配置时该模式自动关闭。
- 未配置 / 超时 / 网络失败 / 某板块为空 → 自动回落本地数据，页面不空白、不报错、组件结构不变。
- 开发环境左下角显示数据来源徽标（local / sanity / mixed）；生产环境不输出任何敏感错误信息。

### 6.5 Studio safeguards (后台风控)

- **上传限制**：图片 / 视频 / 音频 / PDF 分别限制 `accept` 类型，并用异步规则读取 asset 的 `originalFileSize` 校验体积（图片 15MB、视频 100MB、音频 20MB、PDF 20MB），超限在保存前拦下并提示。
- **删除引用警告**：删除任何内容（含图片 / 视频资产）前先 GROQ 查 `references()`，命中引用时列出引用方并要求二次确认。
- **单例保护**：个人资料、网站设置隐藏「新建 / 删除 / 取消发布」；`project` 的 slug 做全站唯一校验。
- **图片管线**：所有 Sanity 图片经 CDN 管线输出 `auto('format')` + 480/768/1024/1440/1920 多档 `srcSet`，浏览器按屏幕自挑最小可用档。

---

## 7. Performance & Animation Discipline (性能与动效法则)

- **Compositor-Only Transforms**: All GSAP and CSS animations animate strictly `transform` (`translateY`, `scale`, `skewY`) and `opacity` to maintain silky 60fps/120fps performance without triggering browser layout thrashing.
- **Will-Change Governance**: Applied selectively to animated masks to enable GPU acceleration without inflating memory overhead.
- **Accessibility (`prefers-reduced-motion`)**: Honors user accessibility preferences by collapsing durations to near-zero and freezing motion triggers.
- **Garbage Collection**: All ScrollTrigger instances and event listeners are properly killed and cleared in `useEffect` cleanup return functions.

---


