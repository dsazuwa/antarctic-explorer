import Logo from './Logo';

function Navbar() {
  return (
    <>
      <div className={`h-14] fixed top-0 z-10 w-full bg-light_gray`}>
        <div className='ml-auto mr-auto w-full max-w-screen-lg px-4 py-2'>
          <Logo size={'sm'} />
        </div>
      </div>

      <div className='mt-14' />
    </>
  );
}

export default Navbar;
