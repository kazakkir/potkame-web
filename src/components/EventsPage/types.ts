import { Category } from '../../generated/graphql';

export type EventManyArray = {
  __typename?: 'Event' | undefined;
  id: string;
  title: string;
  dateFrom: any;
  imageUrl?: string | null | undefined;
  city?: string | null | undefined;
  address: string;
  category: Category;
  longitude: number;
  latitude: number;
}[];
