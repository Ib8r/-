import { MachineryCategory, PricePeriod, RequestStatus, AvailabilityStatus } from '../types';

export const USD_TO_IQD_RATE = 1310; // سعر الصرف المعتمد للتحويل التقريبي

/**
 * Format Iraqi Dinar amount with comma separators and currency symbol
 */
export function formatIqd(amount: number): string {
  if (isNaN(amount)) return '0 د.ع';
  return `${amount.toLocaleString('en-US')} د.ع`;
}

/**
 * Calculate and format USD equivalent for Iraqi Dinar price
 */
export function formatUsdEquivalent(amountIqd: number): string {
  if (isNaN(amountIqd) || amountIqd <= 0) return '';
  const usd = Math.round(amountIqd / USD_TO_IQD_RATE);
  return `~ $${usd.toLocaleString('en-US')}`;
}

export function formatPricePeriod(period: PricePeriod): string {
  switch (period) {
    case 'daily':
      return 'يومياً';
    case 'weekly':
      return 'أسبوعياً';
    case 'monthly':
      return 'شهرياً';
    default:
      return '';
  }
}

export function getCategoryNameAr(category: MachineryCategory): string {
  switch (category) {
    case 'excavator':
      return 'حفارات هيدروليكية';
    case 'bulldozer':
      return 'بلدوزرات تسوية';
    case 'wheel_loader':
      return 'شيافل ولوادر';
    case 'crane':
      return 'رافعات كرين';
    case 'dump_truck':
      return 'شاحنات قلاب';
    case 'forklift':
      return 'رافعات شوكية';
    case 'generator':
      return 'مولدات كهرباء ديزل';
    case 'other':
      return 'معدات ثقيلة أخرى';
    default:
      return category;
  }
}

export function getAvailabilityBadge(status: AvailabilityStatus): { labelAr: string; colorClass: string } {
  switch (status) {
    case 'available':
      return { labelAr: 'متاح فوراً', colorClass: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80' };
    case 'rented':
      return { labelAr: 'مؤجر حالياً', colorClass: 'text-amber-400 bg-amber-950/60 border-amber-800/80' };
    case 'maintenance':
      return { labelAr: 'تحت الصيانة', colorClass: 'text-rose-400 bg-rose-950/60 border-rose-800/80' };
  }
}

export function getRequestStatusBadge(status: RequestStatus): { labelAr: string; colorClass: string } {
  switch (status) {
    case 'pending':
      return { labelAr: 'بانتظار موافقة المالك', colorClass: 'text-amber-300 bg-amber-950/70 border-amber-800/70' };
    case 'accepted':
      return { labelAr: 'تمت الموافقة المبدئية', colorClass: 'text-cyan-300 bg-cyan-950/70 border-cyan-800/70' };
    case 'in_progress':
      return { labelAr: 'ساري في موقع العمل', colorClass: 'text-emerald-300 bg-emerald-950/70 border-emerald-800/70' };
    case 'completed':
      return { labelAr: 'مكتمل بنجاح', colorClass: 'text-slate-300 bg-slate-800/80 border-slate-700' };
    case 'cancelled':
      return { labelAr: 'ملغي من الزبون', colorClass: 'text-zinc-400 bg-zinc-900 border-zinc-800' };
    case 'rejected':
      return { labelAr: 'مرفوض', colorClass: 'text-rose-400 bg-rose-950/70 border-rose-800/70' };
  }
}
