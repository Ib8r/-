import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, User, Calendar, ShieldCheck, Heart, ArrowLeft, Fuel, Truck } from 'lucide-react';
import { formatIqd, formatUsdEquivalent } from '../../utils/formatters';
import { EquipmentListing } from '../../types';

export const FeaturedListings: React.FC = () => {
  const {
    listings,
    openEquipmentDetails,
    openBookingModal,
    toggleFavorite,
    isFavorite,
    setActiveTab
  } = useApp();

  const featured = listings.filter(l => l.featured).slice(0, 6);

  return (
    <section className="py-14 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
              <span>آليات موثقة معتمدة</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">جاهزة للتشغيل الفوري في المواقع</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              أبرز المعدات المتاحة للإيجار حالياً
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>عرض كافة المعروضات في السوق ({listings.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(item => (
            <MachineryCard
              key={item.id}
              item={item}
              onDetails={() => openEquipmentDetails(item.id)}
              onBook={() => openBookingModal(item)}
              onToggleFav={() => toggleFavorite(item.id)}
              isFav={isFavorite(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const MachineryCard: React.FC<{
  item: EquipmentListing;
  onDetails: () => void;
  onBook: () => void;
  onToggleFav: () => void;
  isFav: boolean;
}> = ({ item, onDetails, onBook, onToggleFav, isFav }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
      {/* Visual Header */}
      <div className="relative h-48 sm:h-52 bg-slate-800 overflow-hidden cursor-pointer" onClick={onDetails}>
        <img
          src={item.imageUrl}
          alt={item.titleAr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled SVG fallback if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFav ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/70 text-white hover:text-amber-400'
          }`}
          aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-slate-950' : ''}`} />
        </button>

        {/* Top-Right Info: Availability */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-medium text-white border border-slate-700/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{item.availabilityStatus === 'available' ? 'متاح فوراً' : 'قيد الاستخدام'}</span>
        </div>

        {/* Bottom image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Location caption on bottom of image */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-xs text-slate-200 drop-shadow">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{item.governorate} — {item.city}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Manufacturer & Year - unboxed clean typography */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-amber-400">{item.manufacturer}</span>
            <span aria-hidden="true">·</span>
            <span>طراز {item.modelName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{item.specs.year}</span>
          </div>

          {/* Title */}
          <h3
            onClick={onDetails}
            className="font-bold text-sm sm:text-base text-white hover:text-amber-400 cursor-pointer transition-colors line-clamp-2 leading-snug mb-3 font-heading"
          >
            {item.titleAr}
          </h3>

          {/* Key Specs Row */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3">
            <div>
              <span className="text-slate-500 block">الوزن / السعة:</span>
              <span className="font-medium font-mono text-white">
                {item.specs.operatingWeightTons > 0 ? `${item.specs.operatingWeightTons} طن` : item.specs.capacity || '-'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">القدرة الحصانية:</span>
              <span className="font-medium font-mono text-white">{item.specs.powerHorsepower} HP</span>
            </div>
            <div>
              <span className="text-slate-500 block">السائق:</span>
              <span className="font-medium text-white">
                {item.withOperator ? 'مع سائق معتمد' : 'بدون سائق'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">النقل للموقع:</span>
              <span className="font-medium text-white">
                {item.transportProvided ? 'سطحة متوفرة' : 'على المستأجر'}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">سعر الإيجار اليومي:</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums leading-tight">
              {formatIqd(item.priceDailyIqd)}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {formatUsdEquivalent(item.priceDailyIqd)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onDetails}
              className="px-3 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              التفاصيل
            </button>
            <button
              onClick={onBook}
              className="px-3.5 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-sm"
            >
              استئجار
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
