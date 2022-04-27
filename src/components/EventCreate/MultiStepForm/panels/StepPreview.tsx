import { Heading, VStack, Text, Flex } from '@chakra-ui/react';
import { useMeQuery } from '../../../../generated/graphql';
import EventContent from '../../../EventDetail/EventBody/EventContent';
import EventSideInfo from '../../../EventDetail/EventBody/EventSideInfo';
import { useCreateEventStore } from '../../useCreateEventStore';

export default function StepPreview() {
  const { data } = useMeQuery();
  const payload = useCreateEventStore((state) => state.payload);
  const uploadedFile = useCreateEventStore((state) => state.uploadedFile);

  return (
    <VStack gap={5} px={{ md: '20%' }}>
      <Heading size={'lg'}>Check event preview</Heading>
      <Text px={{ base: 4, md: 0 }} textAlign={{ base: 'center', xl: 'left' }}>
        If everything is great, tap the &ldquo;Create&ldquo; button at the top
      </Text>

      <Flex
        alignItems={'center'}
        minH={{ base: 'auto', md: '8vh' }}
        top={'0'}
        bg={'white'}
        pl={{ base: 5, md: 10 }}
        pr={{ base: 5, md: '20vw' }}
        px={{ base: 4 }}
        shadow={'md'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Heading size={'md'}>{payload.title}</Heading>
      </Flex>
      <Flex
        gap={5}
        mt={8}
        px={{ base: 4, md: 0 }}
        pb={20}
        ml={{ md: 10 }}
        justifyContent={'space-between'}
        width={'full'}
        direction={{ base: 'column', xl: 'row' }}
      >
        <EventContent
          description={payload.description}
          imageUrl={uploadedFile ? URL.createObjectURL(uploadedFile) : null}
        />
        <EventSideInfo {...payload} authorUsername={data?.me?.username || ''} />
      </Flex>
    </VStack>
  );
}
