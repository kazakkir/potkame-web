import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { title } from 'process';
import { DeepMap, FieldError, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export type FormInputProps<TFormValues> = {
  title?: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: DeepMap<TFormValues, FieldError>;
  isTextarea?: boolean;
  children?: React.ReactNode;
  variant?: string;
} & InputProps &
  TextareaProps;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  isTextarea,
  register,
  rules,
  errors,
  isRequired,
  children,
  variant,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = errors ? errors[name]?.message : null;
  const hasError = !!(errors && errorMessages);

  return (
    <FormControl isInvalid={hasError} isRequired={isRequired} variant={variant}>
      {title && <FormLabel>{title}</FormLabel>}
      <InputGroup size="md">
        {isTextarea ? (
          <Textarea name={name} {...props} {...(register && register(name, rules))} bg={'white'} />
        ) : (
          <Input
            name={name}
            {...props}
            {...(register && register(name, rules))}
            isRequired={false} // force disable default popup
            bg={'white'}
            border={'1px solid'}
            borderColor={'gray.200'}
            _focus={{ borderColor: 'none' }}
          />
        )}
        {children}
      </InputGroup>
      {errors && (
        <ErrorMessage
          errors={errors}
          // eslint-disable-next-line
          name={name as any}
          render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
        />
      )}
    </FormControl>
  );
};
