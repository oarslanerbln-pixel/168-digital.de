export type Lang = 'en' | 'de' | 'tr';

export interface ServicePageContent {
  metaTitle: string;
  metaDescription: string;
  overline: string;
  h1: string;
  intro: string[];
  features: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  relatedWorkIds: string[];
}

/**
 * Long-form, per-service, per-language content for the 5 dedicated
 * landing pages. Kept outside i18next (flat key/value store) because this
 * is structured content — arrays of features/process/FAQ — not simple UI
 * strings.
 */
export const serviceContent: Record<string, Record<Lang, ServicePageContent>> = {
  'web-saas-development': {
    en: {
      metaTitle: '1618 Digital | Web Design & SaaS Development Berlin',
      metaDescription:
        'Custom websites, web apps and SaaS platforms built in Berlin. Fast, high-converting, and engineered to grow your business.',
      overline: 'WEB & SOFTWARE',
      h1: 'Web Design & SaaS Development in Berlin',
      intro: [
        'We design and build websites and web applications that are fast, easy to manage, and built to convert visitors into customers — from single-page landing sites to multi-page business platforms with booking, payments, and custom dashboards.',
        'For brands that need more than a website, we build bespoke SaaS products: booking engines, internal tools, customer portals and interactive product configurators — engineered with the same precision as our visual work, backed by the Golden Ratio philosophy that defines everything we make.',
      ],
      features: [
        { title: 'Custom Websites & Landing Pages', desc: 'Hand-built with React, optimized for speed, accessibility and search engines — no bloated page builders.' },
        { title: 'Web Applications & Dashboards', desc: 'Internal tools, client portals and booking systems tailored to your exact workflow.' },
        { title: '3D Product Configurators', desc: 'Interactive 3D experiences for e-commerce and product showcases that keep visitors engaged.' },
        { title: 'SaaS MVP Development', desc: 'From idea to working product — React & Firebase stacks built for real users, not just demos.' },
        { title: 'Multilingual & SEO-Ready', desc: 'Structured for German, English and Turkish audiences with technical SEO built in from day one.' },
        { title: 'Ongoing Support', desc: 'We stay involved after launch — updates, monitoring and iteration as your business grows.' },
      ],
      process: [
        { title: 'Discovery & Architecture', desc: 'We map your goals, users and content into a clear sitemap and technical plan before a single line of code is written.' },
        { title: 'Design & Build', desc: 'Interface design and development happen in parallel, with regular checkpoints so you always see real progress.' },
        { title: 'Launch & Iterate', desc: 'We deploy, monitor performance, and keep refining based on real visitor data after go-live.' },
      ],
      faq: [
        { q: 'How long does a website project take?', a: 'A focused landing page typically takes 2–3 weeks; a full business platform or SaaS MVP takes 6–10 weeks, depending on scope.' },
        { q: 'Do you build on a page builder like Wix or WordPress?', a: 'No — we hand-code with React for full control over performance, SEO and design, which page builders can\'t match.' },
        { q: 'Can you redesign my existing website?', a: 'Yes. We regularly rebuild underperforming sites, migrating content and improving speed, structure and conversion along the way.' },
      ],
      ctaTitle: 'Have a web or software project in mind?',
      ctaText: 'Tell us about your goals and we\'ll map out the fastest path to a live, working product.',
      relatedWorkIds: ['donerbros', 'sera'],
    },
    de: {
      metaTitle: '1618 Digital | Webdesign & SaaS-Entwicklung Berlin',
      metaDescription:
        'Individuelle Websites, Web-Apps und SaaS-Plattformen aus Berlin. Schnell, conversion-stark und auf Wachstum ausgelegt.',
      overline: 'WEB & SOFTWARE',
      h1: 'Webdesign & SaaS-Entwicklung in Berlin',
      intro: [
        'Wir entwerfen und entwickeln Websites und Web-Anwendungen, die schnell laden, einfach zu pflegen sind und Besucher zu Kunden machen — von der Landingpage bis zur mehrseitigen Business-Plattform mit Buchung, Zahlung und individuellem Dashboard.',
        'Für Marken, die mehr als eine Website brauchen, entwickeln wir maßgeschneiderte SaaS-Produkte: Buchungssysteme, interne Tools, Kundenportale und interaktive Produktkonfiguratoren — mit derselben Präzision wie unsere visuelle Arbeit, geprägt von der Goldenen-Schnitt-Philosophie, die alles bei uns bestimmt.',
      ],
      features: [
        { title: 'Individuelle Websites & Landingpages', desc: 'Handgebaut mit React, optimiert für Geschwindigkeit, Barrierefreiheit und Suchmaschinen — keine überladenen Baukästen.' },
        { title: 'Web-Anwendungen & Dashboards', desc: 'Interne Tools, Kundenportale und Buchungssysteme, exakt auf Ihren Workflow zugeschnitten.' },
        { title: '3D-Produktkonfiguratoren', desc: 'Interaktive 3D-Erlebnisse für E-Commerce und Produktpräsentationen, die Besucher wirklich binden.' },
        { title: 'SaaS-MVP-Entwicklung', desc: 'Von der Idee zum funktionierenden Produkt — React- & Firebase-Stacks für echte Nutzer, nicht nur Demos.' },
        { title: 'Mehrsprachig & SEO-bereit', desc: 'Strukturiert für deutsches, englisches und türkisches Publikum, technisches SEO von Anfang an integriert.' },
        { title: 'Laufende Betreuung', desc: 'Wir bleiben nach dem Launch dran — Updates, Monitoring und Weiterentwicklung mit Ihrem Wachstum.' },
      ],
      process: [
        { title: 'Analyse & Architektur', desc: 'Wir übersetzen Ihre Ziele, Nutzer und Inhalte in eine klare Sitemap und einen technischen Plan, bevor eine Zeile Code geschrieben wird.' },
        { title: 'Design & Umsetzung', desc: 'Interface-Design und Entwicklung laufen parallel, mit regelmäßigen Abstimmungen, damit Sie stets echten Fortschritt sehen.' },
        { title: 'Launch & Optimierung', desc: 'Wir gehen live, überwachen die Performance und verfeinern kontinuierlich anhand echter Besucherdaten.' },
      ],
      faq: [
        { q: 'Wie lange dauert ein Website-Projekt?', a: 'Eine fokussierte Landingpage dauert in der Regel 2–3 Wochen; eine vollständige Business-Plattform oder ein SaaS-MVP 6–10 Wochen, je nach Umfang.' },
        { q: 'Arbeiten Sie mit Baukästen wie Wix oder WordPress?', a: 'Nein — wir programmieren mit React für volle Kontrolle über Performance, SEO und Design, was Baukästen nicht bieten können.' },
        { q: 'Können Sie meine bestehende Website neu gestalten?', a: 'Ja. Wir bauen regelmäßig unterperformende Websites neu auf, migrieren Inhalte und verbessern dabei Geschwindigkeit, Struktur und Conversion.' },
      ],
      ctaTitle: 'Haben Sie ein Web- oder Software-Projekt im Kopf?',
      ctaText: 'Erzählen Sie uns von Ihren Zielen — wir zeigen den schnellsten Weg zu einem funktionierenden, live geschalteten Produkt.',
      relatedWorkIds: ['donerbros', 'sera'],
    },
    tr: {
      metaTitle: '1618 Digital | Web Tasarım & SaaS Geliştirme Berlin',
      metaDescription:
        'Berlin merkezli özel web siteleri, web uygulamaları ve SaaS platformları. Hızlı, dönüşüm odaklı ve büyümeye göre kurgulanmış.',
      overline: 'WEB & YAZILIM',
      h1: 'Berlin\'de Web Tasarım & SaaS Geliştirme',
      intro: [
        'Hızlı yüklenen, yönetimi kolay ve ziyaretçileri müşteriye dönüştüren web siteleri ve web uygulamaları tasarlıyor ve geliştiriyoruz — tek sayfalık açılış sayfalarından, rezervasyon ve ödeme entegrasyonlu çok sayfalı işletme platformlarına kadar.',
        'Bir web sitesinden fazlasına ihtiyaç duyan markalar için özel SaaS ürünleri geliştiriyoruz: rezervasyon motorları, iç araçlar, müşteri portalları ve interaktif ürün konfigüratörleri — görsel işlerimizdeki aynı hassasiyetle, her işimizi şekillendiren Altın Oran felsefesine dayanarak.',
      ],
      features: [
        { title: 'Özel Web Siteleri & Açılış Sayfaları', desc: 'React ile elle kodlanmış, hız, erişilebilirlik ve arama motorları için optimize edilmiş — şişkin site oluşturuculara gerek yok.' },
        { title: 'Web Uygulamaları & Panolar', desc: 'İş akışınıza tam uyan iç araçlar, müşteri portalları ve rezervasyon sistemleri.' },
        { title: '3D Ürün Konfigüratörleri', desc: 'E-ticaret ve ürün sunumları için ziyaretçiyi gerçekten meşgul eden interaktif 3D deneyimler.' },
        { title: 'SaaS MVP Geliştirme', desc: 'Fikirden çalışan ürüne — sadece demo değil, gerçek kullanıcılar için React & Firebase altyapısı.' },
        { title: 'Çok Dilli & SEO Hazır', desc: 'Almanca, İngilizce ve Türkçe kitleler için yapılandırılmış, teknik SEO baştan entegre.' },
        { title: 'Sürekli Destek', desc: 'Lansmandan sonra da yanınızdayız — güncellemeler, izleme ve işiniz büyüdükçe geliştirme.' },
      ],
      process: [
        { title: 'Keşif & Mimari', desc: 'Tek satır kod yazılmadan önce hedeflerinizi, kullanıcılarınızı ve içeriğinizi net bir site haritası ve teknik plana dönüştürüyoruz.' },
        { title: 'Tasarım & Geliştirme', desc: 'Arayüz tasarımı ve geliştirme paralel ilerler; düzenli kontrol noktalarıyla gerçek ilerlemeyi her zaman görürsünüz.' },
        { title: 'Yayın & İyileştirme', desc: 'Canlıya alır, performansı izler ve gerçek ziyaretçi verilerine göre sürekli iyileştiririz.' },
      ],
      faq: [
        { q: 'Bir web sitesi projesi ne kadar sürer?', a: 'Odaklı bir açılış sayfası genelde 2-3 hafta sürer; kapsamına göre tam bir işletme platformu veya SaaS MVP\'si 6-10 hafta sürer.' },
        { q: 'Wix veya WordPress gibi site oluşturucular kullanıyor musunuz?', a: 'Hayır — performans, SEO ve tasarım üzerinde tam kontrol için React ile elle kodluyoruz; site oluşturucular bunu sağlayamaz.' },
        { q: 'Mevcut web sitemi yeniden tasarlayabilir misiniz?', a: 'Evet. Düşük performanslı siteleri düzenli olarak yeniden kuruyor, içeriği taşıyor, hızı, yapıyı ve dönüşümü iyileştiriyoruz.' },
      ],
      ctaTitle: 'Aklınızda bir web veya yazılım projesi mi var?',
      ctaText: 'Hedeflerinizi bize anlatın, canlıya alınmış çalışan bir ürüne en hızlı yolu birlikte planlayalım.',
      relatedWorkIds: ['donerbros', 'sera'],
    },
  },

  'video-drone-production': {
    en: {
      metaTitle: '1618 Digital | Cinematic & Drone Video Production Berlin',
      metaDescription:
        'Cinematic video production, aerial drone footage and DaVinci Resolve color grading for brands and businesses in Berlin — trailers, ads and storytelling.',
      overline: 'PRODUCTION',
      h1: 'Cinematic & Drone Video Production in Berlin',
      intro: [
        'We produce high-end video content for brands that need more than a phone-shot reel: aerial drone footage, product and brand films, and cinematic trailers that make your business look as good as it performs.',
        'Every project goes through professional color grading in DaVinci Resolve, giving footage a consistent, cinematic look — whether it\'s an aerial shot of your facility, a product launch teaser, or a full brand story built for ads and social media.',
      ],
      features: [
        { title: 'Aerial Drone Filming', desc: 'Licensed drone operation for real estate, hospitality, events and corporate footage.' },
        { title: 'Brand & Product Films', desc: 'Cinematic storytelling that presents your product or business at its best.' },
        { title: 'DaVinci Resolve Color Grading', desc: 'Professional color work that gives every project a consistent, premium look.' },
        { title: 'Trailers & Ad Cuts', desc: 'Short-form, high-impact edits built specifically for paid ads and social platforms.' },
        { title: 'On-Location & Studio Shoots', desc: 'Full production support, from concept and shot list to final delivery.' },
        { title: 'Multi-Format Delivery', desc: 'Every project delivered in the aspect ratios and formats your channels actually need.' },
      ],
      process: [
        { title: 'Concept & Shot Planning', desc: 'We define the story, locations and shot list before a single frame is filmed.' },
        { title: 'Filming', desc: 'On-site production with drone and cinema-grade equipment, directed for your brand.' },
        { title: 'Edit & Color Grade', desc: 'Full post-production, sound design and color grading in DaVinci Resolve.' },
      ],
      faq: [
        { q: 'Are your drone pilots licensed?', a: 'Yes, all aerial filming is carried out under the relevant drone licensing and airspace regulations.' },
        { q: 'What formats do you deliver in?', a: 'We deliver whatever your channels need — 16:9 for web and YouTube, 9:16 for Reels and TikTok, and broadcast-ready masters on request.' },
        { q: 'Can you handle both filming and editing?', a: 'Yes, we handle the full pipeline in-house — from concept and filming to editing, color grading and final delivery.' },
      ],
      ctaTitle: 'Ready to film something worth watching?',
      ctaText: 'Tell us about your project and location, and we\'ll put together a concept and shot plan.',
      relatedWorkIds: ['impulse'],
    },
    de: {
      metaTitle: '1618 Digital | Kino-Video- & Drohnenproduktion Berlin',
      metaDescription:
        'Kinoreife Videoproduktion, Drohnenaufnahmen und DaVinci Resolve Color Grading für Marken und Unternehmen in Berlin — Trailer, Werbespots und Storytelling.',
      overline: 'PRODUKTION',
      h1: 'Kino-Video- & Drohnenproduktion in Berlin',
      intro: [
        'Wir produzieren hochwertigen Videocontent für Marken, die mehr brauchen als ein Handy-Reel: Drohnenaufnahmen, Produkt- und Markenfilme sowie kinoreife Trailer, die Ihr Unternehmen so gut aussehen lassen, wie es performt.',
        'Jedes Projekt durchläuft professionelles Color Grading in DaVinci Resolve für einen konsistenten, kinoreifen Look — ob Luftaufnahme Ihres Standorts, Teaser für einen Produktlaunch oder komplette Markengeschichte für Ads und Social Media.',
      ],
      features: [
        { title: 'Drohnenaufnahmen', desc: 'Lizenzierter Drohnenbetrieb für Immobilien, Hospitality, Events und Unternehmensaufnahmen.' },
        { title: 'Marken- & Produktfilme', desc: 'Kinoreifes Storytelling, das Ihr Produkt oder Unternehmen bestmöglich präsentiert.' },
        { title: 'DaVinci Resolve Color Grading', desc: 'Professionelle Farbkorrektur für einen konsistenten, hochwertigen Look bei jedem Projekt.' },
        { title: 'Trailer & Werbespots', desc: 'Kurzformatige, wirkungsvolle Schnitte, speziell für bezahlte Anzeigen und Social-Media-Plattformen.' },
        { title: 'Vor-Ort- & Studio-Drehs', desc: 'Vollständige Produktionsbegleitung von Konzept und Shot-Liste bis zur finalen Auslieferung.' },
        { title: 'Lieferung in allen Formaten', desc: 'Jedes Projekt in den Seitenverhältnissen und Formaten, die Ihre Kanäle wirklich brauchen.' },
      ],
      process: [
        { title: 'Konzept & Shot-Planung', desc: 'Wir definieren Story, Locations und Shot-Liste, bevor eine einzige Einstellung gedreht wird.' },
        { title: 'Dreh', desc: 'Produktion vor Ort mit Drohne und Kino-tauglichem Equipment, inszeniert für Ihre Marke.' },
        { title: 'Schnitt & Color Grading', desc: 'Vollständige Postproduktion, Sounddesign und Color Grading in DaVinci Resolve.' },
      ],
      faq: [
        { q: 'Sind Ihre Drohnenpiloten lizenziert?', a: 'Ja, alle Luftaufnahmen erfolgen unter Einhaltung der geltenden Drohnenlizenzen und Luftraumvorschriften.' },
        { q: 'In welchen Formaten liefern Sie?', a: 'Wir liefern, was Ihre Kanäle brauchen — 16:9 für Web und YouTube, 9:16 für Reels und TikTok, sowie sendefähige Master auf Anfrage.' },
        { q: 'Übernehmen Sie Dreh und Schnitt?', a: 'Ja, wir decken die gesamte Pipeline intern ab — von Konzept und Dreh bis Schnitt, Color Grading und finaler Auslieferung.' },
      ],
      ctaTitle: 'Bereit, etwas Sehenswertes zu drehen?',
      ctaText: 'Erzählen Sie uns von Ihrem Projekt und der Location — wir erstellen Konzept und Shot-Plan.',
      relatedWorkIds: ['impulse'],
    },
    tr: {
      metaTitle: '1618 Digital | Sinematik & Drone Video Prodüksiyon Berlin',
      metaDescription:
        'Berlin\'de markalar ve işletmeler için sinematik video prodüksiyon, drone çekimi ve DaVinci Resolve renk düzenleme — fragman, reklam ve hikaye anlatımı.',
      overline: 'PRODÜKSİYON',
      h1: 'Berlin\'de Sinematik & Drone Video Prodüksiyon',
      intro: [
        'Telefonla çekilmiş bir videodan fazlasına ihtiyaç duyan markalar için üst düzey video içerikleri üretiyoruz: drone çekimleri, ürün ve marka filmleri ile işletmenizi performansı kadar iyi gösteren sinematik fragmanlar.',
        'Her proje, DaVinci Resolve\'de profesyonel renk düzenlemesinden geçer ve tutarlı, sinematik bir görünüm kazanır — tesisinizin havadan görüntüsü, bir ürün lansmanı teaser\'ı ya da reklam ve sosyal medya için tam bir marka hikayesi olsun fark etmez.',
      ],
      features: [
        { title: 'Drone Çekimi', desc: 'Emlak, hizmet sektörü, etkinlikler ve kurumsal çekimler için lisanslı drone operasyonu.' },
        { title: 'Marka & Ürün Filmleri', desc: 'Ürününüzü veya işletmenizi en iyi şekilde sunan sinematik hikaye anlatımı.' },
        { title: 'DaVinci Resolve Renk Düzenleme', desc: 'Her projeye tutarlı, premium bir görünüm kazandıran profesyonel renk çalışması.' },
        { title: 'Fragman & Reklam Kurguları', desc: 'Ücretli reklamlar ve sosyal medya platformları için özel olarak kurgulanmış kısa ve etkili videolar.' },
        { title: 'Mekanda & Stüdyoda Çekim', desc: 'Konsept ve çekim listesinden nihai teslimata kadar tam prodüksiyon desteği.' },
        { title: 'Çoklu Format Teslimat', desc: 'Her proje, kanallarınızın gerçekten ihtiyaç duyduğu en boy oranı ve formatlarda teslim edilir.' },
      ],
      process: [
        { title: 'Konsept & Çekim Planlaması', desc: 'Tek bir kare çekilmeden önce hikayeyi, mekanları ve çekim listesini belirliyoruz.' },
        { title: 'Çekim', desc: 'Drone ve sinema kalitesinde ekipmanla, markanıza göre yönetilen mekanda prodüksiyon.' },
        { title: 'Kurgu & Renk Düzenleme', desc: 'DaVinci Resolve\'de tam post-prodüksiyon, ses tasarımı ve renk düzenleme.' },
      ],
      faq: [
        { q: 'Drone pilotlarınız lisanslı mı?', a: 'Evet, tüm havadan çekimler ilgili drone lisansları ve hava sahası kurallarına uygun şekilde yapılır.' },
        { q: 'Hangi formatlarda teslim ediyorsunuz?', a: 'Kanallarınızın ihtiyacına göre teslim ediyoruz — web ve YouTube için 16:9, Reels ve TikTok için 9:16, talep üzerine yayın kalitesinde master dosyalar.' },
        { q: 'Hem çekim hem kurguyu siz mi yapıyorsunuz?', a: 'Evet, tüm süreci kendi bünyemizde yönetiyoruz — konsept ve çekimden kurgu, renk düzenleme ve nihai teslimata kadar.' },
      ],
      ctaTitle: 'İzlenmeye değer bir şey çekmeye hazır mısınız?',
      ctaText: 'Projenizi ve mekanınızı anlatın, sizin için bir konsept ve çekim planı hazırlayalım.',
      relatedWorkIds: ['impulse'],
    },
  },

  'wedding-event-films': {
    en: {
      metaTitle: '1618 Digital | Wedding & Event Cinematography Berlin',
      metaDescription:
        'Emotional, cinematic wedding and event films in Berlin. Full-day coverage, drone shots and film-quality editing that captures every moment.',
      overline: 'WEDDINGS & EVENTS',
      h1: 'Wedding & Event Cinematography in Berlin',
      intro: [
        'Your wedding day happens once — we film it like the cinematic story it deserves. From getting-ready shots to the last dance, we capture the real, emotional moments in high resolution and give them the color and pacing of a film, not a home video.',
        'The same care goes into corporate and private events: conferences, launches, and celebrations filmed with a documentary eye and delivered as a polished highlight film your team or family will actually rewatch.',
      ],
      features: [
        { title: 'Full-Day Wedding Coverage', desc: 'From preparation to the final send-off, filmed discreetly so the day feels natural, not staged.' },
        { title: 'Cinematic Highlight Films', desc: 'A 3–6 minute edit that captures the emotional arc of your day, set to music and paced like a film.' },
        { title: 'Aerial & Venue Shots', desc: 'Drone footage of your venue and location, woven into the story where it fits.' },
        { title: 'Corporate Event Filming', desc: 'Conferences, launches and celebrations captured and edited into a shareable recap.' },
        { title: 'Multi-Camera Coverage', desc: 'Multiple angles ensure no key moment — vows, speeches, reactions — is ever missed.' },
        { title: 'Fast, Professional Delivery', desc: 'A clear delivery timeline so you\'re never left waiting months for your film.' },
      ],
      process: [
        { title: 'Planning Call', desc: 'We walk through your schedule, venue and key moments so nothing is left to chance on the day.' },
        { title: 'Filming', desc: 'Discreet, multi-camera coverage throughout your event, led by an experienced director.' },
        { title: 'Edit & Delivery', desc: 'Color-graded, music-scored edit delivered in the format and length that fits your story.' },
      ],
      faq: [
        { q: 'Do you film weddings outside Berlin?', a: 'Yes, we travel for weddings and events across Germany and internationally — just let us know your location.' },
        { q: 'How long until we receive the final film?', a: 'Highlight films are typically delivered within 4–6 weeks, with a teaser available sooner on request.' },
        { q: 'Can you combine photography and video?', a: 'Yes, we coordinate photo and video coverage together so both teams capture the day in sync.' },
      ],
      ctaTitle: 'Let\'s talk about your date.',
      ctaText: 'Share your event date and venue, and we\'ll check availability and walk you through coverage options.',
      relatedWorkIds: [],
    },
    de: {
      metaTitle: '1618 Digital | Hochzeits- & Event-Kinematografie Berlin',
      metaDescription:
        'Emotionale, kinoreife Hochzeits- und Eventfilme in Berlin. Ganztägige Begleitung, Drohnenaufnahmen und Schnitt in Filmqualität, der jeden Moment einfängt.',
      overline: 'HOCHZEITEN & EVENTS',
      h1: 'Hochzeits- & Event-Kinematografie in Berlin',
      intro: [
        'Ihr Hochzeitstag passiert einmal — wir filmen ihn wie die kinoreife Geschichte, die er verdient. Vom Getting-Ready bis zum letzten Tanz halten wir die echten, emotionalen Momente in hoher Auflösung fest und geben ihnen die Farbgebung und den Rhythmus eines Films, kein Home-Video.',
        'Dieselbe Sorgfalt gilt für Firmen- und private Events: Konferenzen, Launches und Feiern, mit dokumentarischem Blick gefilmt und als polierter Höhepunktfilm geliefert, den Ihr Team oder Ihre Familie wirklich wieder ansieht.',
      ],
      features: [
        { title: 'Ganztägige Hochzeitsbegleitung', desc: 'Von der Vorbereitung bis zur letzten Verabschiedung, diskret gefilmt, damit sich der Tag natürlich anfühlt, nicht gestellt.' },
        { title: 'Kinoreife Höhepunktfilme', desc: 'Ein 3–6-minütiger Schnitt, der den emotionalen Bogen Ihres Tages einfängt, vertont und im Tempo eines Films.' },
        { title: 'Luft- & Location-Aufnahmen', desc: 'Drohnenaufnahmen Ihrer Location, dort in die Geschichte eingewoben, wo sie passen.' },
        { title: 'Firmenevent-Filmproduktion', desc: 'Konferenzen, Launches und Feiern, festgehalten und zu einem teilbaren Recap geschnitten.' },
        { title: 'Mehrkamera-Abdeckung', desc: 'Mehrere Kamerawinkel stellen sicher, dass kein wichtiger Moment — Gelübde, Reden, Reaktionen — verpasst wird.' },
        { title: 'Schnelle, professionelle Lieferung', desc: 'Ein klarer Lieferzeitplan, damit Sie nie monatelang auf Ihren Film warten müssen.' },
      ],
      process: [
        { title: 'Planungsgespräch', desc: 'Wir gehen Ablauf, Location und Schlüsselmomente durch, damit am Tag selbst nichts dem Zufall überlassen bleibt.' },
        { title: 'Dreh', desc: 'Diskrete Mehrkamera-Begleitung während Ihres Events, geleitet von einem erfahrenen Regisseur.' },
        { title: 'Schnitt & Lieferung', desc: 'Farblich abgestimmter, vertonter Schnitt in dem Format und der Länge, die zu Ihrer Geschichte passt.' },
      ],
      faq: [
        { q: 'Filmen Sie auch Hochzeiten außerhalb Berlins?', a: 'Ja, wir reisen für Hochzeiten und Events innerhalb Deutschlands und international — teilen Sie uns einfach Ihren Ort mit.' },
        { q: 'Wie lange dauert es bis zum fertigen Film?', a: 'Höhepunktfilme werden in der Regel innerhalb von 4–6 Wochen geliefert, ein Teaser ist auf Anfrage früher verfügbar.' },
        { q: 'Können Sie Foto und Video kombinieren?', a: 'Ja, wir koordinieren Foto- und Videoteam gemeinsam, damit beide den Tag synchron festhalten.' },
      ],
      ctaTitle: 'Lassen Sie uns über Ihr Datum sprechen.',
      ctaText: 'Teilen Sie uns Ihr Eventdatum und die Location mit — wir prüfen die Verfügbarkeit und erklären die Optionen.',
      relatedWorkIds: [],
    },
    tr: {
      metaTitle: '1618 Digital | Düğün & Etkinlik Sinematografisi Berlin',
      metaDescription:
        'Berlin\'de duygusal, sinematik düğün ve etkinlik filmleri. Tüm gün çekim, drone görüntüleri ve her anı yakalayan film kalitesinde kurgu.',
      overline: 'DÜĞÜN & ETKİNLİK',
      h1: 'Berlin\'de Düğün & Etkinlik Sinematografisi',
      intro: [
        'Düğün gününüz bir kez yaşanır — onu hak ettiği sinematik hikaye gibi çekiyoruz. Hazırlıktan son dansa kadar gerçek, duygusal anları yüksek çözünürlükte yakalıyor ve onlara ev videosu değil, bir filmin rengini ve temposunu veriyoruz.',
        'Aynı özeni kurumsal ve özel etkinliklere de gösteriyoruz: konferanslar, lansmanlar ve kutlamalar belgesel bakış açısıyla çekilip, ekibinizin veya ailenizin gerçekten tekrar izleyeceği cilalı bir özet filme dönüştürülüyor.',
      ],
      features: [
        { title: 'Tüm Gün Düğün Çekimi', desc: 'Hazırlıktan son uğurlamaya kadar, günün doğal hissettirmesi için sezdirmeden çekiliyor.' },
        { title: 'Sinematik Özet Filmler', desc: 'Gününüzün duygusal akışını yakalayan, müzikli ve bir film temposunda 3-6 dakikalık kurgu.' },
        { title: 'Havadan & Mekan Görüntüleri', desc: 'Mekanınızın drone görüntüleri, hikayeye uygun yerlerde işleniyor.' },
        { title: 'Kurumsal Etkinlik Çekimi', desc: 'Konferanslar, lansmanlar ve kutlamalar çekilip paylaşılabilir bir özet videoya dönüştürülüyor.' },
        { title: 'Çoklu Kamera Çekimi', desc: 'Birden fazla açı, yeminler, konuşmalar, tepkiler gibi kritik anların asla kaçırılmamasını sağlar.' },
        { title: 'Hızlı, Profesyonel Teslimat', desc: 'Filminiz için aylarca beklemenize gerek kalmayacak net bir teslimat takvimi.' },
      ],
      process: [
        { title: 'Planlama Görüşmesi', desc: 'Program, mekan ve kilit anları birlikte gözden geçiriyoruz, böylece gününüzde hiçbir şey şansa bırakılmıyor.' },
        { title: 'Çekim', desc: 'Deneyimli bir yönetmen eşliğinde etkinliğiniz boyunca sezdirmeden çoklu kamera çekimi.' },
        { title: 'Kurgu & Teslimat', desc: 'Hikayenize uygun format ve sürede, renk düzenlemesi yapılmış, müzikli kurgu teslimatı.' },
      ],
      faq: [
        { q: 'Berlin dışında düğün çekiyor musunuz?', a: 'Evet, Almanya genelinde ve uluslararası düğün ve etkinlikler için seyahat ediyoruz — sadece konumunuzu bize bildirin.' },
        { q: 'Nihai film ne zaman elimize ulaşır?', a: 'Özet filmler genellikle 4-6 hafta içinde teslim edilir, talep üzerine daha erken bir teaser da hazırlanabilir.' },
        { q: 'Fotoğraf ve videoyu birlikte yapabilir misiniz?', a: 'Evet, foto ve video ekiplerini birlikte koordine ediyoruz, böylece her iki ekip de günü senkronize şekilde yakalıyor.' },
      ],
      ctaTitle: 'Tarihiniz hakkında konuşalım.',
      ctaText: 'Etkinlik tarihinizi ve mekanınızı paylaşın, müsaitliği kontrol edip çekim seçeneklerini birlikte gözden geçirelim.',
      relatedWorkIds: [],
    },
  },

  'social-media-marketing': {
    en: {
      metaTitle: '1618 Digital | Social Media Marketing & Content Berlin',
      metaDescription:
        'Social media content strategy, short-form video and growth packages for Instagram and TikTok — planned and produced by 1618 Digital in Berlin.',
      overline: 'SOCIAL & CONTENT',
      h1: 'Social Media Marketing & Content Production',
      intro: [
        'Consistent, high-quality content is what turns a social profile into a real growth channel. We plan, film and edit short-form video and content packages for Instagram and TikTok that are built around what your specific audience actually engages with.',
        'From a single campaign to an ongoing monthly content package, we handle strategy, filming and editing so you get a steady stream of publish-ready content instead of a one-off video that goes quiet after a week.',
      ],
      features: [
        { title: 'Content Strategy', desc: 'A clear content plan built around your audience, goals and posting cadence.' },
        { title: 'Short-Form Video Production', desc: 'Reels, TikToks and Shorts filmed and edited for maximum watch-time and shares.' },
        { title: 'Monthly Content Packages', desc: 'A recurring batch of ready-to-post content so your channels never go quiet.' },
        { title: 'Brand-Consistent Editing', desc: 'Every video styled to match your brand — captions, pacing, color and sound.' },
        { title: 'Campaign Launch Content', desc: 'Dedicated content sets for product launches, promotions and events.' },
        { title: 'Performance Review', desc: 'We track what\'s working and adjust the content plan based on real engagement data.' },
      ],
      process: [
        { title: 'Strategy Session', desc: 'We define your audience, goals and content pillars before any filming begins.' },
        { title: 'Filming & Batching', desc: 'Content is filmed in efficient batches to keep a steady publishing rhythm.' },
        { title: 'Edit, Schedule & Review', desc: 'Edited content is delivered on schedule, with performance reviewed and refined monthly.' },
      ],
      faq: [
        { q: 'Do you also manage posting and community replies?', a: 'We focus on content strategy, filming and editing; posting and community management can be added on request.' },
        { q: 'How much content do we get per month?', a: 'Packages are tailored to your goals — typical plans range from 4 to 12 short-form videos per month.' },
        { q: 'Can you work with our existing brand guidelines?', a: 'Yes, we build every piece of content to match your existing visual identity and tone of voice.' },
      ],
      ctaTitle: 'Ready for content that actually performs?',
      ctaText: 'Tell us about your brand and audience, and we\'ll put together a content plan built for growth.',
      relatedWorkIds: [],
    },
    de: {
      metaTitle: '1618 Digital | Social-Media-Marketing & Content Berlin',
      metaDescription:
        'Social-Media-Content-Strategie, Kurzvideos und Wachstumspakete für Instagram und TikTok — geplant und produziert von 1618 Digital in Berlin.',
      overline: 'SOCIAL & CONTENT',
      h1: 'Social-Media-Marketing & Content-Produktion',
      intro: [
        'Konsistenter, hochwertiger Content macht aus einem Social-Profil einen echten Wachstumskanal. Wir planen, drehen und schneiden Kurzvideos und Content-Pakete für Instagram und TikTok, die genau auf das ausgerichtet sind, womit Ihre Zielgruppe wirklich interagiert.',
        'Von einer einzelnen Kampagne bis zum laufenden Monatspaket übernehmen wir Strategie, Dreh und Schnitt — für einen stetigen Strom veröffentlichungsbereiten Contents statt eines einzelnen Videos, das nach einer Woche verstummt.',
      ],
      features: [
        { title: 'Content-Strategie', desc: 'Ein klarer Content-Plan, ausgerichtet auf Ihre Zielgruppe, Ziele und Posting-Frequenz.' },
        { title: 'Kurzvideo-Produktion', desc: 'Reels, TikToks und Shorts, gedreht und geschnitten für maximale Watchtime und Shares.' },
        { title: 'Monatliche Content-Pakete', desc: 'Ein wiederkehrendes Batch an postfertigem Content, damit Ihre Kanäle nie still werden.' },
        { title: 'Markenkonformer Schnitt', desc: 'Jedes Video passend zu Ihrer Marke gestaltet — Untertitel, Tempo, Farbe und Sound.' },
        { title: 'Kampagnen-Launch-Content', desc: 'Eigene Content-Sets für Produktlaunches, Aktionen und Events.' },
        { title: 'Performance-Review', desc: 'Wir verfolgen, was funktioniert, und passen den Content-Plan anhand echter Engagement-Daten an.' },
      ],
      process: [
        { title: 'Strategie-Session', desc: 'Wir definieren Zielgruppe, Ziele und Content-Säulen, bevor der erste Dreh beginnt.' },
        { title: 'Dreh & Batching', desc: 'Content wird in effizienten Batches gedreht, um einen gleichmäßigen Veröffentlichungsrhythmus zu halten.' },
        { title: 'Schnitt, Planung & Review', desc: 'Geschnittener Content wird termingerecht geliefert, Performance wird monatlich geprüft und optimiert.' },
      ],
      faq: [
        { q: 'Übernehmen Sie auch Posting und Community-Antworten?', a: 'Wir konzentrieren uns auf Content-Strategie, Dreh und Schnitt; Posting und Community-Management können auf Wunsch ergänzt werden.' },
        { q: 'Wie viel Content bekommen wir pro Monat?', a: 'Pakete werden auf Ihre Ziele zugeschnitten — typische Pläne reichen von 4 bis 12 Kurzvideos pro Monat.' },
        { q: 'Können Sie mit unseren bestehenden Brand-Guidelines arbeiten?', a: 'Ja, wir gestalten jeden Content passend zu Ihrer bestehenden visuellen Identität und Tonalität.' },
      ],
      ctaTitle: 'Bereit für Content, der wirklich performt?',
      ctaText: 'Erzählen Sie uns von Ihrer Marke und Zielgruppe — wir erstellen einen Content-Plan für echtes Wachstum.',
      relatedWorkIds: [],
    },
    tr: {
      metaTitle: '1618 Digital | Sosyal Medya Pazarlama & İçerik Berlin',
      metaDescription:
        'Instagram ve TikTok için sosyal medya içerik stratejisi, kısa video ve büyüme paketleri — Berlin\'de 1618 Digital tarafından planlanır ve üretilir.',
      overline: 'SOSYAL & İÇERİK',
      h1: 'Sosyal Medya Pazarlama & İçerik Prodüksiyonu',
      intro: [
        'Tutarlı, kaliteli içerik, bir sosyal medya profilini gerçek bir büyüme kanalına dönüştüren şeydir. Hedef kitlenizin gerçekten etkileşime girdiği şeyler etrafında kurgulanmış, Instagram ve TikTok için kısa video ve içerik paketleri planlıyor, çekiyor ve kurguluyoruz.',
        'Tek bir kampanyadan devam eden aylık içerik paketine kadar strateji, çekim ve kurguyu biz üstleniyoruz; böylece bir hafta sonra sessizleşen tek bir video yerine, yayına hazır sürekli bir içerik akışına sahip oluyorsunuz.',
      ],
      features: [
        { title: 'İçerik Stratejisi', desc: 'Hedef kitleniz, hedefleriniz ve paylaşım sıklığınız etrafında kurgulanmış net bir içerik planı.' },
        { title: 'Kısa Video Prodüksiyonu', desc: 'Maksimum izlenme süresi ve paylaşım için çekilip kurgulanan Reels, TikTok ve Shorts videoları.' },
        { title: 'Aylık İçerik Paketleri', desc: 'Kanallarınızın hiç sessizleşmemesi için düzenli olarak hazırlanan, yayına hazır içerik grubu.' },
        { title: 'Markaya Uygun Kurgu', desc: 'Her video markanıza uygun şekilde tasarlanır — altyazı, tempo, renk ve ses.' },
        { title: 'Kampanya Lansman İçeriği', desc: 'Ürün lansmanları, promosyonlar ve etkinlikler için özel içerik setleri.' },
        { title: 'Performans İncelemesi', desc: 'Neyin işe yaradığını takip eder, içerik planını gerçek etkileşim verilerine göre ayarlarız.' },
      ],
      process: [
        { title: 'Strateji Görüşmesi', desc: 'Herhangi bir çekim başlamadan önce hedef kitlenizi, hedeflerinizi ve içerik ana temalarınızı belirliyoruz.' },
        { title: 'Çekim & Toplu Üretim', desc: 'Düzenli bir yayın ritmi tutmak için içerikler verimli gruplar halinde çekilir.' },
        { title: 'Kurgu, Planlama & İnceleme', desc: 'Kurgulanan içerik zamanında teslim edilir, performans aylık olarak incelenir ve iyileştirilir.' },
      ],
      faq: [
        { q: 'Paylaşım ve topluluk yanıtlarını da siz mi yönetiyorsunuz?', a: 'İçerik stratejisi, çekim ve kurguya odaklanıyoruz; talep üzerine paylaşım ve topluluk yönetimi de eklenebilir.' },
        { q: 'Ayda ne kadar içerik alıyoruz?', a: 'Paketler hedeflerinize göre uyarlanır — tipik planlar ayda 4 ila 12 kısa video arasında değişir.' },
        { q: 'Mevcut marka rehberimizle çalışabilir misiniz?', a: 'Evet, her içeriği mevcut görsel kimliğinize ve ton\'unuza uygun şekilde üretiyoruz.' },
      ],
      ctaTitle: 'Gerçekten performans gösteren içeriğe hazır mısınız?',
      ctaText: 'Markanızı ve hedef kitlenizi anlatın, büyüme odaklı bir içerik planı hazırlayalım.',
      relatedWorkIds: [],
    },
  },
};
