import { Flex, FormLabel, Heading, InputGroup, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../../base/PrimaryButton';
import { FormInput } from '../../../Form/FormInput';
import { CreateEventFormFields, useCreateEventStore } from '../../useCreateEventStore';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';
import { FormSelect } from '../../../Form/FormSelect';
import { CATEGORIES, CATEGORY_OPTIONS, OptionType } from '../../../../lib/constants';

export type StepGeneralInput = Pick<CreateEventFormFields, 'title' | 'description' | 'category'>;

export default function StepGeneral() {
  const state = useCreateEventStore(
    (state) => ({
      title: state.payload.title,
      content: state.payload.description,
      category: state.payload.category,
    }),
    shallow
  );
  const updatePayload = useCreateEventStore((state) => state.updatePayload);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepGeneralInput>();

  const onSubmit = (data: StepGeneralInput) => {
    updatePayload(data);
    router.push('./date');
  };

  return (
    <VStack as={'form'} onSubmit={handleSubmit(onSubmit)} gap={5} px={{ base: 2, md: '30%' }}>
      <Heading size={'lg'}>Describe your event</Heading>

      <Flex justifyItems={'stretch'} width={'100%'} alignItems={'flex-end'} gap={10}>
        <FormInput
          name="title"
          errors={errors}
          register={register}
          title={'Title'}
          defaultValue={state.title}
          isRequired
          rules={{
            required: 'Field is required',
            minLength: {
              value: 5,
              message: 'Title must me at least 5 letters long',
            },
            pattern: {
              value: /^[a-z0-9!. ]+$/i,
              message: 'Title can only contain letters, exclamation points, spaces and full stop.',
            },
          }}
          flex={2}
        />
        <FormSelect
          name="category"
          control={control}
          options={CATEGORY_OPTIONS}
          title={'Category'}
          errors={errors}
          isRequired
          defaultSelectValue={CATEGORY_OPTIONS.find((o) => o.value === state.category)}
          rules={{
            required: 'Field is required',
          }}
          flexDirection={'column'}
        />
      </Flex>

      <FormInput
        name="description"
        errors={errors}
        register={register}
        title={'Description'}
        isTextarea
        defaultValue={state.content || ''}
      />

      <PrimaryButton alignSelf={'flex-end'} type={'submit'}>
        Next
      </PrimaryButton>
    </VStack>
  );
}
