import React from 'react';
import { Link } from 'react-router-dom';
import PropertiesLogo from '../../assets/management.png';
import RepairsLogo from '../../assets/tools.png';
import './HomePage.css'; // Σιγουρέψου ότι υπάρχει CSS αρχείο

function HomePage() {
    return (
        <div className="homepage-container">
            <h1>Τι ψάχνετε σήμερα;</h1>
            <div className="section">
                <div className="card">
                    <img src={PropertiesLogo} alt="Διαχείριση Ιδιοκτησιών" className="logo" />
                    <Link to="/properties" className="button">Διαχείριση Ιδιοκτησιών</Link>
                    <p className="description">
                        Εδώ μπορείτε να δείτε, να προσθέσετε και να διαχειριστείτε τις ιδιοκτησίες σας εύκολα, όλα σε ένα μέρος.
                    </p>
                </div>
                <div className="card">
                    <img src={RepairsLogo} alt="Διαχείριση Επισκευών" className="logo" />
                    <Link to="/repairs" className="button">Διαχείριση Επισκευών</Link>
                    <p className="description">
                        Παρακολουθήστε και οργανώστε τις επισκευές των ιδιοκτησιών σας με λεπτομερή εργαλεία διαχείρισης.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
