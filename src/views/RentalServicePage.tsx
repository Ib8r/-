import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
import {
  Truck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldCheck
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
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] py-12 sm:py-20 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#D69A25]/10 dark:bg-[#D69A25]/20 border border-[#D69A25]/30 text-[#D69A25] text-xs font-mono font-bold">
            <Truck className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الأولى في HEAVY DUTY' : 'CORE SERVICE 01'}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] dark:text-[#F5F6F7] text-balance">
            {isAr ? 'تأجير المعدات والآليات الثقيلة' : 'Heavy Equipment Rental Marketplace'}
          </h1>

          <p className="text-xs sm:text-base text-[#303943] dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
            {isAr
              ? 'الربط المباشر بين مقاولي المشاريع وشركات الإنشاءات وبين ملاك الآليات الفرديين وشركات التأجير المعتمدة في كافة محافظات العراق الـ 19.'
              : 'Connecting construction contractors and developers directly with verified equipment owners and certified fleet rental companies across all 19 Iraqi governorates.'}
          </p>
        </div>
      </section>

      {/* Overview & How App Manages It */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {isAr ? 'مفهوم الخدمة ومزاياها' : 'RENTAL CONCEPT & VALUE'}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr
                ? 'استئجار المعدة المناسبة لمشروعك في المكان والوقت المحدد'
                : 'Mobilize the right machinery for your jobsite at the right time'}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
              {isAr
                ? 'يوفر تطبيق HEAVY DUTY تجربة استكشاف متطورة تمكن المهندسين ومديري المشاريع من تصفية الآليات بحسب المحافظة والمدينة وسنة الصنع والمواصفات الفنية، مع استعراض خيارات الأسعار اليومية والأسبوعية والشهرية بالدينار العراقي (IQD).'
                : 'The HEAVY DUTY application delivers a refined discovery experience allowing engineers and project managers to filter machinery by governorate, city, manufacture year, and technical specs, reviewing transparent daily, weekly, and monthly rates in Iraqi Dinars (IQD).'}
            </p>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {rentalTerms.map((term, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-1 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">{term.title}</h4>
                  <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl overflow-hidden border border-[#E2E5E8] dark:border-[#3E4956] shadow-sm bg-[#FFFFFF] dark:bg-[#2B333D]">
              <div className="h-56 sm:h-72 w-full">
                <IndustrialImage
                  src={IMAGES.rentalService}
                  fallbackSrc={FALLBACK_IMAGES.rentalService}
                  alt="Equipment on jobsite"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2 bg-[#F5F6F7] dark:bg-[#20252B] border-t border-[#E2E5E8] dark:border-[#3E4956]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D69A25]">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'العمليات تتم عبر التطبيق الميداني' : 'Executed Inside the Mobile App'}</span>
                </div>
                <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
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
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {isAr ? 'فئات الآليات المشمولة' : 'SUPPORTED MACHINERY CATEGORIES'}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'تنوع هندسي يلبي كافة تخصصات البناء والتشييد' : 'Comprehensive fleet diversity for civil and industrial infrastructure'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#D69A25]">0{idx + 1}.</div>
              <h3 className="text-xs sm:text-sm font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">{cat.name}</h3>
              <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Value Matrix */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#303943] dark:bg-[#20252B] text-[#F5F6F7] space-y-3 sm:space-y-4 shadow-2xs border border-transparent dark:border-[#3E4956]">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#D69A25]">
              {isAr ? 'مزايا التأجير للمقاولين والزبائن' : 'Benefits for Contractors & Clients'}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'توفير تكاليف شراء وصيانة الآليات الثقيلة الباهظة.' : 'Avoid capital expenditure and ongoing asset depreciation.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'تصفية سريعة بحسب أقرب موقع لتقليل رسوم النقل اللوبد.' : 'Localized geographic discovery minimizing heavy transport transit fees.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'مقارنة شفافة للأسعار والمواصفات الفنية بين عدة مزودين.' : 'Transparent spec and pricing comparison across multiple verified providers.'}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] text-[#20252B] dark:text-[#F5F6F7] space-y-3 sm:space-y-4 shadow-2xs">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#20252B] dark:text-[#F5F6F7]">
              {isAr ? 'مزايا التأجير لملاك الآليات والشركات' : 'Benefits for Equipment Owners & Fleets'}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'تشغيل مستمر للآليات والحد من فترات التوقف في الساحات.' : 'Maximize fleet utilization and eliminate idle parking downtime.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'الوصول المباشر إلى شركات المقاولات العامة ومشاريع البنية التحتية.' : 'Direct exposure to major commercial contractors and civil infrastructure projects.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D69A25] shrink-0 mt-0.5" />
                <span>{isAr ? 'لوحة تحكم ذكية لإدارة حجوزات الأسطول وجداول الصيانة.' : 'Dedicated dashboard to control machine availability and schedule requests.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-3 sm:space-y-4 max-w-2xl mx-auto shadow-2xs">
          <h3 className="text-lg sm:text-xl font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'هل تبحث عن تأجير معدة أو ترغب بإدراج أسطولك؟' : 'Ready to rent equipment or list your fleet?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1]">
            {isAr
              ? 'تجري العمليات التشغيلية وتفاصيل العقود حصرياً من خلال تطبيق HEAVY DUTY. سجل بريدك ليصلك تنبيه الإطلاق.'
              : 'All operational listings and requests are managed in the mobile application. Register to receive the official launch alert.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate('/download')}
              className="px-5 py-2.5 rounded-xl bg-[#D69A25] hover:bg-[#C2891E] text-[#20252B] text-xs font-bold cursor-pointer"
            >
              {isAr ? 'صفحة تحميل التطبيق' : 'Download App Page'}
            </button>
            <button
              onClick={() => navigate('/for-businesses')}
              className="px-5 py-2.5 rounded-xl bg-[#303943] dark:bg-[#20252B] hover:bg-[#20252B] text-white text-xs font-bold cursor-pointer border border-transparent dark:border-[#3E4956]"
            >
              {isAr ? 'انضم كشركة تأجير' : 'Join as Rental Fleet'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
