import React from 'react';

function Footer() {
  return (
    <footer className='mt-auto bg-primary-foreground py-4 text-center'>
      <span className='flex flex-row justify-center text-xxs font-medium md:text-xs'>
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

export default Footer;
