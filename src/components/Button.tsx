import clsx from 'clsx';
import { MouseEvent, MouseEventHandler, ReactNode, useState } from 'react';

import useDebouncedRippleCleanUp from '@/hooks/useDebouncedRippleCleanUp';

type ButtonProps = {
  children: ReactNode;
  className: string;
  rippleColor: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

function Button({ children, className, rippleColor, onClick }: ButtonProps) {
  const [rippleArray, setRippleArray] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useDebouncedRippleCleanUp(rippleArray.length, 300, () => {
    setRippleArray([]);
  });

  const createRipple = (event: MouseEvent<HTMLElement>) => {
    const button = event.currentTarget.getBoundingClientRect();
    const size = button.width > button.height ? button.width : button.height;
    const x = event.pageX - button.x - size / 2;
    const y = event.pageY - button.y - size / 2;
    const newRipple = { x, y, size };

    setRippleArray([...rippleArray, newRipple]);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    createRipple(event);
    if (typeof onClick == 'function') onClick(event);
  };

  return (
    <button
      className={clsx(
        'relative overflow-hidden p-2 capitalize shadow-md lg:font-semibold',
        className,
      )}
      onClick={handleClick}
    >
      {children}
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              className={clsx(
                'absolute animate-ripple rounded-[50%] opacity-75',
                rippleColor,
              )}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                transform: 'scale(0)',
              }}
            />
          );
        })}
    </button>
  );
}

export default Button;
