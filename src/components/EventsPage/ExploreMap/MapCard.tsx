import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Event } from '../../../generated/graphql';
import NextImage from 'next/image';

type Props = Pick<Event, 'title' | 'imageUrl'> & { eventId: string };

export default function MapCard({ title, imageUrl, eventId }: Props) {
  return (
    <Flex gap={5} shadow={'lg'} overflow={'hidden'} rounded={'lg'} minWidth={200}>
      <NextImage src={imageUrl!} width={50} height={50} objectFit={'cover'} />
      <Box p={2}>
        <Text fontWeight={'bold'}>{title}</Text>
        <Link href={`./events/${eventId}`}>View details</Link>
      </Box>
    </Flex>
  );
}
