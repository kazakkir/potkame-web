import { Category } from '../generated/graphql';

type CategoriesType = {
  [K in Category]: string;
};

export const CATEGORY_EMOJI: CategoriesType = {
  SPORT: '⚽',
  BEAUTY: '✨',
  EDUCATION: '📚',
  COMEDY: '🎭',
  FOOD: '✈️',
  SHOPPING: '🛍️',
  OTHER: '🚀',
};

export const CATEGORIES: CategoriesType = {
  SPORT: `${CATEGORY_EMOJI.SPORT} Sport`,
  BEAUTY: `${CATEGORY_EMOJI.BEAUTY} Beauty`,
  EDUCATION: `${CATEGORY_EMOJI.EDUCATION} Education`,
  COMEDY: `${CATEGORY_EMOJI.COMEDY} Comedy`,
  FOOD: `${CATEGORY_EMOJI.FOOD} Food`,
  SHOPPING: `${CATEGORY_EMOJI.SHOPPING} Shopping`,
  OTHER: `${CATEGORY_EMOJI.OTHER} Other`,
};

export type OptionType = {
  label: string;
  value?: string | null;
};

export const CATEGORY_OPTIONS: OptionType[] = Object.entries(CATEGORIES).map(([value, label]) => ({
  label,
  value,
}));
