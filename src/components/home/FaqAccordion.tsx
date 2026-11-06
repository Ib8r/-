import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Plus } from 'lucide-react';

interface FaqItem {
  qAr: string;
  qEn: string;
  qKu: string;
  aAr: string;
  aEn: string;
  aKu: string;
}

export const FaqAccordion: React.FC = () => {
  const { locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs: FaqItem[] = [
    {
      qAr: 'ما هي معايير التشغيل والموثوقية في HEAVY DUTY؟',
      qEn: "What are HEAVY DUTY's operational standards and reliability principles?",
      qKu: 'پێوەرەکانی کارپێکردن و متمانەپێکراوی لە HEAVY DUTY چییە؟',
      aAr:
        'تعتمد HEAVY DUTY أربعة معايير تشغيلية صارمة: توثيق الفحص الفني وساعات التشغيل الفعلية لتقليل التوقفات، شفافية الأسعار بالدينار العراقي لعقود الإيجار والنقل دون رسوم خفية، تغطية لوجستية شاملة لكافة محافظات العراق الـ 19 لنقل الآليات باللوبدات، والربط المباشر الموثق بين شركات المقاولات وملاك الأساطيل ومتاجر قطع الغيار وورش الصيانة المعتمدة.',
      aEn:
        'HEAVY DUTY enforces four core operational standards: mandatory technical inspection and verified operating hours to minimize downtime, transparent pricing in Iraqi Dinar (IQD) without hidden markups, comprehensive nationwide logistics covering all 19 Iraqi governorates with lowboy transport, and verified direct connectivity between contractors, fleet owners, OEM parts merchants, and certified workshops.',
      aKu:
        'پلاتفۆرمی HEAVY DUTY چوار ستانداردی کارپێکردنی ڕوون پەیڕەو دەکات: پشکنینی تەکنیکی و کاتژمێری کارکردنی ڕاستەقینە، شەفافیەتی نرخ بە دیناری عێراقی بێ تێچووی شاراوە، داپۆشینی لۆجستی تەواوی ١٩ پارێزگاکەی عێراق بۆ گواستنەوە بە لۆبەد، و پەیوەندی ڕاستەوخۆ لەنێوان بەڵێندەران و خاوەن ئامێرەکان و فرۆشگاکانی پارچە و وۆرکشۆپەکان.',
    },
    {
      qAr: 'كيف أعرض آليتي للبيع أو الإيجار عبر التطبيق؟',
      qEn: 'How can I list my machinery for sale or rent?',
      qKu: 'چۆن ئامێرەکەم بۆ فرۆشتن یان کرێپێدان لە ئەپڵیکەیشن دابنێم؟',
      aAr:
        'يمكن لملاك وموردي الآليات إنشاء حساب موثق في تطبيق HEAVY DUTY، واختيار فئة الآلية (حفارة، شفل، كرين، إلخ)، ورفع الصور الحقيقية وتحديد ساعات العمل وسنة الصنع والأسعار اليومية أو الشهرية.',
      aEn:
        'Machinery owners and dealerships can create a verified profile in the HEAVY DUTY mobile application, select equipment category, upload genuine photos, specify verified operating hours, manufacture year, and rental rates.',
      aKu:
        'خاوەن ئامێرەکان دەتوانن هەژماری فەرمی لە ئەپڵیکەیشنی HEAVY DUTY دروست بکەن، وێنەی ڕاستەقینە و کاتژمێرەکانی کارکردن و نرخەکان دیاری بکەن بۆ بڵاوکردنەوەی خێرا.',
    },
    {
      qAr: 'هل يمكنني استئجار المعدات بدل شرائها؟',
      qEn: 'Can I rent equipment instead of purchasing?',
      qKu: 'ئایا دەتوانم ئامێر بە کرێ بگرم لەبری کڕینی؟',
      aAr:
        'نعم، توفر HEAVY DUTY منظومة تأجير مرنة تمكن المقاولين من استئجار الآليات بعقود يومية أو أسبوعية أو شهرية مع أو بدون مشغل محترف، وتنسيق لوبدات النقل لموقع المشروع.',
      aEn:
        'Yes. HEAVY DUTY provides a flexible rental system enabling contractors to mobilize equipment on daily, weekly, or monthly contracts with or without certified operators, including lowboy site transport.',
      aKu:
        'بەڵێ، سیستەمەکە ڕێگەت پێدەدات ئامێرەکان بە شێوازی ڕۆژانە، هەفتانە یان مانگانە لەگەڵ یان بێ شۆفێر بە کرێ بگریت.',
    },
    {
      qAr: 'ما اللغات التي يدعمها تطبيق HEAVY DUTY؟',
      qEn: 'What languages are supported by HEAVY DUTY?',
      qKu: 'ئەپڵیکەیشنی HEAVY DUTY چ زمانانێک لەخۆ دەگرێت؟',
      aAr:
        'المنصة مصممة بالكامل لدعم ثلاث لغات رسمية: العربية، الإنجليزية، والكردية (السورانية)، مع الحفاظ على اتجاه القراءة الصحيح (RTL/LTR) في كافة الشاشات والخدمات.',
      aEn:
        'The platform is built to support three official languages: Arabic, English, and Kurdish (Sorani), respecting correct typographic hierarchy and RTL/LTR directions across all screens.',
      aKu:
        'پلاتفۆرمەکە بە تەواوی پشتگیری لە سێ زمانی سەرەکی دەکات: کوردی (سۆرانی)، عەرەبی و ئینگلیزی بە ڕێکخستنی دروستی ئاڕاستەی نووسین.',
    },
    {
      qAr: 'كيف تتم إجراءات الفحص والتوثيق للآليات المعروضة؟',
      qEn: 'How are machinery inspections and condition reports handled?',
      qKu: 'ڕاپۆرتی پشکنین و دۆخی ئامێرەکان چۆن ئەنجام دەدرێت؟',
      aAr:
        'تشترط المنصة توثيق صور العداد وساعات العمل الفعلية وشهادات الصيانة الدورية من ورش معتمدة، مع توفير خيار طلب فحص فني ميداني معتمد قبل إتمام الصفقات الكبرى.',
      aEn:
        'The platform requires documented hour meters, physical condition photography, and certified maintenance histories, with options to order mobile on-site technical inspection before major transactions.',
      aKu:
        'پلاتفۆرمەکە جەخت لەسەر وێنەی ڕاستەقینەی کاتژمێری کارکردن و مێژووی چاککردنەوە دەکاتەوە لەگەڵ بەردەستبوونی پشکنینی مەیدانی.',
    },
    {
      qAr: 'هل استخدام HEAVY DUTY مجاني للتصفح والاستكشاف؟',
      qEn: 'Is browsing and searching HEAVY DUTY free?',
      qKu: 'ئایا گەڕان و بەکارهێنانی HEAVY DUTY بێ بەرامبەرە؟',
      aAr:
        'نعم، تصفح كتالوج الآليات وفهارس قطع الغيار ومراكز الصيانة مجاني بالكامل للمقاولين والمهندسين والجمهور، بينما تتوفر اشتراكات ميسرة لشركات الأساطيل والتجار لإدارة المخزون.',
      aEn:
        'Yes. Browsing equipment catalogs, searching spare parts, and exploring workshops is completely free for contractors and engineers, with specialized commercial tiers for fleet dealers.',
      aKu:
        'بەڵێ، گەڕان لە کەتەلۆگی ئامێرەکان و پارچەی یەدەگ بۆ بەڵێندەران و ئەندازیاران بە تەواوی بێ بەرامبەرە.',
    },
    {
      qAr: 'كيف يمكنني التواصل مع فريق HEAVY DUTY؟',
      qEn: 'How can I contact the HEAVY DUTY team?',
      qKu: 'چۆن دەتوانم پەیوەندی بە تیمی HEAVY DUTY بکەم؟',
      aAr:
        'يمكنك التواصل عبر صفحة الاتصال الرسمية، أو عبر البريد الإلكتروني info@heavyduty.iq، أو بالتسجيل في صفحة التحميل للحصول على إشعارات الإطلاق المباشرة.',
      aEn:
        'You can reach us through our official Contact page, via email at info@heavyduty.iq, or by registering on the Download page for priority launch notifications.',
      aKu:
        'دەتوانیت لە ڕێگەی پەڕەی پەیوەندی، یان ئیمەیڵی info@heavyduty.iq، یان تۆمارکردنی ئیمەیڵەکەت پەیوەندیمان پێوە بکەیت.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Header (Inspired by IQ Machinery FAQ Header) */}
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D69A25]/10 text-[#D69A25] text-xs font-mono font-bold tracking-wider uppercase border border-[#D69A25]/25">
            <span>
              {locale === 'ku' ? 'پرسیارە باوەکان' : locale === 'en' ? 'FAQ' : 'أسئلة شائعة'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20252B] dark:text-[#F5F6F7] font-heading">
            {locale === 'ku'
              ? 'هەموو ئەوەی پێویستە بیزانی پێش دەستپێکردن.'
              : locale === 'en'
              ? 'Everything You Need to Know Before You Start.'
              : 'كل ما تحتاج معرفته قبل أن تبدأ.'}
          </h2>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#20252B] border border-[#E2E5E8] dark:border-[#303943] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F6F7] dark:hover:bg-[#2B333D] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#20252B] dark:text-[#F5F6F7] font-heading">
                    {locale === 'ku' ? faq.qKu : locale === 'en' ? faq.qEn : faq.qAr}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#D69A25] text-[#20252B] rotate-45'
                        : 'bg-[#F5F6F7] dark:bg-[#2B333D] text-[#D69A25]'
                    }`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200">
                    <div className="pt-3 border-t border-[#E2E5E8] dark:border-[#303943]/60">
                      <p className="text-xs sm:text-sm text-[#303943] dark:text-[#CBD5E1] leading-relaxed">
                        {locale === 'ku' ? faq.aKu : locale === 'en' ? faq.aEn : faq.aAr}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
