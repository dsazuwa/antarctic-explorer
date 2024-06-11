import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <Select
      onValueChange={(i) => setItemsPerPage(Number.parseInt(i, 10))}
      value={itemsPerPage + ''}
      defaultValue={itemsPerPage + ''}
    >
      <SelectTrigger
        className='max-w-fit items-center gap-2 bg-inherit text-sm font-semibold text-black lg:text-base'
        aria-label='Items per page:'
      >
        <span className='font-normal text-neutral-500'>Items per page:</span>

        <SelectValue
          defaultValue={itemsPerPage}
          className='text-sm lg:text-base'
        />
      </SelectTrigger>

      <SelectContent>
        {options.map((o, i) => (
          <SelectItem key={`option${i}`} value={i + ''} className='body'>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
