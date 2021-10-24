import { useEffect } from 'react';

// Sources will be array of axios source
const useCleanUp = (sources) => {
  let mounted = true;

  useEffect(() => {
    mounted = true;

    return () => {
      mounted = false;
      if (sources) {
        sources.forEach((source) => {
          source.cancel();
        });
      }
    };
  }, []);

  return { mounted };
};

export default useCleanUp;
