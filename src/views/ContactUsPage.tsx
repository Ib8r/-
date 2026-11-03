import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  AlertCircle,
  CheckCircle2,
  Building2,
  ShieldAlert
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { t, locale } = useLanguage();
  const isAr = locale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [validationError, setValidationError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError(t.contactPage.form.validationRequired);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setValidationError(t.contactPage.form.validationEmail);
      return;
    }

    setValidationError('');
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            {t.contactPage.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {t.contactPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Grid: Form + Corporate Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              {isAr ? 'نموذج المراسلة الرسمي' : 'Official Message Form'}
            </h2>

            {/* Honest Technical Integration Notice (Zero Fake Backend Claim) */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-700 space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.contactPage.form.noticeTitle}</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-600">
                {t.contactPage.form.noticeDesc}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  {isAr ? 'تم التحقق من بيانات النموذج بنجاح' : 'Form Validated Successfully'}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {isAr
                    ? 'تم فحص وتدقيق كافة المدخلات بنجاح. بمجرد ربط خادم البريد الفعلي للإنتاج (SMTP أو API)، سيتم تسليم هذه الرسائل فورياً إلى صندوق الوارد.'
                    : 'All input parameters have been validated on the client side. Once production SMTP or API endpoints are configured, messages will be delivered directly.'}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-amber-700 underline cursor-pointer pt-2"
                >
                  {isAr ? 'إعادة إرسال نموذج جديد' : 'Submit another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationError && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contactPage.form.fullName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={isAr ? 'الاسم الثلاثي' : 'Full Name'}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contactPage.form.email} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="name@domain.com"
                      dir="ltr"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contactPage.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+964 780 XXXXXXX"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contactPage.form.subject}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="general">{t.contactPage.form.subjectOptions.general}</option>
                    <option value="businessPartner">{t.contactPage.form.subjectOptions.businessPartner}</option>
                    <option value="technicalSupport">{t.contactPage.form.subjectOptions.technicalSupport}</option>
                    <option value="equipmentListing">{t.contactPage.form.subjectOptions.equipmentListing}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contactPage.form.message} *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={t.contactPage.form.message}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contactPage.form.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Corporate Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xs">
              <h3 className="text-xl font-bold font-heading text-amber-400">
                {isAr ? 'بيانات المراسلة المعتمدة' : 'Official Channels'}
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block">
                    {t.contactPage.info.officeTitle}
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {t.contactPage.info.officeValue}
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block">
                    {t.contactPage.info.emailTitle}
                  </span>
                  <p className="text-sm font-semibold text-white" dir="ltr">
                    {t.contactPage.info.emailValue}
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block">
                    {t.contactPage.info.coverageTitle}
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {t.contactPage.info.coverageValue}
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block">
                    {t.contactPage.info.workingHoursTitle}
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {t.contactPage.info.workingHoursValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Market Disclosure */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>{isAr ? 'ضمان الخصوصية والتعامل المؤسسي' : 'Privacy & Corporate Disclosures'}</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {isAr
                  ? 'تُعامل كافة المراسلات والبيانات التجارية للشركات وسجلات الأساطيل بسرية تامة وتُستخدم حصرياً لتنسيق الخدمات والشراكات الرسمية.'
                  : 'All corporate inquiries and fleet records are treated with strict confidentiality and utilized exclusively for verified service coordination.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
