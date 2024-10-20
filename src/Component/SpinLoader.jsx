import {  TbLoader3 } from "react-icons/tb";

const SpinLoader = () => {
  return (
<div className="flex absolute top-0  z-30 backdrop-blur-[1.5px] left-0 w-full items-center justify-center h-screen">
      <div className=" animate-spin   " >
        <TbLoader3 className="w-16 h-16  rounded-full  text-[#DB2C1D]  "/>
      </div>
    </div>  )
}


export default SpinLoader