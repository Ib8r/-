import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
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
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Bright Header Banner */}
      <section className="bg-[#FFFFFF] border-b border-[#E2E5E8] py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D69A25]/10 border border-[#D69A25]/30 text-[#D69A25] text-xs font-mono font-bold">
            <Wrench className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الرابعة في HEAVY DUTY' : 'CORE SERVICE 04'}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] text-balance">
            {isAr ? 'مراكز الصيانة والورش الهندسية المعتمدة' : 'Certified Heavy Equipment Maintenance Centers'}
          </h1>

          <p className="text-xs sm:text-base text-[#303943] max-w-2xl leading-relaxed">
            {isAr
              ? 'دليل مهني متخصص يربط مقاولي المشاريع وأصحاب الأساطيل بمهندسي الهيدروليك وميكانيك الديزل وفرق الصيانة الميدانية المتنقلة 24/7.'
              : 'A specialized directory linking contractors and fleet managers with certified hydraulic engineers, diesel overhaul specialists, and 24/7 mobile field service units.'}
          </p>
        </div>
      </section>

      {/* Engineering Specialties */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {isAr ? 'التخصصات الهندسية' : 'TECHNICAL DISCIPLINES'}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] font-heading">
            {isAr ? 'خبرات فنية عميقة لحماية استثماراتك في الآليات' : 'Specialized engineering protecting your heavy machinery investments'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {specialties.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#D69A25]/10 text-[#D69A25] flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-[#D69A25]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#20252B] font-heading">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workshop Publishing & Content Features */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {isAr ? 'منصة نشر هندسية وتوعوية' : 'COMMUNITY & CASE STUDIES'}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] font-heading">
              {isAr
                ? 'استوديو لنشر خبرات الورش وتوثيق الأعمال الناجحة'
                : 'A dedicated publishing studio for workshops to document repair expertise'}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
              {isAr
                ? 'لا تقتصر المنصة على دليل أرقام تقليدي، بل تمنح مراكز الصيانة أدوات احترافية لنشر منشورات مصورة وفيديوهات قصيرة تشرح عمليات الإصلاح المعقدة، مما يمنح المقاولين ثقة كاملة بالقدرات الفنية للورشة قبل التكليف بالعمل.'
                : 'Far beyond a static directory, HEAVY DUTY equips maintenance centers with creative publishing tools to share verified photos and short video case studies of completed repairs, building undeniable technical trust with contractors.'}
            </p>

            <div className="space-y-3 pt-2">
              {contentFeatures.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E5E8] space-y-1 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-bold text-[#20252B] font-heading">{feat.title}</h4>
                  <p className="text-xs text-[#303943] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl overflow-hidden border border-[#E2E5E8] shadow-sm bg-[#FFFFFF]">
              <div className="h-56 sm:h-72 w-full">
                <IndustrialImage
                  src={IMAGES.maintenanceService}
                  fallbackSrc={FALLBACK_IMAGES.maintenanceService}
                  alt="Engineering facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2 bg-[#F5F6F7] border-t border-[#E2E5E8]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D69A25]">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'طلب الصيانة الميدانية في التطبيق' : 'Request Mobile Crews in App'}</span>
                </div>
                <p className="text-xs text-[#303943] leading-relaxed">
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
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] space-y-3 sm:space-y-4 max-w-2xl mx-auto shadow-2xs">
          <h3 className="text-lg sm:text-xl font-bold text-[#20252B] font-heading">
            {isAr ? 'هل تمتلك مركز صيانة أو ورشة هندسية متخصصة؟' : 'Operating a specialized industrial maintenance workshop?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#303943]">
            {isAr
              ? 'انضم كمركز صيانة معتمد لنشر أعمالك الفنية واستقبال طلبات المقاولين وأصحاب الأساطيل.'
              : 'Join as an accredited maintenance center to showcase your engineering capabilities and receive contractor inquiries.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate('/download')}
              className="px-5 py-2.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] text-xs font-bold cursor-pointer"
            >
              {isAr ? 'تحميل التطبيق قريباً' : 'Download App Page'}
            </button>
            <button
              onClick={() => navigate('/for-businesses')}
              className="px-5 py-2.5 rounded-xl bg-[#303943] hover:bg-[#20252B] text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'بوابة ورش الصيانة' : 'Workshops Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
