import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

type Props = {
  statusCode: number;
  title: string;
  text: string;
};

export default function Error({ statusCode, title, text }: Props) {
  return (
    <div className='mt-[15%] w-full px-4'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col items-center gap-2 text-center'>
        <div className='heading-2 font-bold text-navy'>{statusCode}</div>

        <div className='heading-1 font-bold text-gray-600'>{title}</div>

        <div className='body-sm md:body text-gray-600'>{text}</div>

        <Link className={cn(buttonVariants(), 'mt-2')} href='/'>
          Back Home
        </Link>
      </div>
    </div>
  );
}
