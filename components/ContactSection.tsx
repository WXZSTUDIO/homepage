import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, Copy, Check, ArrowUpRight, Send, 
  MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
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

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mask Headline Reveal
      gsap.fromTo(
        '.contact-title-line',
        { yPercent: 115, skewY: 3, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.25,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // 2. Cards Stagger Entry
      gsap.fromTo(
        '.contact-stagger-card',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.contact-cards-trigger',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ro3eandcat@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('icf304');
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
    <footer 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen flex flex-col justify-between bg-black border-t border-white/[0.08] pt-28 pb-12 overflow-hidden"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 relative z-10 my-auto">
        {/* Apple-style Headline with Mask Reveal */}
        <div className="mb-14 md:mb-16">
          <div className="text-xs uppercase tracking-wider text-[#86868b] mb-3 font-normal">
            {ui.contact.tag}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-[#f5f5f7] tracking-[-0.035em] leading-[1.06] max-w-5xl">
            <div className="overflow-hidden py-1">
              <span className="contact-title-line block will-change-transform">
                {ui.contact.headline1}
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="contact-title-line block will-change-transform bg-gradient-to-r from-[#f5f5f7] via-[#e5e5ea] to-[#86868b] bg-clip-text text-transparent">
                {ui.contact.headline2}
              </span>
            </div>
          </h2>
          <p className="text-[#86868b] text-base md:text-lg font-normal max-w-2xl mt-4 leading-relaxed tracking-[-0.01em]">
            {ui.contact.subtitle}
          </p>
        </div>

        {/* Two-Column Touchpoint & Inquiry Form */}
        <div className="contact-cards-trigger grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start pb-12">
          {/* Left Column: Direct Fast Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4 contact-stagger-card">
            <div className="text-xs uppercase tracking-wider text-[#86868b] font-normal">
              {ui.contact.directChannels}
            </div>

            {/* Email Box */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-2 group hover:border-white/[0.2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#86868b] uppercase">{ui.contact.officialEmail}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-[#86868b] hover:text-[#f5f5f7] flex items-center space-x-1 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedEmail ? ui.experience.copied : ui.contact.copyEmail}</span>
                </button>
              </div>
              <a
                href="mailto:ro3eandcat@gmail.com"
                className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] hover:text-accent transition-colors block truncate tracking-[-0.01em]"
              >
                ro3eandcat@gmail.com
              </a>
            </div>

            {/* WeChat & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WeChat */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">{ui.contact.wechat}</span>
                  <button
                    onClick={handleCopyWeChat}
                    className="text-[11px] text-[#86868b] hover:text-[#f5f5f7] flex items-center space-x-1 px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
                  >
                    {copiedWeChat ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                    <span>{copiedWeChat ? ui.experience.copied : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-[#f5f5f7] tracking-wider font-mono">
                  icf304
                </div>
              </div>

              {/* Direct Call / Cell */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-1.5">
                <div className="text-xs text-[#86868b]">{ui.contact.phone}</div>
                <a
                  href="tel:010-8388"
                  className="text-sm font-semibold text-[#f5f5f7] hover:text-accent transition-colors block font-mono"
                >
                  +82 010-****-8388
                </a>
              </div>
            </div>

            {/* Naver Portfolio Link */}
            <a
              href="https://naver.me/5fdFDeXr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] flex items-center justify-between group hover:border-white/[0.2] transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  N
                </div>
                <div>
                  <div className="text-xs font-medium text-[#f5f5f7]">
                    {ui.experience.naverPortfolio}
                  </div>
                  <div className="text-[11px] text-[#86868b]">
                    naver.me/5fdFDeXr
                  </div>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#86868b] group-hover:text-[#f5f5f7] transition-colors" />
            </a>

            {/* Note / Advisory */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[#6e6e73] leading-relaxed">
              {ui.contact.confidentialityNote}
            </div>
          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121214] border border-white/[0.08] contact-stagger-card">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-accent mb-2">
              <MessageSquare size={13} />
              <span>{ui.contact.messageTag}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em] mb-1">
              {ui.contact.messageTitle}
            </h3>
            <p className="text-xs text-[#86868b] mb-6">
              {ui.contact.messageSubtitle}
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <Check size={28} className="text-emerald-400 mx-auto" />
                <div className="text-sm font-semibold text-[#f5f5f7]">
                  {ui.contact.submittedTitle}
                </div>
                <div className="text-xs text-[#86868b]">
                  {ui.contact.submittedDesc}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      {ui.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={ui.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      {ui.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={ui.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      {ui.contact.brandLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={ui.contact.brandPlaceholder}
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#86868b] mb-1">
                      {ui.contact.typeLabel}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] text-xs focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="" className="bg-[#121214] text-[#f5f5f7]">{ui.contact.typeDefault}</option>
                      <option value="video" className="bg-[#121214] text-[#f5f5f7]">{ui.contact.typeVideo}</option>
                      <option value="brand" className="bg-[#121214] text-[#f5f5f7]">{ui.contact.typeBrand}</option>
                      <option value="china" className="bg-[#121214] text-[#f5f5f7]">{ui.contact.typeChina}</option>
                      <option value="ai" className="bg-[#121214] text-[#f5f5f7]">{ui.contact.typeAi}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#86868b] mb-1">
                    {ui.contact.detailsLabel}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={ui.contact.detailsPlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f5f5f7] placeholder-white/20 text-xs focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#f5f5f7] text-black font-medium text-xs tracking-[-0.01em] hover:bg-white transition-all duration-200 flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                >
                  <Send size={13} />
                  <span>{ui.contact.submitBtn}</span>
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
            {ui.contact.copyright}
          </div>

          <div className="flex items-center space-x-4">
            <span>{ui.contact.locationFooter}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
