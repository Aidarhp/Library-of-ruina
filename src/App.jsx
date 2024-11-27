import React from "react";
import "./sass/style.scss";
import Layout from "./layout/layout";
import { Route, Routes } from "react-router";
import Registrate from "./pages/registration/registration";
import Home from "./pages/home/home";
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
        <Route path="/" element={<Home/>}/>
          <Route path="/registrate" element={<Registrate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
