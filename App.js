// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './EGS/dashboard'; 
// import CheckoutPage from './EGS/checkout'; 
// import PaymentPage from './EGS/payment'; 

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//       </Routes>
//     </Router>
//   );
// }
//  export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage6 from './EGS/signup6'; 
import LoginPage3 from './EGS/login3'; 
import Dashboard from './EGS/dashboard'; 
import CheckoutPage from './EGS/checkout'; 
import PaymentPage from './EGS/payment'; 
import TrackOrder from './EGS/trackorder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage6 />} />
        <Route path="/login3" element={<LoginPage3 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/trackorder" element={<TrackOrder />} />
      </Routes>
    </Router>
  );
}
export default App;


// import React from 'react';
// import UserList from './EGS/userslist';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserList />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;