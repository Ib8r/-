import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
import {
  Cog,
  CheckCircle2,
  Tag,
  Search,
  Package,
  Layers,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Building2,
  Cpu
} from 'lucide-react';

export const PartsServicePage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const partCategories = isAr
    ? [
        {
          title: 'مضخات وبساتن هيدروليكية (Hydraulic Pumps & Cylinders)',
          desc: 'مضخات رئيسية ومساعدة، بساتن بوم وباكت، وصمامات تحكم هيدروليكي لمختلف ضغوط البار.',
        },
        {
          title: 'فلاتر ومكونات محركات ديزل (Engine Filters & Overhaul Kits)',
          desc: 'فلاتر زيت وديزل وهواء، بستنات، رنكات، وطواقم كازكيت لمحركات كوماتسو، كاتربيلار، وكمنز.',
        },
        {
          title: 'سلاسل وجنازير وبكرات (Undercarriage & Tracks)',
          desc: 'سلاسل جنزير، بكرات سفلية وعلوية، مسننات دبل أكسل، وشفرات حماية للمسارات الوعرة.',
        },
        {
          title: 'أسنان باكت وشفرات حفر صخري (Bucket Teeth & Cutting Edges)',
          desc: 'أسنان باكت فولاذية مقاومة للتآكل ومسامير تثبيت وشفرات بلدوزرات للتسوية القاسية.',
        },
        {
          title: 'حساسات ولوحات كمبيوتر (Sensors & Electronic Controllers)',
          desc: 'كمبيوترات مكينة وهيدروليك، ضفائر كهربائية، سنسرات حرارة وضغط، وحساسات تشغيل إلكترونية.',
        },
        {
          title: 'نواقل حركة وجيربوكس دبل (Transmissions & Final Drives)',
          desc: 'تروس نقل حركة ZF، مسننات فايبر وجيربوكس دبل للمعدات الثقيلة والشاحنات العملاقة.',
        },
      ]
    : [
        {
          title: 'Hydraulic Pumps & Cylinders',
          desc: 'Main variable displacement piston pumps, boom/stick cylinders, and pilot control valves.',
        },
        {
          title: 'Diesel Engine Filters & Overhaul Components',
          desc: 'Heavy-duty oil, fuel, and air filtration, pistons, liners, and gasket sets for CAT, Komatsu, Cummins.',
        },
        {
          title: 'Undercarriage Tracks & Rollers',
          desc: 'Track links, track shoes, carrier rollers, idlers, sprockets, and heavy rock guards.',
        },
        {
          title: 'Bucket Teeth & Ground Engaging Tools (G.E.T.)',
          desc: 'Wear-resistant alloy bucket teeth, side cutters, adapters, and grader cutting edges.',
        },
        {
          title: 'Electronic Controllers & Engine Sensors',
          desc: 'Electronic Control Modules (ECMs), wiring harnesses, pressure transducers, and temperature sensors.',
        },
        {
          title: 'Transmissions & Final Drives',
          desc: 'Planetary gear reducers, ZF transmissions, torque converters, and heavy differential sets.',
        },
      ];

  const valuePillars = isAr
    ? [
        {
          title: 'الفهرسة بالرقم الأصلي OEM',
          desc: 'إمكانية البحث الدقيق برقم القطعة القياسي لضمان التوافق التام ومنع أخطاء الشراء والتوريد.',
        },
        {
          title: 'تحديد دقيق لحالة القطعة',
          desc: 'تصنيف واضح وموثق: قطع أصلية جديدة، قطع مستعملة مفحوصة، أو قطع مجددة ومكفولة.',
        },
        {
          title: 'حالة التوفر اللحظية',
          desc: 'متابعة ما إذا كانت القطعة متوفرة في رفوف المتجر، بكمية محدودة، أو تحتاج طلباً مسبقاً.',
        },
        {
          title: 'الربط بالمتاجر في المدن الصناعية',
          desc: 'استكشاف المحلات المعتمدة في السنك والشيخ عمر في بغداد، المنطقة الصناعية في البصرة، وأربيل.',
        },
      ]
    : [
        {
          title: 'Indexed by Genuine OEM Code',
          desc: 'Precision search by manufacturer part number ensuring 100% mechanical compatibility without guesswork.',
        },
        {
          title: 'Certified Component Condition',
          desc: 'Transparent condition indicators: factory new OEM, verified pre-owned, or certified remanufactured.',
        },
        {
          title: 'Live Stock Availability',
          desc: 'Clear indicators whether parts are in-stock on shelves, limited stock, or available by pre-order.',
        },
        {
          title: 'Industrial District Reach',
          desc: 'Connecting with vetted merchants across Baghdad (Al-Sinak, Sheikh Omar), Basra industrial zone, and Erbil.',
        },
      ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.partsService} alt="Heavy Equipment Spare Parts" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Cog className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الثالثة في HEAVY DUTY' : 'CORE SERVICE 03'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'سوق قطع الغيار والمكونات الهندسية' : 'Heavy Equipment Spare Parts Marketplace'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'دليل وسوق رقمي موحد لمتاجر ووكلاء قطع غيار الآليات الثقيلة، مفهرس برقم OEM والموديلات المتوافقة لتقليص فترات تعطل الآليات.'
              : 'A unified digital catalogue linking heavy machinery spare parts stores and importers, indexed by genuine OEM codes to eliminate costly machine downtime.'}
          </p>
        </div>
      </section>

      {/* OEM Precision & Technical Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {isAr ? 'دقة البحث وسرعة التوريد' : 'OEM COMPATIBILITY & PRECISION'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isAr
                ? 'العثور على القطعة الصحيحة بأسرع وقت وأقل جهد'
                : 'Locate the exact OEM component quickly without jobsite delays'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'يعاني مهندسو ومقاولو المشاريع في العراق من صعوبة البحث عن قطع الغيار النادرة أو التحقق من مطابقتها الحقيقية لموديل الحفارة أو اللودر. يحل تطبيق HEAVY DUTY هذه المعضلة من خلال الفهرسة الرقمية بأرقام القطع والماركات العالمية مثل CAT، Komatsu، Bosch Rexroth، Cummins، و Donaldson.'
                : 'Contractors and heavy fleet managers face substantial hurdles locating specialized parts or verifying exact cross-compatibility. HEAVY DUTY solves this through structured indexing by part number and manufacturer brand, linking jobsites directly with verified inventory.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {valuePillars.map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{v.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
              <img src={IMAGES.partsService} alt="Precision spare parts" className="w-full h-80 object-cover" />
              <div className="p-6 space-y-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'البحث والتواصل اللحظي عبر التطبيق' : 'Live Part Inquiries in Mobile App'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'يستعرض المستخدمون قوائم قطع الغيار، يتحققون من توفرها في المستودعات، ويتواصلون مباشرة مع أصحاب المتاجر عبر الهاتف والواتساب داخل التطبيق.'
                    : 'Users inspect detailed product photos, check real-time store stock availability, and connect directly with store owners via telephone and WhatsApp inside the application.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spare Parts Classifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {isAr ? 'تصنيفات المكونات الهندسية' : 'SPARE PARTS TAXONOMY'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'شامل لكافة الأنظمة الهيدروليكية والميكانيكية والكهربائية' : 'Complete coverage of hydraulic, powertrain, and electronic assemblies'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partCategories.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{cat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 max-w-2xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            {isAr ? 'هل تدير متجر قطع غيار أو توزع مكونات أصلية؟' : 'Operating a spare parts store or importing components?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {isAr
              ? 'انضم كمتجر معتمد لتحويل مخزونك الورقي إلى كتالوج رقمي مرئي للآلاف من مقاولي المشاريع.'
              : 'Join as an accredited parts merchant to digitize your inventory and connect with active buyers.'}
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
              {isAr ? 'بوابة متاجر قطع الغيار' : 'Parts Stores Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
