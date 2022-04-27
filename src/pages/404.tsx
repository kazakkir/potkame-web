import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import PrimaryButton from '../components/base/PrimaryButton';
import Footer from '../components/Layout/Footer';
import { MdExplore } from 'react-icons/md';
import { useRouter } from 'next/router';

type Props = {};

export default function Custom404(props: Props) {
  const router = useRouter();
  return (
    <>
      <Box textAlign="center" py={10} px={6} m={'auto'}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400,pink.400)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <Button
          bgGradient={'linear(to-r, red.400,pink.400)'}
          _hover={{
            shadow: 'md',
            opacity: '0.9',
          }}
          _active={{ opacity: '0.9' }}
          color={'white'}
          type={'submit'}
          loadingText={'Signing in'}
          rightIcon={<MdExplore />}
          onClick={() => {
            router.push('/events');
          }}
        >
          Discover events
        </Button>
      </Box>
      <Footer />
    </>
  );
}
