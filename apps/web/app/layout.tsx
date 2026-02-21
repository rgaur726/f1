import './globals.css';
import Providers from './providers';
import { PageShell } from '@/components/page-shell';

export const metadata = {
  title: 'F1 PWA',
  description: '2026 Formula 1 Calendar and Drivers',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <PageShell>{children}</PageShell>
        </Providers>
      </body>
    </html>
  );
}
