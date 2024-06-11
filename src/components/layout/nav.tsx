import Link from 'next/link';

import Logo from '../logo';
import { cn } from '@/lib/utils';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        'z-50 w-full border-b border-neutral-200/60 bg-white',
        className,
      )}
    >
      <div className='container flex h-16 flex-row items-center'>
        <Link href='/'>
          <Logo size={'sm'} />
        </Link>
      </div>
    </nav>
  );
}
