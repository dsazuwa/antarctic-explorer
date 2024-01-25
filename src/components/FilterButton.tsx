import { Button } from './ui/button';

function FilterButton({ disabled }: { disabled: boolean }) {
  return (
    <Button className='p-2' disabled={disabled} size='xs'>
      Clear all filters
    </Button>
  );
}

export default FilterButton;
