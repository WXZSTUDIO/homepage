/**
 * PAGE_X MVP SHOWDOWN - H5 INTERACTIVE ENGINE v4.0
 * 包含：动态秒级倒计时、高级画廊控制、社交模拟系统、状态维持
 */

"use strict";

const H5Control = (function() {

    // 状态配置
    const DATA = {
        targetTime: new Date("2026-03-01T08:30:00+09:00").getTime(), // KST 时间
        images: ['images/card-2.jpg', 'images/card-3.jpg'],
        titles: ['STAGE 1-4: BATTLE PROCESS', 'RULES: SCORE & MVP SYSTEM'],
        descs: ['详细了解从 Tap Tap Dance 到 Singing Round 的晋级规则', '积分累计制与最终胜负判定标准的官方说明'],
        duration: 6000 // 6秒
    };

    let state = {
        idx: 0,
        active: false,
        timer: null,
        pTimer: null,
        liked: false,
        collected: false
    };

    // 缓存元素
    const el = {
        overlay: document.getElementById('gallery-ui'),
        vImg: document.getElementById('viewImg'),
        vTitle: document.getElementById('viewTitle'),
        vDesc: document.getElementById('viewDesc'),
        fills: [document.getElementById('step-0'), document.getElementById('step-1')],
        t: {
            d: document.getElementById('t-d'),
            h: document.getElementById('t-h'),
            m: document.getElementById('t-m'),
            s: document.getElementById('t-s')
        }
    };

    /**
     * 核心功能：动态倒计时
     */
    const startCountdown = () => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = DATA.targetTime - now;

            if (diff <= 0) {
                document.getElementById('timerMain').innerHTML = "SHOWCASE LIVE NOW";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            el.t.d.innerText = String(days).padStart(2, '0');
            el.t.h.innerText = String(hours).padStart(2, '0');
            el.t.m.innerText = String(mins).padStart(2, '0');
            el.t.s.innerText = String(secs).padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    };

    /**
     * 画廊引擎
     */
    const openGallery = (i) => {
        state.idx = 0;
        state.active = true;
        el.overlay.style.display = 'flex';
        setTimeout(() => el.overlay.classList.add('active'), 50);
        document.body.style.overflow = 'hidden';
        render();
    };

    const closeGallery = () => {
        state.active = false;
        el.overlay.classList.remove('active');
        setTimeout(() => el.overlay.style.display = 'none', 450);
        document.body.style.overflow = 'auto';
        stopAll();
    };

    const render = () => {
        el.vImg.style.opacity = '0';
        setTimeout(() => {
            el.vImg.src = DATA.images[state.idx];
            el.vTitle.innerText = DATA.titles[state.idx];
            el.vDesc.innerText = DATA.descs[state.idx];
            el.vImg.style.opacity = '1';
            syncProgress();
        }, 200);
    };

    const syncProgress = () => {
        stopAll();
        el.fills.forEach((f, i) => f.style.width = i < state.idx ? '100%' : '0%');

        const activeFill = el.fills[state.idx];
        let p = 0;
        state.pTimer = setInterval(() => {
            p += 1;
            activeFill.style.width = p + '%';
            if (p >= 100) clearInterval(state.pTimer);
        }, DATA.duration / 100);

        state.timer = setTimeout(next, DATA.duration);
    };

    const stopAll = () => {
        clearTimeout(state.timer);
        clearInterval(state.pTimer);
    };

    const next = () => {
        state.idx = (state.idx + 1) % DATA.images.length;
        render();
    };

    const prev = () => {
        state.idx = (state.idx - 1 + DATA.images.length) % DATA.images.length;
        render();
    };

    /**
     * 社交逻辑模拟
     */
    const like = () => {
        state.liked = !state.liked;
        const btn = document.getElementById('likeAction');
        const count = document.getElementById('likeCount');
        btn.classList.toggle('active');
        count.innerText = state.liked ? '85.4K' : '85.3K';
    };

    const collect = () => {
        state.collected = !state.collected;
        const btn = document.getElementById('collectAction');
        const label = document.getElementById('collectLabel');
        btn.classList.toggle('collected');
        label.innerText = state.collected ? '已保存' : '收藏';
    };

    const share = () => {
        alert("✨ 链接已复制！快去为你的王（KING）招募支持者吧！");
    };

    // 键盘监听
    document.addEventListener('keydown', (e) => {
        if (!state.active) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'Escape') closeGallery();
    });

    // 初始化
    const init = () => {
        startCountdown();
        document.getElementById('mainFollowBtn').onclick = function() {
            this.innerText = this.innerText.includes('关注') ? '✓ 已关注' : '关注 (Follow)';
            this.style.background = this.innerText.includes('已关注') ? '#2C2C2E' : '#FE2C55';
        };
        console.log("PAGE_X H5 Professional Engine v4.0 Online.");
    };

    return { openGallery, closeGallery, next, prev, like, collect, share, init };
})();

document.addEventListener('DOMContentLoaded', H5Control.init);
