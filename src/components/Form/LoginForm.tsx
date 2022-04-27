import { useDisclosure, VStack, InputRightElement, IconButton, Button, Text } from '@chakra-ui/react';
import { GraphQLError } from 'graphql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HiEyeOff, HiEye, HiCheckCircle } from 'react-icons/hi';
import { LoginMutationVariables, useLoginMutation, MeDocument } from '../../generated/graphql';
import PrimaryButton from '../base/PrimaryButton';
import { FormInput } from './FormInput';
import { FormPasswordInput } from './FormPasswordInput';

type Props = {};

export default function LoginForm(props: Props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginMutationVariables['data']>();

  const [loginUser, { loading, error, data }] = useLoginMutation({ refetchQueries: [MeDocument, 'me'] });

  const onSubmit: SubmitHandler<LoginMutationVariables['data']> = async (data) => {
    await loginUser({ variables: { data } })
      .catch((e: GraphQLError) => setErrorMessage(e.message))
      .then((res) => {
        if (res) {
          console.log(res);
          router.push('/');
        }
      });
  };

  const isLoginSuccessful = data && data.login ? true : false;

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
        register={register}
        name={'username'}
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
        loadingText={'Signing in'}
        width={'full'}
        disabled={isLoginSuccessful}
        rightIcon={isLoginSuccessful ? <HiCheckCircle /> : undefined}
      >
        {isLoginSuccessful ? `Success` : `Sign in`}
      </Button>
      <Text color={'red.600'}>{errorMessage}</Text>
    </VStack>
  );
}
