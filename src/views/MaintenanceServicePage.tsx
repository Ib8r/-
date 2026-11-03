import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
import {
  Wrench,
  CheckCircle2,
  Cpu,
  Truck,
  Video,
  FileText,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Zap,
  HardHat
} from 'lucide-react';

export const MaintenanceServicePage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const specialties = isAr
    ? [
        {
          title: 'صيانة وتجفيت مضخات وبساتن الهيدروليك',
          desc: 'فحص ضغوط الهيدروليك بار، توضيب المضخات الرئيسية، تصنيع خراطيم الضغط العالي، واستبدال السيلات.',
          icon: Wrench,
        },
        {
          title: 'تجفيت وصيانة محركات الديزل الثقيلة',
          desc: 'توضيب محركات كوماتسو، كاتربيلار، سكانيا، وبيركنز، فحص وتعيين البخاخات والنوزلات وضبط التوربو.',
          icon: Zap,
        },
        {
          title: 'كهرباء الآليات وفحص الكمبيوتر وبرمجة اللوحات',
          desc: 'تشخيص الأعطال بجهاز الفحص الإلكتروني المتخصص، فحص حساسات الأكسل، وصيانة ضفائر المولدات والمعدات.',
          icon: Cpu,
        },
        {
          title: 'وحدات الصيانة الميدانية وطوارئ المواقع 24/7',
          desc: 'سيارات صيانة متنقلة مجهزة بمولدات ومعدات لحام وضواغط هواء للتدخل الموقعي الفوري في المشاريع النائية.',
          icon: Truck,
        },
      ]
    : [
        {
          title: 'Hydraulic Overhaul & Pressure Calibration',
          desc: 'Hydraulic bar pressure diagnostics, main pump rebuilding, high-pressure hose crimping, and seal replacement.',
          icon: Wrench,
        },
        {
          title: 'Heavy Diesel Engine Overhaul & Fuel Systems',
          desc: 'Complete engine rebuilds for CAT, Komatsu, Scania, Perkins, injector bench testing, and turbocharger calibration.',
          icon: Zap,
        },
        {
          title: 'Heavy Electrical Diagnostics & Controller Programming',
          desc: 'Electronic trouble code scanning with factory diagnostics, sensor troubleshooting, and generator wiring harness repair.',
          icon: Cpu,
        },
        {
          title: '24/7 Mobile Field Repair & Emergency Response',
          desc: 'Mobile service trucks equipped with generators, heavy welding gear, and air compressors for immediate jobsite dispatch.',
          icon: Truck,
        },
      ];

  const contentFeatures = isAr
    ? [
        {
          title: 'منشورات الورش والحالات الفنية المصورة',
          desc: 'تتيح المنصة للمراكز المعتمدة نشر صور وفيديوهات توثق مراحل إصلاح الآليات وتوضيح أسباب الأعطال الشائعة.',
        },
        {
          title: 'تواصل مباشر عبر الهاتف والواتساب',
          desc: 'تحديد موعد كشف أو طلب ورشة متنقلة بالاتصال المباشر دون وسطاء، مع إمكانية إرسال تفاصيل العطل بصور مسبقة.',
        },
        {
          title: 'توثيق كفاءة الورشة والتخصصات المعتمدة',
          desc: 'ملف تعريفي رسمي يوضح عناوين الورش في المناطق الصناعية وتجهيزات الرفع والفحص المتوفرة لديهم.',
        },
      ]
    : [
        {
          title: 'Illustrated Repair Case Studies & Video Feeds',
          desc: 'Certified workshops publish step-by-step photos and video walkthroughs of complex hydraulic and engine repairs.',
        },
        {
          title: 'Direct Telephony & WhatsApp Booking',
          desc: 'Schedule on-site diagnostics or dispatch mobile units via direct phone lines and messaging without intermediaries.',
        },
        {
          title: 'Documented Facility Capabilities',
          desc: 'Verified business profiles indicating workshop address, lifting overhead cranes, test benches, and tooling.',
        },
      ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.maintenanceService} alt="Heavy Equipment Maintenance" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
            <Wrench className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الرابعة في HEAVY DUTY' : 'CORE SERVICE 04'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'مراكز الصيانة والورش الهندسية المعتمدة' : 'Certified Heavy Equipment Maintenance Centers'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'دليل مهني متخصص يربط مقاولي المشاريع وأصحاب الأساطيل بمهندسي الهيدروليك وميكانيك الديزل وفرق الصيانة الميدانية المتنقلة 24/7.'
              : 'A specialized directory linking contractors and fleet managers with certified hydraulic engineers, diesel overhaul specialists, and 24/7 mobile field service units.'}
          </p>
        </div>
      </section>

      {/* Engineering Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {isAr ? 'التخصصات الهندسية' : 'TECHNICAL DISCIPLINES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'خبرات فنية عميقة لحماية استثماراتك في الآليات' : 'Specialized engineering protecting your heavy machinery investments'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialties.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workshop Publishing & Content Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {isAr ? 'منصة نشر هندسية وتوعوية' : 'COMMUNITY & CASE STUDIES'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isAr
                ? 'استوديو لنشر خبرات الورش وتوثيق الأعمال الناجحة'
                : 'A dedicated publishing studio for workshops to document repair expertise'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'لا تقتصر المنصة على دليل أرقام تقليدي، بل تمنح مراكز الصيانة أدوات احترافية لنشر منشورات مصورة وفيديوهات قصيرة تشرح عمليات الإصلاح المعقدة، مما يمنح المقاولين ثقة كاملة بالقدرات الفنية للورشة قبل التكليف بالعمل.'
                : 'Far beyond a static yellow-pages list, HEAVY DUTY equips maintenance centers with creative publishing tools to share verified photos and short video case studies of completed repairs, building undeniable technical trust with contractors.'}
            </p>

            <div className="space-y-4 pt-2">
              {contentFeatures.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
              <img src={IMAGES.maintenanceService} alt="Engineering facility" className="w-full h-80 object-cover" />
              <div className="p-6 space-y-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'طلب الصيانة الميدانية في التطبيق' : 'Request Mobile Crews in App'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'يمكن لمديري المواقع إرسال طلب استغاثة أو صيانة دورية وتحديد موقع العطل الجغرافي مباشرة للورشة المتنقلة عبر تطبيق الهاتف.'
                    : 'Jobsite supervisors can transmit GPS breakdown coordinates and machinery error codes directly to mobile field response vehicles through the mobile app.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 max-w-2xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            {isAr ? 'هل تمتلك مركز صيانة أو ورشة هندسية متخصصة؟' : 'Operating a specialized industrial maintenance workshop?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {isAr
              ? 'انضم كمركز صيانة معتمد لنشر أعمالك الفنية واستقبال طلبات المقاولين وأصحاب الأساطيل.'
              : 'Join as an accredited maintenance center to showcase your engineering capabilities and receive contractor inquiries.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/download')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              {isAr ? 'تحميل التطبيق قريباً' : 'Download App Page'}
            </button>
            <button
              onClick={() => navigate('/for-businesses')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'بوابة ورش الصيانة' : 'Workshops Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
