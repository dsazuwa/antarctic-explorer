import Link from 'next/link';

import { Button } from './ui/button';

type Props = {
  statusCode: number;
  title: string;
  text: string;
};

export default function Error({ statusCode, title, text }: Props) {
  return (
    <div className='mt-[15vh] w-full px-4'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-2 text-center'>
        <div className='text-6xl font-bold text-navy sm:text-7xl md:text-8xl lg:text-9xl'>
          {statusCode}
        </div>

        <div className='text-xl font-bold text-gray-600'>{title}</div>

        <div className='text-sm text-gray-600 md:text-base/[1rem]'>{text}</div>

        <Link href='/'>
          <Button className='bg-navy uppercase hover:bg-navy/90'>
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
