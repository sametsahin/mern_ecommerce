import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import { getToken, configFile } from "../../../utils/getToken";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create brand action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getToken(getState());
      const config = configFile(token);

      //Images
      const { data } = await axios.post(
        `${baseURL}brands/create`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update brand action
export const updateBrandAction = createAsyncThunk(
  "brand/update",
  async ({ name, id }, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.put(
        `${baseURL}brands/update/${id}`,
        { name },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch brands action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch single coupon action
export const fetchSingleBrandAction = createAsyncThunk(
  "brands/single",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}brands/detail/${id}`, { id });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.brand = action.payload;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.brand = null;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = false;
      state.isUpdated = false;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchSingleBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    });
    builder.addCase(fetchSingleBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.error = action.payload;
    });
    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

//generate the reducer
const brandsReducer = brandsSlice.reducer;

export default brandsReducer;
