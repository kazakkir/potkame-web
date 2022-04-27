import { Container, Stack, ButtonGroup, IconButton, Text, Flex } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import NextImage from 'next/image';

type Props = {};

export default function Footer(props: Props) {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      p={{ base: '4', md: '6' }}
      bg={'gray.100'}
      width={'100%'}
      justifyContent={'center'}
      mt={'auto'}
    >
      <Stack spacing={{ base: '4', md: '5' }}>
        <Stack justify="space-between" direction="row" align="center">
          <NextImage src="/cvut.svg" height={100} width={100} />
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
              _hover={{ bg: 'gray.50' }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
              _hover={{ bg: 'gray.50' }}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle" align={'center'}>
          &copy; {new Date().getFullYear()} Kirill Kazakov
        </Text>
      </Stack>
    </Flex>
  );
}
