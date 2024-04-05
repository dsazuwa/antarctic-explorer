import { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

import '@/styles/globals.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP>;

export type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...props }: AppProps) {
  return <Component {...props} />;
}
