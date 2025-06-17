import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('menu');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');

  const foodItems = {
    menu: [
      { id: 1, name: 'Pizza', price: 150, image: '/pizza.jpg' },
      { id: 2, name: 'Burger', price: 100, image: '/burger.jpeg' },
      { id: 3, name: 'Fries', price: 80, image: '/fries.jpg' },
      { id: 4, name: 'Pasta', price: 130, image: '/pasta.png' },
      { id: 5, name: 'Sandwich', price: 90, image: '/sandwich.avif' },
      { id: 6, name: 'Noodles', price: 110, image: '/noodles.jpg' },
    ],
    combos: [
      { id: 7, name: 'Pizza + Coke Combo', price: 200, image: '/p&c.avif' },
      { id: 8, name: 'Burger + Fries Combo', price: 180, image: '/b&C&F.jpeg' },
      { id: 9, name: 'Noodles + Manchurian Combo', price: 220, image: '/n&m.jpg' },
    ],
    desserts: [
      { id: 10, name: 'Chocolate Pastry', price: 90, image: '/pastry.jpeg' },
      { id: 11, name: 'Ice Cream Sundae', price: 80, image: '/sundae.jpg' },
      { id: 12, name: 'Soft Serve', price: 30, image: '/softSrve.jpg' },
    ],
    beverages: [
      { id: 13, name: 'Coca Cola', price: 50, image: '/coke.jpeg' },
      { id: 14, name: 'Lemonade', price: 90, image: '/limesoda.jpg' },
      { id: 15, name: 'Tea', price: 40, image: '/tea.jpeg' },
      { id: 16, name: 'Coffee', price: 75, image: '/coffee.jpg' },
    ],
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.userId) {
      setUsername(storedUser.userId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? '200px' : '50px',
          transition: 'width 0.3s',
          backgroundColor: '#f0f0f0',
          padding: '10px',
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'none', border: 'none', fontSize: '20px' }}
        >
          <FaBars />
        </button>
        {sidebarOpen && (
          <div style={{ marginTop: '20px' }}>
            <p onClick={() => setActiveCategory('menu')} style={sideItemStyle}>Menu</p>
            <p onClick={() => setActiveCategory('combos')} style={sideItemStyle}>Combos</p>
            <p onClick={() => setActiveCategory('desserts')} style={sideItemStyle}>Desserts</p>
            <p onClick={() => setActiveCategory('beverages')} style={sideItemStyle}>Beverages</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px', textAlign: 'center', flex: 1 }}>
        <h2>Welcome, {username} 👋</h2>
        <h2>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>

        <div style={gridStyles}>
          {foodItems[activeCategory].map((item) => (
            <div key={item.id} style={cardStyles}>
              <img src={item.image} alt={item.name} style={imgStyle} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)} style={buttonStyle}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div style={{ marginTop: '50px' }}>
          <h3><FaShoppingCart /> Your Cart</h3>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>Item</th>
                  <th style={cellStyle}>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td style={cellStyle}>{item.name}</td>
                    <td style={cellStyle}>₹{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...cellStyle, fontWeight: 'bold' }}>Total</td>
                  <td style={{ ...cellStyle, fontWeight: 'bold' }}>₹{getTotal()}</td>
                </tr>
              </tbody>
            </table>
          )}
          {cart.length > 0 && (
            <button onClick={() => navigate('/checkout')} style={buttonStyle}>Proceed to Checkout</button>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling
const sideItemStyle = {
  cursor: 'pointer',
  padding: '10px 0',
  borderBottom: '1px solid #ccc',
  fontWeight: 'bold'
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  maxWidth: '1000px',
  margin: 'auto',
};

const cardStyles = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
};

const imgStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 15px',
  cursor: 'pointer',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

const tableStyle = {
  margin: '20px auto',
  borderCollapse: 'collapse',
  width: '60%',
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
};

export default Dashboard;
