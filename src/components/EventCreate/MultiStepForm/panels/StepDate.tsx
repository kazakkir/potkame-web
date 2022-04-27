import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../../base/PrimaryButton';
import { FormInput } from '../../../Form/FormInput';
import {
  CreateEventFormFields,
  useCreateEventStore,
} from '../../useCreateEventStore';
import shallow from 'zustand/shallow';
import { useRouter } from 'next/router';

type DateFromDateToInput = Pick<CreateEventFormFields, 'dateFrom' | 'dateTo'>;

export default function StepDate() {
  const state = useCreateEventStore(
    (state) => ({
      dateFrom: state.payload.dateFrom,
      dateTo: state.payload.dateTo,
    }),
    shallow
  );
  const updatePayload = useCreateEventStore((state) => state.updatePayload);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateFromDateToInput>();

  const router = useRouter();

  const onSubmit = (data: DateFromDateToInput) => {
    updatePayload(data);
    router.push('./location');
  };

  const watchDates = watch();

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      gap={5}
      px={{ base: 2, md: '30%' }}
    >
      <Heading size={'lg'}>Choose dates</Heading>
      {errors.dateTo && <p>End date must be later than start</p>}
      <Flex gap={10} width={'100%'} direction={{ base: 'column', xl: 'row' }}>
        <FormInput
          name="dateFrom"
          errors={errors}
          register={register}
          title={'Start'}
          type={'datetime-local'}
          isRequired
          defaultValue={state.dateFrom}
          rules={{
            required: 'Field is required',
          }}
        />

        <FormInput
          name="dateTo"
          errors={errors}
          register={register}
          title={'End'}
          type={'datetime-local'}
          defaultValue={state.dateTo}
          rules={{
            validate: (startDate) =>
              !startDate || new Date(startDate) > new Date(watchDates.dateFrom),
          }}
        />
      </Flex>

      <Flex
        justifyContent={'flex-end'}
        alignItems={'center'}
        gap={4}
        width={'full'}
      >
        <Button variant={'outline'} onClick={() => router.push('./general')}>
          Previous
        </Button>

        <PrimaryButton type={'submit'}>Next</PrimaryButton>
      </Flex>
    </VStack>
  );
}
