import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaHandPeace } from 'react-icons/fa';
import { HiOutlineMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { useEnrollmentRequestedSubscription, useMeQuery } from '../../../generated/graphql';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Notifications from './Notifications';
import UserSection from './UserSection';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { data } = useMeQuery();
  const router = useRouter();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        height={'8vh'}
        py={{ base: 2 }}
        px={{ base: 4, md: 10 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt2 />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            size={'lg'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={'center'}>
          <NextLink href={'/events'} passHref>
            <Link bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontWeight={'bold'}>
              Potka
            </Link>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* Right section */}
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6} alignItems={'center'}>
          {data && data.me ? (
            <>
              <Notifications />
              <UserSection name={data.me.name} username={data.me.username} imageUrl={data.me.imageUrl} />
              <NextLink href={'/events/create/general'} passHref>
                <Link
                  as={Button}
                  display={{
                    base: 'none',
                    md: router.pathname.includes('/events/create/') ? 'none' : 'inline-flex',
                  }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'primary'}
                  _hover={{
                    bg: 'hprimary',
                  }}
                >
                  Create event
                </Link>
              </NextLink>
            </>
          ) : (
            <>
              <NextLink href={'/login'} passHref>
                <Button variant={'link'} fontSize={'sm'} fontWeight={400}>
                  Sign In
                </Button>
              </NextLink>
              <NextLink href={'/register'} passHref>
                <Link
                  as={Button}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'primary'}
                  _hover={{
                    bg: 'hprimary',
                  }}
                >
                  Sign up
                </Link>
              </NextLink>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
