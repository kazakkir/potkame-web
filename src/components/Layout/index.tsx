import { Flex } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = { children?: React.ReactNode };

export default function Layout(props: Props) {
  return (
    <>
      <Header />
      <Flex as="main" minHeight={'92vh'} direction={'column'} width={'100%'}>
        {props.children}
      </Flex>
    </>
  );
}
