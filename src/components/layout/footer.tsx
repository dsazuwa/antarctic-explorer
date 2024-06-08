import React from 'react';

export default function Footer() {
  return (
    <footer className='mt-auto py-4 text-center'>
      <span className='body-sm lg:body inline-flex flex-wrap justify-center font-medium text-neutral-500'>
        The source code for this app can be found on
        <a
          href='https://github.com/dsazuwa/antarctic-explorer-app'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-1 font-semibold text-primary underline'
        >
          GitHub
        </a>
      </span>
    </footer>
  );
}
