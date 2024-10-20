

const getPanditById = async (id,authToken) => {
  let response;
  let error;
  console.log(id,authToken)

  try {
    const responseApi = await fetch(
      `${import.meta.env.VITE__API_DOMAIN}pandit/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Add the Bearer token
          'Content-Type': 'application/json', // Set content type to JSON
        },
      }
    );
    console.log(responseApi)


    if (!responseApi.ok) {
      throw new Error(`Error: ${responseApi.status}`);
    }

    const data = await responseApi.json();
    console.log("data",data)
    return { response: data, error };
  } catch (error) {
    console.log(error);
    return { response, error };
  }
};

export default getPanditById;
