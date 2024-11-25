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
    identificationNumber: "",
    address: "",
    yearOfConstruction: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      setFormData({
        identificationNumber: "",
        address: "",
        yearOfConstruction: "",
      });
      setEditMode(false);
      setEditId(null);
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setEditId(property.id);
    setFormData({
      identificationNumber: property.identificationNumber,
      address: property.address,
      yearOfConstruction: property.yearOfConstruction,
    });
  };

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
        <h1>{editMode ? "Επεξεργασία Ιδιοκτησίας" : "Προσθήκη Ιδιοκτησίας"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identificationNumber"
            placeholder="Αριθμός Ταυτότητας"
            value={formData.identificationNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Διεύθυνση"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="yearOfConstruction"
            placeholder="Έτος Κατασκευής"
            value={formData.yearOfConstruction}
            onChange={handleChange}
            required
          />
          <button type="submit" className="properties-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="properties-list">
        <h2>Λίστα Ιδιοκτησιών</h2>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="property-item">
              <h3>{property.identificationNumber}</h3>
              <p>{property.address}</p>
              <p>Έτος: {property.yearOfConstruction}</p>
              <button onClick={() => handleEdit(property)}>Επεξεργασία</button>
              <button onClick={() => handleDelete(property.id)}>
                Διαγραφή
              </button>
            </div>
          ))
        ) : (
          <p>Δεν υπάρχουν ιδιοκτησίες.</p>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
