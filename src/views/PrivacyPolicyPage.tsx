import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#FFFFFF] dark:bg-[#20252B] border-b border-[#E2E5E8] dark:border-[#3E4956] py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#D69A25] bg-[#D69A25]/10 dark:bg-[#D69A25]/20 border border-[#D69A25]/20 uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'اللوائح والسياسات' : 'LEGAL & PRIVACY'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {isAr ? 'سياسة الخصوصية وسرية البيانات' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-[#303943]/80 dark:text-[#CBD5E1]">
            {isAr ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#2B333D] border border-[#E2E5E8] dark:border-[#3E4956] shadow-xs space-y-8 text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '1. التزام HEAVY DUTY بالخصوصية' : '1. Corporate Privacy Commitment'}
            </h2>
            <p>
              {isAr
                ? 'تلتزم منصة HEAVY DUTY بحماية خصوصية كافة المستخدمين والشركاء والمقاولين وملاك الآليات. توضح هذه الوثيقة طبيعة المعلومات التي يتم جمعها وكيفية معالجتها لغرض تقديم خدمات الربط الصناعي والتأجير والشراء وقطع الغيار والصيانة.'
                : 'HEAVY DUTY is committed to safeguarding the privacy of all contractors, machinery owners, dealerships, and industrial partners. This policy outlines our standards regarding data collection and verified service coordination.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '2. البيانات التي نجمعها' : '2. Information We Collect'}
            </h2>
            <ul className="space-y-2 list-disc list-inside text-[#303943] dark:text-[#CBD5E1] ps-2">
              <li>{isAr ? 'معلومات الاتصال: الاسم، رقم الهاتف، البريد الإلكتروني، واسم المنشأة التجارية.' : 'Contact identifiers: Name, corporate phone number, corporate email, and entity credentials.'}</li>
              <li>{isAr ? 'بيانات الآليات والمعدات: الصور الحية، سنة الصنع، الموديل، ساعات التشغيل، وسجلات الفحص.' : 'Machinery attributes: Model specs, manufacture year, operating hour logs, and inspection sheets.'}</li>
              <li>{isAr ? 'الموقع الجغرافي: المحافظة والمدينة لغرض تصفية نتائج البحث وتنسيق النقل الميداني.' : 'Geographic coordinates: Governorate and municipality for localized machinery discovery.'}</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '3. استخدام وحماية البيانات' : '3. Purpose of Processing & Security'}
            </h2>
            <p>
              {isAr
                ? 'تُستخدم البيانات حصرياً لتسهيل الاتصال والربط الميداني بين أطراف العملية التعاقدية. المنصة لا تبيع أو تتاجر ببيانات المستخدمين لأي أطراف إعلانية خارجية.'
                : 'Data is strictly utilized to facilitate verified industrial transactions and equipment mobilization. HEAVY DUTY never sells or brokers user information to third-party advertising networks.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E2E5E8] dark:border-[#3E4956] pt-6">
            <h2 className="text-base sm:text-lg font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
              {isAr ? '4. تواصل معنا حول الخصوصية' : '4. Privacy Inquiries'}
            </h2>
            <p>
              {isAr
                ? 'لأي استفسارات حول سياسة الخصوصية أو لتحديث بياناتكم المسجلة، يرجى مراسلة فريق الامتثال على: '
                : 'For inquiries regarding data retention or profile updates, contact our legal team at: '}
              <strong className="font-mono text-[#20252B] dark:text-[#D69A25]">corporate@heavyduty-marketplace.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
