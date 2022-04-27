import { Avatar, Flex, Box, Text, Button, HStack, Link, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useUserOneQuery, useEventOneQuery, State, Event } from '../../../../../generated/graphql';

type Props = {
  eventId: string;
  state: State;
  removeResponse: () => void;
};

export default function EnrollmentResponseCard({ eventId, state, removeResponse }: Props) {
  const [event, setEvent] = useState<Pick<Event, 'imageUrl' | 'title' | 'authorUsername'> | null>(null);
  const { data: eventData, loading: loadingEvent } = useEventOneQuery({
    variables: { id: eventId },
  });

  useEffect(() => {
    const event = eventData?.eventOne;
    if (event) {
      setEvent({ authorUsername: event.authorUsername, title: event.title, imageUrl: event.imageUrl });
    }
  }, [eventData?.eventOne]);

  return (
    <Skeleton isLoaded={!loadingEvent} width={'100%'}>
      <Flex justifyItems={'stretch'} gap={2}>
        <Flex flex={2} gap={2}>
          <Box>
            <Text fontSize={'sm'}>Your enrollment request was {state.toLowerCase()} by the host.</Text>
            <Button mt={2} size={'sm'} variant={'outline'} rightIcon={<HiCheck />} onClick={() => removeResponse()}>
              Mark as read
            </Button>
          </Box>
        </Flex>
        <Flex position={'relative'} width={'30%'}>
          {event?.imageUrl && <Image alt={'Event image'} src={event.imageUrl} layout={'fill'} objectFit={'contain'} />}
        </Flex>
      </Flex>
    </Skeleton>
  );
}
