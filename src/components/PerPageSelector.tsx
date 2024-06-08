import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from './ui/label';

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
    <div className='inline-flex items-center gap-2'>
      <Label
        htmlFor='items_per_page'
        className='body-sm lg:body pb-0.5 font-semibold text-slate-500'
      >
        Items per page
      </Label>

      <Select
        onValueChange={(i) => setItemsPerPage(Number.parseInt(i, 10))}
        value={itemsPerPage + ''}
        defaultValue={itemsPerPage + ''}
      >
        <SelectTrigger
          id='items_per_page'
          className='body-sm lg:body mt-0.5 h-[28px] w-8 font-semibold md:w-10'
        >
          <SelectValue defaultValue={itemsPerPage} />
        </SelectTrigger>

        <SelectContent>
          {options.map((o, i) => (
            <SelectItem key={`option${i}`} value={i + ''} className='body'>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
