export interface GovernorateGeo {
  id: string;
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  capitalEn: string;
  region: 'central' | 'south' | 'north' | 'west' | 'kurdistan';
  lat: number;
  lng: number;
  x: number;
  y: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
  isHub: boolean;
  services: ('rental' | 'sales' | 'parts' | 'maintenance')[];
  districtsAr: string[];
  districtsEn: string[];
  activeFleetTypes: string[];
  highwayCorridorAr: string;
  highwayCorridorEn: string;
}

export interface NetworkConnection {
  id: string;
  fromId: string;
  toId: string;
  nameAr: string;
  nameEn: string;
  type: 'primary' | 'secondary';
}

export interface CountryData {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  status: 'active' | 'expansion_planned';
  statusLabelAr: string;
  statusLabelEn: string;
  hubCityAr: string;
  hubCityEn: string;
  governoratesCount: number;
  summaryAr: string;
  summaryEn: string;
}

// Iraq national boundary outline in 800x700 coordinate space
export const IRAQ_BORDER_POINTS: [number, number][] = [
  [335, 35],  // Zakho / Khabur (Turkey border)
  [405, 42],  // Amadiya
  [450, 60],  // Soran / Bradost
  [510, 85],  // Haji Umran / Iran tripoint
  [555, 125], // Penjwin
  [595, 175], // Halabja / Hawraman
  [570, 240], // Darbandikhan / Khanaqin
  [590, 290], // Mandali border
  [620, 360], // Mehran / Zurbatiyah
  [680, 420], // Ali al-Gharbi / Iran border
  [710, 465], // Fakka oil fields
  [745, 520], // Majnoon / Huwaiza
  [770, 575], // Shalamcheh / Basra east
  [775, 620], // Al-Fao / Shatt al-Arab
  [750, 630], // Khor Abd Allah
  [725, 600], // Um Qasr / Kuwait border
  [680, 585], // Safwan border
  [610, 565], // Batin valley
  [535, 545], // Salman / Saudi border
  [450, 510], // Shabakah / Saudi border
  [360, 455], // Judayyidat Arar
  [270, 415], // Nukhaib south
  [175, 380], // Rutba south / Saudi-Jordan tripoint
  [110, 345], // Trebil (Jordan crossing)
  [70, 305],  // Tanf / Syrian border
  [120, 265], // Al-Walid
  [225, 230], // Al-Qaim (Euphrates entry)
  [280, 185], // Jazira desert
  [330, 130], // Sinjar / Rabia
  [320, 75],  // Fishkhabur tripoint
  [335, 35],  // Zakho
];

export const IRAQ_BORDER_PATH =
  IRAQ_BORDER_POINTS.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ') + ' Z';

