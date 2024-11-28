import React, { useState } from 'react';
import { Plus, Printer } from 'lucide-react';

interface Medicine {
  name: string;
  dosage: string;
  timing: string;
  frequency: number;
  duration: number;
  instructions: string;
}

export function PrescriptionForm() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({
    name: '',
    dosage: '',
    timing: 'after',
    frequency: 1,
    duration: 1,
    instructions: '',
  });

  const handleAddMedicine = () => {
    setMedicines([...medicines, currentMedicine]);
    setCurrentMedicine({
      name: '',
      dosage: '',
      timing: 'after',
      frequency: 1,
      duration: 1,
      instructions: '',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">New Prescription</h2>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medicine Name
            </label>
            <input
              type="text"
              value={currentMedicine.name}
              onChange={(e) =>
                setCurrentMedicine({ ...currentMedicine, name: e.target.value })
              }
              className="mt-1 block w-full border rounded-md px-3 py-2"
              placeholder="Enter medicine name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              type="text"
              value={currentMedicine.dosage}
              onChange={(e) =>
                setCurrentMedicine({ ...currentMedicine, dosage: e.target.value })
              }
              className="mt-1 block w-full border rounded-md px-3 py-2"
              placeholder="e.g., 500mg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timing
            </label>
            <select
              value={currentMedicine.timing}
              onChange={(e) =>
                setCurrentMedicine({ ...currentMedicine, timing: e.target.value })
              }
              className="mt-1 block w-full border rounded-md px-3 py-2"
            >
              <option value="before">Before meals</option>
              <option value="after">After meals</option>
              <option value="with">With meals</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency (per day)
            </label>
            <input
              type="number"
              value={currentMedicine.frequency}
              onChange={(e) =>
                setCurrentMedicine({
                  ...currentMedicine,
                  frequency: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border rounded-md px-3 py-2"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            value={currentMedicine.instructions}
            onChange={(e) =>
              setCurrentMedicine({
                ...currentMedicine,
                instructions: e.target.value,
              })
            }
            className="mt-1 block w-full border rounded-md px-3 py-2"
            rows={3}
          />
        </div>

        <button
          onClick={handleAddMedicine}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Medicine
        </button>

        {medicines.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Prescribed Medicines</h3>
            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-medium">{medicine.name}</h4>
                  <p className="text-sm text-gray-600">
                    {medicine.dosage} - {medicine.timing} meals, {medicine.frequency}x daily
                  </p>
                  {medicine.instructions && (
                    <p className="text-sm text-gray-600 mt-2">
                      Instructions: {medicine.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}