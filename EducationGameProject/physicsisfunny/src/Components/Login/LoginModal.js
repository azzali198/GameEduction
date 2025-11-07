import React, { useState } from 'react';
import { loginUser } from '../../services/userService';
import { useUser } from '../../context/UserContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName: setGlobalUserName } = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { userName, password };
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const response = await loginUser(credentials);
      if (response) {
        setGlobalUserName(response.user.userName);
        sessionStorage.setItem('userName', response.user.userName);
      }
      if (onLogin) onLogin(response);
    } catch (error) {
      setErrorMsg(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="login-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="login-modal-panel">
        <button
          type="button"
          className="login-modal-close"
          aria-label="Close login form"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="login-modal-header">
          <h2 id="login-modal-title">Welcome back</h2>
          <p>Log in to continue your learning journey.</p>
        </div>
        <form className="login-modal-form" onSubmit={handleLogin}>
          <label className="login-modal-field">
            <span>User name</span>
            <input
              type="text"
              className="login-modal-input"
              placeholder="Enter your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label className="login-modal-field">
            <span>Password</span>
            <input
              type="password"
              className="login-modal-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errorMsg && (
            <div className="login-modal-error" role="alert">
              {errorMsg}
            </div>
          )}
          <div className="login-modal-actions">
            <button
              type="submit"
              className="login-modal-btn login-modal-btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Login'}
            </button>
            <button
              type="button"
              className="login-modal-btn login-modal-btn--ghost"
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
