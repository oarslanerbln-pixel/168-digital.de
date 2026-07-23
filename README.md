# 1618 Digital — Premium AI Agency Portfolio

Bu proje, 1618 Digital için geliştirilmiş, ultra-premium standartlarda (Zaha Hadid / Refik Anadol mimarisi) bir dijital ajans portföy sitesidir.

## 🌟 Öne Çıkan Özellikler (Features)
- **Parametric Veil 3D Background:** Zaha Hadid tarzı, nefes alan, GPU-based parçacıklarla desteklenmiş okyanus/neon 3D arka plan tasarımı.
- **Glassmorphic 1618 Typography:** Işığın kırılma (refraction) simülasyonunu yapan, farenin hareketlerine tepki veren özel cam materyalli 3D model (R3F & Drei kullanılarak tasarlandı).
- **Premium Grid Hero Layout:** Hiyerarşisi net, bol negatif alan barındıran şık, iki kolonlu Above-the-fold tasarımı.
- **Smooth Scroll & Animations:** Framer Motion ve Lenis kullanılarak yaratılmış kesintisiz, sinematik kaydırma deneyimi.
- **Performans Optimizasyonu:** Mobil cihazlarda ekran kartı kullanımını optimize etmek amacıyla piksel yoğunluğu (DPR) yönetimi ve basitleştirilmiş rendering.
- **Çoklu Dil Desteği:** `react-i18next` altyapısı ile entegre.

## 🛠️ Tech Stack
- **Framework:** React 18 (Vite)
- **3D Engine:** Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **Animation / Scroll:** Framer Motion + Lenis Smooth Scroll
- **Stil & UI:** Vanilla CSS + Custom CSS Variables (Design Tokens)

## 🚀 Kurulum (Local Development)

Proje gereksinimleri: `Node.js` (v18+)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Production versiyonunu derleyin
npm run build
```

## 🌐 Canlıya Alma (Deployment)
Bu repo, Vercel üzerinden otomatik CI/CD yapılandırmasına sahiptir. `main` branch'ine yapılan her `git push` komutu doğrudan production ortamında güncellenir.
- **Canlı Site:** https://1618-digital.de (Eğer alan adı yönlendirmesi tamamlandıysa)
- **Vercel Yedek Link:** Vercel projenizin sağladığı `.vercel.app` adresi üzerinden de erişilebilir.
