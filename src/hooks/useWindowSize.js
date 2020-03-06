import { useState, useEffect } from 'react';

function useWindowSize() {
  const main = document.getElementById('main');
  const isClient = typeof main === 'object';

  const getSize = () => ({
    width: isClient ? main.innerWidth : undefined,
    height: isClient ? main.innerHeight : undefined,
  });

  console.log(getSize());

  const [windowSize, setWindowSize] = useState(getSize);


  useEffect(() => {
    if (!isClient) return false;

    const handleResize = () => setWindowSize(getSize());

    main.addEventListener('resize', handleResize);

    return () => main.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
