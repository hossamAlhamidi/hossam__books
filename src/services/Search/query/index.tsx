import { useQuery } from 'react-query';
import { searchForBooks } from '../api';

type SearchForBooksProps = {
  searchTerm: string;
  startIndex: number;
  maxResults: number;
}

export const useSearchForBooks = (payload: SearchForBooksProps, options = {}) => {
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
