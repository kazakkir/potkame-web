import { Box, Center, Flex, Heading, LinkBox, LinkOverlay, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import { Category, Event, Maybe, useMeQuery, User } from '../../../generated/graphql';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { formatIsoDate, formatIsoTime } from '../../../lib/utils/formatDateTime';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiPhotograph } from 'react-icons/hi';
import AdditionalInfo from './ExploreCard/AdditionalInfo';
import { useEffect, useState } from 'react';

type Props = Pick<Event, 'id' | 'imageUrl' | 'title' | 'description' | 'dateFrom' | 'address' | 'category'>;

export default function ExploreCard(props: Props) {
  return (
    <Box
      roundedTop={'md'}
      overflow={'hidden'}
      as="article"
      shadow={'sm'}
      border={'1px solid'}
      borderColor={'gray.100'}
      bg={'white'}
      _hover={{ shadow: 'lg' }}
      roundedBottom={'md'}
      position={'relative'}
      id={props.id}
    >
      <LinkBox position={'relative'} top={0} cursor={'pointer'} data-peer>
        {/* Image */}
        <Center height={200} width={'auto'} position={'relative'} bg={'gray.200'}>
          {props.imageUrl && <NextImage src={props.imageUrl} layout={'fill'} objectFit={'cover'} />}

          <Heading size={'2xl'} color={'gray.400'}>
            <HiPhotograph />
          </Heading>
        </Center>

        {/* Main */}
        <Box px={3} py={2}>
          <Heading size={'sm'} mb={2} noOfLines={1}>
            <NextLink href={`/events/${props.id}`} passHref>
              <LinkOverlay>{props.title}</LinkOverlay>
            </NextLink>
          </Heading>
          <Text fontSize={'xs'} noOfLines={2}>
            {props.description}
          </Text>
        </Box>

        {/* Footer */}
        <Flex
          px={3}
          py={2}
          justifyContent={'space-between'}
          borderTop={'1px solid'}
          borderColor={'gray.100'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex flex={1} direction={'column'} gap={1}>
            <SimpleGrid gap={2} gridTemplateColumns={'10% 90%'}>
              <HiOutlineCalendar />
              <Text alignItems={'center'} fontSize={'xs'} noOfLines={1}>
                {`${formatIsoTime(props.dateFrom)}, ${formatIsoDate(props.dateFrom)}`}
              </Text>
            </SimpleGrid>
            {props.address && (
              <SimpleGrid gap={2} gridTemplateColumns={'10% 90%'}>
                <HiOutlineLocationMarker />
                <Text alignItems={'center'} fontSize={'xs'} noOfLines={1}>
                  {props.address}
                </Text>
              </SimpleGrid>
            )}
          </Flex>
        </Flex>
      </LinkBox>
      <AdditionalInfo category={props.category} eventId={props.id} />
    </Box>
  );
}
