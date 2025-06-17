import React, { useEffect, useState } from 'react';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const isAddressValid = () => {
    const fullAddress = `${street1} ${street2} ${city} ${state} ${pincode}`;
    return fullAddress.length <= 150;
  };

  const validateForm = () => {
    if (!isAddressValid()) {
      setError('Address should not exceed 150 characters.');
      return false;
    }
    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return false;
    }
    if (!date || !timeSlot) {
      setError('Please select delivery date and time slot.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Checkout Summary</h2>

      {/* Order Summary */}
      <div style={sectionStyle}>
        <h3>Your Items</h3>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {cart.map((item, i) => (
              <li key={i}>
                🍴 <strong>{item.name}</strong> - ₹{item.price}
              </li>
            ))}
            <li style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Total: ₹{total}
            </li>
          </ul>
        )}
      </div>

      {/* Delivery Info */}
      <div style={sectionStyle}>
        <h3>Delivery Details</h3>
        <input
          type="text"
          placeholder="Street Address Line 1"
          value={street1}
          onChange={(e) => setStreet1(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Street Address Line 2"
          value={street2}
          onChange={(e) => setStreet2(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone Number (10 digits only)"
          value={phone}
          onChange={handlePhoneChange}
          style={inputStyle}
          maxLength={10}
        />
        <input
          type="date"
          placeholder='Select Delivery Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Time Slot</option>
          <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
          <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
          <option value="2:00 PM – 5:00 PM">2:00 PM – 5:00 PM</option>
          <option value="5:00 PM – 8:00 PM">5:00 PM – 8:00 PM</option>
        </select>
        {error && (
          <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
            ⚠ {error}
          </p>
        )}
      </div>

      {/* Proceed to Payment */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
       <button
  style={buttonStyle}
  onClick={(e) => {
    if (validateForm()) {
      window.location.href = '/payment';
    }
  }}
>
  Proceed to Payment
</button>

      </div>
    </div>
  );
};

// Styles
const sectionStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  marginTop: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '12px 25px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontSize: '16px',
};

export default CheckoutPage;
