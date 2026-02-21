import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'F1 PWA',
    short_name: 'F1',
    description: '2026 Formula 1 calendar and drivers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0e11',
    theme_color: '#0b0e11',
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      {
        src: '/icons/icon-maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
