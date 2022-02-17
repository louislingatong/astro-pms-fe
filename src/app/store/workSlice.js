import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachinerySubCategoryWork from '../core/models/VesselMachinerySubCategoryWork';
import Meta from '../core/models/Meta';
import {fetchAllWorks} from '../services/workService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  meta: new Meta(),
  status: 'idle'
};

export const workListAsync = createAsyncThunk(
  'work/fetchAllWorks',
  async (params) => {
    const response = await fetchAllWorks(params);
    const data = Transformer.fetchCollection(response.data, VesselMachinerySubCategoryWork);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(workListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(workListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
  },
});

export const workList = state => state.work.list;
export const metaData = state => state.work.meta;
export const reqStatus = state => state.work.status;

export default workSlice.reducer;
