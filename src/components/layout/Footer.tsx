import React from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#20252B] text-[#F5F6F7] border-t border-[#303943] pt-14 pb-10 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-[#303943]">
          {/* Column 1 & 2: Brand Lockup & Purpose */}
          <div className="sm:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer inline-block"
              role="button"
              tabIndex={0}
            >
              <Logo variant="full" theme="dark" size="lg" showTagline={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D69A25] shrink-0" />
                <span>{t.contactPage.info.officeValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D69A25] shrink-0" />
                <span dir="ltr">{t.contactPage.info.emailValue}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F6F7] font-mono">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/services/rental')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.rental}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/sales')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.sales}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/parts')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.parts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/maintenance')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.maintenance}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F6F7] font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/for-businesses')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.forBusinesses}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/download')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.downloadApp}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.contactUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Compliance & Market Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F6F7] font-mono">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.footer.terms}
                </button>
              </li>
            </ul>
            <div className="pt-3 text-[11px] text-[#94A3B8] border-t border-[#303943]">
              <p>{t.footer.marketNotice}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <p>© {currentYear} {t.footer.allRightsReserved}.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-[#D69A25] transition-colors"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true" className="text-[#303943]">·</span>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-[#D69A25] transition-colors"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true" className="text-[#303943]">·</span>
            <button
              onClick={() => navigate('/faq')}
              className="hover:text-[#D69A25] transition-colors"
            >
              {t.footer.faq}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
