import React from 'react';
import { Users, Calendar, AlertCircle } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Total Patients"
        value={1234}
        icon={<Users className="w-6 h-6 text-white" />}
        color="bg-blue-500"
      />
      <StatsCard
        title="Appointments Today"
        value={8}
        icon={<Calendar className="w-6 h-6 text-white" />}
        color="bg-green-500"
      />
      <StatsCard
        title="Critical Cases"
        value={3}
        icon={<AlertCircle className="w-6 h-6 text-white" />}
        color="bg-red-500"
      />
    </div>
  );
}