import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';

export function Header() {
  const { doctor, logout } = useAuth();
  const { showModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    showModal({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      onConfirm: () => {
        logout();
        window.location.href = 'https://medical-webpage-front.vercel.app/';
      },
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {doctor?.imageUrl && (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={doctor.imageUrl}
                alt={`${doctor.firstName} ${doctor.lastName}`}
              />
            )}
            <div className="ml-4">
              {doctor && (
                <>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Uncomment and update links as needed
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="/patients" className="text-gray-700 hover:text-blue-600">Patients</a>
            <a href="/appointments" className="text-gray-700 hover:text-blue-600">Appointments</a>
            */}
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Uncomment and update links as needed
            <a href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="/patients" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Patients</a>
            <a href="/appointments" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Appointments</a>
            */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}