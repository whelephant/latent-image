// Site-wide constants. Single place to edit identity + nav.
export const SITE = {
  name: 'Latent Image',
  // The wordmark plays on light; the tagline is the one-sentence thesis.
  tagline: 'Writing and photographs, developed slowly.',
  description:
    'A personal home for long-form essays and photographic series — writing-forward, image-forward, quietly crafted.',
  author: 'Latent Image',
  locale: 'en',
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: 'Writing', href: '/writing' },
  { label: 'Photography', href: '/photography' },
  { label: 'About', href: '/about' },
];
