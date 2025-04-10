import React, { useState } from 'react';
import { Menu, X, Home, Lock, LogOut } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  onAdminClick: () => void;
  onHomeClick: () => void;
  onLogout: () => void;
}

export function Navbar({ isAdmin, onAdminClick, onHomeClick, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onHomeClick}
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
            >
              <Home className="w-6 h-6" />
              <span className="font-semibold text-lg">File Share</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onHomeClick}
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>
            {isAdmin && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  onHomeClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onAdminClick();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}