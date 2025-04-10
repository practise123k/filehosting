import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin password - in a real app, this would be more secure
    if (password === 'admin123') {
      onLogin(true);
      toast.success('Logged in as admin');
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-blue-500" />
      </div>
      <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}