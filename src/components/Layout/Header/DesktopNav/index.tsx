import { useColorModeValue, Stack, Box, Flex, ListItem, List, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

type LinkType = {
  label: string;
  href: string;
};

const links: LinkType[] = [
  {
    label: 'Explore',
    href: '/events',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export default function DesktopNav(props: Props) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const router = useRouter();

  return (
    <Box as={'nav'}>
      <List as={'ul'} display={'flex'} alignItems={'center'} gap={6}>
        {links.map((l) => (
          <NextLink href={l.href} passHref key={l.label}>
            <ListItem
              as={Link}
              p={2}
              fontSize={'sm'}
              fontWeight={router.pathname.startsWith(l.href) ? 700 : 500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
              borderBottom={'3px solid'}
              borderColor={router.pathname.startsWith(l.href) ? 'pink.300' : 'transparent'}
            >
              {l.label}
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Box>
  );
}
