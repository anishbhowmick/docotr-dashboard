import { useState, useEffect } from 'react';

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string; // Optional if not always present
  specialty: string;
  // ... other existing properties
};

export function useAuth() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Retrieve doctor data from localStorage
    const storedDoctor = localStorage.getItem('doctor');
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    // Clear doctor data from localStorage
    localStorage.removeItem('doctor');
    setDoctor(null);
    setIsAuthenticated(false);
    // Redirect to login page or perform other cleanup actions
    window.location.href = 'https://doctor-dashboard.vercel.app/login';
  };

  return { doctor, isAuthenticated, logout };
}