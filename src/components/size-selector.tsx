import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  options: number[];
  size: number;
  setSize: (i: number) => void;
};

export default function PerPageSelector({ options, size, setSize }: Props) {
  const isSizeAnOption = options.includes(size);

  return (
    <Select
      onValueChange={(i) => setSize(Number.parseInt(i, 10))}
      value={size + ''}
      defaultValue={size + ''}
    >
      <SelectTrigger
        className='max-w-fit items-center gap-2 bg-inherit text-sm font-semibold text-black lg:text-base'
        aria-label='Items per page:'
      >
        <span className='font-normal text-neutral-500'>Items per page:</span>

        <SelectValue defaultValue={size} className='text-sm lg:text-base' />
      </SelectTrigger>

      <SelectContent>
        {[...options, ...(isSizeAnOption ? [] : [size])].map((o, i) => (
          <SelectItem key={`option${i}`} value={o + ''} className='body'>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
