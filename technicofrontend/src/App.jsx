import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomePage from './components/pages/HomePage';
import PropertiesPage from './components/pages/PropertiesPage';
import RepairsPage from './components/pages/RepairsPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<LoginPage />} />

                {/* Other Routes */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/repairs" element={<RepairsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
