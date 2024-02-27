import { StarFilledIcon } from '@radix-ui/react-icons';

import H3Heading from './H3Heading';

type Props = {
  description: string[];
  highlights: string[];
};

export default function Overview({ description, highlights }: Props) {
  return (
    <section
      className='w-full bg-primary-foreground'
      aria-label='Expedition Overview'
    >
      <div className='mx-auto flex max-w-screen-lg flex-col space-y-8 p-4 py-8 lg:flex-row lg:space-x-8 lg:space-y-0'>
        <div className='flex flex-col lg:w-7/12'>
          <H3Heading text='Overview' />

          <div className='space-y-4'>
            {description.map((x, i) => (
              <p key={`desc-${i}`} className='text-sm'>
                {x}
              </p>
            ))}
          </div>
        </div>

        <div className='lg:w-5/12'>
          <h4 className='mb-4 font-bold text-navy md:text-lg'>Highlights</h4>

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
    </section>
  );
}
