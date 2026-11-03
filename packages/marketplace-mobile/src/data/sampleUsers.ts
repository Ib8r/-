import { UserProfile, UserWallet, RentalRequest } from '../types';

export const SAMPLE_USERS: Record<string, UserProfile> = {
  customer: {
    id: 'user-cust-01',
    username: 'hayder_contractor',
    fullName: 'م. حيدر المعماري',
    email: 'hayder.engineer@rafidain-iq.com',
    phone: '0770 941 2233',
    role: 'customer',
    governorate: 'بغداد',
    city: 'المنصور / الرصافة',
    createdAt: '2026-03-12',
    verified: true,
    companyName: 'مجموعة الرافدين للمقاولات العامة والإنشاءات'
  },
  owner: {
    id: 'user-owner-01',
    username: 'ahmed_badri',
    fullName: 'المقاول أحمد البدري',
    email: 'ahmed.badri@machinix-demo.iq',
    phone: '0771 555 4321',
    role: 'owner',
    governorate: 'نينوى',
    city: 'الموصل - وادي عكاب',
    createdAt: '2026-01-15',
    verified: true,
    fleetSize: 3
  },
  company: {
    id: 'user-comp-01',
    username: 'dijlah_fleets',
    fullName: 'شركة دجلة والفرات للآليات الإنشائية',
    email: 'info@dijla-furat-machinery.iq',
    phone: '0770 123 4567',
    role: 'company',
    governorate: 'بغداد',
    city: 'التاجي - المنطقة اللوجستية',
    createdAt: '2025-11-20',
    verified: true,
    companyName: 'شركة دجلة والفرات للتجارة والآليات العامة ذ.م.م',
    commercialRegistrationNumber: 'IQ-BGD-2021-99432',
    fleetSize: 24
  },
  workshop: {
    id: 'user-workshop-01',
    username: 'furat_hydraulics',
    fullName: 'م. ثائر الكرخي (ورشة الفرات)',
    email: 'info@furat-hydraulics.iq',
    phone: '0771 234 5678',
    role: 'workshop',
    governorate: 'بغداد',
    city: 'الشيخ عمر الصناعية',
    createdAt: '2026-02-10',
    verified: true,
    companyName: 'ورشة الفرات لصيانة وتجديد الهيدروليك الثقيل',
    subscriptionTier: 'business',
    subscriptionActive: true
  },
  shop: {
    id: 'user-shop-01',
    username: 'dijlah_parts',
    fullName: 'الحاج فوزي السعدي (مؤسسة دجلة)',
    email: 'sales@dijlah-parts.iq',
    phone: '0770 333 4455',
    role: 'shop',
    governorate: 'بغداد',
    city: 'السنك - شارع الرشيد الصناعي',
    createdAt: '2026-01-20',
    verified: true,
    companyName: 'مؤسسة دجلة لقطع غيار الهيدروليك والمعدات الثقيلة',
    subscriptionTier: 'business',
    subscriptionActive: true
  },
  admin: {
    id: 'user-admin-01',
    username: 'admin_machinix',
    fullName: 'إدارة الرقابة والعمليات — ماشينكس',
    email: 'operations@machinix.iq',
    phone: '0780 000 1122',
    role: 'admin',
    governorate: 'بغداد',
    city: 'الجادرية',
    createdAt: '2025-01-01',
    verified: true
  }
};

export const SAMPLE_WALLETS: Record<string, UserWallet> = {
  'user-cust-01': {
    balanceIqd: 4500000,
    heldEscrowIqd: 1250000,
    pendingWithdrawalIqd: 0,
    currency: 'IQD',
    transactions: [
      {
        id: 'tx-001',
        type: 'rental_escrow_hold',
        amountIqd: 1250000,
        date: '2026-10-27',
        descriptionAr: 'حجز مبلغ الضمان لطلب استئجار حفارة كوماتسو PC1250',
        referenceId: 'req-001',
        status: 'pending'
      },
      {
        id: 'tx-002',
        type: 'deposit',
        amountIqd: 5000000,
        date: '2026-10-20',
        descriptionAr: 'شحن رصيد تجريبي لحساب المقاول (محاكاة)',
        status: 'completed'
      }
    ]
  },
  'user-owner-01': {
    balanceIqd: 3200000,
    heldEscrowIqd: 700000,
    pendingWithdrawalIqd: 1500000,
    currency: 'IQD',
    transactions: [
      {
        id: 'tx-101',
        type: 'rental_payout',
        amountIqd: 1050000,
        date: '2026-10-25',
        descriptionAr: 'مستحقات تأجير مولدة ديزل 500kVA لمشروع مستشفى الموصل',
        referenceId: 'req-003',
        status: 'completed'
      },
      {
        id: 'tx-102',
        type: 'subscription_fee',
        amountIqd: 150000,
        date: '2026-10-01',
        descriptionAr: 'اشتراك باقة المالك المحترف (محاكاة)',
        status: 'completed'
      }
    ]
  },
  'user-comp-01': {
    balanceIqd: 18450000,
    heldEscrowIqd: 4500000,
    pendingWithdrawalIqd: 5000000,
    currency: 'IQD',
    transactions: [
      {
        id: 'tx-201',
        type: 'rental_payout',
        amountIqd: 7500000,
        date: '2026-10-26',
        descriptionAr: 'عوائد عقد أسبوعي لشفل كاتربيلر 988K - حقل الزبير',
        referenceId: 'req-002',
        status: 'completed'
      },
      {
        id: 'tx-202',
        type: 'platform_commission',
        amountIqd: 375000,
        date: '2026-10-26',
        descriptionAr: 'عمولة المنصة المخفضة لباقة الأساطيل (5%)',
        status: 'completed'
      }
    ]
  }
};

