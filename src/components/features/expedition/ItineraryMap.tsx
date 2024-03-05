import { ImageIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

type Props = {
  url: string;
  alt: string;
};

export default function Map({ alt, url }: Props) {
  const hasMap = url !== null;

  return (
    <div
      className={clsx(
        'aspect-[5/6] md:col-span-2 md:mt-[-180px] md:max-h-[580px]',
        {
          'flex items-center justify-center rounded-sm bg-[#F2F7FC]': !hasMap,
        },
      )}
    >
      {hasMap ? (
        <img src={url} alt={alt} className='h-full w-full object-cover' />
      ) : (
        <ImageIcon
          className='h-48 w-48 text-primary/20'
          aria-label='Map image unavailable'
        />
      )}
    </div>
  );
}
