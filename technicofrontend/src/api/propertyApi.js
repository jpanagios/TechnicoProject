import api from "./axios";

/** Φέρνει τα properties με βάση το userId */
export const getProperties = async () => {
  try {
    const response = await api.get("/Property");
    console.log("Properties από API:", response.data);

    // Επιστροφή ως array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

/** Δημιουργία νέου property */
export const createProperty = async (property) => {
  try {
    const response = await api.post("/Property", property);
    console.log("Property created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

/** Ενημέρωση property */
export const updateProperty = async (id, property) => {
  try {
    const response = await api.put(`/Property/${id}`, property);
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

/** Διαγραφή property */
export const deleteProperty = async (id) => {
  try {
    await api.delete(`/Property/${id}`);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};
