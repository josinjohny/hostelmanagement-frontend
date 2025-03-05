import React, { useContext, useEffect, useState } from 'react';
import { createOrderApi, verifyPaymentApi, storePaymentApi } from '../service/allApi';
import { useNavigate } from 'react-router-dom';
import { paymentResponseContext } from '../context/contextShare';
import Swal from "sweetalert2";

const HostelPaymentButton = ({ hostelId, amount }) => {
    const { setPaymentResponse } = useContext(paymentResponseContext);
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    // ✅ Fetch token from sessionStorage on component mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handlePayment = async () => {
        try {
            console.log("Fetching token...");
            if (!token) {
                console.error("❌ User token missing");
                await Swal.fire({
                    title: 'Authentication Required',
                    text: 'User is not authenticated. Please log in.',
                    icon: 'warning',
                    position: 'top-center',
                    timer: 3000,
                    showConfirmButton: false,
                });
                return;
            }
    
            console.log("Hostel ID:", hostelId, "Amount:", amount);
            if (!hostelId || !amount) {
                console.error("❌ Hostel details are missing");
                await Swal.fire({
                    title: 'Invalid Hostel Details',
                    text: 'Please check the hostel details and try again.',
                    icon: 'warning',
                    position: 'center',
                    timer: 3000,
                    showConfirmButton: false,
                });
                return;
            }
    
            const reqHeader = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };
    
            console.log("Creating order with:", { amount, hostelId });
            const result = await createOrderApi({ amount, hostelId, currency: "INR" }, reqHeader);
            
            console.log("Create Order API Response:", result);
            if (!result?.data?.order?.id) {
                console.error("❌ Invalid order response", result);
                throw new Error("Order creation failed");
            }
    
            const { id: order_id, amount: orderAmount, currency } = result.data.order;
            console.log("✅ Order Created:", order_id);
    
            if (!window.Razorpay) {
                console.error("❌ Razorpay SDK not loaded");
                await Swal.fire({
                    title: 'Error',
                    text: 'Payment gateway is not available. Please refresh the page.',
                    icon: 'error',
                    position: 'center',
                    timer: 3000,
                    showConfirmButton: false,
                });
                return;
            }
    
            const options = {
                key: process.env.VITE_RAZORPAY_KEY_ID,
                amount: orderAmount,
                currency,
                name: "Hostel Booking",
                description: "Secure Your Stay",
                order_id,
                handler: async (response) => {
                    console.log("🔄 Razorpay Response:", response);
                    
                    if (!response?.razorpay_payment_id) {
                        console.error("❌ Payment ID missing in response", response);
                        throw new Error("Invalid Razorpay response");
                    }
    
                    try {
                        console.log("Verifying Payment with Server...");
                        const verifyResponse = await verifyPaymentApi({
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        }, reqHeader);
    
                        console.log("✅ Verification Response:", verifyResponse);
                        if (!verifyResponse?.data?.success) {
                            throw new Error("Payment verification failed.");
                        }
    
                        const user = JSON.parse(sessionStorage.getItem("existingUser"));
                        const userId = user?._id;
                        if (!userId) throw new Error("User ID not found in session storage");
    
                        console.log("📌 Storing Payment for User:", userId);
                        const storePaymentResponse = await storePaymentApi({
                            userId,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            hostelId,
                            amount,
                            currency: "INR"
                        }, reqHeader);
    
                        console.log("✅ Store Payment Response:", storePaymentResponse);
                        setPaymentResponse(storePaymentResponse);
    
                        await Swal.fire({
                            title: 'Booking Successful!',
                            text: `Amount: ₹${amount}\nPayment Id: ${response.razorpay_payment_id}`,
                            icon: 'success',
                            position: 'center',
                            timer: 4000,
                            showConfirmButton: false,
                        });
    
                        navigate("/bookings");
                    } catch (error) {
                        console.error("❌ Error during payment verification:", error);
                        await Swal.fire({
                            title: 'Payment Failed!',
                            text: 'Something went wrong. Please try again.',
                            icon: 'error',
                            position: 'center',
                            timer: 3000,
                            showConfirmButton: false,
                        });
                    }
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#28a745" },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
            };
    
            console.log("🔄 Opening Razorpay Payment Gateway...");
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('❌ Payment initiation failed:', error);
            await Swal.fire({
                title: 'Payment Failed!',
                text: 'Something went wrong with the payment. Please try again.',
                icon: 'error',
                position: 'center',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    };
    

    return (
        <button style={{ backgroundColor: '#28a745' }} onClick={handlePayment} className="btn w-25 text-light p-2">
            Book Now
        </button>
    );
};

export default HostelPaymentButton;
