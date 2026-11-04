import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Smartphone,
  CheckCircle2,
  Bell,
  QrCode,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle
} from 'lucide-react';

export const DownloadAppPage: React.FC = () => {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  // Configurable URLs - Set to null or coming soon until officially approved
  const OFFICIAL_CONFIG = {
    googlePlayUrl: null, // Set string e.g. "https://play.google.com/store/apps/details?id=com.heavyduty.app" when published
    appStoreUrl: null,   // Set string e.g. "https://apps.apple.com/app/heavy-duty/id..." when published
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setRegistered(true);
  };

  const appFeatures = isAr
    ? [
        { title: 'تصفية جغرافية دقيقة', desc: 'تحديد موقع مشروعك في أي من محافظات العراق الـ 19 للعثور على أقرب الآليات وقطع الغيار.' },
        { title: 'اتصال مباشر فوري', desc: 'أزرار اتصال هاتفي وواتساب فورية مع أصحاب الآليات ومسؤولي الورش دون انتظار وسيط.' },
        { title: 'إشعارات حية لطلبات الاستئجار', desc: 'تنبيهات فورية لملاك المعدات عند استلام طلب استئجار جديد أو استفسار شراء.' },
        { title: 'دعم كامل للغة العربية ودينار العراق', desc: 'واجهة مصممة للأجهزة الذكية تراعي طبيعة الاستخدام الميداني الشاق مع أسعار IQD.' },
      ]
    : [
        { title: 'Precision Geographic Filtering', desc: 'Pinpoint your project across all 19 Iraqi governorates to mobilize proximate machinery and components.' },
        { title: 'Instant Direct Communication', desc: 'One-tap telephone and verified WhatsApp buttons to reach equipment owners and workshop managers.' },
        { title: 'Real-Time Jobsite Notifications', desc: 'Push notifications alerting machinery owners the moment a contractor submits a rental request.' },
        { title: 'Arabic RTL & Iraqi Dinar Native', desc: 'Industrial-grade mobile interface built for rugged field operations with transparent IQD accounting.' },
      ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] py-12 sm:py-20 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest block">
            {t.appDownloadSection.tag}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] dark:text-[#F5F6F7] text-balance">
            {t.appDownloadSection.title}
          </h1>
          <p className="text-xs sm:text-base text-[#303943] dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
            {t.appDownloadSection.desc}
          </p>
        </div>
      </section>

      {/* App Mockup & Store Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Device Mockup Presentation */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[270px] xs:max-w-[290px] sm:max-w-xs rounded-[36px] sm:rounded-[40px] border-6 sm:border-8 border-[#20252B] dark:border-[#3E4956] bg-[#20252B] shadow-lg p-2.5 sm:p-3">
              {/* Device Screen Shell */}
              <div className="rounded-[26px] sm:rounded-[30px] bg-[#FFFFFF] dark:bg-[#20252B] text-[#20252B] dark:text-[#F5F6F7] overflow-hidden p-4 space-y-3 border border-[#E2E5E8] dark:border-[#3E4956]">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E5E8] dark:border-[#3E4956]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#D69A25] text-[#20252B] flex items-center justify-center font-black text-[10px]">
                      HD
                    </div>
                    <span className="text-xs font-black tracking-tight">HEAVY DUTY</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D69A25]/15 text-[#D69A25] font-bold">
                    Iraq
                  </span>
                </div>

                {/* Simulated App Search Bar */}
                <div className="p-2 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] text-[11px] text-[#303943] dark:text-[#CBD5E1] flex items-center gap-1.5">
                  <span>🔍</span>
                  <span className="truncate">{isAr ? 'ابحث عن حفارة، لودر، قطع غيار...' : 'Search excavators, parts...'}</span>
                </div>

                {/* Simulated 4 Service Icons */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[9px] font-bold text-[#303943] dark:text-[#CBD5E1]">
                  <div className="p-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956]">
                    <div className="text-[#D69A25] mb-0.5 text-xs">🚜</div>
                    <span>{isAr ? 'تأجير' : 'Rental'}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956]">
                    <div className="text-[#303943] dark:text-[#CBD5E1] mb-0.5 text-xs">🏷️</div>
                    <span>{isAr ? 'بيع' : 'Sales'}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956]">
                    <div className="text-[#303943] dark:text-[#CBD5E1] mb-0.5 text-xs">⚙️</div>
                    <span>{isAr ? 'قطع' : 'Parts'}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956]">
                    <div className="text-[#D69A25] mb-0.5 text-xs">🛠️</div>
                    <span>{isAr ? 'صيانة' : 'Repairs'}</span>
                  </div>
                </div>

                {/* Simulated Machine Card */}
                <div className="p-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-1.5">
                  <div className="h-20 rounded-lg bg-[#EAECEE] dark:bg-[#303943] flex items-center justify-center text-[10px] text-[#303943] dark:text-[#CBD5E1] font-medium text-center p-2">
                    CAT 336D Crawler Excavator
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#20252B] dark:text-[#F5F6F7]">Baghdad · بغداد</span>
                    <span className="text-[#D69A25] font-mono font-bold">250,000 IQD/يوم</span>
                  </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="p-2 rounded-lg bg-[#D69A25]/15 border border-[#D69A25]/30 text-[9px] text-[#D69A25] text-center font-mono font-bold">
                  ● {isAr ? 'إصدار أندرويد و iOS قريباً' : 'Android & iOS Release Soon'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Store Availability Cards */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full">
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest block">
                {isAr ? 'جاهزية متجر التطبيقات' : 'STORE ROLLOUT STATUS'}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                {isAr ? 'تنزيل رسمي موثوق خالٍ من الروابط العشوائية' : 'Authentic store distribution without unverified download links'}
              </h2>
              <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                {isAr
                  ? 'حرصاً على سلامة بيانات المقاولين وسلامة الأجهزة، لا تقوم HEAVY DUTY بنشر ملفات APK خارجية غير معتمدة. يجري اعتماد التطبيق رسمياً على متاجر Google Play و Apple App Store.'
                  : 'To protect client security and ensure device integrity, HEAVY DUTY distributes solely through verified channels. Official store links will activate immediately upon final store review.'}
              </p>
            </div>

            {/* Platform Download Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Android Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🤖</span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#D69A25]/10 text-[#D69A25] font-bold border border-[#D69A25]/20">
                    {isAr ? 'قريباً' : 'Coming Soon'}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                  Google Play (Android)
                </h4>
                <p className="text-xs text-[#303943] dark:text-[#CBD5E1]">
                  {isAr ? 'متوافق مع أجهزة أندرويد للهواتف الذكية والأجهزة اللوحية الميدانية.' : 'Optimized for Android smartphones and rugged field tablets.'}
                </p>
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#20252B] text-[#94A3B8] text-xs font-bold cursor-not-allowed border border-[#E2E5E8] dark:border-[#3E4956]"
                  >
                    Google Play Coming Soon
                  </button>
                </div>
              </div>

              {/* iOS Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🍎</span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#F5F6F7] dark:bg-[#20252B] text-[#303943] dark:text-[#CBD5E1] font-bold border border-[#E2E5E8] dark:border-[#3E4956]">
                    {isAr ? 'قريباً' : 'Coming Soon'}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                  Apple App Store (iOS)
                </h4>
                <p className="text-xs text-[#303943] dark:text-[#CBD5E1]">
                  {isAr ? 'متوافق مع أجهزة iPhone و iPad للمهندسين ومديري المشاريع.' : 'Engineered for iPhone and iPad for site engineers and managers.'}
                </p>
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-[#F5F6F7] dark:bg-[#20252B] text-[#94A3B8] text-xs font-bold cursor-not-allowed border border-[#E2E5E8] dark:border-[#3E4956]"
                  >
                    App Store Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Notification Form */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#303943] dark:bg-[#2B333D] text-white space-y-3 sm:space-y-4 border border-transparent dark:border-[#3E4956]">
              <div className="flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-[#D69A25]" />
                <h4 className="text-xs sm:text-sm font-bold font-heading">
                  {isAr ? 'كن أول من يعلم عند إتاحة التنزيل الرسمي' : 'Be first to know when the app launches'}
                </h4>
              </div>

              {registered ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {t.appDownloadSection.notifySuccess}
                </div>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.appDownloadSection.notifyPlaceholder}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#20252B] border border-slate-600 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#D69A25] placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] font-bold text-xs transition-colors whitespace-nowrap cursor-pointer min-h-[44px]"
                  >
                    {t.appDownloadSection.notifyBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* App Key Capabilities */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest block">
            {isAr ? 'مميزات تطبيق الهاتف' : 'MOBILE APP SPECIFICATIONS'}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'مُصمم لبيئة العمل الميدانية ومواقع الإنشاءات' : 'Built for rugged jobsite conditions and fast mobile decisions'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {appFeatures.map((feat, i) => (
            <div key={i} className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#D69A25]/10 dark:bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#D69A25]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">{feat.title}</h3>
              <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
