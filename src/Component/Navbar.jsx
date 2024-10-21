import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Cookies from "js-cookie";

const Navbar = () => {
  const token = Cookies.get("authAccessToken");
  const navigate = useNavigate();

  return (
    <nav className="px-4 py-2 z-50 fixed mx-6 top-[14px] w-[calc(100vw-50px)] flex justify-between items-center bg-[#DB2C1D] rounded-md  ">
      <img alt="Logo" width={36} height={36} src={logo} />

      {!token ? (
        <p className="font-normal text-white text-base">
          Don&apos;t have an account?
        </p>
      ) : (
        <>
         <div className="flex  gap-2">
         <button
            onClick={() => {
              navigate("/pandit_service");
            }}
            className="font-normal text-red-600 text-base max-sm:text-xs px-3 rounded-full  py-1 bg-white  "
          >
            Your Service
          </button>
        
         
          <button
            onClick={() => {
              Cookies.remove("user_id", { path: "/" });
              Cookies.remove("authAccessToken", { path: "/" });

              navigate("/");
            }}
            className="font-normal text-red-600 text-base max-sm:text-xs px-3 rounded-full  py-1 bg-white  "
          >
            Logout
          </button>
         </div>

        </>
      )}
    </nav>
  );
};

export default Navbar;
