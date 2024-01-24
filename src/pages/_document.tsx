import { Theme } from '@radix-ui/themes';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Theme
          accentColor='crimson'
          grayColor='sand'
          radius='large'
          scaling='95%'
        >
          <Main />
          <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
