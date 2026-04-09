import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "services": "Services",
      "blog": "Blog",
      "about": "About Us",
      "contact": "Contact",
      "calendar": "Calendar",
      "hero_title": "Awaken Your Spiritual Journey",
      "hero_subtitle": "Authentic Vedic Anusthan, Yagya, and Ritual Services in the heart of the Himalayas.",
      "book_anusthan": "Book Anusthan",
      "contact_us": "Contact Us",
      "our_services": "Our Services",
      "read_more": "Read More",
      "latest_blogs": "Latest Spiritual Insights",
      "mission_vision": "Our Mission & Vision",
      "mission_text": "To preserve and propagate the ancient Vedic wisdom and rituals for the spiritual upliftment of humanity.",
      "vision_text": "A world where the profound peace and harmony of Vedic traditions guide everyday life.",
      "contact_form_title": "Get in Touch",
      "name": "Full Name",
      "email": "Email Address",
      "phone": "Phone Number",
      "message": "Your Message",
      "send_message": "Send Message",
      "admin_dashboard": "Admin Dashboard",
      "login": "Login",
      "logout": "Logout",
      "manage_blogs": "Manage Blogs",
      "manage_services": "Manage Services",
      "view_contacts": "View Contacts",
      "tithi": "Tithi",
      "gate": "Gate",
      "today": "Today",
      "location": "Location",
      "nepal": "Nepal",
      "global": "Global",
      "footer_text": "© 2026 Himavat Arsa Prjna. All rights reserved."
    }
  },
  np: {
    translation: {
      "home": "गृहपृष्ठ",
      "services": "सेवाहरू",
      "blog": "ब्लग",
      "about": "हाम्रो बारेमा",
      "contact": "सम्पर्क",
      "calendar": "पात्रो",
      "hero_title": "तपाईंको आध्यात्मिक यात्रा जागृत गर्नुहोस्",
      "hero_subtitle": "हिमालयको काखमा प्रामाणिक वैदिक अनुष्ठान, यज्ञ र कर्मकाण्ड सेवाहरू।",
      "book_anusthan": "अनुष्ठान बुक गर्नुहोस्",
      "contact_us": "सम्पर्क गर्नुहोस्",
      "our_services": "हाम्रा सेवाहरू",
      "read_more": "थप पढ्नुहोस्",
      "latest_blogs": "नवीनतम आध्यात्मिक विचारहरू",
      "mission_vision": "हाम्रो लक्ष्य र दृष्टि",
      "mission_text": "मानवताको आध्यात्मिक उत्थानको लागि प्राचीन वैदिक ज्ञान र अनुष्ठानहरूको संरक्षण र प्रचार गर्ने।",
      "vision_text": "वैदिक परम्पराहरूको गहिरो शान्ति र सद्भावले दैनिक जीवनलाई मार्गदर्शन गर्ने संसार।",
      "contact_form_title": "सम्पर्कमा रहनुहोस्",
      "name": "पूरा नाम",
      "email": "इमेल ठेगाना",
      "phone": "फोन नम्बर",
      "message": "तपाईंको सन्देश",
      "send_message": "सन्देश पठाउनुहोस्",
      "admin_dashboard": "प्रशासक ड्यासबोर्ड",
      "login": "लगइन",
      "logout": "लगआउट",
      "manage_blogs": "ब्लग व्यवस्थापन",
      "manage_services": "सेवा व्यवस्थापन",
      "view_contacts": "सम्पर्क हेर्नुहोस्",
      "tithi": "तिथि",
      "gate": "गते",
      "today": "आज",
      "location": "स्थान",
      "nepal": "नेपाल",
      "global": "विश्वव्यापी",
      "footer_text": "© २०२६ हिमवत् आर्ष प्रज्ञा। सबै अधिकार सुरक्षित।"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
