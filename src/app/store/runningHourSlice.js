import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachineryRunningHour from '../core/models/VesselMachineryRunningHour';
import Meta from '../core/models/Meta';
import {fetchAllRunningHours} from '../services/runningHourService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  meta: new Meta(),
  status: 'idle'
};

export const runningHourListAsync = createAsyncThunk(
  'runningHour/fetchAllRunningHours',
  async (params) => {
    const response = await fetchAllRunningHours(params);
    const data = Transformer.fetchCollection(response.data, VesselMachineryRunningHour);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const runningHourSlice = createSlice({
  name: 'runningHour',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(runningHourListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(runningHourListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
  },
});

export const runningHourList = state => state.runningHour.list;
export const metaData = state => state.runningHour.meta;
export const reqStatus = state => state.runningHour.status;

export default runningHourSlice.reducer;
