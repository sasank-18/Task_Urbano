import { useNavigate } from "react-router-dom";

const Successfull = () => {
 
    const navigate = useNavigate()

  return (
    <div className="backdrop-blur-sm z-0 min-h-screen min-w-full flex items-center justify-center fixed top-0 left-0">
      <div className=" backdrop-blur-sm py-12  px-12 rounded-lg min-h-[40%] max-h-auto w-auto flex items-center flex-col justify-center bg-black opacity-70">
         <h1 className="text-center font-bold text-2xl px-4 text-white py-8">Your Item has be added Successfully!</h1>
         <button onClick={()=>{
            navigate("/pandit_service")
         }} className=" px-4 py-2  bg-red-500 text-white rounded-md  font-semibold text-center">View Your Services</button>
      </div>
    </div>
  );
};

export default Successfull;
