import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//parts
import Navbar from "./components/Parts/Navbar.js";

//admin
import {
  AdminDashboard,
  Brands,
  AddBrand,
  UpdateBrand,
  Categories,
  AddCategory,
  UpdateCategory,
  Colors,
  AddColor,
  UpdateColor,
  Coupons,
  AddCoupon,
  UpdateCoupon,
  Customers,
  AddCustomer,
  UpdateCustomer,
  Orders,
  OrdersList,
  OrdersStats,
  UpdateOrder,
  Products,
  AddProduct,
  UpdateProduct,
  Settings,
} from "./components/Admin/index.js";

//front
import {
  OrderPayment,
  ShoppingCart,
  CustomerProfile,
  Login,
  RegisterForm,
  AllCategories,
  HomePage,
  ProductPage,
  ProductsFilters,
  AddReview,
} from "./components/Front/index.js";

//notifications
import {
  ThanksForOrdering,
  CancelOrder,
} from "./components/Notifications/index.js";
import AdminRoute from "./components/AuthRoute/AdminRoute.js";
import AuthRoute from "./components/AuthRoute/AuthRoute.js";

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
        <Route
          path="/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route
          path="/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />
        <Route path="success" element={<ThanksForOrdering />} />
        <Route path="cancel" element={<CancelOrder />} />
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
