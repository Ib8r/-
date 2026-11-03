import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import {
  Users,
  HardHat,
  Building2,
  Search,
  CheckCircle2,
  Calendar,
  Smartphone,
  Phone,
  FileText,
  Package,
  Wrench,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { locale, dir } = useLanguage();
  const { navigate } = useRouter();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const [activeGroup, setActiveGroup] = useState<'customers' | 'owners' | 'businesses'>('customers');

  const customerSteps = isAr
    ? [
        {
          num: '01',
          title: 'البحث والاستكشاف الذكي',
          desc: 'افتح التطبيق واختر بين خدمات التأجير أو شراء المعدات أو قطع الغيار أو الورش، مع تصفية دقيقة بحسب المحافظة والفئة الهندسية.',
          icon: Search,
        },
        {
          num: '02',
          title: 'مراجعة المواصفات والأسعار',
          desc: 'اطلع على بطاقة المعدة الشاملة: الصور الحية، ساعات التشغيل، الأسعار اليومية والشهرية بالدينار العراقي، وتوافر المشغل أو النقل.',
          icon: FileText,
        },
        {
          num: '03',
          title: 'التواصل وحجز الخدمة',
          desc: 'أرسل طلب استئجار فوري أو تواصل مباشرة بالهاتف والواتساب المعتمد للمزود لإنهاء التنسيق الموقعي.',
          icon: Phone,
        },
      ]
    : [
        {
          num: '01',
          title: 'Smart Discovery & Filtering',
          desc: 'Open the app and choose rental, equipment purchase, spare parts, or repair centers, filtering by governorate and machine category.',
          icon: Search,
        },
        {
          num: '02',
          title: 'Inspect Specs & Pricing',
          desc: 'Review comprehensive machine dossiers: live photos, verified operating hours, daily/monthly IQD pricing, and operator terms.',
          icon: FileText,
        },
        {
          num: '03',
          title: 'Direct Connection & Booking',
          desc: 'Submit a rental request or connect directly via telephone and WhatsApp with verified equipment owners.',
          icon: Phone,
        },
      ];

  const ownerSteps = isAr
    ? [
        {
          num: '01',
          title: 'إنشاء الحساب وملف المالك',
          desc: 'سجل حسابك كمالك معدات فردي في التطبيق، وحدد محافظتك وبيانات الاتصال والتوثيق.',
          icon: Users,
        },
        {
          num: '02',
          title: 'إدراج الآليات والمواصفات',
          desc: 'أضف صور آليتك، الموديل، سنة الصنع، أسعار التأجير اليومية والشهرية، وشروط العمل أو المشغل.',
          icon: Package,
        },
        {
          num: '03',
          title: 'إدارة الطلبات والتشغيل',
          desc: 'استقبل طلبات الاستئجار المباشرة من المقاولين وتابع حالة الحجوزات ونظم مواعيد الصيانة الدورية.',
          icon: Calendar,
        },
      ]
    : [
        {
          num: '01',
          title: 'Create Verified Owner Profile',
          desc: 'Register as an individual equipment owner in the mobile app, confirming your operating governorate and contact credentials.',
          icon: Users,
        },
        {
          num: '02',
          title: 'Publish Equipment Specifications',
          desc: 'Upload crisp photos, machine model, manufacture year, daily/monthly rates, and operator/transport availability.',
          icon: Package,
        },
        {
          num: '03',
          title: 'Manage Incoming Requests',
          desc: 'Receive direct contractor inquiries, confirm mobilization dates, and track recurring equipment utilization.',
          icon: Calendar,
        },
      ];

  const businessSteps = isAr
    ? [
        {
          num: '01',
          title: 'تأسيس ملف الأعمال المعتمد',
          desc: 'توثيق حساب شركتك، معرضك، متجرك، أو مركز الصيانة مع الشعار الرسمي والعناوين الميدانية.',
          icon: Building2,
        },
        {
          num: '02',
          title: 'نشر الأساطيل والكتالوجات',
          desc: 'نشر معروضات بيع وتأجير الآليات، أو فهرسة مخزون قطع الغيار بأرقام OEM، أو نشر منشورات الصيانة الفنية.',
          icon: Package,
        },
        {
          num: '03',
          title: 'استقبال استفسارات العقود والمشاريع',
          desc: 'التفاعل مع طلبات الشركات والمقاولين الكبرى وتوسيع المبيعات وحجم الأعمال في كافة المحافظات.',
          icon: Phone,
        },
      ]
    : [
        {
          num: '01',
          title: 'Establish Verified Business Profile',
          desc: 'Register your dealership, rental yard, spare parts shop, or maintenance center with verified credentials and branding.',
          icon: Building2,
        },
        {
          num: '02',
          title: 'Publish Fleets & Catalogues',
          desc: 'List machinery for sale/rent, index spare parts by OEM codes, or publish technical repair case studies and videos.',
          icon: Package,
        },
        {
          num: '03',
          title: 'Receive Project & Contract Inquiries',
          desc: 'Engage directly with commercial contractors and infrastructure developers seeking long-term fleet arrangements.',
          icon: Phone,
        },
      ];

  const currentSteps =
    activeGroup === 'customers'
      ? customerSteps
      : activeGroup === 'owners'
      ? ownerSteps
      : businessSteps;

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            {isAr ? 'دليل الاستخدام' : 'USER GUIDE & WORKFLOWS'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {isAr ? 'كيف تعمل منظومة HEAVY DUTY؟' : 'How HEAVY DUTY Works'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {isAr
              ? 'صُممت تجربة الاستخدام لتكون واضحة وبسيطة تلائم كافة فئات المستخدمين: المقاولين، الملاك الأفراد، وممثلي الشركات والمعارض.'
              : 'Engineered for operational clarity and speed, tailored specifically to contractors, individual machine owners, and corporate dealerships.'}
          </p>
        </div>
      </section>

      {/* Segmented Persona Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-xl mx-auto mb-16">
          <button
            onClick={() => setActiveGroup('customers')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeGroup === 'customers'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'المقاولون والزبائن' : 'Contractors & Clients'}
          </button>
          <button
            onClick={() => setActiveGroup('owners')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeGroup === 'owners'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'ملاك الآليات الفرديون' : 'Equipment Owners'}
          </button>
          <button
            onClick={() => setActiveGroup('businesses')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeGroup === 'businesses'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'الشركات والوكالات' : 'Businesses & Dealers'}
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentSteps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-amber-500">
                    {st.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clear Distinction Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500 text-slate-950">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {isAr ? 'تنويه: العمليات التفاعلية تجري داخل التطبيق' : 'Important: All Operations Take Place Inside the App'}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {isAr
                  ? 'هذا الموقع مخصص للتعريف الرسمي والترويج للمنصة. النشر والحجز والتواصل المباشر تتم عبر تطبيق الهاتف الذكي فور إطلاقه.'
                  : 'This website is the official corporate and promotional portal. All listing management, reservations, and chat take place inside the mobile application.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/download')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer whitespace-nowrap"
          >
            {isAr ? 'استكشف صفحة التطبيق' : 'Explore App Page'}
          </button>
        </div>
      </section>
    </div>
  );
};
