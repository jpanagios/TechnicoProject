import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/userApi";
import { getProperties } from "../../api/propertyApi";
import { getRepairs } from "../../api/repairApi";
import "./AdminPage.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Φέρνει όλους τους χρήστες
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        // Φέρνει όλα τα properties
        const allProperties = await getProperties();
        setProperties(allProperties);

        // Φέρνει όλα τα repairs
        const allRepairs = await getRepairs();
        setRepairs(allRepairs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert("Ο χρήστης διαγράφηκε επιτυχώς!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-page-container">
      <h1>Πίνακας Διαχείρισης Χρηστών</h1>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Properties</th>
              <th>Repairs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  {properties
                    .filter((property) => property.userId === user.id)
                    .map((property) => (
                      <div key={property.id}>{property.address}</div>
                    ))}
                </td>
                <td>
                  {repairs
                    .filter((repair) =>
                      properties.some(
                        (property) =>
                          property.userId === user.id &&
                          property.id === repair.propertyId
                      )
                    )
                    .map((repair) => (
                      <div key={repair.id}>{repair.description}</div>
                    ))}
                </td>
                <td>
                  <button
                    className="admin-button-delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Διαγραφή Χρήστη
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
