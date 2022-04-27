import { VStack } from '@chakra-ui/react';
import React from 'react';
import Footer from '../Layout/Footer';

type Props = { children?: React.ReactNode };

export default function AuthWrapper({ children }: Props) {
  return (
    <>
      <VStack spacing="6" m={'auto'} p={10}>
        {children}
      </VStack>
      <Footer />
    </>
  );
}
