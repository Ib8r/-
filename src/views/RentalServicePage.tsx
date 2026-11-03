import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
import {
  Truck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldAlert,
  Layers,
  ChevronRight
} from 'lucide-react';

export const RentalServicePage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const isAr = locale === 'ar';

  const categories = isAr
    ? [
        { name: 'حفارات هيدروليكية (Crawler & Wheeled Excavators)', desc: 'حفارات جنزير ودواليب لمختلف أعماق الحفر وسعات الباكت.' },
        { name: 'بلدوزرات ودكاكات (Bulldozers & Compactors)', desc: 'معدات تسوية التربة ودك الأسس بمحركات ديزل عالية العزم.' },
        { name: 'شوكلات ولوادر (Wheel Loaders)', desc: 'رافعات شوكية ولوادر تحميل المواد والركام في مقالع الحصى والمواقع.' },
        { name: 'رافعات هيدروليكية وبرجية (Mobile & Tower Cranes)', desc: 'رافعات تلسكوبية وشاحنات رفع لمشاريع الإنشاءات والجسور.' },
        { name: 'شاحنات قلاب ولوبد (Dump Trucks & Lowboys)', desc: 'قلابات نقل التربة ولوبدات نقل المعدات الثقيلة بين المحافظات.' },
        { name: 'معدات رصف الطرق (Road Construction Machinery)', desc: 'حفارات أسفلت، فارشات، ورولات حديدية ومطاطية متطورة.' },
        { name: 'مولدات طاقة ومضخات (Industrial Generators & Pumps)', desc: 'مولدات كهرباء ديزل كاتمة ومضخات تصريف مياه المشاريع 24/7.' },
        { name: 'آليات تخصصية أخرى (Specialized Industrial Units)', desc: 'حفارات دق الركائز، مكانس صناعية، ورافعات مقصية.' },
      ]
    : [
        { name: 'Hydraulic Excavators (Crawler & Wheeled)', desc: 'Tracked and wheeled excavators with varying bucket capacities and digging depths.' },
        { name: 'Bulldozers & Soil Compactors', desc: 'Heavy grading and soil compaction machinery powered by high-torque diesel engines.' },
        { name: 'Wheel Loaders & Material Handlers', desc: 'High-capacity bucket loaders for quarry aggregate and site material transfer.' },
        { name: 'Mobile Telescopic & Tower Cranes', desc: 'Heavy lift cranes and telescopic boom trucks for structural bridge and high-rise work.' },
        { name: 'Dump Trucks & Lowboy Heavy Haulers', desc: 'Earthmoving tipper trucks and multi-axle lowboys for inter-governorate transport.' },
        { name: 'Road Construction & Paving Machinery', desc: 'Asphalt pavers, cold planers, and dual-drum vibratory rollers.' },
        { name: 'Heavy Industrial Generators & De-Watering Pumps', desc: 'Sound-attenuated diesel prime power generators and site drainage pumps.' },
        { name: 'Specialized Industrial Equipment', desc: 'Piling drill rigs, industrial sweepers, and telehandlers.' },
      ];

  const rentalTerms = isAr
    ? [
        { title: 'تأجير يومي مرن', desc: 'مناسب للمهام الطارئة أو العمليات السريعة ذات المدة المحددة.' },
        { title: 'تأجير أسبوعي وشهري', desc: 'عقود اقتصادية للمشاريع الإنشائية مع خصومات تشغيلية وجداول سداد مجدولة.' },
        { title: 'مع أو بدون مشغل', desc: 'إمكانية طلب سائق ومشغل محترف معتمد مع الآلية لضمان الإنتاجية وسلامة الموقع.' },
        { title: 'تنسيق النقل والترحيل (لوبد)', desc: 'تنسيق شاحنات اللوبد لنقل المعدة من ساحة المالك مباشرة إلى موقع المشروع.' },
      ]
    : [
        { title: 'Flexible Daily Rental', desc: 'Optimal for short-duration tasks, emergency excavations, and temporary jobs.' },
        { title: 'Weekly & Monthly Contracts', desc: 'Cost-effective arrangements for civil projects with transparent schedules.' },
        { title: 'With or Without Operator', desc: 'Option to request an experienced certified operator to ensure maximum site safety.' },
        { title: 'Lowboy Hauling Coordination', desc: 'Arrange mobilization and demobilization directly from yard to jobsite.' },
      ];

  return (
    <div className="space-y-20 pb-20">
      {/* Service Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.rentalService} alt="Heavy Equipment Rental" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            <Truck className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الأولى في HEAVY DUTY' : 'CORE SERVICE 01'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'تأجير المعدات والآليات الثقيلة' : 'Heavy Equipment Rental Marketplace'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'الربط المباشر بين مقاولي المشاريع وشركات الإنشاءات وبين ملاك الآليات الفرديين وشركات التأجير المعتمدة في كافة محافظات العراق الـ 18.'
              : 'Connecting construction contractors and developers directly with verified equipment owners and certified fleet rental companies across all 18 Iraqi governorates.'}
          </p>
        </div>
      </section>

      {/* Overview & How App Manages It */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {isAr ? 'مفهوم الخدمة ومزاياها' : 'RENTAL CONCEPT & VALUE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isAr
                ? 'استئجار المعدة المناسبة لمشروعك في المكان والوقت المحدد'
                : 'Mobilize the right machinery for your jobsite at the right time'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'يوفر تطبيق HEAVY DUTY تجربة استكشاف متطورة تمكن المهندسين ومديري المشاريع من تصفية الآليات بحسب المحافظة والمدينة وسنة الصنع والمواصفات الفنية، مع استعراض خيارات الأسعار اليومية والأسبوعية والشهرية بالدينار العراقي (IQD).'
                : 'The HEAVY DUTY application delivers a refined discovery experience allowing engineers and project managers to filter machinery by governorate, city, manufacture year, and technical specs, reviewing transparent daily, weekly, and monthly rates in Iraqi Dinars (IQD).'}
            </p>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {rentalTerms.map((term, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{term.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
              <img src={IMAGES.rentalService} alt="Equipment on jobsite" className="w-full h-80 object-cover" />
              <div className="p-6 space-y-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'العمليات تتم عبر التطبيق الميداني' : 'Executed Inside the Mobile App'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'يتم تقديم طلبات الاستئجار، معاينة جداول التوفر، والاتصال المباشر بالملاك والشركات حصرياً داخل تطبيق HEAVY DUTY للهواتف الذكية.'
                    : 'Rental requests, availability calendars, and direct provider telephone/WhatsApp communication are managed inside the HEAVY DUTY mobile application.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {isAr ? 'فئات الآليات المشمولة' : 'SUPPORTED MACHINERY CATEGORIES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'تنوع هندسي يلبي كافة تخصصات البناء والتشييد' : 'Comprehensive fleet diversity for civil and industrial infrastructure'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="text-xs font-mono font-bold text-amber-500">0{idx + 1}.</div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{cat.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Value Matrix: Customers vs Owners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Customers */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
            <h3 className="text-xl font-bold font-heading text-amber-400">
              {isAr ? 'مزايا التأجير للمقاولين والزبائن' : 'Benefits for Contractors & Clients'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'توفير تكاليف شراء وصيانة الآليات الثقيلة الباهظة.' : 'Avoid capital expenditure and ongoing asset depreciation.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'تصفية سريعة بحسب أقرب موقع لتقليل رسوم النقل اللوبد.' : 'Localized geographic discovery minimizing heavy transport transit fees.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'مقارنة شفافة للأسعار والمواصفات الفنية بين عدة مزودين.' : 'Transparent spec and pricing comparison across multiple verified providers.'}</span>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-slate-900 space-y-4">
            <h3 className="text-xl font-bold font-heading text-amber-800">
              {isAr ? 'مزايا التأجير لملاك الآليات والشركات' : 'Benefits for Equipment Owners & Fleets'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{isAr ? 'تشغيل مستمر للآليات والحد من فترات التوقف في الساحات.' : 'Maximize fleet utilization and eliminate idle parking downtime.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{isAr ? 'الوصول المباشر إلى شركات المقاولات العامة ومشاريع البنية التحتية.' : 'Direct exposure to major commercial contractors and civil infrastructure projects.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{isAr ? 'لوحة تحكم ذكية لإدارة حجوزات الأسطول وجداول الصيانة.' : 'Dedicated dashboard to control machine availability and schedule requests.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 max-w-2xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            {isAr ? 'هل تبحث عن تأجير معدة أو ترغب بإدراج أسطولك؟' : 'Ready to rent equipment or list your fleet?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {isAr
              ? 'تجري العمليات التشغيلية وتفاصيل العقود حصرياً من خلال تطبيق HEAVY DUTY. سجل بريدك ليصلك تنبيه الإطلاق.'
              : 'All operational listings and requests are managed in the mobile application. Register to receive the official launch alert.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/download')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              {isAr ? 'صفحة تحميل التطبيق' : 'Download App Page'}
            </button>
            <button
              onClick={() => navigate('/for-businesses')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              {isAr ? 'انضم كشركة تأجير' : 'Join as Rental Fleet'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
