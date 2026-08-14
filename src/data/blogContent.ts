import type { Lang } from './serviceContent';

export type BlogBlock =
  /** `lead` renders as a bold inline prefix, e.g. a price-tier name before the sentence. */
  | { type: 'p'; text: string; lead?: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPostLangContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  excerpt: string;
  readingTime: string;
  body: BlogBlock[];
}

export interface BlogPost {
  slug: string;
  /** ISO date, also used as the sitemap <lastmod>. */
  publishedAt: string;
  /** Ties the post to a service page for the "related service" CTA. */
  relatedServiceSlug: string;
  glowColor: string;
  content: Record<Lang, BlogPostLangContent>;
}

/**
 * Long-form SEO content, structured exactly like serviceContent.ts:
 * one entry per post, one localized variant per supported language.
 * Add new posts here and they're picked up automatically by BlogPage,
 * BlogPostPage and the sitemap.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'hochzeitsvideo-berlin-kosten-tipps',
    publishedAt: '2026-08-14',
    relatedServiceSlug: 'wedding-event-films',
    glowColor: '#f43f5e',
    content: {
      de: {
        metaTitle: 'Hochzeitsvideo Berlin: Kosten, Ablauf & worauf Sie achten sollten',
        metaDescription: 'Was kostet ein Hochzeitsvideo in Berlin wirklich? Preisfaktoren, Ablauf am Hochzeitstag und eine Checkliste zur Auswahl Ihres Videografen — von 1618 Digital.',
        title: 'Hochzeitsvideo Berlin: Kosten, Ablauf & worauf Sie wirklich achten sollten',
        excerpt: 'Die Preisspanne für Hochzeitsvideos in Berlin ist riesig — von 800 € bis 5.000 €+. Wir erklären, woher die Unterschiede kommen und wie Sie den richtigen Videografen für Ihren Tag finden.',
        readingTime: '6 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Kaum eine Entscheidung rund um die Hochzeit wird so oft aufgeschoben wie die Wahl des Videografen — meist, weil die Preise auf den ersten Blick schwer vergleichbar sind. Ein Anbieter verlangt 800 €, der nächste 4.500 €, und beide nennen sich „Hochzeitsfilmer". Hier ist, worauf der Unterschied tatsächlich beruht.' },
          { type: 'h2', text: 'Was ein Hochzeitsvideo in Berlin kostet' },
          { type: 'p', text: 'Realistisch bewegen sich seriöse Angebote in Berlin zwischen 1.200 € für ein kompaktes Highlight-Video (3–5 Minuten, ein Filmer, halber Tag) und 3.500–5.000 € für eine vollständige Produktion mit zwei Kamerateams, Drohnenaufnahmen, Langfassung und professionellem Color Grading. Preise deutlich unter 1.000 € bedeuten fast immer: keine Zweitkamera, keine Farbkorrektur, oft nur ein automatisch geschnittenes Rohmaterial ohne dramaturgischen Aufbau.' },
          { type: 'list', items: [
            'Anzahl der Kamerateams (1 vs. 2 — entscheidend für Trauung + Party gleichzeitig)',
            'Drohnenaufnahmen (benötigen eine gültige EU-Drohnenlizenz, siehe unten)',
            'Schnittlänge: Highlight-Reel (3–6 Min.) vs. Langversion (20–45 Min.)',
            'Color Grading in DaVinci Resolve statt automatischer Filter',
            'Lizenzierte Musik statt urheberrechtlich riskanter Trends',
          ] },
          { type: 'h2', text: 'Worauf Sie bei der Auswahl achten sollten' },
          { type: 'p', text: 'Fragen Sie nicht nur nach dem Preis, sondern nach ganzen, ungeschnittenen Beispielfilmen von echten Hochzeiten — nicht nur nach dem 90-Sekunden-Instagram-Trailer. Ein guter Filmer zeigt Ihnen mindestens zwei komplette Hochzeiten in voller Länge. Klären Sie außerdem: Wie viele Stunden sind gebucht? Gibt es einen Ersatztermin bei Krankheit? Wie lange dauert der Schnitt (realistisch: 6–10 Wochen)?' },
          { type: 'h2', text: 'Drohnenaufnahmen: Was rechtlich wichtig ist' },
          { type: 'p', text: 'Luftaufnahmen von der Location oder dem Empfang sehen beeindruckend aus — aber nur, wenn sie legal entstehen. Seit der EU-weiten Drohnenverordnung braucht jeder kommerzielle Pilot einen gültigen Kompetenznachweis (EU-Fernpilotenzeugnis) und je nach Location eine Freigabe, besonders in der Kontrollzone rund um Flughäfen wie BER. Fragen Sie aktiv danach — ein seriöser Anbieter zeigt Ihnen die Lizenz ungefragt.' },
          { type: 'h2', text: 'Unser Ansatz bei 1618 Digital' },
          { type: 'p', text: 'Wir filmen Hochzeiten in Berlin und Umgebung mit zwei Kamerateams, lizenzierter Drohnentechnik und schneiden jede Hochzeit individuell in DaVinci Resolve — kein automatischer Vorlagen-Schnitt. Sie erhalten ein Highlight-Video für Social Media und eine ausführliche Langfassung als bleibende Erinnerung.' },
        ],
      },
      en: {
        metaTitle: 'Wedding Videography Berlin: Real Costs & What to Look For',
        metaDescription: 'What does wedding videography in Berlin actually cost? Pricing factors, drone-permit requirements, and a checklist for choosing your videographer.',
        title: 'Wedding Videography in Berlin: Real Costs & What to Look For',
        excerpt: 'Wedding video pricing in Berlin ranges from €800 to €5,000+. Here is where that gap actually comes from, and how to pick the right videographer for your day.',
        readingTime: '6 min read',
        body: [
          { type: 'p', text: 'Few wedding decisions get put off as long as booking a videographer — mostly because prices are hard to compare at first glance. One studio quotes €800, another €4,500, and both call it a "wedding film". Here is what actually drives the difference.' },
          { type: 'h2', text: 'What wedding videography costs in Berlin' },
          { type: 'p', text: 'Realistically, credible offers in Berlin range from around €1,200 for a compact highlight video (3–5 minutes, one filmer, half-day coverage) up to €3,500–5,000 for a full production with two camera operators, drone footage, a full-length cut, and professional color grading. Anything well under €1,000 usually means: no second camera, no color correction, and often just auto-edited raw footage with no real story structure.' },
          { type: 'list', items: [
            'Number of camera operators (1 vs. 2 — critical for covering the ceremony and reception at once)',
            'Drone footage (requires a valid EU drone operator license — see below)',
            'Cut length: highlight reel (3–6 min) vs. full-length film (20–45 min)',
            'Color grading in DaVinci Resolve rather than automatic filters',
            'Licensed music instead of copyright-risky trending audio',
          ] },
          { type: 'h2', text: 'What to check before you book' },
          { type: 'p', text: 'Don\'t just ask for a price — ask to see full, uncut sample films from real weddings, not just a 90-second Instagram trailer. A good videographer can show you at least two complete weddings in full length. Also confirm: how many hours are booked, is there a backup plan if the filmer is sick, and how long delivery takes (realistically 6–10 weeks).' },
          { type: 'h2', text: 'Drone footage: what matters legally' },
          { type: 'p', text: 'Aerial shots of the venue or reception look stunning — but only if they are legal. Under the EU-wide drone regulation, every commercial pilot needs a valid remote pilot competency certificate, and depending on the venue, airspace clearance — especially inside the control zone around airports like BER. Ask about this directly; a legitimate studio will show you the license without being pushed.' },
          { type: 'h2', text: 'How we work at 1618 Digital' },
          { type: 'p', text: 'We film weddings in and around Berlin with two camera operators, licensed drone equipment, and edit every wedding individually in DaVinci Resolve — no template-based auto-cuts. You get a highlight video built for social media plus a full-length film as a lasting keepsake.' },
        ],
      },
      tr: {
        metaTitle: 'Berlin Düğün Video Çekimi: Gerçek Fiyatlar ve Nelere Dikkat Etmeli',
        metaDescription: 'Berlin\'de düğün video çekimi gerçekte ne kadar tutar? Fiyatı belirleyen faktörler, drone çekimi için yasal gereklilikler ve videograf seçim rehberi.',
        title: 'Berlin Düğün Video Çekimi: Gerçek Fiyatlar ve Nelere Dikkat Etmeli',
        excerpt: 'Berlin\'de düğün video fiyatları 800 €\'dan 5.000 €+\'ya kadar değişebiliyor. Bu farkın nereden geldiğini ve gününüz için doğru videografı nasıl seçeceğinizi anlatıyoruz.',
        readingTime: '6 dk okuma',
        body: [
          { type: 'p', text: 'Düğün hazırlıklarında en çok ertelenen kararlardan biri videograf seçimidir — çünkü fiyatları ilk bakışta karşılaştırmak zor. Bir stüdyo 800 €, diğeri 4.500 € istiyor ve ikisi de kendine "düğün filmi" diyor. İşte bu farkın gerçekte nereden geldiği.' },
          { type: 'h2', text: 'Berlin\'de düğün video çekimi ne kadar tutar' },
          { type: 'p', text: 'Gerçekçi olarak Berlin\'de güvenilir teklifler, kompakt bir highlight videosu (3-5 dakika, tek kameraman, yarım gün) için ~1.200 €\'dan; iki kameraman, drone çekimi, uzun versiyon ve profesyonel renk düzenlemesi içeren tam prodüksiyon için 3.500-5.000 €\'ya kadar değişir. 1.000 €\'nun oldukça altındaki fiyatlar genelde şu anlama gelir: ikinci kamera yok, renk düzeltmesi yok, çoğu zaman kurgusuz otomatik kesilmiş ham görüntü.' },
          { type: 'list', items: [
            'Kameraman sayısı (1\'e karşı 2 — nikah ve eğlenceyi aynı anda çekebilmek için kritik)',
            'Drone çekimi (geçerli bir AB drone lisansı gerektirir — aşağıya bakın)',
            'Kurgu uzunluğu: highlight video (3-6 dk) ile tam uzunluk film (20-45 dk) arasındaki fark',
            'DaVinci Resolve ile profesyonel renk düzenlemesi, otomatik filtreler değil',
            'Telif haklarına takılma riski olan trend seslerin yerine lisanslı müzik',
          ] },
          { type: 'h2', text: 'Rezervasyondan önce nelere bakmalı' },
          { type: 'p', text: 'Sadece fiyat sormayın — gerçek düğünlerden tam, kesilmemiş örnek filmler isteyin, sadece 90 saniyelik Instagram fragmanı değil. İyi bir videograf size en az iki tam uzunlukta düğün gösterebilmeli. Ayrıca şunları netleştirin: kaç saat rezerve ediliyor, videograf hastalanırsa yedek plan var mı, teslimat ne kadar sürüyor (gerçekçi olarak 6-10 hafta).' },
          { type: 'h2', text: 'Drone çekimi: yasal olarak nelere dikkat etmeli' },
          { type: 'p', text: 'Mekânın veya davetin havadan görüntüleri etkileyici görünür — ama sadece yasal çekildiyse. AB genelindeki drone yönetmeliği gereği her ticari pilotun geçerli bir uzaktan pilot yeterlilik belgesine ve mekâna bağlı olarak hava sahası iznine (özellikle BER gibi havalimanlarının kontrol bölgesinde) ihtiyacı vardır. Bunu doğrudan sorun — güvenilir bir stüdyo lisansını sormadan gösterir.' },
          { type: 'h2', text: '1618 Digital olarak yaklaşımımız' },
          { type: 'p', text: 'Berlin ve çevresinde düğünleri iki kameramanla, lisanslı drone ekipmanıyla çekiyor ve her düğünü DaVinci Resolve\'da tek tek kurguluyoruz — şablon tabanlı otomatik kesim yok. Sosyal medya için bir highlight video ve kalıcı bir anı olarak tam uzunlukta film alıyorsunuz.' },
        ],
      },
    },
  },
  {
    slug: 'drohnenaufnahmen-unternehmen-berlin-recht',
    publishedAt: '2026-08-14',
    relatedServiceSlug: 'video-drone-production',
    glowColor: '#f59e0b',
    content: {
      de: {
        metaTitle: 'Drohnenaufnahmen für Unternehmen in Berlin: Nutzen & rechtliche Basics',
        metaDescription: 'Wann lohnen sich Drohnenaufnahmen für Ihr Unternehmen, welche Genehmigungen braucht ein Anbieter in Berlin, und wie läuft ein Dreh ab? Der Praxis-Guide.',
        title: 'Drohnenaufnahmen für Unternehmen in Berlin: Wann sie sich lohnen und was rechtlich gilt',
        excerpt: 'Ein Immobilienprojekt, ein Firmengelände, eine Eventlocation — Luftaufnahmen wirken sofort professioneller. Aber nicht jeder Anbieter darf legal fliegen. Ein Praxis-Guide.',
        readingTime: '5 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Luftaufnahmen sind aus der B2B-Kommunikation kaum noch wegzudenken: Immobilienanbieter zeigen die Lage eines Grundstücks, Gastronomiebetriebe die Größe ihrer Außenfläche, Produktionsfirmen ihr gesamtes Werksgelände auf einen Blick. Der Effekt ist real — aber nur, wenn die Aufnahmen legal und sauber ausgeführt sind.' },
          { type: 'h2', text: 'Wofür sich Drohnenaufnahmen wirklich lohnen' },
          { type: 'list', items: [
            'Immobilien & Gewerbeflächen — Lage, Grundstücksgröße, Umgebung auf einen Blick',
            'Events & Messen — Besucherzahlen und Atmosphäre glaubwürdig zeigen',
            'Gastronomie & Hotellerie — Außenbereiche, Dachterrassen, Parkplätze',
            'Baufortschritt-Dokumentation über mehrere Monate',
            'Imagefilme für Websites, bei denen ein reiner Bodenblick zu klein wirkt',
          ] },
          { type: 'h2', text: 'Die rechtliche Seite: Was ein Anbieter nachweisen muss' },
          { type: 'p', text: 'Seit der EU-Drohnenverordnung (in Kraft seit 2021) ist kommerzieller Drohnenbetrieb in Deutschland kein Grauraum mehr. Ein professioneller Anbieter braucht mindestens: ein EU-Fernpilotenzeugnis (A1/A3 oder A2, je nach Kategorie), eine gültige Halterkennung mit sichtbarer e-ID an der Drohne, und eine Haftpflichtversicherung speziell für den Drohnenbetrieb. In und um Berlin kommt hinzu: Ein großer Teil der Stadt liegt in der Kontrollzone des Flughafens BER — Flüge dort benötigen zusätzlich eine Freigabe der Deutschen Flugsicherung, die man rechtzeitig vor dem Termin beantragen muss.' },
          { type: 'p', text: 'Fragen Sie jeden Anbieter aktiv nach diesen drei Dingen, bevor Sie buchen. Ein Betrieb ohne gültige Papiere riskiert nicht nur ein Bußgeld für sich selbst — im Ernstfall haften auch Sie als Auftraggeber mit, wenn Sie wissentlich einen nicht lizenzierten Piloten beauftragt haben.' },
          { type: 'h2', text: 'Wie ein Dreh in der Praxis abläuft' },
          { type: 'p', text: 'Ein guter Ablauf beginnt mit einer kurzen Vorab-Prüfung der Location auf Flugbeschränkungen, gefolgt von einem 30–60-minütigen Zeitfenster für den eigentlichen Flug (Wetterabhängig — Wind und Regen verschieben den Termin). Die Nachbearbeitung mit Farbkorrektur und Schnitt dauert in der Regel 3–7 Werktage.' },
          { type: 'h2', text: 'Unser Ansatz bei 1618 Digital' },
          { type: 'p', text: 'Wir fliegen mit gültigem EU-Kompetenznachweis, klären Flugbeschränkungen und Freigaben vorab und liefern die Aufnahmen farbkorrigiert und geschnitten — einzeln oder als Teil eines größeren Imagefilms für Ihre Website.' },
        ],
      },
      en: {
        metaTitle: 'Drone Footage for Businesses in Berlin: Value & Legal Basics',
        metaDescription: 'When is drone footage worth it for your business, what license does a Berlin operator need, and how does a shoot actually work? A practical guide.',
        title: 'Drone Footage for Businesses in Berlin: When It Pays Off & What the Law Requires',
        excerpt: 'A real estate listing, a company campus, an event venue — aerial footage instantly reads as more professional. But not every operator is legally allowed to fly. Here\'s a practical guide.',
        readingTime: '5 min read',
        body: [
          { type: 'p', text: 'Aerial footage has become a standard part of B2B communication: real estate listings show a property\'s location at a glance, restaurants show the size of their outdoor seating, manufacturers show an entire facility in one shot. The effect is real — but only when the footage is captured legally and cleanly.' },
          { type: 'h2', text: 'Where drone footage actually pays off' },
          { type: 'list', items: [
            'Real estate & commercial property — location, plot size, surroundings at a glance',
            'Events & trade fairs — showing crowd size and atmosphere credibly',
            'Hospitality — outdoor seating, rooftop terraces, parking',
            'Construction progress documentation over several months',
            'Website hero footage where ground-level shots feel too small in scale',
          ] },
          { type: 'h2', text: 'The legal side: what an operator must be able to show you' },
          { type: 'p', text: 'Since the EU-wide drone regulation took effect in 2021, commercial drone operation in Germany is no longer a gray area. A professional operator needs at minimum: a valid EU remote pilot competency certificate (A1/A3 or A2, depending on category), a valid operator registration with a visible e-ID on the drone, and liability insurance specific to drone operation. Around Berlin specifically, a large part of the city sits inside the BER airport control zone — flights there additionally require clearance from German air traffic control, which needs to be requested ahead of the shoot date.' },
          { type: 'p', text: 'Ask every operator about these three things before booking. A studio flying without valid paperwork isn\'t just risking a fine for itself — as the client, you can share liability if you knowingly hired an unlicensed pilot.' },
          { type: 'h2', text: 'How a shoot actually works' },
          { type: 'p', text: 'A solid workflow starts with a quick pre-check of the location for flight restrictions, followed by a 30–60 minute window for the actual flight (weather-dependent — wind and rain push the date). Post-production with color grading and editing typically takes 3–7 business days.' },
          { type: 'h2', text: 'How we work at 1618 Digital' },
          { type: 'p', text: 'We fly with a valid EU competency certificate, clear flight restrictions and airspace approvals ahead of time, and deliver footage color-graded and edited — as a standalone piece or as part of a larger brand film for your website.' },
        ],
      },
      tr: {
        metaTitle: 'Berlin\'de Şirketlere Drone Çekimi: Ne Zaman Değer ve Yasal Gereklilikler',
        metaDescription: 'Şirketiniz için drone çekimi ne zaman mantıklı, Berlin\'de bir sağlayıcının hangi lisansa sahip olması gerekir ve çekim süreci nasıl işler? Pratik rehber.',
        title: 'Berlin\'de Şirketlere Drone Çekimi: Ne Zaman Değer Katar, Yasal Olarak Nelere Dikkat Edilmeli',
        excerpt: 'Bir gayrimenkul projesi, bir şirket kampüsü, bir etkinlik mekânı — havadan görüntüler anında daha profesyonel görünür. Ama her sağlayıcı yasal olarak uçamaz. İşte pratik rehber.',
        readingTime: '5 dk okuma',
        body: [
          { type: 'p', text: 'Havadan görüntüler artık B2B iletişiminin standart bir parçası: gayrimenkul ilanları arsanın konumunu tek bakışta gösterir, restoranlar dış mekânlarının büyüklüğünü, üretim tesisleri tüm kampüslerini tek kadrajda gösterir. Etki gerçek — ama sadece görüntüler yasal ve düzgün çekildiyse.' },
          { type: 'h2', text: 'Drone çekimi gerçekten nerede değer katar' },
          { type: 'list', items: [
            'Gayrimenkul ve ticari alanlar — konum, arsa büyüklüğü, çevre tek bakışta',
            'Etkinlikler ve fuarlar — katılımcı sayısını ve atmosferi inandırıcı biçimde göstermek',
            'Gastronomi ve otelcilik — dış mekânlar, çatı terasları, otopark',
            'Aylar süren inşaat sürecinin belgelenmesi',
            'Yer seviyesinden çekimlerin küçük kaldığı web sitesi tanıtım görüntüleri',
          ] },
          { type: 'h2', text: 'Yasal taraf: bir sağlayıcının size gösterebilmesi gerekenler' },
          { type: 'p', text: '2021\'den beri yürürlükte olan AB genelindeki drone yönetmeliğinden bu yana, Almanya\'da ticari drone işletmeciliği artık gri bir alan değil. Profesyonel bir sağlayıcının en az şunlara sahip olması gerekir: geçerli bir AB uzaktan pilot yeterlilik belgesi (kategoriye göre A1/A3 veya A2), dronede görünür e-ID\'li geçerli bir işletmeci kaydı ve drone işletmeciliğine özel bir sorumluluk sigortası. Berlin özelinde şehrin büyük bir kısmı BER havalimanının kontrol bölgesinde yer alıyor — buradaki uçuşlar ayrıca Alman hava trafik kontrolünden, çekim tarihinden önce talep edilmesi gereken bir izin gerektiriyor.' },
          { type: 'p', text: 'Rezervasyon yapmadan önce her sağlayıcıya bu üç şeyi doğrudan sorun. Geçerli belgesi olmadan uçan bir stüdyo sadece kendisi için ceza riski taşımaz — bilerek lisanssız bir pilot tuttuysanız, müşteri olarak siz de sorumluluğu paylaşabilirsiniz.' },
          { type: 'h2', text: 'Bir çekim pratikte nasıl işler' },
          { type: 'p', text: 'Sağlam bir süreç, mekânın uçuş kısıtlamaları açısından hızlı bir ön kontrolüyle başlar, ardından asıl uçuş için 30-60 dakikalık bir zaman dilimi gelir (hava durumuna bağlı — rüzgar ve yağmur tarihi erteleyebilir). Renk düzenlemesi ve kurgu içeren post-prodüksiyon genelde 3-7 iş günü sürer.' },
          { type: 'h2', text: '1618 Digital olarak yaklaşımımız' },
          { type: 'p', text: 'Geçerli bir AB yeterlilik belgesiyle uçuyor, uçuş kısıtlamalarını ve hava sahası izinlerini önceden netleştiriyor ve görüntüleri renk düzenlemesi yapılmış ve kurgulanmış halde teslim ediyoruz — tek başına veya web siteniz için daha büyük bir marka filminin parçası olarak.' },
        ],
      },
    },
  },
  {
    slug: 'website-kosten-berlin-2026',
    publishedAt: '2026-08-14',
    relatedServiceSlug: 'web-saas-development',
    glowColor: '#38bdf8',
    content: {
      de: {
        metaTitle: 'Website-Kosten Berlin 2026: Was eine individuelle Website wirklich kostet',
        metaDescription: 'Was kostet eine professionelle Website oder ein SaaS-Tool in Berlin 2026? Preisspannen nach Projekttyp, versteckte Kosten und wie Sie Angebote vergleichen.',
        title: 'Was kostet eine individuelle Website in Berlin 2026 wirklich?',
        excerpt: 'Baukasten für 20 € im Monat oder Individualentwicklung für 15.000 €? Wir ordnen die Preisspannen ein — und zeigen, worauf es bei der Wahl wirklich ankommt.',
        readingTime: '7 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Die Bandbreite bei Website-Preisen ist so groß, dass sie kaum noch aussagekräftig ist: Ein Baukasten-Anbieter wirbt mit 20 € im Monat, eine Agentur nennt 15.000 € für dasselbe Vorhaben. Beide haben recht — sie sprechen nur über völlig verschiedene Dinge.' },
          { type: 'h2', text: 'Die drei Preiskategorien' },
          { type: 'p', lead: 'Baukasten (Wix, Squarespace, o. ä.): 0–50 €/Monat.', text: 'Sinnvoll für ein einfaches Ein-Personen-Business ohne komplexe Anforderungen. Nachteile: begrenzte Individualisierung, langsamere Ladezeiten, Sie sind an die Plattform gebunden.' },
          { type: 'p', lead: 'Individuelle Website (statisch oder mit CMS): 2.500–8.000 €.', text: 'Maßgeschneidertes Design, echte Performance-Optimierung, volle Kontrolle über Hosting und Code. Der übliche Bereich für Restaurants, Dienstleister, kleinere Unternehmen mit klarer Präsenz-Website.' },
          { type: 'p', lead: 'SaaS-Plattform / Web-App mit Buchungssystem, Login, Datenbank: 8.000–25.000 €+.', text: 'Hier entsteht echte Software, keine reine Website — mit Backend, Nutzerverwaltung, oft Zahlungsanbindung. Der Preis hängt stark von der Komplexität der Logik ab, nicht vom Design.' },
          { type: 'h2', text: 'Woher die großen Preisunterschiede innerhalb einer Kategorie kommen' },
          { type: 'list', items: [
            'Individuelles Design vs. Template-Anpassung',
            'Anzahl der Unterseiten und mehrsprachige Inhalte (DE/EN/TR verdreifacht den Textaufwand)',
            'SEO-Grundlagen: strukturierte Daten, Sitemap, saubere Performance — oder nicht',
            'Wartung & Hosting nach dem Launch inklusive oder separat berechnet',
            'Eigene Illustrationen/Animationen vs. Stock-Assets',
          ] },
          { type: 'h2', text: 'Versteckte Kosten, die oft vergessen werden' },
          { type: 'p', text: 'Domain und Hosting (meist 10–30 €/Monat), SSL-Zertifikat (heute meist inklusive), professionelle E-Mail-Adressen, und — oft am teuersten unterschätzt — Zeit für Content: Texte, Fotos und Videos müssen vor dem Launch fertig sein, sonst verzögert sich das Projekt unabhängig vom Entwicklungsstand.' },
          { type: 'h2', text: 'Wie Sie Angebote seriös vergleichen' },
          { type: 'p', text: 'Fragen Sie nicht nur „Was kostet die Website?", sondern: Ist Performance-Optimierung (Core Web Vitals) enthalten? Wie viele Korrekturschleifen sind im Preis inbegriffen? Wer besitzt am Ende den Code — Sie oder die Agentur? Bei einem Baukasten-Produkt besitzen Sie in der Regel nichts, das Sie mitnehmen könnten, wenn Sie den Anbieter wechseln.' },
          { type: 'h2', text: 'Unser Ansatz bei 1618 Digital' },
          { type: 'p', text: 'Wir bauen individuelle Websites und SaaS-Plattformen von Grund auf — mit eigenem Code, den Sie besitzen, echter Performance-Optimierung und einer sauberen SEO-Basis (strukturierte Daten, Sitemap, mehrsprachige URLs) von Anfang an mitgedacht.' },
        ],
      },
      en: {
        metaTitle: 'Website Costs in Berlin 2026: What a Custom Website Really Costs',
        metaDescription: 'What does a professional website or SaaS tool cost in Berlin in 2026? Price ranges by project type, hidden costs, and how to compare quotes.',
        title: 'What Does a Custom Website in Berlin Really Cost in 2026?',
        excerpt: 'A €20/month website builder or €15,000 custom development? We break down the real price ranges — and what actually matters when choosing.',
        readingTime: '7 min read',
        body: [
          { type: 'p', text: 'The range in website pricing is so wide it barely means anything on its own: a website builder advertises €20/month, an agency quotes €15,000 for what sounds like the same project. Both are right — they\'re just talking about entirely different things.' },
          { type: 'h2', text: 'The three price categories' },
          { type: 'p', lead: 'Website builder (Wix, Squarespace, etc.): €0–50/month.', text: 'Fine for a simple one-person business with no complex requirements. Downsides: limited customization, slower load times, you\'re locked into the platform.' },
          { type: 'p', lead: 'Custom website (static or CMS-based): €2,500–8,000.', text: 'Tailored design, real performance optimization, full control over hosting and code. The typical range for restaurants, service providers, and smaller businesses that need a clear, professional presence.' },
          { type: 'p', lead: 'SaaS platform / web app with booking system, login, database: €8,000–25,000+.', text: 'This is real software, not just a website — with a backend, user management, often payment integration. Price depends heavily on the complexity of the logic, not the design.' },
          { type: 'h2', text: 'Where the big spread within a category comes from' },
          { type: 'list', items: [
            'Custom design vs. template customization',
            'Number of sub-pages and multilingual content (DE/EN/TR roughly triples the copywriting workload)',
            'SEO fundamentals: structured data, sitemap, clean performance — or not',
            'Post-launch maintenance & hosting included or billed separately',
            'Custom illustrations/animations vs. stock assets',
          ] },
          { type: 'h2', text: 'Hidden costs people forget' },
          { type: 'p', text: 'Domain and hosting (usually €10–30/month), SSL certificate (typically included today), professional email addresses, and — often the most underestimated — time for content: copy, photos, and video need to be ready before launch, or the project stalls regardless of how far the build has progressed.' },
          { type: 'h2', text: 'How to compare quotes properly' },
          { type: 'p', text: 'Don\'t just ask "what does the website cost?" Ask: is performance optimization (Core Web Vitals) included? How many revision rounds are in the price? Who owns the code at the end — you or the agency? With most website-builder products, you own nothing portable if you ever switch providers.' },
          { type: 'h2', text: 'How we work at 1618 Digital' },
          { type: 'p', text: 'We build custom websites and SaaS platforms from scratch — with your own code that you own, real performance optimization, and a clean SEO foundation (structured data, sitemap, multilingual URLs) designed in from day one.' },
        ],
      },
      tr: {
        metaTitle: 'Berlin\'de Web Sitesi Maliyeti 2026: Özel Bir Web Sitesi Gerçekte Ne Kadar Tutar',
        metaDescription: 'Berlin\'de 2026\'da profesyonel bir web sitesi ya da SaaS aracı ne kadar tutar? Proje tipine göre fiyat aralıkları, gizli maliyetler ve teklifleri karşılaştırma rehberi.',
        title: 'Berlin\'de Özel Bir Web Sitesi 2026\'da Gerçekte Ne Kadar Tutar?',
        excerpt: 'Aylık 20 €\'luk hazır site oluşturucu mu, yoksa 15.000 €\'luk özel geliştirme mi? Gerçek fiyat aralıklarını ve seçimde asıl önemli olan noktaları anlatıyoruz.',
        readingTime: '7 dk okuma',
        body: [
          { type: 'p', text: 'Web sitesi fiyatlarındaki aralık o kadar geniş ki tek başına neredeyse bir anlam ifade etmiyor: bir hazır site oluşturucu ayda 20 € ile reklam yaparken, bir ajans aynı proje için 15.000 € isteyebiliyor. İkisi de haklı — sadece tamamen farklı şeylerden bahsediyorlar.' },
          { type: 'h2', text: 'Üç fiyat kategorisi' },
          { type: 'p', lead: 'Hazır site oluşturucu (Wix, Squarespace vb.): Ayda 0-50 €.', text: 'Karmaşık ihtiyaçları olmayan basit, tek kişilik bir iş için uygun. Dezavantajları: sınırlı özelleştirme, daha yavaş yüklenme süreleri, platforma bağımlılık.' },
          { type: 'p', lead: 'Özel web sitesi (statik veya CMS tabanlı): 2.500-8.000 €.', text: 'Özel tasarım, gerçek performans optimizasyonu, hosting ve kod üzerinde tam kontrol. Restoranlar, hizmet sağlayıcılar ve net, profesyonel bir varlığa ihtiyaç duyan küçük işletmeler için tipik aralık.' },
          { type: 'p', lead: 'Rezervasyon sistemi, giriş, veritabanı olan SaaS platformu / web uygulaması: 8.000-25.000 €+.', text: 'Bu sadece bir web sitesi değil, gerçek bir yazılım — backend, kullanıcı yönetimi, genellikle ödeme entegrasyonu ile. Fiyat büyük ölçüde tasarımdan çok mantığın karmaşıklığına bağlıdır.' },
          { type: 'h2', text: 'Bir kategori içindeki büyük fiyat farkı nereden geliyor' },
          { type: 'list', items: [
            'Özel tasarım ile şablon özelleştirmesi arasındaki fark',
            'Alt sayfa sayısı ve çok dilli içerik (DE/EN/TR metin işini kabaca üçe katlar)',
            'SEO temelleri: yapılandırılmış veri, site haritası, temiz performans — ya da yokluğu',
            'Yayın sonrası bakım ve hosting\'in fiyata dahil olup olmadığı',
            'Özel illüstrasyon/animasyon ile hazır görsellerin karşılaştırması',
          ] },
          { type: 'h2', text: 'Sık unutulan gizli maliyetler' },
          { type: 'p', text: 'Domain ve hosting (genelde ayda 10-30 €), SSL sertifikası (bugün genelde dahil), profesyonel e-posta adresleri ve — genelde en çok küçümsenen — içerik için gereken zaman: metinler, fotoğraflar ve videolar yayından önce hazır olmalı, aksi halde proje geliştirme ne kadar ilerlemiş olursa olsun durur.' },
          { type: 'h2', text: 'Teklifleri doğru şekilde nasıl karşılaştırmalı' },
          { type: 'p', text: 'Sadece "web sitesi ne kadar tutar?" diye sormayın. Şunu sorun: performans optimizasyonu (Core Web Vitals) dahil mi? Fiyata kaç revizyon turu dahil? Sonunda kodun sahibi kim — siz mi, ajans mı? Çoğu hazır site oluşturucu ürününde, sağlayıcı değiştirirseniz yanınıza alabileceğiniz hiçbir şeye sahip olmazsınız.' },
          { type: 'h2', text: '1618 Digital olarak yaklaşımımız' },
          { type: 'p', text: 'Özel web siteleri ve SaaS platformlarını sıfırdan inşa ediyoruz — sahibi siz olacak kendi kodunuzla, gerçek performans optimizasyonuyla ve daha ilk günden düşünülmüş temiz bir SEO temeliyle (yapılandırılmış veri, site haritası, çok dilli URL\'ler).' },
        ],
      },
    },
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
