'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/page-header';
import { RaceHeroCard } from '@/components/race-hero-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

export default function HomePage() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['races'], queryFn: api.races });
  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-white/5" />;
  if (isError || !data) return <EmptyState title="Unable to load races" subtitle="Please try again." onRetry={() => refetch()} />;

  const now = Date.now();
  const sorted = [...data.races].sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const upcoming = sorted.find((r) => +new Date(r.startDate) >= now) ?? sorted[sorted.length - 1];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title="2026 Formula 1" subtitle="Track every race weekend and driver in one premium PWA." />
      <RaceHeroCard race={upcoming} />
      <Card className="mt-6">
        <p className="text-sm text-muted">Personalized Mode — Coming Soon</p>
        <h3 className="mt-1 text-2xl font-black">Your season, through your driver.</h3>
        <p className="mt-2 text-sm text-muted">Follow your favorite driver with tailored race timelines and reminders.</p>
        <Link href="/personalized" className="mt-4 inline-block"><Button>See teaser</Button></Link>
      </Card>
    </motion.div>
  );
}
