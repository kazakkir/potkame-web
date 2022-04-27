import { Flex, Box, Text, Link } from '@chakra-ui/react';
import { Event } from '../../../generated/graphql';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type Props = Pick<Event, 'id' | 'imageUrl' | 'title'>;

export default function ExploreCardPopup({ id, imageUrl, title }: Props) {
  const router = useRouter();
  return (
    <Flex width={200}>
      {imageUrl && (
        <Box position={'relative'} height={'auto'} width={'50%'}>
          <NextImage layout="fill" src={imageUrl} objectFit={'cover'} />
        </Box>
      )}
      <Box p={2}>
        <Text fontWeight={'bold'} fontSize={'md'}>
          {title}
        </Text>
        <NextLink href={`${router.pathname}/${id}`} passHref>
          <Link color={'primary'} fontWeight={'md'}>
            View details
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
}
