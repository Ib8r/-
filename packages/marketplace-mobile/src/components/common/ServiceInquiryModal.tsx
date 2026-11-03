import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Phone, MessageSquare, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const ServiceInquiryModal: React.FC = () => {
  const {
    isInquiryModalOpen,
    inquiryTarget,
    closeInquiryModal,
    sendServiceInquiry,
    currentUser,
    openAuthModal
  } = useApp();

  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isInquiryModalOpen || !inquiryTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    sendServiceInquiry({
      targetType: inquiryTarget.targetType,
      targetId: inquiryTarget.targetId,
      targetTitle: inquiryTarget.targetTitle,
      targetPriceIqd: inquiryTarget.targetPriceIqd,
      targetProviderName: inquiryTarget.targetProviderName,
      targetProviderPhone: inquiryTarget.targetProviderPhone,
      message: message || 'السلام عليكم، أود الاستفسار عن توفر المعروض وطريقة المعاينة أو التوصيل.'
    });

    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setMessage('');
    closeInquiryModal();
  };

  const cleanPhone = inquiryTarget.targetProviderPhone.replace(/\s+/g, '');
  const targetLabel =
    inquiryTarget.targetType === 'sale_equipment'
      ? 'استفسار عن آلية معروضة للبيع'
      : inquiryTarget.targetType === 'spare_part'
      ? 'طلب / استفسار عن قطعة غيار'
      : 'طلب صيانة / كشف فني';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative my-auto animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {targetLabel}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {inquiryTarget.targetTitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              تم إرسال استفسارك بنجاح!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              تم إشعار <strong>{inquiryTarget.targetProviderName}</strong> بطلبك مع بيانات التواصل الخاصة بك ({currentUser?.phone}). يمكنك أيضاً التواصل المباشر عبر الهاتف.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                إغلاق والعودة للسوق
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-5 text-xs">
            {/* Direct Contact Options */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] text-slate-400 block font-medium">التواصل الفوري والمباشر مع المزود:</span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  className="py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال: {cleanPhone}</span>
                </a>
                <a
                  href={`https://wa.me/964${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent('السلام عليكم، استفسر بخصوص: ' + inquiryTarget.targetTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>

            {/* Target Summary */}
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex justify-between items-center text-slate-400">
                <span>الجهة المسؤولة:</span>
                <span className="text-white font-bold">{inquiryTarget.targetProviderName}</span>
              </div>
              {inquiryTarget.targetPriceIqd && (
                <div className="flex justify-between items-center text-slate-400 font-mono">
                  <span>السعر المطلوب:</span>
                  <span className="text-amber-400 font-bold tabular-nums">
                    {formatIqd(inquiryTarget.targetPriceIqd)}
                  </span>
                </div>
              )}
            </div>

            {/* In-app Message Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  نص الاستفسار أو تفاصيل الطلب:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="اكتب استفسارك هنا (المعاينة الميدانية، الفحص الفني، توفر قطع إضافية، موقع الإنزال...)"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الاستفسار للمزود</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
