import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Navbar from "./components/Navbar/Navbar";

//admin
import AdminDashboard from "./components/Admin/AdminDashboard";
import Settings from "./components/Admin/Settings.js";

import { Brands, AddBrand, UpdateBrand } from "./components/Admin/Brands";
import {
  Categories,
  AddCategory,
  UpdateCategory,
} from "./components/Admin/Categories";
import { Colors, AddColor, UpdateColor } from "./components/Admin/Colors";
import { Coupons, AddCoupon, UpdateCoupon } from "./components/Admin/Coupons";
import {
  Customers,
  AddCustomer,
  UpdateCustomer,
} from "./components/Admin/Customers";
import {
  Orders,
  OrdersList,
  OrdersStats,
  UpdateOrder,
} from "./components/Admin/Orders";
import {
  Products,
  AddProduct,
  UpdateProduct,
} from "./components/Admin/Products";

//frontpage
import { HomePage, AllCategories } from "./components/HomePage";
//users
import { Login, RegisterForm } from "./components/Users/Forms";
import {
  OrderPayment,
  Product,
  ShoppingCart,
  ProductsFilters,
  ThanksForOrdering,
} from "./components/Users/Products";
import { CustomerProfile } from "./components/Users/Profile";
import AddReview from "./components/Users/Reviews/AddReview";
import { AdminRoute, AuthRoute } from "./components/AuthRoute/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      {/* hide navbar if admin */}
      <Routes>
        {/* admin routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* Brand */}
          <Route
            path="brands"
            element={
              <AdminRoute>
                <Brands />
              </AdminRoute>
            }
          />
          <Route
            path="brands/add"
            element={
              <AdminRoute>
                <AddBrand />
              </AdminRoute>
            }
          />
          <Route
            path="brands/edit/:id"
            element={
              <AdminRoute>
                <UpdateBrand />
              </AdminRoute>
            }
          />
          {/* Category */}
          <Route
            path="categories"
            element={
              <AdminRoute>
                <Categories />
              </AdminRoute>
            }
          />
          <Route
            path="categories/add"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="categories/edit/:id"
            element={
              <AdminRoute>
                <UpdateCategory />
              </AdminRoute>
            }
          />
          {/* Color */}
          <Route
            path="colors"
            element={
              <AdminRoute>
                <Colors />
              </AdminRoute>
            }
          />
          <Route
            path="colors/add"
            element={
              <AdminRoute>
                <AddColor />
              </AdminRoute>
            }
          />
          <Route
            path="colors/edit/:id"
            element={
              <AdminRoute>
                <UpdateColor />
              </AdminRoute>
            }
          />
          {/* Coupon */}
          <Route path="coupons" element={<Coupons />} />
          <Route
            path="coupons/add"
            element={
              <AdminRoute>
                <AddCoupon />
              </AdminRoute>
            }
          />
          <Route
            path="coupons/edit/:code"
            element={
              <AdminRoute>
                <UpdateCoupon />
              </AdminRoute>
            }
          />
          {/* Customer */}
          <Route
            path="customers"
            element={
              <AdminRoute>
                <Customers />
              </AdminRoute>
            }
          />
          <Route
            path="customers/add"
            element={
              <AdminRoute>
                <AddCustomer />
              </AdminRoute>
            }
          />
          <Route
            path="customers/edit/:code"
            element={
              <AdminRoute>
                <UpdateCustomer />
              </AdminRoute>
            }
          />
          {/* Order */}
          <Route
            path="orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
          <Route
            path="orders/stats"
            element={
              <AdminRoute>
                <OrdersStats />
              </AdminRoute>
            }
          />
          <Route
            path="orders/update/:id"
            element={
              <AdminRoute>
                <UpdateOrder />
              </AdminRoute>
            }
          />

          {/* products */}
          <Route
            path=""
            element={
              <AdminRoute>
                <OrdersList />
              </AdminRoute>
            }
          />
          <Route
            path="products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />
          <Route
            path="products/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />

          {/* settings */}
          <Route
            path="settings"
            element={
              <AdminRoute>
                <Settings />
              </AdminRoute>
            }
          />
        </Route>
        {/* public links */}
        <Route path="order-payment" element={<OrderPayment />} />
        {/* Products */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="success" element={<ThanksForOrdering />} />

        {/* review */}
        <Route
          path="/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />

        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />

        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </BrowserRouter>
  );
};

export default App;
