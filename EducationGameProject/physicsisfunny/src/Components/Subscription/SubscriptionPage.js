import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from '../../data/countries';
import { subscribeUser } from '../../services/userService';
import ReactCountryFlag from 'react-country-flag';
import Swal from 'sweetalert2';
import './SubscriptionPage.css';

const CountryOption = ({ country }) => (
  <div className="subscription-country-option">
    <ReactCountryFlag
      countryCode={country.code}
      svg
      style={{ width: '1.2em', height: '1.2em', marginRight: '8px' }}
    />
    <span>{country.name}</span>
  </div>
);

const CustomSelect = ({ value, onChange, countries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === value);

  return (
    <div className="subscription-custom-select">
      <button
        type="button"
        className="subscription-select-display"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {value ? (
          <>
            <ReactCountryFlag
              countryCode={value}
              svg
              style={{ width: '1.2em', height: '1.2em', marginRight: '8px' }}
            />
            {selectedCountry?.name}
          </>
        ) : (
          'Select your nationality'
        )}
        <span className="subscription-select-caret" aria-hidden="true">v</span>
      </button>
      {isOpen && (
        <div className="subscription-select-dropdown" role="listbox">
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
    userName: '', // Changed from name
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    profession: '',
    plan: 'basic',
    country: '' // Changed from nationality
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
        await Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match. Please try again.',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    try {
        const submitData = { ...formData };
        delete submitData.confirmPassword;
        
        const response = await subscribeUser(submitData);
        await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Subscription completed successfully',
            confirmButtonColor: '#3085d6'
        });
        navigate('/');
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Subscription Failed',
            text: error.message || 'Subscription failed. Please try again.',
            confirmButtonColor: '#3085d6'
        });
    }
  };

  return (
    <div className="subscription-page">
      <div className="subscription-card">
        <div className="subscription-header">
          <p className="subscription-eyebrow">Physics & Chemistry Pass</p>
          <h2>Unlock every interactive science adventure</h2>
          <p className="subscription-lede">
            Dive into the complete library of physics and chemistry challenges, story-driven missions, and live learning events.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="subscription-form">
          <label className="subscription-field">
            <span>Username</span>
            <input
              type="text"
              className="subscription-input"
              value={formData.userName}
              onChange={(e) => handleChange('userName', e.target.value)}
              required
            />
          </label>

          <label className="subscription-field">
            <span>Email</span>
            <input
              type="email"
              className="subscription-input"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </label>

          <label className="subscription-field">
            <span>Date of birth</span>
            <input
              type="date"
              className="subscription-input"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              required
            />
          </label>

          <label className="subscription-field">
            <span>Password</span>
            <input
              type="password"
              className="subscription-input"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              minLength="8"
            />
          </label>

          <label className="subscription-field">
            <span>Confirm password</span>
            <input
              type="password"
              className="subscription-input"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              required
              minLength="8"
            />
          </label>

          <label className="subscription-field">
            <span>Profession</span>
            <select
              className="subscription-input"
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
          </label>

          <label className="subscription-field">
            <span>Country</span>
            <CustomSelect 
              value={formData.country}
              onChange={(value) => handleChange('country', value)}
              countries={countries}
            />
          </label>

          <div className="subscription-actions">
            <button
              type="submit"
              className="subscription-btn subscription-btn-primary"
            >
              Subscribe
            </button>
            <button
              type="button"
              className="subscription-btn subscription-btn-ghost"
              onClick={() => navigate('/')}
            >
              Maybe later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPage;
