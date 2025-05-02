import React, { useState, useCallback } from 'react';
import { countries } from '../../data/countries';
import ReactCountryFlag from 'react-country-flag';

const CountryOption = ({ country }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
      <div className="w-8">
        <ReactCountryFlag 
          countryCode={country.code}
          svg
          style={{
            width: '1.2em',
            height: '1.2em'
          }}
        />
      </div>
      <span className="ml-2">{country.name}</span>
    </div>
  );
};

const CustomSelect = ({ value, onChange, countries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === value);

  return (
    <div className="relative">
      <div 
        className="w-full border rounded p-2 pl-8 flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <>
            <ReactCountryFlag 
              countryCode={value}
              svg
              style={{
                width: '1.2em',
                height: '1.2em',
                marginRight: '8px'
              }}
            />
            {selectedCountry?.name}
          </>
        ) : (
          'Select your nationality'
        )}
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto z-50">
          {countries.map(country => (
            <div 
              key={country.code}
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
            >
              <CountryOption country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic',
    nationality: ''
  });

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(formData);
    onClose();
  };

  const handleModalClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleModalClick}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Subscribe to Premium Features</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Select Plan</label>
            <select
              className="w-full border rounded p-2"
              value={formData.plan}
              onChange={(e) => handleChange('plan', e.target.value)}
            >
              <option value="basic">Basic Plan ($9.99/month)</option>
              <option value="premium">Premium Plan ($19.99/month)</option>
              <option value="pro">Pro Plan ($29.99/month)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Nationality</label>
            <CustomSelect 
              value={formData.nationality}
              onChange={(value) => handleChange('nationality', value)}
              countries={countries}
            />
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