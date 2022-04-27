import { Stack, Heading, Text, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';
import AuthWrapper from '../components/AuthWrapper';
import PrimaryButton from '../components/base/PrimaryButton';
import { FormInput } from '../components/Form/FormInput';
import NextLink from 'next/link';
import RegistrationForm from '../components/Form/RegistrationForm';

type Props = {};

export default function Register(props: Props) {
  return (
    <AuthWrapper>
      <Stack spacing="6">
        {/* <Logo /> */}
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={'lg'}>Create new account</Heading>
          <Flex gap={2}>
            <Text>Already have an account?</Text>{' '}
            <NextLink href={'/login'} passHref>
              <Link bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontWeight={'bold'}>
                Sign in here!
              </Link>
            </NextLink>
          </Flex>
        </Stack>
      </Stack>
      <RegistrationForm />
    </AuthWrapper>
  );
}
