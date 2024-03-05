import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { HTMLProps } from 'react';

import useCarousel from '@/hooks/useCarousel';
import { TGallery } from '@/lib/type';

type Props = {
  gallery: TGallery[];
} & HTMLProps<HTMLDivElement>;

export default function Gallery({ gallery, className }: Props) {
  const {
    index,
    isPrevDisabled,
    isNextDisabled,
    emblaRef,
    slideToPrev,
    slideToNext,
  } = useCarousel(gallery.length);

  return (
    <div
      role='group'
      aria-label='highlights images carousel'
      aria-roledescription='carousel'
      className={clsx('relative aspect-video', className)}
    >
      <div className='embla h-full w-full overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex h-full w-full flex-row'>
          {gallery.map(({ url, alt }, i) => (
            <div
              key={`highlighted-img-${i}`}
              className='embla__slide shrink-0 grow-0 basis-full'
            >
              <img alt={alt} src={url} className='h-full w-full object-cover' />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label='previous image'
        className='absolute left-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-[4px] bg-primary/60 bg-opacity-60 font-semibold shadow-icon md:h-7 md:w-7'
        onClick={slideToPrev}
        disabled={isPrevDisabled}
      >
        <ChevronLeftIcon className='h-3 w-3 stroke-white' strokeWidth={2} />
        <span className='sr-only'>Previous</span>
      </button>

      <button
        aria-label='next image'
        className='absolute right-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-[4px] bg-primary/60 bg-opacity-60 font-semibold shadow-icon md:h-7 md:w-7'
        onClick={slideToNext}
        disabled={isNextDisabled}
      >
        <ChevronRightIcon className='h-3 w-3 stroke-white' strokeWidth={2} />
        <span className='sr-only'>Next</span>
      </button>

      <div className='absolute right-2 top-2 flex h-8 w-10 items-center justify-center rounded-[4px] bg-primary/60 bg-opacity-60 text-xxs font-semibold text-white shadow-icon'>{`${index + 1}/${gallery.length}`}</div>
    </div>
  );
}
