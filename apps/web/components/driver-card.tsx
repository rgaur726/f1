import Link from 'next/link';
import { Driver } from '@f1/types';
import { motion } from 'framer-motion';
import { Card } from './ui/card';

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Link href={`/drivers/${driver.slug}`}>
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="hover:border-white/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={driver.headshotUrl} alt={driver.name} className="mb-4 h-40 w-full rounded-xl object-cover" />
          <h3 className="text-xl font-bold">#{driver.number} {driver.name}</h3>
          <p className="text-sm text-muted">{driver.team.name} · {driver.countryCode}</p>
        </Card>
      </motion.div>
    </Link>
  );
}
