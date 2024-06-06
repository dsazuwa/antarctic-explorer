import { ImageIcon } from '@radix-ui/react-icons';

import Image from '@/components/Image';
import { cn } from '@/lib/utils';

type Props = { url: string; alt: string };

export default function Map({ alt, url }: Props) {
  const hasMap = url !== null;

  return (
    <div
      className={cn(
        'aspect-[5/6] md:col-span-2 md:mt-[-35%] md:max-h-[580px]',
        { 'flex items-center justify-center rounded-sm bg-muted/80': !hasMap },
      )}
    >
      {hasMap ? (
        <Image className='object-cover' src={url} alt={alt} />
      ) : (
        <ImageIcon
          className='h-48 w-48 text-primary/20'
          aria-label='Map image unavailable'
        />
      )}
    </div>
  );
}
