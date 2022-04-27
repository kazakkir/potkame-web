import {
  GridItem,
  Heading,
  SimpleGrid,
  VStack,
  Flex,
  List,
  ListIcon,
  ListItem,
  HStack,
  Divider,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,
  Avatar,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import GeneralInformationForm from './GeneralInformationForm';

type Props = {};

export default function Account(props: Props) {
  return (
    <VStack px={{ base: 2, md: '10%', lg: '20%' }} my={{ base: 5, md: 10, lg: 20 }} spacing={10} height={'100%'}>
      <Heading>Account settings</Heading>
      <Tabs width={'100%'} orientation={'vertical'} variant={'unstyled'} flex={1}>
        <TabList flex={1} alignItems={'flex-start'} gap={4}>
          <Tab _selected={{ fontWeight: 'bold' }}>General Information</Tab>
          <Tab _selected={{ fontWeight: 'bold' }}>Social Profiles</Tab>
          <Tab _selected={{ fontWeight: 'bold' }} disabled>
            Security
          </Tab>
        </TabList>

        <Divider orientation="vertical" />
        <TabPanels flex={3} px={4}>
          <TabPanel>
            <GeneralInformationForm />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
