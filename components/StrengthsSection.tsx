import React from 'react';
import { STRENGTHS, SKILL_STACK } from '../data';
import { 
  Camera, Cpu, Globe2, Layers, CheckCircle2, 
  Sparkles, Wrench, ShieldCheck 
} from 'lucide-react';

const StrengthsSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'end-to-end':
        return <Layers className="text-accent" size={22} />;
      case 'gear-autonomous':
        return <Camera className="text-accent" size={22} />;
      case 'global-localization':
        return <Globe2 className="text-accent" size={22} />;
      case 'ai-creative-engine':
        return <Cpu className="text-accent" size={22} />;
      default:
        return <Sparkles className="text-accent" size={22} />;
    }
  };

  const gearItems = [
    { name: 'Sony Full-Frame Cinema / Alpha System', category: 'Camera Bodies' },
    { name: 'G Master & High-Resolution Prime Lens Set', category: 'Optics' },
    { name: 'COB Tungsten & Full-Color RGB Studio Lighting', category: 'Lighting' },
    { name: 'Wireless Lavalier & Shotgun Field Audio Mic', category: 'Audio' },
    { name: '3-Axis Motorized Gimbal & Sliders', category: 'Stabilization' },
    { name: 'Color-Calibrated ProArt 4K HDR Monitor', category: 'Post-Grading' },
  ];

  return (
    <section id="strengths" className="relative py-28 md:py-36 bg-[#0a0a0c] border-t border-white/[0.08]">
      <div className="max-w-1700 mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#86868b] mb-2 font-normal">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#f5f5f7] tracking-[-0.03em]">
              Why collaborate.
            </h2>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed tracking-[-0.01em]">
            디자이너의 조형 감각과 영상 감독의 연출력, 여기에 AI 기술의 속도를 더해 브랜드의 실질적인 문제를 해결합니다.
          </p>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 mb-16">
          {STRENGTHS.map((item) => (
            <div
              key={item.id}
              className="group p-7 md:p-9 rounded-2xl bg-[#121214] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Number + Icon */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-2xl font-semibold text-[#86868b]">
                    {item.number}
                  </span>
                </div>

                {/* Card Titles */}
                <div className="mb-3.5">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-sm font-medium text-[#f5f5f7]/90">
                    {item.titleKr}
                  </div>
                  <div className="text-xs text-[#86868b] mt-0.5 font-normal">
                    {item.subtitle}
                  </div>
                </div>

                {/* Narrative */}
                <p className="text-[#86868b] text-sm font-normal leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* Key Points */}
                <div className="space-y-2 mb-5 border-t border-white/[0.06] pt-4">
                  {item.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-2 text-xs text-[#f5f5f7]/90 font-normal">
                      <CheckCircle2 size={13} className="text-accent shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] text-[#86868b] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extended Section: Specialized Gear & Comprehensive Skill Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 pt-10 border-t border-white/[0.08]">
          {/* Left: In-House Production Gear Arsenal (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-[#121214] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-accent mb-2">
                <Wrench size={13} />
                <span>Production Gear</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em] mb-2">
                자체 보유 장비 (Owned Gear)
              </h3>
              <p className="text-[#86868b] text-xs sm:text-sm font-normal leading-relaxed mb-5">
                외부 장비 렌탈 없이 상시 출동 가능한 단독 프로덕션 키트.
                상업 광고, 뷰티 제품 촬영, 현장 숏폼을 즉각적인 스케줄로 소화합니다.
              </p>

              <div className="space-y-2.5">
                {gearItems.map((gear, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs"
                  >
                    <span className="text-[#f5f5f7] font-normal truncate max-w-[70%]">
                      {gear.name}
                    </span>
                    <span className="text-accent text-[11px] shrink-0 font-medium">
                      {gear.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
              <span>Zero lead time deployment</span>
              <span className="text-accent font-medium">Ready</span>
            </div>
          </div>

          {/* Right: Technical Skill Stack Matrix (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#121214] border border-white/[0.08]">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-accent mb-2">
              <ShieldCheck size={13} />
              <span>Skill Matrix</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em] mb-2">
              전문 스킬 셋 (Skill Stack)
            </h3>
            <p className="text-[#86868b] text-xs sm:text-sm font-normal leading-relaxed mb-6">
              2D 그래픽 디자인부터 영화급 영상 후반 편집, 그리고 최신 생성형 AI 모델링까지 아우릅니다.
            </p>

            <div className="space-y-4">
              {SKILL_STACK.map((group, idx) => (
                <div key={idx} className="border-b border-white/[0.06] pb-3.5 last:border-b-0">
                  <div className="text-xs uppercase tracking-wider text-[#6e6e73] mb-2">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#f5f5f7] text-xs border border-white/[0.06] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
