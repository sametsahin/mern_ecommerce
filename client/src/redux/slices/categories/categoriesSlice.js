import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions.js";
import { getToken, configFile } from "../../../utils/getToken";

//initialState
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, file } = payload;
      const token = getToken(getState());
      const config = configFile(token);
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      const { data } = await axios.post(
        `${baseURL}categories`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch category action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
    });

    //reset err
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate a reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
