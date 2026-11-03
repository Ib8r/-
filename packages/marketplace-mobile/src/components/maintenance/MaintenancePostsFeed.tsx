import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Phone,
  MessageSquare,
  MessageCircle,
  Video,
  Play,
  Eye,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { MaintenancePost, MaintenanceSpecialty } from '../../types';

interface MaintenancePostsFeedProps {
  centerId?: string; // If provided, filters to posts from this specific workshop
  limit?: number;
  showFilters?: boolean;
}

const SPECIALTY_LABELS: Record<MaintenanceSpecialty, string> = {
  hydraulics: 'هيدروليك وبساتن',
  diesel_engines: 'محركات ديزل',
  electrical: 'كهرباء وحساسات',
  mechanical: 'ميكانيك وتجميع',
  transmission: 'نواقل حركة',
  diagnostics: 'فحص كمبيوتر',
  mobile_field: 'طوارئ ميدانية 24/7',
  general: 'صيانة عامة'
};

export const MaintenancePostsFeed: React.FC<MaintenancePostsFeedProps> = ({
  centerId,
  limit,
  showFilters = true
}) => {
  const { maintenancePosts, openInquiryModal } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState<MaintenanceSpecialty | 'all'>('all');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Filter published posts
  const filteredPosts = maintenancePosts
    .filter(p => p.status === 'published')
    .filter(p => (centerId ? p.centerId === centerId : true))
    .filter(p => (selectedSpecialty !== 'all' ? p.specialty === selectedSpecialty : true))
    .slice(0, limit || undefined);

  return (
    <div className="space-y-6">
      {/* Optional Filter Bar */}
      {showFilters && !centerId && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedSpecialty('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedSpecialty === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            كافة المنشورات ({maintenancePosts.filter(p => p.status === 'published').length})
          </button>
          {(Object.keys(SPECIALTY_LABELS) as MaintenanceSpecialty[]).map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedSpecialty === spec
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {SPECIALTY_LABELS[spec]}
            </button>
          ))}
        </div>
      )}

      {/* Feed List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">لا توجد منشورات ترويجية في هذا القسم حالياً</p>
          <p className="text-xs text-slate-500 mt-1">تستطيع مراكز الصيانة المسجلة نشر عروضها وإنجازاتها من لوحة تحكم الورشة.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map(post => {
            const formattedPhone = post.phone.replace(/\s+/g, '');
            const whatsappNumber = formattedPhone.startsWith('0')
              ? `964${formattedPhone.slice(1)}`
              : formattedPhone;

            return (
              <article
                key={post.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors"
              >
                {/* Post Author Bar */}
                <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3 bg-slate-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white font-heading">
                          {post.centerNameAr}
                        </h3>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-medium">
                          ورشة موثقة
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{post.governorate} — {post.city}</span>
                        </span>
                        <span>·</span>
                        <span className="text-amber-400 font-medium">
                          {SPECIALTY_LABELS[post.specialty] || post.specialty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left text-[11px] text-slate-400 hidden sm:block">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono tabular-nums">{post.viewsCount.toLocaleString()} مشاهدة</span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString('ar-IQ')}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      {post.titleAr}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {post.contentAr}
                    </p>
                  </div>

                  {/* Media Display: Images & Video */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Primary Photo */}
                    {post.mediaUrls && post.mediaUrls[0] && (
                      <div className="relative h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={post.mediaUrls[0]}
                          alt={post.titleAr}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-300">
                          صورة الإنجاز الميداني
                        </div>
                      </div>
                    )}

                    {/* Optional Video Player Simulation */}
                    {post.videoUrl && (
                      <div className="relative h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                        {playingVideoId === post.id ? (
                          <video
                            src={post.videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            onClick={() => setPlayingVideoId(post.id)}
                            className="relative w-full h-full group cursor-pointer"
                          >
                            <img
                              src={post.mediaUrls[1] || post.mediaUrls[0]}
                              alt="معاينة الفيديو"
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 fill-slate-950 mr-0.5" />
                              </div>
                              <span className="text-xs font-bold text-white bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg">
                                تشغيل الفيديو التوضيحي للورشة
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Post Interaction & Direct Contact Bar */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>معتمد من منصة ماشينكس</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${formattedPhone}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono">{post.phone}</span>
                      </a>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`السلام عليكم بخصوص منشوركم في ماشينكس: ${post.titleAr}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>واتساب</span>
                      </a>

                      <button
                        onClick={() =>
                          openInquiryModal({
                            targetType: 'maintenance_post',
                            targetId: post.id,
                            targetTitle: post.titleAr,
                            targetProviderName: post.centerNameAr,
                            targetProviderPhone: post.phone
                          })
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>طلب استفسار عبر المنصة</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
