import type { LucideIcon } from 'lucide-react';
import { Globe, Mic, Video, Camera, Smartphone } from 'lucide-react';

export interface ServiceMeta {
  slug: string;
  icon: LucideIcon;
  glowColor: string;
  tags: string[];
  /** i18n key for the short nav/breadcrumb label (see i18n.ts service_*_title keys). */
  titleKey: string;
}

/**
 * Single source of truth for the 5 dedicated service landing pages.
 * Order here drives both the homepage grid and the nav "Leistungen" list.
 * Long-form copy for each slug lives in src/data/serviceContent.ts.
 */
export const services: ServiceMeta[] = [
  {
    slug: 'web-saas-development',
    icon: Globe,
    glowColor: '#38bdf8',
    tags: ['Websites', 'SaaS', 'Automation'],
    titleKey: 'service_web_title',
  },
  {
    slug: 'ai-voice-agents',
    icon: Mic,
    glowColor: '#8b5cf6',
    tags: ['AI Voice', 'Chatbots', 'Automation'],
    titleKey: 'service_ai_title',
  },
  {
    slug: 'video-drone-production',
    icon: Video,
    glowColor: '#f59e0b',
    tags: ['Drone', 'Cinematic', 'Color Grading'],
    titleKey: 'service_media_title',
  },
  {
    slug: 'wedding-event-films',
    icon: Camera,
    glowColor: '#f43f5e',
    tags: ['Weddings', 'Events', 'Cinematic'],
    titleKey: 'service_event_title',
  },
  {
    slug: 'social-media-marketing',
    icon: Smartphone,
    glowColor: '#06b6d4',
    tags: ['Strategy', 'Content', 'Growth'],
    titleKey: 'service_social_title',
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
