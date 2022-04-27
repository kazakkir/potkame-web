import { Avatar, Badge, Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { Maybe, Event, useEnrollmentRequestedSubscription } from '../../../generated/graphql';
import NextImage from 'next/image';
import { gql, useSubscription } from '@apollo/client';
import { HiPhotograph } from 'react-icons/hi';

type Props = Pick<Event, 'description' | 'imageUrl'>;

export default function EventContent({ description, imageUrl }: Props) {
  return (
    <Flex gap={8} width={{ base: '100%', xl: '60%' }} direction={'column'}>
      <Center height={250} width={'auto'} position={'relative'} bg={'gray.200'}>
        {imageUrl && <NextImage src={imageUrl} layout={'fill'} objectFit={'cover'} />}

        <Heading size={'2xl'} color={'gray.400'}>
          <HiPhotograph />
        </Heading>
      </Center>

      <Box display={{ base: 'none', xl: 'block' }}>
        <Heading size={'md'} mb={4}>
          Details
        </Heading>
        <Text wordBreak={'break-word'}>{description}</Text>
      </Box>
    </Flex>
  );
}
