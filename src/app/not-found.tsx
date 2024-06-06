import { Metadata } from 'next';

import Error from '@/components/Error';

export const metadata: Metadata = {
  title: 'Page Not Found | Antarctic Explorer',
  description: 'The requested page could not be found.',
};

export default function PageNotFound() {
  return (
    <Error
      statusCode={404}
      title='Page Not Found.'
      text="Sorry we can't find the page you're looking for."
    />
  );
}
