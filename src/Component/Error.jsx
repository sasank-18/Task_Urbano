import { useLocation, useNavigate } from "react-router-dom";
import { FaBalanceScaleRight } from "react-icons/fa";

const Error = () => {
     const navigate = useNavigate();
    const location = useLocation();
    const error = location.state || {}; // Destructuring the data
  return (
    <div className="flex items-center justify-center min-h-screen  w-full bg-red-100">
      <div
        className="flex items-center flex-col justify-center h-auto p-4 mb-4 text-red-800 bg-red-100 border border-red-400 rounded-lg max-w-lg w-full"
        role="alert"
      >
        
        <FaBalanceScaleRight className="w-8 h-6"/>
        <p  className=" w-full h-auto text-wrap text-center mt-2 font-medium text-lg text-red-600">{error.message}</p>
         <button onClick={()=>{navigate('/')}} className="bg-red-600 rounded-md text-white mt-8 w-full px-2 py-2 font-bold text-lg ">Go to Home Page</button>


      </div>
    </div>
  );
};

export default Error;
