import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachinerySubCategoryWork from '../core/models/VesselMachinerySubCategoryWork';
import Meta from '../core/models/Meta';
import {fetchAllWorks} from '../services/workService';
import Transform from '../utils/Transformer';

const initialState = {
  list: [],
  meta: new Meta(),
  listStatus: 'idle'
};

export const workListAsync = createAsyncThunk(
  'work/fetchAllWorks',
  async (params) => {
    const response = await fetchAllWorks(params);
    const data = Transform.fetchCollection(response.data, VesselMachinerySubCategoryWork);
    const meta = Transform.fetchObject(response.meta, Meta);
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
        state.listStatus = 'loading';
      })
      .addCase(workListAsync.fulfilled, (state, action) => {
        state.listStatus = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(workListAsync.rejected, (state, action) => {
        state.listStatus = 'idle';
      })
  },
});

export const workList = state => state.work.list;
export const metaData = state => state.work.meta;
export const reqListStatus = state => state.work.listStatus;

export default workSlice.reducer;
