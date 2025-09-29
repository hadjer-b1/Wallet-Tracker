export const messages = {
  en: {
    title: "Wallet Tracker",
    home: "Home",
    addExpense: "Add Expense",
    statistics: "Statistics",
    overview: "Overview",
    trend: "Spend Trend",
  },
  fr: {
    title: "Suivi de Portefeuille",
    home: "Accueil",
    addExpense: "Ajouter Dépense",
    statistics: "Statistiques",
    overview: "Aperçu",
    trend: "Tendance des dépenses",
  },
  ar: {
    title: "متابعة المحفظة والتحليلات",
    home: "الرئيسية",
    addExpense: "إضافة مصروف",
    statistics: "الإحصائيات",
    overview: "نظرة عامة",
    trend: "اتجاه الإنفاق",
  },
};

export const t = (lang, key) =>
  (messages[lang] && messages[lang][key]) ?? messages.en[key] ?? key;

export const categoryTranslations = {
  Food: { fr: "Nourriture", ar: "طعام" },
  Transport: { fr: "Transport", ar: "نقل" },
  Rent: { fr: "Loyer", ar: "إيجار" },
  "Phone Recharge": { fr: "Recharge Téléphone", ar: "شحن الهاتف" },
  Utilities: { fr: "Services publics", ar: "مرافق" },
  Health: { fr: "Santé", ar: "صحة" },
  Entertainment: { fr: "Divertissement", ar: "ترفيه" },
  Other: { fr: "Autre", ar: "أخرى" },
};

export const translateCategory = (lang, name) => {
  if (!name) return name;
  const entry = categoryTranslations[name];
  if (!entry) return name;
  if (lang === "fr") return entry.fr;
  if (lang === "ar") return entry.ar;
  return name;
};
