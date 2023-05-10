import React, { Fragment, useEffect, useState } from 'react';
import { SimpleGrid, Flex, CircularProgress } from '@chakra-ui/react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Book from '../../components/Book';
import { useGetReadingList,useDeleteBookFromReadingList } from '../../services/ReadingList/query';

interface Book {
  title: string;
  authors: string[];
  data: any;
  id: string;
  image: string;
}
const ReadingList = () => {
  const [bookDeleted, setBookDeleted] = useState("");
  const { data, isLoading }: any = useGetReadingList();
  const {mutate:deleteFromReadingList,isLoading:isLoadingDeleting } = useDeleteBookFromReadingList();

  const handleDeleteFromReadingList = (item: any) => {
    console.log(item,'item')
    setBookDeleted(item.id);
    deleteFromReadingList(item.id);
  };

  const actions = [
    {
      label: 'Remove from reading list',
      type: 'danger',
      onPress: (item: any) => {
        handleDeleteFromReadingList(item);
      },
      isLoading: isLoadingDeleting,
    },
  ];

 
  console.log(data, 'data');
  return (
    <Fragment>
      {!isLoading ? (
        <SimpleGrid columns={[1, 2, 3, 4,5]} gap={5} my={10}>
          {data.map((book: Book) => (
            <Book
              key={book.id}
              title={book.title}
              image={book.image}
              authors={book.authors}
              actions={actions}
              id={book.id}
              isSameBtn={bookDeleted===book.id}
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
