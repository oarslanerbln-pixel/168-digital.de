# Berlin Burada Partners — Konzept

**Auftraggeber:** Berlin Burada · Geschäftsführer: Ahmet Çakıoğlu
**Kanal:** Instagram, 134.000 Follower, türkisch-deutsche Community Berlin (News + Story-Werbung)

## 1. Fikir

**Berlin Burada Partners**: Alman şirketlerini Berlin'deki Türk topluluğuyla buluşturan B2B platformu.
Site, takipçilere değil **reklam verenlere** konuşur (Almanca), çünkü parayı ödeyen taraf onlar.

| Gelir modeli | İçerik |
|---|---|
| Format satışı | Story, Reel, Feed-Post, News-Entegrasyonu, Event |
| Paketler | Impuls · Kampanya · Partnerlik (aylık abonelik) |
| **Burada Partner-Siegel** | Türkçe hizmet veren firmalara mühür + partner dizini (topluluk için rehber, firma için güven avantajı, sana tekrarlayan gelir) |
| Transcreation | DE→TR kültürel uyarlama: ana fark yaratan özellik |

Hedef sektörler: Telekom, banka/sigorta, otomotiv, perakende, seyahat/havayolu, emlak, işveren/İK, sağlık, kamu kampanyaları.

## 2. Website

- Dosya: `clients/berlin-burada/index.html` (bağımlılık yok, saf HTML/CSS/JS)
- Tasarım: Apple/Tesla tarzı. Siyah-beyaz bölüm ritmi, Montserrat display, bol boşluk; kırmızı ve altın sadece vurgu rengi olarak kullanılıyor
- Animasyon: SVG logo kendini çiziyor (çember → kule yükselir → bantlar → harfler), scroll ile kelime kelime yanan manifesto, sayaç, reveal efektleri; `prefers-reduced-motion` destekli
- İletişim formu: backend gerektirmez, `mailto` ile çalışır

**Canlıya almadan önce doldurulacaklar**
- [ ] Gerçek e-posta (`CONTACT_EMAIL` in `index.html`, şu an yer tutucu)
- [ ] Instagram kullanıcı adını doğrula (`berlinburada` varsayıldı)
- [ ] Impressum: şirket türü, adres, iletişim
- [ ] Datenschutz: hukuken kontrol edilmiş metin; Google Fonts'u lokal barındır
- [ ] Gerçek erişim verileri (ortalama story görüntülenme, erişim, demografi): şu an sadece 134K kullanılıyor
- [ ] Mevcut müşteri logoları veya referanslar (varsa güven bölümü eklenir)

**Deploy (Vercel):** Yeni proje → aynı repo → *Root Directory* `clients/berlin-burada` → Framework: *Other*. Domain örneği: `partner.berlinburada.de`.

## 3. Google Flow (Veo) — Logo-Animation

**Ayarlar:** *Frames to Video* · Model: Veo (Quality) · **End Frame = Logo PNG** (`assets/logo-original.png`).
Yapay zekâ harfleri bozabilir; son kareyi gerçek logo olarak verirsen final karesi her zaman doğru olur.

### Prompt A — Hero Reveal (16:9, 8 sn, website + YouTube)
```
Cinematic premium logo reveal, Apple-style product film. Pure black void with a subtle charcoal gradient and fine film grain. A thin line of white light slowly draws a perfect circle in the center. The upper half of the circle fills with soft white light. The silhouette of the Berlin TV Tower (Fernsehturm) rises smoothly from below into the white area; a soft specular glint travels across its sphere. A solid black horizontal band slides in from the left. Below it, a deep red band unfurls like painted canvas with a subtle oil-paint texture, revealing a white crescent and star. A thin golden-amber band settles at the bottom edge. The camera is locked off with a very slow, subtle push-in. Ending on the complete flat circular emblem, perfectly still and sharp, centered on a dark charcoal gradient. Minimal, elegant, high-end, 4K, soft studio lighting.
Audio: deep warm sub-bass swell, a soft airy whoosh as each band appears, one crisp click on the final frame, faint distant Berlin city ambience.
```

### Prompt B — Living Loop (9:16, Story/Reel, nahtlos)
*Start Frame **und** End Frame = Logo*
```
Seamless subtle loop of a circular flat emblem centered on a dark charcoal gradient, vertical 9:16. The emblem stays perfectly still and sharp; only gentle details move: the red band ripples softly like a flag in a light breeze, a slow band of light sweeps diagonally across the white upper half and glints on the TV tower sphere, tiny warm dust particles drift in the background. Calm, premium, hypnotic. No camera movement. No new text.
```

### Prompt C — Stadt-Intro (16:9, 8 sn, für Kampagnen-Reels)
```
Drone shot at blue hour flying slowly toward the Berlin TV Tower at Alexanderplatz, city lights glowing, light traffic trails below. As the camera reaches the tower's sphere, the scene smoothly transforms: the city fades into darkness and the tower becomes a black silhouette inside a white circular emblem, which completes itself with a black band, a red band with a white crescent and star, and a thin golden band at the bottom. Final frame: the flat emblem centered on dark charcoal. Cinematic, smooth, premium.
Audio: city hum fading into a single deep resonant tone.
```

**Negative (her prompt'a ekle):**
`no extra text, no misspelled letters, no warped letters, no 3D extrusion, no glossy chrome, no excessive lens flares, no people, no watermark`

## 4. Workflow

### A — Logo-Video (Flow)
1. Flow → New Project → *Frames to Video* → logo PNG'yi **End Frame** olarak yükle
2. Prompt A'yı yapıştır → 4 varyasyon üret → en temizini seç → *Upscale 1080p*
3. Prompt B ile 9:16 loop üret (Start + End = Logo)
4. CapCut/Premiere: son 1 saniyeye orijinal logo PNG'yi bindir (harfler %100 net olur), ses seviyesini ayarla
5. Export: `hero-16x9.mp4` (web, <4 MB, sessiz versiyon) + `story-9x16.mp4` (Instagram)
6. Websitede hero SVG yerine/yanına video eklenebilir (`<video autoplay muted loop playsinline>`)

### B — Müşteri Süreci (sitede de anlatılıyor)
`Anfrage → Briefing → DE/TR-Adaption → Produktion & Freigabe → Live (als Anzeige gekennzeichnet) → Report`

### C — Satış
1. 20 hedef firma listesi (sektör başına 2–3) → 2. Medya kiti PDF (siteyle aynı dil) → 3. LinkedIn/E-posta: siteye link → 4. İlk 3 müşteriye pilot fiyat → 5. Vaka çalışması olarak siteye ekle
