import React from "react";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page-container">
      <h1>Προφίλ Χρήστη</h1>
      <div className="profile-table-container">
        <table className="profile-table">
          <thead>
            <tr>
              <th>Όνομα Χρήστη</th>
              <th>Διεύθυνση Ιδιοκτησίας</th>
              <th>Είδος Κατασκευής</th>
              <th>Κατάσταση Κατασκευής</th>
            </tr>
          </thead>
          <tbody>
            {/* Εδώ θα προστεθούν δυναμικά οι γραμμές του πίνακα */}
            <tr>
              <td>Δημήτρης</td>
              <td>Οδός Παράδειγμα 123</td>
              <td>Επισκευή Στέγης</td>
              <td>Ολοκληρώθηκε</td>
            </tr>
            <tr>
              <td>Γιάννης</td>
              <td>Οδός Δείγματος 456</td>
              <td>Επισκευή Τοίχου</td>
              <td>Σε Εξέλιξη</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfilePage;
