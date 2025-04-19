import React, { useState } from 'react';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Subscribe to Premium Features</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Select Plan</label>
            <select
              className="w-full border rounded p-2"
              value={formData.plan}
              onChange={(e) => setFormData({...formData, plan: e.target.value})}
            >
              <option value="basic">Basic Plan ($9.99/month)</option>
              <option value="premium">Premium Plan ($19.99/month)</option>
              <option value="pro">Pro Plan ($29.99/month)</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;