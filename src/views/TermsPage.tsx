import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>{isAr ? 'اللوائح والسياسات' : 'LEGAL & TERMS'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading">
            {isAr ? 'الشروط والأحكام العامة للمنصة' : 'Terms & Conditions of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {isAr ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '1. شروط الاستخدام والأهلية' : '1. Eligibility & Scope'}
            </h2>
            <p>
              {isAr
                ? 'تنظم هذه الشروط استخدام الموقع الإلكتروني وتطبيق الهاتف الذكي لمنصة HEAVY DUTY. باستخدامك للمنصة، فإنك تقر بأهليتك القانونية والمهنية لتمثيل نفسك أو شركتك في إبرام تعاقدات تأجير أو بيع أو شراء المعدات والخدمات الهندسية.'
                : 'These terms govern the use of the HEAVY DUTY website and forthcoming mobile application. By accessing our platform, you certify professional capacity to represent contracting entities or machinery ownership.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '2. طبيعة دور المنصة كصلة وصل تقنية' : '2. Intermediary & Technology Role'}
            </h2>
            <p>
              {isAr
                ? 'تعمل HEAVY DUTY كبنية تحتية تكنولوجية وسوق رقمي يربط بين الملاك ومقاولي البناء ومزودي قطع الغيار ومراكز الصيانة. لا تعتبر المنصة مالكة للآليات المعروضة ولا طرفاً في عقود الإيجار الميدانية المنفذة بين الأطراف، ويقع على عاتق المستأجر والمؤجر فحص الآلية وتوثيق التعاقد المالي.'
                : 'HEAVY DUTY acts as an industrial technology marketplace connecting verified equipment owners, contractors, dealers, and maintenance shops. Independent contracts for machine rental, logistics, and parts purchases are executed directly between the respective counterparties.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '3. دقة بيانات المعدات وساعات التشغيل' : '3. Spec Accuracy & Truth in Advertising'}
            </h2>
            <p>
              {isAr
                ? 'يلتزم كل بائع أو مؤجر بإدراج بيانات فنية صحيحة لساعات العمل الفعلية وحالة الماكينة وخلوها من النزاعات الجمركية أو المرورية. يحق للمنصة تجميد أي حساب يخالف معايير النزاهة الهندسية.'
                : 'All participating dealers and owners are strictly bound to represent accurate operating hours, mechanical condition, and clear title. HEAVY DUTY reserves the right to suspend any account violating engineering verification standards.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
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
