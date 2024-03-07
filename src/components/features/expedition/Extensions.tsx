import { TExtension } from '@/lib/type';
import Extension from './Extension';
import H3Heading from './H3Heading';

type Props = { extensions: TExtension[] };

export default function Extensions({ extensions }: Props) {
  return (
    <section aria-label='Expedition Extensions'>
      <div className='mx-auto flex max-w-screen-lg flex-col p-4'>
        <H3Heading text='Exedition Extensions' />

        <div className='mt-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {extensions.map((extension, i) => (
            <Extension key={`extension-${i}`} extension={extension} />
          ))}
        </div>
      </div>
    </section>
  );
}
