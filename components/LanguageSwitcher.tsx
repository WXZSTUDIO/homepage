import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../i18n';

const LanguageSwitcher: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string }[] = [
    { id: 'ko', label: '한국어' },
    { id: 'zh', label: '中文' },
  ];

  return (
    <div
      className={`inline-flex items-stretch rounded-full border border-rule-soft overflow-hidden ${
        isMobile ? 'w-full' : ''
      }`}
      role="group"
      aria-label="Language selector"
    >
      {options.map((opt, idx) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLanguage(opt.id)}
            className={`px-3 py-1.5 text-[11px] tracking-[0.06em] transition-colors cursor-pointer ${
              idx > 0 ? 'border-l border-rule-soft' : ''
            } ${isMobile ? 'flex-1 text-center' : ''} ${
              isActive ? 'bg-paper text-[#050505]' : 'text-muted hover:text-paper'
            }`}
            aria-pressed={isActive}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
