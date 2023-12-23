import React, { Suspense } from "react";
import "./App.css";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Components/Suspense/Loading";

export default function Private() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // isAuthenticated ?
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>

    // ) : (
    //   <Navigate to="/SignIn" />
  );
}
