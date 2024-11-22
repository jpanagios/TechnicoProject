import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/userApi';
import './RegisterPage.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        vatNumber: '',
        name: '',
        surname: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Καθαρισμός σφαλμάτων πριν από την προσπάθεια εγγραφής
        try {
            const response = await register(formData);
            if (response) {
                alert('Registration successful!');
                navigate('/'); // Επιστροφή στη σελίδα Login
            }
        } catch (error) {
            setError('Registration failed. Please check your details and try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-left-side">
                <img src={require('../../assets/first_page.png')} alt="Technico" className="register-image" />
            </div>
            <div className="register-right-side">
                <div className="register-form-container">
                    <h2>Register</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="vatNumber">VAT Number:</label>
                        <input
                            type="text"
                            id="vatNumber"
                            name="vatNumber"
                            placeholder="Enter your VAT number"
                            value={formData.vatNumber}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            placeholder="Enter your surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/')} // Στέλνει πίσω στη σελίδα Login
                            className="register-login-link"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
