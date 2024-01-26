import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const isWindowClient = typeof window === 'object';
  const [windowWidth, setWindowWidth] = useState(
    isWindowClient ? window.innerWidth : undefined,
  );

  useEffect(() => {
    const setWidth = () => setWindowWidth(window.innerWidth);

    if (isWindowClient) {
      window.addEventListener('resize', setWidth);

      return () => window.removeEventListener('resize', setWidth);
    }
  }, [isWindowClient, setWindowWidth]);

  return windowWidth;
};

export default useWindowWidth;
