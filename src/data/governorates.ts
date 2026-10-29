import { GovernorateDetail, IraqiGovernorate } from '../types';

export const IRAQI_GOVERNORATES: GovernorateDetail[] = [
  {
    id: 'baghdad',
    nameAr: 'بغداد',
    nameEn: 'Baghdad',
    isMajorHub: true,
    commonIndustrialDistricts: ['الكرخ', 'الرصافة', 'المنطقة الصناعية - البياع', 'كمب سارة', 'أبو غريب', 'التاجي', 'الزعفرانية']
  },
  {
    id: 'basra',
    nameAr: 'البصرة',
    nameEn: 'Basra',
    isMajorHub: true,
    commonIndustrialDistricts: ['خور الزبير', 'أم قصر', 'البرجسية - حقول النفط', 'الهارثة', 'منطقة المعقل الصناعية', 'القرنة']
  },
  {
    id: 'erbil',
    nameAr: 'أربيل',
    nameEn: 'Erbil',
    isMajorHub: true,
    commonIndustrialDistricts: ['عين كاوة', 'طريق كركوك الصناعي', 'طريق الموصل', 'بحركة', 'المنطقة الصناعية الشمالية']
  },
  {
    id: 'nineveh',
    nameAr: 'نينوى',
    nameEn: 'Nineveh (Mosul)',
    isMajorHub: true,
    commonIndustrialDistricts: ['الموصل - الساحل الأيسر', 'الموصل - الساحل الأيمن', 'وادي عكاب الصناعي', 'الحمدانية', 'تلعفر']
  },
  {
    id: 'sulaymaniyah',
    nameAr: 'السليمانية',
    nameEn: 'Sulaymaniyah',
    isMajorHub: true,
    commonIndustrialDistricts: ['المنطقة الصناعية في بكره جو', 'بازيان', 'طاسلوجة', 'جمجمال', 'رابرين']
  },
  {
    id: 'najaf',
    nameAr: 'النجف',
    nameEn: 'Najaf',
    isMajorHub: true,
    commonIndustrialDistricts: ['المنطقة الحرفية الشمالية', 'الكوفة', 'طريق كربلاء - النجف', 'المناذرة', 'حي النصر']
  },
  {
    id: 'karbala',
    nameAr: 'كربلاء',
    nameEn: 'Karbala',
    isMajorHub: false,
    commonIndustrialDistricts: ['المنطقة الصناعية - طريق النجف', 'الهندية', 'عين التمر', 'الحر']
  },
  {
    id: 'kirkuk',
    nameAr: 'كركوك',
    nameEn: 'Kirkuk',
    isMajorHub: false,
    commonIndustrialDistricts: ['الصناعة القديمة', 'الصناعة الجديدة', 'الحويجة', 'دبس', 'داقوق']
  },
  {
    id: 'anbar',
    nameAr: 'الأنبار',
    nameEn: 'Anbar',
    isMajorHub: false,
    commonIndustrialDistricts: ['الرمادي - المنطقة الصناعية', 'الفلوجة', 'هيت', 'القائم', 'حديثة']
  },
  {
    id: 'duhok',
    nameAr: 'دهوك',
    nameEn: 'Duhok',
    isMajorHub: false,
    commonIndustrialDistricts: ['المنطقة الصناعية بدهوك', 'زاخو - منفذ إبراهيم الخليل', 'سميل', 'عقرة']
  },
  {
    id: 'babil',
    nameAr: 'بابل',
    nameEn: 'Babil (Hilla)',
    isMajorHub: false,
    commonIndustrialDistricts: ['الحلة - المنطقة الصناعية', 'المسيب', 'المحاويل', 'الإسكندرية للآليات الميكانيكية']
  },
  {
    id: 'diyala',
    nameAr: 'ديالى',
    nameEn: 'Diyala',
    isMajorHub: false,
    commonIndustrialDistricts: ['بعقوبة - حي المعلمين الصناعي', 'الخالص', 'خانقين', 'المقدادية']
  },
  {
    id: 'wasit',
    nameAr: 'واسط',
    nameEn: 'Wasit',
    isMajorHub: false,
    commonIndustrialDistricts: ['الكوت - المنطقة الصناعية', 'الصويرة', 'النعمانية', 'بدرة - حقل بدرة النفطي']
  },
  {
    id: 'maysan',
    nameAr: 'ميسان',
    nameEn: 'Maysan',
    isMajorHub: false,
    commonIndustrialDistricts: ['العمارة - الحي الصناعي', 'علي الغربي', 'المجر الكبير', 'حقول الحلفاية']
  },
  {
    id: 'dhiqar',
    nameAr: 'ذي قار',
    nameEn: 'Dhi Qar',
    isMajorHub: false,
    commonIndustrialDistricts: ['الناصرية - المنطقة الصناعية', 'سوق الشيوخ', 'الشطرة', 'الرفاعي']
  },
  {
    id: 'muthanna',
    nameAr: 'المثنى',
    nameEn: 'Muthanna',
    isMajorHub: false,
    commonIndustrialDistricts: ['السماوة - الحي الصناعي', 'الرميثة', 'الخضر', 'بادية المثنى']
  },
  {
    id: 'qadisiyyah',
    nameAr: 'القادسية',
    nameEn: 'Qadisiyyah',
    isMajorHub: false,
    commonIndustrialDistricts: ['الديوانية - المنطقة الصناعية', 'الشامية', 'عفك', 'الحمزة']
  },
  {
    id: 'saladin',
    nameAr: 'صلاح الدين',
    nameEn: 'Saladin',
    isMajorHub: false,
    commonIndustrialDistricts: ['تكريت - المنطقة الصناعية', 'بيجي - مصفى بيجي', 'سامراء', 'بلد', 'الدور']
  }
];

export const CATEGORY_LABELS: Record<string, { ar: string; en: string; icon: string; count: number }> = {
  excavator: { ar: 'حفارات هيدروليكية', en: 'Hydraulic Excavators', icon: 'Tractor', count: 48 },
  bulldozer: { ar: 'بلدوزرات تسوية', en: 'Bulldozers', icon: 'Hammer', count: 26 },
  wheel_loader: { ar: 'شيافل ولوادر', en: 'Wheel Loaders', icon: 'Truck', count: 35 },
  crane: { ar: 'رافعات كرين وبرجية', en: 'Mobile & Tower Cranes', icon: 'Building2', count: 22 },
  dump_truck: { ar: 'شاحنات قلاب / لوريات', en: 'Heavy Dump Trucks', icon: 'Boxes', count: 40 },
  forklift: { ar: 'رافعات شوكية', en: 'Forklifts', icon: 'Warehouse', count: 19 },
  generator: { ar: 'مولدات كهرباء صناعية', en: 'Industrial Diesel Generators', icon: 'Zap', count: 31 },
  other: { ar: 'مداحل ومضخات وكريدرات', en: 'Rollers, Pumps & Graders', icon: 'Wrench', count: 18 },
};
