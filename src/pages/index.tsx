import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

import Layout from '@/Layout';
import {
  Expeditions,
  FilterChips,
  MobileFilterPanel,
  PaginationControls,
  PaginationHeader,
  SideFilterPanel,
} from '@/components/features/expeditions';
import { getExpeditionsParams } from '@/lib/param.utils';
import { ExpeditionsParams, ExpeditionsResponse } from '@/lib/type';
import { setExpeditions } from '@/store';

type Props = {
  pageProps: { expeditions: ExpeditionsResponse };
};

export default function ExpeditionsPage({ pageProps: { expeditions } }: Props) {
  const dispatch = useDispatch();
  dispatch(setExpeditions(expeditions));

  return (
    <Layout>
      <Head>
        <title>Antarctica Explorer</title>
        <meta
          name='description'
          content='Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='mx-auto flex h-full w-full max-w-screen-lg flex-grow flex-col bg-white'>
        <div className='flex h-10 items-center justify-center text-base font-bold text-navy sm:mb-1 sm:text-lg md:text-xl'>
          Expeditions
        </div>

        <div className='grid flex-grow grid-cols-3 gap-4 lg:px-2'>
          <SideFilterPanel />

          <div
            id='main-panel'
            className='col-span-4 flex h-full w-full flex-col gap-1 px-4 lg:col-span-2 lg:px-0'
          >
            <MobileFilterPanel />

            <FilterChips />

            <PaginationHeader />

            <Expeditions expeditions={expeditions.data} />

            <PaginationControls />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/expeditions`);
  const params = getExpeditionsParams(context.query);

  Object.keys(params).forEach((key) => {
    const paramKey = key as keyof ExpeditionsParams;
    url.searchParams.append(paramKey, String(params[paramKey]));
  });

  const res = await fetch(url.toString());

  const expeditions: ExpeditionsResponse = await res.json();

  return { props: { expeditions } };
};
