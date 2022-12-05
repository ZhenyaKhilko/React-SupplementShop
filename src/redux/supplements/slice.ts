import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchSupplementsParams, Supplement } from './types';

export const fetchSupplements = createAsyncThunk<Supplement[], SearchSupplementsParams>(
  'supplement/fetchSupplementsStatus',
  async (params, thunkAPI) => {
    const { currentPage, category, sortBy, sort, search } = params;
    const { data } = await axios.get<Supplement[]>(
      `https://635c69c9f0bc26795bfe6989.mockapi.io/supplements?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}${sort}${search}`,
    );

    // Example for thunkAPI
    // if (!data.length) {
    //   return thunkAPI.rejectWithValue('Supplements are empty');
    // }

    // return thunkAPI.fulfillWithValue(data);

    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface SupplementsSliceState {
  supplements: Supplement[];
  status: Status;
}

const initialState: SupplementsSliceState = {
  supplements: [],
  status: Status.LOADING,
};

export const supplementsSlice = createSlice({
  name: 'supplement',
  initialState,
  reducers: {
    setSupplements(state, action) {
      state.supplements = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSupplements.pending, (state, action) => {
      state.supplements = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchSupplements.fulfilled, (state, action) => {
      state.supplements = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchSupplements.rejected, (state, action) => {
      state.supplements = [];
      state.status = Status.ERROR;
    });
  },
  // extraReducers: {
  //   [fetchSupplements.pending]: (state) => {
  //     state.supplements = [];
  //     state.status = 'loading';
  //   },
  //   [fetchSupplements.fulfilled]: (state, action) => {
  //     state.supplements = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchSupplements.rejected]: (state) => {
  //     state.supplements = [];
  //     state.status = 'error';
  //   },
  // },
});

export const { setSupplements } = supplementsSlice.actions;

export default supplementsSlice.reducer;
