import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Vessel from '../core/models/Vessel';
import Meta from '../core/models/Meta';
import {fetchAll, fetchById} from '../services/vesselService';
import Transform from '../utils/Transformer';

const initialState = {
  list: [],
  data: new Vessel(),
  meta: new Meta(),
  listStatus: 'idle',
  dataStatus: 'idle'
};

export const vesselListAsync = createAsyncThunk(
  'vessel/fetchAllVessels',
  async (params) => {
    const response = await fetchAll(params);
    const data = Transform.fetchCollection(response.data, Vessel);
    const meta = Transform.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const vesselDataAsync = createAsyncThunk(
  'vessel/fetchVessel',
  async () => {
    const response = await fetchById()
    return Transform.fetchObject(response.meta, Vessel);
  }
);

export const vesselSlice = createSlice({
  name: 'vessel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vesselListAsync.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(vesselListAsync.fulfilled, (state, action) => {
        state.listStatus = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(vesselListAsync.rejected, (state, action) => {
        state.listStatus = 'idle';
      })
      .addCase(vesselDataAsync.pending, (state) => {
        state.dataStatus = 'loading';
      })
      .addCase(vesselDataAsync.fulfilled, (state, action) => {
        state.dataStatus = 'idle';
        state.data = action.payload.data;
      })
      .addCase(vesselDataAsync.rejected, (state, action) => {
        state.dataStatus = 'idle';
      });
  },
});

export const vesselData = state => state.vessel.data;
export const vesselList = state => state.vessel.list;
export const metaData = state => state.vessel.meta;
export const reqListStatus = state => state.vessel.listStatus;
export const reqDataStatus = state => state.vessel.dataStatus;

export default vesselSlice.reducer;
