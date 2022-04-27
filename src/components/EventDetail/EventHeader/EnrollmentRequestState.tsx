import { EnrollmentRequest, State } from '../../../generated/graphql';
import { Text } from '@chakra-ui/react';
import { HiCheck, HiX } from 'react-icons/hi';

type Props = { state: State };

export default function EnrollmentRequestState({ state }: Props) {
  const renderState = () => {
    switch (state) {
      case State.Processing:
        return (
          <Text
            p={3}
            color={'green.500'}
            display={'flex'}
            gap={2}
            alignItems={'center'}
          >
            Enrollment requested <HiCheck />
          </Text>
        );
      case State.Declined:
        return (
          <Text
            p={3}
            color={'red.500'}
            display={'flex'}
            gap={2}
            alignItems={'center'}
            fontWeight={'bold'}
          >
            Enrollment declined <HiX />
          </Text>
        );
      case State.Accepted:
        return (
          <Text
            p={3}
            color={'green.500'}
            display={'flex'}
            gap={2}
            alignItems={'center'}
          >
            Enrollment accepted <HiCheck />
          </Text>
        );
    }
  };
  return <>{renderState()}</>;
}
