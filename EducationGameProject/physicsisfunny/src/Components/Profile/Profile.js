import React, { useState, useCallback, useEffect } from 'react';
import { countries } from '../../data/countries';
import ReactCountryFlag from 'react-country-flag';
import { getUserByUsername, updateUser } from '../../services/userService';
import Swal from 'sweetalert2';
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
  // Sort countries alphabetically by name
  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
  
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

  const [originalData, setOriginalData] = useState({}); // Store original data for cancel functionality
  const [isEditing, setIsEditing] = useState(false); // Start in view mode
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const username = sessionStorage.getItem('userName');
        if (!username) {
          throw new Error('No username found in session');
        }

        const userData = await getUserByUsername(username);
        
        // Map API response to form structure
        const mappedData = {
          UserName: userData.userName || '',
          Email: userData.email || '',
          DateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '', // Format date for input
          Profession: userData.profession || '',
          Country: userData.country || ''
        };
        
        setFormData(mappedData);
        setOriginalData(mappedData);
      } catch (error) {
        console.error('Error loading user data:', error);
        setError(error.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = async () => {
    try {
      // Prepare user data for API call
      const userData = {
        Email: formData.Email,
        DateOfBirth: formData.DateOfBirth,
        Profession: formData.Profession,
        Country: formData.Country,
        Password: '',
        IdUser: 0,
        Actif: true,
        // Include username from session
        Username: sessionStorage.getItem('userName')
      };

      // Call the updateUser API
      const result = await updateUser(userData);
      console.log('User updated successfully:', result);
      
      // Update original data to reflect the saved changes
      const updatedOriginalData = { ...formData };

      setOriginalData(updatedOriginalData);
      
      // Clear password fields in current form data
      /*µsetFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));*/
      
      // Show success message and exit edit mode
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully!',
        confirmButtonColor: '#16a34a',
        timer: 2000,
        showConfirmButton: false
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message || 'Failed to update profile. Please try again.',
        confirmButtonColor: '#dc2626'
      });
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({ ...originalData, password: '', confirmPassword: '' });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      {isLoading ? (
        <div className="loading-container">
          <h2 className="profile-title">Loading Profile...</h2>
          <p>Please wait while we load your profile information.</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <h2 className="profile-title">Error Loading Profile</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="profile-header">
            <h2 className="profile-title">User Profile</h2>
            <div className="action-buttons">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="icon-button edit-button"
              title="Edit Profile"
            >
              ✏️
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="icon-button save-button"
                title="Save Changes"
              >
                💾
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="icon-button cancel-button"
                title="Cancel Changes"
              >
                ❌
              </button>
            </>
          )}
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            value={formData.UserName}
            disabled={true}
            readOnly
            style={{ 
              backgroundColor: '#f3f4f6', 
              color: '#6b7280',
              cursor: 'not-allowed'
            }}
            title="Username cannot be changed"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={formData.Email}
            onChange={(e) => handleChange('Email', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-input"
            value={formData.DateOfBirth}
            onChange={(e) => handleChange('DateOfBirth', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profession</label>
          <select
            className="form-input"
            value={formData.Profession}
            onChange={(e) => handleChange('Profession', e.target.value)}
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
              value={formData.Country}
              onChange={(value) => handleChange('Country', value)}
              countries={sortedCountries}
            />
          ) : (
            <div className="form-input disabled-input">
              {formData.Country ? (
                <div className="flex items-center">
                  <ReactCountryFlag 
                    countryCode={formData.Country}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      marginRight: '8px'
                    }}
                  />
                  {sortedCountries.find(c => c.code === formData.Country)?.name || formData.Country}
                </div>
              ) : (
                'No country selected'
              )}
            </div>
          )}
        </div>
      </form>
        </>
      )}
    </div>
  );
};

export default Profile;
