import api from './axios';

/**
 * Συνάρτηση σύνδεσης χρήστη.
 * @param {string} email - Το email του χρήστη.
 * @param {string} password - Ο κωδικός του χρήστη.
 * @returns {Promise<Object>} - Επιστρέφει το token από το backend.
 */
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Σφάλμα κατά τη σύνδεση:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Συνάρτηση εγγραφής χρήστη.
 * @param {Object} userData - Τα δεδομένα του χρήστη για εγγραφή.
 * @returns {Promise<Object>} - Επιστρέφει μήνυμα επιτυχίας ή σφάλματος.
 */
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', {
            vatNumber: userData.vatNumber,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: userData.password,
        });
        return response.data;
    } catch (error) {
        console.error('Σφάλμα κατά την εγγραφή:', error.response?.data || error.message);
        throw error;
    }
};
