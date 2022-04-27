import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { geocodeReverse } from '../../lib/utils/geocodeReverse';
import {
  LOCATION_DECLINED,
  USER_LOCATION,
  parseUserLocationFromStorage,
} from '../../lib/utils/parseUserLocationFromStorage';

export default function ModalAllowLocation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [geolocationNotAllowed, setGeolocationNotAllowed] = useState(true);

  useEffect(() => {
    const userLocation = parseUserLocationFromStorage();

    if (!userLocation) {
      setGeolocationNotAllowed(false);

      onOpen();
    }
  }, [onOpen]);

  const handleDecline = () => {
    onClose();
    if (typeof window === 'object') {
      localStorage.setItem(LOCATION_DECLINED, 'true');
    }
  };

  const requestLocationAccess = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (pos.coords) {
          const a = geocodeReverse(pos.coords.longitude, pos.coords.latitude, 'place');
          a.then((res) => {
            const city = res.data.features[0] ? res.data.features[0].text : undefined;
            localStorage.setItem(
              USER_LOCATION,
              JSON.stringify({
                city,
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
              })
            );
            onClose();
          });
        }
      }, handleDecline);
    }
  };

  return (
    <>
      <Modal blockScrollOnMount={true} closeOnOverlayClick={geolocationNotAllowed} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody as={Center} flexDirection={'column'} gap={10} p={10}>
            <VStack>
              <Heading size={'4xl'} color={'gray.400'} alignContent={'center'}>
                <HiLocationMarker />
              </Heading>
              <Heading size={'2xl'} color={'gray.400'} alignContent={'center'}>
                Geolocation
              </Heading>
            </VStack>

            <Text align={'center'} fontSize={'lg'}>
              {geolocationNotAllowed
                ? `Location is blocked. You can enable it in browser settings.`
                : `We use geolocation to ensure that we offer you the best experience while browsing our website.`}
            </Text>
          </ModalBody>

          {!geolocationNotAllowed && (
            <ModalFooter>
              <Button variant={'ghost'} mr={3} onClick={handleDecline}>
                Decline
              </Button>
              <Button
                bgGradient={'linear(to-r, red.400,pink.400)'}
                _hover={{
                  shadow: 'md',
                  opacity: '0.9',
                }}
                _active={{ opacity: '0.9' }}
                color={'white'}
                width={'full'}
                onClick={requestLocationAccess}
              >
                Give access
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
