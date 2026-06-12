import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DeviceSimulator } from "./components/DeviceSimulator";
import { Layout } from "./components/Layout";

// Import Views
import { Splash } from "./views/auth/Splash";
import { Onboarding } from "./views/auth/Onboarding";
import { SignIn } from "./views/auth/SignIn";
import { Phone } from "./views/auth/Phone";
import { Verification } from "./views/auth/Verification";
import { Location } from "./views/auth/Location";
import { Login } from "./views/auth/Login";
import { SignUp } from "./views/auth/SignUp";

import { Home } from "./views/shop/Home";
import { Explore } from "./views/shop/Explore";
import { CategoryList } from "./views/shop/CategoryList";
import { ProductDetail } from "./views/shop/ProductDetail";
import { Search } from "./views/shop/Search";
import { Cart } from "./views/shop/Cart";
import { Favorites } from "./views/shop/Favorites";
import { Account } from "./views/shop/Account";

import { OrderSuccess } from "./views/checkout/OrderSuccess";
import { OrderFailure } from "./views/checkout/OrderFailure";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DeviceSimulator>
        <Layout>
          <Routes>
            {/* Auth & Onboarding Flow */}
            <Route path="/" element={<Splash />} />
            <Route path="/welcome" element={<Onboarding />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/phone" element={<Phone />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/location" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Main Application Shop Flow */}
            <Route path="/shop" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/category/:id" element={<CategoryList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/account" element={<Account />} />

            {/* Checkout Flow Results */}
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-failure" element={<OrderFailure />} />

            {/* Redirect any unmatched path to Splash */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </DeviceSimulator>
    </BrowserRouter>
  );
};

export default App;
