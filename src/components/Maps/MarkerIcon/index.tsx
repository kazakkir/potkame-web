import { Flex, Text } from '@chakra-ui/react';
import { Category } from '../../../generated/graphql';
import { CATEGORY_EMOJI } from '../../../lib/constants';

type Props = {
  category: Category;
  onClick: (value: any) => void;
};

export default function MarkerIcon({ category, onClick }: Props) {
  return (
    <Flex
      p={1}
      width={'8'}
      height={8}
      bg={'white'}
      rounded={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      border={'4px solid'}
      borderColor={'primary'}
      onClick={onClick}
      cursor={'pointer'}
    >
      <Text fontSize={'sm'}>{CATEGORY_EMOJI[category]}</Text>
    </Flex>
  );
}
