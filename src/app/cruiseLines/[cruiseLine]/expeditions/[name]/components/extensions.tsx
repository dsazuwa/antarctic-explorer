'use client';

import { ArrowDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';

import LinkButton from '@/components/link-btn';
import { TExtension } from '@/lib/type';
import { cn, formatPrice } from '@/lib/utils';

type Props = { extensions: TExtension[] };

export default function Extensions({ extensions }: Props) {
  const [showAll, setShowAll] = useState(false);
  const renderedData = showAll ? extensions : extensions.slice(0, 3);

  return (
    <section aria-label='Expedition Extensions'>
      <div className='container flex max-w-screen-lg flex-col gap-6 py-8 md:py-12'>
        <h2 className='heading-3 font-bold text-sky-900'>
          Expedition Extensions
        </h2>

        <ul className='mt-auto flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3'>
          {renderedData.map((extension, i) => (
            <Extension key={`extension-${i}`} extension={extension} />
          ))}
        </ul>

        {!showAll && extensions.length > 3 && (
          <div className='flex justify-center'>
            <button
              className='body-sm ms:body group inline-flex items-center justify-center gap-2 rounded-sm border border-sky-800/50 fill-sky-800 px-4 py-2 text-center font-extrabold text-sky-800 transition-colors hover:border-sky-800 hover:shadow-md focus:bg-sky-800 focus:fill-white focus:text-white'
              onClick={() => setShowAll(true)}
            >
              Show All Extensions
              <ArrowDownIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Extension({ extension }: { extension: TExtension }) {
  const { name, startingPrice, duration, photoUrl, website } = extension;

  return (
    <li className='group relative h-full rounded-sm bg-white hover:shadow-sm'>
      <Image
        className='h-[270px] w-full rounded-t-sm object-cover'
        src={photoUrl}
        alt={name}
        width={0}
        height={0}
        sizes='100vw'
      />

      <div className='flex h-[calc(100%-270px)] flex-col rounded-b-sm border-x border-b'>
        <div className='inline-flex justify-between gap-4 p-6'>
          <h3 className='heading-6 font-bold text-primary group-hover:underline'>
            {name}
          </h3>

          {duration && (
            <p className='whitespace-nowrap text-xs font-semibold'>
              {duration} days
            </p>
          )}
        </div>

        <div className='mx-6 mb-6 mt-auto inline-flex flex-wrap justify-between gap-4 border-t-2 border-solid border-gray-200 pt-6'>
          {startingPrice && (
            <div className='body-sm'>
              <p className='font-bold'>From</p>

              <p>
                <span className='mr-1 font-extrabold'>
                  {formatPrice(startingPrice)}
                </span>
                <span className='text-xs'>/ per person</span>
              </p>
            </div>
          )}

          {website && (
            <LinkButton
              label='Explore'
              website={website}
              variant='white'
              className={cn(
                'text-primary after:absolute after:bottom-[-3px] after:left-[-3px] after:right-[-3px] after:top-[-3px] after:block after:rounded-xl',
                {
                  'ml-auto': startingPrice === null,
                },
              )}
            />
          )}
        </div>
      </div>
    </li>
  );
}
