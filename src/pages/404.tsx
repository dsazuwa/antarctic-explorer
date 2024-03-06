import Head from 'next/head';

import Error from '@/components/Error';

export default function PageNotFound() {
  return (
    <div>
      <Head>
        <title>Page Not Found</title>
        <meta
          name='description'
          content='The requested page could not be found.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Error
        statusCode={404}
        title='Page Not Found.'
        text="Sorry we can't find the page you're looking for."
      />
    </div>
  );
}
