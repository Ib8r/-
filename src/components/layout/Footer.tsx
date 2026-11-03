import React from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1 & 2: Brand Lockup & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer inline-block"
              role="button"
              tabIndex={0}
            >
              <Logo variant="full" theme="dark" size="lg" showTagline={true} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.contactPage.info.officeValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span dir="ltr">{t.contactPage.info.emailValue}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/services/rental')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.nav.rental}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/sales')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.nav.sales}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/parts')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.nav.parts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/maintenance')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.nav.maintenance}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/for-businesses')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.forBusinesses}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/download')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.downloadApp}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.contactUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Compliance & Market Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-start"
                >
                  {t.footer.terms}
                </button>
              </li>
            </ul>
            <div className="pt-3 text-[11px] text-slate-500 border-t border-slate-800">
              <p>{t.footer.marketNotice}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {t.footer.allRightsReserved}.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-slate-400 transition-colors"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-slate-400 transition-colors"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => navigate('/faq')}
              className="hover:text-slate-400 transition-colors"
            >
              {t.footer.faq}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
