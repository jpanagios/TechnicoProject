import React, { useState, useEffect } from "react";
import { getRepairs, createRepair } from "../../api/repairApi";
import "./RepairsPage.css";

function RepairsPage() {
  const [repairs, setRepairs] = useState([]);
  const [formData, setFormData] = useState({
    scheduledDate: "",
    typeOfRepair: "",
    description: "",
    address: "",
    cost: "",
    propertyId: "", // Νέο πεδίο για το μοναδικό κωδικό ιδιοκτησίας
  });

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
      await createRepair(formData);
      alert("Η επισκευή προστέθηκε επιτυχώς!");
      setFormData({
        scheduledDate: "",
        typeOfRepair: "",
        description: "",
        address: "",
        cost: "",
        propertyId: "",
      });
      const data = await getRepairs();
      setRepairs(data);
    } catch (error) {
      console.error("Error creating repair:", error);
      alert("Αποτυχία δημιουργίας επισκευής. Προσπαθήστε ξανά.");
    }
  };

  return (
    <div className="repairs-center-container">
      {/* Φόρμα δημιουργίας/επεξεργασίας */}
      <div className="repairs-form-container">
        <h1>Προσθήκη Επισκευής</h1>
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
            name="scheduledDate"
            placeholder="Ημερομηνία"
            value={formData.scheduledDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="typeOfRepair"
            placeholder="Τύπος Επισκευής"
            value={formData.typeOfRepair}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Περιγραφή"
            value={formData.description}
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
            name="cost"
            placeholder="Κόστος"
            value={formData.cost}
            onChange={handleChange}
            required
          />
          <button type="submit" className="repairs-submit-button">
            Προσθήκη
          </button>
        </form>
      </div>

      {/* Λίστα επισκευών */}
      <div className="repairs-list">
        <h2>Λίστα Επισκευών</h2>
        {repairs.length > 0 ? (
          repairs.map((repair) => (
            <div key={repair.id} className="repair-item">
              <p>
                <strong>Μοναδικός Κωδικός Ιδιοκτησίας:</strong>{" "}
                {repair.propertyId}
              </p>
              <p>
                <strong>Τύπος Επισκευής:</strong> {repair.typeOfRepair}
              </p>
              <p>
                <strong>Ημερομηνία:</strong> {repair.scheduledDate}
              </p>
              <p>
                <strong>Περιγραφή:</strong> {repair.description}
              </p>
              <p>
                <strong>Διεύθυνση:</strong> {repair.address}
              </p>
              <p>
                <strong>Κόστος:</strong> {repair.cost} €
              </p>
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
