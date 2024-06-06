import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

type Props = ImageProps & { isSkeletonDark?: boolean };

export default function LazyLoadImage({
  isSkeletonDark,
  className,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Skeleton
          className={cn('h-full w-full', { 'bg-slate-50/10': isSkeletonDark })}
        />
      )}

      <NextImage
        {...props}
        className={cn(className, {
          'h-full w-full': loaded,
          'h-0 w-auto': !loaded,
        })}
        width={0}
        height={0}
        sizes='100vw'
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
