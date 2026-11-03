import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileText,
  Upload,
  Video,
  Wrench,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { IraqiGovernorate, MaintenanceSpecialty } from '../../types';

const SPECIALTY_OPTIONS: { id: MaintenanceSpecialty; label: string }[] = [
  { id: 'hydraulics', label: 'هيدروليك وبساتن ومضخات' },
  { id: 'diesel_engines', label: 'تجفيت وصيانة محركات الديزل' },
  { id: 'electrical', label: 'كهرباء وحساسات وكمبيوترات' },
  { id: 'mechanical', label: 'ميكانيك وتجميع وشاسيه' },
  { id: 'transmission', label: 'نواقل حركة وجيربوكس دبل' },
  { id: 'diagnostics', label: 'فحص كمبيوتر وتشخيص أعطال' },
  { id: 'mobile_field', label: 'طوارئ وصيانة ميدانية 24/7' },
  { id: 'general', label: 'صيانة شاملة وتجهيز مواقع' }
];

const IRAQI_GOVERNORATES: IraqiGovernorate[] = [
  'بغداد', 'البصرة', 'أربيل', 'نينوى', 'السليمانية', 'دهوك',
  'كركوك', 'الأنبار', 'النجف', 'كربلاء', 'بابل', 'ديالى',
  'واسط', 'ميسان', 'ذي قار', 'المثنى', 'القادسية', 'صلاح الدين'
];

export const CreateMaintenancePostModal: React.FC = () => {
  const {
    isCreatePostModalOpen,
    closeCreatePostModal,
    editingPost,
    createMaintenancePost,
    updateMaintenancePost,
    currentUser
  } = useApp();

  const [titleAr, setTitleAr] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [specialty, setSpecialty] = useState<MaintenanceSpecialty>('hydraulics');
  const [governorate, setGovernorate] = useState<IraqiGovernorate>('بغداد');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingPost) {
      setTitleAr(editingPost.titleAr);
      setContentAr(editingPost.contentAr);
      setSpecialty(editingPost.specialty);
      setGovernorate(editingPost.governorate);
      setCity(editingPost.city);
      setPhone(editingPost.phone);
      setImageUrl(editingPost.mediaUrls[0] || '');
      setVideoUrl(editingPost.videoUrl || '');
      setStatus(editingPost.status === 'draft' ? 'draft' : 'published');
    } else {
      setTitleAr('');
      setContentAr('');
      setSpecialty('hydraulics');
      setGovernorate(currentUser?.governorate || 'بغداد');
      setCity(currentUser?.city || 'الشيخ عمر الصناعية');
      setPhone(currentUser?.phone || '0771 234 5678');
      setImageUrl('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80');
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      setStatus('published');
    }
    setErrors({});
  }, [editingPost, isCreatePostModalOpen, currentUser]);

  if (!isCreatePostModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!titleAr.trim() || titleAr.trim().length < 5) {
      errs.titleAr = 'يرجى كتابة عنوان واضح ومفصل للمنشور (5 أحرف على الأقل).';
    }
    if (!contentAr.trim() || contentAr.trim().length < 15) {
      errs.contentAr = 'يرجى كتابة شرح وافٍ للخدمة أو الإنجاز الميكانيكي (15 حرفاً على الأقل).';
    }
    if (!city.trim()) {
      errs.city = 'يرجى إدخال اسم الحي أو المنطقة الصناعية.';
    }
    if (!phone.trim()) {
      errs.phone = 'يرجى إدخال رقم هاتف للتواصل.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mediaList = imageUrl.trim()
      ? [imageUrl.trim()]
      : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'];

    const centerName = currentUser?.companyName || currentUser?.fullName || 'مركز صيانة معتمد';

    if (editingPost) {
      updateMaintenancePost(editingPost.id, {
        titleAr: titleAr.trim(),
        contentAr: contentAr.trim(),
        specialty,
        governorate,
        city: city.trim(),
        phone: phone.trim(),
        mediaUrls: mediaList,
        videoUrl: videoUrl.trim() || undefined,
        status
      });
    } else {
      createMaintenancePost({
        centerId: currentUser?.id || 'workshop-demo',
        centerNameAr: centerName,
        governorate,
        city: city.trim(),
        phone: phone.trim(),
        specialty,
        titleAr: titleAr.trim(),
        contentAr: contentAr.trim(),
        mediaUrls: mediaList,
        videoUrl: videoUrl.trim() || undefined,
        status
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                {editingPost ? 'تعديل المنشور الترويجي للورشة' : 'نشر عرض أو إنجاز ميكانيكي جديد'}
              </h2>
              <p className="text-[11px] text-slate-400">
                يظهر المنشور في خلاصات مراكز الصيانة وعروض الورش المعتمدة في العراق
              </p>
            </div>
          </div>
          <button
            onClick={closeCreatePostModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              عنوان المنشور الترويجي <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={titleAr}
              onChange={e => setTitleAr(e.target.value)}
              placeholder="مثال: عمرة وتجديد مضخات هيدروليك كوماتسو PC400 مع ضمان 6 أشهر"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.titleAr && (
              <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.titleAr}</span>
              </span>
            )}
          </div>

          {/* Specialty & Governorate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                تخصص الخدمة الميكانيكية
              </label>
              <select
                value={specialty}
                onChange={e => setSpecialty(e.target.value as MaintenanceSpecialty)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {SPECIALTY_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                المحافظة
              </label>
              <select
                value={governorate}
                onChange={e => setGovernorate(e.target.value as IraqiGovernorate)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {IRAQI_GOVERNORATES.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
          </div>

          {/* City / Industrial District & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                المنطقة الصناعية أو العنوان <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="مثال: الشيخ عمر الصناعية، وادي عكاب، حقل الزبير"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {errors.city && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.city}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                رقم هاتف الورشة للتواصل المباشر <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0770 123 4567"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
              />
              {errors.phone && (
                <span className="text-[11px] text-rose-400 block mt-1">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              تفاصيل الإنجاز أو العرض الترويجي <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={contentAr}
              onChange={e => setContentAr(e.target.value)}
              placeholder="اشرح طبيعة العمل، مواصفات الفحص بالأجهزة، قطع الغيار المستعملة، مدة الضمان الممنوحة، أو شروط الاستجابة الميدانية..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
            {errors.contentAr && (
              <span className="text-[11px] text-rose-400 block mt-1">{errors.contentAr}</span>
            )}
          </div>

          {/* Media Links (Images & Optional Video) */}
          <div className="space-y-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>رابط صورة العمل الميكانيكي (أو استخدم النموذج الافتراضي)</span>
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>رابط فيديو قصير تجريبي (MP4 / WebM اختياري)</span>
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                ملاحظة: تخزين الفيديوهات الحية بالكامل على سحابة الإنتاج يتطلب تفعيل Firebase Storage لاحقاً. العرض التجريبي يستخدم عينة فيديو تفاعلية.
              </span>
            </div>
          </div>

          {/* Publication Status Selector */}
          <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <span className="text-xs font-bold text-white block">حالة النشر</span>
              <span className="text-[10px] text-slate-400">
                {status === 'published' ? 'المنشور مرئي للعملاء في الخلاصة العامة' : 'محفوظ كمسودة خاصة بورشة العمل'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStatus('published')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                نشر مباشر
              </button>
              <button
                type="button"
                onClick={() => setStatus('draft')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  status === 'draft'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                حفظ كمسودة
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={closeCreatePostModal}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingPost ? 'حفظ التعديلات' : 'نشر المنشور الآن'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
