'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WifiOff } from 'lucide-react';
import { Tag } from './ui/tag';

const nav = [
  ['/', 'Home'],
  ['/calendar', 'Calendar'],
  ['/drivers', 'Drivers'],
  ['/personalized', 'Personalized'],
] as const;

export function PageShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const offline = typeof navigator !== 'undefined' ? !navigator.onLine : false;

  return (
    <div className="min-h-screen pb-12">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 py-4">
          <Link href="/" className="font-black tracking-wide">F1 PWA</Link>
          <nav className="flex items-center gap-1">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className={`rounded-xl px-3 py-1.5 text-sm transition duration-200 ${path === href ? 'bg-surface text-white' : 'text-muted hover:text-white'}`}>
                {label}
              </Link>
            ))}
            {offline && <Tag className="ml-2"><WifiOff className="mr-1 h-3 w-3"/>Offline</Tag>}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1100px] px-4 py-8">{children}</main>
    </div>
  );
}
