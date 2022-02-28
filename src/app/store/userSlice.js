import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import User from '../core/models/User';
import Meta from '../core/models/Meta';
import {fetchAllUsers, fetchUser} from '../services/userService';
import Transform from '../utils/Transformer';

const initialState = {
  list: [],
  data: new User(),
  meta: new Meta(),
  listStatus: 'idle',
  dataStatus: 'idle'
};

export const userListAsync = createAsyncThunk(
  'user/fetchAllUsers',
  async (params) => {
    const response = await fetchAllUsers(params);
    const data = Transform.fetchCollection(response.data, User);
    const meta = Transform.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const userDataAsync = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await fetchUser()
    return Transform.fetchObject(response.meta, User);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userListAsync.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(userListAsync.fulfilled, (state, action) => {
        state.listStatus = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(userListAsync.rejected, (state, action) => {
        state.listStatus = 'idle';
      })
      .addCase(userDataAsync.pending, (state) => {
        state.dataStatus = 'loading';
      })
      .addCase(userDataAsync.fulfilled, (state, action) => {
        state.dataStatus = 'idle';
        state.data = action.payload.data;
      })
      .addCase(userDataAsync.rejected, (state, action) => {
        state.dataStatus = 'idle';
      });
  },
});

export const userData = state => state.user.data;
export const userList = state => state.user.list;
export const metaData = state => state.user.meta;
export const reqListStatus = state => state.user.listStatus;
export const reqDataStatus = state => state.user.dataStatus;

export default userSlice.reducer;
