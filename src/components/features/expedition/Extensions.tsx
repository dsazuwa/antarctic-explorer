import { TExtension } from '@/lib/type';
import Extension from './Extension';

type Props = { extensions: TExtension[] };

export default function Extensions({ extensions }: Props) {
  return (
    <section aria-label='Expedition Extensions'>
      <div className='mx-auto flex max-w-screen-lg flex-col px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Exedition Extensions
        </h2>

        <ul className='mt-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {extensions.map((extension, i) => (
            <Extension key={`extension-${i}`} extension={extension} />
          ))}
        </ul>
      </div>
    </section>
  );
}
