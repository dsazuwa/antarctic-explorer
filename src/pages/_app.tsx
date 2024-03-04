import { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import '@/styles/globals.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP>;

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Provider store={store}>{<Component {...props} />}</Provider>
    </>
  );
}
