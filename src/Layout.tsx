import { ReactElement } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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
