import { Box, Button, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/react';
import {
  HiBookmark,
  HiCheck,
  HiHeart,
  HiLockClosed,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineReply,
} from 'react-icons/hi';
import NextLink from 'next/link';
import { formatIsoDate } from '../../../lib/utils/formatDateTime';
import SubHeader from '../../Layout/Header/SubHeader';
import {
  EnrollmentRequestOneDocument,
  EventIsSavedDocument,
  EventManySavedDocument,
  useEnrollmentRequestCreateMutation,
  useEnrollmentRequestOneQuery,
  useEventIsSavedQuery,
  useMeQuery,
  useSaveEventMutation,
  useUnsaveEventMutation,
} from '../../../generated/graphql';
import { useRouter } from 'next/router';
import EnrollmentRequestState from './EnrollmentRequestState';

type Props = {
  title: string;
  dateFrom: string;
  authorUsername: string;
  isSticky?: boolean;
};

export default function EventHeader({ title, dateFrom, authorUsername }: Props) {
  const router = useRouter();
  const eventId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data: dataMe } = useMeQuery();
  const isAuthor = dataMe && dataMe.me?.username === authorUsername;
  const [sendRequest] = useEnrollmentRequestCreateMutation({
    refetchQueries: [EnrollmentRequestOneDocument],
  });
  const { data: enrollmentRequestData } = useEnrollmentRequestOneQuery({
    variables: { eventId },
  });

  const handleClick = () => {
    if (!eventId) {
      return;
    }
    sendRequest({ variables: { eventId } });
  };

  const { data: isSaved } = useEventIsSavedQuery({ variables: { eventId } });

  const [saveEvent] = useSaveEventMutation({
    variables: { eventId },
    refetchQueries: [EventIsSavedDocument, { query: EventManySavedDocument }], // https://github.com/apollographql/apollo-client/issues/5419#issuecomment-598065442
  });
  const [unsaveEvent] = useUnsaveEventMutation({
    variables: { eventId },
    refetchQueries: [EventIsSavedDocument, { query: EventManySavedDocument }], // https://github.com/apollographql/apollo-client/issues/5419#issuecomment-598065442
  });

  return (
    <SubHeader>
      <Flex direction={{ base: 'column', md: 'row' }} flex={1} justify={'space-between'} gap={{ base: 3, md: 0 }}>
        <Flex alignItems={'center'}>
          <NextLink href={'/events'} passHref>
            <Link height={'min-content'} display={{ base: 'none', md: 'block' }}>
              <Text display={'flex'} gap={2} alignItems={'center'} width={'20vw'}>
                <HiOutlineReply /> Events
              </Text>
            </Link>
          </NextLink>
          <Flex direction={{ base: 'row', md: 'column' }} flex={1} justify={'space-between'}>
            <Heading size={'md'}>{title}</Heading>
            <Text>{formatIsoDate(dateFrom)}</Text>
          </Flex>
        </Flex>

        <Flex gap={5} alignItems={'center'}>
          {dataMe?.me && !isAuthor && !enrollmentRequestData?.enrollmentRequestOne && (
            <Button bg={'primary'} _hover={{ bg: 'hprimary' }} color={'white'} onClick={handleClick}>
              Request to join
            </Button>
          )}
          {enrollmentRequestData?.enrollmentRequestOne && (
            <EnrollmentRequestState state={enrollmentRequestData.enrollmentRequestOne.state} />
          )}
          {!dataMe?.me && (
            <Text p={3} color={'gray.400'} display={'flex'} gap={4} alignItems={'center'}>
              Sign in to participate <HiLockClosed />
            </Text>
          )}
          {!dataMe?.me ||
            (!isAuthor && (
              <IconButton
                fontSize={'xl'}
                aria-label="Save to favorites"
                variant={'solid'}
                onClick={() => {
                  if (isSaved?.eventIsSaved) {
                    unsaveEvent();
                  } else {
                    saveEvent();
                  }
                }}
                icon={isSaved?.eventIsSaved === true ? <HiBookmark /> : <HiOutlineBookmark />}
              />
            ))}
        </Flex>
      </Flex>
    </SubHeader>
  );
}
