

export const getCategories = async (authToken) => {
    let response;
    let error;
    console.log(authToken)
  
    try {
      const responseApi = await fetch(
        `${import.meta.env.VITE__API_DOMAIN}category`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`, // Add the Bearer token
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
      console.log(responseApi)
  
  
      if (!responseApi.ok) {
        throw new Error();
      }
  
      const data = await responseApi.json();
      console.log("data",data)
      return { response: data, error };
    } catch (error) {
      console.log(error);
      return { response, error };
    }
  };
  
  