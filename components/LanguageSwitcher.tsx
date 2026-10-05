import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../i18n';

const LanguageSwitcher: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string }[] = [
    { id: 'zh', label: '中文' },
    { id: 'en', label: 'EN' },
    { id: 'ko', label: '한국어' },
  ];

  return (
    <div
      className={`inline-flex items-stretch rounded-full border border-rule overflow-hidden ${
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
            className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
              idx > 0 ? 'border-l border-rule' : ''
            } ${isMobile ? 'flex-1 text-center' : ''} ${
              isActive ? 'bg-paper text-ink' : 'text-muted hover:text-paper'
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
