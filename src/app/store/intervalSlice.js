import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Interval from '../core/models/Interval';
import Meta from '../core/models/Meta';
import {fetchAllIntervals, fetchInterval} from '../services/intervalService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  data: new Interval(),
  meta: new Meta(),
  status: 'idle'
};

export const intervalListAsync = createAsyncThunk(
  'interval/fetchAllIntervals',
  async (params) => {
    const response = await fetchAllIntervals(params);
    const data = Transformer.fetchCollection(response.data, Interval);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const intervalDataAsync = createAsyncThunk(
  'interval/fetchInterval',
  async () => {
    const response = await fetchInterval()
    return Transformer.fetchObject(response.meta, Interval);
  }
);

export const intervalSlice = createSlice({
  name: 'interval',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(intervalListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(intervalListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(intervalDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(intervalDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const intervalData = state => state.interval.data;
export const intervalList = state => state.interval.list;
export const metaData = state => state.interval.meta;
export const reqStatus = state => state.interval.status;

export default intervalSlice.reducer;
