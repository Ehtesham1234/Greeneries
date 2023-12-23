import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Public from "./Public";
import Private from "./Private";
import DashboardMain from "./layouts/DashboardMain/DashboardMain.";
import MainPage from "./layouts/MainPage/MainPage";
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
          {/* <Route path="/User" element={<User />} />
            <Route path="/Doctors" element={<Doctors />} />
            <Route path="/Hospital" element={<Hospital />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
