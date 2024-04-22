import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '@/Layout';
import Expeditions from '@/components/features/expeditions';
import { getExpeditionsParams } from '@/lib/param.utils';
import { ExpeditionsParams, ExpeditionsResponse } from '@/lib/type';
import { useExpeditionsStore } from '@/store';
import { parse } from 'querystring';

type Props = {
  pageProps: { expeditions: ExpeditionsResponse };
};

export default function ExpeditionsPage({ pageProps: { expeditions } }: Props) {
  const setExpeditions = useExpeditionsStore((state) => state.setExpeditions);
  const setIsLoading = useExpeditionsStore((state) => state.setIsLoading);

  const router = useRouter();

  useEffect(() => {
    setExpeditions(expeditions);
  }, []);

  useEffect(() => {
    const handleRouteChange = (route: string) => {
      setIsLoading(true);

      const parsedRoute = parse(route.split('?')[1]);

      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/expeditions`);
      const params = getExpeditionsParams(parsedRoute);

      Object.keys(params).forEach((key) => {
        const paramKey = key as keyof ExpeditionsParams;
        url.searchParams.append(paramKey, String(params[paramKey]));
      });

      fetch(url.toString())
        .then((res) => res.json())
        .then((data) => {
          window.scroll({ top: 0, behavior: 'smooth' });
          setExpeditions(data);
        });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>Antarctic Explorer</title>
        <meta
          name='description'
          content='Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Expeditions />
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
