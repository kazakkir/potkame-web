import {
  Button,
  Center,
  Flex,
  Heading,
  InputGroup,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import _ from 'lodash';

import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Dropzone from 'react-dropzone';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import PrimaryButton from '../../../base/PrimaryButton';
import { useCreateEventStore } from '../../useCreateEventStore';

const MAX_FILE_SIZE = 3000000; // in bytes

export default function StepImage() {
  const router = useRouter();
  const uploadedFile = useCreateEventStore((state) => state.uploadedFile);
  const setUploadedFile = useCreateEventStore((state) => state.setUploadedFile);
  const [error, setError] = useState('');

  const onDrop = <T extends File>(files: T[], fileRejections: any) => {
    const file = files[0];
    if (fileRejections.length > 0) {
      setError(`Error while uploading.
      Check the image format and size`);
      setUploadedFile(null);
      return;
    }
    setError('');
    setUploadedFile(file);
  };

  return (
    <VStack gap={5} px={{ base: 2, md: '30%' }}>
      <Heading size={'lg'}>Upload an image</Heading>
      {error && (
        <Text size="sm" color={'red.500'}>
          {error}
        </Text>
      )}
      {uploadedFile && (
        <Flex
          width={'auto'}
          gap={4}
          rounded={'md'}
          shadow={'md'}
          p={2}
          zIndex={-1}
          userSelect={'none'}
        >
          <NextImage
            src={URL.createObjectURL(uploadedFile)}
            width={30}
            height={30}
            objectFit={'cover'}
          />
          <Box>
            <Heading as={'h3'} size={'sm'}>
              {uploadedFile.name}
            </Heading>
            <Text fontSize={'xs'}>
              {Math.floor(uploadedFile.size / 1000)} Kb
            </Text>
          </Box>
        </Flex>
      )}

      <Dropzone
        onDrop={onDrop}
        maxFiles={1}
        maxSize={MAX_FILE_SIZE}
        accept={['image/jpeg', 'image/png']}
      >
        {({ getRootProps, getInputProps }) => (
          <InputGroup size="md">
            <Center
              border={'3px dashed'}
              rounded={'md'}
              height={200}
              width={'full'}
              bg={'gray.200'}
              fontSize={18}
              gap={3}
              _hover={{ bg: 'gray.300' }}
              transition={'200ms all'}
              {...getRootProps()}
            >
              <HiOutlineCloudUpload /> Choose image up to 3 Mb.
            </Center>
            <input {...getInputProps()} />
          </InputGroup>
        )}
      </Dropzone>

      <Flex alignSelf={'flex-end'} alignItems={'center'} gap={4}>
        <Button variant={'outline'} onClick={() => router.push('./location')}>
          Previous
        </Button>

        <PrimaryButton
          alignSelf={'flex-end'}
          onClick={() => router.push('./preview')}
        >
          Next
        </PrimaryButton>
      </Flex>
    </VStack>
  );
}
