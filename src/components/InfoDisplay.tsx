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
      <div className='mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 sm:h-8 sm:w-8'>
        <Icon className='h-4 w-4 sm:h-5 sm:w-5' />
      </div>

      <div className='text-xxs font-semibold text-gray-400'>
        <div>{primaryLabel}</div>

        <div className='items-baseline'>
          <span className='mr-1 text-sm text-black'>{value}</span>
          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;
