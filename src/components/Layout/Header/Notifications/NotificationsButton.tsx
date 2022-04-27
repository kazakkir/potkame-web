import { Link, PopoverTrigger } from '@chakra-ui/react';
import { HiBell } from 'react-icons/hi';

type Props = {
  hasUpdates: boolean;
};

export default function NotificationsButton({ hasUpdates }: Props) {
  return (
    <PopoverTrigger>
      <Link
        variant={'button'}
        fontSize={'2xl'}
        position={'relative'}
        _before={
          hasUpdates
            ? {
                content: "''",
                width: 2.5,
                height: 2.5,
                position: 'absolute',
                rounded: 'full',
                bg: 'primary',
                right: 0,
              }
            : {}
        }
      >
        <HiBell />
      </Link>
    </PopoverTrigger>
  );
}
