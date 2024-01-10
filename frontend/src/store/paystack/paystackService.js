import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/paystack/`;

//acceptpayment:
const acceptpayment = async(paymentData)=>{
    const response = await axios.post(API_URL + "acceptpayment", paymentData);
    return response.data
};
//acceptpayment:

const verifypayment = async(reference)=>{
    // const response = await axios.get(API_URL + "verifypayment", reference);
    const response = await axios.get(`${API_URL}verifypayment/${reference}`);
    return response.data;
};

const paystackService = {acceptpayment,verifypayment}
export default paystackService;