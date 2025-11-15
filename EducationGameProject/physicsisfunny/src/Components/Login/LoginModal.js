import React, { useState } from 'react';
import { loginUser } from '../../services/userService';
import { useUser } from '../../context/UserContext';
import ForgotPassword from './ForgotPassword';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin, onNavigateToSubscription }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName: setGlobalUserName } = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const handleSubscriptionClick = () => {
    if (onNavigateToSubscription) {
      onNavigateToSubscription();
    }
    handleClose();
  };

  const handleClose = () => {
    setShowForgotPassword(false);
    if (onClose) onClose();
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
          onClick={handleClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="login-modal-header">
          <h2 id="login-modal-title">
            {showForgotPassword ? 'Reset password' : 'Welcome back'}
          </h2>
          <p>
            {showForgotPassword
              ? 'Use the email tied to your account to set a new password.'
              : 'Log in to continue your learning journey.'}
          </p>
        </div>
        {showForgotPassword ? (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        ) : (
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
            <div className="login-modal-forgot-wrapper">
              <button
                type="button"
                className="login-modal-forgot"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>
            </div>
            <div className="login-modal-actions">
              <button
                type="submit"
                className="login-modal-btn login-modal-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="login-modal-loading">
                    <svg
                      className="login-modal-spinner"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle
                        className="spinner-track"
                        cx="12"
                        cy="12"
                        r="9"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        className="spinner-head"
                        d="M12 3a9 9 0 0 1 9 9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    Signing in
                  </span>
                ) : (
                  'Login'
                )}
              </button>
              <button
                type="button"
                className="login-modal-btn login-modal-btn--ghost"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {!showForgotPassword && (
          <div className="login-modal-subscription">
            <span>New here?</span>
            <button type="button" onClick={handleSubscriptionClick}>
              Subscribe now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
