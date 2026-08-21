import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    profileImage: user?.profileImage || '',
    skills: user?.skills?.join(', ') || '',
    resume: user?.resume || '',
    companyName: user?.companyName || '',
    companyWebsite: user?.companyWebsite || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      
      const { data } = await api.put('/users/profile', {
        ...formData,
        skills: skillsArray
      });

      updateUser(data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <h1>My Profile</h1>
          <p className="profile-subtitle">Update your personal information</p>

          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="profile-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user?.email}
                  disabled
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Profile Image URL</label>
                <input
                  type="url"
                  name="profileImage"
                  className="form-control"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  className="form-control"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-group">
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, Python"
                />
              </div>
            </div>

            {user?.role === 'user' && (
              <div className="profile-section">
                <h3>Job Seeker Information</h3>
                
                <div className="form-group">
                  <label>Resume URL</label>
                  <input
                    type="url"
                    name="resume"
                    className="form-control"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://example.com/your-resume.pdf"
                  />
                </div>
              </div>
            )}

            {user?.role === 'recruiter' && (
              <div className="profile-section">
                <h3>Company Information</h3>
                
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>

                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    className="form-control"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://company.com"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
