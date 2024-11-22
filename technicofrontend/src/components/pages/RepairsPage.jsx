import React, { useState, useEffect } from 'react';
import { getRepairs, createRepair } from '../../api/repairApi';
import './RepairsPage.css';

function RepairsPage() {
    const [repairs, setRepairs] = useState([]);
    const [formData, setFormData] = useState({
        scheduledDate: '',
        typeOfRepair: '',
        description: '',
        address: '',
        cost: '',
    });

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const data = await getRepairs();
                setRepairs(data);
            } catch (error) {
                console.error('Error fetching repairs:', error);
            }
        };
        fetchRepairs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRepair(formData);
            alert('Repair created successfully!');
            setFormData({ scheduledDate: '', typeOfRepair: '', description: '', address: '', cost: '' });
            const data = await getRepairs();
            setRepairs(data);
        } catch (error) {
            console.error('Error creating repair:', error);
            alert('Failed to create repair. Please try again.');
        }
    };

    return (
        <div className="repairs-center-container">
            <div className="repairs-form-container">
                <h1>Manage Repairs</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="scheduledDate">Scheduled Date</label>
                    <input
                        type="date"
                        id="scheduledDate"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="typeOfRepair">Type of Repair</label>
                    <input
                        type="text"
                        id="typeOfRepair"
                        name="typeOfRepair"
                        placeholder="Enter Repair Type"
                        value={formData.typeOfRepair}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter Description"
                        value={formData.description}
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

                    <label htmlFor="cost">Cost</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        placeholder="Enter Cost"
                        value={formData.cost}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Create Repair</button>
                </form>
            </div>

            <div className="repairs-list">
                <h2>Repair List</h2>
                {repairs.length > 0 ? (
                    repairs.map((repair) => (
                        <div key={repair.id} className="repair-item">
                            <h3>Type of Repair: {repair.typeOfRepair}</h3>
                            <p>Scheduled Date: {repair.scheduledDate}</p>
                            <p>Description: {repair.description}</p>
                            <p>Address: {repair.address}</p>
                            <p>Cost: {repair.cost}</p>
                        </div>
                    ))
                ) : (
                    <p>No repairs available.</p>
                )}
            </div>
        </div>
    );
}

export default RepairsPage;
