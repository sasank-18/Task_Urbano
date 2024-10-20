import profileBG from "../assets/profileBG.svg";
import mandala from "../assets/decorative-mandala.svg";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import getPanditById from "../api/getPanditById";
import { useNavigate, useParams } from "react-router-dom";
import { imageUploadAndGetUrl } from "../api/imageUpload";
import SpinLoader from "../Component/SpinLoader";
import ProfileForm from "../Component/ProfileForm";

const ProfileDetail = () => {
  const [editMode, setEditMode] = useState(false);

  const { pandit_id } = useParams();
  const [panditData, setPanditData] = useState({
    phone: "",
    lastName: "",
    firstName: "",
    imgUrl: "",
  });
  const [error, setError] = useState();
  const [updataDataError, setUpdataDataError] = useState(false);
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(true);

  async function getPanditData() {
    const { response, error } = await getPanditById(
      pandit_id,
      Cookies.get("authAccessToken")
    );

      if(error){
        setLoading(false);
        navigate('/error', { state: error }); 
       }

    setPanditData({
      phone: response?.results?.contact_number,
      lastName: response?.results?.last_name,
      firstName: response?.results?.first_name,
      imgUrl: response?.results?.profile_image,
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getPanditData();

  }, []);

  const handleFileSelect = async (e) => {
    if (!editMode) return;

    setLoading(true);
    const file = e.target.files[0]; // Get the selected file
    if (file && file.type.startsWith("image/")) {
      const { response, error } = await imageUploadAndGetUrl(file);
      console.log("l21ove", response);
      if (error) {
        setLoading(false);
        return setError(error);
      }
      setPanditData((prev) => ({ ...prev, imgUrl: response }));
    } else {
      console.error("Invalid file type. Please select an image.");
    }
    setLoading(false);
  };

  return loading ? (
    <SpinLoader />
  ) : (
    <>
      <main className="relative">
        <img
          alt="profilebg"
          className="w-full object-cover -mt-[17rem]"
          src={profileBG}
        />
        <img
          alt="profilebg"
          className="fixed opacity-45 -bottom-0 -z-20 left-20"
          width={2000}
          src={mandala}
        />

        <section
          className="fixed top-0 backdrop-blur-[1px] left-0 h-screen
        min-w-full flex justify-center flex-col items-center"
        >
          <h2 className="font-bold text-3xl mb-8">Profile Data</h2>
          <div className="relative mb-2">
            {panditData?.imgUrl ? (
              <img
                className="h-32 w-32 rounded-full object-cover"
                alt="profile-img"
                src={panditData?.imgUrl}
              />
            ) : (
              <FaUserCircle
                className={`h-32 w-32 opacity-50 ${!editMode ? "" : " "}`}
              />
            )}

            {/* Label triggers the hidden file input */}
            <label className="" htmlFor="file-input">
              {editMode && (
                <FaEdit className="h-6 w-6 opacity-60 absolute -top-1 -right-2 cursor-pointer" />
              )}
            </label>
            {error && (
              <p className="text-center text-xs text-red-500 mt-1 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Hidden file input */}
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            accept="image/*" // Only allow image file types
            style={{ display: "none" }} // Visually hide the file input
          />

          <ProfileForm
          updataDataError = {updataDataError}
           setUpdataDataError = {setUpdataDataError}
            editMode={editMode}
            setEditMode={setEditMode}
           
            loading={loading}
            setLoading={setLoading}
            panditData={panditData}
            setPanditData={setPanditData}
            pandit_id={pandit_id}
          />
        </section>
      </main>
      {loading && <SpinLoader />}
    </>
  );
};

export default ProfileDetail;
