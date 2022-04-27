import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export enum Category {
  Beauty = 'BEAUTY',
  Comedy = 'COMEDY',
  Education = 'EDUCATION',
  Food = 'FOOD',
  Other = 'OTHER',
  Shopping = 'SHOPPING',
  Sport = 'SPORT'
}

export type Comment = {
  __typename?: 'Comment';
  authorUsername: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  eventId: Scalars['String'];
  id: Scalars['String'];
  likedBy?: Maybe<Array<User>>;
  parentCommentId?: Maybe<Scalars['String']>;
};

export type CreateCommentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateEventInput = {
  address: Scalars['String'];
  /** "SPORT" | "FOOD" | "SHOPPING" | "COMEDY" | "EDUCATION" | "BEAUTY" | "OTHER" */
  category: Scalars['String'];
  city?: InputMaybe<Scalars['String']>;
  dateFrom: Scalars['DateTime'];
  dateTo?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  private?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type DateArgs = {
  field?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<DateOperators>;
};

export type DateOperators = {
  /** Greater than or equal */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Lower than */
  lt?: InputMaybe<Scalars['DateTime']>;
};

export type EnrollmentRequest = {
  __typename?: 'EnrollmentRequest';
  eventId: Scalars['String'];
  state: State;
  username: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  address: Scalars['String'];
  authorUsername: Scalars['String'];
  category: Category;
  city?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  dateFrom: Scalars['DateTime'];
  dateTo?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  participants?: Maybe<Array<UserEnrollEvent>>;
  private: Scalars['String'];
  requests: Array<EnrollmentRequest>;
  savedBy?: Maybe<Array<UserSaveEvent>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EventManyResponse = {
  __typename?: 'EventManyResponse';
  events: Array<Event>;
  totalCount: Scalars['Float'];
};

export type LoginUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  enrollmentRequestAcceptOne: Scalars['Boolean'];
  enrollmentRequestCreateOne: EnrollmentRequest;
  enrollmentRequestDeclineOne: Scalars['Boolean'];
  eventCreate: Event;
  login: User;
  logout: Scalars['Boolean'];
  register: User;
  removeComment: Comment;
  removeEvent: Event;
  saveEvent: Scalars['Boolean'];
  unsaveEvent: Scalars['Boolean'];
  updateComment: Comment;
  updateEvent: Event;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationEnrollmentRequestAcceptOneArgs = {
  eventId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEnrollmentRequestCreateOneArgs = {
  eventId: Scalars['String'];
};


export type MutationEnrollmentRequestDeclineOneArgs = {
  eventId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEventCreateArgs = {
  args: CreateEventInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveEventArgs = {
  id: Scalars['String'];
};


export type MutationSaveEventArgs = {
  eventId: Scalars['String'];
};


export type MutationUnsaveEventArgs = {
  eventId: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateEventArgs = {
  args: UpdateEventInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type OrderByArgs = {
  direction?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
};

export type PaginationArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  take: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  enrollmentRequestMany: Array<EnrollmentRequest>;
  enrollmentRequestManyAsHost: Array<EnrollmentRequest>;
  enrollmentRequestOne?: Maybe<EnrollmentRequest>;
  eventIsSaved: Scalars['Boolean'];
  eventMany: EventManyResponse;
  eventManyCities: Array<Scalars['String']>;
  eventManyCreated: Array<Event>;
  eventManySaved: Array<Event>;
  eventOne?: Maybe<Event>;
  me?: Maybe<User>;
  user: User;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['Int'];
};


export type QueryEnrollmentRequestManyAsHostArgs = {
  state?: InputMaybe<Scalars['String']>;
};


export type QueryEnrollmentRequestOneArgs = {
  eventId: Scalars['String'];
};


export type QueryEventIsSavedArgs = {
  eventId: Scalars['String'];
};


export type QueryEventManyArgs = {
  date?: InputMaybe<DateArgs>;
  filters?: InputMaybe<Array<WhereArgs>>;
  orderBy?: InputMaybe<OrderByArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  search?: InputMaybe<SearchArgs>;
};


export type QueryEventOneArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type RegisterUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SearchArgs = {
  field?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum State {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Processing = 'PROCESSING'
}

export type Subscription = {
  __typename?: 'Subscription';
  enrollmentRequestAccepted: EnrollmentRequest;
  enrollmentRequestDeclined: EnrollmentRequest;
  enrollmentRequested: EnrollmentRequest;
};


export type SubscriptionEnrollmentRequestAcceptedArgs = {
  username: Scalars['String'];
};


export type SubscriptionEnrollmentRequestDeclinedArgs = {
  username: Scalars['String'];
};


export type SubscriptionEnrollmentRequestedArgs = {
  username: Scalars['String'];
};

export type UpdateCommentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateEventInput = {
  address?: InputMaybe<Scalars['String']>;
  /** "SPORT" | "FOOD" | "SHOPPING" | "COMEDY" | "EDUCATION" | "BEAUTY" | "OTHER" */
  category?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  private?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  commentCreatedMany?: Maybe<Array<Comment>>;
  commentLikedMany?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  eventCreatedMany: Array<Event>;
  eventEnrolledMany?: Maybe<Array<UserEnrollEvent>>;
  eventRequestedMany?: Maybe<Array<EnrollmentRequest>>;
  eventSavedMany?: Maybe<Array<UserSaveEvent>>;
  followedBy?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserEnrollEvent = {
  __typename?: 'UserEnrollEvent';
  eventId: Scalars['String'];
  username: Scalars['String'];
};

export type UserSaveEvent = {
  __typename?: 'UserSaveEvent';
  eventId: Scalars['String'];
  username: Scalars['String'];
};

export type WhereArgs = {
  field?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type EnrollmentRequestAcceptOneMutationVariables = Exact<{
  eventId: Scalars['String'];
  username: Scalars['String'];
}>;


export type EnrollmentRequestAcceptOneMutation = { __typename?: 'Mutation', enrollmentRequestAcceptOne: boolean };

export type EnrollmentRequestCreateMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EnrollmentRequestCreateMutation = { __typename?: 'Mutation', enrollmentRequestCreateOne: { __typename?: 'EnrollmentRequest', eventId: string, username: string } };

export type EnrollmentRequestDeclineOneMutationVariables = Exact<{
  eventId: Scalars['String'];
  username: Scalars['String'];
}>;


export type EnrollmentRequestDeclineOneMutation = { __typename?: 'Mutation', enrollmentRequestDeclineOne: boolean };

export type CreateEventMutationVariables = Exact<{
  args: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', eventCreate: { __typename?: 'Event', id: string, title: string, description?: string | null, authorUsername: string, private: string } };

export type LoginMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', name: string, username: string, imageUrl?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', name: string, username: string } };

export type EventRemoveOneMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventRemoveOneMutation = { __typename?: 'Mutation', removeEvent: { __typename?: 'Event', id: string } };

export type SaveEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type SaveEventMutation = { __typename?: 'Mutation', saveEvent: boolean };

export type UnsaveEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type UnsaveEventMutation = { __typename?: 'Mutation', unsaveEvent: boolean };

export type EnrollmentRequestManyQueryVariables = Exact<{ [key: string]: never; }>;


export type EnrollmentRequestManyQuery = { __typename?: 'Query', enrollmentRequestMany: Array<{ __typename?: 'EnrollmentRequest', eventId: string, username: string, state: State }> };

export type EnrollmentRequestManyAsHostQueryVariables = Exact<{
  state?: InputMaybe<Scalars['String']>;
}>;


export type EnrollmentRequestManyAsHostQuery = { __typename?: 'Query', enrollmentRequestManyAsHost: Array<{ __typename?: 'EnrollmentRequest', eventId: string, username: string, state: State }> };

export type EnrollmentRequestOneQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EnrollmentRequestOneQuery = { __typename?: 'Query', enrollmentRequestOne?: { __typename?: 'EnrollmentRequest', eventId: string, username: string, state: State } | null };

export type EventIsSavedQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventIsSavedQuery = { __typename?: 'Query', eventIsSaved: boolean };

export type EventManyQueryVariables = Exact<{
  date?: InputMaybe<DateArgs>;
  filters?: InputMaybe<Array<WhereArgs> | WhereArgs>;
  orderBy?: InputMaybe<OrderByArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  search?: InputMaybe<SearchArgs>;
}>;


export type EventManyQuery = { __typename?: 'Query', eventMany: { __typename?: 'EventManyResponse', totalCount: number, events: Array<{ __typename?: 'Event', id: string, title: string, dateFrom: any, imageUrl?: string | null, city?: string | null, address: string, category: Category, longitude: number, latitude: number }> } };

export type EventManyCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventManyCitiesQuery = { __typename?: 'Query', eventManyCities: Array<string> };

export type EventManyCreatedQueryVariables = Exact<{ [key: string]: never; }>;


export type EventManyCreatedQuery = { __typename?: 'Query', eventManyCreated: Array<{ __typename?: 'Event', id: string, title: string, dateFrom: any, imageUrl?: string | null, city?: string | null, address: string, category: Category, longitude: number, latitude: number }> };

export type EventManySavedQueryVariables = Exact<{ [key: string]: never; }>;


export type EventManySavedQuery = { __typename?: 'Query', eventManySaved: Array<{ __typename?: 'Event', id: string, title: string, dateFrom: any, imageUrl?: string | null, address: string, category: Category, longitude: number, latitude: number }> };

export type EventOneQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EventOneQuery = { __typename?: 'Query', eventOne?: { __typename?: 'Event', title: string, description?: string | null, category: Category, authorUsername: string, private: string, dateFrom: any, dateTo?: any | null, longitude: number, latitude: number, address: string, imageUrl?: string | null, updatedAt: any, createdAt: any, participants?: Array<{ __typename?: 'UserEnrollEvent', eventId: string, username: string }> | null, savedBy?: Array<{ __typename?: 'UserSaveEvent', eventId: string, username: string }> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', name: string, username: string, imageUrl?: string | null } | null };

export type UserManyQueryVariables = Exact<{ [key: string]: never; }>;


export type UserManyQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, username: string }> };

export type UserOneQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserOneQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, username: string, imageUrl?: string | null } };

export type EnrollmentRequestAcceptedSubscriptionVariables = Exact<{
  username: Scalars['String'];
}>;


export type EnrollmentRequestAcceptedSubscription = { __typename?: 'Subscription', enrollmentRequestAccepted: { __typename?: 'EnrollmentRequest', eventId: string, state: State, username: string } };

export type EnrollmentRequestDeclinedSubscriptionVariables = Exact<{
  username: Scalars['String'];
}>;


export type EnrollmentRequestDeclinedSubscription = { __typename?: 'Subscription', enrollmentRequestDeclined: { __typename?: 'EnrollmentRequest', eventId: string, state: State, username: string } };

export type EnrollmentRequestedSubscriptionVariables = Exact<{
  username: Scalars['String'];
}>;


export type EnrollmentRequestedSubscription = { __typename?: 'Subscription', enrollmentRequested: { __typename?: 'EnrollmentRequest', eventId: string, state: State, username: string } };


export const EnrollmentRequestAcceptOneDocument = gql`
    mutation EnrollmentRequestAcceptOne($eventId: String!, $username: String!) {
  enrollmentRequestAcceptOne(username: $username, eventId: $eventId)
}
    `;
export type EnrollmentRequestAcceptOneMutationFn = Apollo.MutationFunction<EnrollmentRequestAcceptOneMutation, EnrollmentRequestAcceptOneMutationVariables>;

/**
 * __useEnrollmentRequestAcceptOneMutation__
 *
 * To run a mutation, you first call `useEnrollmentRequestAcceptOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestAcceptOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollmentRequestAcceptOneMutation, { data, loading, error }] = useEnrollmentRequestAcceptOneMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEnrollmentRequestAcceptOneMutation(baseOptions?: Apollo.MutationHookOptions<EnrollmentRequestAcceptOneMutation, EnrollmentRequestAcceptOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollmentRequestAcceptOneMutation, EnrollmentRequestAcceptOneMutationVariables>(EnrollmentRequestAcceptOneDocument, options);
      }
export type EnrollmentRequestAcceptOneMutationHookResult = ReturnType<typeof useEnrollmentRequestAcceptOneMutation>;
export type EnrollmentRequestAcceptOneMutationResult = Apollo.MutationResult<EnrollmentRequestAcceptOneMutation>;
export type EnrollmentRequestAcceptOneMutationOptions = Apollo.BaseMutationOptions<EnrollmentRequestAcceptOneMutation, EnrollmentRequestAcceptOneMutationVariables>;
export const EnrollmentRequestCreateDocument = gql`
    mutation EnrollmentRequestCreate($eventId: String!) {
  enrollmentRequestCreateOne(eventId: $eventId) {
    eventId
    username
  }
}
    `;
export type EnrollmentRequestCreateMutationFn = Apollo.MutationFunction<EnrollmentRequestCreateMutation, EnrollmentRequestCreateMutationVariables>;

/**
 * __useEnrollmentRequestCreateMutation__
 *
 * To run a mutation, you first call `useEnrollmentRequestCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollmentRequestCreateMutation, { data, loading, error }] = useEnrollmentRequestCreateMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEnrollmentRequestCreateMutation(baseOptions?: Apollo.MutationHookOptions<EnrollmentRequestCreateMutation, EnrollmentRequestCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollmentRequestCreateMutation, EnrollmentRequestCreateMutationVariables>(EnrollmentRequestCreateDocument, options);
      }
export type EnrollmentRequestCreateMutationHookResult = ReturnType<typeof useEnrollmentRequestCreateMutation>;
export type EnrollmentRequestCreateMutationResult = Apollo.MutationResult<EnrollmentRequestCreateMutation>;
export type EnrollmentRequestCreateMutationOptions = Apollo.BaseMutationOptions<EnrollmentRequestCreateMutation, EnrollmentRequestCreateMutationVariables>;
export const EnrollmentRequestDeclineOneDocument = gql`
    mutation EnrollmentRequestDeclineOne($eventId: String!, $username: String!) {
  enrollmentRequestDeclineOne(username: $username, eventId: $eventId)
}
    `;
export type EnrollmentRequestDeclineOneMutationFn = Apollo.MutationFunction<EnrollmentRequestDeclineOneMutation, EnrollmentRequestDeclineOneMutationVariables>;

/**
 * __useEnrollmentRequestDeclineOneMutation__
 *
 * To run a mutation, you first call `useEnrollmentRequestDeclineOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestDeclineOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollmentRequestDeclineOneMutation, { data, loading, error }] = useEnrollmentRequestDeclineOneMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEnrollmentRequestDeclineOneMutation(baseOptions?: Apollo.MutationHookOptions<EnrollmentRequestDeclineOneMutation, EnrollmentRequestDeclineOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollmentRequestDeclineOneMutation, EnrollmentRequestDeclineOneMutationVariables>(EnrollmentRequestDeclineOneDocument, options);
      }
export type EnrollmentRequestDeclineOneMutationHookResult = ReturnType<typeof useEnrollmentRequestDeclineOneMutation>;
export type EnrollmentRequestDeclineOneMutationResult = Apollo.MutationResult<EnrollmentRequestDeclineOneMutation>;
export type EnrollmentRequestDeclineOneMutationOptions = Apollo.BaseMutationOptions<EnrollmentRequestDeclineOneMutation, EnrollmentRequestDeclineOneMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($args: CreateEventInput!) {
  eventCreate(args: $args) {
    id
    title
    description
    authorUsername
    private
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginUserInput!) {
  login(loginUserInput: $data) {
    name
    username
    imageUrl
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterUserInput!) {
  register(registerUserInput: $data) {
    name
    username
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const EventRemoveOneDocument = gql`
    mutation EventRemoveOne($eventId: String!) {
  removeEvent(id: $eventId) {
    id
  }
}
    `;
export type EventRemoveOneMutationFn = Apollo.MutationFunction<EventRemoveOneMutation, EventRemoveOneMutationVariables>;

/**
 * __useEventRemoveOneMutation__
 *
 * To run a mutation, you first call `useEventRemoveOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventRemoveOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventRemoveOneMutation, { data, loading, error }] = useEventRemoveOneMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventRemoveOneMutation(baseOptions?: Apollo.MutationHookOptions<EventRemoveOneMutation, EventRemoveOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EventRemoveOneMutation, EventRemoveOneMutationVariables>(EventRemoveOneDocument, options);
      }
export type EventRemoveOneMutationHookResult = ReturnType<typeof useEventRemoveOneMutation>;
export type EventRemoveOneMutationResult = Apollo.MutationResult<EventRemoveOneMutation>;
export type EventRemoveOneMutationOptions = Apollo.BaseMutationOptions<EventRemoveOneMutation, EventRemoveOneMutationVariables>;
export const SaveEventDocument = gql`
    mutation SaveEvent($eventId: String!) {
  saveEvent(eventId: $eventId)
}
    `;
export type SaveEventMutationFn = Apollo.MutationFunction<SaveEventMutation, SaveEventMutationVariables>;

/**
 * __useSaveEventMutation__
 *
 * To run a mutation, you first call `useSaveEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEventMutation, { data, loading, error }] = useSaveEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useSaveEventMutation(baseOptions?: Apollo.MutationHookOptions<SaveEventMutation, SaveEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveEventMutation, SaveEventMutationVariables>(SaveEventDocument, options);
      }
export type SaveEventMutationHookResult = ReturnType<typeof useSaveEventMutation>;
export type SaveEventMutationResult = Apollo.MutationResult<SaveEventMutation>;
export type SaveEventMutationOptions = Apollo.BaseMutationOptions<SaveEventMutation, SaveEventMutationVariables>;
export const UnsaveEventDocument = gql`
    mutation UnsaveEvent($eventId: String!) {
  unsaveEvent(eventId: $eventId)
}
    `;
export type UnsaveEventMutationFn = Apollo.MutationFunction<UnsaveEventMutation, UnsaveEventMutationVariables>;

/**
 * __useUnsaveEventMutation__
 *
 * To run a mutation, you first call `useUnsaveEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsaveEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsaveEventMutation, { data, loading, error }] = useUnsaveEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useUnsaveEventMutation(baseOptions?: Apollo.MutationHookOptions<UnsaveEventMutation, UnsaveEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsaveEventMutation, UnsaveEventMutationVariables>(UnsaveEventDocument, options);
      }
export type UnsaveEventMutationHookResult = ReturnType<typeof useUnsaveEventMutation>;
export type UnsaveEventMutationResult = Apollo.MutationResult<UnsaveEventMutation>;
export type UnsaveEventMutationOptions = Apollo.BaseMutationOptions<UnsaveEventMutation, UnsaveEventMutationVariables>;
export const EnrollmentRequestManyDocument = gql`
    query EnrollmentRequestMany {
  enrollmentRequestMany {
    eventId
    username
    state
  }
}
    `;

/**
 * __useEnrollmentRequestManyQuery__
 *
 * To run a query within a React component, call `useEnrollmentRequestManyQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestManyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestManyQuery({
 *   variables: {
 *   },
 * });
 */
export function useEnrollmentRequestManyQuery(baseOptions?: Apollo.QueryHookOptions<EnrollmentRequestManyQuery, EnrollmentRequestManyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentRequestManyQuery, EnrollmentRequestManyQueryVariables>(EnrollmentRequestManyDocument, options);
      }
export function useEnrollmentRequestManyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentRequestManyQuery, EnrollmentRequestManyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentRequestManyQuery, EnrollmentRequestManyQueryVariables>(EnrollmentRequestManyDocument, options);
        }
export type EnrollmentRequestManyQueryHookResult = ReturnType<typeof useEnrollmentRequestManyQuery>;
export type EnrollmentRequestManyLazyQueryHookResult = ReturnType<typeof useEnrollmentRequestManyLazyQuery>;
export type EnrollmentRequestManyQueryResult = Apollo.QueryResult<EnrollmentRequestManyQuery, EnrollmentRequestManyQueryVariables>;
export const EnrollmentRequestManyAsHostDocument = gql`
    query EnrollmentRequestManyAsHost($state: String) {
  enrollmentRequestManyAsHost(state: $state) {
    eventId
    username
    state
  }
}
    `;

/**
 * __useEnrollmentRequestManyAsHostQuery__
 *
 * To run a query within a React component, call `useEnrollmentRequestManyAsHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestManyAsHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestManyAsHostQuery({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function useEnrollmentRequestManyAsHostQuery(baseOptions?: Apollo.QueryHookOptions<EnrollmentRequestManyAsHostQuery, EnrollmentRequestManyAsHostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentRequestManyAsHostQuery, EnrollmentRequestManyAsHostQueryVariables>(EnrollmentRequestManyAsHostDocument, options);
      }
export function useEnrollmentRequestManyAsHostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentRequestManyAsHostQuery, EnrollmentRequestManyAsHostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentRequestManyAsHostQuery, EnrollmentRequestManyAsHostQueryVariables>(EnrollmentRequestManyAsHostDocument, options);
        }
export type EnrollmentRequestManyAsHostQueryHookResult = ReturnType<typeof useEnrollmentRequestManyAsHostQuery>;
export type EnrollmentRequestManyAsHostLazyQueryHookResult = ReturnType<typeof useEnrollmentRequestManyAsHostLazyQuery>;
export type EnrollmentRequestManyAsHostQueryResult = Apollo.QueryResult<EnrollmentRequestManyAsHostQuery, EnrollmentRequestManyAsHostQueryVariables>;
export const EnrollmentRequestOneDocument = gql`
    query EnrollmentRequestOne($eventId: String!) {
  enrollmentRequestOne(eventId: $eventId) {
    eventId
    username
    state
  }
}
    `;

/**
 * __useEnrollmentRequestOneQuery__
 *
 * To run a query within a React component, call `useEnrollmentRequestOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestOneQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEnrollmentRequestOneQuery(baseOptions: Apollo.QueryHookOptions<EnrollmentRequestOneQuery, EnrollmentRequestOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentRequestOneQuery, EnrollmentRequestOneQueryVariables>(EnrollmentRequestOneDocument, options);
      }
export function useEnrollmentRequestOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentRequestOneQuery, EnrollmentRequestOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentRequestOneQuery, EnrollmentRequestOneQueryVariables>(EnrollmentRequestOneDocument, options);
        }
export type EnrollmentRequestOneQueryHookResult = ReturnType<typeof useEnrollmentRequestOneQuery>;
export type EnrollmentRequestOneLazyQueryHookResult = ReturnType<typeof useEnrollmentRequestOneLazyQuery>;
export type EnrollmentRequestOneQueryResult = Apollo.QueryResult<EnrollmentRequestOneQuery, EnrollmentRequestOneQueryVariables>;
export const EventIsSavedDocument = gql`
    query EventIsSaved($eventId: String!) {
  eventIsSaved(eventId: $eventId)
}
    `;

/**
 * __useEventIsSavedQuery__
 *
 * To run a query within a React component, call `useEventIsSavedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventIsSavedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventIsSavedQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventIsSavedQuery(baseOptions: Apollo.QueryHookOptions<EventIsSavedQuery, EventIsSavedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventIsSavedQuery, EventIsSavedQueryVariables>(EventIsSavedDocument, options);
      }
export function useEventIsSavedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventIsSavedQuery, EventIsSavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventIsSavedQuery, EventIsSavedQueryVariables>(EventIsSavedDocument, options);
        }
export type EventIsSavedQueryHookResult = ReturnType<typeof useEventIsSavedQuery>;
export type EventIsSavedLazyQueryHookResult = ReturnType<typeof useEventIsSavedLazyQuery>;
export type EventIsSavedQueryResult = Apollo.QueryResult<EventIsSavedQuery, EventIsSavedQueryVariables>;
export const EventManyDocument = gql`
    query EventMany($date: DateArgs, $filters: [WhereArgs!], $orderBy: OrderByArgs, $pagination: PaginationArgs, $search: SearchArgs) {
  eventMany(
    date: $date
    filters: $filters
    orderBy: $orderBy
    pagination: $pagination
    search: $search
  ) {
    events {
      id
      title
      dateFrom
      imageUrl
      city
      address
      category
      longitude
      latitude
    }
    totalCount
  }
}
    `;

/**
 * __useEventManyQuery__
 *
 * To run a query within a React component, call `useEventManyQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventManyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventManyQuery({
 *   variables: {
 *      date: // value for 'date'
 *      filters: // value for 'filters'
 *      orderBy: // value for 'orderBy'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useEventManyQuery(baseOptions?: Apollo.QueryHookOptions<EventManyQuery, EventManyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventManyQuery, EventManyQueryVariables>(EventManyDocument, options);
      }
export function useEventManyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventManyQuery, EventManyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventManyQuery, EventManyQueryVariables>(EventManyDocument, options);
        }
export type EventManyQueryHookResult = ReturnType<typeof useEventManyQuery>;
export type EventManyLazyQueryHookResult = ReturnType<typeof useEventManyLazyQuery>;
export type EventManyQueryResult = Apollo.QueryResult<EventManyQuery, EventManyQueryVariables>;
export const EventManyCitiesDocument = gql`
    query EventManyCities {
  eventManyCities
}
    `;

/**
 * __useEventManyCitiesQuery__
 *
 * To run a query within a React component, call `useEventManyCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventManyCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventManyCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventManyCitiesQuery(baseOptions?: Apollo.QueryHookOptions<EventManyCitiesQuery, EventManyCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventManyCitiesQuery, EventManyCitiesQueryVariables>(EventManyCitiesDocument, options);
      }
export function useEventManyCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventManyCitiesQuery, EventManyCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventManyCitiesQuery, EventManyCitiesQueryVariables>(EventManyCitiesDocument, options);
        }
export type EventManyCitiesQueryHookResult = ReturnType<typeof useEventManyCitiesQuery>;
export type EventManyCitiesLazyQueryHookResult = ReturnType<typeof useEventManyCitiesLazyQuery>;
export type EventManyCitiesQueryResult = Apollo.QueryResult<EventManyCitiesQuery, EventManyCitiesQueryVariables>;
export const EventManyCreatedDocument = gql`
    query EventManyCreated {
  eventManyCreated {
    id
    title
    dateFrom
    imageUrl
    city
    address
    category
    longitude
    latitude
  }
}
    `;

/**
 * __useEventManyCreatedQuery__
 *
 * To run a query within a React component, call `useEventManyCreatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventManyCreatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventManyCreatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventManyCreatedQuery(baseOptions?: Apollo.QueryHookOptions<EventManyCreatedQuery, EventManyCreatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventManyCreatedQuery, EventManyCreatedQueryVariables>(EventManyCreatedDocument, options);
      }
export function useEventManyCreatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventManyCreatedQuery, EventManyCreatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventManyCreatedQuery, EventManyCreatedQueryVariables>(EventManyCreatedDocument, options);
        }
export type EventManyCreatedQueryHookResult = ReturnType<typeof useEventManyCreatedQuery>;
export type EventManyCreatedLazyQueryHookResult = ReturnType<typeof useEventManyCreatedLazyQuery>;
export type EventManyCreatedQueryResult = Apollo.QueryResult<EventManyCreatedQuery, EventManyCreatedQueryVariables>;
export const EventManySavedDocument = gql`
    query EventManySaved {
  eventManySaved {
    id
    title
    dateFrom
    imageUrl
    address
    category
    longitude
    latitude
  }
}
    `;

/**
 * __useEventManySavedQuery__
 *
 * To run a query within a React component, call `useEventManySavedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventManySavedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventManySavedQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventManySavedQuery(baseOptions?: Apollo.QueryHookOptions<EventManySavedQuery, EventManySavedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventManySavedQuery, EventManySavedQueryVariables>(EventManySavedDocument, options);
      }
export function useEventManySavedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventManySavedQuery, EventManySavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventManySavedQuery, EventManySavedQueryVariables>(EventManySavedDocument, options);
        }
export type EventManySavedQueryHookResult = ReturnType<typeof useEventManySavedQuery>;
export type EventManySavedLazyQueryHookResult = ReturnType<typeof useEventManySavedLazyQuery>;
export type EventManySavedQueryResult = Apollo.QueryResult<EventManySavedQuery, EventManySavedQueryVariables>;
export const EventOneDocument = gql`
    query eventOne($id: String!) {
  eventOne(id: $id) {
    title
    description
    category
    authorUsername
    private
    dateFrom
    dateTo
    longitude
    latitude
    address
    imageUrl
    updatedAt
    createdAt
    participants {
      eventId
      username
    }
    savedBy {
      eventId
      username
    }
  }
}
    `;

/**
 * __useEventOneQuery__
 *
 * To run a query within a React component, call `useEventOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventOneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventOneQuery(baseOptions: Apollo.QueryHookOptions<EventOneQuery, EventOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventOneQuery, EventOneQueryVariables>(EventOneDocument, options);
      }
export function useEventOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventOneQuery, EventOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventOneQuery, EventOneQueryVariables>(EventOneDocument, options);
        }
export type EventOneQueryHookResult = ReturnType<typeof useEventOneQuery>;
export type EventOneLazyQueryHookResult = ReturnType<typeof useEventOneLazyQuery>;
export type EventOneQueryResult = Apollo.QueryResult<EventOneQuery, EventOneQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    name
    username
    imageUrl
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserManyDocument = gql`
    query UserMany {
  users {
    id
    name
    username
  }
}
    `;

/**
 * __useUserManyQuery__
 *
 * To run a query within a React component, call `useUserManyQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserManyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserManyQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserManyQuery(baseOptions?: Apollo.QueryHookOptions<UserManyQuery, UserManyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserManyQuery, UserManyQueryVariables>(UserManyDocument, options);
      }
export function useUserManyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserManyQuery, UserManyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserManyQuery, UserManyQueryVariables>(UserManyDocument, options);
        }
export type UserManyQueryHookResult = ReturnType<typeof useUserManyQuery>;
export type UserManyLazyQueryHookResult = ReturnType<typeof useUserManyLazyQuery>;
export type UserManyQueryResult = Apollo.QueryResult<UserManyQuery, UserManyQueryVariables>;
export const UserOneDocument = gql`
    query UserOne($username: String!) {
  user(username: $username) {
    name
    username
    imageUrl
  }
}
    `;

/**
 * __useUserOneQuery__
 *
 * To run a query within a React component, call `useUserOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOneQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserOneQuery(baseOptions: Apollo.QueryHookOptions<UserOneQuery, UserOneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOneQuery, UserOneQueryVariables>(UserOneDocument, options);
      }
export function useUserOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOneQuery, UserOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOneQuery, UserOneQueryVariables>(UserOneDocument, options);
        }
export type UserOneQueryHookResult = ReturnType<typeof useUserOneQuery>;
export type UserOneLazyQueryHookResult = ReturnType<typeof useUserOneLazyQuery>;
export type UserOneQueryResult = Apollo.QueryResult<UserOneQuery, UserOneQueryVariables>;
export const EnrollmentRequestAcceptedDocument = gql`
    subscription EnrollmentRequestAccepted($username: String!) {
  enrollmentRequestAccepted(username: $username) {
    eventId
    state
    username
  }
}
    `;

/**
 * __useEnrollmentRequestAcceptedSubscription__
 *
 * To run a query within a React component, call `useEnrollmentRequestAcceptedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestAcceptedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestAcceptedSubscription({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEnrollmentRequestAcceptedSubscription(baseOptions: Apollo.SubscriptionHookOptions<EnrollmentRequestAcceptedSubscription, EnrollmentRequestAcceptedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EnrollmentRequestAcceptedSubscription, EnrollmentRequestAcceptedSubscriptionVariables>(EnrollmentRequestAcceptedDocument, options);
      }
export type EnrollmentRequestAcceptedSubscriptionHookResult = ReturnType<typeof useEnrollmentRequestAcceptedSubscription>;
export type EnrollmentRequestAcceptedSubscriptionResult = Apollo.SubscriptionResult<EnrollmentRequestAcceptedSubscription>;
export const EnrollmentRequestDeclinedDocument = gql`
    subscription EnrollmentRequestDeclined($username: String!) {
  enrollmentRequestDeclined(username: $username) {
    eventId
    state
    username
  }
}
    `;

/**
 * __useEnrollmentRequestDeclinedSubscription__
 *
 * To run a query within a React component, call `useEnrollmentRequestDeclinedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestDeclinedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestDeclinedSubscription({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEnrollmentRequestDeclinedSubscription(baseOptions: Apollo.SubscriptionHookOptions<EnrollmentRequestDeclinedSubscription, EnrollmentRequestDeclinedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EnrollmentRequestDeclinedSubscription, EnrollmentRequestDeclinedSubscriptionVariables>(EnrollmentRequestDeclinedDocument, options);
      }
export type EnrollmentRequestDeclinedSubscriptionHookResult = ReturnType<typeof useEnrollmentRequestDeclinedSubscription>;
export type EnrollmentRequestDeclinedSubscriptionResult = Apollo.SubscriptionResult<EnrollmentRequestDeclinedSubscription>;
export const EnrollmentRequestedDocument = gql`
    subscription EnrollmentRequested($username: String!) {
  enrollmentRequested(username: $username) {
    eventId
    state
    username
  }
}
    `;

/**
 * __useEnrollmentRequestedSubscription__
 *
 * To run a query within a React component, call `useEnrollmentRequestedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentRequestedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentRequestedSubscription({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEnrollmentRequestedSubscription(baseOptions: Apollo.SubscriptionHookOptions<EnrollmentRequestedSubscription, EnrollmentRequestedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EnrollmentRequestedSubscription, EnrollmentRequestedSubscriptionVariables>(EnrollmentRequestedDocument, options);
      }
export type EnrollmentRequestedSubscriptionHookResult = ReturnType<typeof useEnrollmentRequestedSubscription>;
export type EnrollmentRequestedSubscriptionResult = Apollo.SubscriptionResult<EnrollmentRequestedSubscription>;