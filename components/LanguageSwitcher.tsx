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
      className={`inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] ${
        isMobile ? 'w-full justify-between py-1 px-1.5' : ''
      }`}
      role="group"
      aria-label="Language selector"
    >
      {options.map((opt) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLanguage(opt.id)}
            className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors cursor-pointer ${
              isMobile ? 'flex-1 text-center font-medium' : ''
            } ${
              isActive
                ? 'bg-white text-black font-medium'
                : 'text-[#86868b] hover:text-white'
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
