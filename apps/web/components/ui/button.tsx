import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition-all duration-200', {
  variants: {
    variant: {
      primary: 'bg-accent text-white hover:opacity-90',
      secondary: 'bg-surface border border-border text-text hover:border-white/20',
      ghost: 'text-text hover:bg-white/5',
    },
  },
  defaultVariants: { variant: 'primary' },
});

export function Button({ className, variant, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
