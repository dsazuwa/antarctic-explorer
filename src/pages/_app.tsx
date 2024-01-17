import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";
import montserrat from "@/font";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Antarctica Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${montserrat.className}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
