import {
  HiOutlinePencilAlt,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlinePhotograph,
} from 'react-icons/hi';
import { useCreateEventStore } from '../useCreateEventStore';
import shallow from 'zustand/shallow';

import StepLink, { Step } from './StepLink';
import { Flex } from '@chakra-ui/react';

type Props = {};

export default function StepNavigation(props: Props) {
  const state = useCreateEventStore(
    (state) => ({
      title: state.payload.title,
      dateFrom: state.payload.dateFrom,
      isLocationFilled: state.isLocationFilled,
      uploadedFile: state.uploadedFile,
    }),
    shallow
  );

  const steps: Step[] = [
    {
      icon: <HiOutlinePencilAlt />,
      isFilled: state.title !== '',
      isDisabled: false,
      href: `./general`,
    },
    {
      icon: <HiOutlineCalendar />,
      isFilled: state.dateFrom !== '',
      isDisabled: !state.title,
      href: `./date`,
    },
    {
      icon: <HiOutlineLocationMarker />,
      isFilled: state.isLocationFilled(),
      isDisabled: !state.title || !state.dateFrom,
      href: `./location`,
    },
    {
      icon: <HiOutlinePhotograph />,
      isFilled: state.uploadedFile !== null,
      isDisabled: !state.title || !state.dateFrom || !state.isLocationFilled(),
      href: `./image`,
    },
    {
      icon: <HiOutlineCheckCircle />,
      isFilled: false,
      isDisabled: !state.title || !state.dateFrom || !state.isLocationFilled(),
      href: `./preview`,
      isLast: true,
    },
  ];

  return (
    <Flex as={'nav'} px={{ base: 2, md: '30%' }}>
      <Flex as={'ul'} flex={1} justifyContent={'space-between'}>
        {steps.map((step, i) => (
          <StepLink key={`form-step-${i}`} {...step} />
        ))}
      </Flex>
    </Flex>
  );
}
