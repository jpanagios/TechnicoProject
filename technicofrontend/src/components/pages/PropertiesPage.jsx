import React, { useState, useEffect } from "react";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/propertyApi";
import "./PropertiesPage.css";

function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    userId: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch properties when the component loads
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        console.log("Fetched properties:", data); // Debugging
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Handle form submit for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted:", formData); // Debugging
      if (editMode) {
        await updateProperty(editId, formData);
        alert("Η ιδιοκτησία ενημερώθηκε με επιτυχία!");
      } else {
        await createProperty(formData);
        alert("Η ιδιοκτησία προστέθηκε με επιτυχία!");
      }
      resetForm();
      const data = await getProperties();
      console.log("Properties after create/update:", data); // Debugging
      setProperties(data);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData({
      address: "",
      city: "",
      postalCode: "",
      userId: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  // Handle editing an existing property
  const handleEdit = (property) => {
    console.log("Editing property:", property); // Debugging
    setEditMode(true);
    setEditId(property.id);
    setFormData({
      address: property.address,
      city: property.city,
      postalCode: property.postalCode,
      userId: property.userId,
    });
  };

  // Handle deleting a property
  const handleDelete = async (id) => {
    try {
      console.log("Deleting property ID:", id); // Debugging
      await deleteProperty(id);
      alert("Η ιδιοκτησία διαγράφηκε με επιτυχία!");
      const data = await getProperties();
      console.log("Properties after delete:", data); // Debugging
      setProperties(data);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="properties-center-container">
      {/* Τίτλος Σελίδας */}
      <h1 className="properties-page-title">Προσθήκη Ιδιοκτησίας</h1>

      {/* Φόρμα δημιουργίας/επεξεργασίας */}
      <div className="properties-form-container">
        <h2>{editMode ? "Επεξεργασία Ιδιοκτησίας" : "Προσθήκη Ιδιοκτησίας"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="address"
            placeholder="Διεύθυνση"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Πόλη"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Ταχυδρομικός Κώδικας"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="userId"
            placeholder="ID Χρήστη"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            required
          />
          <button type="submit" className="properties-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθηκη Ιδιωκτησιας"}
          </button>
        </form>
      </div>

      {/* Λίστα ιδιοκτησιών */}
      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {console.log("Rendered properties:", properties)} {/* Debugging */}
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="property-item">
              {console.log("Rendering property:", property)} {/* Debugging */}
              <p>
                <strong>Διεύθυνση:</strong> {property.address}
              </p>
              <p>
                <strong>Πόλη:</strong> {property.city}
              </p>
              <p>
                <strong>Τ.Κ.:</strong> {property.postalCode}
              </p>
              <p>
                <strong>ID Χρήστη:</strong> {property.userId}
              </p>
              <button
                className="edit-button"
                onClick={() => handleEdit(property)}
              >
                Επεξεργασία
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(property.id)}
              >
                Διαγραφή
              </button>
            </div>
          ))
        ) : (
          <p>Δεν υπάρχουν διαθέσιμες ιδιοκτησίες.</p>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
