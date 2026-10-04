import React, { useRef, useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data';
import { ArrowDown, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onContact }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  // Live Seoul Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const seoulTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setCurrentTime(seoulTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black pt-32 pb-12"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/shinsegae_luxury_visual_1791140086284.jpg"
          className="w-full h-full object-cover opacity-40 scale-100 filter contrast-110 brightness-75 transition-opacity duration-1000"
        >
          <source
            src="https://wxzstudio.github.io/videos/portfolio-2024-showreel.mp4"
            type="video/mp4"
          />
        </video>

        {/* Apple-style Smooth Dark Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
      </div>

      {/* Top Tagline Row */}
      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Apple-style Status Pill */}
        <div className="flex items-center space-x-3 text-[13px] text-[#86868b]">
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#f5f5f7] font-normal">Available for Q2/Q3 Projects</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-[#86868b]">
            Seoul: <span className="text-[#f5f5f7] font-medium">{currentTime || '12:00:00'}</span>
          </span>
        </div>

        {/* Discipline Breadcrumb */}
        <div className="text-[13px] text-[#86868b] flex items-center space-x-2">
          <span>Visual Direction</span>
          <span className="text-white/20">/</span>
          <span>AI Generative</span>
          <span className="text-white/20">/</span>
          <span>Brand Architecture</span>
        </div>
      </div>

      {/* Center Apple-style Headline & Narrative */}
      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 my-auto py-12 md:py-16">
        <div className="max-w-4xl">
          {/* Eyebrow / Kicker */}
          <div className="inline-flex items-center space-x-2 mb-4 text-[#f5f5f7] text-sm md:text-base font-normal tracking-[-0.01em]">
            <span className="text-accent font-medium">13-Year Senior Designer & Director</span>
            <span className="text-white/20">·</span>
            <span className="text-[#86868b]">{PERSONAL_INFO.nameZh} ({PERSONAL_INFO.nameKr})</span>
          </div>

          {/* Master Headline - Apple typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.05] mb-6">
            Bridging vision <br />
            <span className="bg-gradient-to-r from-[#f5f5f7] via-[#e5e5ea] to-[#86868b] bg-clip-text text-transparent">
              and hyper-craft.
            </span>
          </h1>

          {/* Subheading Narrative */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#86868b] font-normal max-w-2xl leading-relaxed mb-4 tracking-[-0.015em]">
            以视觉设计为基底，贯通商业摄影摄像、后期调色至{' '}
            <span className="text-[#f5f5f7]">AI 生产力工作流</span> 的全流程闭环。
          </p>

          <p className="text-sm sm:text-base text-[#6e6e73] font-normal max-w-xl leading-relaxed mb-8">
            기획부터 촬영, 편집, 그래픽, 오프라인 출력까지 자체 보유 장비 기반의 내재화된 프로세스.
            신세계면세점, 아모레퍼시픽 등 글로벌 시장을 위한 실무형 비주얼 크리에이티브.
          </p>

          {/* Apple-style Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-full bg-[#f5f5f7] text-black font-medium text-sm tracking-[-0.01em] hover:bg-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center space-x-2 active:scale-95"
            >
              <span>浏览精选作品</span>
              <ArrowDown size={15} />
            </button>

            <button
              onClick={onContact}
              className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[#f5f5f7] font-medium text-sm tracking-[-0.01em] transition-all duration-300 flex items-center space-x-1.5 active:scale-95"
            >
              <span>预约合作</span>
              <ArrowUpRight size={15} className="text-accent" />
            </button>

            {/* Video Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[#86868b] hover:text-[#f5f5f7] transition-colors"
              title={isMuted ? 'Unmute Showreel' : 'Mute Showreel'}
              aria-label="Toggle Showreel Audio"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-accent" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quick Metrics & Credentials */}
      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#86868b]">
        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          <div>
            <span className="text-[#f5f5f7] font-medium">13+ Years</span> Experience
          </div>
          <span className="text-white/10">·</span>
          <div>
            <span className="text-[#f5f5f7] font-medium">100+</span> Commercial Projects
          </div>
          <span className="text-white/10">·</span>
          <div>
            <span className="text-accent font-medium">Shinsegae · Amorepacific</span>
          </div>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center space-x-1.5 text-[#86868b] hover:text-[#f5f5f7] transition-colors self-start sm:self-auto"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={13} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
