import { ComponentType } from 'react';

interface InfoDisplayProps {
  Icon: ComponentType<{ className?: string }>;
  primaryLabel: string;
  secondaryLabel?: string;
  value: string | null;
}

function InfoDisplay({
  Icon,
  primaryLabel,
  secondaryLabel,
  value,
}: InfoDisplayProps) {
  return (
    <div className='inline-flex items-center'>
      <div className='mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted sm:h-7 sm:w-7'>
        <Icon className='text-muted-foregound h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4' />
      </div>

      <div className='text-[8px] font-semibold text-gray-400'>
        <div>{primaryLabel}</div>

        <div className='items-baseline'>
          {value === null ? (
            <span>Unavailable</span>
          ) : (
            <span className='mr-1 text-[10px] text-black'>{value}</span>
          )}

          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;
