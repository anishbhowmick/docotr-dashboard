import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthPayload {
  id: string;
  name: string;
  role: string;
  exp: number;
}

export function useAuth() {
  const [doctor, setDoctor] = useState<{
    id: string;
    name: string;
    imageUrl: string;
    specialty: string;
  } | null>(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    console.log('Logging out...');
    // Redirect to login or perform other logout actions
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: AuthPayload = jwtDecode(token);
        if (decoded.role === 'doctor') {
          // Fetch doctor details from backend if not stored
          const storedDoctor = localStorage.getItem('doctor');
          if (storedDoctor) {
            setDoctor(JSON.parse(storedDoctor));
          } else {
            // Optionally fetch from backend
            // Example:
            // fetch(`https://medical-backend-l140.onrender.com/api/doctors/${decoded.id}`, {
            //   headers: { 'Authorization': `Bearer ${token}` }
            // })
            //   .then(response => response.json())
            //   .then(data => setDoctor(data))
            //   .catch(err => console.error(err));
          }
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  return { doctor, logout };
}