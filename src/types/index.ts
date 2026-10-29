/**
 * Machinix Type Definitions
 * Typed contracts for heavy-machinery marketplace in Iraq:
 * 1. Equipment Rental (تأجير الآليات)
 * 2. Equipment Sales (بيع وشراء الآليات)
 * 3. Spare Parts Marketplace (سوق قطع الغيار)
 * 4. Maintenance Center Directory (مراكز وورش الصيانة)
 */

export type UserRole = 'guest' | 'customer' | 'owner' | 'company' | 'workshop' | 'shop' | 'admin';

export type MainServiceType = 'rental' | 'sales' | 'parts' | 'maintenance';

export type MachineryCategory =
  | 'excavator'      // حفارات
  | 'bulldozer'      // بلدوزرات
  | 'wheel_loader'   // شيافل / لوادر
  | 'crane'          // رافعات كرين
  | 'dump_truck'     // شاحنات قلاب / لوريات
  | 'forklift'       // رافعات شوكية
  | 'generator'      // مولدات كهرباء ديزل صناعية
  | 'other';         // معدات ثقيلة أخرى: مداحل، مضخات خرسانة، كريدرات

export type IraqiGovernorate =
  | 'بغداد'
  | 'البصرة'
  | 'أربيل'
  | 'نينوى'
  | 'السليمانية'
  | 'دهوك'
  | 'كركوك'
  | 'الأنبار'
  | 'النجف'
  | 'كربلاء'
  | 'بابل'
  | 'ديالى'
  | 'واسط'
  | 'ميسان'
  | 'ذي قار'
  | 'المثنى'
  | 'القادسية'
  | 'صلاح الدين';

export interface GovernorateDetail {
  id: string;
  nameAr: IraqiGovernorate;
  nameEn: string;
  isMajorHub: boolean;
  commonIndustrialDistricts: string[];
}

export type AvailabilityStatus = 'available' | 'rented' | 'maintenance';
export type FuelPolicy = 'renter' | 'owner' | 'negotiable';
export type PricePeriod = 'daily' | 'weekly' | 'monthly';

export interface EquipmentSpecs {
  operatingWeightTons: number;     // الوزن التشغيلي بالطن
  powerHorsepower: number;         // القدرة الحصانية HP
  capacity?: string;               // سعة الدلو / الحمولة (e.g. 1.8 م³, 45 طن)
  maxReachMeters?: number;         // أقصى مدى وصول بالامتار
  fuelType: 'diesel' | 'hybrid' | 'electric';
  year: number;                    // سنة الصنع
  serialNumberMasked?: string;     // رقم الشاصي المشفر
}

/* =========================================================================
   1. RENTAL LISTINGS (Existing)
   ========================================================================= */

export interface EquipmentListing {
  id: string;
  providerId: string;
  providerName: string;
  providerType: 'individual' | 'company';
  providerVerified: boolean;
  providerPhone: string;
  providerRating: number;
  titleAr: string;
  titleEn: string;
  category: MachineryCategory;
  manufacturer: string;            // e.g. CAT, Komatsu, Volvo, Liebherr, JCB, Bomag
  modelName: string;
  specs: EquipmentSpecs;
  priceDailyIqd: number;           // السعر اليومي بالدينار العراقي
  priceWeeklyIqd: number;          // السعر الأسبوعي بالدينار
  priceMonthlyIqd: number;         // السعر الشهري بالدينار
  governorate: IraqiGovernorate;
  city: string;
  locationAddress: string;
  withOperator: boolean;
  operatorDailyFeeIqd: number;
  fuelPolicy: FuelPolicy;
  minRentalDays: number;
  transportProvided: boolean;
  transportFeeNote?: string;
  availabilityStatus: AvailabilityStatus;
  availableFrom?: string;
  imageUrl: string;
  additionalImages?: string[];
  featured: boolean;
  moderationStatus: 'approved' | 'pending_review' | 'rejected';
  descriptionAr: string;
  rentalConditionsAr: string[];
  createdAt: string;
  viewsCount: number;
}

export type RequestStatus =
  | 'pending'        // بانتظار موافقة المالك
  | 'accepted'       // تمت الموافقة المبدئية
  | 'in_progress'    // جاري التنفيذ في موقع العمل
  | 'completed'      // مكتمل بنجاح
  | 'cancelled'      // ملغي من قبل الزبون
  | 'rejected';      // مرفوض من المالك

