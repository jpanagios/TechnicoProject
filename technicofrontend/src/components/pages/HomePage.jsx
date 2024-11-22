import React from 'react';
import { Link } from 'react-router-dom';
import PropertiesLogo from '../../assets/management.png';
import RepairsLogo from '../../assets/tools.png';
import './HomePage.css'; // Σιγουρέψου ότι υπάρχει CSS αρχείο

function HomePage() {
    return (
        <div className="homepage-container">
            <h1>What are you looking for today?</h1>
            <div className="section">
                <div className="card">
                    <img src={PropertiesLogo} alt="Manage Properties" className="logo" />
                    <Link to="/properties" className="button">Manage Properties</Link>
                    <p className="description">
                        Here you can view, add, and manage your properties efficiently, all in one place.
                    </p>
                </div>
                <div className="card">
                    <img src={RepairsLogo} alt="Manage Repairs" className="logo" />
                    <Link to="/repairs" className="button">Manage Repairs</Link>
                    <p className="description">
                        Track and organize repairs for your properties with detailed management tools.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
