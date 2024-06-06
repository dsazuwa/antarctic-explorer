import Link from 'next/link';

import Logo from './Logo';

function Navbar() {
  return (
    <nav className='h-14 w-full bg-primary-foreground'>
      <div className='ml-auto mr-auto flex w-full max-w-screen-lg flex-row px-4 py-2'>
        <Link href='/'>
          <Logo size={'sm'} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
