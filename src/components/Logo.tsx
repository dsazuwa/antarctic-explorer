import clsx from 'clsx';

import LogoIcon from '@/assets/icons/Logo';

function Logo({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return { height: 24, width: 28, fontSize: 'text-xs/[12px]' };
      case 'md':
        return { height: 28, width: 32, fontSize: 'text-sm/[14px]' };
      case 'lg':
        return { height: 32, width: 36, fontSize: 'text-base/[16px]' };
    }
  };

  const { height, width, fontSize } = getSize();

  return (
    <button className='flex flex-row items-center'>
      <div className='p-2'>
        <LogoIcon fill='#274c77' height={height} width={width} />
      </div>

      <div className={clsx('text-left font-extrabold', fontSize)}>
        <div className='text-navy'>Antarctica</div>
        <div className='text-pale_azure'>Explorer</div>
      </div>
    </button>
  );
}

export default Logo;
