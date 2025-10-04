import React, { useState, useCallback } from 'react';
import { countries } from '../../data/countries';
import ReactCountryFlag from 'react-country-flag';
import './Profile.css';

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

const Profile = () => {
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

  const [isEditing, setIsEditing] = useState(true);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = async () => {
    try {
      // Validate passwords match if password fields are filled
      if (formData.password || formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
      }

      // TODO: Implement API call to update user profile
      console.log('Saving profile data:', formData);
      
      // Show success message
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert(error.message || 'Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // TODO: Reset form data to original values
    setIsEditing(false);
    // You might want to reload the original data here
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">User Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="edit-button"
            title="Edit Profile"
          >
            ✏️
          </button>
        )}
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-input"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profession</label>
          <select
            className="form-input"
            value={formData.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
            disabled={!isEditing}
            required
          >
            <option value="">Select your profession</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Nationality</label>
          {isEditing ? (
            <CustomSelect 
              value={formData.nationality}
              onChange={(value) => handleChange('nationality', value)}
              countries={countries}
            />
          ) : (
            <div className="form-input disabled-input">
              {formData.nationality ? (
                <div className="flex items-center">
                  <ReactCountryFlag 
                    countryCode={formData.nationality}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      marginRight: '8px'
                    }}
                  />
                  {countries.find(c => c.code === formData.nationality)?.name || formData.nationality}
                </div>
              ) : (
                'No nationality selected'
              )}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="button-group">
            <button
              type="button"
              onClick={handleSave}
              className="save-button"
              title="Save Changes"
            >
              💾
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              title="Cancel Changes"
            >
              ❌
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
