import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { TGallery } from '@/lib/type';
import Image from '@/components/common/Image';

type Props = { gallery: TGallery[]; className: string };

export default function Gallery({ gallery, className }: Props) {
  const total = gallery.length;
  const [index, setIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPrevDisabled, setPrevBDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const slideToPrev = () => {
    setIndex(index === 0 ? total - 1 : index - 1);
    onPrevButtonClick();
  };

  const slideToNext = () => {
    setIndex(index === total - 1 ? 0 : index + 1);
    onNextButtonClick();
  };

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div
      role='group'
      aria-label='highlights images carousel'
      aria-roledescription='carousel'
      className={clsx('relative aspect-video h-[300px] sm:h-auto', className)}
    >
      <div className='embla h-full w-full overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex h-full w-full flex-row'>
          {gallery.map(({ url, alt }, i) => (
            <div
              key={`highlighted-img-${i}`}
              className='embla__slide shrink-0 grow-0 basis-full'
            >
              <Image
                isSkeletonDark={true}
                className='h-full w-full object-cover'
                alt={alt || `gallery-image-${i}`}
                src={url}
                width={0}
                height={0}
                sizes='100vw'
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label='previous image'
        className='absolute left-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-sm bg-primary/60 bg-opacity-60 font-semibold shadow-icon md:h-7 md:w-7'
        onClick={slideToPrev}
        disabled={isPrevDisabled}
      >
        <ChevronLeftIcon className='h-3 w-3 stroke-white' strokeWidth={2} />
        <span className='sr-only'>Previous</span>
      </button>

      <button
        aria-label='next image'
        className='absolute right-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-sm bg-primary/60 bg-opacity-60 font-semibold shadow-icon md:h-7 md:w-7'
        onClick={slideToNext}
        disabled={isNextDisabled}
      >
        <ChevronRightIcon className='h-3 w-3 stroke-white' strokeWidth={2} />
        <span className='sr-only'>Next</span>
      </button>

      <div className='absolute right-2 top-2 flex h-8 w-10 items-center justify-center rounded-sm bg-primary/60 bg-opacity-60 text-xxs font-semibold text-white shadow-icon'>{`${index + 1}/${gallery.length}`}</div>
    </div>
  );
}
