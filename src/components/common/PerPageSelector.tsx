import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';

type Props = {
  options: number[];
  itemsPerPage: number;
  setItemsPerPage: (i: number) => void;
};

export default function PerPageSelector({
  options,
  itemsPerPage,
  setItemsPerPage,
}: Props) {
  return (
    <div className='flex flex-row items-center space-x-2'>
      <Label
        htmlFor='items per page'
        className='text-xs font-semibold text-slate-500'
      >
        Items per page
      </Label>

      <Select
        onValueChange={(i) => setItemsPerPage(Number.parseInt(i, 10))}
        value={itemsPerPage + ''}
        defaultValue={itemsPerPage + ''}
      >
        <SelectTrigger
          id='items per page'
          className='h-[28px] w-[50px] text-xxs font-semibold'
        >
          <SelectValue defaultValue={itemsPerPage} />
        </SelectTrigger>

        <SelectContent>
          {options.map((o, i) => (
            <SelectItem key={`option${i}`} value={i + ''}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
