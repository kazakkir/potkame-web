import {
  useDisclosure,
  Stack,
  Flex,
  useColorModeValue,
  Icon,
  Text,
  ListItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import NextLink from 'next/link';
import { HiOutlineChevronDown } from 'react-icons/hi';

type Props = {
  href: string;
  children?: React.ReactNode;
};

export default function MobileNavItem(props: Props) {
  return (
    <ListItem
      mb={3}
      _hover={{
        textDecoration: 'none',
      }}
    >
      <NextLink href={props.href} passHref>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {props.children}
        </Text>
      </NextLink>
    </ListItem>
  );
}
