import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Building2,
  CheckCircle2,
  Truck,
  Tag,
  Cog,
  Wrench,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Send,
  AlertCircle
} from 'lucide-react';

export const ForBusinessesPage: React.FC = () => {
  const { t, locale, dir } = useLanguage();
  const isAr = locale === 'ar';
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    type: 'rental',
    governorate: 'بغداد',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      setErrorMsg(isAr ? 'يرجى ملء جميع الحقول الإلزامية المطلوبة.' : 'Please fill in all mandatory required fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const businessPillars = [
    {
      id: 'rental',
      data: t.forBusinessesPage.segments.rental,
      icon: Truck,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'dealers',
      data: t.forBusinessesPage.segments.dealers,
      icon: Tag,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'parts',
      data: t.forBusinessesPage.segments.parts,
      icon: Cog,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'maintenance',
      data: t.forBusinessesPage.segments.maintenance,
      icon: Wrench,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            {t.forBusinessesPage.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-balance">
            {t.forBusinessesPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.forBusinessesPage.subtitle}
          </p>
        </div>
      </section>

      {/* 4 Business Segments Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businessPillars.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.id}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${seg.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {seg.data.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {seg.data.desc}
                  </p>

                  <div className="pt-2 space-y-2.5 border-t border-slate-100">
                    {seg.data.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partner Registration Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {t.forBusinessesPage.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.forBusinessesPage.formSubtitle}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {isAr ? 'تم استلام بيانات طلب الشراكة بنجاح' : 'Partnership Application Received'}
              </h4>
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                {isAr
                  ? 'شكراً لاهتمامكم بالانضمام إلى منظومة HEAVY DUTY. سيقوم مسؤول علاقات الشركات بالتواصل معكم فور بدء استقبال الشركاء الميدانيين.'
                  : 'Thank you for your interest in joining HEAVY DUTY. Our corporate partnership team will contact you directly to finalize your verified company registration.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-amber-700 underline cursor-pointer pt-2"
              >
                {isAr ? 'إرسال طلب جديد' : 'Submit another request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={isAr ? 'مثال: م. علي الجبوري' : 'e.g. John Doe'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formCompany} *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={isAr ? 'مثال: شركة الرافدين للمعدات الثقيلة' : 'e.g. Atlas Equipment Co.'}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formType}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="rental">{t.forBusinessesPage.segments.rental.title}</option>
                    <option value="dealers">{t.forBusinessesPage.segments.dealers.title}</option>
                    <option value="parts">{t.forBusinessesPage.segments.parts.title}</option>
                    <option value="maintenance">{t.forBusinessesPage.segments.maintenance.title}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formGovernorate}
                  </label>
                  <input
                    type="text"
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={isAr ? 'بغداد، البصرة، أربيل...' : 'Baghdad, Basra, Erbil...'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formPhone} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+964 780 XXXXXXX"
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.forBusinessesPage.formEmail} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="partner@company.com"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.forBusinessesPage.formMessage}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Technical Integration Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                <strong>{t.contactPage.form.noticeTitle}</strong> {t.contactPage.form.noticeDesc}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                {t.forBusinessesPage.formSubmit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
