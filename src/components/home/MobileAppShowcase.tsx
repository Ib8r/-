import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { IMAGES, FALLBACK_IMAGES } from '../../assets/images';
import { IndustrialImage } from '../common/IndustrialImage';
import {
  Smartphone,
  CheckCircle2,
  Search,
  Truck,
  Tag,
  Wrench,
  Cog,
  MapPin,
  Home,
  Grid,
  ClipboardList,
  User,
  ShieldCheck,
  Phone,
  Navigation,
  Clock,
  Sparkles,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

type ScreenKey = 'home' | 'rental' | 'sales' | 'parts' | 'maintenance' | 'map' | 'profile';

interface ScreenDef {
  key: ScreenKey;
  icon: React.ComponentType<{ className?: string }>;
  titleAr: string;
  titleEn: string;
  titleKu: string;
  tagAr: string;
  tagEn: string;
  tagKu: string;
}

export const MobileAppShowcase: React.FC = () => {
  const { locale, dir } = useLanguage();
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('home');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const isRtl = dir === 'rtl';

  const screens: ScreenDef[] = [
    {
      key: 'home',
      icon: Home,
      titleAr: 'واجهة التطبيق والبحث',
      titleEn: 'Home & Discovery',
      titleKu: 'سەرەکی و گەڕان',
      tagAr: 'الرئيسية',
      tagEn: 'Home',
      tagKu: 'سەرەکی',
    },
    {
      key: 'rental',
      icon: Truck,
      titleAr: 'تأجير الآليات الثقيلة',
      titleEn: 'Equipment Rental',
      titleKu: 'کرێکردنی ئامێرەکان',
      tagAr: 'التأجير',
      tagEn: 'Rental',
      tagKu: 'کرێکردن',
    },
    {
      key: 'sales',
      icon: Tag,
      titleAr: 'بيع وشراء المعدات',
      titleEn: 'Machinery Sales',
      titleKu: 'کڕین و فرۆشتن',
      tagAr: 'البيع والشراء',
      tagEn: 'Machinery',
      tagKu: 'کڕین و فرۆشتن',
    },
    {
      key: 'parts',
      icon: Cog,
      titleAr: 'قطع الغيار الأصلية',
      titleEn: 'Spare Parts Hub',
      titleKu: 'پارچەی یەدەگ',
      tagAr: 'قطع الغيار',
      tagEn: 'Parts',
      tagKu: 'پارچەکان',
    },
    {
      key: 'maintenance',
      icon: Wrench,
      titleAr: 'مراكز الصيانة المعتمدة',
      titleEn: 'Maintenance Centers',
      titleKu: 'ناوەندی چاککردنەوە',
      tagAr: 'الصيانة',
      tagEn: 'Service',
      tagKu: 'چاککردنەوە',
    },
    {
      key: 'map',
      icon: Navigation,
      titleAr: 'الخارطة والتتبع الميداني',
      titleEn: 'Fleet Map & Dispatch',
      titleKu: 'نەخشە و شوێنپێهەڵگرتن',
      tagAr: 'الخارطة',
      tagEn: 'Map & Fleet',
      tagKu: 'نەخشە',
    },
    {
      key: 'profile',
      icon: User,
      titleAr: 'الملف والتواصل المباشر',
      titleEn: 'Profile & Orders',
      titleKu: 'هەژمار و پەیوەندی',
      tagAr: 'الحساب',
      tagEn: 'Profile',
      tagKu: 'هەژمار',
    },
  ];

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) return;
    setNotified(true);
  };

  const getScreenTitle = (screen: ScreenDef) => {
    if (locale === 'ku') return screen.titleKu;
    if (locale === 'en') return screen.titleEn;
    return screen.titleAr;
  };

  const getScreenTag = (screen: ScreenDef) => {
    if (locale === 'ku') return screen.tagKu;
    if (locale === 'en') return screen.tagEn;
    return screen.tagAr;
  };

  return (
    <section
      aria-label="HEAVY DUTY Mobile Application Multi-Screen Showcase"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
    >
      <div className="rounded-3xl bg-gradient-to-br from-[#20252B] via-[#2B333D] to-[#20252B] border border-[#3E4956] p-6 sm:p-10 lg:p-14 text-[#F5F6F7] shadow-xl overflow-hidden relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 end-0 w-96 h-96 bg-[#D69A25]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Marketing Copy, Screen Tabs & Launch Registration */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest">
                <Smartphone className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ku'
                    ? 'هەموو بازاڕەکە لە گیرفانتدا'
                    : locale === 'en'
                    ? 'THE HEAVY EQUIPMENT MARKETPLACE IN YOUR POCKET'
                    : 'السوق كاملاً في جيبك'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black font-heading text-[#F5F6F7] leading-[1.15]">
                {locale === 'ku'
                  ? 'ئەپڵیکەیشنی HEAVY DUTY — تاقیگەی دیجیتاڵی ئامێرەکان'
                  : locale === 'en'
                  ? 'The HEAVY DUTY Mobile Experience'
                  : 'تطبيق HEAVY DUTY — المنظومة المتكاملة في هاتفك'}
              </h2>

              <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl leading-relaxed pt-1">
                {locale === 'ku'
                  ? 'شاشەکانی ئەپڵیکەیشن بە شێوازێکی کارلێککارانە تاقی بکەرەوە: کرێکردن، کڕین، فرۆشتن، پارچەی یەدەگ، چاککردنەوە، و نەخشەی مەیدانی بە سێ زمانی فەرمی.'
                  : locale === 'en'
                  ? 'Interact with live application screens: equipment rental, machinery sales, spare parts, verified workshops, and GPS fleet tracking across all 19 governorates.'
                  : 'استكشف شاشات التطبيق التفاعلية: تأجير الآليات، البيع والشراء، قطع الغيار، ورش الصيانة المعتمدة، والتتبع الميداني باللغات العربية والكردية والإنجليزية.'}
              </p>
            </div>

            {/* Interactive Screen Selector Tabs */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#D69A25] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {locale === 'ku' ? 'شاشە کارلێککارەکان:' : locale === 'en' ? 'Interactive App Screens:' : 'استكشف شاشات التطبيق:'}
                </span>
                <span className="text-[11px] text-[#94A3B8]">
                  {locale === 'ku' ? 'کرتە لەسەر شاشە بکە' : locale === 'en' ? 'Click to view screen' : 'اضغط للتبديل الفوري'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {screens.map((screen) => {
                  const Icon = screen.icon;
                  const isActive = activeScreen === screen.key;
                  return (
                    <button
                      key={screen.key}
                      onClick={() => setActiveScreen(screen.key)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D69A25] text-[#20252B] shadow-md scale-102 font-extrabold'
                          : 'bg-[#1A1F26] text-[#CBD5E1] hover:bg-[#303943] hover:text-[#F5F6F7] border border-[#3E4956]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{getScreenTag(screen)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Highlights of the Active Screen */}
            <div className="p-4 rounded-2xl bg-[#1A1F26]/90 border border-[#3E4956] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D69A25]">
                <Sparkles className="w-4 h-4" />
                <span>
                  {screens.find((s) => s.key === activeScreen)
                    ? getScreenTitle(screens.find((s) => s.key === activeScreen)!)
                    : ''}
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {activeScreen === 'home' &&
                  (locale === 'ku'
                    ? 'واژەی سەرەکی بە گەڕانی خێرا و کەتەلۆگی سەرجەم فئات بە نوێترین ئامێرە پشتڕاستکراوەکان.'
                    : locale === 'en'
                    ? 'Intuitive home interface with instant search across all 8 equipment categories and live availability.'
                    : 'الواجهة الرئيسية تتيح البحث الفوري عبر 8 فئات للمعدات، مع استعراض الآليات المتاحة وربط سريع بالخدمات.')}
                {activeScreen === 'rental' &&
                  (locale === 'ku'
                    ? 'تأجیرکردنی ڕۆژانە یان مانگانەی ئامێرەکان لەگەڵ دیاریکردنی پارێزگا، تێچووی گواستنەوە و گرێبەستی متمانەپێکراو.'
                    : locale === 'en'
                    ? 'Flexible daily and monthly rental contracts with transparent IQD rates, operator options, and lowboy dispatch.'
                    : 'عقود تأجير يومية وشهرية بأسعار شفافة بالدينار العراقي، مع خيارات المشغل وتنسيق النقل باللوبد إلى الموقع.')}
                {activeScreen === 'sales' &&
                  (locale === 'ku'
                    ? 'کڕین و فرۆشتنی ئامێری نوێ و کارپێکراو لەگەڵ پشکنینی تەکنیکی و سەلماندنی کاتژمێرەکانی کارکردن.'
                    : locale === 'en'
                    ? 'Buy and sell heavy machinery with documented hour meters, verified inspections, and transparent specifications.'
                    : 'بيع وشراء المعدات الثقيلة الجديدة والمستعملة مع توثيق ساعات التشغيل الفعلية وتقارير الفحص الفني المعتمد.')}
                {activeScreen === 'parts' &&
                  (locale === 'ku'
                    ? 'فەرهەنگی پارچەی یەدەگی ئەسڵی بە ژمارەی OEM و پەیوەندی ڕاستەوخۆ لەگەڵ گەنجینە و فرۆشگاکانی عێراق.'
                    : locale === 'en'
                    ? 'Search genuine OEM spare parts by part number with real-time stock checks and direct merchant inquiries.'
                    : 'فهرسة دقيقة لقطع الغيار الأصلية برقم القطعة (OEM)، مع التحقق من التوفر والشحن المباشر لكافة المحافظات.')}
                {activeScreen === 'maintenance' &&
                  (locale === 'ku'
                    ? 'ناوەندەکانی چاککردنەوەی هایدرۆلیک و دیزڵ بە تیمی گەڕۆکی بەپەلە لە شوێنی پڕۆژە.'
                    : locale === 'en'
                    ? 'Certified diesel and hydraulic workshops with mobile dispatch units for on-site emergency repairs.'
                    : 'دليل ورش الصيانة الميكانيكية والهيدروليكية المعتمدة، مع فرق التدخل الميداني السريع لمواقع الإنشاءات.')}
                {activeScreen === 'map' &&
                  (locale === 'ku'
                    ? 'نەخشەی مەیدانی ۱۹ پارێزگاکەی عێراق بۆ دۆزینەوەی نزیکترین ئامێر و هەڵسەنگاندنی ماوەی گەیشتن.'
                    : locale === 'en'
                    ? 'Interactive GIS map covering all 19 Iraqi governorates to locate nearby machinery and track lowboy routes.'
                    : 'خارطة ميدانية تفاعلية تغطي محافظات العراق الـ 19 لتحديد أقرب الآليات المتاحة وتتبع مسارات النقل.')}
                {activeScreen === 'profile' &&
                  (locale === 'ku'
                    ? 'بەڕێوەبردنی هەژماری کۆمپانیا یان بەڵێندەر لەگەڵ بینینی گرێبەستەکان و پەیوەندی ڕاستەوخۆ.'
                    : locale === 'en'
                    ? 'Verified contractor and fleet owner profile managing active rental orders, inquiries, and secure messaging.'
                    : 'إدارة الملف التعريفي الموثق للمقاول أو مالك الأسطول، مع متابعة العقود وطلبات الفحص والمراسلات المباشرة.')}
              </p>
            </div>

            {/* Notification Registration Form */}
            <div className="pt-2 space-y-3">
              {notified ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                  {locale === 'ku'
                    ? 'سوپاس! لە ساتی بڵاوبوونەوەی فەرمی ئەپڵیکەیشن ئاگادارت دەکەینەوە.'
                    : locale === 'en'
                    ? 'Thank you! You will receive priority launch access as soon as the app goes live.'
                    : 'تم تسجيلك بنجاح! سنقوم بإشعارك فور اعتماد ونشر التطبيق على المتاجر الرسمية.'}
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="max-w-md flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder={
                      locale === 'ku'
                        ? 'ئیمەیڵەکەت بۆ ئاگاداربوون بنووسە...'
                        : locale === 'en'
                        ? 'Enter email for priority launch notification...'
                        : 'أدخل بريدك الإلكتروني لتصلك إشعارات الإطلاق...'
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#3E4956] text-xs text-[#F5F6F7] bg-[#1A1F26] focus:outline-none focus:ring-2 focus:ring-[#D69A25]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] font-bold text-xs transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                  >
                    {locale === 'ku' ? 'ئاگادارم بکەرەوە' : locale === 'en' ? 'Get Notified' : 'أعلمني عند الإطلاق'}
                  </button>
                </form>
              )}
            </div>

            {/* App Store & Google Play Badges with Coming Soon Status */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-[#1A1F26] border border-[#3E4956] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D69A25] animate-pulse" />
                <div className="text-start">
                  <div className="text-[9px] text-[#94A3B8]">Google Play</div>
                  <div className="text-xs font-bold text-[#F5F6F7]">
                    {locale === 'ku' ? 'ئەندرۆید — بەم زووانە' : locale === 'en' ? 'Android App — Coming Soon' : 'أندرويد — قريباً'}
                  </div>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-[#1A1F26] border border-[#3E4956] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D69A25] animate-pulse" />
                <div className="text-start">
                  <div className="text-[9px] text-[#94A3B8]">Apple App Store</div>
                  <div className="text-xs font-bold text-[#F5F6F7]">
                    {locale === 'ku' ? 'ئایفۆن — بەم زووانە' : locale === 'en' ? 'iOS App — Coming Soon' : 'آيفون — قريباً'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Multi-Screen iPhone Pro Smartphone Mockup (Aspect Ratio ~9:19.5) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Floating Metric Pill 1 (19 Governorates) */}
            <div className="absolute top-12 -start-4 sm:-start-6 z-20 hidden sm:block">
              <div className="px-3.5 py-2 rounded-2xl bg-[#FFFFFF] text-[#20252B] shadow-2xl border border-white/40 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-black font-mono leading-none">19</div>
                  <div className="text-[9px] text-slate-600 font-semibold">
                    {locale === 'ku' ? 'پارێزگای عێراق' : locale === 'en' ? 'Governorates' : 'محافظة مغطاة'}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric Pill 2 (Screen Badge) */}
            <div className="absolute bottom-16 -end-4 sm:-end-6 z-20 hidden sm:block">
              <div className="px-3.5 py-2 rounded-2xl bg-[#FFFFFF] text-[#20252B] shadow-2xl border border-white/40 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-black font-mono leading-none">HEAVY DUTY</div>
                  <div className="text-[9px] text-slate-600 font-semibold">
                    {locale === 'ku' ? 'ئەپڵیکەیشنی فەرمی' : locale === 'en' ? 'Official App' : 'تطبيق رسمي معتمد'}
                  </div>
                </div>
              </div>
            </div>

            {/* Smartphone Device Frame (True 9:19.5 Pro Proportions) */}
            <div className="w-[300px] sm:w-[320px] aspect-[9/19.5] rounded-[48px] bg-[#12161A] p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border-[4.5px] border-[#3E4956] relative flex flex-col justify-between overflow-hidden">
              {/* Outer Metallic Bezel Highlight */}
              <div className="absolute inset-0 rounded-[44px] border border-white/10 pointer-events-none" />

              {/* Dynamic Island Top Cutout */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-end pe-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F26] border border-[#3E4956]" />
              </div>

              {/* Inside Screen Container */}
              <div className="w-full h-full rounded-[38px] bg-[#F5F6F7] text-[#20252B] overflow-hidden pt-7 pb-2 px-3 flex flex-col justify-between select-none font-sans text-start">
                
                {/* Fixed Top Status & Brand Header */}
                <div className="space-y-2 pt-1 border-b border-[#E2E5E8] pb-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-heading font-black text-xs text-[#20252B] tracking-tight">
                      HEAVY <span className="text-[#D69A25]">DUTY</span>
                    </span>
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#20252B] text-[#D69A25]">
                      IQ · v2.4
                    </span>
                  </div>

                  {/* Active Screen Title Bar */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-[#20252B]">
                      {screens.find((s) => s.key === activeScreen)?.tagAr}
                    </span>
                    <span className="text-[9px] text-[#64748B] font-mono">
                      {activeScreen.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* DYNAMIC SCREEN CONTENT AREA */}
                <div className="flex-1 overflow-y-auto py-2 space-y-2 scrollbar-none">
                  {/* SCREEN 1: HOME & SEARCH */}
                  {activeScreen === 'home' && (
                    <div className="space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#E2E5E8] shadow-2xs">
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-[9px] text-slate-400 truncate">
                          {locale === 'ku' ? 'گەڕان لە کەتەلۆگ...' : locale === 'en' ? 'Search equipment...' : 'ابحث بالموديل أو الفئة...'}
                        </span>
                      </div>

                      {/* 4 Quick Badges */}
                      <div className="grid grid-cols-4 gap-1 text-center">
                        <button onClick={() => setActiveScreen('rental')} className="p-1 rounded-lg bg-white border border-[#E2E5E8] space-y-0.5 hover:border-[#D69A25]">
                          <Truck className="w-3.5 h-3.5 mx-auto text-[#D69A25]" />
                          <span className="block text-[8px] font-bold truncate">تأجير</span>
                        </button>
                        <button onClick={() => setActiveScreen('sales')} className="p-1 rounded-lg bg-white border border-[#E2E5E8] space-y-0.5 hover:border-[#D69A25]">
                          <Tag className="w-3.5 h-3.5 mx-auto text-[#D69A25]" />
                          <span className="block text-[8px] font-bold truncate">بيع</span>
                        </button>
                        <button onClick={() => setActiveScreen('parts')} className="p-1 rounded-lg bg-white border border-[#E2E5E8] space-y-0.5 hover:border-[#D69A25]">
                          <Cog className="w-3.5 h-3.5 mx-auto text-[#D69A25]" />
                          <span className="block text-[8px] font-bold truncate">قطع</span>
                        </button>
                        <button onClick={() => setActiveScreen('maintenance')} className="p-1 rounded-lg bg-white border border-[#E2E5E8] space-y-0.5 hover:border-[#D69A25]">
                          <Wrench className="w-3.5 h-3.5 mx-auto text-[#D69A25]" />
                          <span className="block text-[8px] font-bold truncate">صيانة</span>
                        </button>
                      </div>

                      {/* Featured Machinery Card */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1.5 shadow-2xs">
                        <div className="relative h-20 w-full rounded-lg overflow-hidden bg-slate-100">
                          <IndustrialImage
                            src={IMAGES.wheelLoader}
                            fallbackSrc={FALLBACK_IMAGES.wheelLoader}
                            alt="Wheel Loader"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1 start-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#D69A25] text-[#20252B]">
                            متاح فوراً
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold">Caterpillar 966H</span>
                          <span className="text-[9px] font-mono text-[#D69A25] font-bold">بغداد</span>
                        </div>
                        <div className="text-[9px] text-[#64748B]">ساعات التشغيل: 3,400 س · فحص معتمد</div>
                      </div>

                      {/* Second mini item */}
                      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#E2E5E8]">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <IndustrialImage
                            src={IMAGES.excavator}
                            fallbackSrc={FALLBACK_IMAGES.excavator}
                            alt="Excavator"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold truncate">Komatsu PC200-8</div>
                          <div className="text-[8px] text-[#64748B]">البصرة · متوفر للتأجير الشهري</div>
                        </div>
                        <span className="text-[9px] font-bold text-[#D69A25] font-mono shrink-0">IQD</span>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: RENTAL */}
                  {activeScreen === 'rental' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      {/* Filter Bar */}
                      <div className="flex items-center justify-between text-[9px] bg-white p-1.5 rounded-lg border border-[#E2E5E8]">
                        <span className="font-bold text-[#D69A25]">عقود يومية وشهرية</span>
                        <span className="font-mono text-[#64748B]">19 محافظة</span>
                      </div>

                      {/* Rental Item 1 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] font-bold">حفارة جنزير CAT 336D</div>
                            <div className="text-[8px] text-[#64748B]">وزن 36 طن · سعة الدلو 1.9 م³</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">جاهز للعمل</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                          <span className="text-[#64748B]">بغداد — الدورة</span>
                          <span className="font-bold text-[#D69A25] font-mono">850,000 د.ع / يوم</span>
                        </div>
                      </div>

                      {/* Rental Item 2 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] font-bold">شفل كوماتسو WA470</div>
                            <div className="text-[8px] text-[#64748B]">محرك 272 حصان · مع مشغل محترف</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">مع لوبد نقل</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                          <span className="text-[#64748B]">البصرة — الزبير</span>
                          <span className="font-bold text-[#D69A25] font-mono">14,500,000 د.ع / شهر</span>
                        </div>
                      </div>

                      {/* Rental Item 3 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] font-bold">رافعة تلسكوبية XCMG 50T</div>
                            <div className="text-[8px] text-[#64748B]">بوم 42 متر · تصريح سلامة نفطي</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">شهادة فحص</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                          <span className="text-[#64748B]">أربيل — كسنزان</span>
                          <span className="font-bold text-[#D69A25] font-mono">1,200,000 د.ع / يوم</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: SALES */}
                  {activeScreen === 'sales' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[9px] bg-white p-1.5 rounded-lg border border-[#E2E5E8]">
                        <span className="font-bold text-[#20252B]">آليات جديدة ومستعملة</span>
                        <span className="text-emerald-700 font-bold">فحص ساعات موثق</span>
                      </div>

                      {/* Sales Item 1 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold">بلدوزر CAT D8R (2018)</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#20252B] text-[#D69A25] font-bold">موثق</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">
                          ساعات العمل: 4,200 س · شاسيه وجنازير 85% · السليمانية
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="text-[8px] text-emerald-700 font-semibold">تقرير فحص هيدروليك ممتاز</span>
                          <span className="text-[10px] font-bold text-[#D69A25] font-mono">185,000,000 د.ع</span>
                        </div>
                      </div>

                      {/* Sales Item 2 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold">حفار بوبكات JCB 3CX (2021)</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">جاهز للمعالينة</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">
                          ساعات العمل: 2,100 س · دبل دفرنش · بغداد
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="text-[8px] text-slate-500">ضمان وكيل محلي</span>
                          <span className="text-[10px] font-bold text-[#D69A25] font-mono">78,000,000 د.ع</span>
                        </div>
                      </div>

                      {/* Sales Item 3 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span>حدالة Dynapac CA250D</span>
                          <span className="text-[#D69A25] font-mono">62,000,000 د.ع</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">موديل 2020 · 1,850 ساعة · النجف الأشرف</div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 4: SPARE PARTS */}
                  {activeScreen === 'parts' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="p-1.5 rounded-lg bg-white border border-[#E2E5E8] flex items-center gap-1.5">
                        <Search className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] text-[#20252B] font-mono">بحث برقم القطعة (OEM #)...</span>
                      </div>

                      {/* Part 1 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[10px] font-bold">طقم سيلات بساتم CAT</div>
                            <div className="text-[8px] font-mono text-[#D69A25]">OEM: 117-4089</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">متوفر 14 طقم</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">متجر الرافدين — بغداد (السنك) · شحن لـ 19 محافظة</div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                          <span className="font-bold text-[#D69A25] font-mono">245,000 د.ع</span>
                          <span className="text-[8px] text-[#20252B] font-bold underline">طلب عبر المتجر</span>
                        </div>
                      </div>

                      {/* Part 2 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[10px] font-bold">توربو شاحن ديزل Komatsu</div>
                            <div className="text-[8px] font-mono text-[#D69A25]">OEM: 6754-81-8170</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">أصلي ياباني</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">أربيل — المنطقة الصناعية الجنوبية</div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                          <span className="font-bold text-[#D69A25] font-mono">1,180,000 د.ع</span>
                          <span className="text-[8px] text-[#20252B] font-bold underline">تواصل مباشر</span>
                        </div>
                      </div>

                      {/* Part 3 */}
                      <div className="p-1.5 rounded-lg bg-white border border-[#E2E5E8] flex items-center justify-between text-[9px]">
                        <div>
                          <span className="font-bold">فلاتر ديزل وهيدروليك Fleetguard</span>
                          <div className="text-[8px] text-[#64748B]">متوفر لكافة أوزان الحفارات والشفلات</div>
                        </div>
                        <span className="font-mono text-[#D69A25] font-bold">165,000 د.ع</span>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 5: MAINTENANCE */}
                  {activeScreen === 'maintenance' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[9px] flex items-center justify-between text-amber-900">
                        <span className="font-bold">خدمة الطوارئ الميدانية 24/7</span>
                        <span className="font-mono text-[8px] bg-[#D69A25] text-[#20252B] px-1 rounded font-bold">فوري</span>
                      </div>

                      {/* Workshop 1 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[10px] font-bold">مركز المنصور لصيانة الهيدروليك</div>
                            <div className="text-[8px] text-[#64748B]">فحص وتوضيب المضخات والبلوف الإلكترونية</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ورشة معتمدة</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[8px]">
                          <span className="text-slate-600">بغداد — الشيخ عمر</span>
                          <span className="text-[#D69A25] font-bold">فريق ميداني جاهز</span>
                        </div>
                      </div>

                      {/* Workshop 2 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[10px] font-bold">مختبر كوردستان لبخاخات الديزل</div>
                            <div className="text-[8px] text-[#64748B]">معايرة مضخات Common Rail وECU</div>
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Bosch Certified</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[8px]">
                          <span className="text-slate-600">أربيل — شارع 100م</span>
                          <span className="text-[#D69A25] font-bold">فحص كمبيوتر مجاني</span>
                        </div>
                      </div>

                      {/* Workshop 3 */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="text-[10px] font-bold">ورشة الموانئ لصيانة الشواصي والجنازير</div>
                        <div className="text-[8px] text-[#64748B]">كبس وتجديد السلاسل والبكرات الثقيلة · البصرة</div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 6: MAP & FLEET TRACKING */}
                  {activeScreen === 'map' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      {/* Mini Map Graphic Representation */}
                      <div className="relative h-28 w-full rounded-xl bg-[#20252B] p-2 border border-[#3E4956] overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[8px] text-[#F5F6F7] z-10">
                          <span className="font-bold flex items-center gap-1 text-[#D69A25]">
                            <Navigation className="w-3 h-3" />
                            تغطية 19 محافظة
                          </span>
                          <span className="font-mono text-[#CBD5E1]">348 آلية نشطة</span>
                        </div>

                        {/* Visual GPS Pins on Dark Field */}
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D69A25_1px,transparent_1px)] [background-size:12px_12px]" />
                        
                        {/* Interactive Governorates Markers */}
                        <div className="relative z-10 flex flex-wrap gap-1 items-center justify-around text-[8px]">
                          <span className="px-1.5 py-0.5 rounded bg-[#D69A25] text-[#20252B] font-bold">بغداد (84)</span>
                          <span className="px-1.5 py-0.5 rounded bg-white text-[#20252B] font-bold">أربيل (46)</span>
                          <span className="px-1.5 py-0.5 rounded bg-white text-[#20252B] font-bold">البصرة (62)</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#3E4956] text-[#F5F6F7]">السليمانية (31)</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#3E4956] text-[#F5F6F7]">حلبجة (9)</span>
                        </div>

                        <div className="text-[8px] text-[#CBD5E1] z-10 pt-1 flex items-center justify-between border-t border-white/10">
                          <span>مسارات لوبدات النقل متاحة</span>
                          <span className="text-[#D69A25] font-mono">تتبع فوري</span>
                        </div>
                      </div>

                      {/* Nearest Machinery Nearby */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1 shadow-2xs">
                        <div className="text-[9px] font-bold text-[#20252B] flex items-center justify-between">
                          <span>أقرب الآليات لموقع مشروعك</span>
                          <span className="text-[#D69A25] font-mono">4.2 كم</span>
                        </div>
                        <div className="text-[8px] text-[#64748B]">حفارة دوسان 300 · جاهزة للتحميل والنقل الفوري</div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 7: PROFILE & INQUIRIES */}
                  {activeScreen === 'profile' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      {/* User Badge */}
                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E5E8] flex items-center gap-2.5 shadow-2xs">
                        <div className="w-9 h-9 rounded-full bg-[#20252B] text-[#D69A25] flex items-center justify-center font-bold text-xs">
                          HD
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-[#20252B] truncate">شركة الرافدين للمقاولات</div>
                          <div className="text-[8px] text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            حساب معتمد · بغداد
                          </div>
                        </div>
                      </div>

                      {/* Active Orders Count */}
                      <div className="grid grid-cols-2 gap-1.5 text-center">
                        <div className="p-1.5 rounded-lg bg-white border border-[#E2E5E8]">
                          <div className="text-[11px] font-black font-mono text-[#D69A25]">2</div>
                          <div className="text-[8px] text-[#64748B]">عقود إيجار نشطة</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-[#E2E5E8]">
                          <div className="text-[11px] font-black font-mono text-[#20252B]">1</div>
                          <div className="text-[8px] text-[#64748B]">طلب فحص فني</div>
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div className="p-2 rounded-xl bg-white border border-[#E2E5E8] space-y-1">
                        <div className="flex items-center justify-between text-[8px]">
                          <span className="font-bold text-[#20252B]">مورد آليات — كربلاء</span>
                          <span className="text-slate-400">منذ 15 دقيقة</span>
                        </div>
                        <p className="text-[8px] text-[#64748B] leading-tight">
                          "تم تأكيد وصول اللوبد مع الحفارة غداً الساعة 7:00 صباحاً لموقع المشروع."
                        </p>
                      </div>

                      <button className="w-full py-1.5 rounded-lg bg-[#20252B] text-[#D69A25] text-[9px] font-bold text-center">
                        إدارة الأسطول والمراسلات
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Native App Tab Bar (Allows Direct In-App Navigation) */}
                <div className="pt-2 border-t border-[#E2E5E8] flex items-center justify-around text-[7.5px] text-slate-400">
                  <button
                    onClick={() => setActiveScreen('home')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                      activeScreen === 'home' ? 'text-[#D69A25] font-bold' : 'hover:text-[#20252B]'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>{locale === 'ku' ? 'سەرەکی' : locale === 'en' ? 'Home' : 'الرئيسية'}</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('rental')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                      activeScreen === 'rental' ? 'text-[#D69A25] font-bold' : 'hover:text-[#20252B]'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{locale === 'ku' ? 'تأجیر' : locale === 'en' ? 'Rental' : 'التأجير'}</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('parts')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                      activeScreen === 'parts' ? 'text-[#D69A25] font-bold' : 'hover:text-[#20252B]'
                    }`}
                  >
                    <Cog className="w-3.5 h-3.5" />
                    <span>{locale === 'ku' ? 'پارچەکان' : locale === 'en' ? 'Parts' : 'قطع الغيار'}</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('map')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                      activeScreen === 'map' ? 'text-[#D69A25] font-bold' : 'hover:text-[#20252B]'
                    }`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{locale === 'ku' ? 'نەخشە' : locale === 'en' ? 'Map' : 'الخارطة'}</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('profile')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                      activeScreen === 'profile' ? 'text-[#D69A25] font-bold' : 'hover:text-[#20252B]'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{locale === 'ku' ? 'هەژمار' : locale === 'en' ? 'Profile' : 'حسابي'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
