# ZHENG CANFENG (정찬봉) — Personal Portfolio & Creative Studio

> **Senior Visual Designer & AI Creative Director**  
> 13 Years Experience (2013 – 2026) · Based in Seoul, South Korea  
> Commercial Cinematography · AI Generative Workflows · K-Beauty & China Cross-Border Brand Architecture

---

## 1. Project Overview (项目概览)

This project is a high-end, bespoke portfolio website for **Zheng Canfeng (郑灿峰 / 정찬봉)**, built with an editorial dark aesthetic inspired by modern luxury creative agencies and Apple's refined design language. 

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
- **Styling**: Tailwind CSS + Custom Dark Theme Tokens (`#000000`, `#0d0d0f`, `#f5f5f7`, `#FFC900`)
- **Typography**: Apple System Font Stack (`-apple-system`, `SF Pro Display`, `SF Pro Text`, `PingFang SC`, `Apple SD Gothic Neo`, `Inter`)
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

---

## 6. Performance & Animation Discipline (性能与动效法则)

- **Compositor-Only Transforms**: All GSAP and CSS animations animate strictly `transform` (`translateY`, `scale`, `skewY`) and `opacity` to maintain silky 60fps/120fps performance without triggering browser layout thrashing.
- **Will-Change Governance**: Applied selectively to animated masks to enable GPU acceleration without inflating memory overhead.
- **Accessibility (`prefers-reduced-motion`)**: Honors user accessibility preferences by collapsing durations to near-zero and freezing motion triggers.
- **Garbage Collection**: All ScrollTrigger instances and event listeners are properly killed and cleared in `useEffect` cleanup return functions.

---

© 2026 ZHENG CANFENG (정찬봉). All Rights Reserved.
