import { useNavigate, useSearchParams } from "react-router-dom";
import MandalaBgLayout from "../layout/MandalaBGLayout";
import ItemCard from "../Component/ItemCard";
import { useEffect, useState } from "react";
import { getAllServiceData } from "../api/getAllServices";
import Cookies from "js-cookie";
import SpinLoader from "../Component/SpinLoader";
import { getPanditService } from "../api/getPanditService";
import { addPanditServices } from "../api/addPanditServices";
import Successfull from "../Component/Successfull";

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [serviceData, setServiceData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [success, setSuccess] = useState()

  const filter = searchParams.get("filter")?.split(",");

  async function getServicesAndGetPanditServiceData() {
    //get service
    const data1 = await getAllServiceData(
      Cookies.get("authAccessToken"),
      JSON.stringify({ category: filter })
    );
    if(data1.error) { 
        setLoading(false);
        navigate('/error', { state: data1.error }); 
    }
    setServiceData(data1?.response?.results?.data);

    // get pandit services
    const data2 = await getPanditService(Cookies.get("authAccessToken"));

    if(data2.error){
      setLoading(false);
      navigate('/error', { state: data2.error }); 
     }

    const selectedItem = data2?.response?.results?.data?.map((data) => {
      return {
        service: parseInt(data?.service),
        dakshina: parseInt(data?.dakshina),
        duration: parseInt(data?.duration),
        category: parseInt(data?.category),
        active: true,
        itemAlreadyExist: true,
      };
    });
    console.log(selectedItem);

    setSelectedServices(selectedItem);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getServicesAndGetPanditServiceData();
  }, []);

  return loading ? (
    <SpinLoader />
  ) : (
    <MandalaBgLayout>
      <div className="pt-20">
        <h1 className="text-center text-4xl sticky top-20 font-bold">
          Select Services
        </h1>

        <section className="grid py-2 pr-2 overflow-y-auto max-h-[calc(100vh-240px)] gap-8 grid-cols-1  max-sm:gap-4 sm:gap-5 mt-6 md:grid-cols-2 lg:grid-cols-3  ">
          {serviceData?.map((data) => (
            <ItemCard
              categoryId={data.category[0].id}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              id={data?.id}
              key={data?.id}
              cardType="Service"
              imgUrl={data?.logo_image}
              title={data?.name}
              title_local_lang={data?.name_local_lang}
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

        <button
          onClick={async () => {
            const dataTobeSend = selectedServices
              ?.filter((data) => !data.itemAlreadyExist && data.service)
              ?.map((data) => {
                return {
                  service: parseInt(data.service),
                  dakshina: parseInt(data.dakshina),
                  duration: parseInt(data?.duration),
                  category: parseInt(data?.category),
                };
              });

            if (dataTobeSend.length === 0)
              return alert("Select the service first!");
            setLoading(true);

            console.log(dataTobeSend);
            
            const { response, error } = await addPanditServices(
              Cookies.get("authAccessToken"),
              dataTobeSend
            );
            console.log(response, error);
            if(response) setSuccess(true)
            setLoading(false);

          }}
          className="text-center max-w-[30rem] mx-12 bg-[#DB2C1D] flex-1  py-2 rounded-md text-white font-semibold px-4"
        >
          Save
        </button>
      </div>
     {success && <Successfull/>} 
    </MandalaBgLayout>
  );
};

export default Services;
