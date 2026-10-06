import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Copy,
  Check,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Chat,
  Download,
  User,
  AtSign,
  Building,
  Diamond,
  Message,
} from './Icons';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-title-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
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
  const naverDocText = ui.contact?.naverDocLink || ui.nav?.portfolioDoc || 'Portfolio';
  const messageTitleText = ui.contact?.messageTitle || ui.contact?.formTitle || 'Project Inquiry';
  const successTitleText =
    ui.contact?.submittedTitle || ui.contact?.successTitle || 'Message Sent';
  const successDescText =
    ui.contact?.submittedDesc ||
    ui.contact?.successDesc ||
    'Thank you for reaching out. We will reply within 24 hours.';
  const emailLabelText = ui.contact?.emailLabel || ui.contact?.contactLabel || 'Email or Phone *';
  const emailPlaceholderText =
    ui.contact?.emailPlaceholder || ui.contact?.contactPlaceholder || 'contact@brand.com';

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-10"
    >
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 my-auto">
        {/* Closing headline */}
        <div className="mb-16 md:mb-24">
          <div className="eyebrow mb-4">{ui.contact.tag}</div>
          <h2 className="leading-[1.04] tracking-[-0.02em] max-w-5xl">
            <span className="block overflow-hidden py-[0.06em]">
              <span className="contact-title-line section-line text-[clamp(2.4rem,7vw,6rem)] text-paper">
                {ui.contact.headline1}
              </span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <span className="contact-title-line section-line text-[clamp(2.4rem,7vw,6rem)] text-paper-45">
                {ui.contact.headline2}
              </span>
            </span>
          </h2>
        </div>

        {/* Channels + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-rule">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-6">{ui.contact.directChannels}</div>

            <div className="border-t border-rule">
              {/* Email */}
              <div className="py-5 border-b border-rule-soft">
                <div className="eyebrow mb-2 flex items-center gap-2">
                  <Mail size={12} />
                  {ui.contact.officialEmail}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href="mailto:ro3eandcat@gmail.com"
                    className="text-lg sm:text-2xl text-paper link-rule break-all font-medium"
                  >
                    ro3eandcat@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="eyebrow hover:text-paper transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0 p-2 -m-2"
                  >
                    {copiedEmail ? <Check size={11} /> : <Copy size={11} />}
                    {copiedEmail ? copiedText : 'Copy'}
                  </button>
                </div>
              </div>

              {/* WeChat */}
              <div className="py-5 border-b border-rule-soft">
                <div className="eyebrow mb-2 flex items-center gap-2">
                  <Chat size={12} />
                  {ui.contact.wechat}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base text-paper">icf304</span>
                  <button
                    onClick={handleCopyWeChat}
                    className="text-faint hover:text-paper transition-colors cursor-pointer p-2 -m-2"
                    aria-label="Copy WeChat ID"
                  >
                    {copiedWeChat ? <Check size={11} /> : <Copy size={11} />}
                  </button>
                </div>
              </div>

              {/* Portfolio download */}
              <div className="py-5">
                <a
                  href="https://naver.me/5fdFDeXr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-lg sm:text-xl text-paper hover:opacity-60 transition-opacity font-medium"
                >
                  <Download size={15} />
                  {naverDocText}
                  <ArrowUpRight
                    size={14}
                    className="text-muted group-hover:text-paper transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6">{messageTitleText}</div>

            {formSubmitted ? (
              <div className="border-t border-rule pt-8 space-y-3">
                <div className="text-3xl text-paper font-medium">{successTitleText}</div>
                <div className="text-sm text-muted">{successDescText}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border-t border-rule pt-8 space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className="eyebrow flex items-center gap-2 mb-1"><User size={11} />{ui.contact.nameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder={ui.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="eyebrow flex items-center gap-2 mb-1"><AtSign size={11} />{emailLabelText}</label>
                    <input
                      type="email"
                      required
                      placeholder={emailPlaceholderText}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className="eyebrow flex items-center gap-2 mb-1"><Building size={11} />{ui.contact.brandLabel}</label>
                    <input
                      type="text"
                      placeholder={ui.contact.brandPlaceholder}
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="eyebrow flex items-center gap-2 mb-1"><Diamond size={11} />{ui.contact.typeLabel}</label>
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="field"
                      >
                        <option value="">{ui.contact.typeDefault}</option>
                        <option value="video">{ui.contact.typeVideo}</option>
                        <option value="brand">{ui.contact.typeBrand}</option>
                        <option value="china">{ui.contact.typeChina}</option>
                        <option value="ai">{ui.contact.typeAi}</option>
                      </select>
                      <ChevronDown size={14} className="field-arrow" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="eyebrow flex items-center gap-2 mb-1"><Message size={11} />{ui.contact.detailsLabel}</label>
                  <textarea
                    rows={3}
                    required
                    placeholder={ui.contact.detailsPlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field"
                  />
                </div>

                <button
                  type="submit"
                  className="pill px-7 py-3.5 text-[15px] cursor-pointer"
                >
                  {ui.contact.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Colophon foot */}
      <div className="max-w-1700 mx-auto w-full px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 eyebrow">
        <span>{ui.contact.copyright}</span>
        <span>{ui.contact.locationFooter}</span>
      </div>
    </footer>
  );
};

export default ContactSection;
