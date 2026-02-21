import Link from 'next/link';
import { Race } from '@f1/types';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Tag } from './ui/tag';
import { formatDateRange } from '@/lib/format';

export function RaceListItem({ race }: { race: Race }) {
  return (
    <Link href={`/races/${race.slug}`}>
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="mb-3 p-4 hover:border-white/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="mb-2"><Tag>Round {race.round}</Tag></div>
              <h3 className="text-xl font-bold">{race.name}</h3>
              <p className="text-sm text-muted">{race.circuitName} · {race.country}</p>
            </div>
            <p className="text-sm text-muted">{formatDateRange(race.startDate, race.endDate)}</p>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
