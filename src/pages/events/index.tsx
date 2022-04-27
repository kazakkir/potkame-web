import { ApolloQueryResult, QueryLazyOptions } from '@apollo/client';
import { Center, Flex, Heading, Skeleton, Spinner, Tag, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import EventsForm from '../../components/EventsPage/EventsForm';
import EventsGrid from '../../components/EventsPage/ExploreGrid';
import ModalAllowLocation from '../../components/EventsPage/ModalAllowLocation';
import { EventManyDocument, EventManyQueryVariables, useEventManyLazyQuery } from '../../generated/graphql';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';

const ExploreMap = dynamic(() => import('../../components/EventsPage/ExploreMap'), {
  ssr: false,
});

export const EVENT_FETCH_LIMIT = 12;

const Events: NextPage = () => {
  const [fetchEvents, { data, refetch: refetchEvents, fetchMore, loading }] = useEventManyLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    if (data?.eventMany?.events) {
      setHasNext(data.eventMany.events.length > 0);
    }
  }, [data?.eventMany]);

  const handleFetchMore = async () => {
    if (data?.eventMany?.events && data.eventMany.events.length > 0) {
      const cursor = data.eventMany.events[data.eventMany.events.length - 1].id;

      await fetchMore({
        variables: {
          pagination: { take: EVENT_FETCH_LIMIT, cursor },
        },
        updateQuery: (pv, { fetchMoreResult }) => {
          if (!pv || !pv.eventMany || !fetchMoreResult || !fetchMoreResult.eventMany) {
            setHasNext(false);
            return pv;
          }

          if (!fetchMoreResult.eventMany.events || fetchMoreResult.eventMany.events.length < EVENT_FETCH_LIMIT) {
            setHasNext(false);
          }

          return {
            eventMany: {
              events: [...(pv.eventMany.events ?? []), ...(fetchMoreResult.eventMany.events ?? [])],
              totalCount: fetchMoreResult.eventMany.totalCount,
            },
          };
        },
      });
    }
  };

  return (
    <>
      <ModalAllowLocation />
      <Flex>
        <Flex
          px={{ base: 2, md: 10 }}
          py={{ base: 2, md: 5 }}
          height={{ md: '92vh' }}
          alignContent={'space-evenly'}
          flex={3}
          flexDirection={'column'}
          gap={5}
        >
          <EventsForm fetch={fetchEvents} refetch={refetchEvents} />
          <Flex alignItems={'center'} gap={4} justifyContent={'space-between'}>
            <Skeleton isLoaded={data?.eventMany !== undefined}>
              <Heading size={'md'}>
                {data?.eventMany?.totalCount && data.eventMany.totalCount > 0
                  ? `Search results: ${data?.eventMany?.totalCount}`
                  : `No available events`}
              </Heading>
            </Skeleton>
            {loading && <Spinner size={'sm'} />}
          </Flex>

          <EventsGrid
            events={data?.eventMany?.events || []}
            refetch={() => handleFetchMore()}
            loading={loading}
            hasNext={hasNext}
          />
        </Flex>
        <Center
          as={'section'}
          height={'92vh'}
          display={{ base: 'none', xl: 'flex' }}
          width={'35vw'}
          zIndex={0}
          position={'relative'}
        >
          <ExploreMap events={data?.eventMany?.events || []} />
        </Center>
      </Flex>
    </>
  );
};

export default Events;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EventManyDocument,
    variables: {
      pagination: {
        take: EVENT_FETCH_LIMIT,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
