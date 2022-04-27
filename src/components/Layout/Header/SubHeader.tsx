import { Flex } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

export default function SubHeader({ children }: Props) {
  return (
    <Flex
      alignItems={'center'}
      minH={{ base: 'auto', md: '8vh' }}
      position={'sticky'}
      top={'0'}
      bg={'white'}
      zIndex={5}
      pl={{ base: 5, md: 10 }}
      pr={{ base: 5, md: '20vw' }}
      px={{ base: 4 }}
      shadow={'md'}
      justifyContent={'space-between'}
      width={'100%'}
      py={3}
    >
      {children}
    </Flex>
  );
}
