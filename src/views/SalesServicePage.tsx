import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
import {
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Building,
  UserCheck
} from 'lucide-react';

export const SalesServicePage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const specsFeatures = isAr
    ? [
        { title: 'ساعات التشغيل الفعلية (Operating Hours)', desc: 'تسجيل دقيق وموثق لعداد ساعات العمل ومطابقته لسجلات الصيانة الدورية.' },
        { title: 'سنة الصنع وتاريخ الاستيراد (Model Year)', desc: 'بيانات موثوقة لسنة الإنتاج ورقم الهيكل (VIN/Chassis Number) والبلد المصنّع.' },
        { title: 'تقارير الفحص والجاهزية الفنية', desc: 'إمكانية إرفاق تقارير فحص ضغوط الهيدروليك وحالة المحرك وسلامة الجنازير.' },
        { title: 'الموقف الجمركي واللوحات الرسمية', desc: 'توضيح حالة التخليص الجمركي والأوراق الثبوتية والترقيم المروري العراقي.' },
      ]
    : [
        { title: 'Genuine Operating Hours', desc: 'Accurate and verified machine hour recording corroborated with maintenance logs.' },
        { title: 'Manufacture Year & Provenance', desc: 'Standardized documentation of model year, chassis/VIN identifiers, and build origin.' },
        { title: 'Technical Inspection Reports', desc: 'Option to attach certified inspection dossiers for hydraulic pressure and diesel compression.' },
        { title: 'Customs Clearance & Documentation', desc: 'Transparent declaration of Iraqi customs status, registration, and title verification.' },
      ];

  const sellerTiers = isAr
    ? [
        {
          title: 'الوكالات الرسمية ومعارض الآليات',
          desc: 'ملف تعريفي معتمد لشركات ووكلاء بيع المعدات لعرض أساطيلهم الجديدة والمستعملة مع الضمانات المعتمدة.',
          icon: Building,
        },
        {
          title: 'الملاك الفرديون المؤهلون',
          desc: 'إمكانية إدراج الآليات للبيع المباشر للملاك المشتركين في باقة المالك المحترف وما فوق وفق ضوابط المنصة.',
          icon: UserCheck,
        },
      ]
    : [
        {
          title: 'Commercial Dealerships & Showrooms',
          desc: 'Verified enterprise profiles for equipment dealers to display inventory fleets with warranties and support.',
          icon: Building,
        },
        {
          title: 'Qualified Individual Machinery Owners',
          desc: 'Direct listing access for equipment owners enrolled in eligible subscription tiers (such as Pro Owner).',
          icon: UserCheck,
        },
      ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Bright Header Banner */}
      <section className="bg-[#FFFFFF] border-b border-[#E2E5E8] py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D69A25]/10 border border-[#D69A25]/30 text-[#D69A25] text-xs font-mono font-bold">
            <Tag className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الثانية في HEAVY DUTY' : 'CORE SERVICE 02'}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] text-balance">
            {isAr ? 'بيع وشراء المعدات والآليات الثقيلة' : 'Heavy Equipment Sales Marketplace'}
          </h1>

          <p className="text-xs sm:text-base text-[#303943] max-w-2xl leading-relaxed">
            {isAr
              ? 'سوق متقدم ومنظم لعرض الآليات الإنشائية والصناعية الجديدة والمستعملة من الوكالات المعتمدة والمعارض والملاك المؤهلين في عموم العراق.'
              : 'A structured, transparent marketplace for new and certified pre-owned construction and industrial machinery from authorized dealerships, commercial yards, and verified owners.'}
          </p>
        </div>
      </section>

      {/* Structured Machine Specs Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {isAr ? 'معايير التوثيق الفني' : 'TECHNICAL RIGOR & TRANSPARENCY'}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] font-heading">
              {isAr
                ? 'بيانات فنية دقيقة تحمي المشتري وتبرز قيمة المعدة للبائع'
                : 'Verified machine specifications protecting buyers and showcasing value for sellers'}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
              {isAr
                ? 'حرصنا في HEAVY DUTY على أن تحتوي معروضات البيع داخل التطبيق على كافة المعايير الهندسية الضرورية لتقييم الآلية قبل المعاينة الميدانية، متضمنةً ساعات التشغيل وحالة الفحص وسنة الصنع والضمانات الرسمية.'
                : 'Every machinery sales listing inside the HEAVY DUTY mobile application incorporates rigorous engineering parameters essential for evaluation prior to physical on-site inspection, including operating hours, inspection logs, and customs status.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {specsFeatures.map((spec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E5E8] space-y-1 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-bold text-[#20252B] font-heading">{spec.title}</h4>
                  <p className="text-xs text-[#303943] leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl overflow-hidden border border-[#E2E5E8] shadow-sm bg-[#FFFFFF]">
              <div className="h-56 sm:h-72 w-full">
                <IndustrialImage
                  src={IMAGES.salesService}
                  fallbackSrc={FALLBACK_IMAGES.salesService}
                  alt="Dealership fleet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2 bg-[#F5F6F7] border-t border-[#E2E5E8]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D69A25]">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'التفاوض والمعاينة عبر التطبيق' : 'Direct Interaction in Mobile App'}</span>
                </div>
                <p className="text-xs text-[#303943] leading-relaxed">
                  {isAr
                    ? 'يتم استعراض المعارض المعتمدة وإرسال الاستفسارات والاتصال بالوكلاء حصرياً عبر تطبيق الهاتف. المنصة لا تتقاضى عمولات خفية.'
                    : 'Showroom exploration, technical inquiry submission, and direct seller contact are conducted via the application. HEAVY DUTY introduces buyers to verified suppliers transparently.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Categories */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {isAr ? 'فئات البائعين في المنصة' : 'VERIFIED SELLER CATEGORIES'}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] font-heading">
            {isAr ? 'هيكلية عادلة تدعم الشركات والملاك' : 'A structured ecosystem supporting dealerships and owners'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sellerTiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div key={i} className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs space-y-3 sm:space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D69A25]/10 text-[#D69A25] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D69A25]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#20252B] font-heading">{tier.title}</h3>
                <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">{tier.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2E5E8] space-y-3 sm:space-y-4 max-w-2xl mx-auto shadow-2xs">
          <h3 className="text-lg sm:text-xl font-bold text-[#20252B] font-heading">
            {isAr ? 'هل تمتلك معرضاً أو ترغب ببيع معداتك؟' : 'Operating a dealership or looking to sell machinery?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#303943]">
            {isAr
              ? 'انضم كمعرض معتمد أو سجل اهتمامك لتكون أول من ينشر معروضاته عند إطلاق التطبيق الرسمي.'
              : 'Join as an accredited showroom partner or register your email to list fleets upon app launch.'}
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
              {isAr ? 'بوابة المعارض والوكلاء' : 'Dealership Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
