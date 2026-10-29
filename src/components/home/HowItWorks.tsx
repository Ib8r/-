import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, FileCheck, Truck, ShieldCheck, PlusCircle, CreditCard, ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { setActiveTab, openAddListingModal } = useApp();
  const [activeSegment, setActiveSegment] = useState<'renter' | 'owner'>('renter');

  return (
    <section className="py-16 bg-slate-900/50 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-amber-500 mb-2">شفافية وسرعة في إنجاز المشاريع</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            كيف تعمل منصة ماشينكس؟
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            صممنا آلية عمل تضمن حقوق المقاول وصاحب الآلية بدقة عالية وتوفر الوقت والجهد
          </p>

          {/* Segmented control (Anti-slop compliant: functional buttons with click handlers) */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg mt-6">
            <button
              onClick={() => setActiveSegment('renter')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSegment === 'renter'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              للمقاولين والشركات المستأجرة
            </button>
            <button
              onClick={() => setActiveSegment('owner')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSegment === 'owner'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              لملاك المعدات وأساطيل التأجير
            </button>
          </div>
        </div>

        {activeSegment === 'renter' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                01
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">البحث وتحديد المواصفات</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                حدد نوع الآلية، سعة الحمولة، ومحافظة العمل في العراق، وقارن الأسعار اليومية والأسبوعية بالدينار العراقي.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                02
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">إرسال طلب الاستئجار</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                حدد تاريخ بدء العمل، مدة الإيجار، وتفاصيل موقع المشروع واطلب سائقاً معتمداً وسطحة نقل إن لزم الأمر.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                03
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">تأكيد المالك والضمان</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                يوافق المالك المعتمد على التوقيت ويتم حجز مبلغ التعاقد في محفظة الضمان لحين وصول الآلية للموقع.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                04
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">التشغيل واستلام العمل</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                باشر أعمال الحفر والردم والإنشاء، مع تقييم أداء الآلية والمشغل بعد اكتمال العقد الإنشائي بنجاح.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                01
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">سجل بيانات آلياتك</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                أدخل مواصفات المعدة (طراز الصنع، الوزن، القدرة، وسنة الموديل) ومكان تواجدها الحالي في العراق.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                02
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">حدد أسعارك وشروطك</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                ضع السعر اليومي والأسبوعي بالدينار العراقي، وحدد توفر سائق معتمد وسياسة تزويد الديزل وساعات العمل.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                03
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">استقبل طلبات موثقة</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                راجع طلبات المقاولين الواردة، مواقع مشاريعهم، وتفاصيل العمل واقبل أو عدل بما يناسب جدول تشغيل معدتك.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl relative">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                04
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-heading">تحصيل العوائد بموثوقية</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                استلم مستحقاتك المالية في محفظتك أو حسابك مباشرة مع تقليل فترات توقف آليتك عن العمل لأدنى حد.
              </p>
            </div>
          </div>
        )}

        {/* Action Prompt */}
        <div className="mt-10 text-center">
          {activeSegment === 'renter' ? (
            <button
              onClick={() => setActiveTab('catalog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <span>ابدأ استعراض المعدات المتوفرة الآن</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={openAddListingModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>أضف آليتك أو أسطولك إلى المنصة</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
