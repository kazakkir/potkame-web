import { ApolloQueryResult } from '@apollo/client';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateEventMutation, EventManyDocument } from '../../generated/graphql';
import PrimaryButton from '../base/PrimaryButton';
import SubHeader from '../Layout/Header/SubHeader';
import { useCreateEventStore } from './useCreateEventStore';

type Props = {};

export default function EventCreateHeader(props: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [create] = useCreateEventMutation({
    refetchQueries: [EventManyDocument],
  });
  const payload = useCreateEventStore((state) => state.payload);
  const resetPayload = useCreateEventStore((state) => state.resetPayload);
  const uploadedFile = useCreateEventStore((state) => state.uploadedFile);
  const setUploadedFile = useCreateEventStore((state) => state.setUploadedFile);

  const isPayloadFilled =
    payload.title && payload.category && payload.dateFrom && payload.longitude && payload.latitude;

  const onClick = async () => {
    if (!isPayloadFilled) return;

    let imageUrl;
    if (uploadedFile) {
      const formData = new FormData();

      formData.append('file', uploadedFile);
      formData.append('upload_preset', 'potka-uploads');

      const res = await axios.post(`https://api.cloudinary.com/v1_1/djwbrzqjm/image/upload`, formData);
      imageUrl = res.data.secure_url;
    } else {
      console.error('Error');
    }

    create({
      variables: { args: { ...payload, imageUrl } },
    }).then((res) => {
      if (res.data) {
        router.push(`/events/${res.data?.eventCreate.id}`).then(() => {
          setUploadedFile(null);
          resetPayload();
        });
      }
    });
  };

  return (
    <SubHeader>
      <Heading size={'md'} mx={'20vw'}>
        Create event
      </Heading>
      <PrimaryButton
        disabled={!isPayloadFilled || loading}
        onClick={() => {
          setLoading(true);
          onClick().finally(() => setLoading(false));
        }}
        isLoading={loading}
        loadingText={'Creating'}
      >
        Create event
      </PrimaryButton>

      <PrimaryButton
        // disabled={!isPayloadFilled || loading}
        onClick={() => {
          setLoading(true);
          create({
            variables: {
              args: {
                title: 'Test pagination',
                category: 'OTHER',
                longitude: 14.41854,
                latitude: 50.073658,
                city: 'Prague',
                dateFrom: '2031-10-05T14:48:00.000Z',
                address: 'Náměstí míru',
              },
            },
          })
            .then((res) => {
              if (res.data) {
                console.log('Success');
              }
            })
            .finally(() => setLoading(false));
        }}
        isLoading={loading}
        loadingText={'Creating'}
      >
        Seed
      </PrimaryButton>
    </SubHeader>
  );
}
