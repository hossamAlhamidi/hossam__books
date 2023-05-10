import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { isEmpty } from '../../utils';

type DebouncePropsType = {
  searchTerm: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const useDebounce = ({
  searchTerm,
  currentPage,
  setCurrentPage,
}: DebouncePropsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);
  const prevSearchTermRef = useRef<string>('');

  useEffect(() => {
    resetPagination();
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(searchTerm);
      if (!isEmpty(searchTerm)) {
        searchParams.set('q', searchTerm);
        searchParams.set('page', '1');
      } else if (isEmpty(searchTerm)) {
        searchParams.delete('q');
      }
      // setSearchParams((prev) => new URLSearchParams(prev));
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
      //   resetPagination();
    };
  }, [searchTerm, 400]);

  const resetPagination = useCallback(() => {
    if (searchTerm !== prevSearchTermRef.current && currentPage !== 1) {
      setCurrentPage(1);
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm, currentPage]);

  return debouncedValue;
};
