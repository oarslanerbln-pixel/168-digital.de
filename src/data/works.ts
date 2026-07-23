export interface WorkProject {
  id: string;
  url: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  color: string;
}

export const projects: WorkProject[] = [
  {
    id: 'donerbros',
    url: 'https://www.donerbros.berlin/',
    titleKey: 'works_donerbros_title',
    descKey: 'works_donerbros_desc',
    tags: ['Next.js', 'Firebase', 'UX/UI'],
    color: '#00ff87',
  },
  {
    id: 'sera',
    url: 'https://sera-event-6f2a1.web.app/',
    titleKey: 'works_sera_title',
    descKey: 'works_sera_desc',
    tags: ['React', '3D', 'Event-Tech'],
    color: '#8b5cf6',
  },
  {
    id: 'impulse',
    url: 'https://impulseproductionstudio.vercel.app/',
    titleKey: 'works_impulse_title',
    descKey: 'works_impulse_desc',
    tags: ['Vercel', 'Video', 'Branding'],
    color: '#f59e0b',
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);
