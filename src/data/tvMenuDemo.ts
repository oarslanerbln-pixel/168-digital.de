import type { Lang } from './serviceContent';

/**
 * Copy for the animated TV menu-board demo on the digital-menus page.
 *
 * It is a demo of a product, not a client's real menu, so the café is
 * fictional ("Café Aurum") and says so in the caption. Prices are written
 * per language because the format differs (3,20 € vs €3.20).
 */
export interface TvMenuItem {
  name: string;
  note: string;
  price: string;
}

export interface TvMenuDemoContent {
  /** Small label above the demo on the service page. */
  overline: string;
  heading: string;
  caption: string;
  /** Accessible summary of the animation for screen readers. */
  ariaLabel: string;
  cafe: string;
  scene1: { title: string; items: TvMenuItem[]; oldPrice: string; updated: string };
  scene2: { badge: string; name: string; desc: string; price: string };
  scene3: { title: string; until: string; items: TvMenuItem[]; price: string };
}

const content: Record<Lang, TvMenuDemoContent> = {
  en: {
    overline: 'LIVE DEMO',
    heading: 'This is how it runs on the screen above your counter',
    caption:
      'Demo for a fictional café. Your menu runs on the same system: your dishes, photos and prices, in your colours. Change a price once and every screen and the QR menu show it.',
    ariaLabel:
      'Animated menu board demo cycling through three scenes: a coffee menu where one price updates live, a featured drink of the day and a breakfast offer.',
    cafe: 'Café Aurum',
    scene1: {
      title: 'Coffee',
      items: [
        { name: 'Espresso', note: 'Single origin', price: '€2.40' },
        { name: 'Flat White', note: 'Oat milk +€0.50', price: '€3.90' },
        { name: 'Cappuccino', note: 'Classic', price: '€3.60' },
        { name: 'Filter Coffee', note: 'Refill free', price: '€3.20' },
      ],
      oldPrice: '€3.40',
      updated: 'Price updated',
    },
    scene2: {
      badge: 'Today only',
      name: 'Pistachio Latte',
      desc: 'Double espresso, pistachio cream, steamed milk',
      price: '€4.80',
    },
    scene3: {
      title: 'Breakfast',
      until: 'until 12 noon',
      items: [
        { name: 'Simit & cream cheese', note: '', price: '' },
        { name: 'Two eggs, any style', note: '', price: '' },
        { name: 'Coffee of your choice', note: '', price: '' },
      ],
      price: '€9.50',
    },
  },
  de: {
    overline: 'LIVE-DEMO',
    heading: 'So läuft es auf dem Bildschirm über Ihrer Theke',
    caption:
      'Demo für ein fiktives Café. Ihre Karte läuft auf demselben System: Ihre Gerichte, Fotos und Preise, in Ihren Farben. Ein Preis wird einmal geändert und ist sofort auf jedem Bildschirm und in der QR-Karte aktuell.',
    ariaLabel:
      'Animiertes Menüboard in drei Szenen: eine Kaffeekarte, in der sich ein Preis live ändert, ein Getränk des Tages und ein Frühstücksangebot.',
    cafe: 'Café Aurum',
    scene1: {
      title: 'Kaffee',
      items: [
        { name: 'Espresso', note: 'Single Origin', price: '2,40 €' },
        { name: 'Flat White', note: 'Hafermilch +0,50 €', price: '3,90 €' },
        { name: 'Cappuccino', note: 'Klassisch', price: '3,60 €' },
        { name: 'Filterkaffee', note: 'Nachfüllen gratis', price: '3,20 €' },
      ],
      oldPrice: '3,40 €',
      updated: 'Preis aktualisiert',
    },
    scene2: {
      badge: 'Nur heute',
      name: 'Pistazien-Latte',
      desc: 'Doppelter Espresso, Pistaziencreme, aufgeschäumte Milch',
      price: '4,80 €',
    },
    scene3: {
      title: 'Frühstück',
      until: 'bis 12 Uhr',
      items: [
        { name: 'Simit mit Frischkäse', note: '', price: '' },
        { name: 'Zwei Eier nach Wahl', note: '', price: '' },
        { name: 'Kaffee nach Wahl', note: '', price: '' },
      ],
      price: '9,50 €',
    },
  },
  tr: {
    overline: 'CANLI DEMO',
    heading: 'Tezgâhınızın üstündeki ekranda böyle görünür',
    caption:
      'Hayali bir kafe için hazırlanmış demo. Sizin menünüz de aynı sistemle çalışır: kendi ürünleriniz, fotoğraflarınız ve fiyatlarınız, kendi renklerinizle. Bir fiyatı bir kez değiştirirsiniz; tüm ekranlarda ve QR menüde anında güncellenir.',
    ariaLabel:
      'Üç sahneden oluşan animasyonlu menü panosu demosu: bir fiyatın canlı güncellendiği kahve menüsü, günün içeceği ve kahvaltı teklifi.',
    cafe: 'Café Aurum',
    scene1: {
      title: 'Kahve',
      items: [
        { name: 'Espresso', note: 'Tek köken', price: '2,40 €' },
        { name: 'Flat White', note: 'Yulaf sütü +0,50 €', price: '3,90 €' },
        { name: 'Cappuccino', note: 'Klasik', price: '3,60 €' },
        { name: 'Filtre Kahve', note: 'Tazeleme ücretsiz', price: '3,20 €' },
      ],
      oldPrice: '3,40 €',
      updated: 'Fiyat güncellendi',
    },
    scene2: {
      badge: 'Sadece bugün',
      name: 'Fıstıklı Latte',
      desc: 'Duble espresso, fıstık kreması, köpürtülmüş süt',
      price: '4,80 €',
    },
    scene3: {
      title: 'Kahvaltı',
      until: 'saat 12’ye kadar',
      items: [
        { name: 'Krem peynirli simit', note: '', price: '' },
        { name: 'İki yumurta, dilediğiniz gibi', note: '', price: '' },
        { name: 'Seçtiğiniz bir kahve', note: '', price: '' },
      ],
      price: '9,50 €',
    },
  },
};

export const getTvMenuDemo = (lang: string): TvMenuDemoContent => {
  const code = lang.substring(0, 2).toLowerCase() as Lang;
  return content[code] ?? content.en;
};
