import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachinery from '../core/models/VesselMachinery';
import Meta from '../core/models/Meta';
import {fetchAllVesselMachinery, fetchVesselMachinery} from '../services/vesselMachineryService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  data: new VesselMachinery(),
  meta: new Meta(),
  status: 'idle'
};

export const vesselMachineryListAsync = createAsyncThunk(
  'vesselMachinery/fetchAllVesselMachinery',
  async (params) => {
    const response = await fetchAllVesselMachinery(params);
    const data = Transformer.fetchCollection(response.data, VesselMachinery);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const vesselMachineryDataAsync = createAsyncThunk(
  'vesselMachinery/fetchVesselMachinery',
  async () => {
    const response = await fetchVesselMachinery()
    return Transformer.fetchObject(response.meta, VesselMachinery);
  }
);

export const vesselMachinerySlice = createSlice({
  name: 'vesselMachinery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vesselMachineryListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vesselMachineryListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(vesselMachineryDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vesselMachineryDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const vesselMachineryData = state => state.vesselMachinery.data;
export const vesselMachineryList = state => state.vesselMachinery.list;
export const metaData = state => state.vesselMachinery.meta;
export const reqStatus = state => state.vesselMachinery.status;

export default vesselMachinerySlice.reducer;
