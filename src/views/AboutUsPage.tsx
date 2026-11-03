import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../assets/images';
import {
  ShieldCheck,
  Target,
  Compass,
  Cpu,
  Layers,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Globe2
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const values = isAr
    ? [
        {
          title: 'الموثوقية والشفافية (Reliability)',
          desc: 'الالتزام ببيانات حقيقية للمعدات وساعات التشغيل الفعلية وفهرسة مطابقة للمواصفات دون تضليل.',
        },
        {
          title: 'الدقة الهندسية (Technical Rigor)',
          desc: 'الاعتماد على المعايير الهندسية المعترف بها دولياً في تصنيف الآليات، أرقام قطع OEM، وفحوصات الصيانة.',
        },
        {
          title: 'النزاهة وتمكين الأطراف (Integrity)',
          desc: 'بيئة عادلة تضمن حق المقاول، المالك الفردي، والشركات الكبرى دون تحيز أو احتكار.',
        },
        {
          title: 'السلامة والاستدامة الميدانية (Jobsite Safety)',
          desc: 'دعم اشتراطات السلامة المهنية وتوفير المشغلين المعتمدين لحماية الأرواح والآليات في مواقع العمل.',
        },
      ]
    : [
        {
          title: 'Reliability & Transparency',
          desc: 'Unyielding commitment to verified machine data, genuine operating hours, and standard specs without distortion.',
        },
        {
          title: 'Technical Rigor',
          desc: 'Adherence to internationally recognized engineering standards in machine taxonomy, OEM part codes, and diagnostic protocols.',
        },
        {
          title: 'Integrity & Neutrality',
          desc: 'A fair, open environment serving contractors, individual machine owners, and corporate dealers without favoritism.',
        },
        {
          title: 'Jobsite Safety & Longevity',
          desc: 'Prioritizing occupational safety, certified operator deployment, and preventive maintenance to protect personnel and capital.',
        },
      ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.hero} alt="HEAVY DUTY Corporate" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            <Compass className="w-4 h-4" />
            <span>{isAr ? 'عن HEAVY DUTY' : 'CORPORATE PROFILE'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'البنية التحتية الرقمية لقطاع المعدات الثقيلة' : 'Powering the Heavy Equipment Industry'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'تأسست فكرة HEAVY DUTY لتكون المنصة التكنولوجية الرائدة التي توحد وتطور سلاسل الإمداد والتشغيل للمعدات الثقيلة في العراق والمنطقة.'
              : 'Conceived as the leading industrial technology platform unifying and modernizing heavy machinery supply chains, rentals, and engineering services across Iraq and the Arab region.'}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
              {isAr ? 'رؤيتنا' : 'OUR VISION'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              {isAr
                ? 'بناء منظومة رقمية متصلة تبسط وتسهل الوصول إلى الآليات الثقيلة والخدمات الصناعية في كافة أرجاء المنطقة.'
                : 'To build a connected digital ecosystem that simplifies access to heavy equipment and industrial services across the region.'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'نتطلع إلى مستقبل تكون فيه عمليات طلب الآليات، توفير قطع الغيار، وجدولة الصيانة الميدانية مؤتمتة وسريعة بدقة متناهية تخلو من التعقيد التقليدي.'
                : 'We envision an industrial future where mobilizing machinery, sourcing verified OEM components, and dispatching field technicians are streamlined through intuitive digital systems.'}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Compass className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              {isAr ? 'رسالتنا' : 'OUR MISSION'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-balance">
              {isAr
                ? 'الربط الموثوق بين العملاء، ملاك المعدات، الوكلاء، موردي قطع الغيار، ومهندسي الصيانة عبر منصة رقمية واحدة سهلة الاستخدام.'
                : 'To connect customers, equipment owners, dealers, spare parts providers, and maintenance professionals through one accessible digital platform.'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'تمكين الشركات والمقاولين في العراق من التركيز على إنجاز مشاريعهم دون القلق بشأن توفر المعدات أو جودة صيانتها وقطع غيارها.'
                : 'Empowering civil builders and industrial enterprises to focus on on-time project execution with complete peace of mind regarding fleet readiness.'}
            </p>
          </div>
        </div>
      </section>

      {/* The Industrial Problem We Solve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
              {isAr ? 'لماذا أنشئت المنصة؟' : 'THE INDUSTRIAL CHALLENGE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {isAr
                ? 'معالجة التشتت في سوق الآليات الثقيلة والحد من خسائر التوقف'
                : 'Overcoming market fragmentation and eliminating costly jobsite downtime'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'يعتمد قطاع الآليات الإنشائية تقليدياً على الاتصالات الشخصية والوسطاء غير الموثوقين، مما يؤدي إلى صعوبة إيجاد المعدات المطلوبة في الوقت المناسب، وتأخر وصول قطع الغيار، وارتفاع تكاليف الشحن العشوائي. جاءت HEAVY DUTY لتضع معياراً تكنولوجياً جديداً يجمع كافة هذه الأطراف في سوق رقمي ذكي.'
                : 'Historically, heavy machinery mobilization relied on fragmented phone networks, informal brokers, and opaque pricing. This resulted in unexpected jobsite delays, incorrect part procurement, and excessive logistics costs. HEAVY DUTY establishes a transparent, organized digital baseline unifying the sector.'}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-widest">
            {isAr ? 'قيمنا الجوهرية' : 'CORE VALUES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            {isAr ? 'مبادئ هندسية وأخلاقية تحكم كل تفاعل' : 'Engineering principles and corporate integrity in every interaction'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Iraq Initial Focus & Regional Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>{isAr ? 'النطاق الجغرافي والرؤية المستقبلية' : 'GEOGRAPHIC SCOPE & REGIONAL EXPANSION'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              {isAr
                ? 'انطلاقة مركزة من العراق نحو عموم المنطقة العربية'
                : 'Beginning in Iraq with a scalable Arab regional roadmap'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'نركز في المرحلة الحالية على تلبية الاحتياجات المتنامية لقطاع الإعمار والمشاريع في المحافظات العراقية الـ 18، مستندين إلى بنية برمجية تدعم التوسع الإقليمي المستقبلي نحو الأسواق العربية المجاورة.'
                : 'Our initial deployment focuses on the expanding infrastructure and reconstruction demands across Iraq’s 18 governorates, supported by scalable multi-currency and multilingual infrastructure prepared for regional growth.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/services/rental')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer whitespace-nowrap"
          >
            {isAr ? 'استكشف منظومة الخدمات' : 'Explore Platform Services'}
          </button>
        </div>
      </section>
    </div>
  );
};
