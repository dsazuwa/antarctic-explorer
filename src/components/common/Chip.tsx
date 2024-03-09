import { Cross2Icon } from '@radix-ui/react-icons';

type ChipProps = {
  label: string;
  handleClick: () => void;
};

function Chip({ label, handleClick }: ChipProps) {
  return (
    <div className='inline-flex items-center rounded-2xl border border-solid border-primary/50 px-4 py-2 text-xxs font-bold text-primary/75 hover:shadow'>
      {label}
      <button
        className='ml-2 rounded-full bg-muted-foreground/35 p-1 transition-colors hover:bg-muted-foreground/45 hover:shadow-sm'
        onClick={handleClick}
      >
        <Cross2Icon className='h-3 w-3 text-white' />
      </button>
    </div>
  );
}

export default Chip;
