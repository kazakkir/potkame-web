import { Heading, VStack, Text } from '@chakra-ui/react';
import Footer from '../components/Layout/Footer';

type Props = {};

export default function About(props: Props) {
  return (
    <>
      <VStack px={{ base: 2, md: '10%', lg: '25%' }} mt={{ base: 5, md: 10, lg: 20 }} spacing={10}>
        <Heading>Project motivation</Heading>
        <Text textAlign={'center'}>
          Recent european researches show the gradual increase of lonely and socially isolated people across the whole
          Europe and, especially, in the Czech Republic. These mental health problems are very close to my heart because
          I have experienced them myself. Studying software engineering led me to the idea of implementing an
          application that would make it easier to find new acquaintances through the organization of joint events. It
          can help some people to cope with loneliness.
        </Text>
      </VStack>
      <Footer />
    </>
  );
}
