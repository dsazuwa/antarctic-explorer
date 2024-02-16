import { Nunito_Sans } from 'next/font/google';

const font = Nunito_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  preload: true,
});

export default font;

