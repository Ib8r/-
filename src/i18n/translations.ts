export type Locale = 'ar' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    howItWorks: string;
    forBusinesses: string;
    contact: string;
    downloadApp: string;
    rental: string;
    sales: string;
    parts: string;
    maintenance: string;
    langSwitch: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    androidStatus: string;
    iosStatus: string;
    ecosystemKicker: string;
  };
  intro: {
    tag: string;
    title: string;
    description: string;
    audiences: {
      contractors: { title: string; desc: string };
      owners: { title: string; desc: string };
      dealers: { title: string; desc: string };
      partsShops: { title: string; desc: string };
      workshops: { title: string; desc: string };
      logistics: { title: string; desc: string };
    };
  };
  servicesOverview: {
    tag: string;
    title: string;
    subtitle: string;
    learnMore: string;
    rental: {
      title: string;
      desc: string;
      points: string[];
    };
    sales: {
      title: string;
      desc: string;
      points: string[];
    };
    parts: {
      title: string;
      desc: string;
      points: string[];
    };
    maintenance: {
      title: string;
      desc: string;
      points: string[];
    };
  };
  whyHeavyDuty: {
    tag: string;
    title: string;
    subtitle: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  iraqCoverage: {
    tag: string;
    title: string;
    subtitle: string;
    note: string;
    governorates: string[];
  };
  howItWorksPreview: {
    tag: string;
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      desc: string;
    }[];
    fullGuideCta: string;
  };
  businessCta: {
    tag: string;
    title: string;
    desc: string;
    cta: string;
  };
  appDownloadSection: {
    tag: string;
    title: string;
    desc: string;
    notifyPlaceholder: string;
    notifyBtn: string;
    notifySuccess: string;
    androidBadge: string;
    iosBadge: string;
    disclaimer: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    servicesTitle: string;
    legalTitle: string;
    aboutUs: string;
    howItWorks: string;
    forBusinesses: string;
    contactUs: string;
    faq: string;
    privacy: string;
    terms: string;
    downloadApp: string;
    allRightsReserved: string;
    marketNotice: string;
  };
  contactPage: {
    tag: string;
    title: string;
    subtitle: string;
    form: {
      fullName: string;
      email: string;
      phone: string;
      subject: string;
      subjectOptions: {
        general: string;
        businessPartner: string;
        technicalSupport: string;
        equipmentListing: string;
      };
      message: string;
      submitBtn: string;
      submitting: string;
      noticeTitle: string;
      noticeDesc: string;
      validationRequired: string;
      validationEmail: string;
    };
    info: {
      officeTitle: string;
      officeValue: string;
      emailTitle: string;
      emailValue: string;
      coverageTitle: string;
      coverageValue: string;
      workingHoursTitle: string;
      workingHoursValue: string;
    };
  };
  forBusinessesPage: {
    tag: string;
    title: string;
    subtitle: string;
    segments: {
      rental: { title: string; desc: string; perks: string[] };
      dealers: { title: string; desc: string; perks: string[] };
      parts: { title: string; desc: string; perks: string[] };
      maintenance: { title: string; desc: string; perks: string[] };
    };
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formCompany: string;
    formType: string;
    formGovernorate: string;
    formPhone: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  faqPage: {
    tag: string;
    title: string;
    subtitle: string;
    items: {
      q: string;
      a: string;
    }[];
  };
}

