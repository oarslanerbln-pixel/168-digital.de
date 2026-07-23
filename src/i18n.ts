import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "meta_title": "168 Digital | Web, AI & Cinematic Production Studio · Berlin",
      "meta_description": "168 Digital builds websites & 3D SaaS platforms, 24/7 AI voice agents, and cinematic video, drone & wedding productions in Berlin. End-to-end digital solutions that grow your brand.",
      "hero_eyebrow": "Digital Studio · Berlin",
      "hero_title": "We architect digital ecosystems.",
      "hero_subtitle": "Websites & 3D SaaS platforms, 24/7 AI voice agents, and cinematic video, drone & wedding productions — end-to-end digital solutions that grow your brand.",
      "hero_button": "Explore Services",
      "chip_web": "Web & SaaS Development",
      "chip_ai": "AI Voice Agents",
      "chip_video": "Video & Drone Production",
      "chip_event": "Wedding & Event Films",
      "chip_social": "Social Media & Content",
      "services_overline": "WHAT WE DO",
      "services_title": "Services",
      "services_subtitle": "From websites and custom software to AI, cinematic video and social media — everything your brand needs, under one roof.",
      "service_web_title": "Web Design & Development",
      "service_web_desc": "Fast, high-converting websites and web apps — from landing pages to full business platforms.",
      "service_saas_title": "SaaS & Custom Workflows",
      "service_saas_desc": "3D Configurators, custom booking engines, and dedicated business dashboards.",
      "service_ai_title": "AI Voice Agents",
      "service_ai_desc": "24/7 human-like voice receptionists to capture every lead.",
      "service_media_title": "Premium Production",
      "service_media_desc": "Cinematic drone footage and DaVinci Resolve color grading.",
      "service_social_title": "Social Media Packages",
      "service_social_desc": "High-impact short-form videos and content strategies for Instagram and TikTok.",
      "service_event_title": "Event & Wedding Cinematography",
      "service_event_desc": "Emotional moments captured in high-definition and aesthetic perfection.",
      "service_trailer_title": "Cinematic Storytelling",
      "service_trailer_desc": "High-end teasers and trailers that turn your vision into a captivating visual experience.",
      "contact_button": "Let's Build Together",
      "language": "EN",
      "works_title": "Selected Projects & Productions",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digital identity and media presence for Berlin's premier street food brand.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium event management platform with tailored digital flows.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-end cinematic gateway for a creative production studio.",
      "about_title": "Philosophy",
      "about_subtitle": "Ratio. Ethics.",
      "about_text": "We believe in the Golden Ratio (1.618)—where proportion meets aesthetic perfection. From cutting-edge software development to high-end photo and video production, we merge technological precision with visual mastery. We don't create standard solutions, but tailor-made digital and cinematic experiences that make your brand unforgettable.",
      "contact_title": "Initiate a Project",
      "contact_name": "Your Name",
      "contact_email": "Email Address",
      "contact_message": "Project Details...",
      "contact_send": "Send Transmission",
      "contact_sending": "Sending…",
      "contact_error": "Something went wrong. Please try again or email us at info@168-digital.de.",
      "contact_success": "Transmission received. We will contact you shortly.",
      "contact_dsgvo_consent": "I agree to the processing of my data in accordance with the privacy policy. My data will only be used to process my inquiry and will not be shared with third parties.",
      "stat_projects": "Projects",
      "stat_clients": "Clients",
      "stat_satisfaction": "Satisfaction",
      "stat_uptime": "AI Uptime",
      "wa_operator_online": "● OPERATOR ONLINE",
      "wa_quick_connect": "WhatsApp Quick-Connect",
      "wa_tap_to_chat": "TAP TO CHAT",
      "wa_copied": "COPIED",
      "wa_copy": "COPY",
      "wa_message": "Hello, I'm interested in starting a project with 168 Digital!",
      "nav_home": "HOME",
      "nav_home_sub": "SYS.BOOT // CORE INTERFACE",
      "nav_cinematics": "CINEMATICS",
      "nav_cinematics_sub": "SYS.REEL // AUDIO VISUAL GRID",
      "nav_ecosystems": "PROJECTS",
      "nav_ecosystems_sub": "SYS.WORK // PORTFOLIO & PRODUCTIONS",
      "nav_philosophy": "PHILOSOPHY",
      "nav_philosophy_sub": "SYS.MIND // RATIONAL DESIGN DOCS",
      "nav_capabilities": "CAPABILITIES",
      "nav_capabilities_sub": "SYS.SPEC // STACK CAPABILITIES",
      "nav_services": "SERVICES",
      "nav_services_sub": "SYS.MAP // SERVICE DIRECTORY",
      "nav_initiate": "INITIATE",
      "nav_initiate_sub": "SYS.COMM // TRANSMIT PROPOSAL",
      "svc_features_heading": "What's Included",
      "svc_process_heading": "How We Work",
      "svc_faq_heading": "Frequently Asked Questions",
      "svc_related_services_heading": "Other Services",
      "svc_related_work_heading": "Related Work",
      "svc_visit_project": "Visit Project",
      "svc_breadcrumb_home": "Home",
      "svc_not_found_title": "Service Not Found",
      "svc_not_found_text": "We couldn't find that service page.",
      "svc_not_found_cta": "Back to Home",
      "svc_all_services_heading": "All Services",
      "svc_view_details": "View Details"
    }
  },
  de: {
    translation: {
      "meta_title": "168 Digital | Web-, KI- & Kino-Produktionsstudio · Berlin",
      "meta_description": "168 Digital entwickelt Websites & 3D-SaaS-Plattformen, KI-Sprachagenten rund um die Uhr sowie kinoreife Video-, Drohnen- und Hochzeitsproduktionen in Berlin. Digitale Komplettlösungen für Ihr Wachstum.",
      "hero_eyebrow": "Digitalstudio · Berlin",
      "hero_title": "Wir gestalten digitale Ökosysteme.",
      "hero_subtitle": "Websites & 3D-SaaS-Plattformen, KI-Sprachagenten rund um die Uhr sowie kinoreife Video-, Drohnen- und Hochzeitsproduktionen — digitale Komplettlösungen, die Ihre Marke wachsen lassen.",
      "hero_button": "Leistungen entdecken",
      "chip_web": "Webdesign & Entwicklung",
      "chip_ai": "KI-Sprachagenten",
      "chip_video": "Video- & Drohnenproduktion",
      "chip_event": "Hochzeits- & Eventfilme",
      "chip_social": "Social Media & Content",
      "services_overline": "WAS WIR TUN",
      "services_title": "Leistungen",
      "services_subtitle": "Von Websites und individueller Software bis zu KI, kinoreifem Video und Social Media — alles für Ihre Marke aus einer Hand.",
      "service_web_title": "Webdesign & Entwicklung",
      "service_web_desc": "Schnelle, conversion-starke Websites und Web-Apps — von der Landingpage bis zur kompletten Unternehmensplattform.",
      "service_saas_title": "SaaS & Custom Workflows",
      "service_saas_desc": "3D-Konfiguratoren, benutzerdefinierte Buchungsmaschinen und unternehmensspezifische Dashboards.",
      "service_ai_title": "KI Sprachagenten",
      "service_ai_desc": "Menschlich klingende Sprachassistenten, die rund um die Uhr Leads generieren.",
      "service_media_title": "Premium Produktion",
      "service_media_desc": "Kinoreife Drohnenaufnahmen und DaVinci Resolve Color Grading.",
      "service_social_title": "Social Media Pakete",
      "service_social_desc": "Wirkungsstarke Kurzvideos und Content-Strategien für Instagram und TikTok.",
      "service_event_title": "Event- & Hochzeitskinematografie",
      "service_event_desc": "Emotionale Augenblicke, festgehalten in höchster Auflösung und ästhetischer Perfektion.",
      "service_trailer_title": "Cinematic Storytelling",
      "service_trailer_desc": "Hochwertige Teaser und Trailer, die Ihre Vision in ein fesselndes visuelles Erlebnis verwandeln.",
      "contact_button": "Zusammen Bauen",
      "language": "DE",
      "works_title": "Ausgewählte Projekte & Produktionen",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Digitale Identität und Medienpräsenz für Berlins führende Street-Food-Marke.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Premium-Event-Management-Plattform mit maßgeschneiderten digitalen Abläufen.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "High-End-Kino-Portal für ein kreatives Produktionsstudio.",
      "about_title": "Philosophie",
      "about_subtitle": "Proportion. Ethik.",
      "about_text": "Wir glauben an den Goldenen Schnitt (1.618) – wo perfekte Proportion auf Ästhetik trifft. Von der hochmodernen Software-Entwicklung bis hin zu High-End-Foto- und Videoproduktionen vereinen wir technologische Präzision mit visueller Meisterhaftigkeit. Wir kreieren keine Standardlösungen, sondern maßgeschneiderte digitale und visuelle Erlebnisse, die Ihre Marke unvergesslich machen.",
      "contact_title": "Projekt Initiieren",
      "contact_name": "Ihr Name",
      "contact_email": "E-Mail Adresse",
      "contact_message": "Projektdetails...",
      "contact_send": "Senden",
      "contact_sending": "Wird gesendet…",
      "contact_error": "Etwas ist schiefgelaufen. Bitte erneut versuchen oder an info@168-digital.de schreiben.",
      "contact_success": "Erhalten. Wir melden uns in Kürze bei Ihnen.",
      "contact_dsgvo_consent": "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. Meine Daten werden ausschließlich zur Bearbeitung meiner Anfrage verwendet und nicht an Dritte weitergegeben.",
      "stat_projects": "Projekte",
      "stat_clients": "Kunden",
      "stat_satisfaction": "Zufriedenheit",
      "stat_uptime": "KI-Uptime",
      "wa_operator_online": "● OPERATOR ONLINE",
      "wa_quick_connect": "WhatsApp Schnellkontakt",
      "wa_tap_to_chat": "JETZT CHATTEN",
      "wa_copied": "KOPIERT",
      "wa_copy": "KOPIEREN",
      "wa_message": "Hallo, ich interessiere mich für ein Projekt mit 168 Digital!",
      "nav_home": "STARTSEITE",
      "nav_home_sub": "SYS.BOOT // HAUPTSCHNITTSTELLE",
      "nav_cinematics": "KINEMATOGRAPHIE",
      "nav_cinematics_sub": "SYS.REEL // AUDIOVISUELLES RASTER",
      "nav_ecosystems": "PROJEKTE",
      "nav_ecosystems_sub": "SYS.WORK // PORTFOLIO & PRODUKTIONEN",
      "nav_philosophy": "PHILOSOPHIE",
      "nav_philosophy_sub": "SYS.MIND // RATIONALE PHILOSOPHIE",
      "nav_capabilities": "KOMPETENZEN",
      "nav_capabilities_sub": "SYS.SPEC // STACK-SPEZIFIKATIONEN",
      "nav_services": "LEISTUNGEN",
      "nav_services_sub": "SYS.MAP // LEISTUNGSVERZEICHNIS",
      "nav_initiate": "KONTAKT",
      "nav_initiate_sub": "SYS.COMM // PROJEKT INITIIGEREN",
      "svc_features_heading": "Leistungsumfang",
      "svc_process_heading": "So arbeiten wir",
      "svc_faq_heading": "Häufig gestellte Fragen",
      "svc_related_services_heading": "Weitere Leistungen",
      "svc_related_work_heading": "Verwandte Projekte",
      "svc_visit_project": "Projekt ansehen",
      "svc_breadcrumb_home": "Start",
      "svc_not_found_title": "Seite nicht gefunden",
      "svc_not_found_text": "Diese Leistungsseite konnten wir nicht finden.",
      "svc_not_found_cta": "Zur Startseite",
      "svc_all_services_heading": "Alle Leistungen",
      "svc_view_details": "Details ansehen"
    }
  },
  tr: {
    translation: {
      "meta_title": "168 Digital | Web, Yapay Zeka & Sinematik Prodüksiyon Stüdyosu · Berlin",
      "meta_description": "168 Digital, Berlin'de web siteleri & 3D SaaS platformları, 7/24 yapay zeka sesli asistanlar ve sinematik video, drone & düğün prodüksiyonları geliştirir. Markanızı büyüten uçtan uca dijital çözümler.",
      "hero_eyebrow": "Dijital Stüdyo · Berlin",
      "hero_title": "Dijital ekosistemler tasarlıyoruz.",
      "hero_subtitle": "Web siteleri & 3D SaaS platformları, 7/24 yapay zeka sesli asistanlar, sinematik video, drone ve düğün çekimleri — markanızı büyüten uçtan uca dijital çözümler.",
      "hero_button": "Hizmetleri Keşfet",
      "chip_web": "Web Tasarım & Geliştirme",
      "chip_ai": "Yapay Zeka Sesli Asistan",
      "chip_video": "Video & Drone Çekimi",
      "chip_event": "Düğün & Etkinlik Filmi",
      "chip_social": "Sosyal Medya & İçerik",
      "services_overline": "NE YAPIYORUZ",
      "services_title": "Hizmetler",
      "services_subtitle": "Web sitelerinden özel yazılıma, yapay zekadan sinematik videoya ve sosyal medyaya kadar — markanızın ihtiyacı olan her şey tek çatı altında.",
      "service_web_title": "Web Tasarım & Geliştirme",
      "service_web_desc": "Hızlı ve dönüşüm odaklı web siteleri ve web uygulamaları — açılış sayfasından tam işletme platformuna kadar.",
      "service_saas_title": "SaaS & Özel İş Akışları",
      "service_saas_desc": "3D Konfigüratörler, özel rezervasyon motorları ve şirkete özel paneller.",
      "service_ai_title": "Yapay Zeka Sesli Asistanlar",
      "service_ai_desc": "7/24 müşteri yakalayan, insan sesi doğallığında dijital asistanlar.",
      "service_media_title": "Premium Prodüksiyon",
      "service_media_desc": "Sinematik drone çekimleri ve DaVinci Resolve renk düzenlemesi.",
      "service_social_title": "Sosyal Medya Paketleri",
      "service_social_desc": "Instagram ve TikTok için yüksek etkili kısa videolar ve içerik stratejileri.",
      "service_event_title": "Etkinlik & Düğün Sinematografisi",
      "service_event_desc": "Duygusal anların en yüksek çözünürlük ve estetik mükemmellikle kaydedilmesi.",
      "service_trailer_title": "Sinematik Hikaye Anlatımı",
      "service_trailer_desc": "Vizyonunuzu büyüleyici bir görsel deneyime dönüştüren üst düzey teaser ve fragmanlar.",
      "contact_button": "Birlikte İnşa Edelim",
      "language": "TR",
      "works_title": "Seçili Projeler & Prodüksiyonlar",
      "works_donerbros_title": "Döner Bros Berlin",
      "works_donerbros_desc": "Berlin'in önde gelen sokak lezzeti markası için dijital kimlik ve medya varlığı.",
      "works_sera_title": "Sera Event",
      "works_sera_desc": "Özel dijital akışlara sahip premium etkinlik yönetim platformu.",
      "works_impulse_title": "Impulse Production",
      "works_impulse_desc": "Yaratıcı bir prodüksiyon stüdyosu için üst düzey sinematik giriş.",
      "about_title": "Felsefe",
      "about_subtitle": "Oran. Etik.",
      "about_text": "Altın Oran'a (1.618) inanıyoruz – oranın estetik mükemmellikle buluştuğu nokta. En yeni yazılım geliştirmelerinden üst düzey fotoğraf ve video prodüksiyonlarına kadar, teknolojik hassasiyeti görsel ustalıkla birleştiriyoruz. Standart çözümler değil, markanızı unutulmaz kılan özel dijital ve görsel deneyimler yaratıyoruz.",
      "contact_title": "Proje Başlat",
      "contact_name": "Adınız",
      "contact_email": "E-posta Adresi",
      "contact_message": "Proje Detayları...",
      "contact_send": "Gönder",
      "contact_sending": "Gönderiliyor…",
      "contact_error": "Bir şeyler ters gitti. Lütfen tekrar deneyin veya info@168-digital.de adresine yazın.",
      "contact_success": "Alındı. Sizinle en kısa sürede iletişime geçeceğiz.",
      "contact_dsgvo_consent": "Verilerimin gizlilik politikasına uygun olarak işlenmesini kabul ediyorum. Verilerim sadece talebimi işlemek için kullanılacak ve üçüncü şahıslarla paylaşılmayacaktır.",
      "stat_projects": "Projeler",
      "stat_clients": "Müşteriler",
      "stat_satisfaction": "Memnuniyet",
      "stat_uptime": "AI Kesintisiz",
      "wa_operator_online": "● OPERATÖR ÇEVRİMİÇİ",
      "wa_quick_connect": "WhatsApp Hızlı İletişim",
      "wa_tap_to_chat": "SOHBETE BAŞLA",
      "wa_copied": "KOPYALANDI",
      "wa_copy": "KOPYALA",
      "wa_message": "Merhaba, 168 Digital ile bir projeye başlamakla ilgileniyorum!",
      "nav_home": "ANA SAYFA",
      "nav_home_sub": "SYS.BOOT // ANA ARAYÜZ",
      "nav_cinematics": "SİNEMATOGRAFİ",
      "nav_cinematics_sub": "SYS.REEL // GÖRSEL İŞİTSEL AĞ",
      "nav_ecosystems": "PROJELER",
      "nav_ecosystems_sub": "SYS.WORK // PORTFÖY & PRODÜKSİYON",
      "nav_philosophy": "FELSEFE",
      "nav_philosophy_sub": "SYS.MIND // RASYONEL TASARIM",
      "nav_capabilities": "YETENEKLER",
      "nav_capabilities_sub": "SYS.SPEC // STACK YETENEKLERİ",
      "nav_services": "HİZMETLER",
      "nav_services_sub": "SYS.MAP // HİZMET DİZİNİ",
      "nav_initiate": "İLETİŞİM",
      "nav_initiate_sub": "SYS.COMM // PROJE BAŞLAT",
      "svc_features_heading": "Neler Dahil",
      "svc_process_heading": "Nasıl Çalışıyoruz",
      "svc_faq_heading": "Sıkça Sorulan Sorular",
      "svc_related_services_heading": "Diğer Hizmetler",
      "svc_related_work_heading": "İlgili Projeler",
      "svc_visit_project": "Projeyi Görüntüle",
      "svc_breadcrumb_home": "Ana Sayfa",
      "svc_not_found_title": "Hizmet Bulunamadı",
      "svc_not_found_text": "Bu hizmet sayfasını bulamadık.",
      "svc_not_found_cta": "Ana Sayfaya Dön",
      "svc_all_services_heading": "Tüm Hizmetler",
      "svc_view_details": "Detayları Gör"
    }
  }
};

const SUPPORTED_LANGS = ['en', 'de', 'tr'];

const getUserLanguage = () => {
  // The ?lang= param is what our hreflang tags and sitemap.xml advertise to
  // search engines as distinct language URLs — it must take priority so those
  // URLs actually render the language they claim to.
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;

  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang) return storedLang;

  const browserLang = navigator.language.split('-')[0];
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getUserLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

// Update language in localStorage, document lang attribute, and the URL's
// ?lang= param when it changes, so the address bar always matches what's
// displayed — keeping it shareable and consistent with our hreflang tags.
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;

  const url = new URL(window.location.href);
  if (lng === 'en') {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', lng);
  }
  window.history.replaceState({}, '', url.toString());
});

// Set initial html lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

export default i18n;
