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
        metaTitle: 'Hochzeitsvideo Berlin: Preisfaktoren, Ablauf & worauf Sie achten sollten',
        metaDescription: 'Wovon hängt der Preis eines Hochzeitsvideos in Berlin ab? Preisfaktoren, Ablauf am Hochzeitstag und eine Checkliste zur Auswahl Ihres Videografen — von 1618 Digital.',
        title: 'Hochzeitsvideo Berlin: Preisfaktoren, Ablauf & worauf Sie wirklich achten sollten',
        excerpt: 'Angebote für Hochzeitsvideos in Berlin liegen weit auseinander. Wir erklären, woher die Unterschiede kommen und wie Sie den richtigen Videografen für Ihren Tag finden.',
        readingTime: '6 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Kaum eine Entscheidung rund um die Hochzeit wird so oft aufgeschoben wie die Wahl des Videografen — meist, weil die Preise auf den ersten Blick schwer vergleichbar sind. Zwei Angebote können um ein Vielfaches auseinanderliegen, und beide nennen sich „Hochzeitsfilmer". Hier ist, worauf der Unterschied tatsächlich beruht.' },
          { type: 'h2', text: 'Wovon der Preis eines Hochzeitsvideos abhängt' },
          { type: 'p', text: 'Den größten Unterschied macht der Umfang: Ein kompaktes Highlight-Video mit einem Filmer und einem halben Tag ist etwas anderes als eine vollständige Produktion mit zwei Kamerateams, Drohnenaufnahmen, Langfassung und professionellem Color Grading. Auffällig günstige Angebote bedeuten fast immer: keine Zweitkamera, keine Farbkorrektur, oft nur ein automatisch geschnittenes Rohmaterial ohne dramaturgischen Aufbau.' },
          { type: 'list', items: [
            'Anzahl der Kamerateams (1 vs. 2 — entscheidend für Trauung + Party gleichzeitig)',
            'Drohnenaufnahmen (benötigen eine gültige EU-Drohnenlizenz, siehe unten)',
            'Schnittlänge: kompaktes Highlight-Reel vs. ausführliche Langversion',
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
        metaTitle: 'Wedding Videography Berlin: What Drives the Price & What to Look For',
        metaDescription: 'What drives the price of wedding videography in Berlin? Pricing factors, drone-permit requirements, and a checklist for choosing your videographer.',
        title: 'Wedding Videography in Berlin: What Drives the Price & What to Look For',
        excerpt: 'Wedding video quotes in Berlin vary enormously. Here is where that gap actually comes from, and how to pick the right videographer for your day.',
        readingTime: '6 min read',
        body: [
          { type: 'p', text: 'Few wedding decisions get put off as long as booking a videographer — mostly because prices are hard to compare at first glance. One quote can be several times another, and both call it a "wedding film". Here is what actually drives the difference.' },
          { type: 'h2', text: 'What drives the price of a wedding video' },
          { type: 'p', text: 'Scope makes the biggest difference: a compact highlight video with one filmer and half-day coverage is a different product from a full production with two camera operators, drone footage, a full-length cut and professional color grading. Offers that look unusually cheap usually mean: no second camera, no color correction, and often just auto-edited raw footage with no real story structure.' },
          { type: 'list', items: [
            'Number of camera operators (1 vs. 2 — critical for covering the ceremony and reception at once)',
            'Drone footage (requires a valid EU drone operator license — see below)',
            'Cut length: compact highlight reel vs. full-length film',
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
        metaTitle: 'Berlin Düğün Video Çekimi: Fiyatı Belirleyen Faktörler ve Nelere Dikkat Etmeli',
        metaDescription: 'Berlin\'de düğün video çekiminin fiyatını ne belirler? Fiyatı belirleyen faktörler, drone çekimi için yasal gereklilikler ve videograf seçim rehberi.',
        title: 'Berlin Düğün Video Çekimi: Fiyatı Belirleyen Faktörler ve Nelere Dikkat Etmeli',
        excerpt: 'Berlin\'de düğün video teklifleri arasında büyük farklar var. Bu farkın nereden geldiğini ve gününüz için doğru videografı nasıl seçeceğinizi anlatıyoruz.',
        readingTime: '6 dk okuma',
        body: [
          { type: 'p', text: 'Düğün hazırlıklarında en çok ertelenen kararlardan biri videograf seçimidir — çünkü fiyatları ilk bakışta karşılaştırmak zor. Bir teklif diğerinin birkaç katı olabiliyor ve ikisi de kendine "düğün filmi" diyor. İşte bu farkın gerçekte nereden geldiği.' },
          { type: 'h2', text: 'Düğün videosunun fiyatını ne belirler' },
          { type: 'p', text: 'En büyük farkı kapsam yaratır: Tek kameraman ve yarım günlük kompakt bir highlight videosu ile iki kameraman, drone çekimi, uzun versiyon ve profesyonel renk düzenlemesi içeren tam bir prodüksiyon farklı ürünlerdir. Göze çarpacak kadar ucuz teklifler genelde şu anlama gelir: ikinci kamera yok, renk düzeltmesi yok, çoğu zaman kurgusuz otomatik kesilmiş ham görüntü.' },
          { type: 'list', items: [
            'Kameraman sayısı (1\'e karşı 2 — nikah ve eğlenceyi aynı anda çekebilmek için kritik)',
            'Drone çekimi (geçerli bir AB drone lisansı gerektirir — aşağıya bakın)',
            'Kurgu uzunluğu: kompakt highlight video ile tam uzunluk film arasındaki fark',
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
        metaTitle: 'Website-Kosten Berlin 2026: Wovon der Preis einer individuellen Website abhängt',
        metaDescription: 'Wovon hängen die Kosten einer professionellen Website oder eines SaaS-Tools in Berlin 2026 ab? Projekttypen, versteckte Kosten und wie Sie Angebote vergleichen.',
        title: 'Wovon hängen die Kosten einer individuellen Website in Berlin 2026 ab?',
        excerpt: 'Baukasten im Monatsabo oder Individualentwicklung? Wir ordnen die Projekttypen ein — und zeigen, worauf es bei der Wahl wirklich ankommt.',
        readingTime: '7 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Die Bandbreite bei Website-Preisen ist so groß, dass sie kaum noch aussagekräftig ist: Ein Baukasten-Anbieter wirbt mit einem kleinen Monatsabo, eine Agentur nennt für scheinbar dasselbe Vorhaben ein Vielfaches. Beide haben recht — sie sprechen nur über völlig verschiedene Dinge.' },
          { type: 'h2', text: 'Die drei Projekttypen' },
          { type: 'p', lead: 'Baukasten (Wix, Squarespace, o. ä.): monatliches Abo.', text: 'Sinnvoll für ein einfaches Ein-Personen-Business ohne komplexe Anforderungen. Nachteile: begrenzte Individualisierung, langsamere Ladezeiten, Sie sind an die Plattform gebunden.' },
          { type: 'p', lead: 'Individuelle Website (statisch oder mit CMS): einmaliges Projekt.', text: 'Maßgeschneidertes Design, echte Performance-Optimierung, volle Kontrolle über Hosting und Code. Die übliche Wahl für Restaurants, Dienstleister, kleinere Unternehmen mit klarer Präsenz-Website.' },
          { type: 'p', lead: 'SaaS-Plattform / Web-App mit Buchungssystem, Login, Datenbank: echte Software.', text: 'Hier entsteht echte Software, keine reine Website — mit Backend, Nutzerverwaltung, oft Zahlungsanbindung. Der Preis hängt stark von der Komplexität der Logik ab, nicht vom Design.' },
          { type: 'h2', text: 'Woher die großen Preisunterschiede innerhalb eines Projekttyps kommen' },
          { type: 'list', items: [
            'Individuelles Design vs. Template-Anpassung',
            'Anzahl der Unterseiten und mehrsprachige Inhalte (DE/EN/TR verdreifacht den Textaufwand)',
            'SEO-Grundlagen: strukturierte Daten, Sitemap, saubere Performance — oder nicht',
            'Wartung & Hosting nach dem Launch inklusive oder separat berechnet',
            'Eigene Illustrationen/Animationen vs. Stock-Assets',
          ] },
          { type: 'h2', text: 'Versteckte Kosten, die oft vergessen werden' },
          { type: 'p', text: 'Domain und Hosting (laufende monatliche Kosten), SSL-Zertifikat (heute meist inklusive), professionelle E-Mail-Adressen, und — oft am teuersten unterschätzt — Zeit für Content: Texte, Fotos und Videos müssen vor dem Launch fertig sein, sonst verzögert sich das Projekt unabhängig vom Entwicklungsstand.' },
          { type: 'h2', text: 'Wie Sie Angebote seriös vergleichen' },
          { type: 'p', text: 'Fragen Sie nicht nur „Was kostet die Website?", sondern: Ist Performance-Optimierung (Core Web Vitals) enthalten? Wie viele Korrekturschleifen sind im Preis inbegriffen? Wer besitzt am Ende den Code — Sie oder die Agentur? Bei einem Baukasten-Produkt besitzen Sie in der Regel nichts, das Sie mitnehmen könnten, wenn Sie den Anbieter wechseln.' },
          { type: 'h2', text: 'Unser Ansatz bei 1618 Digital' },
          { type: 'p', text: 'Wir bauen individuelle Websites und SaaS-Plattformen von Grund auf — mit eigenem Code, den Sie besitzen, echter Performance-Optimierung und einer sauberen SEO-Basis (strukturierte Daten, Sitemap, mehrsprachige URLs) von Anfang an mitgedacht.' },
        ],
      },
      en: {
        metaTitle: 'Website Costs in Berlin 2026: What Drives the Price of a Custom Website',
        metaDescription: 'What drives the cost of a professional website or SaaS tool in Berlin in 2026? Project types, hidden costs, and how to compare quotes.',
        title: 'What Drives the Cost of a Custom Website in Berlin in 2026?',
        excerpt: 'A website builder subscription or custom development? We break down the project types — and what actually matters when choosing.',
        readingTime: '7 min read',
        body: [
          { type: 'p', text: 'The range in website pricing is so wide it barely means anything on its own: a website builder advertises a small monthly subscription, an agency quotes many times that for what sounds like the same project. Both are right — they\'re just talking about entirely different things.' },
          { type: 'h2', text: 'The three project types' },
          { type: 'p', lead: 'Website builder (Wix, Squarespace, etc.): monthly subscription.', text: 'Fine for a simple one-person business with no complex requirements. Downsides: limited customization, slower load times, you\'re locked into the platform.' },
          { type: 'p', lead: 'Custom website (static or CMS-based): one-off project.', text: 'Tailored design, real performance optimization, full control over hosting and code. The usual choice for restaurants, service providers, and smaller businesses that need a clear, professional presence.' },
          { type: 'p', lead: 'SaaS platform / web app with booking system, login, database: real software.', text: 'This is real software, not just a website — with a backend, user management, often payment integration. Price depends heavily on the complexity of the logic, not the design.' },
          { type: 'h2', text: 'Where the big spread within a project type comes from' },
          { type: 'list', items: [
            'Custom design vs. template customization',
            'Number of sub-pages and multilingual content (DE/EN/TR roughly triples the copywriting workload)',
            'SEO fundamentals: structured data, sitemap, clean performance — or not',
            'Post-launch maintenance & hosting included or billed separately',
            'Custom illustrations/animations vs. stock assets',
          ] },
          { type: 'h2', text: 'Hidden costs people forget' },
          { type: 'p', text: 'Domain and hosting (an ongoing monthly cost), SSL certificate (typically included today), professional email addresses, and — often the most underestimated — time for content: copy, photos, and video need to be ready before launch, or the project stalls regardless of how far the build has progressed.' },
          { type: 'h2', text: 'How to compare quotes properly' },
          { type: 'p', text: 'Don\'t just ask "what does the website cost?" Ask: is performance optimization (Core Web Vitals) included? How many revision rounds are in the price? Who owns the code at the end — you or the agency? With most website-builder products, you own nothing portable if you ever switch providers.' },
          { type: 'h2', text: 'How we work at 1618 Digital' },
          { type: 'p', text: 'We build custom websites and SaaS platforms from scratch — with your own code that you own, real performance optimization, and a clean SEO foundation (structured data, sitemap, multilingual URLs) designed in from day one.' },
        ],
      },
      tr: {
        metaTitle: 'Berlin\'de Web Sitesi Maliyeti 2026: Özel Bir Web Sitesinin Fiyatını Ne Belirler',
        metaDescription: 'Berlin\'de 2026\'da profesyonel bir web sitesi ya da SaaS aracının maliyetini ne belirler? Proje tipleri, gizli maliyetler ve teklifleri karşılaştırma rehberi.',
        title: 'Berlin\'de 2026\'da Özel Bir Web Sitesinin Maliyetini Ne Belirler?',
        excerpt: 'Aylık abonelikli hazır site oluşturucu mu, yoksa özel geliştirme mi? Proje tiplerini ve seçimde asıl önemli olan noktaları anlatıyoruz.',
        readingTime: '7 dk okuma',
        body: [
          { type: 'p', text: 'Web sitesi fiyatlarındaki aralık o kadar geniş ki tek başına neredeyse bir anlam ifade etmiyor: bir hazır site oluşturucu küçük bir aylık abonelikle reklam yaparken, bir ajans görünüşte aynı proje için bunun katlarını isteyebiliyor. İkisi de haklı — sadece tamamen farklı şeylerden bahsediyorlar.' },
          { type: 'h2', text: 'Üç proje tipi' },
          { type: 'p', lead: 'Hazır site oluşturucu (Wix, Squarespace vb.): aylık abonelik.', text: 'Karmaşık ihtiyaçları olmayan basit, tek kişilik bir iş için uygun. Dezavantajları: sınırlı özelleştirme, daha yavaş yüklenme süreleri, platforma bağımlılık.' },
          { type: 'p', lead: 'Özel web sitesi (statik veya CMS tabanlı): tek seferlik proje.', text: 'Özel tasarım, gerçek performans optimizasyonu, hosting ve kod üzerinde tam kontrol. Restoranlar, hizmet sağlayıcılar ve net, profesyonel bir varlığa ihtiyaç duyan küçük işletmeler için tipik tercih.' },
          { type: 'p', lead: 'Rezervasyon sistemi, giriş, veritabanı olan SaaS platformu / web uygulaması: gerçek yazılım.', text: 'Bu sadece bir web sitesi değil, gerçek bir yazılım — backend, kullanıcı yönetimi, genellikle ödeme entegrasyonu ile. Fiyat büyük ölçüde tasarımdan çok mantığın karmaşıklığına bağlıdır.' },
          { type: 'h2', text: 'Bir proje tipi içindeki büyük fiyat farkı nereden geliyor' },
          { type: 'list', items: [
            'Özel tasarım ile şablon özelleştirmesi arasındaki fark',
            'Alt sayfa sayısı ve çok dilli içerik (DE/EN/TR metin işini kabaca üçe katlar)',
            'SEO temelleri: yapılandırılmış veri, site haritası, temiz performans — ya da yokluğu',
            'Yayın sonrası bakım ve hosting\'in fiyata dahil olup olmadığı',
            'Özel illüstrasyon/animasyon ile hazır görsellerin karşılaştırması',
          ] },
          { type: 'h2', text: 'Sık unutulan gizli maliyetler' },
          { type: 'p', text: 'Domain ve hosting (süregelen aylık maliyet), SSL sertifikası (bugün genelde dahil), profesyonel e-posta adresleri ve — genelde en çok küçümsenen — içerik için gereken zaman: metinler, fotoğraflar ve videolar yayından önce hazır olmalı, aksi halde proje geliştirme ne kadar ilerlemiş olursa olsun durur.' },
          { type: 'h2', text: 'Teklifleri doğru şekilde nasıl karşılaştırmalı' },
          { type: 'p', text: 'Sadece "web sitesi ne kadar tutar?" diye sormayın. Şunu sorun: performans optimizasyonu (Core Web Vitals) dahil mi? Fiyata kaç revizyon turu dahil? Sonunda kodun sahibi kim — siz mi, ajans mı? Çoğu hazır site oluşturucu ürününde, sağlayıcı değiştirirseniz yanınıza alabileceğiniz hiçbir şeye sahip olmazsınız.' },
          { type: 'h2', text: '1618 Digital olarak yaklaşımımız' },
          { type: 'p', text: 'Özel web siteleri ve SaaS platformlarını sıfırdan inşa ediyoruz — sahibi siz olacak kendi kodunuzla, gerçek performans optimizasyonuyla ve daha ilk günden düşünülmüş temiz bir SEO temeliyle (yapılandırılmış veri, site haritası, çok dilli URL\'ler).' },
        ],
      },
    },
  },
  {
    // Decision question a café or restaurant owner asks before buying a
    // digital menu. Deliberately even-handed (where paper still wins) and
    // free of prices or statistics the studio cannot back up: the claims
    // are the ones /digital-menus already makes.
    slug: 'qr-speisekarte-oder-gedruckte-karte',
    publishedAt: '2026-11-09',
    relatedServiceSlug: 'digital-menus',
    glowColor: '#22c55e',
    content: {
      de: {
        metaTitle: 'QR-Speisekarte oder gedruckte Karte? Ein ehrlicher Vergleich für Restaurants',
        metaDescription: 'QR-Code-Speisekarte oder gedruckte Karte: Was ist für Ihr Café oder Restaurant besser? Vor- und Nachteile, Mythen und warum die beste Lösung oft beides ist.',
        title: 'QR-Speisekarte oder gedruckte Karte? Ein ehrlicher Vergleich',
        excerpt: 'Die kurze Antwort: Für Preise, Sprachen und Allergene ist die QR-Karte klar im Vorteil – ganz ersetzen sollte sie die gedruckte Karte aber selten. Was wofür spricht.',
        readingTime: '5 Min. Lesezeit',
        body: [
          { type: 'p', text: 'Die kurze Antwort: Eine QR-Code-Speisekarte ist der gedruckten Karte überall dort überlegen, wo sich etwas ändert – Preise, Tagesgerichte, Sprachen, Allergene. Ganz ersetzen sollte sie die gedruckte Karte in den meisten Restaurants trotzdem nicht. Die beste Lösung ist fast immer: digital als Hauptkarte, ein paar gedruckte Exemplare für Gäste, die lieber blättern.' },
          { type: 'h2', text: 'Wo die QR-Speisekarte gewinnt' },
          { type: 'list', items: [
            'Immer aktuell: Ein neuer Preis oder ein ausverkauftes Gericht wird einmal geändert und ist sofort auf jedem Tisch sichtbar – ohne Neudruck.',
            'Mehrsprachig: Gäste wechseln mit einem Tipp zwischen Deutsch, Englisch, Türkisch oder weiteren Sprachen.',
            'Allergene am Gericht: Die Kennzeichnung steht direkt beim Gericht statt auf einem separaten Zettel, den niemand findet.',
            'Fotos verkaufen: Ein gutes Bild zeigt, was eine Beschreibung nur behaupten kann.',
            'Eine Quelle für alles: Dieselben Daten können auch TV-Menüboards an der Wand speisen.',
          ] },
          { type: 'h2', text: 'Wo die gedruckte Karte weiterhin punktet' },
          { type: 'p', text: 'Nicht jeder Gast möchte zum Essen das Handy herausholen – manche haben keinen Akku, kein Netz oder schlicht keine Lust. Eine schön gestaltete gedruckte Karte ist außerdem Teil des Erlebnisses, besonders im gehobenen Restaurant. Und sie funktioniert immer, auch wenn das WLAN ausfällt.' },
          { type: 'h2', text: 'Drei Mythen über QR-Menüs' },
          { type: 'list', items: [
            '„Gäste müssen eine App installieren.“ – Nein. Der QR-Code öffnet eine normale Webseite im Browser, auf jedem aktuellen Smartphone.',
            '„Das ist nur etwas für junge Gäste.“ – Gerade Touristen und ältere Gäste profitieren von größerer Schrift und der eigenen Sprache.',
            '„Dann bestellt niemand mehr beim Personal.“ – Die Karte ersetzt den Service nicht, sie beantwortet nur die Fragen, die sonst den Service aufhalten.',
          ] },
          { type: 'h2', text: 'Worauf Sie bei einer QR-Speisekarte achten sollten' },
          { type: 'p', text: 'Die Karte muss in einer Sekunde laden, auch im Mobilfunknetz. Sie sollte ohne App, Login und Tracking-Cookies auskommen, Ihr eigenes Design tragen statt das eines Plattformanbieters, und Sie müssen Preise selbst ändern können – oder jemanden haben, der das zuverlässig für Sie übernimmt. Gedruckte QR-Aufsteller gehören dazu: Ein Code, den niemand sieht, wird nicht gescannt.' },
          { type: 'h2', text: 'Wie 1618 Digital das löst' },
          { type: 'p', text: 'Wir bauen QR-Code-Speisekarten und animierte TV-Menüboards aus einer gemeinsamen Quelle: Eine Änderung erscheint gleichzeitig am Tisch und auf jedem Bildschirm, mehrsprachig und mit Allergenen. Tischaufsteller und Sticker gestalten wir passend zu Ihrer Marke – und auf Wunsch die gedruckte Karte gleich mit.' },
        ],
      },
      en: {
        metaTitle: 'QR Code Menu or Printed Menu? An Honest Comparison for Restaurants',
        metaDescription: 'QR code menu or printed menu: which is better for your café or restaurant? Pros, cons, common myths and why the best answer is often both.',
        title: 'QR Code Menu or Printed Menu? An Honest Comparison',
        excerpt: 'The short answer: for prices, languages and allergens a QR menu clearly wins — but it should rarely replace the printed menu completely. Here is what speaks for each.',
        readingTime: '5 min read',
        body: [
          { type: 'p', text: 'The short answer: a QR code menu beats a printed menu wherever things change — prices, daily specials, languages, allergens. In most restaurants it still should not replace the printed menu entirely. The best setup is almost always digital as the main menu, plus a few printed copies for guests who prefer to turn pages.' },
          { type: 'h2', text: 'Where the QR menu wins' },
          { type: 'list', items: [
            'Always current: a new price or a sold-out dish is changed once and shows on every table straight away — no reprint.',
            'Multilingual: guests switch between German, English, Turkish or other languages with one tap.',
            'Allergens at the dish: labelling sits right next to each dish instead of on a separate sheet nobody finds.',
            'Photos sell: a good picture shows what a description can only claim.',
            'One source for everything: the same data can also drive TV menu boards on the wall.',
          ] },
          { type: 'h2', text: 'Where the printed menu still scores' },
          { type: 'p', text: 'Not every guest wants to take out their phone to eat — some have no battery, no signal or simply no wish to. A beautifully designed printed menu is also part of the experience, especially in fine dining. And it always works, even when the Wi-Fi does not.' },
          { type: 'h2', text: 'Three myths about QR menus' },
          { type: 'list', items: [
            '“Guests have to install an app.” — No. The QR code opens an ordinary web page in the browser, on any current smartphone.',
            '“It is only for young guests.” — Tourists and older guests in particular benefit from larger text and their own language.',
            '“Then nobody talks to the staff any more.” — The menu does not replace service; it answers the questions that would otherwise hold service up.',
          ] },
          { type: 'h2', text: 'What to look for in a QR menu' },
          { type: 'p', text: 'It has to load in a second, even on mobile data. It should work without an app, a login or tracking cookies, carry your own design rather than a platform\'s, and you must be able to change prices yourself — or have someone who reliably does it for you. Printed QR stands are part of it: a code nobody sees is a code nobody scans.' },
          { type: 'h2', text: 'How 1618 Digital does it' },
          { type: 'p', text: 'We build QR code menus and animated TV menu boards from one shared source: a change appears on the table and on every screen at the same time, multilingual and with allergens. We design the table stands and stickers to match your brand — and, if you like, the printed menu as well.' },
        ],
      },
      tr: {
        metaTitle: 'QR Kod Menü mü, Basılı Menü mü? Restoranlar İçin Dürüst Bir Karşılaştırma',
        metaDescription: 'QR kod menü mü basılı menü mü: Kafeniz veya restoranınız için hangisi daha iyi? Artıları, eksileri, yaygın yanılgılar ve en iyi cevabın neden çoğu zaman ikisi olduğu.',
        title: 'QR Kod Menü mü, Basılı Menü mü? Dürüst Bir Karşılaştırma',
        excerpt: 'Kısa cevap: Fiyatlar, diller ve alerjenler söz konusu olduğunda QR menü açıkça önde – ama basılı menünün yerini tamamen alması nadiren doğru. Hangisi neden tercih edilmeli.',
        readingTime: '5 dk okuma',
        body: [
          { type: 'p', text: 'Kısa cevap: QR kod menü, bir şeyin değiştiği her yerde basılı menüden üstündür – fiyatlar, günün yemekleri, diller, alerjenler. Yine de çoğu restoranda basılı menünün yerini tamamen almamalı. En iyi çözüm neredeyse her zaman şu: ana menü dijital, sayfa çevirmeyi seven misafirler için birkaç basılı menü.' },
          { type: 'h2', text: 'QR menünün öne çıktığı yerler' },
          { type: 'list', items: [
            'Her zaman güncel: Yeni bir fiyat ya da tükenen bir yemek bir kez değiştirilir ve anında her masada görünür – yeniden baskıya gerek kalmaz.',
            'Çok dilli: Misafirler tek dokunuşla Almanca, İngilizce, Türkçe veya başka diller arasında geçiş yapar.',
            'Alerjenler yemeğin yanında: Etiketler, kimsenin bulamadığı ayrı bir kâğıtta değil, doğrudan yemeğin yanında yer alır.',
            'Fotoğraflar satar: İyi bir fotoğraf, bir açıklamanın yalnızca iddia edebildiğini gösterir.',
            'Her şey için tek kaynak: Aynı veriler duvardaki TV menü panolarını da besleyebilir.',
          ] },
          { type: 'h2', text: 'Basılı menünün hâlâ avantajlı olduğu yerler' },
          { type: 'p', text: 'Her misafir yemek için telefonunu çıkarmak istemez – kiminin şarjı biter, kiminin çekmez, kimi de sadece istemez. Güzel tasarlanmış basılı bir menü, özellikle üst segment restoranlarda deneyimin bir parçasıdır. Ve Wi-Fi çöktüğünde bile her zaman çalışır.' },
          { type: 'h2', text: 'QR menüler hakkında üç yanılgı' },
          { type: 'list', items: [
            '“Misafirlerin bir uygulama yüklemesi gerekir.” – Hayır. QR kod, her güncel akıllı telefonda tarayıcıda normal bir web sayfası açar.',
            '“Bu sadece genç misafirler için.” – Özellikle turistler ve yaşlı misafirler daha büyük yazıdan ve kendi dillerinden faydalanır.',
            '“O zaman kimse personelle konuşmaz.” – Menü servisin yerini almaz; sadece servisi meşgul eden soruları yanıtlar.',
          ] },
          { type: 'h2', text: 'Bir QR menüde nelere dikkat etmeli' },
          { type: 'p', text: 'Mobil veride bile bir saniyede yüklenmeli. Uygulama, giriş veya takip çerezi olmadan çalışmalı, bir platformun değil sizin tasarımınızı taşımalı ve fiyatları kendiniz değiştirebilmelisiniz – ya da bunu güvenilir şekilde sizin için yapan biri olmalı. Basılı QR standları da işin parçası: Kimsenin görmediği bir kod taranmaz.' },
          { type: 'h2', text: '1618 Digital bunu nasıl çözüyor' },
          { type: 'p', text: 'QR kod menüleri ve animasyonlu TV menü panolarını ortak bir kaynaktan üretiyoruz: Bir değişiklik masada ve her ekranda aynı anda, çok dilli ve alerjenlerle birlikte görünür. Masa standlarını ve etiketleri markanıza uygun tasarlıyoruz – isterseniz basılı menüyü de.' },
        ],
      },
    },
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
