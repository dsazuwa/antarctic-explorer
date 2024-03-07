import clsx from 'clsx';

import LinkButton from '@/components/common/LinkButton';
import { TExtension } from '@/lib/type';
import { formatPrice } from '@/lib/utils';

type Props = { extension: TExtension };

export default function Extension({ extension }: Props) {
  const { name, startingPrice, duration, photoUrl, website } = extension;

  return (
    <div className='group relative h-full rounded-xl bg-white hover:shadow-lg'>
      <img
        className='h-[270px] w-full rounded-t-xl object-cover'
        src={photoUrl}
        alt={name}
      />

      <div className='flex h-[calc(100%-270px)] flex-col rounded-b-xl border'>
        <div className='flex flex-row justify-between gap-4 p-4'>
          <h3 className='line-clamp-2text-sm/[1rem] font-bold text-primary group-hover:underline'>
            {name}
          </h3>

          {duration && (
            <p className='whitespace-nowrap text-xs font-semibold text-gray-400'>
              {duration} days
            </p>
          )}
        </div>

        <div className='mx-4 mb-6 mt-auto flex justify-between gap-4 border-t-2 border-solid border-gray-200 pt-4'>
          {startingPrice && (
            <div className='text-sm'>
              <p className='font-bold'>From</p>

              <p>
                <span className='mr-1 font-extrabold'>
                  {formatPrice(startingPrice)}
                </span>
                <span className='text-xs font-semibold text-gray-400'>
                  / per person
                </span>
              </p>
            </div>
          )}

          {website && (
            <LinkButton
              label='Explore'
              website={website}
              variant='white'
              className={clsx(
                'text-primary after:absolute after:bottom-[-3px] after:left-[-3px] after:right-[-3px] after:top-[-3px] after:block after:rounded-xl',
                {
                  'ml-auto': startingPrice === null,
                },
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
