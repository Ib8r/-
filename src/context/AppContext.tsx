import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  MainServiceType,
  EquipmentListing,
  EquipmentSaleListing,
  SparePartItem,
  MaintenanceCenter,
  ServiceInquiry,
  InquiryTargetType,
  RentalRequest,
  UserWallet,
  FilterOptions,
  SaleFilterOptions,
  PartFilterOptions,
  MaintenanceFilterOptions,
  AvailabilityStatus,
  RequestStatus,
  MachineryCategory,
  IraqiGovernorate,
  PartCategory,
  MaintenanceSpecialty,
  SaleCondition,
  SellerType,
  PartCondition,
  PartAvailability,
  MaintenancePost,
  SubscriptionTierId,
  PlatformPricingSettings
} from '../types';
import { SAMPLE_LISTINGS } from '../data/sampleListings';
import { SAMPLE_SALES_LISTINGS } from '../data/sampleSales';
import { SAMPLE_SPARE_PARTS } from '../data/sampleParts';
import { SAMPLE_MAINTENANCE_CENTERS } from '../data/sampleMaintenance';
import { INITIAL_MAINTENANCE_POSTS } from '../data/sampleMaintenancePosts';
import { INITIAL_PLATFORM_PRICING } from '../data/pricingConfig';
import { SAMPLE_USERS, SAMPLE_WALLETS, INITIAL_RENTAL_REQUESTS } from '../data/sampleUsers';

export type ActiveTab =
  | 'home'
  | 'catalog'
  | 'sales'
  | 'parts'
  | 'maintenance'
  | 'plans'
  | 'wallet'
  | 'customer_dashboard'
  | 'owner_dashboard'
  | 'company_dashboard'
  | 'workshop_dashboard'
  | 'shop_dashboard'
  | 'admin_dashboard';

interface AppContextType {
  // Navigation & Tabs
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentService: MainServiceType;
  setCurrentService: (srv: MainServiceType) => void;
  selectedCategoryFromHero: MachineryCategory | null;
  setSelectedCategoryFromHero: (cat: MachineryCategory | null) => void;

  // Role & Authentication
  currentRole: UserRole;
  currentUser: UserProfile | null;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'signin' | 'signup';
  loginWithRole: (role: UserRole, customUser?: Partial<UserProfile>) => void;
  logout: () => void;

  // 1. Equipment Rental (Existing)
  listings: EquipmentListing[];
  filteredListings: EquipmentListing[];
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  selectedEquipment: EquipmentListing | null;
  openEquipmentDetails: (id: string) => void;
  closeEquipmentDetails: () => void;
  selectedProviderId: string | null;
  openProviderProfile: (providerId: string) => void;
  closeProviderProfile: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (equipmentId: string) => void;
  isFavorite: (equipmentId: string) => boolean;

  // Booking & Rental Requests
  isBookingModalOpen: boolean;
  equipmentToBook: EquipmentListing | null;
  openBookingModal: (equipment: EquipmentListing) => void;
  closeBookingModal: () => void;
  rentalRequests: RentalRequest[];
  createRentalRequest: (requestData: {
    equipmentId: string;
    startDate: string;
    durationDays: number;
    needsOperator: boolean;
    needsTransport: boolean;
    projectGovernorate: IraqiGovernorate;
    projectCity: string;
    projectAddressDetails: string;
    notes?: string;
  }) => RentalRequest;
  updateRequestStatus: (requestId: string, newStatus: RequestStatus) => void;

  // 2. Equipment For Sale (New)
  saleListings: EquipmentSaleListing[];
  filteredSaleListings: EquipmentSaleListing[];
  saleFilterOptions: SaleFilterOptions;
  setSaleFilterOptions: React.Dispatch<React.SetStateAction<SaleFilterOptions>>;
  resetSaleFilters: () => void;
  selectedSaleListing: EquipmentSaleListing | null;
  openSaleDetails: (id: string) => void;
  closeSaleDetails: () => void;
  addNewSaleListing: (listing: Omit<EquipmentSaleListing, 'id' | 'createdAt' | 'viewsCount' | 'moderationStatus'>) => void;
  updateSaleListingStatus: (id: string, status: 'active' | 'paused' | 'sold') => void;
  deleteSaleListing: (id: string) => void;
  isAddSaleListingModalOpen: boolean;
  openAddSaleListingModal: () => void;
  closeAddSaleListingModal: () => void;

  // Subscription & Central Pricing Engine
  pricingSettings: PlatformPricingSettings;
  updatePlanPrice: (planId: SubscriptionTierId, monthlyPriceIqd: number) => void;
  checkSalePublishingEligibility: () => { eligible: boolean; reasonAr: string; requiredTier: string; priceMonthlyIqd: number };
  isSubscriptionUpgradeModalOpen: boolean;
  openSubscriptionUpgradeModal: () => void;
  closeSubscriptionUpgradeModal: () => void;
  upgradeSubscriptionDemo: (tier: SubscriptionTierId) => void;

