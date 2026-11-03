import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  PlusCircle,
  Building
} from 'lucide-react';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';

export const DemoWallet: React.FC = () => {
  const { userWallet, addDemoFunds, requestDemoWithdrawal, currentUser } = useApp();

  const [depositAmount, setDepositAmount] = useState<number>(1000000);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(500000);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleDeposit = () => {
    if (depositAmount <= 0) return;
    addDemoFunds(depositAmount);
    setMsg({ text: `تم شحن رصيد تجريبي بمبلغ ${formatIqd(depositAmount)} بنجاح.`, type: 'success' });
    setTimeout(() => setMsg(null), 3500);
  };

  const handleWithdraw = () => {
    if (withdrawAmount <= 0) return;
    const ok = requestDemoWithdrawal(withdrawAmount);
    if (ok) {
      setMsg({ text: `تم تسجيل طلب سحب تجريبي بقيمة ${formatIqd(withdrawAmount)} للحساب المصرفي (محاكاة).`, type: 'success' });
    } else {
      setMsg({ text: 'الرصيد المتاح غير كافٍ لتنفيذ طلب السحب.', type: 'error' });
    }
    setTimeout(() => setMsg(null), 3500);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  المحفظة المالية التجريبية (Demo Escrow Wallet)
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  وضع محاكاة مبرمج
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                صاحب الحساب: {currentUser?.fullName || 'مستخدم عام'} · العملة الأساسية: الدينار العراقي (IQD)
              </p>
            </div>
          </div>
        </div>

        {/* Feedback alert */}
        {msg && (
          <div
            className={`p-3 rounded-lg text-xs text-center font-medium border animate-in fade-in ${
              msg.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* Prototype Legal Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-200 block mb-0.5">محاكاة تدفقات الضمان المالي في العراق:</strong>
            تم إعداد هذه المحفظة لعرض دورة حجز مبالغ الضمان (Escrow) أثناء سريان عقود تأجير المعدات الثقيلة، وإطلاق المستحقات للملاك فور اكتمال العمل. لا توجد أي مدفوعات مصرفية حقيقية أو استقطاعات بنكية في هذه النسخة.
          </div>
        </div>

        {/* Balances Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Available balance */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <span className="text-xs text-slate-400 block mb-1">الرصيد المتاح للتشغيل / السحب:</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums leading-tight">
              {formatIqd(userWallet.balanceIqd)}
            </div>
            <span className="text-xs text-emerald-400 font-mono mt-1 block">
              {formatUsdEquivalent(userWallet.balanceIqd)}
            </span>
          </div>

          {/* Held Escrow */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <span className="text-xs text-slate-400 block mb-1">مبالغ الضمان المحجوزة للعقود:</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums leading-tight">
              {formatIqd(userWallet.heldEscrowIqd)}
            </div>
            <span className="text-xs text-slate-500 font-mono mt-1 block">
              تُطلق تلقائياً عند اعتماد اكتمال التشغيل
            </span>
          </div>

          {/* Pending Withdrawal */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
            <span className="text-xs text-slate-400 block mb-1">طلبات السحب قيد المعالجة:</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-300 font-mono tabular-nums leading-tight">
              {formatIqd(userWallet.pendingWithdrawalIqd)}
            </div>
            <span className="text-xs text-slate-500 font-mono mt-1 block">
              محاكاة تحويل إلى مصرف التجارة العراقي (TBI)
            </span>
          </div>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simulate Deposit */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
              <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              <span>شحن رصيد تجريبي (محاكاة إيداع المقاول)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              اختر مبلغاً تجريبياً لإضافته إلى رصيدك لاختبار حجز عقود استئجار المعدات.
            </p>
            <div className="flex items-center gap-3">
              <select
                value={depositAmount}
                onChange={e => setDepositAmount(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500 flex-1 font-mono"
              >
                <option value={500000}>500,000 د.ع</option>
                <option value={1000000}>1,000,000 د.ع</option>
                <option value={2500000}>2,500,000 د.ع</option>
                <option value={5000000}>5,000,000 د.ع</option>
              </select>
              <button
                onClick={handleDeposit}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                إيداع تجريبي
              </button>
            </div>
          </div>

          {/* Simulate Withdrawal */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>طلب سحب أرباح للمالك (محاكاة تحويل مصرفي)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              محاكاة سحب عوائد التأجير المحصلة من المقاولين إلى حساب الآيبان المصرفي.
            </p>
            <div className="flex items-center gap-3">
              <select
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500 flex-1 font-mono"
              >
                <option value={250000}>250,000 د.ع</option>
                <option value={500000}>500,000 د.ع</option>
                <option value={1000000}>1,000,000 د.ع</option>
              </select>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                طلب سحب
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading">
              سجل العمليات والحركات المالية التجريبية ({userWallet.transactions.length})
            </h2>
            <span className="text-xs text-slate-500 font-mono">سجل تدقيق معزول في السيرفر</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">رقم الحركة</th>
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">نوع الحركة</th>
                    <th className="py-3 px-4">الوصف والتفاصيل</th>
                    <th className="py-3 px-4">المبلغ بالدينار العراقي</th>
                    <th className="py-3 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {userWallet.transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{tx.id}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-white">
                          {tx.type === 'deposit'
                            ? 'إيداع رصيد'
                            : tx.type === 'rental_payout'
                            ? 'عوائد تأجير'
                            : tx.type === 'rental_escrow_hold'
                            ? 'حجز ضمان تعاقد'
                            : tx.type === 'subscription_fee'
                            ? 'رسوم اشتراك'
                            : 'عمولة المنصة'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-xs">{tx.descriptionAr}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                        {tx.type === 'rental_escrow_hold' || tx.type === 'subscription_fee' || tx.type === 'platform_commission' ? (
                          <span className="text-rose-400">-{formatIqd(tx.amountIqd)}</span>
                        ) : (
                          <span className="text-emerald-400">+{formatIqd(tx.amountIqd)}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            tx.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          }`}
                        >
                          {tx.status === 'completed' ? 'مكتمل' : 'معلق / قيد الإجراء'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
