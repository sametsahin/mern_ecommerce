import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import cartReducer from "../slices/cart/cartSlice";
import couponReducer from "../slices/coupons/couponsSlice";
import orderReducer from "../slices/orders/ordersSlice";
import brandsReducer from "../slices/brands/brandsSlice";
import colorsReducer from "../slices/colors/colorsSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    carts: cartReducer,
    coupons: couponReducer,
    orders: orderReducer,
  },
});

export default store;
