import { ReactNode } from 'react';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
