import React, { Fragment, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Flex,
  CircularProgress,
  Box,
  Text,
} from '@chakra-ui/react';

import Book from '../../components/Book';
import {
  useGetReadingList,
  useDeleteBookFromReadingList,
} from '../../services/ReadingList/query';

import { isEmpty } from '../../utils';
import { BookItem } from '../../types/global';
interface ReadingListBookData {
  title: string;
  authors: string[];
  data: any;
  id: string;
  image: string;
  timestamp: {
    seconds: number;
  };
}
const ReadingList = () => {
  const [bookDeleted, setBookDeleted] = useState<string>('');
  const { data, isLoading }: any = useGetReadingList();
  const { mutate: deleteFromReadingList, isLoading: isLoadingDeleting } =
    useDeleteBookFromReadingList();

  const handleDeleteFromReadingList = (item: BookItem) => {
    setBookDeleted(item.id);
    deleteFromReadingList(item.id);
  };

  const actions = [
    {
      label: 'Remove from reading list',
      type: 'danger',
      onPress: (item: BookItem) => {
        handleDeleteFromReadingList(item);
      },
      isLoading: isLoadingDeleting,
    },
  ];

  if (!isLoading && isEmpty(data)) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
        <Box textAlign={'center'}>
          <Text fontWeight={'bold'}>No Books Added</Text>
        </Box>
      </Flex>
    );
  }
  return (
    <Fragment>
      {!isLoading ? (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={5} my={10}>
          {data
            ?.sort(
              (a: ReadingListBookData, b: ReadingListBookData) =>
                a.timestamp.seconds - b.timestamp.seconds
            )
            ?.map((book: ReadingListBookData) => (
              <Book
                key={book.id}
                title={book.title}
                image={book.image}
                authors={book.authors}
                actions={actions}
                id={book.id}
                isSameBtn={bookDeleted === book.id}
              />
            ))}
        </SimpleGrid>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} minH={'50vh'}>
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      )}
    </Fragment>
  );
};

export default ReadingList;
