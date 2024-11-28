import React, { useState } from 'react';
import { Patient, VitalStats } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Edit2, Save, Upload } from 'lucide-react';

interface PatientDetailsProps {
  patient: Patient;
  vitalStats: VitalStats[];
}

export function PatientDetails({ patient, vitalStats }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['personal', 'vitals', 'treatment'].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5 mr-2" />
                    Edit
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editedPatient.name}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={editedPatient.age}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, age: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={editedPatient.gender}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  value={editedPatient.bloodGroup}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, bloodGroup: e.target.value })
                  }
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  value={editedPatient.contactNumber}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, contactNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input
                  type="tel"
                  value={editedPatient.emergencyContact}
                  disabled={!isEditing}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditedPatient({ ...editedPatient, emergencyContact: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <div className="mt-2 space-y-2">
                {editedPatient.medicalHistory.map((condition, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Allergies</label>
              <div className="mt-2 space-y-2">
                {editedPatient.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {allergy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Vital Statistics</h2>
            <div className="h-80">
              <LineChart width={800} height={300} data={vitalStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bloodPressure.systolic"
                  stroke="#8884d8"
                  name="Systolic BP"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bloodPressure.diastolic"
                  stroke="#82ca9d"
                  name="Diastolic BP"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sugarLevel"
                  stroke="#ffc658"
                  name="Sugar Level"
                />
              </LineChart>
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Treatment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Diagnosis
                </label>
                <textarea
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Medical Reports
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}