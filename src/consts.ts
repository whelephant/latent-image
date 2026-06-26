// Site-wide constants. Single place to edit identity + nav.
export const SITE = {
  name: 'Latent Image',
  tagline: 'Photographs and writing.',
  description: 'Photographs and writing by Latent Image.',
  author: 'Latent Image',
  locale: 'en',
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: 'Photography', href: '/photography' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
];
