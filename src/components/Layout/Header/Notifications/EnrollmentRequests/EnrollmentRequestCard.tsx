import { Avatar, Flex, Box, Text, Button, HStack, Link, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  useEnrollmentRequestAcceptOneMutation,
  useEnrollmentRequestDeclineOneMutation,
  useEventOneQuery,
  useUserOneQuery,
} from '../../../../../generated/graphql';
import { HiCheck } from 'react-icons/hi';

type Props = {
  username: string;
  eventId: string;
  removeRequest: () => void;
};

export default function EnrollmentRequestCard({ username, eventId, removeRequest }: Props) {
  const router = useRouter();
  const { data: userData, loading: loadingUser } = useUserOneQuery({
    variables: { username },
  });
  const { data: eventData, loading: loadingEvent } = useEventOneQuery({
    variables: { id: eventId },
  });
  const [acceptRequest] = useEnrollmentRequestAcceptOneMutation({ variables: { username, eventId } });
  const [declineRequest] = useEnrollmentRequestDeclineOneMutation({ variables: { username, eventId } });

  if (!userData?.user || !eventData?.eventOne) {
    return null;
  }

  return (
    <Flex justifyItems={'stretch'} gap={2}>
      <Flex flex={2} gap={2}>
        <Avatar size={'sm'} />
        <Box>
          <Flex alignItems={'center'} gap={2}>
            <Text fontWeight={'bold'}>{userData?.user.name}</Text>
          </Flex>
          <Text fontSize={'sm'} noOfLines={2}>
            wants to participate in{' '}
            <NextLink href={`${router.pathname}/${eventId}`} passHref>
              <Link fontWeight={'bold'}>{eventData.eventOne.title}</Link>
            </NextLink>
          </Text>
          <HStack mt={2}>
            <Button
              display={'flex'}
              size={'sm'}
              variant={'unstyled'}
              color={'gray.500'}
              onClick={() => declineRequest({ variables: { username, eventId } }).then(() => removeRequest())}
            >
              Decline
            </Button>
            <Button
              size={'sm'}
              variant={'outline'}
              color={'primary'}
              rightIcon={<HiCheck />}
              onClick={() => {
                acceptRequest({
                  variables: { username, eventId },
                }).then(() => removeRequest());
              }}
            >
              Accept
            </Button>
          </HStack>
        </Box>
      </Flex>
      <Flex position={'relative'} width={'30%'}>
        {eventData?.eventOne.imageUrl && (
          <Image alt={'Event image'} src={eventData.eventOne.imageUrl} layout={'fill'} objectFit={'contain'} />
        )}
      </Flex>
    </Flex>
  );
}