// Verified 19 Administrative Governorates of Iraq with projected coordinates
export const IRAQ_GOVERNORATES: GovernorateGeo[] = [
  {
    id: 'baghdad',
    nameAr: 'بغداد',
    nameEn: 'Baghdad',
    capitalAr: 'بغداد (العاصمة)',
    capitalEn: 'Baghdad (Capital)',
    region: 'central',
    lat: 33.3152,
    lng: 44.3661,
    x: 452,
    y: 344,
    labelOffsetX: 12,
    labelOffsetY: -12,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الكرخ', 'الرصافة', 'البياع الصناعية', 'كمب سارة', 'التاجي', 'الزعفرانية'],
    districtsEn: ['Karkh', 'Rusafa', 'Bayaa Industrial', 'Camp Sarah', 'Taji', 'Zafaraniya'],
    activeFleetTypes: ['حفارات مجنزرة', 'لوادر شيافل', 'رافعات كرين', 'مولدات كهرباء', 'شاحنات قلاب'],
    highwayCorridorAr: 'تقاطع الخط السريع الدولي M1 ومحور طريق بغداد - الشمال',
    highwayCorridorEn: 'International Highway M1 & North Expressway Junction',
  },
  {
    id: 'basra',
    nameAr: 'البصرة',
    nameEn: 'Basra',
    capitalAr: 'البصرة',
    capitalEn: 'Basra',
    region: 'south',
    lat: 30.5085,
    lng: 47.7804,
    x: 720,
    y: 575,
    labelOffsetX: -14,
    labelOffsetY: 14,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['خور الزبير', 'أم قصر', 'البرجسية النفطية', 'المعقل الصناعية', 'القرنة'],
    districtsEn: ['Khor Al-Zubair', 'Umm Qasr Port', 'Barjisiyah Oilfields', 'Maqal Industrial', 'Qurna'],
    activeFleetTypes: ['رافعات ثقيلة للموانئ', 'حفارات نفطية', 'شاحنات نقل ثقيل', 'مضخات هيدروليكية'],
    highwayCorridorAr: 'محور موانئ أم قصر وخور الزبير - الخط السريع الدولي',
    highwayCorridorEn: 'Umm Qasr & Khor Al-Zubair Ports - International Expressway',
  },
  {
    id: 'nineveh',
    nameAr: 'نينوى',
    nameEn: 'Nineveh (Mosul)',
    capitalAr: 'الموصل',
    capitalEn: 'Mosul',
    region: 'north',
    lat: 36.3489,
    lng: 43.1577,
    x: 357,
    y: 94,
    labelOffsetX: -15,
    labelOffsetY: -10,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['وادي عكاب الصناعي', 'الساحل الأيسر', 'الساحل الأيمن', 'الحمدانية', 'تلعفر'],
    districtsEn: ['Wadi Okab Industrial', 'Left Bank', 'Right Bank', 'Hamdaniya', 'Tal Afar'],
    activeFleetTypes: ['بلدوزرات تسوية', 'حفارات أنقاض وإعمار', 'شاحنات خرسانة', 'مداحل زفتية'],
    highwayCorridorAr: 'طريق الموصل - بغداد الدولي ومحور طريق ربيعة الحدودي',
    highwayCorridorEn: 'Mosul - Baghdad Expressway & Rabia Border Corridor',
  },
  {
    id: 'erbil',
    nameAr: 'أربيل',
    nameEn: 'Erbil',
    capitalAr: 'أربيل',
    capitalEn: 'Erbil',
    region: 'kurdistan',
    lat: 36.1911,
    lng: 44.0091,
    x: 424,
    y: 108,
    labelOffsetX: 14,
    labelOffsetY: -8,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['المنطقة الصناعية الشمالية', 'طريق كركوك', 'طريق الموصل', 'بحركة', 'عين كاوة'],
    districtsEn: ['North Industrial Zone', 'Kirkuk Road', 'Mosul Road', 'Baharka', 'Ankawa'],
    activeFleetTypes: ['آليات حفر صخور', 'كرينات عملاقة', 'شيافل كوماتسو وكاتربيلر', 'معدات أنفاق'],
    highwayCorridorAr: 'الطريق السريع 100م و 120م ومحور أربيل - كركوك - بغداد',
    highwayCorridorEn: '100m & 120m Ring Highways & Erbil-Kirkuk-Baghdad Corridor',
  },
  {
    id: 'sulaymaniyah',
    nameAr: 'السليمانية',
    nameEn: 'Sulaymaniyah',
    capitalAr: 'السليمانية',
    capitalEn: 'Sulaymaniyah',
    region: 'kurdistan',
    lat: 35.5669,
    lng: 45.4167,
    x: 535,
    y: 159,
    labelOffsetX: 12,
    labelOffsetY: -10,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['بكره جو الصناعية', 'بازيان لمعامل السمنت', 'طاسلوجة', 'جمجمال'],
    districtsEn: ['Bakrajo Industrial', 'Bazian Cement Hub', 'Tasluja', 'Chamchamal'],
    activeFleetTypes: ['كسارات صخور ومعادن', 'بلدوزرات جبلية', 'شاحنات مقالع', 'شيافل'],
    highwayCorridorAr: 'محور بازيان - السليمانية وطريق كركوك الرابط',
    highwayCorridorEn: 'Bazian - Sulaymaniyah Corridor & Kirkuk Link',
  },
  {
    id: 'duhok',
    nameAr: 'دهوك',
    nameEn: 'Duhok',
    capitalAr: 'دهوك',
    capitalEn: 'Duhok',
    region: 'kurdistan',
    lat: 36.8667,
    lng: 42.9833,
    x: 343,
    y: 52,
    labelOffsetX: -14,
    labelOffsetY: -12,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['المنطقة الصناعية بدهوك', 'زاخو - منفذ إبراهيم الخليل', 'سميل', 'عقرة'],
    districtsEn: ['Duhok Industrial', 'Zakho Ibrahim Khalil Port', 'Semel', 'Akre'],
    activeFleetTypes: ['شاحنات نقل دولي', 'رافعات جسور', 'حفارات جبلية', 'كريدرات'],
    highwayCorridorAr: 'منفذ إبراهيم الخليل الحدودي - شريان النقل البري الدولي',
    highwayCorridorEn: 'Ibrahim Khalil Border Crossing - International Transit Artery',
  },
  {
    id: 'halabja',
    nameAr: 'حلبجة',
    nameEn: 'Halabja',
    capitalAr: 'حلبجة',
    capitalEn: 'Halabja',
    region: 'kurdistan',
    lat: 35.1778,
    lng: 45.9861,
    x: 580,
    y: 191,
    labelOffsetX: 12,
    labelOffsetY: 8,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['مركز حلبجة', 'سيروان', 'خورمال', 'بيارة - الحدود الشرقية'],
    districtsEn: ['Halabja Center', 'Sirwan', 'Khurmal', 'Byara Eastern Border'],
    activeFleetTypes: ['آليات زراعية واستصلاح', 'حفارات خفيفة ومتوسطة', 'شاحنات تفريغ'],
    highwayCorridorAr: 'محور حلبجة - سيد صادق - السليمانية',
    highwayCorridorEn: 'Halabja - Said Sadiq - Sulaymaniyah Link',
  },
  {
    id: 'kirkuk',
    nameAr: 'كركوك',
    nameEn: 'Kirkuk',
    capitalAr: 'كركوك',
    capitalEn: 'Kirkuk',
    region: 'north',
    lat: 35.4681,
    lng: 44.3922,
    x: 454,
    y: 167,
    labelOffsetX: 12,
    labelOffsetY: 0,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الصناعة الجديدة', 'حقول بابا كركر', 'الحويجة', 'دبس', 'داقوق'],
    districtsEn: ['New Industrial', 'Baba Gurgur Oilfields', 'Hawija', 'Dibs', 'Daquq'],
    activeFleetTypes: ['معدات خطوط أنابيب', 'حفارات عملاقة', 'مولدات ديزل 1000kVA', 'شيافل'],
    highwayCorridorAr: 'طريق بغداد - كركوك - أربيل السريع',
    highwayCorridorEn: 'Baghdad - Kirkuk - Erbil Highway Corridor',
  },
  {
    id: 'anbar',
    nameAr: 'الأنبار',
    nameEn: 'Anbar (Ramadi)',
    capitalAr: 'الرمادي',
    capitalEn: 'Ramadi',
    region: 'west',
    lat: 33.4243,
    lng: 43.2989,
    x: 368,
    y: 336,
    labelOffsetX: -16,
    labelOffsetY: 8,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الرمادي الصناعية', 'الفلوجة', 'هيت', 'حديثة', 'القائم', 'الرطبة'],
    districtsEn: ['Ramadi Industrial', 'Fallujah', 'Hit', 'Haditha', 'Al-Qaim', 'Rutba'],
    activeFleetTypes: ['بلدوزرات صحراوية D8/D9', 'شاحنات لوري عابرة للحدود', 'كريدرات تسوية'],
    highwayCorridorAr: 'الخط الدولي السريع M1 باتجاه الأردن وسوريا',
    highwayCorridorEn: 'International M1 Highway towards Jordan & Syria',
  },
  {
    id: 'saladin',
    nameAr: 'صلاح الدين',
    nameEn: 'Salah al-Din (Tikrit)',
    capitalAr: 'تكريت',
    capitalEn: 'Tikrit',
    region: 'central',
    lat: 34.6000,
    lng: 43.6833,
    x: 398,
    y: 238,
    labelOffsetX: -14,
    labelOffsetY: -6,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['مصفى بيجي الصناعي', 'تكريت الصناعية', 'سامراء', 'بلد', 'الدور'],
    districtsEn: ['Baiji Refinery Hub', 'Tikrit Industrial', 'Samarra', 'Balad', 'Al-Dour'],
    activeFleetTypes: ['معدات تكرير وبتروكيماويات', 'حفارات دائرية', 'رافعات بوم', 'شواحن'],
    highwayCorridorAr: 'طريق بغداد - الموصل الدولي ومحور بيجي اللوجستي',
    highwayCorridorEn: 'Baghdad - Mosul Expressway & Baiji Logistics Axis',
  },
  {
    id: 'diyala',
    nameAr: 'ديالى',
    nameEn: 'Diyala',
    capitalAr: 'بعقوبة',
    capitalEn: 'Baqubah',
    region: 'central',
    lat: 33.7447,
    lng: 44.6436,
    x: 474,
    y: 310,
    labelOffsetX: 12,
    labelOffsetY: -8,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['بعقوبة الصناعية', 'خانقين', 'منفذ المنذرية', 'الخالص', 'المقدادية'],
    districtsEn: ['Baqubah Industrial', 'Khanaqin', 'Munthiriya Border', 'Khalis', 'Muqdadiya'],
    activeFleetTypes: ['آليات استصلاح أراضي', 'شاحنات نقل بضائع', 'حفارات قنوات ري'],
    highwayCorridorAr: 'طريق بغداد - خانقين ومحور منفذ المنذرية الحدودي',
    highwayCorridorEn: 'Baghdad - Khanaqin Axis & Munthiriya Border Port',
  },
  {
    id: 'karbala',
    nameAr: 'كربلاء',
    nameEn: 'Karbala',
    capitalAr: 'كربلاء',
    capitalEn: 'Karbala',
    region: 'central',
    lat: 32.6160,
    lng: 44.0249,
    x: 425,
    y: 402,
    labelOffsetX: -14,
    labelOffsetY: 2,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['المنطقة الصناعية بطريق النجف', 'الهندية', 'عين التمر', 'الحر'],
    districtsEn: ['Najaf Road Industrial', 'Hindiyah', 'Ain Tamr', 'Al-Hurr'],
    activeFleetTypes: ['مضخات خرسانة عملاقة', 'رافعات برجية', 'بلدوزرات', 'مولدات كتم صوت'],
    highwayCorridorAr: 'محور طريق كربلاء - النجف وطريق بغداد السريع',
    highwayCorridorEn: 'Karbala - Najaf Expressway & Baghdad Link',
  },
  {
    id: 'babil',
    nameAr: 'بابل',
    nameEn: 'Babil (Hillah)',
    capitalAr: 'الحلة',
    capitalEn: 'Hillah',
    region: 'central',
    lat: 32.4833,
    lng: 44.4333,
    x: 457,
    y: 413,
    labelOffsetX: 12,
    labelOffsetY: 0,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الحلة الصناعية', 'الإسكندرية للآليات الميكانيكية', 'المسيب', 'المحاويل'],
    districtsEn: ['Hillah Industrial', 'Iskandariya Heavy Machinery Hub', 'Musayyib', 'Mahawil'],
    activeFleetTypes: ['شاحنات ثقيلة مجمعة محلياً', 'لوادر زراعية وإنشائية', 'مكابس هيدروليكية'],
    highwayCorridorAr: 'الخط السريع رقم 1 الرابط بين العاصمة والجنوب',
    highwayCorridorEn: 'Expressway No. 1 connecting Capital with Southern Ports',
  },
  {
    id: 'wasit',
    nameAr: 'واسط',
    nameEn: 'Wasit (Kut)',
    capitalAr: 'الكوت',
    capitalEn: 'Kut',
    region: 'central',
    lat: 32.5111,
    lng: 45.8208,
    x: 566,
    y: 411,
    labelOffsetX: 12,
    labelOffsetY: 0,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الكوت الصناعية', 'حقل بدرة النفطي', 'منفذ زرباطية', 'الصويرة', 'النعمانية'],
    districtsEn: ['Kut Industrial', 'Badra Oilfield', 'Zurbatiyah Border', 'Suwaira', 'Nuamaniya'],
    activeFleetTypes: ['حاصدات وجرارات زراعية', 'حفارات نفطية', 'شاحنات نقل مبرد وعام'],
    highwayCorridorAr: 'محور بغداد - الكوت - ميسان ومنفذ زرباطية التجاري',
    highwayCorridorEn: 'Baghdad - Kut - Maysan Route & Zurbatiyah Trade Terminal',
  },
  {
    id: 'najaf',
    nameAr: 'النجف',
    nameEn: 'Najaf',
    capitalAr: 'النجف',
    capitalEn: 'Najaf',
    region: 'south',
    lat: 32.0000,
    lng: 44.3333,
    x: 449,
    y: 453,
    labelOffsetX: -14,
    labelOffsetY: 4,
    isHub: true,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['المنطقة الحرفية الشمالية', 'الكوفة', 'المناذرة', 'حي النصر الميكانيكي'],
    districtsEn: ['North Craft Industrial', 'Kufa', 'Manathera', 'Nasr Mechanical Area'],
    activeFleetTypes: ['لوادر وشيافل', 'معدات صب خرساني', 'رافعات موبايل', 'ضواغط هواء'],
    highwayCorridorAr: 'محور طريق الحج البري الجديد وطريق المرور السريع 1',
    highwayCorridorEn: 'New Land Pilgrimage Artery & Highway 1 Expressway',
  },
  {
    id: 'qadisiyyah',
    nameAr: 'القادسية',
    nameEn: 'Qadisiyyah (Diwaniyah)',
    capitalAr: 'الديوانية',
    capitalEn: 'Diwaniyah',
    region: 'south',
    lat: 31.9922,
    lng: 44.9250,
    x: 496,
    y: 454,
    labelOffsetX: 12,
    labelOffsetY: 4,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الديوانية الصناعية', 'الشامية', 'عفك', 'الحمزة الشرقي'],
    districtsEn: ['Diwaniyah Industrial', 'Shamiya', 'Afak', 'Hamza Sharki'],
    activeFleetTypes: ['حاصدات حبوب كبرى', 'جرارات حراثة عميقة', 'شاحنات نقل غلال'],
    highwayCorridorAr: 'ملتقى الخط السريع 1 ومحاور مدن الفرات الأوسط',
    highwayCorridorEn: 'Highway 1 Interchange & Mid-Euphrates Logistics Network',
  },
  {
    id: 'maysan',
    nameAr: 'ميسان',
    nameEn: 'Maysan (Amarah)',
    capitalAr: 'العمارة',
    capitalEn: 'Amarah',
    region: 'south',
    lat: 31.8417,
    lng: 47.1439,
    x: 670,
    y: 466,
    labelOffsetX: 12,
    labelOffsetY: 0,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الحي الصناعي بالعمارة', 'حقول الحلفاية وبزركان', 'منفذ الشيب', 'علي الغربي'],
    districtsEn: ['Amarah Industrial', 'Halfaya & Buzurgan Fields', 'Sheeb Border', 'Ali Gharbi'],
    activeFleetTypes: ['حفارات مستنقعات وأهوار برمائية', 'أنابيب ضخ نفطي', 'شاحنات ثقيلة'],
    highwayCorridorAr: 'طريق بغداد - عمارة - بصرة ومنفذ الشيب التجاري',
    highwayCorridorEn: 'Baghdad - Amarah - Basra Artery & Sheeb Commercial Port',
  },
  {
    id: 'dhiqar',
    nameAr: 'ذي قار',
    nameEn: 'Dhi Qar (Nasiriyah)',
    capitalAr: 'الناصرية',
    capitalEn: 'Nasiriyah',
    region: 'south',
    lat: 31.0578,
    lng: 46.2572,
    x: 601,
    y: 530,
    labelOffsetX: 12,
    labelOffsetY: 6,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الناصرية الصناعية', 'سوق الشيوخ', 'حقل الغراف النفطي', 'الشطرة', 'الرفاعي'],
    districtsEn: ['Nasiriyah Industrial', 'Suq Al-Shuyukh', 'Gharraf Oilfield', 'Shatrah', 'Rifai'],
    activeFleetTypes: ['حفارات هيدروليكية', 'شيافل كاتربيلر', 'معدات فحص أنابيب', 'مولدات'],
    highwayCorridorAr: 'محور الطريق الدولي السريع ومحطة قطار البضائع الكبرى',
    highwayCorridorEn: 'International Highway Corridor & Freight Rail Terminal',
  },
  {
    id: 'muthanna',
    nameAr: 'المثنى',
    nameEn: 'Muthanna (Samawah)',
    capitalAr: 'السماوة',
    capitalEn: 'Samawah',
    region: 'south',
    lat: 31.3167,
    lng: 45.2833,
    x: 524,
    y: 509,
    labelOffsetX: -14,
    labelOffsetY: 8,
    isHub: false,
    services: ['rental', 'sales', 'parts', 'maintenance'],
    districtsAr: ['الحي الصناعي بالسماوة', 'معامل السمنت في بادية السماوة', 'الرميثة', 'الخضر'],
    districtsEn: ['Samawah Industrial', 'Samawah Desert Cement Plants', 'Rumaitha', 'Khidhir'],
    activeFleetTypes: ['قلابات صخور ومقالع 40 طن', 'كسارات سمنت', 'بلدوزرات ثقيلة'],
    highwayCorridorAr: 'محور بادية المثنى والخط السريع الرابط بين الفرات والجنوب',
    highwayCorridorEn: 'Muthanna Desert Mineral Corridor & Southlink Highway',
  },
];

