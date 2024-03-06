import Head from 'next/head';

import Error from '@/components/Error';

export default function InternalServerPage() {
  return (
    <div>
      <Head>
        <title>Internal Server Error</title>
        <meta name='description' content='Something went wrong.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Error
        statusCode={500}
        title='Internal Server Error.'
        text="Oops! Something went wrong. Sorry for the inconvenience, we're working on it."
      />
    </div>
  );
}
