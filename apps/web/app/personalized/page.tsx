'use client';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { Button } from '@/components/ui/button';

export default function PersonalizedPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <PageHeader title="Personalized Mode" subtitle="Your season, through your driver." />
      <Card className="space-y-4 p-8">
        <Tag className="w-fit border-accent/50 text-white">Launching soon</Tag>
        <h2 className="text-4xl font-black">Personalized Mode</h2>
        <p className="text-muted">A premium tailored experience with your favorite driver, context-rich weekends, and custom reminders.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <p className="text-xs uppercase text-muted">Favorite Driver</p>
            <p className="text-2xl font-black">Lando Norris</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase text-muted">Next GP for your driver</p>
            <p className="text-2xl font-black">Monaco Grand Prix</p>
          </Card>
        </div>
        <Button>Notify me</Button>
      </Card>
    </motion.div>
  );
}
