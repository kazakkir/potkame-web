import { Box, VStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import NextImage from 'next/image';
import { Event } from '../../../../generated/graphql';

type Props = Pick<Event, 'address' | 'longitude' | 'latitude'>;

export default function StaticMap({ address, longitude, latitude }: Props) {
  const customLoader = ({ src }: { src: string }) => {
    return src;
  };

  const mapParams = {
    width: 300,
    height: 200,
    markerColor: 'ed65a6',
  };

  return (
    <Box bg={'white'} shadow={'md'} rounded={'lg'} p={3}>
      <Text fontSize={'lg'} fontWeight={'bold'} mb={2} display={'flex'} gap={2} alignItems={'center'}>
        <HiOutlineLocationMarker />
        Address
      </Text>
      <VStack spacing={4}>
        <Text>{address}</Text>
        <LinkBox
          position={'relative'}
          width={mapParams.width}
          height={mapParams.height}
          rounded={'md'}
          overflow={'hidden'}
        >
          <LinkOverlay href={`http://www.google.com/maps/place/${latitude},${longitude}`} target={'_blank'}>
            <NextImage
              loader={customLoader}
              src={`https://api.mapbox.com/styles/v1/kazakovkirilliy/cl1ezg2vy003l15qsx7o78fjp/static/pin-s+${mapParams.markerColor}(${longitude},${latitude})/${longitude},${latitude},14,0/${mapParams.width}x${mapParams.height}?access_token=${process.env.MAPS}`}
              layout={'fill'}
              objectFit={'cover'}
            />
          </LinkOverlay>
        </LinkBox>
      </VStack>
    </Box>
  );
}