  // 3. Spare Parts Marketplace & Shop Inventory Management
  spareParts: SparePartItem[];
  filteredSpareParts: SparePartItem[];
  partFilterOptions: PartFilterOptions;
  setPartFilterOptions: React.Dispatch<React.SetStateAction<PartFilterOptions>>;
  resetPartFilters: () => void;
  selectedPart: SparePartItem | null;
  openPartDetails: (id: string) => void;
  closePartDetails: () => void;
  createSparePartListing: (part: Omit<SparePartItem, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  updateSparePartListing: (id: string, updates: Partial<SparePartItem>) => void;
  deleteSparePartListing: (id: string) => void;
  updatePartStockAvailability: (id: string, availability: PartAvailability, quantity: number) => void;
  togglePartActiveStatus: (id: string) => void;
  isCreatePartModalOpen: boolean;
  editingPart: SparePartItem | null;
  openCreatePartModal: (partToEdit?: SparePartItem) => void;
  closeCreatePartModal: () => void;

  // 4. Maintenance Centers Directory & Workshop Post Publishing
  maintenanceCenters: MaintenanceCenter[];
  filteredMaintenanceCenters: MaintenanceCenter[];
  maintenanceFilterOptions: MaintenanceFilterOptions;
  setMaintenanceFilterOptions: React.Dispatch<React.SetStateAction<MaintenanceFilterOptions>>;
  resetMaintenanceFilters: () => void;
  selectedWorkshop: MaintenanceCenter | null;
  openWorkshopDetails: (id: string) => void;
  closeWorkshopDetails: () => void;
  maintenancePosts: MaintenancePost[];
  createMaintenancePost: (post: Omit<MaintenancePost, 'id' | 'viewsCount' | 'inquiriesCount' | 'createdAt' | 'updatedAt'>) => void;
  updateMaintenancePost: (id: string, updates: Partial<MaintenancePost>) => void;
  deleteMaintenancePost: (id: string) => void;
  togglePostPublishStatus: (id: string) => void;
  isCreatePostModalOpen: boolean;
  editingPost: MaintenancePost | null;
  openCreatePostModal: (postToEdit?: MaintenancePost) => void;
  closeCreatePostModal: () => void;

  // 5. Inquiries & Direct Contact
  serviceInquiries: ServiceInquiry[];
  sendServiceInquiry: (inquiryData: {
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
    message: string;
  }) => void;
  isInquiryModalOpen: boolean;
  inquiryTarget: {
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
  } | null;
  openInquiryModal: (target: {
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
  }) => void;
  closeInquiryModal: () => void;

  // Listings Management (for Owners / Fleet Companies)
  isAddListingModalOpen: boolean;
  openAddListingModal: () => void;
  closeAddListingModal: () => void;
  addNewListing: (listing: Omit<EquipmentListing, 'id' | 'createdAt' | 'viewsCount' | 'moderationStatus'>) => void;
  updateListingAvailability: (id: string, status: AvailabilityStatus) => void;
  approveListingByAdmin: (id: string) => void;
  deleteListing: (id: string) => void;

  // Wallet & Transactions
  userWallet: UserWallet;
  addDemoFunds: (amountIqd: number) => void;
  requestDemoWithdrawal: (amountIqd: number) => boolean;

  // Demo Notice
  isDemoNoticeVisible: boolean;
  dismissDemoNotice: () => void;
}

const DEFAULT_RENTAL_FILTERS: FilterOptions = {
  searchQuery: '',
  category: 'all',
  governorate: 'all',
  city: '',
  minPriceDaily: 0,
  maxPriceDaily: 2500000,
  withOperatorOnly: false,
  availabilityOnly: false,
  transportProvidedOnly: false,
  sortBy: 'featured',
};

const DEFAULT_SALE_FILTERS: SaleFilterOptions = {
  searchQuery: '',
  category: 'all',
  governorate: 'all',
  city: '',
  condition: 'all',
  sellerType: 'all',
  minPrice: 0,
  maxPrice: 800000000, // 800M IQD
  sortBy: 'featured',
};

const DEFAULT_PART_FILTERS: PartFilterOptions = {
  searchQuery: '',
  category: 'all',
  governorate: 'all',
  brand: '',
  condition: 'all',
  availability: 'all',
  inStockOnly: false,
  minPrice: 0,
  maxPrice: 20000000, // 20M IQD
  sortBy: 'popular',
};

const DEFAULT_MAINTENANCE_FILTERS: MaintenanceFilterOptions = {
  searchQuery: '',
  governorate: 'all',
  city: '',
  specialty: 'all',
  hasMobileWorkshopOnly: false,
  sortBy: 'rating_desc',
};

const INITIAL_INQUIRIES: ServiceInquiry[] = [
  {
    id: 'inq-001',
    targetType: 'sale_equipment',
    targetId: 'sale-001',
    targetTitle: 'حفارة كوماتسو PC300-8 مجنزرة مستعملة بحالة الوكالة',
    targetPriceIqd: 215000000,
    targetProviderName: 'شركة ومعارض دجلة لتجارة الآليات والمعدات ذ.م.م',
    targetProviderPhone: '0750 111 2233',
    requesterId: 'user-cust-01',
    requesterName: 'م. حيدر المعماري',
    requesterPhone: '0770 941 2233',
    requesterGovernorate: 'بغداد',
    message: 'السلام عليكم، هل الحفارة متوفرة للمعاينة في أربيل؟ ونود الاستفسار عن إمكانية الدفع عبر خطاب اعتماد بنكي.',
    status: 'responded',
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'inq-002',
    targetType: 'spare_part',
    targetId: 'part-001',
    targetTitle: 'مضخة هيدروليكية رئيسية لحفارة كاتربيلر CAT 336D',
    targetPriceIqd: 14500000,
    targetProviderName: 'مؤسسة دجلة لقطع غيار الهيدروليك والمعدات',
    targetProviderPhone: '0770 333 4455',
    requesterId: 'user-cust-01',
    requesterName: 'م. حيدر المعماري',
    requesterPhone: '0770 941 2233',
    requesterGovernorate: 'بغداد',
    message: 'هل المضخة أصلية كواساكي ياباني مع بلف التوزيع؟ وهل يتوفر توصيل مباشر لموقع العمل في التاجي؟',
    status: 'sent',
    createdAt: '2026-10-27T14:20:00Z'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentService, setCurrentService] = useState<MainServiceType>('rental');
  const [selectedCategoryFromHero, setSelectedCategoryFromHero] = useState<MachineryCategory | null>(null);

  // User state
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(SAMPLE_USERS['customer']);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [equipmentToBook, setEquipmentToBook] = useState<EquipmentListing | null>(null);
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [isDemoNoticeVisible, setIsDemoNoticeVisible] = useState(true);

  // New Service Modals
  const [selectedSaleListingId, setSelectedSaleListingId] = useState<string | null>(null);
  const [isAddSaleListingModalOpen, setIsAddSaleListingModalOpen] = useState(false);
  const [isSubscriptionUpgradeModalOpen, setIsSubscriptionUpgradeModalOpen] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTarget, setInquiryTarget] = useState<{
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
  } | null>(null);

