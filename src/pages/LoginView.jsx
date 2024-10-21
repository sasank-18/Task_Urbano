import loginBg from "../assets/LoginBG.svg";
import panditJi from "../assets/pandit.svg";
import mandala from "../assets/decorative-mandala.svg";
import LoginForm from "../Component/LoginForm";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const LoginView = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (Cookies.get("authAccessToken")) {
      navigate(`/profile/${Cookies.get("user_id")}`);
    }
  }, [navigate]);


  return (
    <section className="flex   items-end justify-between  w-full  ">
      <div className="w-[45%] max-sm:w-full relative ">
        <img
          className="h-screen w-full object-cover "
          alt="Logo"
          src={loginBg}
        />
       <LoginForm/>
      </div>

      <div className="w-[53%] max-sm:hidden relative flex justify-end items-end">
        <h3 className=" fixed top-56 right-[24%] font-semibold text-4xl leading-normal w-[28rem]">
          पूजा पाठ हो या अनुष्ठान,
          <span className="text-red-600 ">पंडित</span> मिलना हुआ आसान।{" "}
        </h3>
        <img alt="Logo" className="absolute   " width={650} src={mandala} />
        <img
          alt="Logo"
          className="z-20 w-[72%] object-cover"
          height={500}
          src={panditJi}
        />
      </div>
    </section>
  );
};

export default LoginView;
