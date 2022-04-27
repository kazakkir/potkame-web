import { Flex, Box, Text, Link, VStack, Avatar, Heading } from '@chakra-ui/react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { formatIsoDate, formatIsoTime } from '../../../../lib/utils/formatDateTime';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { Event, useUserOneQuery } from '../../../../generated/graphql';
import StaticMap from './StaticMap';

type Props = Pick<Event, 'longitude' | 'latitude' | 'address' | 'dateFrom' | 'dateTo' | 'authorUsername'> & {
  isSticky?: boolean;
};

export default function EventSideInfo({
  dateFrom,
  dateTo,
  authorUsername,
  address,
  longitude,
  latitude,
  isSticky,
}: Props) {
  const { data } = useUserOneQuery({ variables: { username: authorUsername } });

  return (
    <Flex
      flex={1}
      ml={{ xl: 20 }}
      direction={'column'}
      gap={5}
      position={isSticky ? { md: 'sticky' } : {}}
      height={'min-content'}
    >
      <Box>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={2}>
          Host
        </Text>
        <Flex>
          {data?.user.imageUrl ? (
            <Box position={'relative'} width={'50px'} height={'50px'} rounded={'full'} overflow={'hidden'}>
              <NextImage src={'data?.user.imageUrl'} layout={'fill'} objectFit={'cover'} />
            </Box>
          ) : (
            <Avatar size={'md'} />
          )}
          <Box ml="3">
            <NextLink href={`/users/${authorUsername}`} passHref>
              <Link>{data?.user.name}</Link>
            </NextLink>
            <Text fontSize="sm">@{authorUsername}</Text>
          </Box>
        </Flex>
      </Box>

      <Box p={3} bg={'white'} shadow={'md'} rounded={'lg'}>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={2} display={'flex'} gap={2} alignItems={'center'}>
          <HiOutlineCalendar />
          Date & time
        </Text>
        <VStack spacing={4}>
          <Flex width={'100%'} alignItems={'flex-start'} gap={3}>
            <Box>
              <Text>Start:</Text>
              {dateTo && <Text>End:</Text>}
            </Box>
            <Box>
              <Text>
                {formatIsoDate(dateFrom)}, {formatIsoTime(dateFrom)}
              </Text>
              {dateTo && (
                <Text>
                  {formatIsoDate(dateTo)}, {formatIsoTime(dateTo)}
                </Text>
              )}
            </Box>
          </Flex>
        </VStack>
      </Box>

      <StaticMap address={address} longitude={longitude} latitude={latitude} />
    </Flex>
  );
}
