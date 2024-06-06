'use client';

import { Metadata } from 'next';

import Error from '@/components/Error';

export const metadata: Metadata = {
  title: 'Internal Server Error | Antarctic Explorer',
  description: 'Something went wrong.',
};

export default function InternalServerPage() {
  return (
    <Error
      statusCode={500}
      title='Internal Server Error.'
      text="Oops! Something went wrong. Sorry for the inconvenience, we're working on it."
    />
  );
}
