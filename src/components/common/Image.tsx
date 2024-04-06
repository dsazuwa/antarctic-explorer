import NextImage, { ImageProps } from 'next/image';

import LazyLoadImage from './LazyImage';

type Props = ImageProps & { isSkeletonDark?: boolean };

export default function Image({ isSkeletonDark, ...props }: Props) {
  return props.priority ? (
    <NextImage {...props} />
  ) : (
    <LazyLoadImage isSkeletonDark={isSkeletonDark} {...props} />
  );
}
