import api from "./axios";

/** Ανάκτηση συγκεκριμένου χρήστη */
export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση χρήστη:", error);
    throw error;
  }
};

/** Ανάκτηση όλων των χρηστών */
export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά την ανάκτηση όλων των χρηστών:", error);
    throw error;
  }
};

/** Διαγραφή χρήστη */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/delete-user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά τη διαγραφή χρήστη:", error);
    throw error;
  }
};

/** Ενημέρωση χρήστη */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/edit-user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Σφάλμα κατά την ενημέρωση χρήστη:", error);
    throw error;
  }
};