export const translations: Record<Locale, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      howItWorks: 'كيف يعمل',
      forBusinesses: 'للشركات والوكالات',
      contact: 'اتصل بنا',
      downloadApp: 'تحميل التطبيق',
      rental: 'تأجير المعدات الثقيلة',
      sales: 'بيع وشراء المعدات',
      parts: 'قطع الغيار الأصلية',
      maintenance: 'مراكز والورش الصيانة',
      langSwitch: 'English',
    },
    hero: {
      badge: 'المنصة الرقمية المتكاملة للمعدات الثقيلة',
      headline: 'تمكين وتطوير قطاع',
      headlineAccent: 'المعدات الثقيلة',
      subheadline:
        'منصة موحدة ومترابطة لتأجير المعدات، البيع والشراء، سوق قطع الغيار الأصلية، ومراكز الصيانة المعتمدة عبر كافة المحافظات.',
      primaryCta: 'استكشف خدمات المنصة',
      secondaryCta: 'تحميل التطبيق',
      androidStatus: 'تطبيق أندرويد قريباً',
      iosStatus: 'تطبيق iOS قريباً',
      ecosystemKicker: 'البنية الرقمية الذكية لقطاعات الإنشاءات والمقاولات والصناعة',
    },
    intro: {
      tag: 'منظومة HEAVY DUTY',
      title: 'بنية رقمية موحدة تربط أطراف صناعة الآليات والمعدات الثقيلة',
      description:
        'صُممت منصة HEAVY DUTY لتكون حلقة الوصل الموثوقة والمركزية بين مختلف الجهات الفاعلة في قطاع الآليات والإنشاءات، مما يسهل الوصول إلى المعدات، تسريع العمليات، وتقليل فترات التوقف التشغيلي.',
      audiences: {
        contractors: {
          title: 'شركات المقاولات والزبائن',
          desc: 'العثور على المعدات المناسبة فورياً لمشاريع البنية التحتية مع مقارنة المواصفات والخيارات التشغيلية.',
        },
        owners: {
          title: 'ملاك الآليات الفرديون',
          desc: 'تشغيل واستثمار المعدات عبر إتاحتها للتأجير أو البيع لجمهور واسع من الشركات والمقاولين.',
        },
        dealers: {
          title: 'وكالات وشركات بيع الآليات',
          desc: 'عرض المعارض والمعدات الجديدة والمستعملة مع توثيق ساعات العمل وسنة الصنع والضمانات الرسمية.',
        },
        partsShops: {
          title: 'متاجر قطع الغيار والموردين',
          desc: 'فهرسة دقيقة لقطع الغيار الأصلية والمعتمدة برقم OEM مع حالات التوفر الفورية.',
        },
        workshops: {
          title: 'مراكز الصيانة وفرق الطوارئ',
          desc: 'تقديم الخدمات الهندسية المتخصصة في الهيدروليك والديزل وتلقي طلبات الفحص والصيانة الموقعية.',
        },
        logistics: {
          title: 'خدمات النقل والخدمات الميدانية',
          desc: 'تنسيق متطلبات النقل الثقيل (لوبد) والمشغلين المحترفين لضمان تسليم المعدات للمواقع.',
        },
      },
    },
    servicesOverview: {
      tag: 'الخدمات الأساسية',
      title: 'أربع خدمات رئيسية تلبي متطلبات قطاع المعدات',
      subtitle:
        'منظومة متكاملة تختصر الوقت والجهد على المقاولين والشركات وأصحاب المهن الهندسية.',
      learnMore: 'تفاصيل الخدمة',
      rental: {
        title: 'تأجير المعدات الثقيلة',
        desc: 'شبكة واسعة لتأجير الحفارات، البلدوزرات، اللوادر، الرافعات، وسيارات القلاب بخيارات تأجير يومية وشهرية مع أو بدون مشغل.',
        points: [
          'تغطية واسعة لكافة المحافظات الـ 18',
          'خيارات تأجير مرنة: يومي، أسبوعي، شهري',
          'إمكانية طلب مشغل محترف وخدمات النقل',
        ],
      },
      sales: {
        title: 'بيع وشراء المعدات',
        desc: 'سوق متخصص لعرض الآليات الإنشائية والصناعية الجديدة والمستعملة من الوكالات المعتمدة والمعارض والملاك المؤهلين.',
        points: [
          'توثيق دقيق لسنة الصنع وساعات التشغيل الفعلية',
          'تقارير الفحص والجاهزية الفنية وخلوص الجمارك',
          'تواصل مباشر بين المشتري والوكيل أو البائع',
        ],
      },
      parts: {
        title: 'سوق قطع الغيار الأصلية',
        desc: 'دليل منظم لقطع الغيار والمكونات الهندسية: مضخات الهيدروليك، الفلاتر، سلاسل الجنازير، وأسنان الباكت موثقة برقم OEM.',
        points: [
          'بحث مباشر برقم القطعة والماركات العالمية المتوافقة',
          'تحديد حالة القطعة: جديدة، مستعملة، أو مجددة',
          'متابعة حالة التوفر في المستودعات والمحلات',
        ],
      },
      maintenance: {
        title: 'مراكز وخدمات الصيانة',
        desc: 'دليل الورش ومراكز الصيانة الهندسية المتخصصة، يشمل الهيدروليك والمحركات والكهرباء مع ورش ميدانية متنقلة 24/7.',
        points: [
          'مهندسون وفنيون معتمدون لكبرى الماركات العالمية',
          'وحدات طوارئ وصيانة متنقلة للمشاريع النائية',
          'محتوى توعوي وهندسي منشور من المراكز الفنية',
        ],
      },
    },
    whyHeavyDuty: {
      tag: 'لماذا HEAVY DUTY؟',
      title: 'حلول عملية مبنية لواقع التحديات الصناعية',
      subtitle:
        'نجمع بين التكنولوجيا الحديثة والفهم العميق لاحتياجات مواقع العمل والمشاريع في العراق والمنطقة.',
      points: [
        {
          title: 'منصة واحدة شاملة',
          desc: 'الاستغناء عن تعدد الوسطاء من خلال توفير التأجير والبيع وقطع الغيار والصيانة في تطبيق رقمي موحد.',
        },
        {
          title: 'سهولة استكشاف المعدات',
          desc: 'فلاتر بحث دقيقة بحسب المحافظة، الفئة الهندسية، السعر، وساعات التشغيل للوصول السريع إلى الخيار الأمثل.',
        },
        {
          title: 'بيانات موثوقة ومواصفات واقعية',
          desc: 'تنظيم دقيق لبيانات الآليات وسجلات الصيانة والقطع المتوافقة مع أرقام التصنيع القياسية.',
        },
        {
          title: 'تغطية جغرافية شاملة للعراق',
          desc: 'معمارية مُصممة لربط المشاريع في عموم المحافظات الثماني عشرة وتسهيل التنسيق الموقعي.',
        },
        {
          title: 'جاهزية للتوسع الإقليمي',
          desc: 'بنية تكنولوجية متعددة العملات واللغات مهيأة لخدمة أسواق الشرق الأوسط والمنطقة العربية مستقبلاً.',
        },
        {
          title: 'بيئة أعمال آمنة ومهنية',
          desc: 'ربط مباشر بين الشركات والمقاولين والمزودين المعتمدين مع معايير شفافية تامة.',
        },
      ],
    },
    iraqCoverage: {
      tag: 'نطاق التغطية',
      title: 'تغطية مصممة لكافة محافظات العراق الـ 18',
      subtitle:
        'سواء كان مشروعك في البصرة، أربيل، بغداد، أو الأنبار، تهدف HEAVY DUTY إلى ربطك بأقرب المعدات والورش المتوفرة.',
      note: 'ملاحظة: يجري تفعيل المنظومة تدريجياً لربط كافة المزودين والورش في جميع المحافظات تباعاً.',
      governorates: [
        'بغداد',
        'البصرة',
        'نينوى',
        'أربيل',
        'السليمانية',
        'دهوك',
        'كركوك',
        'الأنبار',
        'ديالى',
        'صلاح الدين',
        'بابل',
        'كربلاء',
        'النجف',
        'واسط',
        'ميسان',
        'ذي قار',
        'القادسية',
        'المثنى',
      ],
    },
    howItWorksPreview: {
      tag: 'آلية العمل',
      title: 'ثلاث خطوات بسيطة للاستفادة من المنصة',
      subtitle:
        'صممنا تجربة المستخدم في تطبيق الهاتف لتكون سريعة وواضحة تلائم بيئة العمل الميدانية.',
      steps: [
        {
          number: '01',
          title: 'استكشف الخدمة والمعدة المطلوبة',
          desc: 'اختر بين التأجير، الشراء، قطع الغيار، أو الصيانة، وحدد المحافظة والمواصفات الفنية.',
        },
        {
          number: '02',
          title: 'راجع تفاصيل المزود والعرض',
          desc: 'اطلع على الصور الدقيقة، تقارير الفحص، أسعار التأجير بالدينار العراقي، والتفاصيل التشغيلية.',
        },
        {
          number: '03',
          title: 'تواصل مباشرة وقدّم طلبك',
          desc: 'أرسل طلب الحجز أو الاستفسار أو تواصل فورياً عبر الهاتف والواتساب المعتمد للمزود.',
        },
      ],
      fullGuideCta: 'عرض الدليل الكامل لكافة فئات المستخدمين ←',
    },
    businessCta: {
      tag: 'فرص الأعمال والشراكة',
      title: 'هل تمتلك أسطولاً، معرضاً، متجراً، أو ورشة صيانة؟',
      desc: 'انضم إلى شبكة مزودي HEAVY DUTY واعرض خدماتك وآلياتك أمام آلاف الشركات والمقاولين والمهندسين في العراق.',
      cta: 'انضم كشريك أعمال معتمد',
    },
    appDownloadSection: {
      tag: 'التطبيق الرسمي',
      title: 'تطبيق HEAVY DUTY للهواتف الذكية قريباً',
      desc: 'نعمل حالياً على إطلاق التطبيق الرسمي على نظامي Android و iOS ليمنحك الوصول الكامل لخدمات المعدات الثقيلة أينما كنت في موقع العمل.',
      notifyPlaceholder: 'أدخل بريدك الإلكتروني لتصلك إشارة الإطلاق...',
      notifyBtn: 'سجل اهتمامك الآن',
      notifySuccess: 'شكراً لاهتمامك! سيتم إشعارك فور توفر التطبيق رسمياً.',
      androidBadge: 'Android — قريباً على Google Play',
      iosBadge: 'iOS — قريباً على App Store',
      disclaimer: 'المنصة لا تصدر روابط تحميل وهمية؛ ستتوفر الروابط الرسمية عند الاعتماد النهائي للمتاجر.',
    },
    footer: {
      description:
        'المنصة الرسمية الرائدة في تكنولوجيا المعدات الثقيلة — تربط التأجير والبيع والشراء وسوق قطع الغيار وخدمات الصيانة عبر العراق والمنطقة.',
      quickLinks: 'روابط رئيسية',
      servicesTitle: 'خدمات المنصة',
      legalTitle: 'اللوائح والسياسات',
      aboutUs: 'من نحن',
      howItWorks: 'كيف يعمل',
      forBusinesses: 'للشركات والوكالات',
      contactUs: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      downloadApp: 'تحميل التطبيق',
      allRightsReserved: 'جميع الحقوق محفوظة لمنصة HEAVY DUTY',
      marketNotice: 'العملة المعتمدة في السوق العراقي: الدينار العراقي (IQD).',
    },
    contactPage: {
      tag: 'تواصل معنا',
      title: 'نحن هنا للإجابة على استفساراتكم والتعاون المشترك',
      subtitle:
        'يسر فريق HEAVY DUTY استقبال استفسارات الشركات، الملاك، والمزودين وبحث فرص الشراكة والتطوير.',
      form: {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف (اختياري)',
        subject: 'موضوع المراسلة',
        subjectOptions: {
          general: 'استفسار عام عن المنصة',
          businessPartner: 'طلب انضمام كشريك أعمال / وكالة',
          technicalSupport: 'الدعم الفني واستخدام التطبيق',
          equipmentListing: 'استفسار حول نشر الآليات والخدمات',
        },
        message: 'تفاصيل الرسالة أو الاستفسار...',
        submitBtn: 'إرسال الرسالة',
        submitting: 'جارٍ المعالجة...',
        noticeTitle: 'تنبيه الجاهزية البرمجية:',
        noticeDesc:
          'هذا النموذج جاهز للربط التقني المباشر (Frontend Integration-Ready). في بيئة الإنتاج الفعلية يتم توجيهه إلى خادم البريد أو واجهة API الخاصة بالمنصة.',
        validationRequired: 'يرجى تعبئة هذا الحقل الإلزامي.',
        validationEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
      },
      info: {
        officeTitle: 'نطاق العمل الرئيسي',
        officeValue: 'جمهورية العراق — عموم المحافظات الـ 18',
        emailTitle: 'المراسلات الرسمية',
        emailValue: 'corporate@heavyduty-marketplace.com',
        coverageTitle: 'الدعم والتنسيق',
        coverageValue: 'خدمة التنسيق الميداني ودعم شركاء المنصة',
        workingHoursTitle: 'ساعات التنسيق',
        workingHoursValue: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً (توقيت بغداد)',
      },
    },
    forBusinessesPage: {
      tag: 'بوابة قطاع الأعمال B2B',
      title: 'وسّع نطاق أعمالك مع منظومة HEAVY DUTY الرقمية',
      subtitle:
        'حلول مخصصة لشركات تأجير الآليات، معارض ووكلاء المعدات، متاجر قطع الغيار، ومراكز الصيانة الهندسية في العراق.',
      segments: {
        rental: {
          title: 'شركات ومكاتب تأجير الآليات',
          desc: 'إدارة أسطولك بالكامل والوصول إلى مقاولي المشاريع الكبرى دون الحاجة لمسوقين تقليديين.',
          perks: [
            'إدراج غير محدود للمعدات مع أسعار يومية وشهرية',
            'استقبال ومراجعة طلبات الاستئجار المباشرة',
            'إدارة الساحات والمواقع المتعددة عبر المحافظات',
          ],
        },
        dealers: {
          title: 'وكالات ومعارض بيع المعدات الثقيلة',
          desc: 'عرض الآليات الجديدة والمستعملة أمام مشترين حقيقيين من شركات الإنشاء والمستثمرين.',
          perks: [
            'ملف معرض رقمي معتمد بعلامة التوثيق الرسمية',
            'توثيق ساعات التشغيل، سنة الصنع، وسجلات الفحص',
            'تلقي استفسارات جادة عبر الهاتف والواتساب ونظام الرسائل',
          ],
        },
        parts: {
          title: 'متاجر ووكلاء قطع الغيار والمكونات',
          desc: 'تحويل مخزونك الورقي إلى كتالوج رقمي يمكن للمهندسين والمشغلين البحث فيه برقم OEM.',
          perks: [
            'فهرسة القطع بالرقم الأصلي OEM والموديلات المتوافقة',
            'تحديث فوري لحالات التوفر في المستودعات',
            'تسهيل وصول عملاء الجملة والتجزئة من مختلف المدن',
          ],
        },
        maintenance: {
          title: 'مراكز وورش الصيانة الهندسية',
          desc: 'إبراز قدرات ورشتك الفنية، مهندسي الهيدروليك والمحركات، ووحدات الصيانة المتنقلة للمواقع.',
          perks: [
            'استوديو نشر العروض الترويجية والإصلاحات الفنية المصورة',
            'إبراز تخصصات الورشة: فحص كمبيوتر، هيدروليك، ديزل',
            'استقبال طلبات الطوارئ للمشاريع الإنشائية الموقعية',
          ],
        },
      },
      formTitle: 'طلب تسجيل شراكة أعمال أولية',
      formSubtitle:
        'أدخل بيانات شركتك أو ورشتك وسيتواصل معك فريق الأعمال لإعداد ملفك التعريفي.',
      formName: 'اسم المسؤول / الممثل',
      formCompany: 'اسم الشركة / المعرض / الورشة',
      formType: 'نوع النشاط التجاري',
      formGovernorate: 'المحافظة الرئيسية',
      formPhone: 'رقم الهاتف للتواصل',
      formEmail: 'البريد الإلكتروني للعمل',
      formMessage: 'نبذة عن الأسطول أو الخدمات المقدمة...',
      formSubmit: 'إرسال طلب الانضمام للشبكة',
    },
    faqPage: {
      tag: 'مركز المعرفة والاستفسارات',
      title: 'الأسئلة الشائعة حول منصة وتطبيق HEAVY DUTY',
      subtitle:
        'إجابات دقيقة حول طبيعة عمل المنصة، خدماتها، والتطبيق الميداني في السوق العراقي.',
      items: [
        {
          q: 'ما هي منصة HEAVY DUTY؟',
          a: 'HEAVY DUTY هي منصة تكنولوجية متخصصة وموحدة تربط بين مختلف أطراف قطاع المعدات الثقيلة: التأجير، البيع والشراء، قطع الغيار الأصلية، وورش الصيانة الهندسية، وذلك من خلال تطبيق هاتف ذكي وبنية تحتية رقمية تخدم العراق والمنطقة العربية.',
        },
        {
          q: 'ما هي الخدمات الأربع الرئيسية التي تقدمها المنصة؟',
          a: 'تقدم المنصة 4 خدمات متكاملة: 1) تأجير المعدات الثقيلة الإنشائية، 2) بيع وشراء الآليات الجديدة والمستعملة، 3) سوق قطع الغيار الأصلية برقم OEM، و4) دليل مراكز وخدمات الصيانة والورش الميدانية المتنقلة.',
        },
        {
          q: 'هل تغطي خدمات HEAVY DUTY كافة المحافظات العراقية؟',
          a: 'نعم، المنصة مصممة معمارياً لدعم المحافظات الـ 18 في جمهورية العراق، مع إتاحة تصفية نتائج البحث والمزودين بحسب المحافظة والمدينة لتقليل أوقات وتكاليف النقل.',
        },
        {
          q: 'هل يمكن للأفراد ومقاولي البناء استئجار المعدات من خلال التطبيق؟',
          a: 'نعم، يمكن للمقاولين والشركات والأفراد استعراض المعدات المتاحة للتأجير، مراجعة أسعارها اليومية والشهرية بالدينار العراقي، والتواصل المباشر مع المالك أو الشركة المؤجرة لترتيب التعاقد والنقل.',
        },
        {
          q: 'هل يمكن لأصحاب الآليات الأفراد إدراج معداتهم في المنصة؟',
          a: 'نعم، يتيح تطبيق HEAVY DUTY لملاك المعدات الأفراد تسجيل حساباتهم وعرض آلياتهم للتأجير، وكذلك عرضها للبيع وفق ضوابط واشتراكات المنصة المخصصة للملاك المحترفين.',
        },
        {
          q: 'كيف يمكن لشركات التأجير ومعارض بيع الآليات الانضمام كشريك؟',
          a: 'يمكن للشركات والمعارض التسجيل كحساب أعمال تجاري، مما يتيح لهم لوحة تحكم متقدمة لإدارة الأساطيل، نشر معروضات البيع، وإدارة ساحات المعدات واستقبال طلبات المشاريع.',
        },
        {
          q: 'كيف يعمل سوق قطع الغيار في التطبيق؟',
          a: 'يوفر سوق قطع الغيار في التطبيق محرك بحث دقيق يعتمد على رقم القطعة الأصلي (OEM)، الشركة المصنعة (مثل CAT، Komatsu، Bosch Rexroth، Cummins)، والمعدات المتوافقة، مع تحديد دقيق لحالة التوفر وحالة القطعة (جديدة، مستعملة، مجددة).',
        },
        {
          q: 'كيف يمكن التواصل مع مراكز وورش الصيانة؟',
          a: 'يتيح دليل الصيانة التعرف على تخصصات كل ورشة (هيدروليك، تجفيت محركات، كهرباء، فحص كمبيوتر)، بالإضافة إلى الاتصال الهاتفي المباشر أو عبر الواتساب وطلب وحدات الصيانة الميدانية المتنقلة إلى موقع المشروع.',
        },
        {
          q: 'هل تطبيق HEAVY DUTY متاح حالياً لنظامي Android و iOS؟',
          a: 'يجري العمل على وضع اللمسات النهائية لإطلاق التطبيق الرسمي للهواتف الذكية على متجري Google Play لنظام أندرويد وApp Store لنظام iOS. يمكن للزوار تسجيل بريدهم في صفحة التحميل ليصلهم إشعار الإطلاق الرسمي فور اعتماده.',
        },
        {
          q: 'ما هي العملة المعتمدة في تسعير الآليات والخدمات في العراق؟',
          a: 'الدينار العراقي (IQD) هو العملة الأساسية والمعتمدة في تسعير الإيجارات وقطع الغيار والمعدات في السوق العراقي، مع معمارية برمجية تدعم إضافة العملات الإقليمية والدولية كالدولار الأمريكي مستقبلاً.',
        },
        {
          q: 'هل يتطلب استخدام المنصة اشتراكات مالية؟',
          a: 'التصفح واستكشاف المعدات متاح للعملاء والجمهور مجاناً، بينما تتوفر باقات اشتراك ميسرة للشركات والملاك المحترفين ومحلات قطع الغيار لتوفير أدوات نشر متقدمة وإدارة موسعة للمخزون.',
        },
      ],
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      howItWorks: 'How It Works',
      forBusinesses: 'For Businesses',
      contact: 'Contact Us',
      downloadApp: 'Download App',
      rental: 'Equipment Rental',
      sales: 'Equipment Sales',
      parts: 'Spare Parts',
      maintenance: 'Maintenance Centers',
      langSwitch: 'العربية',
    },
    hero: {
      badge: 'Integrated Digital Heavy Equipment Platform',
      headline: 'POWERING THE HEAVY EQUIPMENT',
      headlineAccent: 'INDUSTRY',
      subheadline:
        'One connected platform for heavy equipment rental, buying and selling, certified spare parts, and specialized maintenance workshops across Iraq and the region.',
      primaryCta: 'Explore Our Services',
      secondaryCta: 'Download the App',
      androidStatus: 'Android App Coming Soon',
      iosStatus: 'iOS App Coming Soon',
      ecosystemKicker: 'The smart digital backbone for civil construction, contracting, and industrial projects',
    },
    intro: {
      tag: 'HEAVY DUTY ECOSYSTEM',
      title: 'A unified digital infrastructure connecting the heavy equipment sector',
      description:
        'HEAVY DUTY is engineered as the trusted central bridge between contractors, fleet owners, equipment dealerships, spare parts merchants, and industrial technicians—simplifying machine access, accelerating procurement, and minimizing costly jobsite downtime.',
      audiences: {
        contractors: {
          title: 'Contractors & Project Clients',
          desc: 'Instantly discover verified machinery for civil infrastructure with transparent specs and operator options.',
        },
        owners: {
          title: 'Individual Equipment Owners',
          desc: 'Monetize machinery assets by listing them for rent or sale to a broad network of commercial builders.',
        },
        dealers: {
          title: 'Dealerships & Equipment Showrooms',
          desc: 'Showcase new and certified pre-owned fleets with verified operating hours, manufacture years, and official warranties.',
        },
        partsShops: {
          title: 'Spare Parts Stores & Suppliers',
          desc: 'Publish comprehensive parts inventories indexed by OEM part numbers with real-time stock status.',
        },
        workshops: {
          title: 'Maintenance Centers & Field Crews',
          desc: 'Offer specialized engineering expertise in hydraulics, diesel diagnostics, and deploy mobile on-site repair units.',
        },
        logistics: {
          title: 'Heavy Hauling & Field Logistics',
          desc: 'Coordinate lowboy transport and certified equipment operators to guarantee seamless machine mobilization.',
        },
      },
    },
    servicesOverview: {
      tag: 'CORE SERVICES',
      title: 'Four integrated pillars serving the industrial machinery ecosystem',
      subtitle:
        'An end-to-end platform eliminating friction for contractors, equipment dealers, and engineering specialists.',
      learnMore: 'Service Details',
      rental: {
        title: 'Heavy Equipment Rental',
        desc: 'Comprehensive rental marketplace for excavators, bulldozers, wheel loaders, mobile cranes, and dump trucks with flexible daily and monthly terms.',
        points: [
          'Full coverage across all 18 Iraqi governorates',
          'Flexible terms: daily, weekly, and monthly leases',
          'Optional certified operator and lowboy hauling options',
        ],
      },
      sales: {
        title: 'Buy & Sell Equipment',
        desc: 'Dedicated marketplace for new and certified pre-owned heavy machinery from authorized dealerships, commercial yards, and verified owners.',
        points: [
          'Verified manufacturing year and genuine operating hours',
          'Technical inspection reports and official customs status',
          'Direct negotiation with dealerships and verified sellers',
        ],
      },
      parts: {
        title: 'Spare Parts Marketplace',
        desc: 'Organized catalogue of precision industrial components: hydraulic pumps, filters, undercarriage tracks, and bucket teeth indexed by OEM codes.',
        points: [
          'Search by OEM part number and brand compatibility',
          'Transparent conditions: new, used, or factory refurbished',
          'Real-time inventory stock availability in regional stores',
        ],
      },
      maintenance: {
        title: 'Maintenance & Service Centers',
        desc: 'Directory of engineering workshops and certified technicians specializing in hydraulics, diesel engines, and electrical diagnostics with 24/7 mobile field units.',
        points: [
          'Certified engineers for premier global machinery brands',
          '24/7 mobile field repair vehicles for remote jobsites',
          'Educational technical guides and media published by centers',
        ],
      },
    },
    whyHeavyDuty: {
      tag: 'WHY HEAVY DUTY?',
      title: 'Practical solutions designed for real-world industrial challenges',
      subtitle:
        'Combining modern software architecture with deep practical insight into regional jobsites and contracting realities.',
      points: [
        {
          title: 'All-in-One Industrial Platform',
          desc: 'Eliminates fragmented intermediaries by unifying rental, sales, spare parts, and repairs into one digital app.',
        },
        {
          title: 'Precision Discovery & Filtering',
          desc: 'Filter machinery by governorate, machinery class, price range, and machine hours to find the exact match in minutes.',
        },
        {
          title: 'Structured, Verified Specifications',
          desc: 'Standardized equipment records, inspection reports, and genuine manufacturer cross-compatibility information.',
        },
        {
          title: 'Nationwide Iraqi Coverage',
          desc: 'Engineered to link contracting operations across all 18 governorates from Basra to Erbil.',
        },
        {
          title: 'Regional Expansion Architecture',
          desc: 'Built with multi-currency and multilingual foundations to support wider Arab markets across the Middle East.',
        },
        {
          title: 'Transparent Business Environment',
          desc: 'Direct, clear connections between verified equipment owners, reputable dealers, and engineering workshops.',
        },
      ],
    },
    iraqCoverage: {
      tag: 'GEOGRAPHIC REACH',
      title: 'Engineered for all 18 Iraqi Governorates',
      subtitle:
        'Whether your civil project is in Basra, Erbil, Baghdad, or Anbar, HEAVY DUTY connects you with nearby available equipment and certified workshops.',
      note: 'Note: Network activation proceeds progressively as verified providers and workshops join across each governorate.',
      governorates: [
        'Baghdad',
        'Basra',
        'Nineveh',
        'Erbil',
        'Sulaymaniyah',
        'Duhok',
        'Kirkuk',
        'Anbar',
        'Diyala',
        'Salah al-Din',
        'Babil',
        'Karbala',
        'Najaf',
        'Wasit',
        'Maysan',
        'Dhi Qar',
        'Al-Qadisiyyah',
        'Al-Muthanna',
      ],
    },
    howItWorksPreview: {
      tag: 'WORKFLOW',
      title: 'Three simple steps to mobilize heavy machinery',
      subtitle:
        'Designed specifically for rapid on-site action and mobile clarity in demanding industrial conditions.',
      steps: [
        {
          number: '01',
          title: 'Discover the Machinery or Service',
          desc: 'Select rental, equipment sales, spare parts, or repairs, then filter by location and technical specifications.',
        },
        {
          number: '02',
          title: 'Review Verified Details & Pricing',
          desc: 'Examine detailed photos, inspection sheets, daily/monthly rates in Iraqi Dinars (IQD), and mobilization terms.',
        },
        {
          number: '03',
          title: 'Connect Directly & Submit Requests',
          desc: 'Submit booking inquiries or connect directly through verified telephone and WhatsApp contacts.',
        },
      ],
      fullGuideCta: 'View Full Workflow Guide for All User Groups ←',
    },
    businessCta: {
      tag: 'BUSINESS PARTNERSHIPS',
      title: 'Do you operate a fleet, dealership, parts store, or workshop?',
      desc: 'Join the HEAVY DUTY provider network and showcase your equipment and services to thousands of active contractors and engineers in Iraq.',
      cta: 'Become a HEAVY DUTY Partner',
    },
    appDownloadSection: {
      tag: 'OFFICIAL APP',
      title: 'HEAVY DUTY Mobile Application Coming Soon',
      desc: 'We are completing the native Android and iOS mobile applications to provide full-scale field access to machinery rentals, sales, spare parts, and emergency repairs right from the jobsite.',
      notifyPlaceholder: 'Enter your business email to receive launch notification...',
      notifyBtn: 'Register for Launch Notification',
      notifySuccess: 'Thank you for your interest! We will notify you the moment the app goes live.',
      androidBadge: 'Android — Coming Soon to Google Play',
      iosBadge: 'iOS — Coming Soon to App Store',
      disclaimer: 'HEAVY DUTY does not distribute unofficial download links. Official store links will be published upon release.',
    },
    footer: {
      description:
        'The premier official corporate platform powering heavy machinery technology—connecting equipment rental, machine sales, certified spare parts, and industrial maintenance across Iraq and the region.',
      quickLinks: 'Quick Links',
      servicesTitle: 'Core Services',
      legalTitle: 'Policies & Legal',
      aboutUs: 'About Us',
      howItWorks: 'How It Works',
      forBusinesses: 'For Businesses',
      contactUs: 'Contact Us',
      faq: 'FAQ',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      downloadApp: 'Download App',
      allRightsReserved: 'All rights reserved to HEAVY DUTY',
      marketNotice: 'Primary operating currency for the Iraqi market: Iraqi Dinar (IQD).',
    },
    contactPage: {
      tag: 'CONTACT US',
      title: 'Get in touch with the HEAVY DUTY team',
      subtitle:
        'We welcome inquiries from contractors, fleet owners, equipment dealerships, and maintenance workshops regarding platform opportunities and partnership.',
      form: {
        fullName: 'Full Name',
        email: 'Corporate Email',
        phone: 'Phone Number (Optional)',
        subject: 'Inquiry Topic',
        subjectOptions: {
          general: 'General Platform Inquiry',
          businessPartner: 'Business Partner / Dealership Registration',
          technicalSupport: 'Platform & Application Support',
          equipmentListing: 'Equipment & Services Listing Questions',
        },
        message: 'Details of your inquiry or proposed collaboration...',
        submitBtn: 'Send Message',
        submitting: 'Processing...',
        noticeTitle: 'Technical Integration Notice:',
        noticeDesc:
          'This frontend form is fully validated and integration-ready. In your production environment, configure your server-side SMTP or API endpoint to route live incoming emails.',
        validationRequired: 'This field is required.',
        validationEmail: 'Please enter a valid email address.',
      },
      info: {
        officeTitle: 'Geographic Focus',
        officeValue: 'Republic of Iraq — Nationwide across all 18 governorates',
        emailTitle: 'Corporate Inquiries',
        emailValue: 'corporate@heavyduty-marketplace.com',
        coverageTitle: 'Coordination Network',
        coverageValue: 'Field provider onboarding & business partner operations',
        workingHoursTitle: 'Business Hours',
        workingHoursValue: 'Sunday – Thursday: 8:00 AM – 5:00 PM (Baghdad Time)',
      },
    },
    forBusinessesPage: {
      tag: 'B2B PARTNERSHIP PORTAL',
      title: 'Scale your industrial machinery business with HEAVY DUTY',
      subtitle:
        'Tailored corporate capabilities for heavy equipment rental yards, commercial machinery dealerships, spare parts merchants, and specialized engineering centers in Iraq.',
      segments: {
        rental: {
          title: 'Equipment Rental Yards & Fleet Operators',
          desc: 'Maximize asset utilization by reaching infrastructure contractors and builders across regional project zones.',
          perks: [
            'Unlimited equipment listings with daily, weekly, and monthly rates',
            'Receive verified rental requests directly through the application',
            'Manage multiple storage yards and equipment locations across governorates',
          ],
        },
        dealers: {
          title: 'Machinery Dealerships & Showrooms',
          desc: 'Present new and certified pre-owned heavy machinery to qualified commercial buyers, engineering firms, and investors.',
          perks: [
            'Official verified dealer profile with branded company accreditation',
            'Structured publishing of operating hours, year of manufacture, and inspection files',
            'Direct inquiries via phone, WhatsApp, and in-app corporate messaging',
          ],
        },
        parts: {
          title: 'Spare Parts Merchants & Importers',
          desc: 'Transform paper inventory into a searchable digital catalogue indexed by international OEM reference codes.',
          perks: [
            'Catalogue parts by genuine OEM part numbers and machine compatibility',
            'Real-time availability status for immediate contractor procurement',
            'Attract wholesale and retail buyers from diverse industrial districts',
          ],
        },
        maintenance: {
          title: 'Certified Maintenance Centers & Workshops',
          desc: 'Showcase your engineering mastery, hydraulic repair facilities, diesel overhaul bays, and mobile field response units.',
          perks: [
            'Publish illustrated promotional posts and case studies of repaired machines',
            'Highlight specialty capabilities: diagnostics, pump calibration, engine rebuilds',
            'Receive emergency breakdown repair requests from project sites',
          ],
        },
      },
      formTitle: 'Request Business Onboarding',
      formSubtitle:
        'Submit your organization details to begin verified business onboarding with the HEAVY DUTY corporate team.',
      formName: 'Representative Name',
      formCompany: 'Company / Workshop Name',
      formType: 'Business Category',
      formGovernorate: 'Primary Governorate',
      formPhone: 'Contact Phone Number',
      formEmail: 'Business Email',
      formMessage: 'Overview of fleet capacity, products, or repair capabilities...',
      formSubmit: 'Submit Partnership Application',
    },
    faqPage: {
      tag: 'KNOWLEDGE BASE',
      title: 'Frequently Asked Questions about HEAVY DUTY',
      subtitle:
        'Transparent answers regarding the platform architecture, core services, and mobile rollout in Iraq.',
      items: [
        {
          q: 'What is HEAVY DUTY?',
          a: 'HEAVY DUTY is an industrial technology platform connecting heavy machinery rentals, equipment sales, certified spare parts, and engineering maintenance services across Iraq and the Arab region through a forthcoming mobile application and digital infrastructure.',
        },
        {
          q: 'What are the four core services provided?',
          a: 'The platform integrates 4 essential pillars: 1) Heavy Equipment Rental, 2) Buy & Sell Heavy Machinery, 3) Spare Parts Marketplace with OEM references, and 4) Maintenance Center Directory with mobile field units.',
        },
        {
          q: 'Is HEAVY DUTY designed to serve all 18 Iraqi governorates?',
          a: 'Yes. The platform architecture supports all 18 governorates across Iraq, allowing contractors and equipment owners to search and mobilize machinery locally, cutting down logistics costs and transport delays.',
        },
        {
          q: 'Can individual contractors rent equipment through the mobile application?',
          a: 'Yes. Contractors and project managers can browse available machinery, compare daily and monthly rates in Iraqi Dinars (IQD), inspect machine specs, and connect directly with equipment owners or rental companies.',
        },
        {
          q: 'Can individual machinery owners publish equipment listings?',
          a: 'Yes. Individual equipment owners can create verified profiles in the mobile application to list machinery for rent or sale, following platform subscription and verification guidelines.',
        },
        {
          q: 'How can commercial dealerships and rental companies join as partners?',
          a: 'Commercial businesses can apply through the For Businesses portal or within the application to establish an accredited business account, complete with fleet management and multi-yard tools.',
        },
        {
          q: 'How does the spare parts marketplace function?',
          a: 'The marketplace indexes parts by genuine OEM part numbers, manufacturer brands (such as CAT, Komatsu, Bosch Rexroth, Cummins), and machine models, indicating live stock availability and component condition (new, used, or refurbished).',
        },
        {
          q: 'How do users contact maintenance centers?',
          a: 'The maintenance directory details each workshop’s technical specialties (hydraulics, diesel engines, electrical diagnostics) and provides direct phone, WhatsApp, and in-app inquiry forms for both shop visits and mobile field emergency dispatches.',
        },
        {
          q: 'Is the HEAVY DUTY application available now on Android and iOS?',
          a: 'The official mobile applications are currently undergoing final quality assurance prior to store publishing on Google Play and Apple App Store. Visitors can register their email on the Download page to receive immediate launch alerts.',
        },
        {
          q: 'What is the primary currency used for machinery and services in Iraq?',
          a: 'The Iraqi Dinar (IQD) is the primary operating currency for rentals, sales, and spare parts across Iraq, supported by software architecture prepared for multi-currency handling including USD.',
        },
        {
          q: 'Does using the platform require paid subscriptions?',
          a: 'Browsing and searching for equipment and workshops is free for contractors and the public. Affordable subscription tiers are designed for commercial fleet companies, equipment dealers, and parts merchants seeking advanced inventory management.',
        },
      ],
    },
  },
};
