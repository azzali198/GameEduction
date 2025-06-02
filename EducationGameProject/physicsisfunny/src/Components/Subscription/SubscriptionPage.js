import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from '../../data/countries';
import { subscribeUser } from '../../services/userService';
import ReactCountryFlag from 'react-country-flag';

const CountryOption = ({ country }) => (
  <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
    <ReactCountryFlag 
      countryCode={country.code}
      svg
      style={{
        width: '1.2em',
        height: '1.2em',
        marginRight: '8px'
      }}
    />
    <span>{country.name}</span>
  </div>
);

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

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    profession: '',
    plan: 'basic',
    nationality: ''
  });

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const submitData = { ...formData };
        delete submitData.confirmPassword;
        
        const response = await subscribeUser(submitData);
        alert('Subscription successful!');
        navigate('/'); // Redirect to home page after successful subscription
    } catch (error) {
        alert(error.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Subscribe to Premium Features
          </h2>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                minLength="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
                minLength="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profession</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                required
              >
                <option value="">Select your profession</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="professional">Professional</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <CustomSelect 
                value={formData.nationality}
                onChange={(value) => handleChange('nationality', value)}
                countries={countries}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;