import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/propertyApi";
import "./PropertiesPage.css";

function PropertiesPage() {
  const { userId } = useParams();
  const [properties, setProperties] = useState(() => {
    // Ανάκτηση των properties για το συγκεκριμένο userId από το localStorage αν υπάρχουν
    const savedProperties = localStorage.getItem(`properties_${userId}`);
    return savedProperties ? JSON.parse(savedProperties) : [];
  });

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Ανάκτηση των properties από το API μόνο αν δεν υπάρχουν στο localStorage για το συγκεκριμένο userId
    if (!properties.length) {
      const fetchProperties = async () => {
        try {
          const data = await getProperties();
          const filteredProperties = data.filter(
            (property) => property.userId === userId
          );
          setProperties(filteredProperties);
          localStorage.setItem(
            `properties_${userId}`,
            JSON.stringify(filteredProperties)
          ); // Αποθήκευση στο localStorage για το συγκεκριμένο userId
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
      fetchProperties();
    }
  }, [userId, properties.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateProperty(editId, formData);
        const updatedProperties = properties.map((property) =>
          property.id === editId ? { ...property, ...formData } : property
        );
        setProperties(updatedProperties);
        localStorage.setItem(
          `properties_${userId}`,
          JSON.stringify(updatedProperties)
        ); // Ενημέρωση στο localStorage για το συγκεκριμένο userId
      } else {
        const newProperty = await createProperty({ ...formData, userId });
        const updatedProperties = [...properties, newProperty];
        setProperties(updatedProperties);
        localStorage.setItem(
          `properties_${userId}`,
          JSON.stringify(updatedProperties)
        ); // Ενημέρωση στο localStorage για το συγκεκριμένο userId
      }
      resetForm();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      address: "",
      city: "",
      postalCode: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setEditId(property.id);
    setFormData({
      address: property.address,
      city: property.city,
      postalCode: property.postalCode,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      const updatedProperties = properties.filter(
        (property) => property.id !== id
      );
      setProperties(updatedProperties);
      localStorage.setItem(
        `properties_${userId}`,
        JSON.stringify(updatedProperties)
      ); // Ενημέρωση στο localStorage για το συγκεκριμένο userId
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="properties-center-container">
      <h1 className="properties-page-title">'</h1>
      <div className="properties-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Διεύθυνση"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Πόλη"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ταχυδρομικός Κώδικας"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <button type="submit" className="properties-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>
      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {properties.map((property) => (
          <div key={property.id} className="property-item">
            <p>
              <strong>ID:</strong> {property.id}
            </p>
            <p>
              <strong>Διεύθυνση:</strong> {property.address}
            </p>
            <p>
              <strong>Πόλη:</strong> {property.city}
            </p>
            <p>
              <strong>Ταχυδρομικός Κώδικας:</strong> {property.postalCode}
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
