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
  orders: [],
  order: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  stats: null,
};

//create order action
export const placeOrderAction = createAsyncThunk(
  "order/place-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = payload;

      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.post(
        `${baseURL}orders`,
        { orderItems, shippingAddress, totalPrice },
        config
      );
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch orders action
export const fetchAllOrdersAction = createAsyncThunk(
  "orders/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.get(`${baseURL}orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch product action
export const fetchSingleOrderAction = createAsyncThunk(
  "orders/details",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.get(`${baseURL}orders/${orderId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch stats action
export const orderStatsAction = createAsyncThunk(
  "orders/stats",
  async (orderId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.get(`${baseURL}orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update order status
export const updateOrderAction = createAsyncThunk(
  "order/update-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { status, id } = payload;

      const token = getToken(getState());
      const config = configFile(token);

      const { data } = await axios.put(
        `${baseURL}orders/update/${id}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchAllOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchAllOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = null;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchSingleOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchSingleOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    });
    //stats
    builder.addCase(orderStatsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(orderStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(orderStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.stats = null;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
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
const orderReducer = orderSlice.reducer;

export default orderReducer;
