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
    <div className="space-y-16 sm:space-y-20 pb-16 w-full max-w-full overflow-x-hidden">
      {/* Bright Corporate Header Banner */}
      <section className="bg-[#FFFFFF] border-b border-[#E2E5E8] py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono font-bold text-[#D69A25] uppercase tracking-widest block">
            {isAr ? 'دليل الاستخدام' : 'USER GUIDE & WORKFLOWS'}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black font-heading text-[#20252B] text-balance">
            {isAr ? 'كيف تعمل منظومة HEAVY DUTY؟' : 'How HEAVY DUTY Works'}
          </h1>
          <p className="text-xs sm:text-base text-[#303943] max-w-2xl leading-relaxed">
            {isAr
              ? 'صُممت تجربة الاستخدام لتكون واضحة وبسيطة تلائم كافة فئات المستخدمين: المقاولين، الملاك الأفراد، وممثلي الشركات والمعارض.'
              : 'Engineered for operational clarity and speed, tailored specifically to contractors, individual machine owners, and corporate dealerships.'}
          </p>
        </div>
      </section>

      {/* Segmented Persona Switcher - Mobile Responsive without overflow */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto flex flex-col xs:flex-row items-stretch justify-center gap-1.5 p-1.5 bg-[#EAECEE] rounded-2xl mb-10 sm:mb-14">
          <button
            onClick={() => setActiveGroup('customers')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center ${
              activeGroup === 'customers'
                ? 'bg-[#FFFFFF] text-[#20252B] shadow-2xs'
                : 'text-[#303943] hover:text-[#20252B]'
            }`}
          >
            {isAr ? 'المقاولون والزبائن' : 'Contractors & Clients'}
          </button>
          <button
            onClick={() => setActiveGroup('owners')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center ${
              activeGroup === 'owners'
                ? 'bg-[#FFFFFF] text-[#20252B] shadow-2xs'
                : 'text-[#303943] hover:text-[#20252B]'
            }`}
          >
            {isAr ? 'ملاك الآليات الفرديون' : 'Equipment Owners'}
          </button>
          <button
            onClick={() => setActiveGroup('businesses')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center ${
              activeGroup === 'businesses'
                ? 'bg-[#FFFFFF] text-[#20252B] shadow-2xs'
                : 'text-[#303943] hover:text-[#20252B]'
            }`}
          >
            {isAr ? 'الشركات والوكالات' : 'Businesses & Dealers'}
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {currentSteps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs space-y-3 sm:space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#D69A25]">
                    {st.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#F5F6F7] text-[#303943]">
                    <Icon className="w-5 h-5 text-[#D69A25]" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#20252B] font-heading">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#303943] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clear Distinction Note */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E5E8] shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-3 rounded-2xl bg-[#D69A25]/10 text-[#D69A25] shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#20252B] font-heading">
                {isAr ? 'تنويه: العمليات التفاعلية تجري داخل التطبيق' : 'Important: All Operations Take Place Inside the App'}
              </h4>
              <p className="text-xs text-[#303943] mt-0.5">
                {isAr
                  ? 'هذا الموقع مخصص للتعريف الرسمي والترويج للمنصة. النشر والحجز والتواصل المباشر تتم عبر تطبيق الهاتف الذكي فور إطلاقه.'
                  : 'This website is the official corporate and promotional portal. All listing management, reservations, and chat take place inside the mobile application.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/download')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#303943] hover:bg-[#20252B] text-white font-bold text-xs cursor-pointer text-center whitespace-nowrap"
          >
            {isAr ? 'استكشف صفحة التطبيق' : 'Explore App Page'}
          </button>
        </div>
      </section>
    </div>
  );
};
