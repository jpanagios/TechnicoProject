import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/userApi';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Καθαρισμός σφαλμάτων πριν την προσπάθεια σύνδεσης
        try {
            const response = await login(email, password);
            if (response) {
                alert('Login successful!');
                navigate('/home'); // Μεταφορά στη σελίδα Home
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <div className="left-side">
                <img 
                    src={require('../../assets/first_page.png')} 
                    alt="Welcome" 
                    className="left-side-image" 
                />
            </div>
            <div className="right-side">
                <div className="form-container">
                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account?{' '}
                        <a href="/register" className="register-link">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