export interface RentalRequest {
  id: string;
  equipmentId: string;
  equipmentTitle: string;
  equipmentCategory: MachineryCategory;
  equipmentImageUrl: string;
  providerId: string;
  providerName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerCompany?: string;
  startDate: string;
  durationDays: number;
  endDate: string;
  needsOperator: boolean;
  needsTransport: boolean;
  projectGovernorate: IraqiGovernorate;
  projectCity: string;
  projectAddressDetails: string;
  totalRentalPriceIqd: number;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

/* =========================================================================
   2. EQUIPMENT FOR SALE (New Service)
   ========================================================================= */

export type SaleCondition = 'new' | 'used';
export type SellerType = 'dealership' | 'company' | 'individual';

export interface EquipmentSaleListing {
  id: string;
  titleAr: string;
  titleEn: string;
  category: MachineryCategory;
  manufacturer: string;            // CAT, Komatsu, Volvo, Mercedes, Tadano, JCB
  modelName: string;
  year: number;
  condition: SaleCondition;        // جديد أو مستعمل
  operatingHours?: number;         // ساعات العمل المنجزة (للمستعمل)
  askingPriceIqd: number;          // السعر المطلوب للبيع بالدينار العراقي (منفصل تماماً عن التأجير)
  isNegotiable: boolean;           // السعر قابل للتفاوض
  governorate: IraqiGovernorate;
  city: string;
  locationAddress: string;
  sellerType: SellerType;          // وكالة مسجلة، شركة، أو مالك فردي
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerVerified: boolean;
  specs: EquipmentSpecs;
  warrantyMonths?: number;         // ضمان الوكالة بالأشهر إن وجد
  customsCleared: boolean;         // خضوع للجمارك والتسجيل العراقي الرسمي
  inspectionReportAvailable: boolean; // تقرير فحص جاهزية
  imageUrl: string;
  descriptionAr: string;
  status: 'active' | 'paused' | 'sold';
  moderationStatus: 'approved' | 'pending_review' | 'rejected';
  createdAt: string;
  viewsCount: number;
}

export interface SaleFilterOptions {
  searchQuery: string;
  category: MachineryCategory | 'all';
  governorate: IraqiGovernorate | 'all';
  city: string;
  condition: SaleCondition | 'all';
  sellerType: SellerType | 'all';
  minPrice: number;
  maxPrice: number;
  maxOperatingHours?: number;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'year_desc' | 'hours_asc';
}

/* =========================================================================
   3. SPARE PARTS MARKETPLACE (New Service)
   ========================================================================= */

export type PartCategory =
  | 'hydraulic_pumps'      // مضخات هيدروليكية وبساتن
  | 'engine_filters'       // فلاتر ومكونات محركات ديزل
  | 'undercarriage_tracks' // جنازير وبكرات وسلاسل سحب
  | 'bucket_teeth'         // أسنان باكت وشفرات حفر صخري
  | 'electrical_sensors'   // حساسات وكمبيوترات ولوحات تحكم
  | 'transmission_gears';  // مسننات وترانزميشن ودبل أكسل

export type PartCondition = 'new' | 'used' | 'refurbished';
export type PartAvailability = 'in_stock' | 'limited_stock' | 'out_of_stock';

export interface SparePartItem {
  id: string;
  partNumber: string;              // رقم القطعة الأصلي OEM Part Number
  titleAr: string;
  titleEn: string;
  category: PartCategory;
  brand: string;                   // Caterpillar Genuine, Komatsu OEM, Donaldson, Bosch Rexroth, ZF
  condition: PartCondition;        // جديد، مستعمل، مجدد
  availability: PartAvailability;  // متوفر، كمية محدودة، نفد المخزون
  priceIqd: number;                // السعر بالدينار العراقي
  quantityAvailable: number;       // الكمية المتوفرة في المخزن
  compatibleMachinesAr: string;    // e.g. "حفارات كوماتسو PC200 إلى PC360"
  storeId: string;
  storeName: string;
  storePhone: string;
  storeVerified: boolean;
  governorate: IraqiGovernorate;
  city: string;
  storeLocation: string;
  imageUrl: string;
  descriptionAr: string;
  warrantyPeriodAr?: string;
  lastUpdated: string;             // وقت آخر تحديث للحالة أو المخزون
  status: 'active' | 'paused';     // نشر نشط أو موقوف مؤقتاً من المحل
  createdAt: string;
  // Compatibility Aliases
  title?: string;
  oemPartNumber?: string;
  inStock?: boolean;
  stockQuantity?: number;
  images?: string[];
  shopId?: string;
  compatibleMachinery?: string[];
}

export interface PartFilterOptions {
  searchQuery: string;
  category: PartCategory | 'all';
  governorate: IraqiGovernorate | 'all';
  brand: string;
  condition: PartCondition | 'all';
  availability: PartAvailability | 'all';
  inStockOnly: boolean;
  minPrice: number;
  maxPrice: number;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'updated_desc';
}

/* =========================================================================
   4. MAINTENANCE CENTER DIRECTORY (New Service)
   ========================================================================= */

export type MaintenanceSpecialty =
  | 'hydraulics'           // صيانة وإصلاح المنظومات الهيدروليكية
  | 'diesel_engines'       // تجفيت وصيانة محركات الديزل
  | 'electrical'           // فحص الكهرباء وحساسات الكمبيوتر
  | 'mechanical'           // ميكانيك عام وتجميع
  | 'transmission'         // تصليح نواقل الحركة والجيرات
  | 'diagnostics'          // فحص كمبيوتر وتشخيص الأعطال
  | 'mobile_field'         // ورش متنقلة للصيانة السريعة بمواقع العمل
  | 'general';             // صيانة شاملة وتجهيز مواقع

export interface MaintenanceCenter {
  id: string;
  centerNameAr: string;
  centerNameEn: string;
  governorate: IraqiGovernorate;
  city: string;
  address: string;
  phone: string;
  phoneAlternative?: string;
  specialties: MaintenanceSpecialty[];
  hasMobileWorkshop: boolean;      // توفر سيارات صيانة متنقلة تصل للموقع الميداني
  mobileServiceRangeKm?: number;   // نطاق التغطية بالكيلومترات
  workingHoursAr: string;          // e.g. "السبت - الخميس: 8:00 ص - 6:00 م (طوارئ 24/7)"
  techniciansCount: number;        // عدد المهندسين والفنيين
  rating: number;
  reviewsCount: number;
  verifiedStatus: boolean;
  imageUrl: string;
  descriptionAr: string;
  servicesOfferedAr: string[];
  supportedBrandsAr: string[];
}

export interface MaintenanceFilterOptions {
  searchQuery: string;
  governorate: IraqiGovernorate | 'all';
  city: string;
  specialty: MaintenanceSpecialty | 'all';
  hasMobileWorkshopOnly: boolean;
  sortBy: 'rating_desc' | 'name_asc';
}

export interface MaintenancePost {
  id: string;
  centerId: string;
  centerNameAr: string;
  governorate: IraqiGovernorate;
  city: string;
  phone: string;
  specialty: MaintenanceSpecialty;
  titleAr: string;
  contentAr: string;
  mediaUrls: string[];
  videoUrl?: string; // رابط أو معاينة فيديو توضيحي
  status: 'published' | 'draft' | 'archived';
  viewsCount: number;
  inquiriesCount: number;
  createdAt: string;
  updatedAt: string;
  // Compatibility Aliases
  title?: string;
  description?: string;
  images?: string[];
}

/* =========================================================================
   5. INQUIRIES & CONTACT WORKFLOWS
   ========================================================================= */

export type InquiryTargetType = 'sale_equipment' | 'spare_part' | 'maintenance' | 'maintenance_post';

export interface ServiceInquiry {
  id: string;
  targetType: InquiryTargetType;
  targetId: string;
  targetTitle: string;
  targetPriceIqd?: number;
  targetProviderName: string;
  targetProviderPhone: string;
  requesterId: string;
  requesterName: string;
  requesterPhone: string;
  requesterGovernorate: IraqiGovernorate;
  message: string;
  status: 'sent' | 'responded' | 'closed';
  createdAt: string;
}

/* =========================================================================
   6. USER PROFILE, SUBSCRIPTIONS & CENTRALIZED PRICING
   ========================================================================= */

export type SubscriptionTierId = 'basic' | 'pro_owner' | 'business' | 'enterprise';

export interface PlanTierConfig {
  id: SubscriptionTierId;
  nameAr: string;
  nameEn: string;
  targetAudienceAr: string;
  targetRole: UserRole;
  priceMonthlyIqd: number;
  priceAnnualIqd: number;
  isPopular?: boolean;
  badgeAr?: string;
  canPublishSaleListings: boolean;
  canPublishMaintenancePosts: boolean;
  canManagePartsInventory: boolean;
  maxListings: number | 'unlimited';
  featuresAr: string[];
}

export interface PlatformPricingSettings {
  annualDiscountMonthsFree: number;
  currency: 'IQD';
  currencySymbolAr: string;
  saleListingRequiredTier: SubscriptionTierId;
  plans: Record<SubscriptionTierId, PlanTierConfig>;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  role: UserRole;
  governorate: IraqiGovernorate;
  city: string;
  avatarUrl?: string;
  createdAt: string;
  verified: boolean;
  companyName?: string;
  commercialRegistrationNumber?: string;
  fleetSize?: number;
  subscriptionTier?: SubscriptionTierId | 'free' | 'fleet_enterprise';
  subscriptionActive?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTierId | 'free' | 'fleet_enterprise';
  nameAr: string;
  nameEn: string;
  targetRole: 'owner' | 'company' | 'workshop' | 'shop';
  priceMonthlyIqd: number;
  priceYearlyIqd: number;
  maxActiveListings: number | 'unlimited';
  featuredListingsCount: number;
  commissionDiscountPercent: number;
  hasVerifiedBadge: boolean;
  hasAnalytics: boolean;
  hasDedicatedSupport: boolean;
  canPublishSaleListings: boolean;
  featuresListAr: string[];
}

export interface WalletTransaction {
  id: string;
  type: 'rental_payout' | 'rental_escrow_hold' | 'subscription_fee' | 'platform_commission' | 'deposit';
  amountIqd: number;
  date: string;
  descriptionAr: string;
  referenceId?: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface UserWallet {
  balanceIqd: number;
  heldEscrowIqd: number;
  pendingWithdrawalIqd: number;
  currency: 'IQD';
  transactions: WalletTransaction[];
}

export interface FilterOptions {
  searchQuery: string;
  category: MachineryCategory | 'all';
  governorate: IraqiGovernorate | 'all';
  city: string;
  minPriceDaily: number;
  maxPriceDaily: number;
  withOperatorOnly: boolean;
  availabilityOnly: boolean;
  transportProvidedOnly: boolean;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'power_desc';
}
