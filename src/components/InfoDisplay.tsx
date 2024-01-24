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
      <div className='mr-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 sm:h-7 sm:w-7'>
        <Icon className='h-3 w-3 sm:h-4 sm:w-4' />
      </div>

      <div className='text-xxs font-semibold text-gray-400'>
        <div>{primaryLabel}</div>

        <div className='items-baseline'>
          <span className='mr-1 text-xs text-black'>{value}</span>
          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;
