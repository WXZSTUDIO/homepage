import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../i18n';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string }[] = [
    { id: 'zh', label: '中文' },
    { id: 'en', label: 'EN' },
    { id: 'ko', label: '한국어' },
  ];

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-md ${
        isMobile ? 'w-full justify-between py-1 px-1.5' : ''
      }`}
      role="group"
      aria-label="Language selector"
    >
      {!isMobile && (
        <span className="pl-2 pr-1 text-[#86868b]" title="Language">
          <Globe size={13} />
        </span>
      )}

      {options.map((opt) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLanguage(opt.id)}
            className={`px-2.5 py-1 rounded-full text-xs transition-all duration-200 ${
              isMobile ? 'flex-1 text-center font-medium' : ''
            } ${
              isActive
                ? 'bg-white/[0.16] text-[#f5f5f7] font-medium shadow-sm'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
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
