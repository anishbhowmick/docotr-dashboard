export interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  specialty: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Critical';
  bloodGroup: string;
  contactNumber: string;
  emergencyContact: string;
  medicalHistory: string[];
  allergies: string[];
}

export interface VitalStats {
  date: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  sugarLevel: number;
  bmi: number;
}