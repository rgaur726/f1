import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted', className)} {...props} />;
}
