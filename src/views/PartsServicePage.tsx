import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES, FALLBACK_IMAGES } from '../assets/images';
import { IndustrialImage } from '../components/common/IndustrialImage';
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
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] py-12 sm:py-20 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D69A25]/10 dark:bg-[#D69A25]/20 border border-[#D69A25]/30 text-[#D69A25] text-xs font-mono font-bold">
            <Cog className="w-4 h-4" />
            <span>{isAr ? 'الخدمة الثالثة في HEAVY DUTY' : 'CORE SERVICE 03'}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] dark:text-[#F5F6F7] text-balance">
            {isAr ? 'سوق قطع الغيار والمكونات الهندسية' : 'Heavy Equipment Spare Parts Marketplace'}
          </h1>

          <p className="text-xs sm:text-base text-[#303943] dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
            {isAr
              ? 'دليل وسوق رقمي موحد لمتاجر ووكلاء قطع غيار الآليات الثقيلة، مفهرس برقم OEM والموديلات المتوافقة لتقليص فترات تعطل الآليات.'
              : 'A unified digital catalogue linking heavy machinery spare parts stores and importers, indexed by genuine OEM codes to eliminate costly machine downtime.'}
          </p>
        </div>
      </section>

      {/* OEM Precision & Technical Standards */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
              {isAr ? 'دقة البحث وسرعة التوريد' : 'OEM COMPATIBILITY & PRECISION'}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr
                ? 'العثور على القطعة الصحيحة بأسرع وقت وأقل جهد'
                : 'Locate the exact OEM component quickly without jobsite delays'}
            </h2>
            <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
              {isAr
                ? 'يعاني مهندسو ومقاولو المشاريع في العراق من صعوبة البحث عن قطع الغيار النادرة أو التحقق من مطابقتها الحقيقية لموديل الحفارة أو اللودر. يحل تطبيق HEAVY DUTY هذه المعضلة من خلال الفهرسة الرقمية بأرقام القطع والماركات العالمية مثل CAT، Komatsu، Bosch Rexroth، Cummins، و Donaldson.'
                : 'Contractors and heavy fleet managers face substantial hurdles locating specialized parts or verifying exact cross-compatibility. HEAVY DUTY solves this through structured indexing by part number and manufacturer brand, linking jobsites directly with verified inventory.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {valuePillars.map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-1 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">{v.title}</h4>
                  <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl overflow-hidden border border-[#E2E5E8] dark:border-[#3E4956] shadow-sm bg-[#FFFFFF] dark:bg-[#2B333D]">
              <div className="h-56 sm:h-72 w-full">
                <IndustrialImage
                  src={IMAGES.partsService}
                  fallbackSrc={FALLBACK_IMAGES.partsService}
                  alt="Precision spare parts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2 bg-[#F5F6F7] dark:bg-[#20252B] border-t border-[#E2E5E8] dark:border-[#3E4956]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D69A25]">
                  <Smartphone className="w-4 h-4" />
                  <span>{isAr ? 'البحث والتواصل اللحظي عبر التطبيق' : 'Live Part Inquiries in Mobile App'}</span>
                </div>
                <p className="text-xs text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
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
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-[#D69A25] uppercase tracking-widest">
            {isAr ? 'تصنيفات المكونات الهندسية' : 'SPARE PARTS TAXONOMY'}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'شامل لكافة الأنظمة الهيدروليكية والميكانيكية والكهربائية' : 'Complete coverage of hydraulic, powertrain, and electronic assemblies'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {partCategories.map((cat, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-2xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#D69A25]/10 dark:bg-[#D69A25]/20 text-[#D69A25] flex items-center justify-center font-bold">
                <Package className="w-5 h-5 text-[#D69A25]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">{cat.title}</h3>
              <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] space-y-3 sm:space-y-4 max-w-2xl mx-auto shadow-2xs">
          <h3 className="text-lg sm:text-xl font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'هل تدير متجر قطع غيار أو توزع مكونات أصلية؟' : 'Operating a spare parts store or importing components?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1]">
            {isAr
              ? 'انضم كمتجر معتمد لتحويل مخزونك الورقي إلى كتالوج رقمي مرئي للآلاف من مقاولي المشاريع.'
              : 'Join as an accredited parts merchant to digitize your inventory and connect with active buyers.'}
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
              className="px-5 py-2.5 rounded-xl bg-[#303943] dark:bg-[#20252B] hover:bg-[#20252B] text-white text-xs font-bold cursor-pointer border border-transparent dark:border-[#3E4956]"
            >
              {isAr ? 'بوابة متاجر قطع الغيار' : 'Parts Stores Portal'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
