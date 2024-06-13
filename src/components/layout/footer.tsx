import React from 'react';

export default function Footer() {
  return (
    <footer className='mt-auto border-t border-border/60 py-8 text-center'>
      <span className='body-sm lg:body inline-flex flex-wrap justify-center font-medium'>
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
