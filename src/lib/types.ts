import { Event } from '../generated/graphql';

export type EventManyType = Omit<Event, 'authorUsername' | 'createdAt' | 'private' | 'updatedAt' | 'requests' | 'city'>;
