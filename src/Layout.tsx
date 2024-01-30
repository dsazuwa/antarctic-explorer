import { ReactElement } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function getLayout(page: ReactElement) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
}

export default getLayout;
