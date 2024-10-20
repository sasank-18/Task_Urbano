import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="absolute top-0 left-0 min-w-full min-h-screen">
      <Outlet />

      </div>
    </>
  );
};

export default AppLayout;
