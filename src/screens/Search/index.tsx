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
import { useSearchForBooks } from '../../services/Search/query';
import { FiSearch } from 'react-icons/fi';
import Book from '../../components/Book';
const Search = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch } = useSearchForBooks(search);
  const booksResults = useMemo(() => {
    if (data) {
      return [...data.items];
    }
    return [];
  }, [data,search]);

  // if (isLoading) {
  //   return (
  //     <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
  //       <CircularProgress isIndeterminate color="green.300" />
  //     </Flex>
  //   );
  // }

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
     {
     !isLoading? <SimpleGrid columns={[1, 2, 3, 4]} gap={5} my={10}>
        {
        booksResults.map((book) => (
          <Book
            key={book.id}
            title={book.volumeInfo.title}
            description={book.volumeInfo.description}
            image={book.volumeInfo.imageLinks?.thumbnail}
            authors={book.volumeInfo.authors}
          />
        ))}
      </SimpleGrid>
: <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
<CircularProgress isIndeterminate color="green.300" />
</Flex>}
    </Fragment>
  );
};

export default Search;
