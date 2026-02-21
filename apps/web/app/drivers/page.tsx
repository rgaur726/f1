'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DriverCard } from '@/components/driver-card';
import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { api } from '@/lib/api';

export default function DriversPage() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['drivers'], queryFn: api.drivers });
  if (isLoading) return <div className="grid gap-4 md:grid-cols-3">{[1,2,3,4,5,6].map((i)=><Skeleton key={i} className="h-64" />)}</div>;
  if (isError || !data) return <EmptyState title="Drivers unavailable" subtitle="Could not fetch drivers." onRetry={() => refetch()} />;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title="Drivers" subtitle="The 2026 grid, team by team." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.drivers.map((driver) => <DriverCard key={driver.id} driver={driver} />)}
      </div>
    </motion.div>
  );
}
