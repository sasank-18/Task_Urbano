export const imageUploadAndGetUrl = async (file) => {


  try {

    //api call to get presigned url 
    const data = await  getPresigned_url();

    if (data.error) {
      return { response : data.response, error : data.error };
    }

    const presigned_url = data?.response?.results?.presigned_url;
    const file_name = data?.response?.results?.file_name;


   //api call to uploadImage using put method;
   const data2= await uploadImage_on_PresignedUrl(presigned_url,file);



   if(data2.error){
      return { response : data2.response, error : data2.error };
   }


   // api call to get imge String
   const data3 =await getFinalImageString(file_name)
   console.log(data3);
   if(data3.error){
    return { response : data3.response, error : data3.error };
   }

   return {response : data3.response.results.presigned_url , error : data3.error}




  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    return null; // Handle the error appropriately
  }
};

async function getPresigned_url() {
  let response;
  let error;

  try {
    const responseApi = await fetch(
      `${import.meta.env.VITE__API_DOMAIN}generate-presigned-url?file_name=Sasank`
    );

    if (!responseApi.ok) {
      return { response : response, error : responseApi.status };
    }

    const data = await responseApi.json();
    return { response: data, error };
  } catch (error) {
    console.log(error);
    return { response, error: error.message };
  }
}

async function uploadImage_on_PresignedUrl(presigned_url,file){
    let response;
    let error;
    try {
        const responseApi = await fetch(presigned_url, {
          method: 'PUT',
          body: file, 
          headers: {
            'Content-Type': file.type, // Set the correct content type based on the file
          },
        });
    
        if (!responseApi.ok) {
          return { response : response, error : responseApi.status };
        }

     return {response:"Image Uploaded Successfully", error};
      } catch (error) {
        console.error('Error during image upload:', error);
        return {response, error : error.message}
      }
    };
    
    
async function getFinalImageString(fileName){
    let response;
  let error;
    try {
        const responseApi = await fetch(
          `${import.meta.env.VITE__API_DOMAIN}get-presigned-url?url=${fileName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (!responseApi.ok) {
          return { response : response, error : responseApi.status };
        }
    
        const data = await responseApi.json();
         return {response : data, error}
    
    } catch (error) {
        console.error('Error fetching presigned URL:', error);
        return {response, error : error.message}
      }
    
}

