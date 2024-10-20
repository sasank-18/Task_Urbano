export const sendOtp = async (phoneNumber) => {
  let error;
  let response;
  console.log(isValidPhoneNumber(phoneNumber));
  if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) return { error: "Number must contain 10 digit.", response };

  try {
    const responseApi = await fetch(`${import.meta.env.VITE__API_DOMAIN}send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure correct Content-Type
      },
      body: JSON.stringify({
        contact_number: phoneNumber,
      }),
    });

    // Check if the response is OK
    if (!responseApi.ok) {
      return {
        response,
        error: `Error: ${responseApi}`,
      };
    }

    response = await responseApi.json();

    return {
      response,
      error,
    };
  } catch (error) {
    console.log(error);
    return {
      response,
      error: error.message,
    };
  }
};
// return { sendOtp, loading, error, success };

function isValidPhoneNumber(phoneNumber) {
  // Regular expression to match an optional country code (+XX) and a 10-digit number
  const regex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

  // Check if the phone number matches the pattern
  return regex.test(phoneNumber);
}
