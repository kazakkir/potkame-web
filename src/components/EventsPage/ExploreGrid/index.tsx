import { SimpleGrid, GridItem, SimpleGridProps, Button, VStack, Spinner, Box } from '@chakra-ui/react';
import { EventManyQuery, EventManyQueryVariables } from '../../../generated/graphql';
import ExploreCard from './ExploreCard';
import { InView } from 'react-intersection-observer';
import { ApolloQueryResult } from '@apollo/client';
import { EventManyArray } from '../types';

type Props = {
  events: EventManyArray;
  refetch?: (vars?: EventManyQueryVariables) => void;
  loading?: boolean;
  hasNext?: boolean;
} & SimpleGridProps;

const baseGridLayout = { base: 1, sm: 2, md: 4 };

export default function ExploreGrid({ events, columns, refetch, loading, hasNext, ...rest }: Props) {
  return (
    <SimpleGrid
      {...rest}
      columns={columns || baseGridLayout}
      height={'auto'}
      overflowX={'hidden'}
      overflowY={'auto'}
      pr={{ base: 0, md: 3 }}
      gap={3}
      spacingY={'10px'}
    >
      {events.map((e) => (
        <GridItem key={e.id}>
          <ExploreCard {...e} />
        </GridItem>
      ))}
      {hasNext && (
        <GridItem as={VStack} colSpan={columns || baseGridLayout} justifyItems={'center'}>
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView && hasNext && refetch) {
                refetch();
              }
            }}
          >
            <Box pb={10} />
          </InView>
        </GridItem>
      )}
    </SimpleGrid>
  );
}
