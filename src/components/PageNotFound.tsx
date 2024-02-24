import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Props = {
  href: string;
  buttonLabel: string;
};

export default function PageNotFound({ href, buttonLabel }: Props) {
  return (
    <div className='mt-[50px] w-full px-4'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-2 text-center'>
        <div className='text-6xl font-bold text-navy sm:text-7xl md:text-8xl lg:text-9xl'>
          404
        </div>

        <div className='text-xl font-semibold'>Page Not Found.</div>

        <div className='text-sm'>
          Sorry we can&apos;t find the page you&apos;re looking for.
        </div>

        <Link href={href}>
          <Button className='bg-navy capitalize hover:bg-navy/90'>
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
