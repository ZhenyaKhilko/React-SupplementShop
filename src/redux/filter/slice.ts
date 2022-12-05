import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortItem } from '../../components/Sort';

import { FilterSliceState, SortNameEnum } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  activeCategory: 0,
  currentPage: 1,
  selectedSort: { sortIndex: 0, sortName: SortNameEnum.TITLE },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSelectedSort(state, action: PayloadAction<SortItem>) {
      state.selectedSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.selectedSort = action.payload.selectedSort;
      state.activeCategory = action.payload.activeCategory;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setSearchValue, setActiveCategory, setSelectedSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