  // Workshop Promotional Post Modals & State
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<MaintenancePost | null>(null);

  // Spare Parts Shop Modal & State
  const [isCreatePartModalOpen, setIsCreatePartModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePartItem | null>(null);

  // In-memory collections & Pricing
  const [pricingSettings, setPricingSettings] = useState<PlatformPricingSettings>(INITIAL_PLATFORM_PRICING);
  const [listings, setListings] = useState<EquipmentListing[]>(SAMPLE_LISTINGS);
  const [saleListings, setSaleListings] = useState<EquipmentSaleListing[]>(SAMPLE_SALES_LISTINGS);
  const [spareParts, setSpareParts] = useState<SparePartItem[]>(SAMPLE_SPARE_PARTS);
  const [maintenanceCenters, setMaintenanceCenters] = useState<MaintenanceCenter[]>(SAMPLE_MAINTENANCE_CENTERS);
  const [maintenancePosts, setMaintenancePosts] = useState<MaintenancePost[]>(INITIAL_MAINTENANCE_POSTS);
  const [serviceInquiries, setServiceInquiries] = useState<ServiceInquiry[]>(INITIAL_INQUIRIES);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>(INITIAL_RENTAL_REQUESTS);
  const [wallets, setWallets] = useState<Record<string, UserWallet>>(SAMPLE_WALLETS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('machinix_favorites');
      return saved ? JSON.parse(saved) : ['mach-001', 'mach-003'];
    } catch {
      return ['mach-001', 'mach-003'];
    }
  });

  // Filter states
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(DEFAULT_RENTAL_FILTERS);
  const [saleFilterOptions, setSaleFilterOptions] = useState<SaleFilterOptions>(DEFAULT_SALE_FILTERS);
  const [partFilterOptions, setPartFilterOptions] = useState<PartFilterOptions>(DEFAULT_PART_FILTERS);
  const [maintenanceFilterOptions, setMaintenanceFilterOptions] = useState<MaintenanceFilterOptions>(DEFAULT_MAINTENANCE_FILTERS);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('machinix_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'guest') {
      setCurrentUser(null);
    } else {
      const base = SAMPLE_USERS[role] || null;
      if (base) {
        if (role === 'owner') {
          base.subscriptionTier = 'pro_owner';
          base.subscriptionActive = true;
        } else if (role === 'company') {
          base.subscriptionTier = 'enterprise';
          base.subscriptionActive = true;
        } else if (role === 'workshop' || role === 'shop') {
          base.subscriptionTier = 'business';
          base.subscriptionActive = true;
        } else {
          base.subscriptionTier = 'basic';
          base.subscriptionActive = true;
        }
      }
      setCurrentUser(base);
    }

    if (role === 'customer') setActiveTab('customer_dashboard');
    else if (role === 'owner') setActiveTab('owner_dashboard');
    else if (role === 'company') setActiveTab('company_dashboard');
    else if (role === 'workshop') setActiveTab('workshop_dashboard');
    else if (role === 'shop') setActiveTab('shop_dashboard');
    else if (role === 'admin') setActiveTab('admin_dashboard');
    else setActiveTab('home');
  };

  const loginWithRole = (role: UserRole, customUser?: Partial<UserProfile>) => {
    setCurrentRole(role);
    const base = SAMPLE_USERS[role] || SAMPLE_USERS['customer'];
    setCurrentUser({
      ...base,
      ...customUser,
      role: role,
      subscriptionTier:
        role === 'owner' ? 'pro_owner' :
        role === 'company' ? 'enterprise' :
        role === 'workshop' || role === 'shop' ? 'business' : 'basic',
      subscriptionActive: true
    });
    setIsAuthModalOpen(false);
    if (role === 'customer') setActiveTab('customer_dashboard');
    else if (role === 'owner') setActiveTab('owner_dashboard');
    else if (role === 'company') setActiveTab('company_dashboard');
    else if (role === 'workshop') setActiveTab('workshop_dashboard');
    else if (role === 'shop') setActiveTab('shop_dashboard');
    else if (role === 'admin') setActiveTab('admin_dashboard');
  };

  const logout = () => {
    setCurrentRole('guest');
    setCurrentUser(null);
    setActiveTab('home');
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Favorites
  const toggleFavorite = (equipmentId: string) => {
    setFavorites(prev =>
      prev.includes(equipmentId) ? prev.filter(id => id !== equipmentId) : [...prev, equipmentId]
    );
  };
  const isFavorite = (equipmentId: string) => favorites.includes(equipmentId);

  // Rental details
  const selectedEquipment = useMemo(() => {
    if (!selectedEquipmentId) return null;
    return listings.find(l => l.id === selectedEquipmentId) || null;
  }, [listings, selectedEquipmentId]);

  const openEquipmentDetails = (id: string) => setSelectedEquipmentId(id);
  const closeEquipmentDetails = () => setSelectedEquipmentId(null);

  const openProviderProfile = (providerId: string) => setSelectedProviderId(providerId);
  const closeProviderProfile = () => setSelectedProviderId(null);

  // Rental Booking
  const openBookingModal = (equipment: EquipmentListing) => {
    setEquipmentToBook(equipment);
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setEquipmentToBook(null);
  };

  const createRentalRequest = (requestData: {
    equipmentId: string;
    startDate: string;
    durationDays: number;
    needsOperator: boolean;
    needsTransport: boolean;
    projectGovernorate: IraqiGovernorate;
    projectCity: string;
    projectAddressDetails: string;
    notes?: string;
  }): RentalRequest => {
    const eq = listings.find(l => l.id === requestData.equipmentId) || equipmentToBook!;
    const opFee = requestData.needsOperator ? (eq.operatorDailyFeeIqd || 0) * requestData.durationDays : 0;
    const baseRental = eq.priceDailyIqd * requestData.durationDays;
    const total = baseRental + opFee;

    const start = new Date(requestData.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + requestData.durationDays);

    const newReq: RentalRequest = {
      id: `req-${Date.now().toString().slice(-5)}`,
      equipmentId: eq.id,
      equipmentTitle: eq.titleAr,
      equipmentCategory: eq.category,
      equipmentImageUrl: eq.imageUrl,
      providerId: eq.providerId,
      providerName: eq.providerName,
      customerId: currentUser?.id || 'guest-cust-anon',
      customerName: currentUser?.fullName || 'مقاول تجريبي',
      customerPhone: currentUser?.phone || '0770 000 0000',
      customerCompany: currentUser?.companyName,
      startDate: requestData.startDate,
      durationDays: requestData.durationDays,
      endDate: end.toISOString().split('T')[0],
      needsOperator: requestData.needsOperator,
      needsTransport: requestData.needsTransport,
      projectGovernorate: requestData.projectGovernorate,
      projectCity: requestData.projectCity,
      projectAddressDetails: requestData.projectAddressDetails,
      totalRentalPriceIqd: total,
      notes: requestData.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRentalRequests(prev => [newReq, ...prev]);

    if (currentUser && wallets[currentUser.id]) {
      const userWal = wallets[currentUser.id];
      setWallets(prev => ({
        ...prev,
        [currentUser.id]: {
          ...userWal,
          heldEscrowIqd: userWal.heldEscrowIqd + total,
          transactions: [
            {
              id: `tx-${Date.now().toString().slice(-4)}`,
              type: 'rental_escrow_hold',
              amountIqd: total,
              date: new Date().toISOString().split('T')[0],
              descriptionAr: `حجز ضمان تعاقد لطلب ${eq.titleAr} لمدة ${requestData.durationDays} أيام`,
              referenceId: newReq.id,
              status: 'pending'
            },
            ...userWal.transactions
          ]
        }
      }));
    }

    return newReq;
  };

  const updateRequestStatus = (requestId: string, newStatus: RequestStatus) => {
    setRentalRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r))
    );
  };

  // -------------------------------------------------------------
  // SUBSCRIPTION & CENTRAL PRICING ENGINE
  // -------------------------------------------------------------
  const updatePlanPrice = (planId: SubscriptionTierId, monthlyPriceIqd: number) => {
    setPricingSettings(prev => {
      const targetPlan = prev.plans[planId];
      if (!targetPlan) return prev;
      return {
        ...prev,
        plans: {
          ...prev.plans,
          [planId]: {
            ...targetPlan,
            priceMonthlyIqd,
            priceAnnualIqd: monthlyPriceIqd * 10 // شهران مجاناً
          }
        }
      };
    });
  };

  const checkSalePublishingEligibility = (): {
    eligible: boolean;
    reasonAr: string;
    requiredTier: string;
    priceMonthlyIqd: number;
  } => {
    const requiredPrice = pricingSettings.plans.pro_owner.priceMonthlyIqd;
    if (!currentUser) {
      return {
        eligible: false,
        reasonAr: 'يلزم تسجيل الدخول بحساب مالك معدات أو شركة للتمكن من نشر إعلانات البيع.',
        requiredTier: 'pro_owner',
        priceMonthlyIqd: requiredPrice
      };
    }

    // Companies, Dealerships, Shops, Workshops, or Admin are automatically eligible
    if (
      currentUser.role === 'company' ||
      currentUser.role === 'admin' ||
      currentUser.role === 'workshop' ||
      currentUser.role === 'shop'
    ) {
      return {
        eligible: true,
        reasonAr: 'حساب أعمال / وكالة معتمد مؤهل لنشر آليات البيع.',
        requiredTier: 'pro_owner',
        priceMonthlyIqd: requiredPrice
      };
    }

    // Individual owners require Pro Owner (20,000 IQD) or higher
    if (currentUser.role === 'owner') {
      const tier = currentUser.subscriptionTier || 'pro_owner';
      const isActive = currentUser.subscriptionActive ?? true;
      if (isActive && (tier === 'pro_owner' || tier === 'business' || tier === 'enterprise' || tier === 'fleet_enterprise')) {
        return {
          eligible: true,
          reasonAr: 'حساب مالك محترف مؤهل لنشر إعلانات البيع.',
          requiredTier: 'pro_owner',
          priceMonthlyIqd: requiredPrice
        };
      }
      return {
        eligible: false,
        reasonAr: `نشر آليات البيع للأفراد متاح حصرياً لمشتركي "باقة المالك المحترف (Pro Owner)" بسعر ${requiredPrice.toLocaleString()} د.ع شهرياً. باقتك الحالية مخصصة لتأجير المعدات فقط.`,
        requiredTier: 'pro_owner',
        priceMonthlyIqd: requiredPrice
      };
    }

    return {
      eligible: false,
      reasonAr: 'حسابك الحالي مسجل كـ "زبون / مقاول". لنشر معدات للبيع، يرجى التبديل لحساب مالك معدات مع باقة محترفة.',
      requiredTier: 'pro_owner',
      priceMonthlyIqd: requiredPrice
    };
  };

  const openAddSaleListingModal = () => {
    const eligibility = checkSalePublishingEligibility();
    if (!eligibility.eligible) {
      setIsSubscriptionUpgradeModalOpen(true);
      return;
    }
    setIsAddSaleListingModalOpen(true);
  };

  const closeAddSaleListingModal = () => setIsAddSaleListingModalOpen(false);
  const openSubscriptionUpgradeModal = () => setIsSubscriptionUpgradeModalOpen(true);
  const closeSubscriptionUpgradeModal = () => setIsSubscriptionUpgradeModalOpen(false);

  const upgradeSubscriptionDemo = (tier: SubscriptionTierId) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        subscriptionTier: tier,
        subscriptionActive: true,
        role: prev.role === 'customer' || prev.role === 'guest' ? 'owner' : prev.role
      } : null);
    }
    setIsSubscriptionUpgradeModalOpen(false);
    setIsAddSaleListingModalOpen(true);
  };

  // Sale listings management
  const selectedSaleListing = useMemo(() => {
    if (!selectedSaleListingId) return null;
    return saleListings.find(s => s.id === selectedSaleListingId) || null;
  }, [saleListings, selectedSaleListingId]);

  const openSaleDetails = (id: string) => setSelectedSaleListingId(id);
  const closeSaleDetails = () => setSelectedSaleListingId(null);

  const addNewSaleListing = (
    listingData: Omit<EquipmentSaleListing, 'id' | 'createdAt' | 'viewsCount' | 'moderationStatus'>
  ) => {
    const newId = `sale-${Date.now().toString().slice(-4)}`;
    const newListing: EquipmentSaleListing = {
      ...listingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      moderationStatus: 'approved'
    };
    setSaleListings(prev => [newListing, ...prev]);
    setIsAddSaleListingModalOpen(false);
  };

  const updateSaleListingStatus = (id: string, status: 'active' | 'paused' | 'sold') => {
    setSaleListings(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const deleteSaleListing = (id: string) => {
    setSaleListings(prev => prev.filter(s => s.id !== id));
  };

  // -------------------------------------------------------------
  // SPARE PARTS SHOP INVENTORY MANAGEMENT
  // -------------------------------------------------------------
  const selectedPart = useMemo(() => {
    if (!selectedPartId) return null;
    return spareParts.find(p => p.id === selectedPartId) || null;
  }, [spareParts, selectedPartId]);

  const openPartDetails = (id: string) => setSelectedPartId(id);
  const closePartDetails = () => setSelectedPartId(null);

  const openCreatePartModal = (partToEdit?: SparePartItem) => {
    setEditingPart(partToEdit || null);
    setIsCreatePartModalOpen(true);
  };

  const closeCreatePartModal = () => {
    setEditingPart(null);
    setIsCreatePartModalOpen(false);
  };

  const createSparePartListing = (
    partData: Omit<SparePartItem, 'id' | 'createdAt' | 'lastUpdated'>
  ) => {
    const newId = `part-${Date.now().toString().slice(-4)}`;
    const newPart: SparePartItem = {
      ...partData,
      id: newId,
      lastUpdated: 'الآن',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSpareParts(prev => [newPart, ...prev]);
    setIsCreatePartModalOpen(false);
    setEditingPart(null);
  };

  const updateSparePartListing = (id: string, updates: Partial<SparePartItem>) => {
    setSpareParts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, lastUpdated: 'الآن' } : p))
    );
    setIsCreatePartModalOpen(false);
    setEditingPart(null);
  };

  const deleteSparePartListing = (id: string) => {
    setSpareParts(prev => prev.filter(p => p.id !== id));
  };

  const updatePartStockAvailability = (
    id: string,
    availability: PartAvailability,
    quantity: number
  ) => {
    setSpareParts(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              availability,
              quantityAvailable: quantity,
              lastUpdated: 'الآن'
            }
          : p
      )
    );
  };

  const togglePartActiveStatus = (id: string) => {
    setSpareParts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const nextStatus = p.status === 'active' ? 'paused' : 'active';
        return { ...p, status: nextStatus, lastUpdated: 'الآن' };
      })
    );
  };

  // -------------------------------------------------------------
  // MAINTENANCE CENTERS & WORKSHOP PROMOTIONAL PUBLISHING
  // -------------------------------------------------------------
  const selectedWorkshop = useMemo(() => {
    if (!selectedWorkshopId) return null;
    return maintenanceCenters.find(m => m.id === selectedWorkshopId) || null;
  }, [maintenanceCenters, selectedWorkshopId]);

  const openWorkshopDetails = (id: string) => setSelectedWorkshopId(id);
  const closeWorkshopDetails = () => setSelectedWorkshopId(null);

  const openCreatePostModal = (postToEdit?: MaintenancePost) => {
    setEditingPost(postToEdit || null);
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setEditingPost(null);
    setIsCreatePostModalOpen(false);
  };

  const createMaintenancePost = (
    postData: Omit<MaintenancePost, 'id' | 'viewsCount' | 'inquiriesCount' | 'createdAt' | 'updatedAt'>
  ) => {
    const newId = `post-${Date.now().toString().slice(-4)}`;
    const newPost: MaintenancePost = {
      ...postData,
      id: newId,
      viewsCount: 1,
      inquiriesCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMaintenancePosts(prev => [newPost, ...prev]);
    setIsCreatePostModalOpen(false);
    setEditingPost(null);
  };

  const updateMaintenancePost = (id: string, updates: Partial<MaintenancePost>) => {
    setMaintenancePosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    setIsCreatePostModalOpen(false);
    setEditingPost(null);
  };

  const deleteMaintenancePost = (id: string) => {
    setMaintenancePosts(prev => prev.filter(p => p.id !== id));
  };

  const togglePostPublishStatus = (id: string) => {
    setMaintenancePosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const nextStatus = p.status === 'published' ? 'draft' : 'published';
        return { ...p, status: nextStatus, updatedAt: new Date().toISOString() };
      })
    );
  };

  // Inquiries
  const openInquiryModal = (target: {
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
  }) => {
    setInquiryTarget(target);
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setInquiryTarget(null);
  };

  const sendServiceInquiry = (inquiryData: {
    targetType: InquiryTargetType;
    targetId: string;
    targetTitle: string;
    targetPriceIqd?: number;
    targetProviderName: string;
    targetProviderPhone: string;
    message: string;
  }) => {
    const newInquiry: ServiceInquiry = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      targetType: inquiryData.targetType,
      targetId: inquiryData.targetId,
      targetTitle: inquiryData.targetTitle,
      targetPriceIqd: inquiryData.targetPriceIqd,
      targetProviderName: inquiryData.targetProviderName,
      targetProviderPhone: inquiryData.targetProviderPhone,
      requesterId: currentUser?.id || 'guest-inq',
      requesterName: currentUser?.fullName || 'مقاول مستفسر',
      requesterPhone: currentUser?.phone || '0770 000 0000',
      requesterGovernorate: currentUser?.governorate || 'بغداد',
      message: inquiryData.message,
      status: 'sent',
      createdAt: new Date().toISOString()
    };

    setServiceInquiries(prev => [newInquiry, ...prev]);
    closeInquiryModal();
  };

  // Rental Listings Management
  const openAddListingModal = () => setIsAddListingModalOpen(true);
  const closeAddListingModal = () => setIsAddListingModalOpen(false);

  const addNewListing = (
    listingData: Omit<EquipmentListing, 'id' | 'createdAt' | 'viewsCount' | 'moderationStatus'>
  ) => {
    const newId = `mach-${Date.now().toString().slice(-4)}`;
    const newListing: EquipmentListing = {
      ...listingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      moderationStatus: 'approved'
    };
    setListings(prev => [newListing, ...prev]);
    setIsAddListingModalOpen(false);
  };

  const updateListingAvailability = (id: string, status: AvailabilityStatus) => {
    setListings(prev => prev.map(l => (l.id === id ? { ...l, availabilityStatus: status } : l)));
  };

  const approveListingByAdmin = (id: string) => {
    setListings(prev => prev.map(l => (l.id === id ? { ...l, moderationStatus: 'approved' } : l)));
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  // Wallet
  const currentUserId = currentUser?.id || 'guest';
  const userWallet = useMemo(() => {
    return wallets[currentUserId] || {
      balanceIqd: 0,
      heldEscrowIqd: 0,
      pendingWithdrawalIqd: 0,
      currency: 'IQD' as const,
      transactions: []
    };
  }, [wallets, currentUserId]);

  const addDemoFunds = (amountIqd: number) => {
    if (!currentUser) return;
    setWallets(prev => {
      const current = prev[currentUser.id] || {
        balanceIqd: 0,
        heldEscrowIqd: 0,
        pendingWithdrawalIqd: 0,
        currency: 'IQD',
        transactions: []
      };
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          balanceIqd: current.balanceIqd + amountIqd,
          transactions: [
            {
              id: `tx-${Date.now().toString().slice(-4)}`,
              type: 'deposit',
              amountIqd,
              date: new Date().toISOString().split('T')[0],
              descriptionAr: 'شحن رصيد تجريبي (محاكاة)',
              status: 'completed'
            },
            ...current.transactions
          ]
        }
      };
    });
  };

  const requestDemoWithdrawal = (amountIqd: number): boolean => {
    if (!currentUser) return false;
    const current = wallets[currentUser.id];
    if (!current || current.balanceIqd < amountIqd) return false;

    setWallets(prev => ({
      ...prev,
      [currentUser.id]: {
        ...current,
        balanceIqd: current.balanceIqd - amountIqd,
        pendingWithdrawalIqd: current.pendingWithdrawalIqd + amountIqd,
        transactions: [
          {
            id: `tx-${Date.now().toString().slice(-4)}`,
            type: 'rental_payout',
            amountIqd,
            date: new Date().toISOString().split('T')[0],
            descriptionAr: 'طلب سحب أرباح تجريبية إلى الحساب المصرفي (محاكاة)',
            status: 'pending'
          },
          ...current.transactions
        ]
      }
    }));
    return true;
  };

  // Filtered Rental Listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (filterOptions.searchQuery.trim()) {
        const query = filterOptions.searchQuery.toLowerCase();
        const matchesQuery =
          item.titleAr.toLowerCase().includes(query) ||
          item.titleEn.toLowerCase().includes(query) ||
          item.manufacturer.toLowerCase().includes(query) ||
          item.modelName.toLowerCase().includes(query) ||
          item.governorate.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.descriptionAr.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }
      if (filterOptions.category !== 'all' && item.category !== filterOptions.category) return false;
      if (filterOptions.governorate !== 'all' && item.governorate !== filterOptions.governorate) return false;
      if (filterOptions.city.trim() && !item.city.toLowerCase().includes(filterOptions.city.toLowerCase())) return false;
      if (item.priceDailyIqd < filterOptions.minPriceDaily || item.priceDailyIqd > filterOptions.maxPriceDaily) return false;
      if (filterOptions.withOperatorOnly && !item.withOperator) return false;
      if (filterOptions.availabilityOnly && item.availabilityStatus !== 'available') return false;
      if (filterOptions.transportProvidedOnly && !item.transportProvided) return false;
      return true;
    }).sort((a, b) => {
      if (filterOptions.sortBy === 'price_asc') return a.priceDailyIqd - b.priceDailyIqd;
      if (filterOptions.sortBy === 'price_desc') return b.priceDailyIqd - a.priceDailyIqd;
      if (filterOptions.sortBy === 'power_desc') return b.specs.powerHorsepower - a.specs.powerHorsepower;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [listings, filterOptions]);

  // Filtered Sale Listings
  const filteredSaleListings = useMemo(() => {
    return saleListings.filter(item => {
      if (saleFilterOptions.searchQuery.trim()) {
        const query = saleFilterOptions.searchQuery.toLowerCase();
        const matches =
          item.titleAr.toLowerCase().includes(query) ||
          item.titleEn.toLowerCase().includes(query) ||
          item.manufacturer.toLowerCase().includes(query) ||
          item.modelName.toLowerCase().includes(query) ||
          item.governorate.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.descriptionAr.toLowerCase().includes(query);
        if (!matches) return false;
      }
      if (saleFilterOptions.category !== 'all' && item.category !== saleFilterOptions.category) return false;
      if (saleFilterOptions.governorate !== 'all' && item.governorate !== saleFilterOptions.governorate) return false;
      if (saleFilterOptions.city.trim() && !item.city.toLowerCase().includes(saleFilterOptions.city.toLowerCase())) return false;
      if (saleFilterOptions.condition !== 'all' && item.condition !== saleFilterOptions.condition) return false;
      if (saleFilterOptions.sellerType !== 'all' && item.sellerType !== saleFilterOptions.sellerType) return false;
      if (item.askingPriceIqd < saleFilterOptions.minPrice || item.askingPriceIqd > saleFilterOptions.maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (saleFilterOptions.sortBy === 'price_asc') return a.askingPriceIqd - b.askingPriceIqd;
      if (saleFilterOptions.sortBy === 'price_desc') return b.askingPriceIqd - a.askingPriceIqd;
      if (saleFilterOptions.sortBy === 'year_desc') return b.year - a.year;
      if (saleFilterOptions.sortBy === 'hours_asc') return (a.operatingHours || 0) - (b.operatingHours || 0);
      return 0;
    });
  }, [saleListings, saleFilterOptions]);

  // Filtered Spare Parts
  const filteredSpareParts = useMemo(() => {
    return spareParts.filter(item => {
      // Allow shop owners and admins to see paused listings; otherwise only show active
      const isPrivileged = currentUser && (currentUser.role === 'shop' || currentUser.role === 'admin');
      if (!isPrivileged && item.status === 'paused') return false;

      if (partFilterOptions.searchQuery.trim()) {
        const query = partFilterOptions.searchQuery.toLowerCase();
        const matches =
          item.titleAr.toLowerCase().includes(query) ||
          item.titleEn.toLowerCase().includes(query) ||
          item.partNumber.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          item.compatibleMachinesAr.toLowerCase().includes(query) ||
          item.storeName.toLowerCase().includes(query);
        if (!matches) return false;
      }
      if (partFilterOptions.category !== 'all' && item.category !== partFilterOptions.category) return false;
      if (partFilterOptions.governorate !== 'all' && item.governorate !== partFilterOptions.governorate) return false;
      if (partFilterOptions.brand.trim() && !item.brand.toLowerCase().includes(partFilterOptions.brand.toLowerCase())) return false;
      if (partFilterOptions.condition !== 'all' && item.condition !== partFilterOptions.condition) return false;
      if (partFilterOptions.availability !== 'all' && item.availability !== partFilterOptions.availability) return false;
      if (partFilterOptions.inStockOnly && item.availability === 'out_of_stock') return false;
      if (item.priceIqd < partFilterOptions.minPrice || item.priceIqd > partFilterOptions.maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (partFilterOptions.sortBy === 'price_asc') return a.priceIqd - b.priceIqd;
      if (partFilterOptions.sortBy === 'price_desc') return b.priceIqd - a.priceIqd;
      return 0;
    });
  }, [spareParts, partFilterOptions, currentUser]);

  // Filtered Maintenance Centers
  const filteredMaintenanceCenters = useMemo(() => {
    return maintenanceCenters.filter(item => {
      if (maintenanceFilterOptions.searchQuery.trim()) {
        const query = maintenanceFilterOptions.searchQuery.toLowerCase();
        const matches =
          item.centerNameAr.toLowerCase().includes(query) ||
          item.centerNameEn.toLowerCase().includes(query) ||
          item.governorate.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.descriptionAr.toLowerCase().includes(query) ||
          item.supportedBrandsAr.some(b => b.toLowerCase().includes(query));
        if (!matches) return false;
      }
      if (maintenanceFilterOptions.governorate !== 'all' && item.governorate !== maintenanceFilterOptions.governorate) return false;
      if (maintenanceFilterOptions.city.trim() && !item.city.toLowerCase().includes(maintenanceFilterOptions.city.toLowerCase())) return false;
      if (maintenanceFilterOptions.specialty !== 'all' && !item.specialties.includes(maintenanceFilterOptions.specialty)) return false;
      if (maintenanceFilterOptions.hasMobileWorkshopOnly && !item.hasMobileWorkshop) return false;
      return true;
    }).sort((a, b) => {
      if (maintenanceFilterOptions.sortBy === 'name_asc') return a.centerNameAr.localeCompare(b.centerNameAr);
      return b.rating - a.rating;
    });
  }, [maintenanceCenters, maintenanceFilterOptions]);

  const resetFilters = () => setFilterOptions(DEFAULT_RENTAL_FILTERS);
  const resetSaleFilters = () => setSaleFilterOptions(DEFAULT_SALE_FILTERS);
  const resetPartFilters = () => setPartFilterOptions(DEFAULT_PART_FILTERS);
  const resetMaintenanceFilters = () => setMaintenanceFilterOptions(DEFAULT_MAINTENANCE_FILTERS);

  const dismissDemoNotice = () => setIsDemoNoticeVisible(false);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentService,
        setCurrentService,
        selectedCategoryFromHero,
        setSelectedCategoryFromHero,
        currentRole,
        currentUser,
        switchRole,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        loginWithRole,
        logout,
        // Pricing Engine
        pricingSettings,
        updatePlanPrice,
        // Rental
        listings,
        filteredListings,
        filterOptions,
        setFilterOptions,
        resetFilters,
        selectedEquipment,
        openEquipmentDetails,
        closeEquipmentDetails,
        selectedProviderId,
        openProviderProfile,
        closeProviderProfile,
        favorites,
        toggleFavorite,
        isFavorite,
        isBookingModalOpen,
        equipmentToBook,
        openBookingModal,
        closeBookingModal,
        rentalRequests,
        createRentalRequest,
        updateRequestStatus,
        // Sales
        saleListings,
        filteredSaleListings,
        saleFilterOptions,
        setSaleFilterOptions,
        resetSaleFilters,
        selectedSaleListing,
        openSaleDetails,
        closeSaleDetails,
        addNewSaleListing,
        updateSaleListingStatus,
        deleteSaleListing,
        isAddSaleListingModalOpen,
        openAddSaleListingModal,
        closeAddSaleListingModal,
        checkSalePublishingEligibility,
        isSubscriptionUpgradeModalOpen,
        openSubscriptionUpgradeModal,
        closeSubscriptionUpgradeModal,
        upgradeSubscriptionDemo,
        // Parts & Shop Management
        spareParts,
        filteredSpareParts,
        partFilterOptions,
        setPartFilterOptions,
        resetPartFilters,
        selectedPart,
        openPartDetails,
        closePartDetails,
        createSparePartListing,
        updateSparePartListing,
        deleteSparePartListing,
        updatePartStockAvailability,
        togglePartActiveStatus,
        isCreatePartModalOpen,
        editingPart,
        openCreatePartModal,
        closeCreatePartModal,
        // Maintenance & Workshop Publishing
        maintenanceCenters,
        filteredMaintenanceCenters,
        maintenanceFilterOptions,
        setMaintenanceFilterOptions,
        resetMaintenanceFilters,
        selectedWorkshop,
        openWorkshopDetails,
        closeWorkshopDetails,
        maintenancePosts,
        createMaintenancePost,
        updateMaintenancePost,
        deleteMaintenancePost,
        togglePostPublishStatus,
        isCreatePostModalOpen,
        editingPost,
        openCreatePostModal,
        closeCreatePostModal,
        // Inquiries
        serviceInquiries,
        sendServiceInquiry,
        isInquiryModalOpen,
        inquiryTarget,
        openInquiryModal,
        closeInquiryModal,
        // Listing
        isAddListingModalOpen,
        openAddListingModal,
        closeAddListingModal,
        addNewListing,
        updateListingAvailability,
        approveListingByAdmin,
        deleteListing,
        // Wallet
        userWallet,
        addDemoFunds,
        requestDemoWithdrawal,
        isDemoNoticeVisible,
        dismissDemoNotice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
