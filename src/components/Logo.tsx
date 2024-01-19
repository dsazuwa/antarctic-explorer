import React from 'react';
import LogoIconPath from './LogoIconPath';

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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height={height}
          width={width}
          viewBox='0 0 576 512'
        >
          <LogoIconPath fill='#274c77' />
        </svg>
      </div>

      <div className={`text-left font-extrabold ${fontSize}`}>
        <div className='text-navy'>Antarctica</div>
        <div className='text-pale_azure'>Explorer</div>
      </div>
    </button>
  );
}

export default Logo;
