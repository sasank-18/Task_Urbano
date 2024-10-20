


  export const panditLogin = async (contact_number, otp) => {
    let error;
    let response;
    try {
      const responseApi = await fetch(`${import.meta.env.VITE__API_DOMAIN}pandit-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_number: contact_number, 
          otp, 
        }),
      });

      console.log(responseApi)

      // if (!responseApi.ok) {
      //   throw new Error(`Error: ${responseApi.status}`);
      // }

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


