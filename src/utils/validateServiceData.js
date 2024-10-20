export function validateServiceData(price, hours) {

    if (typeof parseInt(hours) !== "number" || isNaN(hours) || hours <= 0) {
      return {response : false, message :"Hours must be a positive number."}
    }
     console.log('hei')
    if (typeof parseInt(price)!== "number" || isNaN(price) || price <= 0) {
      return {response : false, message :"Price must be a positive number"}

    }
  
  
    return {response : true, message :"Successfull!"}
}
  