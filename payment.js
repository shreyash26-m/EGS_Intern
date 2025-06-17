
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePayment = () => {
    setError('');
    if (cartItems.length === 0) return setError('Cart is empty');

    if (paymentMethod === 'card') {
      const { cardNumber, expiry, cvv, name } = cardDetails;
      if (!cardNumber || !expiry || !cvv || !name) return setError('Please fill in all card details');
    } else if (paymentMethod === 'upi') {
      if (!upiId) return setError('Please enter UPI ID');
    }

    // Simulate payment delay
    setTimeout(() => {
      localStorage.removeItem('cart');
      navigate('/trackorder'); // Go to tracking screen
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Payment Page</h2>
      <h3>Order Summary</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name} x {item.quantity || 1} - ₹{item.price * (item.quantity || 1)}</li>
          ))}
        </ul>
      )}
      <h4>Total: ₹{totalAmount}</h4>

      <hr />
      <h3>Select Payment Method</h3>
      <label><input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> Card</label><br />
      <label><input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /> UPI</label><br />
      <label><input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on Delivery</label>

      {paymentMethod === 'card' && (
        <div style={{ marginTop: '10px' }}>
          <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} maxLength={16} style={{ width: '100%', marginBottom: '8px' }} />
          <input type="text" placeholder="Expiry (MM/YY)" value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} maxLength={5} style={{ width: '48%', marginRight: '4%' }} />
          <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} maxLength={3} style={{ width: '48%' }} />
          <input type="text" placeholder="Name on Card" value={cardDetails.name} onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })} style={{ width: '100%', marginTop: '8px' }} />
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
          <p>Or scan the QR:</p>
          <img src="/qr.jpg" alt="UPI QR Code" style={{ width: '200px', border: '1px solid #ccc', borderRadius: '10px' }} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handlePayment} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Pay ₹{totalAmount}
      </button>
    </div>
  );
};

export default PaymentPage;
