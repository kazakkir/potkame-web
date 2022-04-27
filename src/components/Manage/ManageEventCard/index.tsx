import { Box, Flex, Heading, IconButton, Link, Text, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlinePencil, HiPencil, HiTrash } from 'react-icons/hi';
import {
  Event,
  EventManyCreatedDocument,
  EventManyDocument,
  useEventRemoveOneMutation,
} from '../../../generated/graphql';
import ButtonEventRemove from './ButtonEventRemove';

type Props = { event: Partial<Event> & { id: string; title: string; dateFrom: string } };

export default function ManageEventCard({ event }: Props) {
  const router = useRouter();
  const [removeEvent] = useEventRemoveOneMutation({
    variables: { eventId: event.id },
    refetchQueries: [EventManyCreatedDocument],
  });
  return (
    <Flex
      key={event.id}
      width={'100%'}
      bg={'white'}
      p={4}
      justifyContent={'space-between'}
      align={'center'}
      rounded={'md'}
      shadow={'sm'}
      _hover={{ shadow: 'md' }}
    >
      {/* info */}
      <Flex gap={4}>
        {event.imageUrl && <NextImage src={event.imageUrl} width={100} height={50} objectFit={'cover'} />}
        <Flex align={'center'}>
          <NextLink href={`${router.basePath}/events/${event.id}`} passHref>
            <Link fontWeight={'bold'}>{event.title}</Link>
          </NextLink>
          {event.description && (
            <Text noOfLines={2} wordBreak={'break-all'}>
              {event.description}
            </Text>
          )}
        </Flex>
      </Flex>

      {/* actions */}
      <Flex justifyContent={'space-evenly'} position={'relative'}>
        <Tooltip label="Not available yet" mt="2" rounded={'md'} p={2} shouldWrapChildren>
          <IconButton
            disabled
            icon={<HiPencil />}
            variant={'ghost'}
            aria-label={''}
            fontSize={'xl'}
            color={'gray.400'}
          />
        </Tooltip>
        <ButtonEventRemove
          eventTitle={event.title}
          action={() => {
            removeEvent();
          }}
        />
      </Flex>
    </Flex>
  );
}
