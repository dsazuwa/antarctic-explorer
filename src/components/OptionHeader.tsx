import { ReactNode } from 'react';

type OptionsHeaderProps = {
  children?: ReactNode;
};

function OptionHeader({ children }: OptionsHeaderProps) {
  return (
    <div className='mb-2 flex flex-row items-center justify-between border-b-2 border-solid border-gray-200 pb-1 text-sm font-semibold text-primary'>
      {children}
    </div>
  );
}
export default OptionHeader;
