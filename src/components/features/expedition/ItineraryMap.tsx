import { ImageIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Image from 'next/image';

type Props = { url: string; alt: string };

export default function Map({ alt, url }: Props) {
  const hasMap = url !== null;

  return (
    <div
      className={clsx(
        'aspect-[5/6] md:col-span-2 md:mt-[-35%] md:max-h-[580px]',
        {
          'flex items-center justify-center rounded-sm bg-muted/80': !hasMap,
        },
      )}
    >
      {hasMap ? (
        <Image
          className='h-full w-full object-cover'
          src={url}
          alt={alt}
          width={0}
          height={0}
          sizes='100vw'
        />
      ) : (
        <ImageIcon
          className='h-48 w-48 text-primary/20'
          aria-label='Map image unavailable'
        />
      )}
    </div>
  );
}
