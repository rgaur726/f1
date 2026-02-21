'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { RaceListItem } from '@/components/race-list-item';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { api } from '@/lib/api';
import { monthHeader } from '@/lib/format';

export default function CalendarPage() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['races'], queryFn: api.races });

  if (isLoading) return <div className="space-y-3">{[1,2,3].map((i) => <Skeleton key={i} className="h-24" />)}</div>;
  if (isError || !data) return <EmptyState title="Calendar unavailable" subtitle="Could not fetch race weekends." onRetry={() => refetch()} />;

  const groups = data.races.reduce<Record<string, typeof data.races>>((acc, race) => {
    const key = monthHeader(race.startDate);
    acc[key] = [...(acc[key] ?? []), race];
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title="2026 Calendar" subtitle="All Formula 1 weekends grouped by month." />
      {Object.entries(groups).map(([month, races]) => (
        <section key={month} className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-muted">{month}</h2>
          {races.map((race) => <RaceListItem key={race.id} race={race} />)}
        </section>
      ))}
    </motion.div>
  );
}
