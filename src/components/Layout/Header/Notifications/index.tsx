import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Tabs,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { HiCog, HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi';
import EnrollmentRequestCard from './EnrollmentRequests/EnrollmentRequestCard';
import EnrollmentResponseCard from './EnrollmentResponses/EnrollmentResponseCard';
import NotificationsButton from './NotificationsButton';
import { useNotifications } from './useNotifications';

type Props = {};

export default function Notifications(props: Props) {
  const { uncheckedRequests, removeRequest, responses, removeResponse } = useNotifications();
  const hasUpdates = uncheckedRequests.length > 0 || responses.length > 0;
  return (
    <Popover placement="top-start" closeOnBlur={true}>
      <NotificationsButton hasUpdates={hasUpdates} />
      <PopoverContent width={{ base: 'auto', md: 400 }} maxHeight={'90vh'}>
        <PopoverHeader fontWeight="semibold" justifyContent={'space-between'} alignItems={'center'} display={'flex'}>
          Notifications
          <Tooltip label="Not available yet" shouldWrapChildren mt="2" rounded={'md'} p={2}>
            <IconButton aria-label="Notification settings" icon={<HiCog />} variant={'ghost'} disabled />
          </Tooltip>
        </PopoverHeader>
        <PopoverBody overflowY={'auto'}>
          <Tabs size={'sm'} variant={'unstyled'} isFitted>
            <TabList>
              <Tab
                _selected={{ bg: 'gray.100' }}
                _active={{ bg: 'transparent' }}
                gap={1}
                border={'1px solid'}
                borderColor={'gray.200'}
                roundedLeft={'md'}
              >
                <HiOutlineArrowSmUp />
                Requests
                <Text fontWeight={'bold'}>{uncheckedRequests.length}</Text>
              </Tab>
              <Tab
                _selected={{ bg: 'gray.100' }}
                _active={{ bg: 'transparent' }}
                gap={1}
                border={'1px solid'}
                borderColor={'gray.200'}
                roundedRight={'md'}
              >
                <HiOutlineArrowSmDown />
                Responses
                <Text fontWeight={'bold'}>{responses.length}</Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {uncheckedRequests.map((req, i) => (
                  <EnrollmentRequestCard
                    key={`${req.eventId}-${req.username}-${i}`}
                    eventId={req.eventId}
                    username={req.username}
                    removeRequest={() => removeRequest(req)}
                  />
                ))}
              </TabPanel>
              <TabPanel>
                {responses.map((res, i) => (
                  <EnrollmentResponseCard
                    key={`${res.eventId}-${res.username}-${i}`}
                    eventId={res.eventId}
                    state={res.state}
                    removeResponse={() => removeResponse(res)}
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
