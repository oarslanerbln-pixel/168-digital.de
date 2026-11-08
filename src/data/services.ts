import type { LucideIcon } from 'lucide-react';
import { Globe, QrCode, Video, Camera, Smartphone, Plane } from 'lucide-react';
import type { ContactTopic } from '../utils/contactTopic';

/**
 * The two halves of the business. The homepage groups its service cards
 * under these, so a visitor scanning for "a menu for my café" never has to
 * read past wedding films to find it (and vice versa).
 */
export type ServiceGroup = 'software' | 'film';

export interface ServiceMeta {
  slug: string;
  icon: LucideIcon;
  glowColor: string;
  tags: string[];
  /** i18n key for the short nav/breadcrumb label (see i18n.ts service_*_title keys). */
  titleKey: string;
  /** i18n key for the one-sentence homepage card description. */
  descKey: string;
  group: ServiceGroup;
  /** Tile photo (public/). Software tiles use the product photos, film
   *  tiles frames from the studio's own showreel — no stock. */
  image: string;
  /** 'phone': the photo is portrait and the tile frames it in a phone. */
  imageFrame?: 'phone';
  /** i18n key for the photo's alt text. The tiles show the photo beside
   *  their own title (alt=""), but the service page leads with it, so
   *  there it has to say what it shows — for screen readers and for
   *  image search. */
  imageAltKey: string;
  /** Inquiry-form topic preselected by this service page's CTA, so the
   *  lead arrives already sorted. */
  contactTopic: ContactTopic;
}

/**
 * Single source of truth for the dedicated service landing pages.
 * Order here drives the homepage grid (within each group) and the nav
 * "Leistungen" list. Long-form copy for each slug lives in
 * src/data/serviceContent.ts.
 */
export const services: ServiceMeta[] = [
  {
    slug: 'web-saas-development',
    icon: Globe,
    glowColor: '#38bdf8',
    tags: ['Websites', 'Web Apps', 'SaaS'],
    titleKey: 'service_web_title',
    descKey: 'service_web_desc',
    group: 'software',
    image: '/solutions/dashboard-640.webp',
    imageAltKey: 'service_web_img_alt',
    contactTopic: 'website',
  },
  {
    slug: 'digital-menus',
    icon: QrCode,
    glowColor: '#22c55e',
    tags: ['QR Menu', 'TV Menu Boards', 'Animation'],
    titleKey: 'service_menu_title',
    descKey: 'service_menu_desc',
    group: 'software',
    image: '/solutions/ordering-640.webp',
    imageAltKey: 'service_menu_img_alt',
    contactTopic: 'menu',
  },
  {
    slug: 'wedding-event-films',
    icon: Camera,
    glowColor: '#f43f5e',
    tags: ['Weddings', 'Events', 'Documentary'],
    titleKey: 'service_event_title',
    descKey: 'service_event_desc',
    group: 'film',
    image: '/services/event.webp',
    imageAltKey: 'service_event_img_alt',
    contactTopic: 'film',
  },
  {
    slug: 'video-drone-production',
    icon: Video,
    glowColor: '#f59e0b',
    tags: ['Drone', 'Aerial', 'Color Grading'],
    titleKey: 'service_media_title',
    descKey: 'service_media_desc',
    group: 'film',
    image: '/services/drone.webp',
    imageAltKey: 'service_media_img_alt',
    contactTopic: 'film',
  },
  {
    slug: 'social-media-marketing',
    icon: Smartphone,
    glowColor: '#06b6d4',
    tags: ['Strategy', 'Content', 'Growth'],
    titleKey: 'service_social_title',
    descKey: 'service_social_desc',
    group: 'film',
    image: '/services/social.webp',
    imageFrame: 'phone',
    imageAltKey: 'service_social_img_alt',
    contactTopic: 'other',
  },
  {
    // Travel film plus a QR-linked journal page: the film studio's craft
    // sold as a keepsake. Grouped with film because the shoot is the work;
    // the journal page reuses the digital-menu QR stack.
    slug: 'travel-films-journals',
    icon: Plane,
    glowColor: '#818cf8',
    tags: ['Travel Films', 'QR Journal', 'Drone'],
    titleKey: 'service_travel_title',
    descKey: 'service_travel_desc',
    group: 'film',
    image: '/services/travel.webp',
    imageAltKey: 'service_travel_img_alt',
    contactTopic: 'film',
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
