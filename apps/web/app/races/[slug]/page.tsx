'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { api } from '@/lib/api';
import { apiBaseUrl } from '@/lib/config';
import { formatDateRange } from '@/lib/format';

export default function RaceDetailPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['race', params.slug], queryFn: () => api.race(params.slug) });
  if (isLoading) return <div className="h-56 animate-pulse rounded-2xl bg-white/5" />;
  if (isError || !data) return <EmptyState title="Race not found" subtitle="Please retry." onRetry={() => refetch()} />;

  const { race } = data;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title={race.name} subtitle={`Round ${race.round} · ${race.country}`} />
      <Card>
        <p className="text-sm text-muted">Circuit</p>
        <h3 className="text-2xl font-black">{race.circuitName}</h3>
        <p className="mt-3 text-sm text-muted">{formatDateRange(race.startDate, race.endDate)} · {race.timezone}</p>
        <a href={`${apiBaseUrl}/api/v1/ics/races/${race.slug}`} className="mt-5 inline-block"><Button>Add to calendar</Button></a>
      </Card>
    </motion.div>
  );
}
