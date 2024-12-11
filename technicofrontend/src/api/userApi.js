import api from './axios';

/**
 * Ανάκτηση στοιχείων χρήστη.
 * @param {string} id - Το ID του χρήστη.
 * @returns {Promise<Object>} - Επιστρέφει τα δεδομένα του χρήστη.
 */
export const getUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Σφάλμα κατά την ανάκτηση στοιχείων χρήστη:', error);
        throw error;
    }
};

/**
 * Ενημέρωση στοιχείων χρήστη.
 * @param {string} id - Το ID του χρήστη.
 * @param {Object} userData - Τα νέα δεδομένα του χρήστη.
 * @returns {Promise<Object>} - Επιστρέφει τα ενημερωμένα δεδομένα του χρήστη.
 */
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Σφάλμα κατά την ενημέρωση στοιχείων χρήστη:', error);
        throw error;
    }
};

/**
 * Διαγραφή χρήστη.
 * @param {string} id - Το ID του χρήστη.
 * @returns {Promise<Object>} - Επιστρέφει μήνυμα επιτυχίας ή σφάλματος.
 */
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Σφάλμα κατά τη διαγραφή χρήστη:', error);
        throw error;
    }
};