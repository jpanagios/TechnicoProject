import React, { useState, useEffect } from "react";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/propertyApi";
import PropertyForm from "../forms/PropertyForm";
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
      if (editMode) {
        await updateProperty(editId, formData);
        alert("Η ιδιοκτησία ενημερώθηκε με επιτυχία!");
      } else {
        await createProperty(formData);
        alert("Η ιδιοκτησία προστέθηκε με επιτυχία!");
      }
      resetForm();
      const data = await getProperties();
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
      await deleteProperty(id);
      alert("Η ιδιοκτησία διαγράφηκε με επιτυχία!");
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="properties-center-container">
      <div className="properties-form-container">
        <PropertyForm
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isEditing={editMode}
        />
      </div>

      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {properties.length > 0 ? (
          properties.map((property) => (
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
          ))
        ) : (
          <p>Δεν υπάρχουν διαθέσιμες ιδιοκτησίες.</p>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
