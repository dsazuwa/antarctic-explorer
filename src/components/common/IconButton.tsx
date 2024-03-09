import { IconProps } from '@radix-ui/react-icons/dist/types';
import clsx from 'clsx';

type Props = {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  disabled: boolean;
  onClick?: () => void;
};

export default function IconButton({ Icon, disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'group flex h-6 max-h-6 w-6 items-center justify-center rounded-full',
        { 'hover:bg-primary/90': !disabled },
      )}
    >
      <i
        className={clsx('flex items-center justify-center fill-current', {
          'text-black hover:text-primary-foreground group-hover:text-primary-foreground':
            !disabled,
          'text-gray-400': disabled,
        })}
      >
        <Icon className='h-3 w-3' />
      </i>
    </button>
  );
}
