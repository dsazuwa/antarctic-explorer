import { ComponentType } from 'react';

interface InfoDisplayProps {
  Icon: ComponentType<{ className?: string }>;
  primaryLabel: string;
  secondaryLabel?: string;
  value: string;
}

function InfoDisplay({
  Icon,
  primaryLabel,
  secondaryLabel,
  value,
}: InfoDisplayProps) {
  return (
    <div className='flex flex-row items-center'>
      <div className='mr-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-gray-200 sm:h-[32px] sm:w-[32px]'>
        <Icon className='h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]' />
      </div>

      <div className='text-[9px] font-semibold text-gray-400 sm:text-xs'>
        <div>{primaryLabel}</div>

        <div className='items-baseline'>
          <span className='mr-1 text-base text-black sm:text-lg'>{value}</span>
          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;
