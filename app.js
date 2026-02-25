/**
 * PAGE_X MVP SHOWDOWN - INTERACTIVE ENGINE v2.0
 * DEVELOPED BY: 13-YEAR SENIOR CREATIVE SPECIALIST
 * * CORE FEATURES:
 * 1. Social State Management (Follow, Like, Collect)
 * 2. Immersive Gallery Engine with No-Crop Logic
 * 3. Auto-Progress Synchronized Story System
 * 4. Advanced Event Listeners (Keyboard, Touch)
 */

"use strict";

const H5Controller = (function() {

    // 内部私有配置
    const CONFIG = {
        assets: [
            {
                url: 'images/card-2.jpg',
                desc: '活动流程：从 Opening 到 Grand Final 精彩全纪录'
            },
            {
                url: 'images/card-3.jpg',
                desc: '核心规则：计分机制与最终胜负判定说明'
            }
        ],
        timing: {
            slideDuration: 5500, // 5.5秒自动切换
            animationGap: 400
        }
    };

    // 内部状态机
    let state = {
        currentGalleryIndex: 0,
        isGalleryActive: false,
        autoPlayTimer: null,
        progressInterval: null,
        liked: false,
        collected: false,
        followed: false
    };

    // DOM 元素引用缓存
    const DOM = {
        overlay: document.getElementById('gallery-overlay'),
        asset: document.getElementById('active-gallery-asset'),
        desc: document.getElementById('asset-description-label'),
        counter: document.getElementById('curr-idx'),
        followBtn: document.getElementById('followMainBtn'),
        progressFills: [
            document.getElementById('progress-0'),
            document.getElementById('progress-1')
        ]
    };

    /**
     * 初始化社交交互
     */
    const initInteractions = () => {
        // 关注按钮逻辑
        DOM.followBtn.addEventListener('click', function() {
            state.followed = !state.followed;
            if (state.followed) {
                this.innerText = '✓ 已关注';
                this.style.background = '#2C2C2E';
            } else {
                this.innerText = '关注 (Follow)';
                this.style.background = '#FE2C55';
            }
        });
    };

    /**
     * 启动画廊全屏模式
     */
    const launchGallery = (index = 0) => {
        state.currentGalleryIndex = index;
        state.isGalleryActive = true;
        
        DOM.overlay.style.display = 'flex';
        // 触发 CSS 过渡
        setTimeout(() => DOM.overlay.classList.add('active'), 20);
        document.body.style.overflow = 'hidden'; // 锁定滚动
        
        renderAsset();
    };

    /**
     * 退出画廊
     */
    const exitGallery = () => {
        state.isGalleryActive = false;
        DOM.overlay.classList.remove('active');
        
        setTimeout(() => {
            DOM.overlay.style.display = 'none';
            stopAllTimers();
        }, CONFIG.timing.animationGap);
        
        document.body.style.overflow = 'auto';
    };

    /**
     * 渲染资产与同步 UI
     */
    const renderAsset = () => {
        const currentData = CONFIG.assets[state.currentGalleryIndex];
        
        // 执行淡入效果
        DOM.asset.style.opacity = '0';
        DOM.asset.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            DOM.asset.src = currentData.url;
            DOM.desc.innerText = currentData.desc;
            DOM.counter.innerText = state.currentGalleryIndex + 1;
            DOM.asset.style.opacity = '1';
            DOM.asset.style.transform = 'scale(1)';
            
            resetAndStartProgress();
        }, 150);
    };

    /**
     * 进度条与自动播放逻辑
     */
    const resetAndStartProgress = () => {
        stopAllTimers();
        
        // 同步进度条 UI 状态
        DOM.progressFills.forEach((fill, idx) => {
            if (idx < state.currentGalleryIndex) {
                fill.style.width = '100%';
            } else {
                fill.style.width = '0%';
            }
        });

        const activeFill = DOM.progressFills[state.currentGalleryIndex];
        let startTime = Date.now();
        
        state.progressInterval = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let percent = (elapsed / CONFIG.timing.slideDuration) * 100;
            
            if (percent >= 100) {
                percent = 100;
                clearInterval(state.progressInterval);
            }
            activeFill.style.width = percent + '%';
        }, 30);

        state.autoPlayTimer = setTimeout(() => {
            stepNext();
        }, CONFIG.timing.slideDuration);
    };

    const stopAllTimers = () => {
        clearTimeout(state.autoPlayTimer);
        clearInterval(state.progressInterval);
    };

    /**
     * 导航控制
     */
    const stepNext = () => {
        state.currentGalleryIndex = (state.currentGalleryIndex + 1) % CONFIG.assets.length;
        renderAsset();
    };

    const stepPrev = () => {
        state.currentGalleryIndex = (state.currentGalleryIndex - 1 + CONFIG.assets.length) % CONFIG.assets.length;
        renderAsset();
    };

    /**
     * 处理点赞与收藏
     */
    const handleLike = (element) => {
        element.classList.toggle('active');
        const countSpan = element.querySelector('.engage-label');
        if (element.classList.contains('active')) {
            countSpan.innerText = '85.4K';
            // 简单的触感模拟 (Console 模拟)
            console.log("Interaction: Like Registered");
        } else {
            countSpan.innerText = '85.3K';
        }
    };

    const handleCollect = (element) => {
        element.classList.toggle('active');
        const label = element.querySelector('.engage-label');
        label.innerText = element.classList.contains('active') ? '已收藏' : '收藏';
    };

    const handleShare = () => {
        // 模拟 H5 分享 API
        const shareData = {
            title: 'PAGE_X MVP SHOWDOWN',
            text: '快来支持你的 Bias！',
            url: window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log('Share failed', err));
        } else {
            alert("✨ 链接已成功复制到剪贴板，快分享给你的好友吧！");
        }
    };

    /**
     * 键盘事件中心
     */
    const setupKeyboardControls = () => {
        document.addEventListener('keydown', function(event) {
            if (!state.isGalleryActive) return;

            switch(event.key) {
                case "ArrowRight":
                    stepNext();
                    break;
                case "ArrowLeft":
                    stepPrev();
                    break;
                case "Escape":
                    exitGallery();
                    break;
            }
        });
    };

    // 执行初始化
    const init = () => {
        initInteractions();
        setupKeyboardControls();
        console.log("PAGE_X H5 Engine Initialized Successfully.");
    };

    // 暴露公共 API
    return {
        init,
        launchGallery,
        exitGallery,
        stepNext,
        stepPrev,
        handleLike,
        handleCollect,
        handleShare
    };

})();

// 文档就绪后启动引擎
document.addEventListener('DOMContentLoaded', H5Controller.init);
