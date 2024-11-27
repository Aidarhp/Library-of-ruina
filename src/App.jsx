import React from "react";
import "./sass/style.scss";
import Layout from "./layout/layout";
import { Route, Routes } from "react-router";
import Registrate from "./pages/registration/registration";
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/registrate" element={<Registrate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
