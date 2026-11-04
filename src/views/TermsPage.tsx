import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#D69A25] bg-[#D69A25]/10 dark:bg-[#D69A25]/20 border border-[#D69A25]/20 uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>{isAr ? 'اللوائح والسياسات' : 'LEGAL & TERMS'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'الشروط والأحكام العامة للمنصة' : 'Terms & Conditions of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-[#303943]/80 dark:text-[#CBD5E1]">
            {isAr ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-xs space-y-8 text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '1. شروط الاستخدام والأهلية' : '1. Eligibility & Scope'}
            </h2>
            <p>
              {isAr
                ? 'تنظم هذه الشروط استخدام الموقع الإلكتروني وتطبيق الهاتف الذكي لمنصة HEAVY DUTY. باستخدامك للمنصة، فإنك تقر بأهليتك القانونية والمهنية لتمثيل نفسك أو شركتك في إبرام تعاقدات تأجير أو بيع أو شراء المعدات والخدمات الهندسية.'
                : 'These terms govern the use of the HEAVY DUTY website and forthcoming mobile application. By accessing our platform, you certify professional capacity to represent contracting entities or machinery ownership.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '2. طبيعة دور المنصة كصلة وصل تقنية' : '2. Intermediary & Technology Role'}
            </h2>
            <p>
              {isAr
                ? 'تعمل HEAVY DUTY كبنية تحتية تكنولوجية وسوق رقمي يربط بين الملاك ومقاولي البناء ومزودي قطع الغيار ومراكز الصيانة. لا تعتبر المنصة مالكة للآليات المعروضة ولا طرفاً في عقود الإيجار الميدانية المنفذة بين الأطراف، ويقع على عاتق المستأجر والمؤجر فحص الآلية وتوثيق التعاقد المالي.'
                : 'HEAVY DUTY acts as an industrial technology marketplace connecting verified equipment owners, contractors, dealers, and maintenance shops. Independent contracts for machine rental, logistics, and parts purchases are executed directly between the respective counterparties.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '3. دقة بيانات المعدات وساعات التشغيل' : '3. Spec Accuracy & Truth in Advertising'}
            </h2>
            <p>
              {isAr
                ? 'يلتزم كل بائع أو مؤجر بإدراج بيانات فنية صحيحة لساعات العمل الفعلية وحالة الماكينة وخلوها من النزاعات الجمركية أو المرورية. يحق للمنصة تجميد أي حساب يخالف معايير النزاهة الهندسية.'
                : 'All participating dealers and owners are strictly bound to represent accurate operating hours, mechanical condition, and clear title. HEAVY DUTY reserves the right to suspend any account violating engineering verification standards.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '4. القانون الحاكم وحل النزاعات' : '4. Governing Jurisdiction'}
            </h2>
            <p>
              {isAr
                ? 'تخضع هذه الاتفاقية وتفسر وفقاً للقوانين والأنظمة المعمول بها في جمهورية العراق، وتختص محاكم بغداد بالنظر في أي نزاع قد ينشأ عن تفسير بنود هذه الشروط.'
                : 'These terms are governed in accordance with the applicable laws of the Republic of Iraq, with exclusive jurisdiction resting in the competent commercial courts of Baghdad.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
