import React, { useState } from 'react';
import { loginUser } from '../../services/userService';

const MODAL_OVERLAY = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
const MODAL_CONTENT = 'bg-white p-8 rounded-lg shadow-xl max-w-md w-full';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { userName, password };
    try {
      const user = await loginUser(credentials);
      if (onLogin) onLogin(true);
    } catch (error) {
      if (onLogin) onLogin(false);
      alert(error.message || 'Login failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={MODAL_OVERLAY}>
      <div className={MODAL_CONTENT}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-2">UserName</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter your userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded p-2"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;