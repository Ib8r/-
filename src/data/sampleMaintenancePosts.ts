/**
 * Machinix Sample Maintenance Center Promotional Posts
 * Realistic showcase announcements from Iraqi heavy-equipment repair workshops
 * (Sheikh Omar, Al-Sanak, Erbil Industrial Zone, Zubair Oil Fields).
 */

import { MaintenancePost } from '../types';

export const INITIAL_MAINTENANCE_POSTS: MaintenancePost[] = [
  {
    id: 'post_hyd_001',
    centerId: 'workshop_001',
    centerNameAr: 'ورشة الفرات لصيانة الهيدروليك الثقيل',
    governorate: 'بغداد',
    city: 'الشيخ عمر الصناعية',
    phone: '0771 234 5678',
    specialty: 'hydraulics',
    titleAr: 'عمرة وتجديد مضخات كوماتسو PC400 وضبط ضغط البساتن الهيدروليكية',
    contentAr: 'أنجز فريق الورشة بنجاح إعادة توضيب وتجديد كامل لمضخة هيدروليكية رئيسية (Main Hydraulic Pump) لحفارة كوماتسو PC400 تعمل في مشروع جسر بغداد المعلق. تم استبدال البساتن الميكانيكية بقطع أصلية Komatsu Genuine وضبط صمام الأمان بدقة 350 بار على منصة الفحص الهيدروليكي الآلية. ضمان تشغيلي لمدة 6 أشهر.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'published',
    viewsCount: 1420,
    inquiriesCount: 18,
    createdAt: '2026-10-24T09:30:00Z',
    updatedAt: '2026-10-24T09:30:00Z'
  },
  {
    id: 'post_eng_002',
    centerId: 'workshop_002',
    centerNameAr: 'مركز دجلة لصيانة وتجفيت محركات الديزل',
    governorate: 'أربيل',
    city: 'المنطقة الصناعية الجنوبية',
    phone: '0750 876 5432',
    specialty: 'diesel_engines',
    titleAr: 'تجهيز وتجفيت محرك CAT C15 ديزل للمولدات والآليات التعدينية',
    contentAr: 'نوفر خدمة تجفيت كاملة لمحركات كاتربيلر C15 و C18 مع فحص ومعايرة بخاخات ديزل كومن ريل (Common Rail Injectors) بالليزر على أحدث أجهزة Bosch EPS 205. الورشة مجهزة برافعات ونش 15 طن لاستقبال المحركات الضخمة من كافة محافظات إقليم كردستان وكركوك ونينوى. نوفر قطع الغيار الأصلية فوراً من مخزننا الملحق.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    status: 'published',
    viewsCount: 980,
    inquiriesCount: 12,
    createdAt: '2026-10-26T14:15:00Z',
    updatedAt: '2026-10-26T14:15:00Z'
  },
  {
    id: 'post_mob_003',
    centerId: 'workshop_003',
    centerNameAr: 'ورشة الجنوب المتنقلة لطوارئ الحقول النفطية',
    governorate: 'البصرة',
    city: 'حقل الزبير - طريق سفوان',
    phone: '0780 112 2334',
    specialty: 'mobile_field',
    titleAr: 'خدمة التدخل السريع 24/7 للآليات المتعطلة في مواقع المشاريع والحقول',
    contentAr: 'سيارات الورشة المتنقلة مجهزة بمولدات هواء، مكائن لحام صخري، معدات كبس خراطيم هيدروليكية حتى قطر 2 بوصة، وأجهزة كشف الأعطال بالكمبيوتر (CAT ET & Cummins Insite). نصل إلى موقعك في حقول الرميلة وغرب القرنة والزبير خلال ساعتين من البلاغ للحد من توقف الإنتاج وساعات الانتظار المكلفة.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'published',
    viewsCount: 2150,
    inquiriesCount: 34,
    createdAt: '2026-10-27T11:00:00Z',
    updatedAt: '2026-10-27T11:00:00Z'
  },
  {
    id: 'post_elec_004',
    centerId: 'workshop_004',
    centerNameAr: 'المحترف لفحص وبرمجة كمبيوترات الآليات والكرينات',
    governorate: 'نينوى',
    city: 'الموصل - صناعة الكرامة',
    phone: '0770 998 8776',
    specialty: 'electrical',
    titleAr: 'فحص منظومات الحساسات وضفائر الكهرباء لكرينات ليبهير وتادانو',
    contentAr: 'حل مشكلات أنظمة أمان الكرينات (LICCON / PAT LMI)، تصليح وحدات التحكم الإلكترونية (ECM) وتحديث سوفتوير لوحات القيادة لحفارات فولفو ودووسان بدون الحاجة لاستبدال الكمبيوتر بالكامل. فحص شامل للشبكة الكهربائية CAN-Bus لتحديد نقاط الالتماس الناتجة عن الغبار والرطوبة.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'published',
    viewsCount: 760,
    inquiriesCount: 9,
    createdAt: '2026-10-28T08:20:00Z',
    updatedAt: '2026-10-28T08:20:00Z'
  }
];
