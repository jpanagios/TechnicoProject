import api from './axios';

/**
 * Fetches all properties from the API.
 */
export const getProperties = async () => {
    try {
        const response = await api.get('/PropertyItem');
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

/**
 * Creates a new property using the API.
 * @param {Object} property - The property data to create.
 */
export const createProperty = async (property) => {
    try {
        const response = await api.post('/PropertyItem', property);
        return response.data;
    } catch (error) {
        console.error('Error creating property:', error);
        throw error;
    }
};

/**
 * Updates an existing property using the API.
 * @param {Object} property - The property data to update.
 */
export const updateProperty = async (property) => {
    try {
        const response = await api.put(`/PropertyItem/${property.id}`, property);
        return response.data;
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
};

/**
 * Deletes a property using the API.
 * @param {number} id - The ID of the property to delete.
 */
export const deleteProperty = async (id) => {
    try {
        await api.delete(`/PropertyItem/${id}`);
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
};
