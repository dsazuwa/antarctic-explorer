import Link from 'next/link';

import Logo from '../Logo';

function Navbar() {
  return (
    <>
      <nav className='fixed top-0 z-10 h-14 w-full bg-primary-foreground'>
        <div className='ml-auto mr-auto flex w-full max-w-screen-lg flex-row px-4 py-2'>
          <Link href='/' className='flex-grow'>
            <Logo size={'sm'} />
          </Link>
        </div>
      </nav>

      <div className='mt-14' />
    </>
  );
}

export default Navbar;
