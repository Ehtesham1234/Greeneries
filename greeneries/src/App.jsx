import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Public from "./Public";
import Private from "./Private";
import DashboardMain from "./layouts/DashboardMain/DashboardMain.";
import MainPage from "./layouts/MainPage/MainPage";
import BlogPost from "./layouts/BlogPage/BlogPost";
import ProductPage from "./Components/Product/ProductPage";
import Cart from "./layouts/Cart/Cart";
import Collection from "./layouts/Collection/Collection";
const SignInAndSignUp = lazy(() =>
  import("./Components/SignInAndSignUp/SignInAndSignUp")
);

function App() {
  return (
    <Routes>
      <Route element={<Public />}>
        <Route path="/signup&signin" element={<SignInAndSignUp />} />
      </Route>
      <Route element={<Private />}>
        <Route path="/" element={<DashboardMain />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/product/buy" element={<ProductPage />} />
          <Route path="/product/cart" element={<Cart />} />
          <Route path="/product/collection" element={<Collection />} />
          {/* chekout and collection of plants on basisi of anything with filter */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
