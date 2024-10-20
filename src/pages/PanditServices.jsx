import ItemCard from "../Component/ItemCard";
import MandalaBgLayout from "../layout/MandalaBGLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../Component/SpinLoader";
import { getPanditService } from "../api/getPanditService";


const PanditServices = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [panditServiceData, setPanditServiceData] = useState([]);



  async function getPanditServiceData() {
    const {response, error} = await getPanditService(Cookies.get("authAccessToken"));

    if(error){
      setLoading(false);
      navigate('/error', { state: error }); 
     }
     
         setPanditServiceData(response?.results?.data);
   setLoading(false);

  }

 
  useEffect(() => {
    setLoading(true);
    getPanditServiceData();
  }, []);

  return loading ? (
    <SpinLoader />
  ) : (
    <MandalaBgLayout>
      <div className="pt-20">
        <h1 className="text-center text-4xl sticky top-20 font-bold">Your Services</h1>

        <section className="grid py-2 overflow-y-auto max-h-[calc(100vh-240px)] gap-8 grid-cols-1  max-sm:gap-4 sm:gap-5 mt-6 md:grid-cols-2 lg:grid-cols-3  ">
        {panditServiceData?.map((data) => (
            <ItemCard
              id={data?.id}
              key={data?.id}
              cardType="Category"
              imgUrl={data?.logo_image}
              title={data?.name}
              title_local_lang={data?.name_local_lang}
              description={data?.description}
            />
          ))}

        </section>
      </div>

      <div className="w-full fixed bottom-8 left-0  flex items-center gap-x-4 gap-y-3  justify-between">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-center mx-12 max-w-[30rem] bg-[#DB2C1D] flex-1  py-2 rounded-md text-white font-semibold px-4"
        >
          Prev
        </button>

 
      </div>
    </MandalaBgLayout>
  );
};

export default PanditServices;
