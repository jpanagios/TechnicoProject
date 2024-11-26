import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    vatNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await register(formData);
      if (response) {
        alert("Εγγραφή επιτυχής!");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Η εγγραφή απέτυχε. Δοκιμάστε ξανά."
        );
      } else {
        setError("Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.");
      }
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-left">
        <img
          src={require("../../assets/first_page.png")}
          alt="Technico"
          className="register-page-image"
        />
      </div>
      <div className="register-page-right">
        <div className="register-page-form-container">
          <h2>Εγγραφή</h2>
          {error && <p className="register-page-error">{error}</p>}
          <form className="register-page-form" onSubmit={handleSubmit}>
            <label className="register-page-label" htmlFor="vatNumber">
              ΑΦΜ:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="vatNumber"
              name="vatNumber"
              placeholder="Εισάγετε το ΑΦΜ σας"
              value={formData.vatNumber}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="firstName">
              Όνομα:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Εισάγετε το όνομά σας"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="lastName">
              Επώνυμο:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Εισάγετε το επώνυμό σας"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="address">
              Διεύθυνση:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="address"
              name="address"
              placeholder="Εισάγετε τη διεύθυνσή σας"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="phoneNumber">
              Τηλέφωνο:
            </label>
            <input
              className="register-page-input"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Εισάγετε τον αριθμό τηλεφώνου σας"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="email">
              Email:
            </label>
            <input
              className="register-page-input"
              type="email"
              id="email"
              name="email"
              placeholder="Εισάγετε το email σας"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="register-page-label" htmlFor="password">
              Κωδικός:
            </label>
            <input
              className="register-page-input"
              type="password"
              id="password"
              name="password"
              placeholder="Εισάγετε τον κωδικό σας"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="register-page-button" type="submit">
              Εγγραφή
            </button>
          </form>
          <p className="register-page-link">
            Έχετε ήδη λογαριασμό;{" "}
            <a href="/" className="register-page-link-anchor">
              Συνδεθείτε εδώ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
