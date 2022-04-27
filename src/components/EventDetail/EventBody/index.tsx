import { gql, useSubscription } from '@apollo/client';
import { Avatar, Badge, Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { Event } from '../../../generated/graphql';
import EventContent from './EventContent';
import EventSideInfo from './EventSideInfo';

type Props = Omit<Event, 'id' | 'title' | 'updatedAt' | 'createdAt'>;

export default function EventBody(props: Props) {
  const { description, imageUrl, ...sideInfoProps } = props;

  return (
    <Flex
      mt={8}
      px={{ xl: '20vw' }}
      ml={{ xl: 10 }}
      justifyContent={'space-between'}
      direction={{ base: 'column', xl: 'row' }}
    >
      <EventContent description={description} imageUrl={imageUrl} />
      <EventSideInfo {...sideInfoProps} isSticky />
    </Flex>
  );
}
