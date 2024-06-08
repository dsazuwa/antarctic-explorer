import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type Props = ImageProps & { isSkeletonDark?: boolean };

export default function Image({ isSkeletonDark, ...props }: Props) {
  return props.priority ? (
    <NextImage {...props} />
  ) : (
    <LazyLoadImage isSkeletonDark={isSkeletonDark} {...props} />
  );
}

export function LazyLoadImage({ isSkeletonDark, className, ...props }: Props) {
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
