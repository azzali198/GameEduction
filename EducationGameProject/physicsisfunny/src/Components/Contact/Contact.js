import React, { useState } from 'react';
import './Contact.css';
import Swal from 'sweetalert2';
import { sendEmailWithValidation } from '../../services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    institution: '',
    grade: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email data for the service
      const emailData = {
        name: formData.name,
        category: formData.category,
        subject: formData.subject,
        emailAddress: formData.email,
        message: formData.message,
        institution: formData.institution || 'Not specified'
      };

      // Send email using the contact service
      await sendEmailWithValidation(emailData);
      
      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Message Sent Successfully!',
        text: 'Thank you for contacting us. We will get back to you soon.',
        confirmButtonColor: '#3B82F6',
        timer: 3000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        institution: '',
        grade: ''
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Error message
      Swal.fire({
        icon: 'error',
        title: 'Oops! Something went wrong',
        text: error.message || 'Please try again later or contact us directly.',
        confirmButtonColor: '#EF4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions about physics? Need help with our educational content? 
            We're here to help you explore the fascinating world of science!
          </p>
          <div className="hero-icons">
            <span className="material-icons">science</span>
            <span className="material-icons">calculate</span>
            <span className="material-icons">psychology</span>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-container">
        <div className="contact-content">

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <span className="material-icons">person</span>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <span className="material-icons">email</span>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">
                    <span className="material-icons">category</span>
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="physics">Physics Questions</option>
                    <option value="chemistry">Chemistry Questions</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership & Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="institution">
                    <span className="material-icons">school</span>
                    Institution (Optional)
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Your school or university"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <span className="material-icons">subject</span>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="Brief description of your inquiry"
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <span className="material-icons">message</span>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Tell us more about your question or feedback..."
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
                <div className="character-count">
                  {formData.message.length}/500 characters
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span className="material-icons">send</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
