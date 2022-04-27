import { Flex, Avatar, Button, Input, VisuallyHiddenInput, InputGroup, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMeQuery } from '../../../generated/graphql';
import ProfileImageInput from './ProfileImageInput';

type Props = {};

export default function GeneralInformationForm(props: Props) {
  const { data } = useMeQuery();
  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ name: string; username: string; imageUrl: string }>();

  return (
    <>
      <Flex as={'form'} alignItems="center" mt={1}>
        <ProfileImageInput />
      </Flex>
    </>
  );
}
