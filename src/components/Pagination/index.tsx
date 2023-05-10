import { Flex, Select } from "@chakra-ui/react";
import Pagination from "./Pagination";

interface IProps {
  setPageSize: (num: number) => void;
  setCurrentPage: (num: number) => void;
  currentPage: number;
  totalCount?: number;
  pageSize: number;
}

function BookPagination({
  setPageSize,
  setCurrentPage,
  currentPage,
  totalCount = 0,
  pageSize,
}: IProps) {
  return (
    <Flex w="100%" paddingTop="24px" flexWrap={'wrap'} justifyContent={'center'}>
      <Flex flex={1}></Flex>
      <Select
        w={["190px"]}
        defaultValue={pageSize}
        onChange={(e: any) => {
          setPageSize(parseInt(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={10}>10 Items Per Page</option>
        <option value={20}>20 Items Per Page</option>
        <option value={30}>30 Items Per Page</option>
        <option value={40}>40 Items Per Page</option>
      </Select>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount || 0}
        pageSize={pageSize}
        onPageChange={(page:number) => setCurrentPage(page)}
      />
    </Flex>
  );
}

export default BookPagination;
