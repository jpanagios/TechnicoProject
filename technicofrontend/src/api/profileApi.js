import api from "./axios";

export const getUserProfileData = async () => {
  try {
    const response = await api.get("/Profile");
    return response.data; // Υποθέτουμε ότι το backend επιστρέφει τη σωστή δομή δεδομένων
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};