export const INITIAL_RENTAL_REQUESTS: RentalRequest[] = [
  {
    id: 'req-001',
    equipmentId: 'mach-001',
    equipmentTitle: 'حفارة مجنزرة ثقيلة كوماتسو PC1250 مع باكت صخري',
    equipmentCategory: 'excavator',
    equipmentImageUrl: '/src/assets/images/machinix_hero_excavator_1793210155649.jpg',
    providerId: 'prov-001',
    providerName: 'شركة دجلة والفرات للآليات الإنشائية',
    customerId: 'user-cust-01',
    customerName: 'م. حيدر المعماري',
    customerPhone: '0770 941 2233',
    customerCompany: 'مجموعة الرافدين للمقاولات',
    startDate: '2026-11-01',
    durationDays: 5,
    endDate: '2026-11-06',
    needsOperator: true,
    needsTransport: true,
    projectGovernorate: 'بغداد',
    projectCity: 'بسماية - مشروع توسعة الطريق الدائري',
    projectAddressDetails: 'القطاع الرابع، قرب جسر الرستمية الجديد',
    totalRentalPriceIqd: 6250000,
    notes: 'نحتاج مشغل ذو خبرة عالية بقطع التربة الحصوية والطبقات الجبسية القاسية.',
    status: 'pending',
    createdAt: '2026-10-27T14:30:00Z',
    updatedAt: '2026-10-27T14:30:00Z'
  },
  {
    id: 'req-002',
    equipmentId: 'mach-003',
    equipmentTitle: 'رافعة كرين ليبهير 70 طن هيدروليكي للمشاريع والجسور',
    equipmentCategory: 'crane',
    equipmentImageUrl: '/src/assets/images/machinix_mobile_crane_1793210156963.jpg',
    providerId: 'prov-003',
    providerName: 'رافد البناء لتأجير الرافعات الهيدروليكية',
    customerId: 'user-cust-01',
    customerName: 'م. حيدر المعماري',
    customerPhone: '0770 941 2233',
    customerCompany: 'مجموعة الرافدين للمقاولات',
    startDate: '2026-10-22',
    durationDays: 3,
    endDate: '2026-10-25',
    needsOperator: true,
    needsTransport: true,
    projectGovernorate: 'أربيل',
    projectCity: 'عين كاوة',
    projectAddressDetails: 'موقع إنشاء المجمع التجاري الجديد',
    totalRentalPriceIqd: 4200000,
    notes: 'رفع مقاطع حديدية سابقة الصب وتركيب مظلات السقف.',
    status: 'in_progress',
    createdAt: '2026-10-20T09:15:00Z',
    updatedAt: '2026-10-22T08:00:00Z'
  },
  {
    id: 'req-003',
    equipmentId: 'mach-004',
    equipmentTitle: 'مولدة كهرباء ديزل صناعية كاتربيلر 500kVA كاتمة للصوت',
    equipmentCategory: 'generator',
    equipmentImageUrl: '/src/assets/images/machinix_industrial_generator_1793210157128.jpg',
    providerId: 'prov-004',
    providerName: 'المقاول أحمد البدري للآليات المستقلة',
    customerId: 'user-cust-02',
    customerName: 'شركة الإعمار الهندسي',
    customerPhone: '0774 333 8811',
    startDate: '2026-10-10',
    durationDays: 7,
    endDate: '2026-10-17',
    needsOperator: false,
    needsTransport: true,
    projectGovernorate: 'نينوى',
    projectCity: 'الموصل - الساحل الأيسر',
    projectAddressDetails: 'مشروع مجمع المدارس النموذجية',
    totalRentalPriceIqd: 2100000,
    notes: 'تم استلام وتوليد الطاقة بنجاح وتم إرجاع المولد.',
    status: 'completed',
    createdAt: '2026-10-08T11:00:00Z',
    updatedAt: '2026-10-17T18:00:00Z'
  }
];
