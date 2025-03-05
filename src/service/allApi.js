import { commonApi } from "./commonApi"
import {serverUrl} from "./serviceUrl"

//register request
export const requestApi= async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login request
export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,'')
}

export const adminLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin/login`, reqBody, '');
  };

 // Add Hostel
export const addHostelApi = async (reqBody, reqHeader) => {
  return await commonApi('POST', `${serverUrl}/add-hostel`, reqBody, reqHeader);
};

// Get all hostels
export const allHostelApi = async (searchKey, reqHeader) => {
  return await commonApi('GET', `${serverUrl}/all-hostels?search=${searchKey}`, "", reqHeader);
};



// Get all hostels for admin
export const getAllHostelsApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/admin/hostels`, "", reqHeader);
};

// Get hostels for the homepage
export const hostelApi = async () => {
  return await commonApi('GET', `${serverUrl}/home-hostels`); 
};
  
  // deleteHostelApi.js
export const removeHostelApi = async (id, reqHeader) => {
  return await commonApi('DELETE', `${serverUrl}/remove-hostel/${id}`, {}, reqHeader);
};

// API to update hostel details
export const updateHostelApi = async(reqBody, reqHeader, hostelId) => {
  return await commonApi("PUT", `${serverUrl}/update-hostel/${hostelId}`, reqBody, reqHeader);
}

// Send contact form data to backend
export const contactApi = async (contactData) => {
  return await commonApi('POST', `${serverUrl}/contact`, contactData);
};

export const getMessagesApi = async () => {
  return await commonApi('GET', `${serverUrl}/messages`);
};


// 🛠 Fetch All Users API (for Admin Dashboard)
export const getUsersApi = async () => {
  return await commonApi("GET", `${serverUrl}/users`);
};

// Get all user booked hostel rooms
export const getUserBookedRoomsApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/user/booked-rooms`, "", reqHeader);
};

// Cancel a booked hostel room
export const cancelBookingApi = async (bookingId, reqHeader) => {
  return await commonApi("DELETE", `${serverUrl}/user/cancel-booking/${bookingId}`, "", reqHeader);
};

export const createOrderApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/payment/create-order`, reqBody, reqHeader);
};

// verify payment
export const verifyPaymentApi = async (paymentData, headers) => {
  return await commonApi("POST", `${serverUrl}/hostel/payment/verify`, paymentData, headers);
};

// store payment
export const storePaymentApi = async (reqBody, reqHeader) => {
  return await commonApi("POST", `${serverUrl}/hostel/payment/store`, reqBody, reqHeader);
}

export const deleteMessageApi = async (id) => {
  return await commonApi('DELETE', `${serverUrl}/messages/${id}`);
};