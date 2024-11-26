import api from './axios';

/**
 * Επιστρέφει όλες τις ιδιοκτησίες από το API.
 */
export const getProperties = async () => {
    try {
        const response = await api.get('/Property');
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

/**
 * Δημιουργεί νέα ιδιοκτησία μέσω του API.
 * @param {Object} property - Τα δεδομένα της ιδιοκτησίας.
 */
export const createProperty = async (property) => {
    try {
        const response = await api.post('/Property', property);
        return response.data;
    } catch (error) {
        console.error('Error creating property:', error);
        throw error;
    }
};

/**
 * Ενημερώνει μια υπάρχουσα ιδιοκτησία μέσω του API.
 * @param {string} id - Το ID της ιδιοκτησίας.
 * @param {Object} property - Τα δεδομένα προς ενημέρωση.
 */
export const updateProperty = async (id, property) => {
    try {
        const response = await api.put(`/Property/${id}`, property);
        return response.data;
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
};

/**
 * Διαγράφει μια ιδιοκτησία μέσω του API.
 * @param {string} id - Το ID της ιδιοκτησίας.
 */
export const deleteProperty = async (id) => {
    try {
        await api.delete(`/Property/${id}`);
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
};
