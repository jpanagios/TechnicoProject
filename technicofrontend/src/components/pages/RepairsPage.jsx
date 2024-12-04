import React, { useState, useEffect } from "react";
import {
  getRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
} from "../../api/repairApi";
import "./RepairsPage.css";

function RepairsPage() {
  const [repairs, setRepairs] = useState([]);
  const [formData, setFormData] = useState({
    propertyId: "",
    repairDate: "",
    type: "",
    description: "",
    status: "Pending",
    cost: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch repairs from the backend on page load
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const data = await getRepairs();
        console.log("Fetched repairs from backend:", data); // Log fetched data
        setRepairs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };
    fetchRepairs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted:", formData); // Log submitted form data
      if (editMode) {
        await updateRepair(editId, formData);
        setRepairs((prev) =>
          prev.map((repair) =>
            repair.id === editId ? { ...repair, ...formData } : repair
          )
        );
        console.log("Updated repair in state:", repairs); // Log updated repairs
        alert("Η επισκευή ενημερώθηκε με επιτυχία!");
      } else {
        const newRepair = await createRepair(formData);
        console.log("New repair added:", newRepair); // Log newly added repair
        setRepairs((prev) => [...prev, newRepair]);
        alert("Η επισκευή προστέθηκε με επιτυχία!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving repair:", error);
    }
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData({
      propertyId: "",
      repairDate: "",
      type: "",
      description: "",
      status: "Pending",
      cost: "",
    });
    setEditMode(false);
    setEditId(null);
    console.log("Form reset to default state"); // Log form reset
  };

  // Handle editing an existing repair
  const handleEdit = (repair) => {
    console.log("Editing repair:", repair); // Log repair being edited
    setEditMode(true);
    setEditId(repair.id); // Εδώ θα δούμε αν το id υπάρχει
    setFormData({
      propertyId: repair.propertyId,
      repairDate: repair.repairDate,
      type: repair.type,
      description: repair.description,
      status: repair.status,
      cost: repair.cost,
    });
  };

  // Handle deleting a repair
  const handleDelete = async (id) => {
    try {
      console.log("Deleting repair ID:", id); // Log ID being deleted
      await deleteRepair(id);
      setRepairs((prev) => prev.filter((repair) => repair.id !== id));
      console.log("Repairs after delete:", repairs); // Log remaining repairs
      alert("Η επισκευή διαγράφηκε με επιτυχία!");
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  return (
    <div className="repairs-center-container">
      <h1 className="repairs-page-title">'</h1>
      <div className="repairs-form-container">
        <h2>{editMode ? "Επεξεργασία Επισκευής" : "Προσθήκη Επισκευής"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="propertyId"
            placeholder="Κωδικός Ιδιοκτησίας"
            value={formData.propertyId}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="repairDate"
            value={formData.repairDate}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Επιλέξτε τύπο επισκευής
            </option>
            <option value="Painting">Βαφή</option>
            <option value="Insulation">Μόνωση</option>
            <option value="Frames">Κουφώματα</option>
            <option value="Plumbing">Υδραυλικά</option>
            <option value="Electrical">Ηλεκτρικά</option>
          </select>
          <textarea
            name="description"
            placeholder="Περιγραφή"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="number"
            name="cost"
            placeholder="Κόστος (σε €)"
            value={formData.cost}
            onChange={handleChange}
            required
          />
          <button type="submit" className="repairs-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="repairs-list">
        <h2>Λίστα Επισκευών</h2>
        {console.log("Rendering repairs list:", repairs)}{" "}
        {/* Log repairs list */}
        {repairs.length > 0 ? (
          repairs.map((repair) => (
            <div key={repair.id} className="repair-item">
              <p>
                <strong>Κωδικός Ιδιοκτησίας:</strong> {repair.propertyId}
              </p>
              <p>
                <strong>Ημερομηνία:</strong> {repair.repairDate}
              </p>
              <p>
                <strong>Τύπος:</strong> {repair.type}
              </p>
              <p>
                <strong>Περιγραφή:</strong> {repair.description}
              </p>
              <p>
                <strong>Κόστος:</strong> {repair.cost}€
              </p>
              <button
                className="edit-button"
                onClick={() => handleEdit(repair)}
              >
                Επεξεργασία
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(repair.id)}
              >
                Διαγραφή
              </button>
            </div>
          ))
        ) : (
          <p>Δεν υπάρχουν διαθέσιμες επισκευές.</p>
        )}
      </div>
    </div>
  );
}

export default RepairsPage;
