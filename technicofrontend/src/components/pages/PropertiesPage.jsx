import React, { useState, useEffect } from 'react';
import { getProperties, createProperty } from '../../api/propertyApi';
import './PropertiesPage.css';

function PropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        identificationNumber: '',
        address: '',
        yearOfConstruction: '',
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProperty(formData);
            alert('Property created successfully!');
            setFormData({ identificationNumber: '', address: '', yearOfConstruction: '' });
            const data = await getProperties();
            setProperties(data);
        } catch (error) {
            console.error('Error creating property:', error);
            alert('Failed to create property. Please try again.');
        }
    };

    return (
        <div className="center-container">
            <div className="form-container">
                <h1>Manage Properties</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="identificationNumber">Identification Number</label>
                    <input
                        type="text"
                        id="identificationNumber"
                        name="identificationNumber"
                        placeholder="Enter ID Number"
                        value={formData.identificationNumber}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="yearOfConstruction">Year of Construction</label>
                    <input
                        type="number"
                        id="yearOfConstruction"
                        name="yearOfConstruction"
                        placeholder="Enter Year"
                        value={formData.yearOfConstruction}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Create Property</button>
                </form>
            </div>

            <div className="property-list">
                <h2>Property List</h2>
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property.id} className="property-item">
                            <h3>Identification Number: {property.identificationNumber}</h3>
                            <p>Address: {property.address}</p>
                            <p>Year of Construction: {property.yearOfConstruction}</p>
                        </div>
                    ))
                ) : (
                    <p>No properties available.</p>
                )}
            </div>
        </div>
    );
}

export default PropertiesPage;
