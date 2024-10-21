import { useLocation, useNavigate } from "react-router-dom";
import { PiMaskSadBold } from "react-icons/pi";
import Cookies from "js-cookie";

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state || {}; // Destructuring the data
  return (
    <div className="flex items-center justify-center min-h-screen   w-full bg-black">
      <div
        className="flex items-center flex-col justify-center h-auto   p-4 mb-4 px-4 text-red-800 bg-white  mx-4 border-red-600 border-4 rounded-lg max-w-lg w-full"
        role="alert"
      >
        <PiMaskSadBold className="w-12 h-12 text-black mb-3" />
        <p className=" w-full h-auto text-wrap text-center mt-2 font-medium text-2xl text-red-600">
          {error.message}
        </p>
        {Cookies.get(
          "authAccessToken") ? (
            <button
              onClick={() => {
                navigate(`/profile/${Cookies.get("user_id")}`);
              }}
              className="bg-red-600 rounded-md text-white mt-8 w-full px-2 py-2 font-bold text-lg "
            >
              Go to Home Page
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-red-600 rounded-md text-white mt-8 w-full px-2 py-2 font-bold text-lg "
            >
              Go to Home Page
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Error;
