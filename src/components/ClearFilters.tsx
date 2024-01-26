import { Button } from './ui/button';

function ClearFilters({ disabled }: { disabled: boolean }) {
  return (
    <Button disabled={disabled} size='xs' className='px-3 capitalize'>
      Clear all filters
    </Button>
  );
}

export default ClearFilters;
