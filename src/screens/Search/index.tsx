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
} from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import Book from '../../components/Book';
import { useSearchForBooks } from '../../services/Search/query';
import { useAddBookToReadingList } from '../../services/ReadingList/query';
import BookPagination from '../../components/Pagination';

const Search = () => {
  const [search, setSearch] = useState('');
  const [bookAdded, setBookAdded] = useState('');  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const { data, isLoading} = useSearchForBooks({
    searchTerm: search,
    startIndex:currentPage,
    maxResults:pageSize
  });
  const { mutate:addToReadingList,isLoading:isLoadingReadingList } = useAddBookToReadingList();

  const booksResults = useMemo(() => {
    if (data) {
      return [...data.items];
    }
    return [];
  }, [data, search]);

  const handleAddToReadingList = (item: any) => {
    console.log(item,'item')
    setBookAdded(item.id);
     addToReadingList(item);
  };
  const actions = [
    {
      label: 'Add to reading list',
      type: 'solid',
      onPress: (item: any) => {
        handleAddToReadingList(item);
      },
      isLoading: isLoadingReadingList,
    },
  ];

 
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
            {/* <Button type="button" mx={'5px'} onClick={() => refetch()}>
              Submit
            </Button> */}
          </InputGroup>
        </form>
      </Box>
      {!isLoading ? (
        <SimpleGrid columns={[1, 2, 3, 4,5]} gap={5} my={10}>
          {booksResults.map((book) => (
            <Book
              key={book.id}
              title={book.volumeInfo.title}
              image={book.volumeInfo.imageLinks?.thumbnail}
              authors={book.volumeInfo.authors}
              actions={actions}
              id={book.id}
              isSameBtn={bookAdded===book.id}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      )}

      {
        !isLoading&&booksResults&&(
          <BookPagination
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setPageSize={setPageSize}
          totalCount={Number(data?.totalItems||0)}
          />
        )
      }
    </Fragment>
  );
};

export default Search;
