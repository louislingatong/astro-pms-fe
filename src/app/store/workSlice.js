import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import VesselMachinerySubCategoryWork from '../core/models/VesselMachinerySubCategoryWork';
import Meta from '../core/models/Meta';
import {fetchAll, add} from '../services/workService';
import Transform from '../utils/Transformer';

const initialState = {
  doneList: [],
  list: [],
  meta: new Meta(),
  listStatus: 'idle',
  doneListStatus: 'idle'
};

export const workListAsync = createAsyncThunk(
  'work/fetchAllWorks',
  async (params) => {
    const response = await fetchAll(params);
    const data = Transform.fetchCollection(response.data, VesselMachinerySubCategoryWork);
    const meta = Transform.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const workAddAsync = createAsyncThunk(
  'work/addNewWork',
  async (params) => {
    const response = await add(params);
    return Transform.fetchCollection(response.data, VesselMachinerySubCategoryWork);
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
      .addCase(workAddAsync.pending, (state) => {
        state.doneListStatus = 'loading';
      })
      .addCase(workAddAsync.fulfilled, (state, action) => {
        state.doneListStatus = 'idle';
        state.doneList = action.payload;
      })
      .addCase(workAddAsync.rejected, (state, action) => {
        state.doneListStatus = 'idle';
      });
  },
});

export const workDoneList = state => state.work.doneList;
export const workList = state => state.work.list;
export const metaData = state => state.work.meta;
export const reqListStatus = state => state.work.listStatus;
export const reqDoneListStatus = state => state.work.doneListStatus;

export default workSlice.reducer;
