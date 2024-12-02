import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Clock } from './components/dashboard/Clock';
import { QuickStats } from './components/dashboard/QuickStats';
import { PatientSearch } from './components/patients/PatientSearch';
import { PatientDetails } from './components/patients/PatientDetails';
import { PrescriptionForm } from './components/prescriptions/PrescriptionForm';
import { Patient } from './types';
import { X } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

function App() {
  const { doctor, isAuthenticated } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or a redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Greeting and Clock Section */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-md p-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, Dr. {doctor?.lastName}
              </h1>
              <p className="text-gray-600">Welcome to your dashboard</p>
            </div>
            <Clock />
          </div>

          {/* Quick Stats Section */}
          <QuickStats />

          {/* Patient Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
            <PatientSearch
              onSearch={(query) => console.log('Searching:', query)}
              patients={[]} // Replace with actual patient data
              onSelectPatient={handlePatientSelect}
            />
          </div>

          {/* Patient Details Section */}
          {selectedPatient && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Patient Details</h2>
                <button
                  onClick={handleClosePatientDetails}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <PatientDetails
                patient={selectedPatient}
                vitalStats={[]} // Replace with actual vital stats
              />
            </div>
          )}

          {/* Prescription Section */}
          {selectedPatient && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
              <PrescriptionForm />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;