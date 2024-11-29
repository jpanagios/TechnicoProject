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

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const data = await getRepairs();
        setRepairs(data);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };
    fetchRepairs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateRepair(editId, formData);
        alert("Η επισκευή ενημερώθηκε με επιτυχία!");
      } else {
        await createRepair(formData);
        alert("Η επισκευή προστέθηκε επιτυχώς!");
      }
      resetForm();
      const data = await getRepairs();
      setRepairs(data);
    } catch (error) {
      console.error("Error saving repair:", error);
    }
  };

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
  };

  const handleEdit = (repair) => {
    setEditMode(true);
    setEditId(repair.id);
    setFormData({
      propertyId: repair.propertyId,
      repairDate: repair.repairDate,
      type: repair.type,
      description: repair.description,
      status: repair.status,
      cost: repair.cost,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteRepair(id);
      alert("Η επισκευή διαγράφηκε επιτυχώς!");
      const data = await getRepairs();
      setRepairs(data);
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  return (
    <div className="repairs-center-container">
      <div className="repairs-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="propertyId"
            placeholder="Μοναδικός Κωδικός Ιδιοκτησίας"
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
            placeholder="Περιγραφή (μέχρι 200 χαρακτήρες)"
            value={formData.description}
            onChange={handleChange}
            maxLength={200}
            required
          ></textarea>
          <div className="status-checkboxes">
            <label>
              <input
                type="radio"
                name="status"
                value="Pending"
                checked={formData.status === "Pending"}
                onChange={handleChange}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Completed"
                checked={formData.status === "Completed"}
                onChange={handleChange}
              />
              Completed
            </label>
          </div>
          <input
            type="number"
            name="cost"
            placeholder="Κόστος (σε €)"
            value={formData.cost}
            onChange={handleChange}
            required
          />
          <button type="submit" className="repairs-submit-button">
            {editMode ? "Ενημέρωση Επισκευής" : "Προσθήκη Επισκευής"}
          </button>
        </form>
      </div>

      <div className="repairs-list">
        <h2>Λίστα Επισκευών</h2>
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
                <strong>Κατάσταση:</strong> {repair.status}
              </p>
              <p>
                <strong>Κόστος:</strong> {repair.cost}€
              </p>
              <button
                onClick={() => handleEdit(repair)}
                className="edit-button"
              >
                Επεξεργασία
              </button>
              <button
                onClick={() => handleDelete(repair.id)}
                className="delete-button"
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
