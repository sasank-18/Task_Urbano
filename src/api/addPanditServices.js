


export const addPanditServices = async (authToken,dataTobeSend) => {
    let error;
    let response;
    try {
      const responseApi = await fetch(`${import.meta.env.VITE__API_DOMAIN}pandit/service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,

        },
        body: JSON.stringify(dataTobeSend)
        
      });

      console.log(responseApi)

      if (!responseApi.ok) {
        throw new Error(`Error: ${responseApi.status}`);
      }

       response = await responseApi.json();
      return {
        response,
        error,
      }
    } catch (error) {
      console.log(error);
      return {
        response,
        error : error
      }
    } 
  };



