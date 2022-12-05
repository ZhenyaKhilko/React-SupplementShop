import { SortItem } from '../../components/Sort';

export enum SortNameEnum {
  TITLE = 'title',
  RATING = 'rating',
  PRICE = 'price',
}

export interface FilterSliceState {
  searchValue: string;
  activeCategory: number;
  currentPage: number;
  selectedSort: SortItem;
}
