import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Divider,
  ButtonGroup,
  Tooltip,
} from '@chakra-ui/react';
import fallbackImage from '../../assets/images/not_available.jpg';
const Book = ({ title, description, image, authors }: any) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image || fallbackImage}
          alt="book cover"
          borderRadius="lg"
          width={'100%'}
          height={'350px'}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" noOfLines={2}>
            {' '}
            <Tooltip label={title} placement="top">
              <span>{title}</span>
            </Tooltip>
          </Heading>
          <Text noOfLines={3}>{authors || '-'}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Add to reading list
          </Button>
          {/* <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Book;
