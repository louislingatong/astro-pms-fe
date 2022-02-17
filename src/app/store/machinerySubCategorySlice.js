import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import MachinerySubCategory from '../core/models/MachinerySubCategory';
import Meta from '../core/models/Meta';
import {fetchAllSubCategories, fetchSubCategory} from '../services/subCategoryService';
import Transformer from '../utils/Transformer';

const initialState = {
  list: [],
  data: new MachinerySubCategory(),
  meta: new Meta(),
  status: 'idle'
};

export const subCategoryListAsync = createAsyncThunk(
  'machinerySubCategory/fetchAllSubCategories',
  async (params) => {
    const response = await fetchAllSubCategories(params);
    const data = Transformer.fetchCollection(response.data, MachinerySubCategory);
    const meta = Transformer.fetchObject(response.meta, Meta);
    return {data, meta};
  }
);

export const subCategoryDataAsync = createAsyncThunk(
  'machinerySubCategory/fetchSubCategory',
  async () => {
    const response = await fetchSubCategory()
    return Transformer.fetchObject(response.meta, MachinerySubCategory);
  }
);

export const machinerySubCategorySlice = createSlice({
  name: 'machinerySubCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subCategoryListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subCategoryListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(subCategoryDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subCategoryDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
      })
  },
});

export const machinerySubCategoryData = state => state.machinerySubCategory.data;
export const machinerySubCategoryList = state => state.machinerySubCategory.list;
export const metaData = state => state.machinerySubCategory.meta;
export const reqStatus = state => state.machinerySubCategory.status;

export default machinerySubCategorySlice.reducer;
