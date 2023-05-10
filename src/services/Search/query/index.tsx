import { useQuery } from 'react-query';
import { searchForBooks } from '../api';

export const useSearchForBooks = (payload: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['searchForBooks', payload],
    () => searchForBooks(payload),
    {
      ...options,
      // enabled: false,
    }
  );

  return { refetch, data, isLoading };
};
