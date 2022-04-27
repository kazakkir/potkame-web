import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import PrimaryButton from '../../../../base/PrimaryButton';
import { useCreateEventStore } from '../../../useCreateEventStore';
import MapPickLocation from './MapPickLocation';

export type Coordinates = {
  lat: number;
  lng: number;
};

export default function StepLocation() {
  const { isLocationFilled, address } = useCreateEventStore(
    (state) => ({
      isLocationFilled: state.isLocationFilled,
      address: state.payload.address,
    }),
    shallow
  );
  const router = useRouter();
  return (
    <VStack gap={5} px={{ base: 2, md: '30%' }}>
      <Heading size={'lg'}>Peek location</Heading>

      <Box
        style={{ width: '100%', height: '300px' }}
        id="map"
        position={'relative'}
      >
        <MapPickLocation />
      </Box>

      <Flex alignSelf={'flex-end'} alignItems={'center'} gap={4}>
        <Button variant={'outline'} onClick={() => router.push('./date')}>
          Previous
        </Button>

        <PrimaryButton
          alignSelf={'flex-end'}
          onClick={() => router.push('./image')}
          isDisabled={!isLocationFilled}
        >
          Next
        </PrimaryButton>
      </Flex>
    </VStack>
  );
}
