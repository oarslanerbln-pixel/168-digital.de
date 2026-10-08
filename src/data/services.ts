import type { LucideIcon } from 'lucide-react';
import { Globe, QrCode, Video, Camera, Smartphone } from 'lucide-react';

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
  },
  {
    slug: 'digital-menus',
    icon: QrCode,
    glowColor: '#22c55e',
    tags: ['QR Menu', 'TV Menu Boards', 'Animation'],
    titleKey: 'service_menu_title',
    descKey: 'service_menu_desc',
    group: 'software',
  },
  {
    slug: 'wedding-event-films',
    icon: Camera,
    glowColor: '#f43f5e',
    tags: ['Weddings', 'Events', 'Documentary'],
    titleKey: 'service_event_title',
    descKey: 'service_event_desc',
    group: 'film',
  },
  {
    slug: 'video-drone-production',
    icon: Video,
    glowColor: '#f59e0b',
    tags: ['Drone', 'Aerial', 'Color Grading'],
    titleKey: 'service_media_title',
    descKey: 'service_media_desc',
    group: 'film',
  },
  {
    slug: 'social-media-marketing',
    icon: Smartphone,
    glowColor: '#06b6d4',
    tags: ['Strategy', 'Content', 'Growth'],
    titleKey: 'service_social_title',
    descKey: 'service_social_desc',
    group: 'film',
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
