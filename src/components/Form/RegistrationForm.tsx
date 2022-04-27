import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Text,
  Link,
  IconButton,
} from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MeDocument, RegisterMutationVariables, useRegisterMutation } from '../../generated/graphql';
import NextLink from 'next/link';
import { FormInput } from './FormInput';
import { HiEyeOff, HiEye, HiCheckCircle } from 'react-icons/hi';
import { FormPasswordInput } from './FormPasswordInput';
import PrimaryButton from '../base/PrimaryButton';
import { GraphQLError } from 'graphql';

type Props = {};

export default function RegistrationForm(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterMutationVariables['data']>();

  const [registerUser, { error, data }] = useRegisterMutation({
    refetchQueries: [MeDocument, 'me'],
  });

  const onSubmit: SubmitHandler<RegisterMutationVariables['data']> = async (data) => {
    await registerUser({ variables: { data } })
      .catch((e: GraphQLError) => setErrorMessage(e.message))
      .then((res) => {
        if (res) {
          console.log(res);
          router.push('/');
        }
      });
  };

  const isRegistrationSuccessful = data && data.register ? true : false;

  return (
    <VStack
      as="form"
      shadow={{ base: 'none', md: 'md' }}
      p={10}
      spacing={'1.5rem'}
      rounded={'md'}
      onSubmit={handleSubmit(onSubmit)}
      bg={{ base: 'transparent', lg: 'white' }}
      width={{ base: '100%', md: 'auto' }}
    >
      <FormInput
        name={'name'}
        register={register}
        title={'Name'}
        isRequired
        errors={errors}
        rules={{
          required: 'Provide your name, please',
          minLength: { value: 2, message: 'Name must be at least 2 letters long' },
        }}
      />
      <FormInput
        name={'username'}
        register={register}
        title={'Username'}
        isRequired
        errors={errors}
        rules={{
          required: 'Type a username, please',
          minLength: { value: 5, message: 'Password must be at least 5 letters long' },
        }}
      />
      <FormPasswordInput
        name={'password'}
        register={register}
        title={'Password'}
        isRequired
        errors={errors}
        rules={{
          required: 'Type a password, please',
          minLength: { value: 5, message: 'Password must be at least 5 characters long' },
        }}
      />

      <Button
        bgGradient={'linear(to-r, red.400,pink.400)'}
        _hover={{
          shadow: 'md',
          opacity: '0.9',
        }}
        _active={{ opacity: '0.9' }}
        color={'white'}
        type={'submit'}
        isLoading={isSubmitting}
        loadingText={'Creating'}
        width={'full'}
        disabled={isRegistrationSuccessful}
        rightIcon={isRegistrationSuccessful ? <HiCheckCircle /> : undefined}
      >
        {isRegistrationSuccessful ? `Success` : `Create account`}
      </Button>
      <Text color={'red.600'}>{errorMessage}</Text>
    </VStack>
  );
}
