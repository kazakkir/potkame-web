import { Box, Input, List, Stack, useColorModeValue } from '@chakra-ui/react';
import MobileNavItem from './MobileNavItem';

type Props = {};

export default function MobileNav(props: Props) {
  return (
    <Box as={'nav'} p={4} bg={'white'} shadow={'sm'} roundedBottom={'md'}>
      <List as={'ul'} display={{ md: 'none' }} spacing={2}>
        <MobileNavItem href={'/'}>Home</MobileNavItem>
        <MobileNavItem href={'/events'}>Explore</MobileNavItem>
      </List>
    </Box>
  );
}
