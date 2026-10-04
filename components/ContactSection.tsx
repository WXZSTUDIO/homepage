import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { 
  Mail, Copy, Check, ArrowUpRight, Send, 
  MessageSquare, Sparkles 
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    budget: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.wechat);
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', brand: '', budget: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative min-h-screen flex flex-col justify-between bg-black border-t border-white/[0.08] pt-28 pb-12 overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 relative z-10 my-auto">
        {/* Apple-style Headline */}
        <div className="mb-14 md:mb-16">
          <div className="text-xs uppercase tracking-wider text-[#86868b] mb-3 font-normal">
            Start a Conversation
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-[#f5f5f7] tracking-[-0.035em] leading-[1.06] max-w-5xl">
            Let's shape the next <br />
            <span className="bg-gradient-to-r from-[#f5f5f7] via-[#e5e5ea] to-[#86868b] bg-clip-text text-transparent">
              iconic moment.
            </span>
          </h2>
          <p className="text-[#86868b] text-base md:text-lg font-normal max-w-2xl mt-4 leading-relaxed tracking-[-0.01em]">
            신규 브랜드 아이덴티티, 중화권 타깃 커머스 숏폼, 뷰티 캠페인 비주얼, AI 워크플로우 도입 등
            모든 크리에이티브 파트너십에 열려 있습니다.
          </p>
        </div>

        {/* Two-Column Touchpoint & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start pb-12">
          {/* Left Column: Direct Fast Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#86868b] font-normal">
              Direct Channels
            </div>

            {/* Email Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-2 group hover:border-white/[0.2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#86868b] uppercase">Official Email</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-[#86868b] hover:text-[#f5f5f7] flex items-center space-x-1 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                >
                  {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] hover:text-accent transition-colors block truncate tracking-[-0.01em]"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* WeChat & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WeChat */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">WeChat (微信)</span>
                  <button
                    onClick={handleCopyWeChat}
                    className="text-xs text-[#86868b] hover:text-[#f5f5f7]"
                  >
                    {copiedWeChat ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                </div>
                <div className="text-base font-medium text-[#f5f5f7]">
                  {PERSONAL_INFO.wechat}
                </div>
              </div>

              {/* Phone / Location */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-1.5">
                <span className="text-xs text-[#86868b] block">Location</span>
                <div className="text-sm font-normal text-[#f5f5f7] truncate">
                  서울 광진구 자양동
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-2.5 pt-2">
              <a
                href={PERSONAL_INFO.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Naver Portfolio & Verified Documents</span>
                </div>
                <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.xiaohongshuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Xiaohongshu (小红书) Official Creator Feed</span>
                </div>
                <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-7 md:p-8 rounded-2xl bg-[#121214] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs uppercase tracking-wider text-[#86868b] flex items-center space-x-1.5 font-normal">
                <MessageSquare size={13} />
                <span>Project Brief</span>
              </div>
              <span className="text-xs text-[#6e6e73]">Response within 24h</span>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="text-xl font-semibold text-[#f5f5f7]">
                  Message Sent Successfully
                </h4>
                <p className="text-[#86868b] text-xs max-w-xs mx-auto leading-relaxed">
                  보내주신 내용이 정상 전달되었습니다. 검토 후 24시간 이내에 기재해주신 연락처로 회신드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      Your Name / 담당자 성함 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동 / Director Wang"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      Email or Phone / 연락처 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="contact@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      Brand / Company / 브랜드명
                    </label>
                    <input
                      type="text"
                      placeholder="K-Beauty Brand / Studio"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      Project Type / 프로젝트 유형
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] text-xs focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="" className="bg-[#121214] text-[#f5f5f7]">선택해주세요 (Select)</option>
                      <option value="video" className="bg-[#121214] text-[#f5f5f7]">상업 영상 / 숏폼 프로덕션</option>
                      <option value="brand" className="bg-[#121214] text-[#f5f5f7]">브랜드 BI/VI 및 패키지 디자인</option>
                      <option value="china" className="bg-[#121214] text-[#f5f5f7]">샤오홍슈/도우인 중화권 비주얼</option>
                      <option value="ai" className="bg-[#121214] text-[#f5f5f7]">AI 생성 비주얼 워크플로우</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#86868b] mb-1">
                    Project Details / 세부 문의 내용 *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="프로젝트 일정, 제작 범위, 희망 콘셉트 등을 간략히 적어주세요."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#f5f5f7] text-black font-medium text-xs tracking-[-0.01em] hover:bg-white transition-all duration-200 flex items-center justify-center space-x-1.5 active:scale-95"
                >
                  <Send size={13} />
                  <span>Send inquiry / 문의 전송</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/[0.08] pt-6 mt-8">
        <div className="max-w-1700 mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6e6e73]">
          <div>
            &copy; 2026 CHANBONG JUNG (정찬봉). All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span>Seoul, South Korea</span>
            <span>·</span>
            <span>Visual Design · AI Synthesis · Brand Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
