'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

type Props = {
  statusCode: number;
  title: string;
  text: string;
};

export default function Error({ statusCode, title, text }: Props) {
  const router = useRouter();

  const backToHome = () => {
    router.push('/');
    router.refresh();
  };

  return (
    <div className='mt-[15%] w-full px-4'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col items-center gap-2 text-center'>
        <div className='heading-2 font-bold'>{statusCode}</div>

        <div className='heading-1 font-bold'>{title}</div>

        <div className='text-sm md:text-base lg:text-lg'>{text}</div>

        <Button className='mt-2' onClick={backToHome}>
          Back Home
        </Button>
      </div>
    </div>
  );
}
