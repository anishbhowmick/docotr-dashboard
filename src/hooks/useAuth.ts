import { useState } from 'react';

export function useAuth() {
  const [doctor] = useState({
    id: '1',
    name: 'Dr. Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    specialty: 'Cardiologist',
  });

  const logout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return { doctor, logout };
}