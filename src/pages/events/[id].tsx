import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import EventBody from '../../components/EventDetail/EventBody';
import EventContent from '../../components/EventDetail/EventBody/EventContent';
import EventSideInfo from '../../components/EventDetail/EventBody/EventSideInfo';
import EventHeader from '../../components/EventDetail/EventHeader';
import Footer from '../../components/Layout/Footer';
import { EventOneDocument, useEventOneQuery, useMeQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function EventPage(props: any) {
  const router = useRouter();
  const eventId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, loading } = useEventOneQuery({ variables: { id: eventId } });

  let body;
  if (loading) {
  } else if (!data || !data.eventOne) {
  } else {
    const { title, dateFrom, description, imageUrl, authorUsername, participants, ...sideInfoProps } = data.eventOne;
    body = (
      <>
        <Flex direction={'column'} flex={1}>
          <EventHeader title={title} dateFrom={dateFrom} authorUsername={authorUsername} />
          <Flex
            gap={5}
            mt={8}
            px={{ base: 4, md: '20vw' }}
            pb={20}
            ml={{ md: 10 }}
            justifyContent={'space-between'}
            direction={{ base: 'column', xl: 'row' }}
          >
            <EventContent description={description} imageUrl={imageUrl} />
            <EventSideInfo {...sideInfoProps} dateFrom={dateFrom} authorUsername={authorUsername} />
            <Box display={{ xl: 'none' }}>
              <Heading size={'md'} mb={4}>
                Details
              </Heading>
              <Text wordBreak={'break-word'}>{description}</Text>
            </Box>
          </Flex>
        </Flex>{' '}
        <Footer />
      </>
    );
  }
  return <>{body}</>;
}

export async function getServerSideProps(context: any) {
  const eventId = context.params.id;
  const apolloClient = initializeApollo();

  return await apolloClient
    .query({
      query: EventOneDocument,
      variables: { id: eventId },
    })
    .then(() => {
      return addApolloState(apolloClient, {
        props: {},
      });
    })
    .catch(() => {
      return { notFound: true };
    });
}
