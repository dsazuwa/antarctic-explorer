import Link from 'next/link';

import Logo from '../Logo';
import NavDrawer from './NavDrawer';

function Navbar() {
  return (
    <>
      <nav className='fixed top-0 z-10 h-14 w-full bg-primary-foreground'>
        <div className='ml-auto mr-auto flex w-full max-w-screen-lg flex-row px-4 py-2'>
          <NavDrawer />

          <Link href='/' className='flex-grow'>
            <Logo size={'sm'} />
          </Link>

          <div className='hidden sm:flex sm:items-center'>
            <Link
              href='/cruiseLines'
              className='mx-3 text-[10px] font-extrabold capitalize text-navy/80 transition-colors hover:text-navy/60 md:text-xs'
            >
              Cruise Lines
            </Link>

            <Link
              href='/expeditions'
              className='mx-3 text-[10px] font-extrabold capitalize text-navy/80 transition-colors hover:text-navy/60 md:text-xs'
            >
              Expeditions
            </Link>
          </div>
        </div>
      </nav>

      <div className='mt-14' />
    </>
  );
}

export default Navbar;
