/**
 * Showroom — the studio's own 3D product-stage demos (vitrin-demo).
 * These are concept pieces, not client work, which is why they live
 * apart from works.ts and every card is labelled as a demo.
 *
 * Posters are self-hosted captures (see scripts/optimize-images.mjs);
 * only the outbound link points at the demo domain, so nothing is
 * requested from it until a visitor chooses to open a demo.
 */
export interface ShowroomDemo {
  id: string;
  name: string;
  url: string;
  image: string;
  /** i18n key for the product category shown under the name. */
  categoryKey: string;
}

// Food and drink first: that is the audience the rest of the site speaks to.
export const showroomDemos: ShowroomDemo[] = [
  { id: 'origo', name: 'Origo', url: 'https://vitrin-demo.netlify.app/demo/origo', image: '/showroom/origo.webp', categoryKey: 'showroom_cat_coffee' },
  { id: 'kivilcim', name: 'Kıvılcım', url: 'https://vitrin-demo.netlify.app/demo/kivilcim', image: '/showroom/kivilcim.webp', categoryKey: 'showroom_cat_lemonade' },
  { id: 'gischt', name: 'Gischt', url: 'https://vitrin-demo.netlify.app/demo/gischt', image: '/showroom/gischt.webp', categoryKey: 'showroom_cat_gin' },
  { id: 'solenne', name: 'Solenne', url: 'https://vitrin-demo.netlify.app/demo/solenne', image: '/showroom/solenne.webp', categoryKey: 'showroom_cat_perfume' },
  { id: 'elara', name: 'Elara', url: 'https://vitrin-demo.netlify.app/demo/elara', image: '/showroom/elara.webp', categoryKey: 'showroom_cat_jewellery' },
  { id: 'arca', name: 'Arca', url: 'https://vitrin-demo.netlify.app/demo/arca', image: '/showroom/arca.webp', categoryKey: 'showroom_cat_furniture' },
];
