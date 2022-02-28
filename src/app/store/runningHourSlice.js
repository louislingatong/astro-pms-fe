import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachineryRunningHour from '../core/models/VesselMachineryRunningHour';
import Meta from '../core/models/Meta';
import {fetchAllRunningHours} from '../services/runningHourService';
import Transform from '../utils/Transformer';

const initialState = {
  list: [],
  meta: new Meta(),
  listStatus: 'idle'
};

export const runningHourListAsync = createAsyncThunk(
  'runningHour/fetchAllRunningHours',
  async (params) => {
    const response = await fetchAllRunningHours(params);
    const data = Transform.fetchCollection(response.data, VesselMachineryRunningHour);
    const meta = Transform.fetchObject(response.meta, Meta);
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
        state.listStatus = 'loading';
      })
      .addCase(runningHourListAsync.fulfilled, (state, action) => {
        state.listStatus = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(runningHourListAsync.rejected, (state, action) => {
        state.listStatus = 'idle';
      });
  },
});

export const runningHourList = state => state.runningHour.list;
export const metaData = state => state.runningHour.meta;
export const reqListStatus = state => state.runningHour.listStatus;

export default runningHourSlice.reducer;
