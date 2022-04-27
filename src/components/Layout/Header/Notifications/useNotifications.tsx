import { useState, useEffect } from 'react';
import {
  useMeQuery,
  useEnrollmentRequestedSubscription,
  useEnrollmentRequestManyAsHostQuery,
  State,
  EnrollmentRequest,
  useEnrollmentRequestDeclinedSubscription,
  useEnrollmentRequestAcceptedSubscription,
} from '../../../../generated/graphql';

export const useNotifications = () => {
  // my username
  const { data: meData } = useMeQuery();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (meData?.me) {
      setUsername(meData.me.username);
    }
  }, [meData?.me]);

  // initial requests
  const [uncheckedRequests, setUncheckedRequests] = useState<EnrollmentRequest[]>([]);
  const [responses, setResponses] = useState<EnrollmentRequest[]>([]);

  const { data, refetch } = useEnrollmentRequestManyAsHostQuery({
    variables: { state: State.Processing },
  });

  useEffect(() => {
    if (data) {
      setUncheckedRequests(data.enrollmentRequestManyAsHost);
    }
  }, [data]);

  // new requests subscription
  const { data: enrollmentRequest } = useEnrollmentRequestedSubscription({
    variables: { username },
  });
  useEffect(() => {
    if (enrollmentRequest) {
      setUncheckedRequests((prev) => [...prev, enrollmentRequest.enrollmentRequested]);
    }
  }, [enrollmentRequest]);

  // new declined requests subscription
  const { data: enrollmentRequestDeclined } = useEnrollmentRequestDeclinedSubscription({
    variables: { username },
  });
  useEffect(() => {
    const declinedRequest = enrollmentRequestDeclined?.enrollmentRequestDeclined;
    if (declinedRequest) {
      setResponses((prev) => [...prev, declinedRequest]);
    }
  }, [enrollmentRequestDeclined?.enrollmentRequestDeclined]);

  // new accepted requests subscription
  const { data: enrollmentRequestAccepted } = useEnrollmentRequestAcceptedSubscription({
    variables: { username },
  });
  useEffect(() => {
    const acceptedRequest = enrollmentRequestAccepted?.enrollmentRequestAccepted;
    if (acceptedRequest) {
      setResponses((prev) => [...prev, acceptedRequest]);
    }
  }, [enrollmentRequestAccepted?.enrollmentRequestAccepted]);

  const removeRequest = (req: EnrollmentRequest) => {
    setUncheckedRequests((prev) => {
      refetch();
      return prev.filter((prevReq) => prevReq !== req);
    });
  };

  const removeResponse = (res: EnrollmentRequest) => {
    setResponses((prev) => {
      return prev.filter((prevRes) => prevRes !== res);
    });
  };

  return { uncheckedRequests, removeRequest, responses, removeResponse };
};
