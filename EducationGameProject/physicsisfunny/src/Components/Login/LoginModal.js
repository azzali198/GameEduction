// Add these imports at the top
import React, {useState} from 'react';
// ...existing code...

// Add these constants after your existing constants
const MODAL_OVERLAY = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
const MODAL_CONTENT = 'bg-white p-8 rounded-lg shadow-xl max-w-md w-full';

const LoginModal = ({ isOpen, onClose, handleLogin }) => {
    if (!isOpen) return null;
  
    return (
      <div className={MODAL_OVERLAY} onClick={onClose}>
        <div className={MODAL_CONTENT} onClick={e => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full border rounded p-2"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded p-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              onClick ={handleLogin}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default LoginModal;