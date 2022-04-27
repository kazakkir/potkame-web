import { Heading, Spinner, VStack } from '@chakra-ui/react';
import { useMeQuery, useEventManySavedQuery } from '../../generated/graphql';
import ExploreGrid from '../EventsPage/ExploreGrid';

type Props = {};

export default function EventsSaved(props: Props) {
  const { data, loading } = useEventManySavedQuery();

  return (
    <VStack px={{ base: 2, md: '10%', lg: '20%' }} mt={{ base: 5, md: 10, lg: 20 }} spacing={10}>
      <Heading>Saved events</Heading>
      {loading ? <Spinner /> : <ExploreGrid events={data?.eventManySaved || []} />}
    </VStack>
  );
}
