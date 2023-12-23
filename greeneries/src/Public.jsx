import React, { Suspense } from "react";
import "./App.css";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Components/Suspense/Loading";

export default function Public() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // isAuthenticated ?
  return (
    //   <Navigate to="/" />
    // ) : (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}
