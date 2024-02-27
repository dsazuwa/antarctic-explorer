import React from 'react';

export default function H3Heading({ text }: { text: string }) {
  return (
    <h3 className='mb-4 text-lg font-bold text-sky-900 md:text-xl'>{text}</h3>
  );
}
