import React, { Fragment, useState, useMemo } from 'react';
import {
  Box,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  CircularProgress,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import Book from '../../components/Book';
import { useSearchForBooks } from '../../services/Search/query';
import { useAddBookToReadingList } from '../../services/ReadingList/query';
import BookPagination from '../../components/Pagination';
import { useDebounce } from '../../hooks/useDebounceSearch';
import { isEmpty } from '../../utils';
import { BookItem } from '../../types/global';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [bookAdded, setBookAdded] = useState<string | number>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const debouncedSearchTerm = useDebounce({
    searchTerm: search,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
  });

  const { data, isLoading, refetch } = useSearchForBooks({
    searchTerm: debouncedSearchTerm,
    startIndex: currentPage,
    maxResults: pageSize,
  });

  const { mutate: addToReadingList, isLoading: isLoadingReadingList } =
    useAddBookToReadingList();

  const booksResults = useMemo(() => {
    if (data?.items) {
      return [...data?.items];
    }
    return [];
  }, [data, search]);

  const handleAddToReadingList = (item: BookItem) => {
    setBookAdded(item.id);
    addToReadingList(item);
  };

  const actions = [
    {
      label: 'Add to reading list',
      type: 'solid',
      onPress: (item: BookItem) => {
        handleAddToReadingList(item);
      },
      isLoading: isLoadingReadingList,
    },
  ];

  if (!isLoading && isEmpty(booksResults)) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
        <Box textAlign={'center'}>
          <Text fontWeight={'bold'}>No results found</Text>
          <Button
            type="button"
            mt={3}
            onClick={() => {
              setCurrentPage(1);
              setPageSize(20);
              setSearch('');
              refetch();
            }}
          >
            Clear
          </Button>
        </Box>
      </Flex>
    );
  }
  return (
    <Fragment>
      <Box maxW={['100%', '50%']} mx={'auto'} my={'10px'}>
        <form>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            />

            <Input
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            <InputLeftElement children={<FiSearch color="green.500" />} />
          </InputGroup>
        </form>
      </Box>
      {!isLoading ? (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={5} my={10}>
          {booksResults.map((book) => (
            <Book
              key={book.id}
              title={book.volumeInfo.title}
              image={book.volumeInfo.imageLinks?.thumbnail}
              authors={book.volumeInfo.authors}
              actions={actions}
              id={book.id}
              isSameBtn={bookAdded === book.id}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      )}

      {!isLoading && booksResults && (
        <BookPagination
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setPageSize={setPageSize}
          totalCount={Number(data?.totalItems || 0)}
        />
      )}
    </Fragment>
  );
};

export default Search;
