import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      display={'flex'}
      bg={'primary'}
      color={'white'}
      _hover={{ _disabled: { bg: 'gray.100' }, bg: 'hprimary' }}
      _active={{ bg: 'hprimary' }}
      _disabled={{ bg: 'gray.100', cursor: 'not-allowed' }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
