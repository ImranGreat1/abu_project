import { useCallback, useRef } from 'react';

const useInfiniteScroll = (isLoading, hasMore, incrementPageNumber) => {
  // For infinite loading of data
  const observer = useRef();
  const lastDocRef = useCallback(
    (node) => {
      // We don't to activate infinite scrolling when loading
      if (isLoading) return;

      // disconnect current observer to connect to the last element
      if (observer.current) observer.current.disconnect();
      // The intersection function take a function with all the entries we are watching
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          incrementPageNumber();
        }
      });

      //
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return lastDocRef;
};

export default useInfiniteScroll;
