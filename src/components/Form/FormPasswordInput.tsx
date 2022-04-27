import { InputRightElement, IconButton, useDisclosure } from '@chakra-ui/react';
import { HiEyeOff, HiEye } from 'react-icons/hi';
import { FormInput, FormInputProps } from './FormInput';

export const FormPasswordInput = <TFormValues extends Record<string, unknown>>(props: FormInputProps<TFormValues>) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <FormInput {...props} type={isOpen ? 'text' : 'password'}>
      <InputRightElement>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEye /> : <HiEyeOff />}
            onClick={onToggle}
          />
        </InputRightElement>
      </InputRightElement>
    </FormInput>
  );
};
