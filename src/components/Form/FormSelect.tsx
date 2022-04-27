import {
  Box,
  Center,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputGroupProps,
  InputProps,
  SelectProps,
  Spinner,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  Path,
  PathValue,
  RegisterOptions,
  UnpackNestedValue,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Select, {
  Options,
  DropdownIndicatorProps,
  components,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from 'react-select';
import { OptionType } from '../../lib/constants';
import { HiOutlineChevronDown } from 'react-icons/hi';

type Props<TFormValues> = {
  title?: string;
  name: Path<TFormValues>;
  control: Control<TFormValues, any>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  options: Options<any>;
  isRequired?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  defaultSelectValue?: OptionType;
  isLoading?: boolean;
} & InputGroupProps;

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return <Spinner size={'sm'} />;
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <HiOutlineChevronDown />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = ({ innerProps }: IndicatorSeparatorProps) => null;

export const FormSelect = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  rules,
  errors,
  isRequired,
  options,
  control,
  isMulti,
  isClearable,
  defaultSelectValue,
  placeholder,
  isLoading,
  ...rest
}: Props<TFormValues>): JSX.Element => {
  const errorMessages = errors ? errors[name]?.message : null;
  const hasError = !!(errors && errorMessages);

  return (
    <FormControl isInvalid={hasError} isRequired={isRequired}>
      {title && <FormLabel htmlFor={'select'}>{title}</FormLabel>}
      <InputGroup size="md" {...rest} flexDirection={'column'}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          defaultValue={defaultSelectValue?.value as UnpackNestedValue<PathValue<TFormValues, Path<TFormValues>>>}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <Select
                ref={ref}
                options={options}
                value={options.find((c) => c.value === value)}
                onChange={(val) => {
                  onChange(val ? val.value : undefined);
                }}
                isMulti={isMulti}
                isClearable={isClearable}
                components={{ DropdownIndicator, IndicatorSeparator, LoadingIndicator }}
                placeholder={placeholder}
                isLoading={isLoading}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: '1px solid #E2E8F0',
                    boxShadow: 'none',
                    borderRadius: '5px',
                    padding: 1.5,
                    color: '#A0AEC0',
                    ':hover': {
                      borderColor: 'inherit',
                      cursor: 'pointer',
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#A0AEC0',
                  }),
                }}
              />
            </>
          )}
        />
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
