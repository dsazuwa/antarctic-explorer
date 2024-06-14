import { ArrowRightIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const variants = cva(
  'body-sm group inline-flex items-center text-center gap-2 rounded-sm py-2 font-extrabold transition-colors',
  {
    variants: {
      variant: {
        primary:
          'border border-sky-800/50 text-sky-800 hover:border-sky-800 focus:bg-sky-800 focus:text-white hover:shadow-md px-4',
        secondary:
          'border border-amber-400 bg-amber-400 text-gray-700 hover:bg-white hover:shadow-md px-4',
        white: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    variant: {
      primary: 'fill-sky-800 group-focus:fill-white',
      secondary: 'fill-gray-700',
      white: undefined,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type Props = {
  className?: string;
  website: string;
  label: string;
  'aria-label'?: string;
} & VariantProps<typeof variants>;

export default function LinkButton({
  className,
  variant,
  website,
  label,
  ...props
}: Props) {
  return (
    <a
      href={website}
      target='_blank'
      rel='noopener noreferrer'
      {...props}
      className={cn(variants({ variant, className }))}
    >
      <span>{label}</span>

      <span className='transition-transform group-hover:rotate-[-35deg]'>
        <ArrowRightIcon
          className={cn(iconVariants({ variant }))}
          strokeWidth={1.2}
        />
      </span>
    </a>
  );
}
