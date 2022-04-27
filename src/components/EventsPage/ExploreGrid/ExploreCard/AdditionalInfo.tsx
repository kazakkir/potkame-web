import { Flex, Tag, IconButton } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Category, useSaveEventMutation } from '../../../../generated/graphql';
import { CATEGORIES } from '../../../../lib/constants';

type Props = { category: Category; eventId: string };

export default function AdditionalInfo({ category }: Props) {
  return (
    <Flex display={'none'} _peerHover={{ display: 'flex' }} position={'absolute'} top={0} p={2}>
      <Tag
        top={3}
        left={3}
        fontSize={{ base: 'xs', md: 'sm' }}
        p={2}
        userSelect={'none'}
        cursor={'pointer'}
        fontWeight={'bold'}
        backdropBlur={'3xl'}
        bg={'white'}
      >
        {CATEGORIES[category]}
      </Tag>
    </Flex>
  );
}
