import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-center space-x-4">
        <ClockIcon className="w-8 h-8 text-blue-500" />
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900 font-mono">
            {format(time, 'HH:mm:ss')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {format(time, 'EEEE, MMMM do, yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}