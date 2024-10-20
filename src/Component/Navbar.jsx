import logo from "../assets/Logo.svg";
import Cookies from "js-cookie";

const Navbar = () => {
  const token = Cookies.get("authAccessToken")

  return (
    <nav className="px-4 py-2 z-10 fixed mx-4 top-[14px] w-[calc(100vw-50px)] flex justify-between items-center bg-[#DB2C1D] rounded-md  ">
      <img alt="Logo" width={36} height={36} src={logo} />
      

      {!token  && <p className="font-normal text-white text-base">Don&apos;t have an account?</p> }
    </nav>
  );
};

export default Navbar;
