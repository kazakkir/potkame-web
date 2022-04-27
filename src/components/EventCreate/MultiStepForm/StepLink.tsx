import React, { ReactElement } from 'react';
import NextLink from 'next/link';
import { Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export type Step = {
  icon: ReactElement<any, any>;
  isDisabled: boolean;
  isFilled: boolean;
  isLast?: boolean;
  href: string;
};

export default function StepLink(props: Step) {
  const { icon, isFilled, href, isDisabled, isLast } = props;
  const router = useRouter();

  const isActive = href.slice(2, href.length) === router.query.step;

  return (
    <Center
      position={'relative'}
      width={'100%'}
      _after={
        !isLast
          ? {
              content: "''",
              width: '100%',
              bg: isFilled ? 'primary' : 'gray.200',
              position: 'absolute',
              height: '1px',
              top: '50%',
              left: '50%',
              zIndex: -2,
            }
          : {}
      }
    >
      <NextLink href={href} passHref>
        <Button
          rounded={'full'}
          width={50}
          height={50}
          outline={'2px solid'}
          outlineColor={isFilled ? 'primary' : 'gray.200'}
          fontSize={'xl'}
          isDisabled={isDisabled}
          _disabled={{
            bg: 'gray.100',
            color: 'gray.400',
            zIndex: -1,
          }}
          aria-label={'asdasd'}
          isActive={isActive}
          _active={{
            bg: 'primary',
            color: 'white',
            outlineColor: 'transparent',
          }}
        >
          {icon}
        </Button>
      </NextLink>
    </Center>
  );
}
