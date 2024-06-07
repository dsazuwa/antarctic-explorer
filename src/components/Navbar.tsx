import Link from 'next/link';

import Logo from './Logo';
import { cn } from '@/lib/utils';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn('w-full bg-primary-foreground', className)}>
      <div className='container flex h-16 flex-row items-center'>
        <Link href='/'>
          <Logo size={'sm'} />
        </Link>
      </div>
    </nav>
    //  <nav
    //     className={cn(
    //       'container mx-auto flex flex-row w-full h-16 items-center bg-primary-foreground',
    //       className,
    //     )}
    //   >
    //     <Link href='/'>
    //       <Logo size={'sm'} />
    //     </Link>
    //   </nav>
  );
}
