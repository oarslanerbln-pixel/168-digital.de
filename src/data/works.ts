export interface WorkProject {
  id: string;
  url: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  color: string;
  /** Omitted while a project has no live-site capture yet. */
  image?: string;
  /** Marks work that is published but not finished, labelled as such on the card. */
  beta?: boolean;
}

export const projects: WorkProject[] = [
  {
    id: 'taka',
    url: 'https://taka-fishhouse.de/',
    titleKey: 'works_taka_title',
    descKey: 'works_taka_desc',
    tags: ['HTML/CSS/JS', 'QR Menu', 'UI/UX'],
    color: '#0ea5e9',
    image: '/works/taka.webp',
  },
  {
    id: 'sera',
    url: 'https://sera-event-6f2a1.web.app/',
    titleKey: 'works_sera_title',
    descKey: 'works_sera_desc',
    tags: ['React', 'Automation', 'Event-Tech'],
    color: '#8b5cf6',
    image: '/works/sera.webp',
  },
  {
    id: 'boxx36',
    url: 'https://box-x36.de/',
    titleKey: 'works_boxx36_title',
    descKey: 'works_boxx36_desc',
    tags: ['3D WebGL', 'React Three Fiber', 'E-Commerce'],
    color: '#ef4444',
    image: '/works/boxx36.webp',
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
