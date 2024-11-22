import React from 'react';

function PropertyForm() {
    return (
        <form>
            <label>Property ID:</label>
            <input type="text" name="propertyId" required />
            <label>Address:</label>
            <input type="text" name="address" required />
            <label>Year of Construction:</label>
            <input type="number" name="year" required />
            <label>Owner VAT Number:</label>
            <input type="text" name="vat" required />
            <button type="submit">Save Property</button>
        </form>
    );
}

export default PropertyForm;
