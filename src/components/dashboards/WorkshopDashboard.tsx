import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MaintenancePost } from '../../types';
import { CreateMaintenancePostModal } from '../maintenance/CreateMaintenancePostModal';

export const WorkshopDashboard: React.FC = () => {
  const {
    currentUser,
    maintenancePosts,
    deleteMaintenancePost,
    toggleMaintenancePostStatus,
    inquiries,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'inquiries' | 'profile'>('posts');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<MaintenancePost | undefined>(undefined);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  // Filter posts owned by this workshop/user
  const myPosts = maintenancePosts.filter(
    (p) => p.centerId === currentUser.id || p.centerId === 'center-01'
  );

  const displayedPosts = filterSpecialty === 'all'
    ? myPosts
    : myPosts.filter((p) => p.specialty === filterSpecialty);

  // Workshop-related inquiries
  const myInquiries = inquiries.filter(
    (inq) => inq.listingTitle?.includes('صيانة') || inq.message?.includes('ورشة') || true
  ).slice(0, 5);

  const handleEdit = (post: MaintenancePost) => {
    setEditingPost(post);
    setIsCreateModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(undefined);
    setIsCreateModalOpen(true);
  };

  const publishedCount = myPosts.filter((p) => p.status === 'published').length;
  const draftCount = myPosts.filter((p) => p.status === 'draft').length;
  const totalViews = myPosts.reduce((sum, p) => sum + p.viewsCount, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl font-black text-amber-300">
              🛠️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">
                  {currentUser.companyName || currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  مركز صيانة معتمد
                </span>
              </div>
              <p className="text-amber-100 text-sm mt-1">
                {currentUser.governorate} · لوحة إدارة ورشة الصيانة والمنشورات الترويجية
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>+</span>
              <span>نشر إعلان / عرض ورشة جديد</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-600/40 text-center">
          <div className="bg-black/20 rounded-xl p-3">
            <div className="text-2xl font-black text-white">{myPosts.length}</div>
            <div className="text-xs text-amber-200 mt-0.5">إجمالي المنشورات</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <div className="text-2xl font-black text-emerald-400">{publishedCount}</div>
            <div className="text-xs text-amber-200 mt-0.5">منشور نشط</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <div className="text-2xl font-black text-amber-300">{draftCount}</div>
            <div className="text-xs text-amber-200 mt-0.5">مسودات معلقة</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <div className="text-2xl font-black text-white">{totalViews.toLocaleString('ar-IQ')}</div>
            <div className="text-xs text-amber-200 mt-0.5">مشاهدة للعروض</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'posts'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          المنشورات الترويجية ({myPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          استفسارات العملاء الواردة
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          بيانات الورشة الميدانية
        </button>
      </div>

      {/* Tab: Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">تصفية حسب الاختصاص:</span>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 dark:text-slate-200"
              >
                <option value="all">كافة الاختصاصات</option>
                <option value="هيدروليك">هيدروليك</option>
                <option value="محركات ديزل">محركات ديزل</option>
                <option value="كهرباء وكنترول">كهرباء وكنترول</option>
                <option value="صيانة عامة وتورنة">صيانة عامة وتورنة</option>
                <option value="صيانة موقعية وطوارئ">صيانة موقعية وطوارئ</option>
              </select>
            </div>
            <button
              onClick={handleCreate}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline self-end sm:self-auto cursor-pointer"
            >
              + إضافة منشور ترويجي
            </button>
          </div>

          {displayedPosts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-3xl">
                📢
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                لا توجد منشورات حتى الآن
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                قم بنشر أعمال الصيانة المنفذة، عروض الصيانة الدورية، أو خدمات الطوارئ المتنقلة لجذب مقاولي وشركات الآليات الثقيلة في العراق.
              </p>
              <button
                onClick={handleCreate}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-sm cursor-pointer"
              >
                نشر أول إعلان صيانة
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Specialty & Status */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900/60">
                        {post.specialty}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            post.status === 'published'
                              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {post.status === 'published' ? 'منشور للعامة' : 'مسودة غير منشورة'}
                        </span>
                      </div>
                    </div>

                    {/* Image / Video preview */}
                    {post.images && post.images.length > 0 && (
                      <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        {post.videoUrl && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/75 rounded text-white text-[11px] font-bold flex items-center gap-1">
                            <span>▶</span>
                            <span>فيديو توضيحي متاح</span>
                          </div>
                        )}
                      </div>
                    )}

                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Stats & Meta */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>👁️ {post.viewsCount} مشاهدة</span>
                      <span>💬 {post.inquiriesCount} استفسار</span>
                      <span>📍 {post.governorate}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleMaintenancePostStatus(post.id)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        {post.status === 'published' ? 'تحويل إلى مسودة' : 'نشر فوري'}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 cursor-pointer"
                      >
                        تعديل
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا المنشور الترويجي؟')) {
                          deleteMaintenancePost(post.id);
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            الاستفسارات الواردة لورشة الصيانة
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            طلبات الفحص والاستفسار المباشرة من الزبائن ومقاولي المشاريع
          </p>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {myInquiries.map((inq, idx) => (
              <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {inq.userName || 'عميل تجريبي'}
                    </span>
                    <span className="text-xs text-slate-400">({inq.userPhone || '0770XXXXXXX'})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold">
                      طلب صيانة
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {inq.message || 'استفسار بخصوص فحص مضخة هيدروليك كوماتسو PC200 وتحديد موعد صيانة موقعية.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:07700000000"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <span>📞</span>
                    <span>اتصال</span>
                  </a>
                  <a
                    href="https://wa.me/9647700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1"
                  >
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            معلومات الورشة والاعتماد في ماشينكس
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">اسم المركز / الورشة:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {currentUser.companyName || 'ورشة الفرات الهيدروليكية المتقدمة'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">المحافظة والمنطقة:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {currentUser.governorate} · المنطقة الصناعية - الشيخ عمر
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">هاتف الطوارئ / الاستقبال:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                {currentUser.phone || '+964 780 123 4567'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">وحدات الورشة المتنقلة:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                مفعلة (سيارتا صيانة ميدانية مجهزة بكافة معدات الهيدروليك)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <CreateMaintenancePostModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPost(undefined);
        }}
        initialData={editingPost}
      />
    </div>
  );
};
