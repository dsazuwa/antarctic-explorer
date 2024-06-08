import { StarFilledIcon } from '@radix-ui/react-icons';

type Props = {
  description: string[];
  highlights: string[];
};

export default function Overview({ description, highlights }: Props) {
  return (
    <section className='w-full' aria-label='Expedition Overview'>
      <div className='mx-auto flex max-w-screen-lg flex-col gap-4 px-4 py-8 md:py-12 lg:flex-row'>
        <div className='flex flex-col gap-2 lg:w-7/12'>
          <h2 className='heading-3 font-bold text-sky-900'>Overview</h2>

          <div className='space-y-4'>
            {description.map((x, i) => (
              <p key={`desc-${i}`} className='body'>
                {x}
              </p>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2 lg:w-5/12'>
          <h3 className='heading-4 font-bold text-navy'>Highlights</h3>

          <ul className='flex flex-col gap-3'>
            {highlights.map((x, i) => (
              <li
                key={`highlight-${i}`}
                className='body inline-flex w-full whitespace-break-spaces break-words'
              >
                <StarFilledIcon className='mr-2 h-5 w-4 flex-shrink-0 p-1 text-primary' />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
