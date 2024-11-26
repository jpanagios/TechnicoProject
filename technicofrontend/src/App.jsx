import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import PropertiesPage from "./components/pages/PropertiesPage";
import RepairsPage from "./components/pages/RepairsPage";
import AdminDashboardPage from "./components/pages/AdminDashboardPage";

// Component to conditionally render the Navbar
function ConditionalNavbar({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // Routes where Navbar will be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <ConditionalNavbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/repairs" element={<RepairsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </ConditionalNavbar>
    </Router>
  );
}

export default App;
