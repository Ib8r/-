import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'اللوائح والسياسات' : 'LEGAL & PRIVACY'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading">
            {isAr ? 'سياسة الخصوصية وسرية البيانات' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {isAr ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '1. التزام HEAVY DUTY بالخصوصية' : '1. Corporate Privacy Commitment'}
            </h2>
            <p>
              {isAr
                ? 'تلتزم منصة HEAVY DUTY بحماية خصوصية كافة المستخدمين والشركاء والمقاولين وملاك الآليات. توضح هذه الوثيقة طبيعة المعلومات التي يتم جمعها وكيفية معالجتها لغرض تقديم خدمات الربط الصناعي والتأجير والشراء وقطع الغيار والصيانة.'
                : 'HEAVY DUTY is committed to safeguarding the privacy of all contractors, machinery owners, dealerships, and industrial partners. This policy outlines our standards regarding data collection and verified service coordination.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '2. البيانات التي نجمعها' : '2. Information We Collect'}
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-600 ps-2">
              <li>{isAr ? 'معلومات الاتصال: الاسم، رقم الهاتف، البريد الإلكتروني، واسم المنشأة التجارية.' : 'Contact identifiers: Name, corporate phone number, corporate email, and entity credentials.'}</li>
              <li>{isAr ? 'بيانات الآليات والمعدات: الصور الحية، سنة الصنع، الموديل، ساعات التشغيل، وسجلات الفحص.' : 'Machinery attributes: Model specs, manufacture year, operating hour logs, and inspection sheets.'}</li>
              <li>{isAr ? 'الموقع الجغرافي: المحافظة والمدينة لغرض تصفية نتائج البحث وتنسيق النقل الميداني.' : 'Geographic coordinates: Governorate and municipality for localized machinery discovery.'}</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '3. استخدام وحماية البيانات' : '3. Purpose of Processing & Security'}
            </h2>
            <p>
              {isAr
                ? 'تُستخدم البيانات حصرياً لتسهيل الاتصال والربط الميداني بين أطراف العملية التعاقدية. المنصة لا تبيع أو تتاجر ببيانات المستخدمين لأي أطراف إعلانية خارجية.'
                : 'Data is strictly utilized to facilitate verified industrial transactions and equipment mobilization. HEAVY DUTY never sells or brokers user information to third-party advertising networks.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {isAr ? '4. تواصل معنا حول الخصوصية' : '4. Privacy Inquiries'}
            </h2>
            <p>
              {isAr
                ? 'لأي استفسارات حول سياسة الخصوصية أو لتحديث بياناتكم المسجلة، يرجى مراسلة فريق الامتثال على: '
                : 'For inquiries regarding data retention or profile updates, contact our legal team at: '}
              <strong className="font-mono text-slate-900">corporate@heavyduty-marketplace.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
