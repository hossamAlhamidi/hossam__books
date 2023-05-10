import React from 'react';
import {
  Card,
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
import { IResourceCardActions } from '../../types/global';
type BookProps = {
  title: string;
  image: string;
  authors: string[];
  id: string | number;
  isSameBtn: boolean;
  actions: IResourceCardActions<any>[];
};

const Book = ({
  title,
  image,
  authors,
  id,
  isSameBtn,
  actions = [],
}: BookProps) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image || fallbackImage}
          alt="book cover"
          borderRadius="lg"
          width={'100%'}
          height={'200px'}
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
        <ButtonGroup spacing="2" width={'100%'}>
          {actions &&
            actions.map((action: any, index: number) => {
              return (
                <Button
                  key={index}
                  variant={action.type}
                  width={'100%'}
                  colorScheme="blue"
                  onClick={() => action?.onPress({ title, image, authors, id })}
                  isLoading={isSameBtn && action?.isLoading}
                >
                  {action.label}
                </Button>
              );
            })}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Book;
