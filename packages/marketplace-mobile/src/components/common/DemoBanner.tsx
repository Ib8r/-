import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isDemoNoticeVisible, dismissDemoNotice } = useApp();

  if (!isDemoNoticeVisible) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-200 text-xs px-4 py-2 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="leading-tight">
          <span className="font-bold text-amber-300">نسخة معاينة تشغيلية (Prototype Foundation):</span>{' '}
          جميع المعدات، الأسعار بالدينار العراقي، المحافظ المالية، وباقات الاشتراك هي بيانات تجريبية مخصصة للاختبار الهندسي للساحة العراقية. التخزين السحابي الدائم وبوابات الدفع معطلة في هذا الإصدار.
        </p>
      </div>
      <button
        onClick={dismissDemoNotice}
        className="text-amber-400 hover:text-amber-200 p-1 shrink-0 rounded hover:bg-amber-500/20 transition-colors"
        aria-label="إغلاق التنبيه"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
