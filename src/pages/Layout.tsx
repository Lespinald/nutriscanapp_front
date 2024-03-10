import "./Layout.css"

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <Outlet/>
    <nav className="layoutNav">
      <Link to="/">Home</Link> &nbsp;
      <Link to="/Scan">Scan</Link> &nbsp;
      <Link to="/Login">Login</Link> &nbsp;
    </nav>
    </>
  );
}

export default Layout;
