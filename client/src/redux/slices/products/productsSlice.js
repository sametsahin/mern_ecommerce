import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, configFile } from "../../../utils/getToken";

//initial States
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      const token = getToken(getState());
      const config = configFile(token, "ml");

      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("totalQty", totalQty);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });

      files.forEach((file) => {
        formData.append("files", file);
      });
      const { data } = await axios.post(`${baseURL}products`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update product action
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        id,
      } = payload;
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.put(
        `${baseURL}products/${id}`,
        {
          name,
          description,
          category,
          sizes,
          brand,
          colors,
          price,
          totalQty,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch products action
export const fetchAllProductsAction = createAsyncThunk(
  "product/list",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    //url used for product filtering

    try {
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch product action
export const fetchSingleProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.get(
        `${baseURL}products/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchAllProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchSingleProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });
    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const productReducer = productSlice.reducer;

export default productReducer;
