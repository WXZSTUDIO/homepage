import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../i18n';

const LanguageSwitcher: React.FC<{ isMobile?: boolean }> = () => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string }[] = [
    { id: 'ko', label: 'kr' },
    { id: 'zh', label: 'cn' },
  ];

  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em]"
      role="group"
      aria-label="Language selector"
    >
      {options.map((opt, idx) => {
        const isActive = language === opt.id;
        return (
          <React.Fragment key={opt.id}>
            {idx > 0 && (
              <span className="text-faint/50 select-none" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setLanguage(opt.id)}
              className={`transition-colors cursor-pointer ${
                isActive
                  ? 'text-paper'
                  : 'text-faint hover:text-paper'
              }`}
              aria-pressed={isActive}
            >
              {opt.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
