import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { itemsPerPageOptions } from '@/lib/constants';
import {
  navigateToFirst,
  navigateToLast,
  navigateToNext,
  navigateToPrevious,
  setItemsPerPage,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import IconButton from './IconButton';
import { Label } from './ui/label';

function BottomNavigation() {
  const dispatch = useAppDispatch();
  const {
    expeditions: { currentPage, totalPages },
    selectedItemsPerPage,
  } = useAppSelector((s) => s.state);

  return (
    <div className='flex flex-col-reverse items-center py-4 text-xs sm:grid sm:grid-cols-3'>
      <div className='flex flex-row items-center space-x-2'>
        <Label
          htmlFor='items per page'
          className='text-xs font-semibold text-slate-500'
        >
          Items per page
        </Label>

        <Select
          onValueChange={(i) => dispatch(setItemsPerPage(Number.parseInt(i)))}
          value={selectedItemsPerPage + ''}
          defaultValue={selectedItemsPerPage + ''}
        >
          <SelectTrigger
            id='items per page'
            className='h-[28px] w-[64px] text-xxs font-semibold'
          >
            <SelectValue defaultValue={selectedItemsPerPage} />
          </SelectTrigger>

          <SelectContent>
            {itemsPerPageOptions.map((o, i) => (
              <SelectItem key={`option${i}`} value={i + ''}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='mb-2 flex flex-row justify-center space-x-1 sm:mb-0'>
        <IconButton
          Icon={DoubleArrowLeftIcon}
          disabled={currentPage === 0}
          onClick={() => dispatch(navigateToFirst())}
        />

        <IconButton
          Icon={ChevronLeftIcon}
          disabled={currentPage === 0}
          onClick={() => dispatch(navigateToPrevious())}
        />

        <div className='flex items-center px-1 text-center text-xs font-semibold leading-none text-slate-500'>
          {`Page ${currentPage + 1} of ${totalPages}`}
        </div>

        <IconButton
          Icon={ChevronRightIcon}
          disabled={currentPage === totalPages - 1}
          onClick={() => dispatch(navigateToNext())}
        />

        <IconButton
          Icon={DoubleArrowRightIcon}
          disabled={currentPage === totalPages - 1}
          onClick={() => dispatch(navigateToLast())}
        />
      </div>
    </div>
  );
}

export default BottomNavigation;
