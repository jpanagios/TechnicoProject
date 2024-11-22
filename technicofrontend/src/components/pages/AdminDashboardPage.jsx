import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <nav>
                <Link to="/admin/users">Manage Users</Link>
                <Link to="/admin/repairs">Manage Repairs</Link>
            </nav>
        </div>
    );
}

export default AdminDashboardPage;
