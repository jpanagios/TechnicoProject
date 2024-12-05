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
        console.log("Fetched repairs from backend:", data);
        setRepairs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };
    fetchRepairs();
  }, []);

  // Handle form submit for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted:", formData);
      if (editMode) {
        await updateRepair(editId, formData);
        setRepairs((prev) =>
          prev.map((repair) =>
            repair.id === editId ? { ...repair, ...formData } : repair
          )
        );
        alert("Η επισκευή ενημερώθηκε με επιτυχία!");
      } else {
        const newRepair = await createRepair(formData);
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
  };

  // Handle editing an existing repair
  const handleEdit = (repair) => {
    console.log("Editing repair:", repair);
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

  // Handle deleting a repair
  const handleDelete = async (id) => {
    try {
      console.log("Deleting repair ID:", id);
      await deleteRepair(id);
      setRepairs((prev) => prev.filter((repair) => repair.id !== id));
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
            onChange={(e) =>
              setFormData({ ...formData, propertyId: e.target.value })
            }
            required
          />
          <input
            type="date"
            name="repairDate"
            value={formData.repairDate}
            onChange={(e) =>
              setFormData({ ...formData, repairDate: e.target.value })
            }
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="number"
            name="cost"
            placeholder="Κόστος (σε €)"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            required
          />
          <button type="submit" className="repairs-submit-button">
            {editMode ? "Ενημέρωση" : "Προσθήκη"}
          </button>
        </form>
      </div>

      <div className="repairs-list">
        <h2>Λίστα Επισκευών</h2>
        {repairs.map((repair) => (
          <div key={repair.id} className="repair-item">
            <p>Περιγραφή: {repair.description}</p>
            <p>Ημερομηνία: {repair.repairDate}</p>
            <p>Τύπος: {repair.type}</p>
            <p>Κόστος: {repair.cost} €</p>
            <p>ID Ιδιοκτησίας: {repair.propertyId}</p>
            <button className="edit-button" onClick={() => handleEdit(repair)}>
              Επεξεργασία
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(repair.id)}
            >
              Διαγραφή
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepairsPage;
