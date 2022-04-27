import { Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import ManageEventCard from '../../components/Manage/ManageEventCard';
import { EventManyCreatedDocument, useEventManyCreatedQuery, useMeQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function Manage() {
  const { data, loading, error } = useEventManyCreatedQuery();
  const renderCreatedEvents = () => {
    if (loading) {
      return <Spinner />;
    } else if (error) {
      return <Text>Something went wrong...</Text>;
    } else if (!data || !data.eventManyCreated) {
      return <Text>No events created yet</Text>;
    } else {
      return (
        <>
          {data.eventManyCreated.map((e) => (
            <ManageEventCard key={e.id} event={e} />
          ))}
        </>
      );
    }
  };
  return (
    <VStack px={{ base: 2, md: '10%', lg: '20%' }} mt={{ base: 5, md: 10, lg: 20 }} spacing={5}>
      <Heading>Created events</Heading>
      {renderCreatedEvents()}
    </VStack>
  );
}

export async function getServerSideProps({ req }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EventManyCreatedDocument,
    context: {
      headers: req.headers,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
