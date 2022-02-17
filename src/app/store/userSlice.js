import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import User from '../core/models/User';
import Meta from '../core/models/Meta';
import {fetchAllUsers, fetchUser} from '../services/userService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: null,
  data: new User(),
  meta: new Meta(),
  status: 'idle'
};

export const userListAsync = createAsyncThunk(
  'user/fetchAllUsers',
  async (params) => {
    const response = await fetchAllUsers(params);
    const data = Transformer.fetchCollection(response.data, User);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const userDataAsync = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await fetchUser()
    return Transformer.fetchObject(response.meta, User);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(userDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const userData = state => state.user.data;
export const userList = state => state.user.list;
export const metaData = state => state.user.meta;
export const reqStatus = state => state.user.status;

export default userSlice.reducer;
