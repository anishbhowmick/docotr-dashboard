import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
); 