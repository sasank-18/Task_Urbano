import { useRef, useState } from "react";
import { sendOtp } from "../api/sendOtp";
import { panditLogin } from "../api/panditLogin";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [number, setnumber] = useState("");
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();


  const panditData = useRef({
    contact_number: "",
    otp: "",
  });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null)

    if (!response) {
      const { response, error } = await sendOtp(number);
      if (error) {
        setLoading(false);
        return setError(error);
      }

      setResponse(response);
      console.log(response)
      panditData.current.contact_number = number;
      setnumber("");
      console.log(panditData);
    } else {

      console.log(panditData.current.contact_number, otp)
      
      const { response, error } = await panditLogin(panditData.current.contact_number, otp);

      if (error) {
        setLoading(false);
        return setError(error);
      }

      console.log(response)

      Cookies.set('authAccessToken',response?.results?.access, {
        expires: 1, 
        path: '/',  
        secure: true, 
        sameSite: 'Strict',
      });
      
      navigate(`/profile/${response?.results?.data?.user_id}`)      
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSendOtp}
        className="absolute top-0 left-0  min-h-screen min-w-full flex justify-center items-center"
      >
        <div className=" w-full max-w-80 ">
          <h1 className="font-bold text-3xl mb-4">Log In</h1>
          <label className="mb-2 block font-medium">
            {response ? "Enter OTP" : "Enter Mobile no."}
          </label>
          <input
            onChange={(e) => {
             response ? setOtp(e.target.value) : setnumber(e.target.value);
            }}
            value={response ? otp : number}
            placeholder="Value"
            className=" rounded-md w-full    px-3 py-1"
            type="tel"
          />
          <p className="p-1 text-red-500 font-medium text-xs">{error}</p>

          <button
            disabled={loading}
            className="text-white mt-8 rounded-md bg-[#DB2C1D]  block font-semibold w-full  text-center py-1 px-4"
            type="submit"
          >
            {response
              ? loading
                ? "Logging In..."
                : "Submit"
              : loading
              ? "Sending..."
              : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
