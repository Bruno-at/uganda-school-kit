import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es' | 'ar' | 'zh' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.admissions': 'Admissions',
    'nav.academics': 'Academics',
    'nav.studentLife': 'Student Life',
    'nav.parents': 'Parents',
    'nav.news': 'News & Events',
    'nav.contact': 'Contact',
    'hero.title': 'Nurturing Character, Excellence, and Innovation',
    'hero.subtitle': 'Excellence Academy is committed to providing world-class education that develops academic excellence, strong character, and innovative thinking in every student.',
    'cta.applyNow': 'Apply Now',
    'cta.parentPortal': 'Parent Portal',
    'cta.login': 'Login',
    'cta.contactUs': 'Contact Us',
    'stats.yearsOfExcellence': 'Years of Excellence',
    'stats.happyStudents': 'Happy Students',
    'stats.qualifiedTeachers': 'Qualified Teachers',
    'stats.nationalAwards': 'National Awards',
    'footer.schoolInfo': 'School Information',
    'footer.quickLinks': 'Quick Links',
    'footer.forParents': 'For Parents',
    'footer.newsletter': 'Newsletter',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.admissions': 'Admissions',
    'nav.academics': 'Académique',
    'nav.studentLife': 'Vie étudiante',
    'nav.parents': 'Parents',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'hero.title': 'Cultiver le caractère, l\'excellence et l\'innovation',
    'hero.subtitle': 'Excellence Academy s\'engage à fournir une éducation de classe mondiale qui développe l\'excellence académique, un caractère fort et une pensée innovante chez chaque étudiant.',
    'cta.applyNow': 'Postuler maintenant',
    'cta.parentPortal': 'Portail parent',
    'cta.login': 'Connexion',
    'cta.contactUs': 'Nous contacter',
    'stats.yearsOfExcellence': 'Années d\'excellence',
    'stats.happyStudents': 'Étudiants heureux',
    'stats.qualifiedTeachers': 'Enseignants qualifiés',
    'stats.nationalAwards': 'Prix nationaux',
    'footer.schoolInfo': 'Informations scolaires',
    'footer.quickLinks': 'Liens rapides',
    'footer.forParents': 'Pour les parents',
    'footer.newsletter': 'Newsletter',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.admissions': 'Admisiones',
    'nav.academics': 'Académicos',
    'nav.studentLife': 'Vida estudiantil',
    'nav.parents': 'Padres',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'hero.title': 'Cultivando carácter, excelencia e innovación',
    'hero.subtitle': 'Excellence Academy está comprometida con brindar educación de clase mundial que desarrolla excelencia académica, carácter fuerte y pensamiento innovador en cada estudiante.',
    'cta.applyNow': 'Aplicar ahora',
    'cta.parentPortal': 'Portal de padres',
    'cta.login': 'Iniciar sesión',
    'cta.contactUs': 'Contáctenos',
    'stats.yearsOfExcellence': 'Años de excelencia',
    'stats.happyStudents': 'Estudiantes felices',
    'stats.qualifiedTeachers': 'Maestros calificados',
    'stats.nationalAwards': 'Premios nacionales',
    'footer.schoolInfo': 'Información escolar',
    'footer.quickLinks': 'Enlaces rápidos',
    'footer.forParents': 'Para padres',
    'footer.newsletter': 'Boletín',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.admissions': 'القبول',
    'nav.academics': 'الأكاديميات',
    'nav.studentLife': 'حياة الطالب',
    'nav.parents': 'أولياء الأمور',
    'nav.news': 'الأخبار',
    'nav.contact': 'اتصل',
    'hero.title': 'رعاية الشخصية والتميز والابتكار',
    'hero.subtitle': 'أكاديمية التميز ملتزمة بتوفير تعليم عالمي المستوى يطور التميز الأكاديمي والشخصية القوية والتفكير المبتكر في كل طالب.',
    'cta.applyNow': 'قدم الآن',
    'cta.parentPortal': 'بوابة أولياء الأمور',
    'cta.login': 'تسجيل الدخول',
    'cta.contactUs': 'اتصل بنا',
    'stats.yearsOfExcellence': 'سنوات من التميز',
    'stats.happyStudents': 'طلاب سعداء',
    'stats.qualifiedTeachers': 'معلمون مؤهلون',
    'stats.nationalAwards': 'جوائز وطنية',
    'footer.schoolInfo': 'معلومات المدرسة',
    'footer.quickLinks': 'روابط سريعة',
    'footer.forParents': 'لأولياء الأمور',
    'footer.newsletter': 'النشرة الإخبارية',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.admissions': '招生',
    'nav.academics': '学术',
    'nav.studentLife': '学生生活',
    'nav.parents': '家长',
    'nav.news': '新闻',
    'nav.contact': '联系',
    'hero.title': '培养品格、卓越和创新',
    'hero.subtitle': '卓越学院致力于提供世界一流的教育，培养每个学生的学术卓越、坚强品格和创新思维。',
    'cta.applyNow': '立即申请',
    'cta.parentPortal': '家长门户',
    'cta.login': '登录',
    'cta.contactUs': '联系我们',
    'stats.yearsOfExcellence': '卓越年份',
    'stats.happyStudents': '快乐学生',
    'stats.qualifiedTeachers': '合格教师',
    'stats.nationalAwards': '国家奖项',
    'footer.schoolInfo': '学校信息',
    'footer.quickLinks': '快速链接',
    'footer.forParents': '家长专区',
    'footer.newsletter': '通讯',
  },
  sw: {
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu',
    'nav.admissions': 'Uandikishaji',
    'nav.academics': 'Masomo',
    'nav.studentLife': 'Maisha ya Wanafunzi',
    'nav.parents': 'Wazazi',
    'nav.news': 'Habari na Matukio',
    'nav.contact': 'Wasiliana',
    'hero.title': 'Kulisha Tabia, Ubora, na Ubunifu',
    'hero.subtitle': 'Excellence Academy imejitolea kutoa elimu ya kiwango cha kimataifa inayoendeleza ubora wa kitaaluma, tabia imara, na mawazo ya ubunifu kwa kila mwanafunzi.',
    'cta.applyNow': 'Omba Sasa',
    'cta.parentPortal': 'Lango la Wazazi',
    'cta.login': 'Ingia',
    'cta.contactUs': 'Wasiliana Nasi',
    'stats.yearsOfExcellence': 'Miaka ya Ubora',
    'stats.happyStudents': 'Wanafunzi Wenye Furaha',
    'stats.qualifiedTeachers': 'Walimu Wenye Sifa',
    'stats.nationalAwards': 'Tuzo za Kitaifa',
    'footer.schoolInfo': 'Habari za Shule',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.forParents': 'Kwa Wazazi',
    'footer.newsletter': 'Jarida',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
