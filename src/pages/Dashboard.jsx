import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { contactApi } from '../service/allApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [isLoggedIn, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contactApi(formData);
            toast.success("Message sent successfully!");

            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error("Something went wrong, please try again!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Link to={'/login'}>
                    <button className="btn btn-primary">Login to Contact Us</button>
                </Link>
            </div>
        );
    }

    return (
        <>
                        <Link to={'/'}><button className='btn ms-5 mt-5'>Back</button></Link>

            <div className="d-flex justify-content-center align-items-center vh-100">

                <div className="card shadow border p-4 w-100" style={{ maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea id="message" name="message" rows="4" className="form-control" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Message</button>
                    </form>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer position='top-center' autoClose={2000} theme="colored" />
        </>
    );
};

export default ContactUs;
