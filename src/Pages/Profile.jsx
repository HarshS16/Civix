import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faExclamationTriangle,
  faClock,
  faArrowLeft, // Make sure this is imported
  faEdit,
  faSave,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'; // Your custom styles

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    location: '',
    complaints: 0,
    lastActivity: '',
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    location: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordRequest, setShowPasswordRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios
        .get(`http://localhost:5000/api/profile/${email}`)
        .then((res) => {
          const { username, email, location, complaints, last_activity } = res.data;

          setUser({
            username,
            email,
            location: location || '',
            complaints: complaints || 0,
            lastActivity: last_activity
              ? new Date(last_activity).toLocaleString()
              : 'N/A',
          });

          setFormData({
            username,
            email,
            location: location || '',
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/profile/${user.email}`, formData)
      .then((res) => {
        const { username, email, location, complaints, last_activity } = res.data;

        setUser({
          username,
          email,
          location,
          complaints,
          lastActivity: last_activity
            ? new Date(last_activity).toLocaleString()
            : 'N/A',
        });

        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="profile-page">
      {/* Back Button - Using the 'back-button' class and FontAwesomeIcon */}
      <button
        className="back-button" // Using 'back-button' as per your provided CSS
        onClick={() => window.history.back()}
        type="button"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="icon" /> {/* Added the arrow icon */}
        Back
      </button>


      <div className="profile-card">
        <h2 className="profile-title">
          <FontAwesomeIcon icon={faUser} className="icon" />
          Profile Overview
        </h2>

        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <FontAwesomeIcon icon={faUser} className="icon" />
              Name
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${isEditing ? 'editable' : 'readonly'}`}
              value={formData.username}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${isEditing ? 'editable' : 'readonly'}`}
              value={formData.email}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              Location
            </label>
            <input
              id="location"
              type="text"
              className={`form-input ${isEditing ? 'editable' : 'readonly'}`}
              value={formData.location}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Complaints */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
              Total Complaints
            </label>
            <div className="form-text">{user.complaints}</div>
          </div>

          {/* Last Activity */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faClock} className="icon" />
              Last Activity
            </label>
            <div className="form-text">{user.lastActivity}</div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {isEditing ? (
              <button type="button" onClick={handleSave} className="btn-primary">
                <FontAwesomeIcon icon={faSave} className="icon" />
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                <FontAwesomeIcon icon={faEdit} className="icon" />
                Edit Profile
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowPasswordRequest(true)}
              className="btn-secondary"
            >
              <FontAwesomeIcon icon={faLock} className="icon" />
              Request Password Change
            </button>
          </div>
        </form>

        {showPasswordRequest && (
          <div className="password-request-message" role="alert">
            A password reset link has been sent to your email address.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
