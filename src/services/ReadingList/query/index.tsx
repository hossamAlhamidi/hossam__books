import { useQuery,useMutation,useQueryClient } from 'react-query';
import { getReadingList,addBookToReadingList,deleteBookFromReadingList } from '../api';
import { useToast } from '@chakra-ui/react';

export const useGetReadingList = (options = {}) => {
  const { data, isLoading, refetch } = useQuery('readingList', getReadingList, {
    ...options,
  });

  return { refetch, data, isLoading };
};

export const useAddBookToReadingList = (payload={},options = {}) => {
  const queryClient = useQueryClient();
  const toast = useToast()
 const {mutate,isLoading,data} = useMutation(addBookToReadingList,{
  mutationKey:['addBookToReadingList',payload],
    ...options,
    onSuccess:()=>{
      toast({
        title: 'Success',
        description: "Book has been added successfully",
        position:'top-right',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      queryClient.refetchQueries({ queryKey: ['readingList'] });
    },
    onError:()=>{
      toast({
        title: 'An error occurred.',
        description: 'Something went wrong.',
        position:'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  return {mutate,isLoading,data}
}

export const useDeleteBookFromReadingList = (options = {}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading } = useMutation(deleteBookFromReadingList, {
    mutationKey: 'deleteFromReadingList',
    ...options,
    onSuccess:()=>{
      toast({
        title: 'Success',
        description: "Book has been deleted successfully",
        position:'top-right',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      queryClient.refetchQueries({ queryKey: ['readingList'] });
    },
    onError:()=>{
      toast({
        title: 'An error occurred.',
        description: 'Something went wrong.',
        position:'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  });
  return { mutate, isLoading };
}