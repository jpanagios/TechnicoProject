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

  // Fetch properties from the backend on page load
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        console.log("Fetched properties from backend:", data); // Log fetched data
        setProperties(Array.isArray(data) ? data : []);
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
      console.log("Form Data Submitted:", formData); // Log submitted form data
      if (editMode) {
        await updateProperty(editId, formData);
        setProperties((prev) =>
          prev.map((property) =>
            property.id === editId ? { ...property, ...formData } : property
          )
        );
        console.log("Updated property in state:", properties); // Log updated properties
        alert("Η ιδιοκτησία ενημερώθηκε με επιτυχία!");
      } else {
        const newProperty = await createProperty(formData);
        console.log("New property added:", newProperty); // Log newly added property
        setProperties((prev) => [...prev, newProperty]);
        alert("Η ιδιοκτησία προστέθηκε με επιτυχία!");
      }
      resetForm();
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
    console.log("Form reset to default state"); // Log form reset
  };

  // Handle editing an existing property
  const handleEdit = (property) => {
    console.log("Editing property:", property); // Log property being edited
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
      console.log("Deleting property ID:", id); // Log ID being deleted
      await deleteProperty(id);
      setProperties((prev) => prev.filter((property) => property.id !== id));
      console.log("Properties after delete:", properties); // Log updated properties
      alert("Η ιδιοκτησία διαγράφηκε με επιτυχία!");
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="properties-center-container">
      <h1 className="properties-page-title">'</h1>
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
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {console.log("Rendering properties list:", properties)}{" "}
        {/* Log properties list */}
        {properties.map((property) => (
          <div key={property.id} className="property-item">
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
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;
