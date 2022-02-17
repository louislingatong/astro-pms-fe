import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Vessel from '../core/models/Vessel';
import Meta from '../core/models/Meta';
import {fetchAllVessels, fetchVessel} from '../services/vesselService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  data: new Vessel(),
  meta: new Meta(),
  status: 'idle'
};

export const vesselListAsync = createAsyncThunk(
  'vessel/fetchAllVessels',
  async (params) => {
    const response = await fetchAllVessels(params);
    const data = Transformer.fetchCollection(response.data, Vessel);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const vesselDataAsync = createAsyncThunk(
  'vessel/fetchVessel',
  async () => {
    const response = await fetchVessel()
    return Transformer.fetchObject(response.meta, Vessel);
  }
);

export const vesselSlice = createSlice({
  name: 'vessel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vesselListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vesselListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(vesselDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vesselDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const vesselData = state => state.vessel.data;
export const vesselList = state => state.vessel.list;
export const metaData = state => state.vessel.meta;
export const reqStatus = state => state.vessel.status;

export default vesselSlice.reducer;
