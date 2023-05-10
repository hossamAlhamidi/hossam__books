import axiosInstance, { baseUrl } from '../../config/axiosInstance';

type SearchForBooksProps = {
  searchTerm: string;
  startIndex: number;
  maxResults: number;
};

export const searchForBooks = async ({
  searchTerm,
  startIndex,
  maxResults,
}: SearchForBooksProps) => {
  const response = await axiosInstance.get(
    `${baseUrl}volumes?q="${searchTerm || 'random'}"&key=${
      process.env.REACT_APP_BOOKS_API_KEY
    }&maxResults=${maxResults}&startIndex=${
      startIndex * maxResults - maxResults
    }`
  );
  return response.data;
};
