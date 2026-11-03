import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
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
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.salesService} alt="Heavy Equipment Sales" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Tag className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الثانية في HEAVY DUTY' : 'CORE SERVICE 02'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'بيع وشراء المعدات والآليات الثقيلة' : 'Heavy Equipment Sales Marketplace'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'سوق متقدم ومنظم لعرض الآليات الإنشائية والصناعية الجديدة والمستعملة من الوكالات المعتمدة والمعارض والملاك المؤهلين في عموم العراق.'
              : 'A structured, transparent marketplace for new and certified pre-owned construction and industrial machinery from authorized dealerships, commercial yards, and verified owners.'}
          </p>
        </div>
      </section>

      {/* Structured Machine Specs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {isAr ? 'معايير التوثيق الفني' : 'TECHNICAL RIGOR & TRANSPARENCY'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isAr
                ? 'بيانات فنية دقيقة تحمي المشتري وتبرز قيمة المعدة للبائع'
                : 'Verified machine specifications protecting buyers and showcasing value for sellers'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'حرصنا في HEAVY DUTY على أن تحتوي معروضات البيع داخل التطبيق على كافة المعايير الهندسية الضرورية لتقييم الآلية قبل المعاينة الميدانية، متضمنةً ساعات التشغيل وحالة الفحص وسنة الصنع والضمانات الرسمية.'
                : 'Every machinery sales listing inside the HEAVY DUTY mobile application incorporates rigorous engineering parameters essential for evaluation prior to physical on-site inspection, including operating hours, inspection logs, and customs status.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {specsFeatures.map((spec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{spec.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
              <img src={IMAGES.salesService} alt="Dealership fleet" className="w-full h-80 object-cover" />
              <div className="p-6 space-y-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'التفاوض والمعاينة عبر التطبيق' : 'Direct Interaction in Mobile App'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'يتم استعراض المعارض المعتمدة وإرسال الاستفسارات والاتصال بالوكلاء حصرياً عبر تطبيق الهاتف. المنصة لا تتقاضى عمولات خفية.'
                    : 'Showroom exploration, technical inquiry submission, and direct seller contact are conducted via the application. HEAVY DUTY introduces buyers to verified suppliers transparently.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Categories: Dealerships vs Individual Owners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {isAr ? 'فئات البائعين في المنصة' : 'VERIFIED SELLER CATEGORIES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'هيكلية عادلة تدعم الشركات والملاك' : 'A structured ecosystem supporting dealerships and owners'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sellerTiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{tier.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tier.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 max-w-2xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            {isAr ? 'هل تمتلك معرضاً أو ترغب ببيع معداتك؟' : 'Operating a dealership or looking to sell machinery?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {isAr
              ? 'انضم كمعرض معتمد أو سجل اهتمامك لتكون أول من ينشر معروضاته عند إطلاق التطبيق الرسمي.'
              : 'Join as an accredited showroom partner or register your email to list fleets upon app launch.'}
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
              {isAr ? 'بوابة المعارض والوكلاء' : 'Dealership Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
