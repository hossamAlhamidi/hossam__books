import React from 'react';
import { Box, Button, IconButton, useColorModeValue } from '@chakra-ui/react';
import { usePagination, DOTS } from './usePagination';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoEllipsisHorizontal } from 'react-icons/io5';

type PaginationPropsType = {
  onPageChange: (selectedPage: number) => void;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};
const Pagination = (props: PaginationPropsType) => {
  const {
    onPageChange,
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const selectedBorderColor = useColorModeValue(
    'lightMode.primary.default',
    'darkMode.white'
  );
  const notSelectedBorderColor = useColorModeValue('lightMode.gray', '#252526');
  const nonDisabledButtonColor = useColorModeValue('#00024c', '#1e1f23');
  const disabledButtonColor = useColorModeValue('#edf1f7', '#262627');
  const disabledIconColor = useColorModeValue('#ffffff', '#33343d');
  const iconColor = useColorModeValue('#969696', '#ffffff');
  const selectedTextColor = useColorModeValue(
    'lightMode.primary.default',
    'darkMode.white'
  );
  const notSelectedTextColor = useColorModeValue(
    'lightMode.primary.gray',
    'darkMode.white'
  );

 
  let lastPage = paginationRange[paginationRange.length - 1];
  const onNext = () => {
    if (currentPage !== lastPage) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  };
  return (
    <React.Fragment>
      <Box display="flex">
        <IconButton
          icon={
            <BsChevronLeft
              color={currentPage === 1 ? disabledIconColor : '#ffffff'}
            />
          }
          value={currentPage - 1}
          marginLeft="16px"
          bgColor={
            currentPage === 1 ? disabledButtonColor : nonDisabledButtonColor
          }
          border={currentPage === 1 ? 'none' : '1px solid'}
          disabled={currentPage === 1}
          onClick={onPrevious}
          variant={'pagination'}
          key={`prev-page-${currentPage - 1}`}
          aria-label={`prev-page-${currentPage - 1}`}
        />
        {[...paginationRange].map((pageNumber, idx) => {
          if (pageNumber.toString() === DOTS.toString()) {
            return (
              <IconButton
                borderColor={notSelectedBorderColor}
                variant={'pagination'}
                marginLeft="8px"
                _hover={{ backgroundColor: 'none' }}
                cursor="default"
                _active={{ backgroundColor: 'none' }}
                color={notSelectedTextColor}
                bgColor="transparent"
                icon={<IoEllipsisHorizontal color={iconColor} />}
                key={`dot-page-${pageNumber}-${idx}`}
                aria-label={`dot-page-${pageNumber}`}
              />
            );
          }
          return (
            <Button
              key={`page-${pageNumber}`}
              variant={'pagination'}
              marginLeft={['2px',"8px"]}
              borderColor={
                pageNumber === currentPage
                  ? selectedBorderColor
                  : notSelectedBorderColor
              }
              color={
                pageNumber === currentPage
                  ? selectedTextColor
                  : notSelectedTextColor
              }
              borderRadius="8px"
              onClick={() => onPageChange(pageNumber)}
              value={pageNumber}
            >
              {pageNumber}
            </Button>
          );
        })}
        <IconButton
          icon={
            <BsChevronRight
              color={currentPage === lastPage ? disabledIconColor : '#ffffff'}
            />
          }
          value={currentPage + 1}
          disabled={currentPage === lastPage}
          bgColor={
            currentPage === lastPage
              ? disabledButtonColor
              : nonDisabledButtonColor
          }
          onClick={onNext}
          border={currentPage === lastPage ? 'none' : '1px solid'}
          marginLeft="8px"
          variant={'pagination'}
          key={`next-page-${currentPage + 1}`}
          aria-label={`next-page-${currentPage + 1}`}
        />
      </Box>
    </React.Fragment>
  );
};

export default Pagination;
