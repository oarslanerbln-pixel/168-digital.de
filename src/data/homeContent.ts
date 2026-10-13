import type { Lang } from './serviceContent';

/**
 * Structured homepage content: the systems we build, the four-step
 * process, what a client can count on, and the FAQ.
 *
 * Kept here rather than in i18n.ts for the same reason as
 * serviceContent.ts: these are arrays of structured items, not UI labels.
 * The FAQ also feeds the homepage's FAQPage JSON-LD, so the answers that
 * search engines and AI assistants quote are exactly the ones on screen.
 *
 * Copy rules (see CLAUDE.md, "Retire the cinematic claim", #187/#188):
 * no number in here that the studio cannot back up. Timelines match the
 * ones already published on /web-saas-development.
 */

export type SolutionId = 'booking' | 'ordering' | 'dashboard' | 'automation';

export interface Solution {
  id: SolutionId;
  title: string;
  /** One sentence: the everyday problem, then what changes. */
  pitch: string;
  points: string[];
  /** Who this is typically for — lets a visitor recognise themselves. */
  fit: string;
}

export interface HomeContent {
  solutions: Solution[];
  process: { title: string; desc: string; time: string }[];
  promises: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const homeContent: Record<Lang, HomeContent> = {
  de: {
    solutions: [
      {
        id: 'booking',
        title: 'Online-Buchung & Reservierung',
        pitch: 'Schluss mit Terminen per Zuruf und vollen Mailboxen: Kunden buchen selbst, rund um die Uhr, und Sie sehen alles in einem Kalender.',
        points: ['Buchung über Website, Google & Instagram', 'Automatische Bestätigung und Erinnerung', 'Weniger No-Shows, weniger Telefonate'],
        fit: 'Restaurants, Salons, Praxen, Studios, Dienstleister',
      },
      {
        id: 'ordering',
        title: 'Digitale Speisekarte & Bestellsystem',
        pitch: 'Gäste scannen den QR-Code, sehen Gerichte mit Fotos in ihrer Sprache und bestellen direkt am Tisch oder zum Abholen.',
        points: ['QR-Menü und TV-Menüboard aus einer Quelle', 'Preise und Gerichte in Sekunden geändert', 'Deutsch, Englisch, Türkisch und mehr'],
        fit: 'Cafés, Restaurants, Bars, Imbisse, Food-Trucks',
      },
      {
        id: 'dashboard',
        title: 'Kundenportal & Business-Dashboard',
        pitch: 'Statt Excel-Listen und Zetteln: ein Ort für Aufträge, Kunden, Umsätze und Dokumente – im Browser, auf jedem Gerät.',
        points: ['Kennzahlen auf einen Blick', 'Rollen und Zugänge für Team und Kunden', 'Zugeschnitten auf Ihren Ablauf, nicht umgekehrt'],
        fit: 'Eventbetriebe, Großhandel, Handwerk, Agenturen',
      },
      {
        id: 'automation',
        title: 'Anfragen- & Prozess-Automatisierung',
        pitch: 'Jede Anfrage landet sofort beim richtigen Menschen – per WhatsApp, E-Mail oder im CRM – statt in einem Postfach zu verstauben.',
        points: ['Formulare, WhatsApp und E-Mail verbunden', 'Angebote und Rechnungen aus Vorlagen', 'Wiederkehrende Aufgaben laufen von selbst'],
        fit: 'Jedes Unternehmen mit mehr Anfragen als Zeit',
      },
    ],
    process: [
      { title: 'Kostenloses Erstgespräch', desc: '20–30 Minuten per Telefon, WhatsApp oder vor Ort. Sie erzählen, wo es hakt – wir hören zu und fragen nach.', time: 'Tag 1' },
      { title: 'Konzept & Angebot', desc: 'Sie bekommen einen klaren Plan mit Umfang, Zeitrahmen und Preis – schriftlich, bevor irgendetwas startet.', time: 'wenige Tage' },
      { title: 'Design & Umsetzung', desc: 'Regelmäßige Vorschau-Links statt Blackbox. Sie sehen den Fortschritt und geben Feedback, solange es noch einfach ist.', time: '2–10 Wochen' },
      { title: 'Launch & Betreuung', desc: 'Wir bringen alles live, zeigen Ihrem Team die Bedienung und bleiben für Änderungen und neue Ideen erreichbar.', time: 'laufend' },
    ],
    promises: [
      { title: 'Ein Ansprechpartner', desc: 'Sie sprechen direkt mit den Menschen, die Ihr Projekt bauen – auf Deutsch, Englisch oder Türkisch.' },
      { title: 'Preis vor Projektstart', desc: 'Schriftliches Angebot mit festem Umfang. Keine Überraschungen auf der Rechnung.' },
      { title: 'DSGVO von Anfang an', desc: 'Einwilligung vor Tracking, selbst gehostete Schriften, keine unnötigen Drittanbieter.' },
      { title: 'Schnell & mobil', desc: 'Gebaut für Handys im Mobilfunknetz – dort, wo Ihre Kunden wirklich sind.' },
    ],
    faq: [
      { q: 'Was kostet eine Website oder Software bei 1618 Digital?', a: 'Das hängt vom Umfang ab. Nach einem kostenlosen Erstgespräch erhalten Sie ein schriftliches Angebot mit festem Umfang und Preis – bevor die Arbeit beginnt. Eine fokussierte Landingpage ist deutlich günstiger als ein individuelles Buchungs- oder Kundenportal.' },
      { q: 'Wie lange dauert ein Projekt?', a: 'Eine fokussierte Landingpage dauert in der Regel 2–3 Wochen, eine Business-Plattform oder ein individuelles System 6–10 Wochen – je nach Umfang und wie schnell Inhalte und Feedback vorliegen.' },
      { q: 'Für welche Unternehmen arbeitet 1618 Digital?', a: 'Vor allem für Restaurants, Cafés, Eventbetriebe und lokale Dienstleister in Berlin – von Einzelunternehmen bis zum Mittelstand. Viele unserer Kunden suchen ein Team, das Deutsch, Englisch und Türkisch spricht.' },
      { q: 'Können wir Inhalte später selbst ändern?', a: 'Ja. Speisekarten, Preise, Termine und Texte lassen sich so aufbauen, dass Sie sie selbst pflegen. Wenn Sie das lieber abgeben, übernehmen wir die Pflege für Sie.' },
      { q: 'Ist das Ganze DSGVO-konform?', a: 'Datenschutz ist Teil der Planung, nicht ein Nachtrag: Tracking startet erst nach Einwilligung, Schriften werden selbst gehostet, und wir setzen nur Dienste ein, die für Ihren Zweck nötig sind.' },
      { q: 'Arbeitet ihr nur in Berlin?', a: 'Unser Sitz ist Berlin und wir kommen hier gern vorbei. Websites und Software setzen wir aber für Kunden in ganz Deutschland um – per Video-Call, Telefon und WhatsApp.' },
    ],
  },

  en: {
    solutions: [
      {
        id: 'booking',
        title: 'Online booking & reservations',
        pitch: 'No more bookings shouted across the counter or lost in voicemail: customers book themselves, around the clock, and you see everything in one calendar.',
        points: ['Bookings via your website, Google & Instagram', 'Automatic confirmations and reminders', 'Fewer no-shows, fewer phone calls'],
        fit: 'Restaurants, salons, clinics, studios, service providers',
      },
      {
        id: 'ordering',
        title: 'Digital menu & ordering system',
        pitch: 'Guests scan a QR code, see dishes with photos in their own language and order straight from the table or for pickup.',
        points: ['QR menu and TV menu board from one source', 'Prices and dishes changed in seconds', 'German, English, Turkish and more'],
        fit: 'Cafés, restaurants, bars, takeaways, food trucks',
      },
      {
        id: 'dashboard',
        title: 'Customer portal & business dashboard',
        pitch: 'Instead of spreadsheets and sticky notes: one place for orders, customers, revenue and documents — in the browser, on any device.',
        points: ['Key numbers at a glance', 'Roles and logins for your team and clients', 'Shaped around your workflow, not the other way round'],
        fit: 'Event businesses, wholesalers, trades, agencies',
      },
      {
        id: 'automation',
        title: 'Lead & process automation',
        pitch: 'Every inquiry reaches the right person immediately — via WhatsApp, email or your CRM — instead of gathering dust in an inbox.',
        points: ['Forms, WhatsApp and email connected', 'Quotes and invoices from templates', 'Recurring tasks run on their own'],
        fit: 'Any business with more inquiries than time',
      },
    ],
    process: [
      { title: 'Free intro call', desc: '20–30 minutes by phone, WhatsApp or in person. You tell us where things get stuck — we listen and ask.', time: 'Day 1' },
      { title: 'Concept & quote', desc: 'You get a clear plan with scope, timeline and price — in writing, before anything starts.', time: 'a few days' },
      { title: 'Design & build', desc: 'Regular preview links instead of a black box. You watch it take shape and give feedback while changes are still easy.', time: '2–10 weeks' },
      { title: 'Launch & support', desc: 'We take everything live, show your team how it works and stay available for changes and new ideas.', time: 'ongoing' },
    ],
    promises: [
      { title: 'One point of contact', desc: 'You talk directly to the people building your project — in German, English or Turkish.' },
      { title: 'Price before we start', desc: 'A written quote with a fixed scope. No surprises on the invoice.' },
      { title: 'GDPR from day one', desc: 'Consent before tracking, self-hosted fonts, no unnecessary third parties.' },
      { title: 'Fast & mobile', desc: 'Built for phones on mobile data — where your customers actually are.' },
    ],
    faq: [
      { q: 'How much does a website or software project with 1618 Digital cost?', a: 'It depends on scope. After a free intro call you receive a written quote with a fixed scope and price — before any work begins. A focused landing page costs considerably less than a custom booking system or customer portal.' },
      { q: 'How long does a project take?', a: 'A focused landing page typically takes 2–3 weeks; a business platform or custom system 6–10 weeks, depending on scope and how quickly content and feedback come in.' },
      { q: 'What kind of businesses does 1618 Digital work for?', a: 'Mostly restaurants, cafés, event businesses and local service providers in Berlin — from sole traders to mid-sized companies. Many of our clients want a team that speaks German, English and Turkish.' },
      { q: 'Can we update the content ourselves later?', a: 'Yes. Menus, prices, appointments and texts can be set up so you maintain them yourself. If you would rather hand that off, we take care of it for you.' },
      { q: 'Is it GDPR-compliant?', a: 'Privacy is part of the plan, not an afterthought: tracking only starts after consent, fonts are self-hosted, and we only use services your purpose actually needs.' },
      { q: 'Do you only work in Berlin?', a: 'We are based in Berlin and happy to visit in person here. Websites and software, however, we build for clients across Germany — via video call, phone and WhatsApp.' },
    ],
  },

  tr: {
    solutions: [
      {
        id: 'booking',
        title: 'Online rezervasyon & randevu',
        pitch: 'Telefonla alınan, kâğıda yazılıp kaybolan randevulara son: Müşterileriniz 7/24 kendileri rezervasyon yapar, siz her şeyi tek takvimde görürsünüz.',
        points: ['Web sitesi, Google ve Instagram üzerinden rezervasyon', 'Otomatik onay ve hatırlatma', 'Daha az gelmeyen müşteri, daha az telefon'],
        fit: 'Restoranlar, kuaförler, muayenehaneler, stüdyolar, hizmet sağlayıcılar',
      },
      {
        id: 'ordering',
        title: 'Dijital menü & sipariş sistemi',
        pitch: 'Misafirler QR kodu okutur, yemekleri fotoğraflarıyla kendi dillerinde görür ve doğrudan masadan ya da gel-al için sipariş verir.',
        points: ['QR menü ve TV menü panosu tek kaynaktan', 'Fiyat ve ürünler saniyeler içinde güncellenir', 'Almanca, İngilizce, Türkçe ve daha fazlası'],
        fit: 'Kafeler, restoranlar, barlar, büfeler, food truck’lar',
      },
      {
        id: 'dashboard',
        title: 'Müşteri portalı & yönetim paneli',
        pitch: 'Excel tabloları ve notlar yerine: siparişler, müşteriler, ciro ve belgeler için tek bir yer – tarayıcıda, her cihazda.',
        points: ['Önemli rakamlar tek bakışta', 'Ekip ve müşteriler için roller ve girişler', 'Sizin iş akışınıza göre şekillenir, tersi değil'],
        fit: 'Etkinlik firmaları, toptancılar, zanaatkârlar, ajanslar',
      },
      {
        id: 'automation',
        title: 'Talep & süreç otomasyonu',
        pitch: 'Her talep anında doğru kişiye ulaşır – WhatsApp, e-posta ya da CRM üzerinden – gelen kutusunda unutulmaz.',
        points: ['Formlar, WhatsApp ve e-posta birbirine bağlı', 'Şablonlardan teklif ve fatura', 'Tekrarlayan işler kendiliğinden yürür'],
        fit: 'Zamanından fazla talep alan her işletme',
      },
    ],
    process: [
      { title: 'Ücretsiz ön görüşme', desc: 'Telefon, WhatsApp ya da yüz yüze 20–30 dakika. Nerede takıldığınızı anlatırsınız – biz dinler ve sorarız.', time: '1. gün' },
      { title: 'Konsept & teklif', desc: 'Kapsam, süre ve fiyatı içeren net bir plan alırsınız – yazılı olarak, hiçbir şey başlamadan önce.', time: 'birkaç gün' },
      { title: 'Tasarım & geliştirme', desc: 'Kapalı kutu yerine düzenli önizleme linkleri. İlerlemeyi görür, değişiklikler henüz kolayken geri bildirim verirsiniz.', time: '2–10 hafta' },
      { title: 'Yayın & destek', desc: 'Her şeyi yayına alır, ekibinize kullanımı gösterir ve değişiklikler ile yeni fikirler için ulaşılabilir kalırız.', time: 'sürekli' },
    ],
    promises: [
      { title: 'Tek muhatap', desc: 'Projenizi geliştiren kişilerle doğrudan konuşursunuz – Almanca, İngilizce ya da Türkçe.' },
      { title: 'Başlamadan önce fiyat', desc: 'Kapsamı belli yazılı teklif. Faturada sürpriz yok.' },
      { title: 'İlk günden KVKK/DSGVO', desc: 'İzin olmadan takip yok, kendi sunucumuzda fontlar, gereksiz üçüncü taraf hizmet yok.' },
      { title: 'Hızlı & mobil', desc: 'Mobil internetteki telefonlar için geliştirilir – müşterileriniz tam da orada.' },
    ],
    faq: [
      { q: '1618 Digital ile bir web sitesi ya da yazılım ne kadara mal olur?', a: 'Kapsama bağlı. Ücretsiz ön görüşmeden sonra, iş başlamadan önce kapsamı ve fiyatı belli yazılı bir teklif alırsınız. Odaklı bir landing page, özel bir rezervasyon sistemi ya da müşteri portalından çok daha uygundur.' },
      { q: 'Bir proje ne kadar sürer?', a: 'Odaklı bir landing page genellikle 2–3 hafta, bir iş platformu ya da özel sistem 6–10 hafta sürer – kapsama ve içerik ile geri bildirimlerin ne kadar hızlı geldiğine bağlı olarak.' },
      { q: '1618 Digital hangi işletmelerle çalışıyor?', a: 'Ağırlıklı olarak Berlin’deki restoranlar, kafeler, etkinlik firmaları ve yerel hizmet sağlayıcılarla – şahıs şirketlerinden orta ölçekli firmalara kadar. Müşterilerimizin çoğu Almanca, İngilizce ve Türkçe konuşan bir ekip arıyor.' },
      { q: 'İçerikleri daha sonra kendimiz değiştirebilir miyiz?', a: 'Evet. Menüler, fiyatlar, randevular ve metinler kendiniz yönetebileceğiniz şekilde kurulabilir. Bunu bize bırakmak isterseniz bakımını biz üstleniriz.' },
      { q: 'DSGVO’ya (Avrupa veri koruma) uygun mu?', a: 'Veri koruma sonradan eklenmez, planın parçasıdır: Takip yalnızca izin verildikten sonra başlar, fontlar kendi sunucumuzda barındırılır ve yalnızca amacınız için gerekli hizmetleri kullanırız.' },
      { q: 'Sadece Berlin’de mi çalışıyorsunuz?', a: 'Merkezimiz Berlin ve burada sizi seve seve ziyaret ederiz. Web siteleri ve yazılımları ise tüm Almanya’daki müşteriler için – görüntülü görüşme, telefon ve WhatsApp üzerinden – geliştiriyoruz.' },
    ],
  },
};

/**
 * Product photos for the hero and the solution cards. Language-neutral, so
 * one entry per image rather than per language. Generated mockups: sources
 * in assets-src/solutions/, WebP widths written by scripts/optimize-images.mjs.
 */
export interface ResponsiveImage {
  /** Path stem; the files are `${stem}-640.webp` and `${stem}-1080.webp`. */
  stem: string;
  /** Intrinsic ratio of the shipped crop, so the browser reserves the box. */
  width: number;
  height: number;
}

export const heroImage: ResponsiveImage = { stem: '/solutions/hero', width: 1080, height: 1080 };

export const solutionImages: Record<SolutionId, ResponsiveImage> = {
  booking: { stem: '/solutions/booking', width: 1080, height: 675 },
  ordering: { stem: '/solutions/ordering', width: 1080, height: 675 },
  dashboard: { stem: '/solutions/dashboard', width: 1080, height: 675 },
  automation: { stem: '/solutions/automation', width: 1080, height: 675 },
};

export const srcSet = (img: ResponsiveImage) => `${img.stem}-640.webp 640w, ${img.stem}-1080.webp 1080w`;

export const getHomeContent = (language: string): HomeContent =>
  homeContent[(language.substring(0, 2).toLowerCase() as Lang)] ?? homeContent.en;
