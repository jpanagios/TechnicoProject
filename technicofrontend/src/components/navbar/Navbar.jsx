import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Εδώ μπορείς να καθαρίσεις τυχόν state ή τοπικά δεδομένα (π.χ. session storage)
    localStorage.removeItem("authToken"); // Παράδειγμα καθαρισμού token
    alert("Έχετε αποσυνδεθεί.");
    navigate("/login"); // Μεταφορά στη σελίδα σύνδεσης
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-link">
          Αρχική Σελίδα
        </Link>
        <button onClick={() => navigate(-1)} className="navbar-link">
          Πίσω
        </button>
        <Link to="/profile" className="navbar-link">
          Προφίλ
        </Link>
        <button onClick={handleLogout} className="navbar-link logout-button">
          Αποσύνδεση
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
