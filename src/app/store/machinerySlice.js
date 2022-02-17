import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Machinery from '../core/models/Machinery';
import Meta from '../core/models/Meta';
import {fetchAllMachinery, fetchMachinery} from '../services/machineryService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  data: new Machinery(),
  meta: new Meta(),
  status: 'idle'
};

export const machineryListAsync = createAsyncThunk(
  'machinery/fetchAllMachinery',
  async (params) => {
    const response = await fetchAllMachinery(params);
    const data = Transformer.fetchCollection(response.data, Machinery);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const machineryDataAsync = createAsyncThunk(
  'machinery/fetchMachinery',
  async () => {
    const response = await fetchMachinery()
    return Transformer.fetchObject(response.meta, Machinery);
  }
);

export const machinerySlice = createSlice({
  name: 'machinery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(machineryListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(machineryListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(machineryDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(machineryDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const machineryData = state => state.machinery.data;
export const machineryList = state => state.machinery.list;
export const metaData = state => state.machinery.meta;
export const reqStatus = state => state.machinery.status;

export default machinerySlice.reducer;
