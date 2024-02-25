import { StarFilledIcon } from '@radix-ui/react-icons';

import { TGallery } from '@/lib/type';
import Gallery from './Gallery';
import H3Heading from './H3Heading';

type Props = {
  description: string[];
  highlights: string[];
  gallery: TGallery[];
};

export default function Overview({ description, highlights, gallery }: Props) {
  return (
    <section className='w-full' aria-label='Expedition Overview'>
      <div className='mx-auto flex max-w-screen-lg flex-col bg-white p-4'>
        <H3Heading text='Overview' />

        <div className='flex flex-col lg:flex-row'>
          <div className='flex flex-col lg:w-[calc(100%-400px)] lg:flex-col-reverse'>
            <div className='space-y-3'>
              {description.map((x, i) => (
                <p key={`desc-${i}`} className='text-sm'>
                  {x}
                </p>
              ))}
            </div>

            <Gallery gallery={gallery} className='mt-4 lg:mb-4 lg:mt-0' />
          </div>

          <div className='mt-4 w-full space-y-4 lg:mt-0 lg:w-[400px] lg:px-4 lg:pr-0'>
            <h3 className='font-bold text-navy md:text-lg'>Highlights</h3>

            <ul className='flex flex-col space-y-3'>
              {highlights.map((x, i) => (
                <li key={`highlight-${i}`} className='flex w-full flex-row'>
                  <StarFilledIcon className='mr-1 h-5 w-4 p-1 text-primary' />

                  <div className='w-full text-sm'>{x}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
