import { Outlet } from "react-router";
import Header from "./header/header";
import Footer from "./footer/footer";

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
};

export default Layout;
