import React from 'react';

export default function H3Heading({ text }: { text: string }) {
  return <h3 className='text-2xl mb-2 font-bold text-sky-900'>{text}</h3>;
}
