'use client';
import { useEffect, useState } from 'react';
import { Race } from '@f1/types';
import Link from 'next/link';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tag } from './ui/tag';
import { countdown, formatDateRange } from '@/lib/format';

export function RaceHeroCard({ race }: { race: Race }) {
  const [time, setTime] = useState(() => countdown(race.startDate));
  useEffect(() => {
    const id = setInterval(() => setTime(countdown(race.startDate)), 60_000);
    return () => clearInterval(id);
  }, [race.startDate]);

  return (
    <Card className="bg-gradient-to-br from-surface to-surface-2">
      <Tag className="mb-4">{time.past ? 'Last Grand Prix' : 'Next Grand Prix'}</Tag>
      <h2 className="text-3xl font-black">{race.name}</h2>
      <p className="mt-1 text-muted">Round {race.round} · {race.circuitName}</p>
      <p className="mt-2 text-sm text-muted">{formatDateRange(race.startDate, race.endDate)} · {race.country}</p>
      <div className="mt-5 text-lg font-semibold">{time.past ? 'Completed' : `${time.days}d ${time.hours}h ${time.minutes}m`}</div>
      <div className="mt-5 flex gap-3">
        <Link href="/calendar"><Button variant="secondary">Calendar</Button></Link>
        <Link href="/drivers"><Button variant="ghost">Drivers</Button></Link>
      </div>
    </Card>
  );
}