// Logistics and heavy equipment transit network connections
export const IRAQ_NETWORK_CONNECTIONS: NetworkConnection[] = [
  { id: 'c1', fromId: 'basra', toId: 'dhiqar', nameAr: 'شريان النقل من موانئ البصرة إلى ذي قار', nameEn: 'Basra Ports to Dhi Qar Transit Corridor', type: 'primary' },
  { id: 'c2', fromId: 'dhiqar', toId: 'qadisiyyah', nameAr: 'محور الفرات الجنوبي', nameEn: 'Southern Euphrates Axis', type: 'primary' },
  { id: 'c3', fromId: 'qadisiyyah', toId: 'babil', nameAr: 'شريان بابل - القادسية', nameEn: 'Babil - Qadisiyyah Highway', type: 'primary' },
  { id: 'c4', fromId: 'babil', toId: 'baghdad', nameAr: 'مدخل العاصمة الجنوبي (الخط السريع 1)', nameEn: 'Baghdad South Expressway Gate', type: 'primary' },
  { id: 'c5', fromId: 'baghdad', toId: 'diyala', nameAr: 'محور بغداد - ديالى التجاري', nameEn: 'Baghdad - Diyala Trade Axis', type: 'primary' },
  { id: 'c6', fromId: 'diyala', toId: 'kirkuk', nameAr: 'طريق ديالى - كركوك النفطي', nameEn: 'Diyala - Kirkuk Energy Artery', type: 'primary' },
  { id: 'c7', fromId: 'kirkuk', toId: 'erbil', nameAr: 'محور كركوك - أربيل المزدوج', nameEn: 'Kirkuk - Erbil Dual Expressway', type: 'primary' },
  { id: 'c8', fromId: 'erbil', toId: 'duhok', nameAr: 'طريق أربيل - دهوك التجاري الدولي', nameEn: 'Erbil - Duhok International Transit Route', type: 'primary' },
  { id: 'c9', fromId: 'erbil', toId: 'nineveh', nameAr: 'محور أربيل - الموصل', nameEn: 'Erbil - Mosul Corridor', type: 'primary' },
  { id: 'c10', fromId: 'baghdad', toId: 'saladin', nameAr: 'محور دجلة الأوسط (بغداد - تكريت)', nameEn: 'Mid-Tigris Corridor (Baghdad - Tikrit)', type: 'primary' },
  { id: 'c11', fromId: 'saladin', toId: 'nineveh', nameAr: 'طريق بيجي - الموصل الدولي', nameEn: 'Baiji - Mosul Artery', type: 'primary' },
  { id: 'c12', fromId: 'baghdad', toId: 'anbar', nameAr: 'الخط الدولي السريع M1 (بغداد - الرمادي)', nameEn: 'M1 Expressway (Baghdad - Ramadi)', type: 'primary' },
  { id: 'c13', fromId: 'baghdad', toId: 'karbala', nameAr: 'طريق بغداد - كربلاء المباشر', nameEn: 'Baghdad - Karbala Artery', type: 'primary' },
  { id: 'c14', fromId: 'karbala', toId: 'najaf', nameAr: 'محور كربلاء - النجف السريع', nameEn: 'Karbala - Najaf Corridor', type: 'primary' },
  { id: 'c15', fromId: 'najaf', toId: 'muthanna', nameAr: 'طريق النجف - السماوة', nameEn: 'Najaf - Samawah Mineral Artery', type: 'secondary' },
  { id: 'c16', fromId: 'kirkuk', toId: 'sulaymaniyah', nameAr: 'محور كركوك - السليمانية', nameEn: 'Kirkuk - Sulaymaniyah Corridor', type: 'primary' },
  { id: 'c17', fromId: 'sulaymaniyah', toId: 'halabja', nameAr: 'محور السليمانية - حلبجة', nameEn: 'Sulaymaniyah - Halabja Link', type: 'secondary' },
  { id: 'c18', fromId: 'basra', toId: 'maysan', nameAr: 'شريان البصرة - ميسان النفطي', nameEn: 'Basra - Maysan Artery', type: 'secondary' },
  { id: 'c19', fromId: 'maysan', toId: 'wasit', nameAr: 'محور ميسان - الكوت', nameEn: 'Maysan - Kut Route', type: 'secondary' },
  { id: 'c20', fromId: 'wasit', toId: 'baghdad', nameAr: 'مدخل الكوت إلى بغداد', nameEn: 'Kut to Baghdad Corridor', type: 'primary' },
];

