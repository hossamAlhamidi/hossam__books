import { useQuery } from 'react-query';
import { searchForBooks } from '../api';

export const useSearchForBooks = (query: string, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ['searchForBooks', query],
    () => searchForBooks(query),
    {
      ...options,
      // enabled: false,
    }
  );

  return { refetch, data, isLoading };
};
