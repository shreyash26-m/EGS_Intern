import React, { useEffect, useState } from 'react';

const TrackOrder = () => {
  const [status, setStatus] = useState("Preparing your order...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus("Your order has arrived! Enjoy your meal.");
          return 100;
        } else if (prev >= 70) {
          setStatus("Almost there...");
        } else if (prev >= 40) {
          setStatus("Out for delivery...");
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Order Tracking</h2>
      <p>{status}</p>
      <div style={{ width: '80%', margin: '20px auto', height: '20px', background: '#ccc', borderRadius: '10px' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#28a745', borderRadius: '10px', transition: 'width 1s' }} />
      </div>
      <img src="/map.png" alt="Map" style={{ width: '80%', marginTop: '30px', borderRadius: '12px' }} />
    </div>
  );
};

export default TrackOrder;
