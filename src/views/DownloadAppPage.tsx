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
        { title: 'تصفية جغرافية دقيقة', desc: 'تحديد موقع مشروعك في أي من محافظات العراق الـ 18 للعثور على أقرب الآليات وقطع الغيار.' },
        { title: 'اتصال مباشر فوري', desc: 'أزرار اتصال هاتفي وواتساب فورية مع أصحاب الآليات ومسؤولي الورش دون انتظار وسيط.' },
        { title: 'إشعارات حية لطلبات الاستئجار', desc: 'تنبيهات فورية لملاك المعدات عند استلام طلب استئجار جديد أو استفسار شراء.' },
        { title: 'دعم كامل للغة العربية ودينار العراق', desc: 'واجهة مصممة للأجهزة الذكية تراعي طبيعة الاستخدام الميداني الشاق مع أسعار IQD.' },
      ]
    : [
        { title: 'Precision Geographic Filtering', desc: 'Pinpoint your project across all 18 Iraqi governorates to mobilize proximate machinery and components.' },
        { title: 'Instant Direct Communication', desc: 'One-tap telephone and verified WhatsApp buttons to reach equipment owners and workshop managers.' },
        { title: 'Real-Time Jobsite Notifications', desc: 'Push notifications alerting machinery owners the moment a contractor submits a rental request.' },
        { title: 'Arabic RTL & Iraqi Dinar Native', desc: 'Industrial-grade mobile interface built for rugged field operations with transparent IQD accounting.' },
      ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            {t.appDownloadSection.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {t.appDownloadSection.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.appDownloadSection.desc}
          </p>
        </div>
      </section>

      {/* App Mockup & Store Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Device Mockup Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 rounded-[40px] border-8 border-slate-900 bg-slate-900 shadow-2xl p-3">
              {/* Device Screen Shell */}
              <div className="rounded-[30px] bg-slate-950 text-white overflow-hidden p-5 space-y-4 border border-slate-800">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                      HD
                    </div>
                    <span className="text-xs font-black tracking-tight">HEAVY DUTY</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                    Iraq
                  </span>
                </div>

                {/* Simulated App Search Bar */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span>🔍</span>
                  <span>{isAr ? 'ابحث عن حفارة، لودر، قطعة غيار...' : 'Search excavators, parts...'}</span>
                </div>

                {/* Simulated 4 Service Icons */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-amber-400 mb-1">🚜</div>
                    <span>{isAr ? 'تأجير' : 'Rental'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-blue-400 mb-1">🏷️</div>
                    <span>{isAr ? 'بيع' : 'Sales'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-emerald-400 mb-1">⚙️</div>
                    <span>{isAr ? 'قطع' : 'Parts'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-orange-400 mb-1">🛠️</div>
                    <span>{isAr ? 'صيانة' : 'Repairs'}</span>
                  </div>
                </div>

                {/* Simulated Machine Card */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="h-24 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                    CAT 336D Crawler Excavator
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Baghdad · بغداد</span>
                    <span className="text-amber-400 font-mono font-bold">250,000 IQD/يوم</span>
                  </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 text-center font-mono font-bold">
                  ● {isAr ? 'إصدار أندرويد و iOS قريباً' : 'Android & iOS Release Soon'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official App Store Availability Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
                {isAr ? 'جاهزية متجر التطبيقات' : 'STORE ROLLOUT STATUS'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {isAr ? 'تنزيل رسمي موثوق خالٍ من الروابط العشوائية' : 'Authentic store distribution without unverified download links'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'حرصاً على سلامة بيانات المقاولين وسلامة الأجهزة، لا تقوم HEAVY DUTY بنشر ملفات APK خارجية غير معتمدة. يجري اعتماد التطبيق رسمياً على متاجر Google Play و Apple App Store.'
                  : 'To protect client security and ensure device integrity, HEAVY DUTY distributes solely through verified channels. Official store links will activate immediately upon final store review.'}
              </p>
            </div>

            {/* Platform Download Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Android Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🤖</span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    {isAr ? 'قريباً' : 'Coming Soon'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Google Play (Android)
                </h4>
                <p className="text-xs text-slate-600">
                  {isAr ? 'متوافق مع أجهزة أندرويد للهواتف الذكية والأجهزة اللوحية الميدانية.' : 'Optimized for Android smartphones and rugged field tablets.'}
                </p>
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed border border-slate-200"
                  >
                    Google Play Coming Soon
                  </button>
                </div>
              </div>

              {/* iOS Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🍎</span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    {isAr ? 'قريباً' : 'Coming Soon'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Apple App Store (iOS)
                </h4>
                <p className="text-xs text-slate-600">
                  {isAr ? 'متوافق مع أجهزة iPhone و iPad للمهندسين ومديري المشاريع.' : 'Engineered for iPhone and iPad for site engineers and managers.'}
                </p>
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed border border-slate-200"
                  >
                    App Store Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Notification Form */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold font-heading">
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
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
            {isAr ? 'مميزات تطبيق الهاتف' : 'MOBILE APP SPECIFICATIONS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'مُصمم لبيئة العمل الميدانية ومواقع الإنشاءات' : 'Built for rugged jobsite conditions and fast mobile decisions'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {appFeatures.map((feat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
