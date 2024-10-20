
export const updatePanditData = async (panditId, token, data,imgUrl) => {
    console.log("hello",panditId,token, data,encodeURIComponent(imgUrl));
    let response;
    let error;
    try {
      const responseApi = await fetch(`${import.meta.env.VITE__API_DOMAIN}pandit/${panditId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the authorization token here
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          contact_number: data.phone,
          profile_image: encodeURIComponent(imgUrl),
        }),
      });
  
      if (!responseApi.ok) {
        throw new Error(`Error: ${responseApi.status}`);
      }
  
      const responseData = await responseApi.json();
      return {response : responseData, error};
    } catch (error) {
      console.error('Error updating pandit details:', error);
      return {response,error :  error.message}
    }
  };
  