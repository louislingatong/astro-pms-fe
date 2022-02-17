import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProfile} from '../services/profileService';
import User from '../core/models/User';
import Transformer from '../utils/Transformer';

const initialState = {
  data: new User(),
  status: 'idle'
};

export const profileAsync = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await fetchProfile();
    const data = Transformer.fetchObject(response.data, User)
    return {data};
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(profileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const profile = state => state.profile.data;
export const status = state => state.profile.status;

export default profileSlice.reducer;
