import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  categoryId: 0,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  order: true,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state) => state.filter.sort;
export const selectSortProperty = (state) => state.filter.sort.sortProperty;
export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSort, setOrder, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
