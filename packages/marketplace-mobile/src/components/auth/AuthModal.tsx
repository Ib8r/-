import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, LogIn, UserPlus, Phone, ShieldCheck, HardHat, Users, Building } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, loginWithRole } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [phone, setPhone] = useState('0770 941 2233');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  if (!isAuthModalOpen) return null;

  const handleCheckUsername = (val: string) => {
    setUsername(val);
    if (val.trim().length >= 3) {
      // Simulate backend uniqueness check (e.g. 'admin' or 'system' reserved)
      const isTaken = ['admin', 'system', 'machinix', 'root'].includes(val.toLowerCase());
      setUsernameAvailable(!isTaken);
    } else {
      setUsernameAvailable(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRole(selectedRole, {
      fullName: fullName || (selectedRole === 'customer' ? 'م. حيدر المعماري' : 'أحمد البدري'),
      phone,
      username: username || 'user_' + Date.now().toString().slice(-4),
      role: selectedRole
    });
  };

  const handleGoogleSignIn = () => {
    loginWithRole('customer', {
      fullName: 'م. حيدر المعماري (عبر Google)',
      email: 'hayder.engineer@gmail.com',
      username: 'hayder_iq'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {mode === 'signin' ? 'تسجيل الدخول إلى ماشينكس' : 'إنشاء حساب جديد في المنصة'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              سوق تأجير الآليات الثقيلة في عموم العراق
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Simulation disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-amber-300 text-[11px] leading-relaxed">
            محاكاة اعتماد تسجيل الدخول عبر Firebase Auth برقم الهاتف العراقي أو حساب Google (وضع تجريبي).
          </div>

          {/* Quick Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>متابعة باستخدام حساب Google</span>
          </button>

          <div className="flex items-center gap-3 my-3">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[11px] text-slate-500 font-mono">أو برقم الهاتف العراقي</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Phone input */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>رقم الهاتف (العراق +964):</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="0770 123 4567"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-left dir-ltr"
            />
          </div>

          {/* Full Name & Username for sign up */}
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">الاسم الكامل أو اسم الشركة:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: م. علي الجبوري للمقاولات"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold">اسم المستخدم الفريد (Username):</label>
                  {usernameAvailable === true && (
                    <span className="text-emerald-400 text-[10px]">متاح للاستخدام ✓</span>
                  )}
                  {usernameAvailable === false && (
                    <span className="text-rose-400 text-[10px]">محجوز مسبقاً ✗</span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  placeholder="ali_contractor"
                  value={username}
                  onChange={e => handleCheckUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-left dir-ltr"
                />
              </div>
            </>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">نوع الحساب والصلاحيات:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  selectedRole === 'customer'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <HardHat className="w-4 h-4" />
                <span className="text-[11px]">زبون / مقاول</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('owner')}
                className={`p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  selectedRole === 'owner'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-[11px]">مالك فردي</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('company')}
                className={`p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  selectedRole === 'company'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="text-[11px]">شركة تأجير</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20 pt-2.5"
          >
            {mode === 'signin' ? 'تسجيل الدخول الفوري' : 'تأكيد إنشاء الحساب وتفعيله'}
          </button>

          <div className="text-center pt-2">
            {mode === 'signin' ? (
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-amber-400 hover:underline text-xs"
              >
                ليس لديك حساب؟ سجل حسابك كمالك أو مقاول
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-amber-400 hover:underline text-xs"
              >
                لديك حساب بالفعل؟ تسجيل الدخول
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
