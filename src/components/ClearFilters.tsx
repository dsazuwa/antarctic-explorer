import { Button } from './ui/button';

function ClearFilters({ disabled }: { disabled: boolean }) {
  return (
    <Button disabled={disabled} size='xs'>
      Clear all filters
    </Button>
  );
}

export default ClearFilters;
