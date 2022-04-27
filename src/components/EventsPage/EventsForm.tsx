import { ApolloQueryResult, QueryLazyOptions } from '@apollo/client';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VisuallyHiddenInput,
  Input,
  InputGroup,
  FormLabel,
  Text,
  Box,
  Button,
  InputLeftElement,
  usePrevious,
  Tag,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../Form/FormInput';
import { HiOutlineChevronDown, HiOutlineSearch } from 'react-icons/hi';
import {
  Category,
  EventManyQuery,
  EventManyQueryVariables,
  useEventManyCitiesLazyQuery,
  useEventManyCitiesQuery,
  useEventManyQuery,
} from '../../generated/graphql';
import { FormSelect } from '../Form/FormSelect';
import { CATEGORIES, CATEGORY_OPTIONS, OptionType } from '../../lib/constants';
import { useEffect, useState } from 'react';
import { getNextDay, getToday } from '../../lib/utils/getNextDay';
import { formatIsoDate } from '../../lib/utils/formatDateTime';
import PrimaryButton from '../base/PrimaryButton';
import { parseUserLocationFromStorage } from '../../lib/utils/parseUserLocationFromStorage';
import { EVENT_FETCH_LIMIT } from '../../pages/events';

type Props = {
  fetch: (options?: QueryLazyOptions<EventManyQueryVariables>) => void;
  refetch: (variables?: EventManyQueryVariables) => void;
};

type FormPayloadType = {
  search?: string;
  category?: Category;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
};

export default function EventsForm({ fetch, refetch }: Props) {
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const { data, loading } = useEventManyCitiesQuery();
  const userCity = parseUserLocationFromStorage()?.city;
  const [currentPayload, setCurrentPayload] = useState<FormPayloadType>({});

  useEffect(() => {
    if (data?.eventManyCities) {
      const options = data.eventManyCities.map((city) => ({
        label: city,
        value: city,
      }));

      setCityOptions(options);
    }
  }, [data?.eventManyCities]);

  const { watch, control, register, handleSubmit, setValue } = useForm<FormPayloadType>();

  const formValues = watch();

  useEffect(() => {
    const variables: EventManyQueryVariables = { pagination: { take: EVENT_FETCH_LIMIT } };

    if (cityOptions.length === 0) {
      return;
    }

    if (userCity && cityOptions.find((o) => o.value === userCity)) {
      fetch({
        variables: { ...variables, filters: { field: 'city', value: userCity } },
      });
    } else {
      fetch({ variables });
    }
  }, [cityOptions, fetch, userCity]);

  const onSubmit = async (data: FormPayloadType) => {
    const variables: EventManyQueryVariables = { search: null, date: null, filters: null };
    if (data.search) {
      variables.search = { field: 'title', value: data.search };
    }

    if (data.category) {
      variables.filters = { field: 'category', value: data.category };
    }

    if (data.city) {
      variables.filters =
        variables.filters && !Array.isArray(variables.filters)
          ? [variables.filters, { field: 'city', value: data.city }]
          : { field: 'city', value: data.city };
    }

    if (data.dateFrom || data.dateTo) {
      variables.date = {
        field: 'dateFrom', // events starting between <data.dateFrom> and <data.dateTo>
        value: {
          gte: data.dateFrom || undefined,
          lt: data.dateTo || undefined,
        },
      };
    }

    console.log(variables);

    setCurrentPayload(data);
    refetch(variables);
  };

  const setToday = () => {
    setValue('dateFrom', getToday());
    setValue('dateTo', getNextDay());
  };

  const setTomorrow = () => {
    const tomorrow = getNextDay();
    const dayAfterTomorrow = getNextDay(new Date(tomorrow));
    setValue('dateFrom', tomorrow);
    setValue('dateTo', dayAfterTomorrow);
  };

  const renderDatepickerLabel = () => {
    if (formValues.dateFrom && formValues.dateTo) {
      return `From ${formatIsoDate(formValues.dateFrom)} to ${formatIsoDate(formValues.dateTo)}`;
    } else if (formValues.dateFrom) {
      return `From ${formatIsoDate(formValues.dateFrom)}`;
    } else if (formValues.dateTo) {
      return `To ${formatIsoDate(formValues.dateTo)}`;
    } else {
      return `Starts from & Starts till`;
    }
  };

  const appliedFilters = Object.values(currentPayload).filter((v) => v && v !== '');

  return (
    <Flex as={'form'} flexDirection={'column'} width={'full'} onSubmit={handleSubmit(onSubmit)} gap={4} zIndex={5}>
      <FormInput name="search" register={register} placeholder={'Search'} isRequired>
        <InputLeftElement color={'gray.400'}>
          <HiOutlineSearch />
        </InputLeftElement>
      </FormInput>
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4 }} alignItems={'center'}>
        <Flex zIndex={10} width={'100%'} justifyItems={'stretch'} gap={4}>
          <FormSelect
            name={'city'}
            control={control}
            options={cityOptions}
            placeholder={'City'}
            width={'100%'}
            defaultSelectValue={userCity ? { label: userCity, value: userCity } : undefined}
            isLoading={loading}
          />
          <FormSelect
            name={'category'}
            control={control}
            options={CATEGORY_OPTIONS}
            placeholder={'Category'}
            width={'100%'}
            isClearable
          />
          <Menu closeOnSelect={false}>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              bg={'white'}
              width={'100%'}
              type={'button'}
            >
              <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'} color={'gray.400'}>
                <Text noOfLines={1} wordBreak={'break-all'}>
                  {renderDatepickerLabel()}
                </Text>
                <HiOutlineChevronDown />
              </Flex>
            </MenuButton>
            <MenuList p={3}>
              <MenuItem command={formatIsoDate(getToday())} onClick={setToday}>
                Today
              </MenuItem>
              <MenuItem command={formatIsoDate(getNextDay())} onClick={setTomorrow}>
                Tomorrow
              </MenuItem>
              <VisuallyHiddenInput />
              <MenuDivider />
              <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                <Input type={'datetime-local'} {...register('dateFrom')} />

                <Input type={'datetime-local'} {...register('dateTo')} />
              </Flex>
              <MenuItem
                onClick={() => {
                  setValue('dateFrom', '');
                  setValue('dateTo', '');
                }}
                justifyContent={'center'}
                mt={5}
              >
                Clear dates
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <PrimaryButton px={6} type={'submit'}>
          Search
        </PrimaryButton>
      </Flex>
      <Flex align={'center'} gap={2} width={'100%'}>
        {currentPayload.search && (
          <Text maxWidth={'30%'} noOfLines={1} wordBreak={'break-all'}>
            Search for <i>&ldquo;{currentPayload.search}&ldquo;</i>
          </Text>
        )}

        <Flex gap={2} display={{ base: 'none', lg: 'flex' }}>
          {(currentPayload.city || userCity) && <Tag rounded={'md'}>City: {currentPayload.city || userCity}</Tag>}
          {currentPayload.category && <Tag rounded={'md'}>Category: {CATEGORIES[currentPayload.category]}</Tag>}
          {currentPayload.dateFrom && <Tag rounded={'md'}>Starts from: {currentPayload.dateFrom}</Tag>}
          {currentPayload.dateTo && <Tag rounded={'md'}>Starts till: {currentPayload.dateTo}</Tag>}
        </Flex>
        <Tag gap={2} display={{ base: 'flex', lg: 'none' }}>
          Filters: {appliedFilters.length}
        </Tag>
      </Flex>
    </Flex>
  );
}
