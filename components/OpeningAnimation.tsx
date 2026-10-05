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

      tl.to(progressObj, {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.floor(progressObj.value))
      });

      tl.to(
        contentRef.current,
        { opacity: 0, y: -30, duration: 0.35, ease: 'power3.in' },
        '+=0.06'
      );

      tl.to(
        topCurtainRef.current,
        { yPercent: -100, duration: 1.1, ease: 'expo.inOut' },
        '-=0.15'
      );

      tl.to(
        bottomCurtainRef.current,
        { yPercent: 100, duration: 1.1, ease: 'expo.inOut' },
        '<'
      );

      tl.to(containerRef.current, { opacity: 0, duration: 0.1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkip = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => onCompleteRef.current()
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] select-none overflow-hidden bg-ink"
    >
      {/* Top curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-ink border-b border-rule flex items-end justify-between px-6 sm:px-12 pb-6 will-change-transform"
      >
        <div className="eyebrow">ZHENG CANFENG · PORTFOLIO ARCHIVE</div>
        <div className="eyebrow hidden sm:block">EST. 2013 / SEOUL, KR</div>
      </div>

      {/* Bottom curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-ink border-t border-rule flex items-start justify-between px-6 sm:px-12 pt-6 will-change-transform"
      >
        <div className="eyebrow text-faint">
          VISUAL DIRECTION · AI WORKFLOW · BRAND VI
        </div>
        <button
          onClick={handleSkip}
          className="eyebrow text-muted hover:text-paper transition-colors cursor-pointer"
        >
          [SKIP]
        </button>
      </div>

      {/* Centre: serif folio counter */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="eyebrow mb-6 tracking-[0.3em] text-center">
          CREATIVE DIRECTOR &amp; VISUAL ARCHITECT
        </div>

        <div className="folio text-[6rem] sm:text-[9rem] md:text-[11rem] tracking-[-0.03em]">
          {String(progress).padStart(2, '0')}
          <span className="font-sans text-2xl sm:text-4xl text-faint ml-2 align-top">
            %
          </span>
        </div>

        <div className="w-40 sm:w-64 h-px bg-rule mt-10 overflow-hidden">
          <div
            className="h-full bg-paper transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OpeningAnimation;
