import { Avatar, Button, Flex } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';

type Props = {};

export default function ProfileImageInput(props: Props) {
  return (
    <Flex alignItems={'center'}>
      <Avatar />
      <Dropzone>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    </Flex>
  );
}
