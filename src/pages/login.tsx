import { Flex, Heading, Stack, Text, Link } from '@chakra-ui/react';

import React from 'react';

import NextLink from 'next/link';
import AuthWrapper from '../components/AuthWrapper';
import LoginForm from '../components/Form/LoginForm';

export default function Login() {
  return (
    <AuthWrapper>
      <Stack spacing="6">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={'lg'}>Log in to your account</Heading>
          <Flex gap={2} justify={'center'} flexDirection={{ base: 'column', lg: 'row' }}>
            <Text>Don&apos;t have an account?</Text>{' '}
            <NextLink href={'/register'} passHref>
              <Link bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontWeight={'bold'}>
                Sign up!
              </Link>
            </NextLink>
          </Flex>
        </Stack>
      </Stack>
      <LoginForm />
    </AuthWrapper>
  );
}
