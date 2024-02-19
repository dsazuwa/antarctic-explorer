import { StarFilledIcon } from '@radix-ui/react-icons';

import { TGallery } from '@/lib/type';
import Gallery from './Gallery';

type Props = {
  description: string[];
  highlights: string[];
  gallery: TGallery[];
};

export default function Overview({ description, highlights, gallery }: Props) {
  return (
    <div className='w-full'>
      <div className='mx-auto flex max-w-screen-lg flex-col bg-white p-4 lg:px-2'>
        <h3 className='text-xl font-bold text-navy'>Overview</h3>

        <div className='mt-4 flex flex-col lg:flex-row'>
          <div className='flex flex-col lg:w-[calc(100%-400px)] lg:flex-col-reverse'>
            <div className='space-y-3'>
              {description.map((x, i) => (
                <div key={`description-${i}`} className='text-sm font-medium'>
                  {x}
                </div>
              ))}
            </div>

            <Gallery gallery={gallery} className='mt-4 lg:mb-4 lg:mt-0' />
          </div>

          <div className='mt-4 w-full space-y-4 lg:mt-0 lg:w-[400px] lg:px-4 lg:pr-0'>
            <h3 className='text-lg font-bold text-navy'>Highlights</h3>

            <ul className='flex flex-col space-y-3'>
              {highlights.map((x, i) => (
                <li key={`highlight-${i}`} className='flex w-full flex-row'>
                  <StarFilledIcon className='mr-1 h-5 w-4 p-1 text-primary' />

                  <div className='w-full text-sm font-medium'>{x}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
