import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}
