import React, { createContext, useState } from 'react';

export const addResponseContext = createContext({});
export const editProjectResponse = createContext({});
export const loginResponseContext = createContext({});
export const paymentResponseContext = createContext({});
export const deleteBookingContext = createContext({}); 

function ContextShare({ children }) {
    const [addResponse, setAddResponse] = useState([]);
    const [editResponse, setEditResponse] = useState([]);
    const [loginResponse, setLoginResponse] = useState(true);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [deleteBookingResponse, setDeleteBookingResponse] = useState(null); 

    return (
        <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
            <editProjectResponse.Provider value={{ editResponse, setEditResponse }}>
                <loginResponseContext.Provider value={{ loginResponse, setLoginResponse }}>
                    <paymentResponseContext.Provider value={{ paymentResponse, setPaymentResponse }}>
                        <deleteBookingContext.Provider value={{ deleteBookingResponse, setDeleteBookingResponse }}>
                            {children}
                        </deleteBookingContext.Provider>
                    </paymentResponseContext.Provider>
                </loginResponseContext.Provider>
            </editProjectResponse.Provider>
        </addResponseContext.Provider>
    );
}

export default ContextShare;
