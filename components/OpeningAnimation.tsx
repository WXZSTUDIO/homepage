import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    let progressObj = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onCompleteRef.current();
        }
      });

      // Step 1: Animate Counter 0 -> 100 with smooth easing
      tl.to(progressObj, {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(Math.floor(progressObj.value));
        }
      });

      // Step 2: Fade out center counter and title
      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: 'power3.in'
      }, '+=0.06');

      // Step 3: Split curtain wipe reveal (top curtain moves -100%, bottom moves +100%)
      tl.to(topCurtainRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut'
      }, '-=0.15');

      tl.to(bottomCurtainRef.current, {
        yPercent: 100,
        duration: 1.1,
        ease: 'expo.inOut'
      }, '<');

      // Step 4: Hide overall container
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // Run once on mount - never restart unexpectedly

  // Handle immediate skip
  const handleSkip = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        onCompleteRef.current();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden bg-black"
    >
      {/* Top Shutter Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050507] border-b border-white/10 flex items-end justify-between px-8 sm:px-14 pb-8 will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="text-[11px] text-[#86868b] font-mono tracking-widest uppercase">
          ZHENG CANFENG · PORTFOLIO ARCHIVE
        </div>
        <div className="text-[11px] text-[#86868b] font-mono tracking-widest uppercase">
          EST. 2013 / SEOUL, KR
        </div>
      </div>

      {/* Bottom Shutter Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050507] border-t border-white/10 flex items-start justify-between px-8 sm:px-14 pt-8 will-change-transform shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      >
        <div className="text-[11px] text-[#6e6e73] font-mono tracking-widest uppercase">
          VISUAL DIRECTION · AI WORKFLOW · BRAND VI
        </div>
        <button
          onClick={handleSkip}
          className="text-[11px] text-[#86868b] hover:text-white font-mono tracking-widest uppercase transition-colors cursor-pointer"
        >
          [SKIP INTRO]
        </button>
      </div>

      {/* Center Animated Content & Numerical Counter */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Designer Monogram / Title */}
        <div className="overflow-hidden mb-4">
          <div className="text-xs uppercase tracking-[0.3em] text-[#86868b] font-mono text-center">
            CREATIVE DIRECTOR & VISUAL ARCHITECT
          </div>
        </div>

        {/* Big Apple-Style Counter */}
        <div
          ref={counterRef}
          className="text-7xl sm:text-9xl md:text-[11rem] font-semibold text-[#f5f5f7] tracking-[-0.04em] font-sans leading-none"
        >
          {String(progress).padStart(2, '0')}
          <span className="text-3xl sm:text-5xl text-[#86868b] ml-1 font-normal">%</span>
        </div>

        {/* Minimal Loading Bar */}
        <div className="w-48 sm:w-64 h-[1.5px] bg-white/[0.1] rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningAnimation;
