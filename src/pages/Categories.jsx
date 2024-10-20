import ItemCard from "../Component/ItemCard";
import MandalaBgLayout from "../layout/MandalaBGLayout";
import { useEffect, useState } from "react";
import { getCategories } from "../api/getCategories";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../Component/SpinLoader";


const Categories = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);



  async function getPanditsCategory() {
    const { response, error } = await getCategories(Cookies.get("authAccessToken"));
     if(error){
      setLoading(false);
      navigate('/error', { state: error }); 
       return ;
     }
    setCategoryData(response?.results?.data);
    setLoading(false);
  }

  const handleClick = async () => {
  

   navigate(`/services${selectedCategory.length >0 ? `?filter=${selectedCategory}`: ""}`)
  };

  useEffect(() => {
    setLoading(true);
    getPanditsCategory();
  }, []);

  return loading ? (
    <SpinLoader />
  ) : (
    <MandalaBgLayout>
      <div className="pt-20">
        <h1 className="text-center text-4xl sticky top-20 font-bold">Categories Of Pooja</h1>

        <section className="grid py-2 overflow-y-auto max-h-[calc(100vh-240px)] gap-8 grid-cols-1  max-sm:gap-4 sm:gap-5 mt-6 md:grid-cols-2 lg:grid-cols-3  ">
          {categoryData?.map((data) => (
            <ItemCard
              id={data?.id}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              key={data?.id}
              cardType="Category"
              imgUrl={data?.image}
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

        <button
          onClick={handleClick}
          className="text-center max-w-[30rem] mx-12 bg-[#DB2C1D] flex-1  py-2 rounded-md text-white font-semibold px-4"
        >
          Next
        </button>
      </div>
    </MandalaBgLayout>
  );
};

export default Categories;
