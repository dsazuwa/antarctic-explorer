import { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

export default function useCarousel(total: number) {
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

  return {
    index,
    isPrevDisabled,
    isNextDisabled,
    emblaRef,
    slideToPrev,
    slideToNext,
  };
}
