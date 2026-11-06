import React from 'react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, locale } = useLanguage();
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();
  const isAr = locale === 'ar';
  const isKu = locale === 'ku';

  return (
    <footer className="bg-[#20252B] text-[#F5F6F7] border-t border-[#303943] pt-12 pb-8 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-[#303943]">
          {/* Column 1: Brand */}
          <div className="space-y-3.5">
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer inline-block"
              role="button"
              tabIndex={0}
            >
              <Logo variant="full" size="md" showTagline={true} theme="dark" />
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-xs">
              {isKu
                ? 'پلاتفۆرمی فەرمی ئامێرە قورسەکان لە عێراق. کەرتی بیناسازی دەبەستینەوە لە ڕێگەی کرێکردن، کڕین و فرۆشتن، پارچەی یەدەگ و ناوەندەکانی چاککردنەوە.'
                : isAr
                ? 'المنصة الرسمية الرائدة لتكنولوجيا الآليات والمعدات الثقيلة. نربط قطاع الإنشاءات عبر حلول التأجير، البيع، قطع الغيار، وخدمات الصيانة المعتمدة.'
                : 'The official heavy equipment technology platform connecting the industry through equipment rental, machinery sales, spare parts, and certified maintenance.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D69A25] font-mono">
              {isKu ? 'بەستەرەکانی پلاتفۆرم' : isAr ? 'روابط المنصة' : 'Platform Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/for-businesses')}
                  className="hover:text-[#D69A25] transition-colors cursor-pointer text-start text-[#CBD5E1]"
                >
                  {t.nav.forBusinesses}
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

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D69A25] font-mono">
              {isKu ? 'چوار خزمەتگوزارییە سەرەکییەکە' : isAr ? 'خدماتنا الأربعة' : 'Four Core Services'}
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

          {/* Column 4: Contact & Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D69A25] font-mono">
              {isKu ? 'پەیوەندی و ناوەندی سەرەکی' : isAr ? 'التواصل والمركز الرئيسي' : 'Contact & Headquarters'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D69A25] shrink-0" />
                <span>
                  {isKu ? 'بەغدا · هەولێر · بەسرە — عێراق' : isAr ? 'بغداد · أربيل · البصرة — العراق' : 'Baghdad · Erbil · Basra — Iraq'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D69A25] shrink-0" />
                <span dir="ltr">contact@heavyduty.iq</span>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B333D] hover:bg-[#303943] text-xs font-semibold text-[#D69A25] border border-[#3E4956] transition-colors cursor-pointer"
                >
                  <span>{isKu ? 'پەڕەی پەیوەندی و نووسینگەکان' : isAr ? 'صفحة التواصل والمكاتب' : 'Contact Page & Hubs'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <p>© {currentYear} HEAVY DUTY. {t.footer.allRightsReserved}.</p>
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
          </div>
        </div>
      </div>
    </footer>
  );
};
