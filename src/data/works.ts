export interface WorkProject {
  id: string;
  url: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  color: string;
  /** Omitted while a project has no live-site capture yet. */
  image?: string;
  /** 1440px variant for high-density screens (srcset); only where the
   *  source capture is wide enough to be genuinely sharper. */
  imageHi?: string;
  /** Marks work that is published but not finished, labelled as such on the card. */
  beta?: boolean;
}

export const projects: WorkProject[] = [
  // Newest finished work first: both are local Berlin businesses, the
  // same kind of client the homepage is written for.
  {
    id: 'nuraluxe',
    url: 'https://nuraluxebeauty.de/',
    titleKey: 'works_nuraluxe_title',
    descKey: 'works_nuraluxe_desc',
    tags: ['Local SEO', 'Online Booking', 'UI/UX'],
    color: '#b8763c',
    image: '/works/nuraluxe.webp',
    imageHi: '/works/nuraluxe-1440.webp',
  },
  {
    id: 'masterkfz',
    url: 'https://masterteam.berlin/',
    titleKey: 'works_masterkfz_title',
    descKey: 'works_masterkfz_desc',
    tags: ['Static HTML', 'DE · TR · EN', 'Local SEO'],
    color: '#e3121b',
    image: '/works/masterkfz.webp',
    imageHi: '/works/masterkfz-1440.webp',
  },
  {
    id: 'taka',
    url: 'https://taka-fishhouse.de/',
    titleKey: 'works_taka_title',
    descKey: 'works_taka_desc',
    tags: ['HTML/CSS/JS', 'QR Menu', 'UI/UX'],
    color: '#0ea5e9',
    image: '/works/taka.webp',
    imageHi: '/works/taka-1440.webp',
  },
  {
    id: 'sera',
    url: 'https://sera-event-6f2a1.web.app/',
    titleKey: 'works_sera_title',
    descKey: 'works_sera_desc',
    tags: ['React', 'Automation', 'Event-Tech'],
    color: '#8b5cf6',
    image: '/works/sera.webp',
    imageHi: '/works/sera-1440.webp',
  },
  {
    id: 'boxx36',
    url: 'https://box-x36.de/',
    titleKey: 'works_boxx36_title',
    descKey: 'works_boxx36_desc',
    tags: ['3D WebGL', 'React Three Fiber', 'E-Commerce'],
    color: '#ef4444',
    image: '/works/boxx36.webp',
    imageHi: '/works/boxx36-1440.webp',
  },
  {
    id: 'donerbros',
    url: 'https://www.donerbros.berlin/',
    titleKey: 'works_donerbros_title',
    descKey: 'works_donerbros_desc',
    tags: ['Next.js', 'Firebase', 'UX/UI'],
    color: '#00ff87',
    image: '/works/donerbros.webp',
  },
  {
    id: 'impulse',
    url: 'https://impulseproductionstudio.vercel.app/',
    titleKey: 'works_impulse_title',
    descKey: 'works_impulse_desc',
    tags: ['Vercel', 'Video', 'Branding'],
    color: '#f59e0b',
    image: '/works/impulse.webp',
    imageHi: '/works/impulse-1440.webp',
  },
  {
    id: 'medisade',
    url: 'https://medisade.de/',
    titleKey: 'works_medisade_title',
    descKey: 'works_medisade_desc',
    tags: ['Next.js', 'Supabase', 'OCR'],
    color: '#14b8a6',
    beta: true,
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);
