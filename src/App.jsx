import React from "react";
import "./sass/style.scss";
import Layout from "./layout/layout";
import { Route, Routes } from "react-router";
function App() {
  return (
   <>
   <Routes>
    <Route path="" element={<Layout/>}>
    </Route>
   </Routes>
   </>
  );
}

export default App;