// Reusable country registry for global expansion architecture (Part 4)
export const AVAILABLE_COUNTRIES: CountryData[] = [
  {
    id: 'iq',
    code: 'IQ',
    nameAr: 'العراق',
    nameEn: 'Iraq',
    flag: '🇮🇶',
    status: 'active',
    statusLabelAr: 'الشبكة الميدانية النشطة',
    statusLabelEn: 'Active National Network',
    hubCityAr: 'بغداد (المقر الرئيسي)',
    hubCityEn: 'Baghdad (HQ Hub)',
    governoratesCount: 19,
    summaryAr: 'تغطية شاملة لكافة المحافظات الـ 19 مع أسطول تأجير معتمد ومراكز صيانة متنقلة ومستودعات قطع غيار أصلية.',
    summaryEn: 'Comprehensive operational coverage across all 19 governorates with certified rental fleets, mobile workshops, and OEM parts.',
  },
  {
    id: 'sa',
    code: 'SA',
    nameAr: 'المملكة العربية السعودية',
    nameEn: 'Saudi Arabia',
    flag: '🇸🇦',
    status: 'expansion_planned',
    statusLabelAr: 'توسع إقليمي مخطط له',
    statusLabelEn: 'Planned Regional Expansion',
    hubCityAr: 'الرياض / الدمام',
    hubCityEn: 'Riyadh / Dammam',
    governoratesCount: 13,
    summaryAr: 'ربط لوجستي مستقبلي لمشاريع البنية التحتية والآليات الثقيلة العملاقة عبر المنافذ البرية المشتركة.',
    summaryEn: 'Upcoming cross-border B2B marketplace linkage for megaprojects and heavy equipment corridors.',
  },
  {
    id: 'ae',
    code: 'AE',
    nameAr: 'الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    flag: '🇦🇪',
    status: 'expansion_planned',
    statusLabelAr: 'توسع إقليمي مخطط له',
    statusLabelEn: 'Planned Regional Expansion',
    hubCityAr: 'دبي / أبوظبي',
    hubCityEn: 'Dubai / Abu Dhabi',
    governoratesCount: 7,
    summaryAr: 'تكامل سلاسل إمداد قطع الغيار البحرية وإعادة تصدير الآليات الثقيلة عبر الموانئ الإقليمية.',
    summaryEn: 'Maritime heavy equipment trade integration and re-export spare parts logistics hub.',
  },
  {
    id: 'jo',
    code: 'JO',
    nameAr: 'الأردن',
    nameEn: 'Jordan',
    flag: '🇯🇴',
    status: 'expansion_planned',
    statusLabelAr: 'توسع إقليمي مخطط له',
    statusLabelEn: 'Planned Regional Expansion',
    hubCityAr: 'عمان / العقبة',
    hubCityEn: 'Amman / Aqaba',
    governoratesCount: 12,
    summaryAr: 'محور الربط البري عبر منفذ طريبيل للآليات والمعدات الإنشائية وخدمات الشحن التخصصي.',
    summaryEn: 'Overland transit link through Trebil border for construction fleets and specialized transport.',
  },
  {
    id: 'kw',
    code: 'KW',
    nameAr: 'الكويت',
    nameEn: 'Kuwait',
    flag: '🇰🇼',
    status: 'expansion_planned',
    statusLabelAr: 'توسع إقليمي مخطط له',
    statusLabelEn: 'Planned Regional Expansion',
    hubCityAr: 'مدينة الكويت / الشويخ',
    hubCityEn: 'Kuwait City / Shuwaikh',
    governoratesCount: 6,
    summaryAr: 'ممر التعاون اللوجستي عبر منفذ سفوان لخدمة مشاريع الطاقة والتكرير والشحن البحري.',
    summaryEn: 'Cross-border industrial logistics corridor via Safwan border serving energy and refinery sectors.',
  },
];
