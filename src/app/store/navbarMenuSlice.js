import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Vessel from '../core/models/Vessel';
import {fetchAllVessels} from '../services/vesselService';
import Transformer from '../utils/Transformer';

const initialState = {
  vesselList: null,
  selectedVessel: new Vessel(),
  status: 'idle'
};

export const vesselListAsync = createAsyncThunk(
  'navbarMenu/fetchAllVessels',
  async (params) => {
    const response = await fetchAllVessels(params);
    return Transformer.fetchCollection(response.data, Vessel);
  }
);

export const navbarMenuSlice = createSlice({
  name: 'navbarMenu',
  initialState,
  reducers: {
    setSelectedVessel: (state, action) => {
      state.selectedVessel = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(vesselListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(vesselListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vesselList = action.payload;
        state.selectedVessel = action.payload[0];
      })
  },
});

export const {setSelectedVessel} = navbarMenuSlice.actions;

export const vesselList = state => state.navbarMenu.vesselList;
export const selectedVessel = state => state.navbarMenu.selectedVessel;
export const reqStatus = state => state.navbarMenu.status;

export default navbarMenuSlice.reducer;
