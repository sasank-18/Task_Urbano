import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatePanditData } from "../api/updatePanditData";
import Cookies from "js-cookie";
import { panditSchema } from "../SchemaValidation/panditDataSchema";
import { useNavigate } from "react-router-dom";
import SpinLoader from "./SpinLoader";
import PropTypes from "prop-types";
import { useState } from "react";

const ProfileForm = ({
  error,
  setError,

  updataDataError,
  setUpdataDataError,
  editMode,
  setEditMode,
  loading,
  setLoading,
  panditData,
  setPanditData,
  pandit_id,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(panditSchema),
    defaultValues: {
      firstName: panditData.firstName || "",
      lastName: panditData?.lastName || "",
      phone: panditData?.phone || "",
    },
  });

  const handleFormSubmit = async (value) => {
    setError("");
    setLoading(true);
    try {
      const { response, error } = await updatePanditData(
        pandit_id,
        Cookies.get("authAccessToken"),
        { ...value }
      );

      console.log(error);
      if (error) {
        throw new Error();
      }

      setPanditData({
        phone: response?.results?.contact_number,
        lastName: response?.results?.last_name,
        firstName: response?.results?.first_name,
        imgUrl: response?.results?.profile_image,
      });

      if (panditData?.imgUrl) {
        setError(
          "Unable to save image, as permanent Image acccess is denied by server,and long string can'be update on server, sorry!"
        );
      }

      setUpdataDataError(false);

      setLoading(false);

      setEditMode(false);
    } catch (e) {
      console.log(e);
      setUpdataDataError(true);
      setEditMode(false);
      setPanditData({ ...panditData, imgUrl: "" });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col px-4 w-full max-w-96"
    >
      <label className="font-semibold  mb-[2px]">
        First Name<span className="text-red-600">*</span>
      </label>
      <input
        {...register("firstName")}
        className={`rounded-md bg-slate-50 border-gray-500 px-3 ${
          !editMode ? "text-gray-400" : "text-black "
        }  border py-2`}
        placeholder="First Name"
        type="text"
        disabled={!editMode}
      />
      <p className=" text-xs px-1 text-red-600  mb-2">
        {" "}
        {errors?.firstName && errors.firstName.message}
      </p>

      <label className="font-semibold border-gray-500  mb-[2px]">
        Last Name<span className="text-red-600">*</span>
      </label>
      <input
        {...register("lastName")}
        className={`rounded-md bg-slate-50 border-gray-500 px-3 ${
          !editMode ? "text-gray-400" : "text-black "
        }  border py-2`}
        placeholder="Last Name"
        type="text"
        disabled={!editMode}
      />
      <p className=" text-xs px-1 text-red-600  mb-2">
        {" "}
        {errors?.lastName && errors.lastName.message}
      </p>

      <label className="font-semibold mb-[2px]">
        Phone Number<span className="text-red-600">*</span>
      </label>
      <input
        {...register("phone")}
        className={`rounded-md bg-slate-50 border-gray-500 px-3 ${
          !editMode ? "text-gray-400  " : "text-black "
        }  border py-2`}
        placeholder="Number"
        type="tel"
        disabled={!editMode}
      />
      <p className=" text-xs text-red-600 px-1  mb-4">
        {" "}
        {errors?.phone && errors.phone.message}
      </p>
      {updataDataError && (
        <p className="text-sm pb-1 text-red-600 font-medium">
          Enable to save, try again later.
        </p>
      )}

      <div className="flex items-center gap-x-3 justify-between">
        {!editMode && (
          <button
            onClick={() => {
              setEditMode(true);
            }}
            className="px-2 py-2 flex-1  font-semibold rounded-md text-white bg-green-600"
          >
            Edit
          </button>
        )}
        {!editMode && (
          <>
            <button
              onClick={() => {
                navigate("/Categories");
              }}
              className="px-2 py-2 flex-1  font-semibold rounded-md text-white bg-red-600"
            >
              Next
            </button>
          </>
        )}
        {editMode && (
          <>
            <button
              onClick={() => {
                setEditMode(false);
                console.log(panditData)
              }}
              className="px-2 py-2 flex-1 font-semibold rounded-md text-white bg-red-600"
            >
              back
            </button>
            <button
              className="px-2 py-2 flex-1 font-semibold rounded-md text-white bg-green-600"
              type="submit"
            >
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  error: PropTypes.string,
  setError: PropTypes.func,
  updataDataError: PropTypes.bool,
  setUpdataDataError: PropTypes.func,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  loading: PropTypes.bool, // Loading state
  setLoading: PropTypes.func, // Function to set loading state
  panditData: PropTypes.shape({
    // Pandit data object
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    imgUrl: PropTypes.string,
  }),
  setPanditData: PropTypes.func, // Function to set pandit data
  pandit_id: PropTypes.string,
};
