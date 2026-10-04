import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';

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
      gsap.fromTo(
        '.contact-title-line',
        { yPercent: 110, skewY: 2, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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

  const copiedText = ui.experience?.copied || 'Copied';
  const naverDocText = ui.contact?.naverDocLink || ui.nav?.portfolioDoc || 'Naver Portfolio';
  const phoneLabel = ui.contact?.phone || 'Phone / Direct';
  const confText = ui.contact?.confidentialityNote || ui.contact?.response24h || 'All inquiries are strictly confidential.';
  const messageTitleText = ui.contact?.messageTitle || ui.contact?.formTitle || 'Project Inquiry Brief';
  const successTitleText = ui.contact?.submittedTitle || ui.contact?.successTitle || 'Message Sent Successfully';
  const successDescText = ui.contact?.submittedDesc || ui.contact?.successDesc || 'Thank you for reaching out. We will reply within 24 hours.';
  const emailLabelText = ui.contact?.emailLabel || ui.contact?.contactLabel || 'Email or Phone *';
  const emailPlaceholderText = ui.contact?.emailPlaceholder || ui.contact?.contactPlaceholder || 'contact@brand.com';

  return (
    <footer 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-[90vh] flex flex-col justify-between bg-black border-t border-white/[0.08] pt-28 pb-12"
    >
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 relative z-10 my-auto">
        {/* Apple-style Display Headline: Pure white & silver, no gradients */}
        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.2em] text-[#86868b] font-mono mb-4">
            {ui.contact.tag}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.035em] leading-[1.05] max-w-5xl">
            <div className="overflow-hidden py-1">
              <span className="contact-title-line block will-change-transform text-white">
                {ui.contact.headline1}
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="contact-title-line block will-change-transform text-[#a1a1a6]">
                {ui.contact.headline2}
              </span>
            </div>
          </h2>
          <p className="text-[#86868b] text-base md:text-lg font-normal max-w-2xl mt-4 leading-relaxed">
            {ui.contact.subtitle}
          </p>
        </div>

        {/* Minimalist 2-Column Split: Direct Channels & Clean Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/[0.08]">
          {/* Left Column: Direct Touchpoints (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase">
              {ui.contact.directChannels}
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="border-t border-white/[0.08] pt-4">
                <span className="text-[11px] font-mono text-[#86868b] uppercase block mb-1">
                  {ui.contact.officialEmail}
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href="mailto:ro3eandcat@gmail.com"
                    className="text-xl sm:text-2xl font-medium text-white hover:text-[#a1a1a6] transition-colors"
                  >
                    ro3eandcat@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs text-[#86868b] hover:text-white flex items-center space-x-1 cursor-pointer font-mono"
                  >
                    {copiedEmail ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                    <span>{copiedEmail ? copiedText : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* WeChat & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/[0.08] pt-4">
                <div>
                  <span className="text-[11px] font-mono text-[#86868b] uppercase block mb-1">
                    {ui.contact.wechat}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-mono text-white">icf304</span>
                    <button
                      onClick={handleCopyWeChat}
                      className="text-xs text-[#86868b] hover:text-white cursor-pointer"
                    >
                      {copiedWeChat ? <Check size={11} className="text-white" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#86868b] uppercase block mb-1">
                    {phoneLabel}
                  </span>
                  <a
                    href="tel:010-8388"
                    className="text-lg font-mono text-white hover:text-[#a1a1a6] transition-colors"
                  >
                    +82 010-****-8388
                  </a>
                </div>
              </div>

              {/* Naver Portfolio Link */}
              <div className="border-t border-white/[0.08] pt-4">
                <a
                  href="https://naver.me/5fdFDeXr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group py-1 text-white hover:text-[#a1a1a6] transition-colors"
                >
                  <span className="text-base font-medium">{naverDocText}</span>
                  <ArrowUpRight size={16} className="text-[#86868b] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="text-xs text-[#6e6e73] leading-relaxed pt-2">
              {confText}
            </div>
          </div>

          {/* Right Column: Clean Minimalist Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase mb-4">
              {messageTitleText}
            </div>

            {formSubmitted ? (
              <div className="py-12 border-t border-white/[0.08] space-y-2">
                <div className="text-xl font-medium text-white">
                  {successTitleText}
                </div>
                <div className="text-sm text-[#86868b]">
                  {successDescText}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 border-t border-white/[0.08] pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#86868b] uppercase mb-2">
                      {ui.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={ui.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#86868b] uppercase mb-2">
                      {emailLabelText}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={emailPlaceholderText}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#86868b] uppercase mb-2">
                      {ui.contact.brandLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={ui.contact.brandPlaceholder}
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#86868b] uppercase mb-2">
                      {ui.contact.typeLabel}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pb-2 bg-transparent border-b border-white/20 text-white text-sm focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="" className="bg-black text-[#86868b]">{ui.contact.typeDefault}</option>
                      <option value="video" className="bg-black text-white">{ui.contact.typeVideo}</option>
                      <option value="brand" className="bg-black text-white">{ui.contact.typeBrand}</option>
                      <option value="china" className="bg-black text-white">{ui.contact.typeChina}</option>
                      <option value="ai" className="bg-black text-white">{ui.contact.typeAi}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#86868b] uppercase mb-2">
                    {ui.contact.detailsLabel}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={ui.contact.detailsPlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-white text-black font-medium text-xs tracking-tight hover:bg-[#e5e5ea] transition-colors flex items-center space-x-2 cursor-pointer active:scale-98"
                >
                  <span>{ui.contact.submitBtn}</span>
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Pure Apple Bottom Bar */}
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6e6e73]">
        <div>{ui.contact.copyright}</div>
        <div>{ui.contact.locationFooter}</div>
      </div>
    </footer>
  );
};

export default ContactSection;
