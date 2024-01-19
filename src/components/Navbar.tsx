import { NAVBAR_HEIGHT } from '@/styles/styles';
import Logo from './Logo';

function Navbar() {
  const h = NAVBAR_HEIGHT;

  return (
    <>
      <div className={`fixed top-0 z-10 w-full h-[${h}px] bg-light_gray`}>
        <div className='ml-auto mr-auto w-full max-w-screen-lg px-4 py-2'>
          <Logo size={'sm'} />
        </div>
      </div>

      <div className={`mt-[${h}px]`} />
    </>
  );
}

export default Navbar;
