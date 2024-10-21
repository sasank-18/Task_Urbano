import { useRef, useState } from "react";

import { validateServiceData } from "../utils/validateServiceData";
import PropTypes from 'prop-types';

const ItemCard = ({
  categoryId,
  selectedServices,
  setSelectedServices,
  id,
  selectedCategory,
  setSelectedCategory,
  cardType,
  title_local_lang,
  title,
  description,
}) => {
  const [serviceEditMode, setServiceEditMode] = useState(false);
  const [error, setError] = useState(false);
  const addHoursRef = useRef(null);
  const addPriceRef = useRef(null);

  const active =
    cardType === "Category"
      ? selectedCategory?.find((data) => data === id)
      : selectedServices?.find(
          (data) =>
            data.service === id && data?.active && !data.itemAlreadyExist
        );
  console.log(active);
  // data which is already exist in database shouldn't allow to re-update as there is not update api implemented yet

  const alreadyExistedPanditServiceData =
    cardType === "Service" &&
    selectedServices?.find(
      (data) => data.service === id && data.itemAlreadyExist
    );

  console.log(
    "alreadyExistedPanditServiceData",
    alreadyExistedPanditServiceData
  );

  const handleClick = async () => {
    if (cardType === "Category") {
      if (active) {
        const filterData = selectedCategory.filter((data) => data !== id);
        setSelectedCategory(filterData);
        return;
      }
      setSelectedCategory((prev) => [...prev, id]);
    } 
    
    else {
         
      if(alreadyExistedPanditServiceData)  return ;

      const DataExisted =
        selectedServices &&
        selectedServices?.find((data) => {
          return data?.service === id && data?.dakshina;
        });


      if (!DataExisted)
        return alert("fill the Dakshina and duration then select the service");

      if (active) {
        const updatedData = selectedServices.map((data) => {
          if (data?.service === id) {
            return {
              ...data,
              service: null,
              active: false,
            };
          }

          return data;
        });
        setSelectedServices(updatedData);
        return;
      }

      const updatedData = selectedServices.map((data) => {
        if (data?.service === id) {
          return {
            ...data,
            id: parseInt(id),
            active: true,
          };
        }

        return data;
      });

      setSelectedServices(updatedData);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { response, message } = validateServiceData(
      addPriceRef?.current.value,
      addHoursRef.current.value
    );

    if (!response) return setError(message);

    setError("");

    const DataExisted = selectedServices?.find((data) => {
      return data?.service === id;
    });

    if (DataExisted) {
      console.log("entered");
      const updatedData = selectedServices.map((data) => {
        if (data.service === id) {
          return {
            service: parseInt(id),
            dakshina: parseInt(addPriceRef?.current.value),
            duration: parseInt(addHoursRef.current.value),
            category: parseInt(categoryId),
            active: false,
          };
        }
        return data;
      });

      console.log("raj", updatedData);
      setServiceEditMode(false);

      setSelectedServices(updatedData);
      return;
    }

    setSelectedServices((prev) => [
      ...prev,
      {
        service: parseInt(id),
        dakshina: parseInt(addPriceRef?.current.value),
        duration: parseInt(addHoursRef.current.value),
        category: parseInt(categoryId),
        active: true,
      },
    ]);

    setServiceEditMode(false);
  };

  return (
    <>
      <article
        onClick={handleClick}
        className={`flex w-full ${
          active || alreadyExistedPanditServiceData
            ? "border-red-500 border-2"
            : ""
        }  rounded-lg shadow-md bg-white pl-4 py-4 pr-3 h-full gap-4  justify-start items-start`}
      >
        <img
          className=" h-auto rounded-md w-32 object-cover"
          alt="service image"
          src="https://s3-alpha-sig.figma.com/img/f9d3/d97a/9ce99316ef414376f3014b3de31e162b?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RReaZUti34qOqzHmwZOzYzzA6gJ6SUdrhkujGwYYxy0xp5n3yS~dpBjSXTcDhFD38mwPjYfj6RSbwPlDdh7ZdgnkALpli3yYgZCJCzCbwgH0mpptaUG1KpygIK3Hr6dDy69tKGzjGUajRKfr0MPkB3eUaTq8eMDY5~ogbcWcVwhQBbuFauDQ3vG94~AHK8nntJ9KJ8DXWCDZ~yqtew37iJ1lzjbbMd15enB6R7By~mqLQp8dDuHT85Vsrk2yTfE7bFpBUr~8LisueReh7yw4p~vb~tRIJ1PYkA56a5RAdTBBG-ANw-W24Neyb4yaSY4zM0n3~PfPusr2WLgpUUHEBg__"
        />

        <div className="w-full">
          <h3 className="text-base mb-[1px]  font-semibold line-clamp-1">
            {title}
          </h3>
          <p className=" text-gray-400 mb-1 text-xs">({title_local_lang})</p>
          {cardType === "Category" && (
            <p className="text-sm line-clamp-4 text-gray-600">{description}</p>
          )}

          {cardType === "Service" && (
            <>
              <form onSubmit={handleFormSubmit}>
                <div className="flex gap-x-1 mb-2  w-full">
                  <input
                    value={
                      alreadyExistedPanditServiceData &&
                      alreadyExistedPanditServiceData?.duration
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    ref={addHoursRef}
                    placeholder="Add hours"
                    className={`w-full flex-1 rounded-sm   bg-slate-50 text-xs outline-none text-center px-2 py-1 mt-2 ${
                      !serviceEditMode
                        ? "border  text-zinc-500 "
                        : "border border-green-600 "
                    }`}
                    type="text"
                    disabled={!serviceEditMode}
                  />

                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    ref={addPriceRef}
                    value={
                      alreadyExistedPanditServiceData &&
                      alreadyExistedPanditServiceData?.dakshina
                    }
                    placeholder="Add price"
                    className={`w-full flex-1 rounded-sm   bg-slate-50 text-xs outline-none text-center px-2 py-1 mt-2 ${
                      !serviceEditMode
                        ? "border text-zinc-500"
                        : "border border-green-600 "
                    }`}
                    type="text"
                    disabled={!serviceEditMode}
                  />
                </div>
                <p className="text-red-500 font-medium text-[11px]">{error}</p>
                {serviceEditMode && (
                  <button
                  
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-center w-full px-2 font-semibold py-1 bg-green-600 text-white text-xs rounded-sm"
                  >
                    Save
                  </button>
                )}
              </form>

              {!serviceEditMode && (
                <button
                    disabled={
                      alreadyExistedPanditServiceData &&
                      alreadyExistedPanditServiceData?.dakshina
                    }
                  onClick={(e) => {
                    e.stopPropagation();
                    setServiceEditMode(true);
                  }}
                  className={`text-center w-full px-2 font-semibold py-1 bg-red-600 ${alreadyExistedPanditServiceData && "opacity-70"} text-white text-xs rounded-sm`}
                >
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default ItemCard;










ItemCard.propTypes = {
  categoryId: PropTypes.number, // Ensure categoryId is a number and required
  selectedServices: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.number, // service should be a number
      dakshina: PropTypes.number, // dakshina is a number but not necessarily required
      duration: PropTypes.number, // duration is a number but not necessarily required
      category: PropTypes.number, // category is a number and required
      active: PropTypes.bool, // active is a boolean
      itemAlreadyExist: PropTypes.bool, // itemAlreadyExist is a boolean
    })
  ),
  setSelectedServices: PropTypes.func, // setSelectedServices should be a function
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // id can be a string or a number
  selectedCategory: PropTypes.arrayOf(PropTypes.number), // selectedCategory is an array of numbers
  setSelectedCategory: PropTypes.func, // setSelectedCategory should be a function
  cardType: PropTypes.oneOf(['Category', 'Service']), // cardType can either be 'Category' or 'Service'
  imgUrl: PropTypes.string, // imgUrl is a string and required
  title_local_lang: PropTypes.string, // title_local_lang is a string and required
  title: PropTypes.string, // title is a string and required
  description: PropTypes.string, // description is a string, but not required
};

