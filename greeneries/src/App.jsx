import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Public from "./Public";
import Private from "./Private";
import DashboardMain from "./layouts/DashboardMain/DashboardMain.";
import Checkout from "./layouts/Checkout/Checkout";
const MainPage = lazy(() => import("./layouts/MainPage/MainPage"));
const BlogPost = lazy(() => import("./layouts/BlogPage/BlogPost"));
const ProductPage = lazy(() => import("./Components/Product/ProductPage"));
const Cart = lazy(() => import("./layouts/Cart/Cart"));
const Collection = lazy(() => import("./layouts/Collection/Collection"));

function App() {
  return (
    <Routes>
      <Route element={<Public />}></Route>
      <Route element={<Private />}>
        <Route path="/" element={<DashboardMain />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/product/buy" element={<ProductPage />} />
          <Route path="/product/cart" element={<Cart />} />
          <Route path="/product/collection" element={<Collection />} />
          <Route path="/product/buy/checkout" element={<Checkout />} />
          {/* chekout and collection of plants on basisi of anything with filter */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
