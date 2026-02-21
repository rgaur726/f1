'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { api } from '@/lib/api';

export default function DriverDetailPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['driver', params.slug], queryFn: () => api.driver(params.slug) });
  if (isLoading) return <div className="h-56 animate-pulse rounded-2xl bg-white/5" />;
  if (isError || !data) return <EmptyState title="Driver unavailable" subtitle="Could not fetch driver profile." onRetry={() => refetch()} />;
  const { driver } = data;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title={driver.name} subtitle={`#${driver.number} · ${driver.team.name} · ${driver.countryCode}`} />
      <Card className="grid gap-6 md:grid-cols-[280px_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={driver.headshotUrl} alt={driver.name} className="h-72 w-full rounded-2xl object-cover" />
        <div>
          <h2 className="text-2xl font-black">Driver Profile</h2>
          <p className="mt-3 text-muted">{driver.shortBio}</p>
        </div>
      </Card>
    </motion.div>
  );
}
