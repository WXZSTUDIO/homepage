import React, { useState } from 'react';
import { PERSONAL_INFO, METRICS, CAREER_HISTORY } from '../data';
import { 
  Copy, Check, ArrowUpRight, Award, Briefcase, 
  MapPin, Mail, Phone, Calendar, ChevronRight
} from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeCareerTab, setActiveCareerTab] = useState(CAREER_HISTORY[0].id);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('010-8388');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const currentCareer = CAREER_HISTORY.find((c) => c.id === activeCareerTab) || CAREER_HISTORY[0];

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#0a0a0c] border-t border-white/[0.08]">
      <div className="relative z-10 max-w-1700 mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#86868b] mb-2 font-normal">
              Profile & Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#f5f5f7] tracking-[-0.03em]">
              Proven track record.
            </h2>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed tracking-[-0.01em]">
            13년간 다져온 시각 언어의 깊이와 장비 기반의 자율성.
            콘텐츠 기획부터 납품까지 전 공정을 내재화한 실무형 크리에이터.
          </p>
        </div>

        {/* Top Part: Portrait + Bio & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20 items-start">
          {/* Left Column: Portrait & Direct Contact Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* Portrait Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-[#121214] border border-white/[0.08] group shadow-xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="/src/assets/images/designer_chanbong_portrait_1791140071150.jpg"
                  alt="정찬봉 (CHANBONG JUNG)"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Status Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[12px] text-[#f5f5f7] flex items-center space-x-1.5 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Seoul · 1994 (32세)</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/10 text-[#f5f5f7] text-[11px] font-medium">
                  13Y Master
                </span>
              </div>

              {/* Bottom Scrim with Name & Credentials */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                  {PERSONAL_INFO.nameZh} / {PERSONAL_INFO.nameKr}
                </h3>
                <p className="text-accent text-xs font-medium tracking-wide mt-1">
                  {PERSONAL_INFO.titleEn}
                </p>
              </div>
            </div>

            {/* Direct Contact & Meta Snapshot */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-3.5">
              <div className="text-xs uppercase tracking-wider text-[#86868b] font-normal">
                Direct Touchpoint
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={15} className="text-accent" />
                  <span className="text-[#f5f5f7] text-xs sm:text-sm truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-[#86868b] hover:text-[#f5f5f7] px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] transition-colors flex items-center space-x-1 shrink-0 ml-2"
                >
                  {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center space-x-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#86868b]">
                  <MapPin size={13} className="text-accent shrink-0" />
                  <span className="truncate">서울 광진구 자양동</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#86868b]">
                  <div className="flex items-center space-x-2 truncate">
                    <Phone size={13} className="text-accent shrink-0" />
                    <span>010-****-8388</span>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="hover:text-white transition-colors ml-1"
                    title="Copy full contact"
                  >
                    {copiedPhone ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                </div>
              </div>

              {/* External Verified Links */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
                >
                  <span>Naver Portfolio</span>
                  <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.xiaohongshuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
                >
                  <span>小红书 Profile</span>
                  <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Quantitative Impact (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Bio Narrative */}
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-accent text-xs">
                <Award size={13} />
                <span>Executive Bio · 실무 총괄 소개</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f7] tracking-[-0.025em] leading-snug">
                “콘텐츠의 완성도를 타협하지 않기 위해, 기획부터 촬영·후반 편집·AI 워크플로우까지 내재화했습니다.”
              </h3>

              <div className="space-y-4 text-[#86868b] text-sm md:text-base font-normal leading-relaxed">
                <p>
                  디자인을 전공하며 시각적 사고의 단단한 기초를 다졌고, 2021년부터 다양한 국내외 브랜드의 파트너로 일하며
                  <strong className="text-[#f5f5f7] font-medium"> 기획, 촬영, 후반 편집, 그래픽 디자인, 오프라인 출력</strong>에 이르기까지
                  콘텐츠의 제작 전 공정을 스케일업할 수 있는 내재화된 프로세스를 구축해 왔습니다.
                </p>
                <p>
                  자체 보유한 전문 촬영 및 조명 장비를 기반으로, 외주 섭외에 드는 리드 타임과 제작 비용을 획기적으로 절감하며
                  중소규모의 상업 촬영 및 숏폼 프로덕션을 독립적으로 완수할 수 있습니다.
                </p>
                <p className="border-l-2 border-accent/70 pl-4 text-[#f5f5f7]">
                  중화권 시장으로 비즈니스를 확장하거나 글로벌 마케팅을 전개할 때, 현지 트렌드를 관통하는 비주얼 전략과
                  로컬라이징 콘텐츠로 가장 강력하고 실질적인 지원을 제공합니다.
                </p>
              </div>
            </div>

            {/* Quantitative Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-white/[0.08]">
              {METRICS.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121214] border border-white/[0.08]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f7] tracking-tight mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-xs text-accent uppercase font-medium mb-1">
                    {m.unit}
                  </div>
                  <div className="text-[11px] text-[#86868b] line-clamp-2 leading-tight">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Part: Interactive Career Timeline (Tabbed) */}
        <div className="pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#86868b] block mb-1">
                Career History
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                경력 사항 및 실무 성과 (Total 13 Years)
              </h3>
            </div>
            <div className="text-xs text-[#86868b]">
              하얼빈청공업학교대학 시각디자인 전공
            </div>
          </div>

          {/* Company Tabs */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
            {CAREER_HISTORY.map((item) => {
              const isActive = activeCareerTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCareerTab(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm tracking-[-0.01em] transition-all whitespace-nowrap flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#f5f5f7] text-black font-medium shadow-md'
                      : 'bg-[#121214] text-[#86868b] border border-white/[0.08] hover:border-white/[0.2] hover:text-[#f5f5f7]'
                  }`}
                >
                  <Briefcase size={13} />
                  <span>{item.company}</span>
                  <span className="text-[11px] opacity-70">({item.duration})</span>
                </button>
              );
            })}
          </div>

          {/* Active Career Detail Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/[0.08] gap-3">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                    {currentCareer.company}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-white/[0.08] text-[#86868b]">
                    {currentCareer.duration}
                  </span>
                </div>
                <div className="text-accent text-sm font-medium">
                  {currentCareer.role}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#86868b]">
                <Calendar size={13} className="text-[#86868b]" />
                <span>{currentCareer.period}</span>
                <span>·</span>
                <span>{currentCareer.type}</span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#6e6e73]">
                Core Responsibilities & Business Impact
              </div>
              <ul className="space-y-2.5">
                {currentCareer.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm md:text-base text-[#86868b] font-normal leading-relaxed">
                    <ChevronRight size={15} className="text-accent shrink-0 mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
