import React, { useState } from 'react';
import { resetForgottenPassword } from '../../services/userService';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation must match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetForgottenPassword({
        email,
        newPassword,
        confirmPassword,
      });
      setSuccessMsg('Password updated successfully. You can now log in.');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMsg(error.message || 'Unable to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h3>Reset password</h3>
        <p>Enter your email and create a new password to regain access.</p>
      </div>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <label className="forgot-password-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="forgot-password-field">
          <span>New password</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter a new password"
            required
            minLength={6}
          />
        </label>
        <label className="forgot-password-field">
          <span>Confirm new password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            required
            minLength={6}
          />
        </label>
        {errorMsg && (
          <div className="forgot-password-feedback forgot-password-feedback--error" role="alert">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="forgot-password-feedback forgot-password-feedback--success" role="status">
            {successMsg}
          </div>
        )}
        <button type="submit" className="forgot-password-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating�?�' : 'Update password'}
        </button>
      </form>
      <button type="button" className="forgot-password-back" onClick={onClose}>
        Back to login
      </button>
    </div>
  );
};

export default ForgotPassword;
