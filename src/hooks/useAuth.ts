import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthPayload {
  id: string;
  name: string;
  role: string;
  exp: number;
}

interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  specialty: string;
}

export function useAuth() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    setDoctor(null);
    console.log('Logging out...');
    // Optionally, redirect to login page
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: AuthPayload = jwtDecode(token);
        if (decoded.role === 'doctor') {
          const storedDoctor = localStorage.getItem('doctor');
          if (storedDoctor) {
            setDoctor(JSON.parse(storedDoctor));
          } else {
            // Fetch doctor details from backend if not stored
            fetch(`https://medical-backend-l140.onrender.com/api/doctors/${decoded.id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            })
              .then(response => response.json())
              .then(data => setDoctor(data))
              .catch(err => console.error('Error fetching doctor data:', err));
          }
        }
      } catch (error) {
        console.error('Invalid token', error);
        logout(); // Optional: Logout user if token is invalid
      }
    }
  }, []);

  return { doctor, logout };
}