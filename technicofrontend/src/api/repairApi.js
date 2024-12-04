import api from './axios';

export const getRepairs = async () => {
    try {
        const response = await api.get('/Repair');
        const data = response.data;

        // Ελέγχει αν τα δεδομένα περιέχουν το πεδίο $values
        const repairs = data?.$values || data;
        console.log("API Response (raw):", response.data); // Log raw response
        console.log("Processed repairs:", repairs); // Log processed repairs

        return repairs;
    } catch (error) {
        console.error('Error fetching repairs:', error.response?.data || error.message);
        throw error;
    }
};

export const createRepair = async (repair) => {
    try {
        const response = await api.post('/Repair', repair);
        console.log("API Response (new repair):", response.data); // Log created repair
        return response.data;
    } catch (error) {
        console.error('Error creating repair:', error.response?.data || error.message);
        throw error;
    }
};

export const updateRepair = async (id, repair) => {
    try {
        const response = await api.put(`/Repair/${id}`, repair);
        console.log("API Response (updated repair):", response.data); // Log updated repair
        return response.data;
    } catch (error) {
        console.error('Error updating repair:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteRepair = async (id) => {
    try {
        await api.delete(`/Repair/${id}`);
        console.log("API Response (deleted repair ID):", id); // Log deleted repair ID
    } catch (error) {
        console.error('Error deleting repair:', error.response?.data || error.message);
        throw error;
    }
};
