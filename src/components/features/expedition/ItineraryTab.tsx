import { ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

type Props = {
  index: number;
  name: string;
  startPort: string;
  isSelected: boolean;
  isLastTab: boolean;
  handleClick: () => void;
};

export default function Tab({
  index,
  name,
  startPort,
  isSelected,
  isLastTab,
  handleClick,
}: Props) {
  return (
    <li
      key={`itinerary_btn_${index}`}
      className={clsx('', {
        'border-b': isLastTab,
        'border-l-2 border-l-primary': isSelected,
      })}
    >
      <button
        onClick={handleClick}
        className='flex flex-row items-center justify-between'
      >
        <span className='flex flex-col space-y-1 py-4 pl-4 font-semibold'>
          <span className='text-start text-base'>{name}</span>

          {startPort && (
            <span className='space-x-1 text-sm'>
              <span className='font-light'>FROM</span>
              <span>{startPort}</span>
            </span>
          )}
        </span>

        {isSelected && <ChevronRightIcon className='h-8 w-8 p-2' />}
      </button>
    </li>
  );
}
