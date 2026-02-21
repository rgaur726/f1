import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

export function EmptyState({ title, subtitle, action, onRetry }: { title: string; subtitle: string; action?: ReactNode; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <AlertTriangle className="mx-auto mb-3 text-muted" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
      {onRetry ? <Button className="mt-4" onClick={onRetry}>Retry</Button> : action}
    </div>
  );
}
