import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: '',
    coverLetter: ''
  });

  useEffect(() => {
    fetchJob();
    if (user && user.role === 'user') {
      checkIfApplied();
    }
  }, [id, user]);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    try {
      const { data } = await api.get('/applications/my');
      const applied = data.some(app => app.job._id === id);
      setHasApplied(applied);
    } catch (error) {
      console.error('Error checking application:', error);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!applicationData.resume) {
      alert('Please provide resume URL');
      return;
    }

    setApplying(true);
    try {
      await api.post('/applications', {
        jobId: id,
        resume: applicationData.resume,
        coverLetter: applicationData.coverLetter
      });
      alert('Application submitted successfully!');
      setHasApplied(true);
      setShowApplyForm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await api.delete(`/jobs/${id}`);
      alert('Job deleted successfully!');
      navigate('/my-jobs');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
    
    try {
      const { data } = await api.patch(`/jobs/${id}/status`, { status: newStatus });
      setJob(data);
      alert(`Job ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <Loading />;
  if (!job) return <div className="container" style={{ padding: '40px' }}>Job not found</div>;

  const isOwner = user && user._id === job.recruiter._id;

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="job-details-card">
          <div className="job-header">
            <div>
              <h1>{job.title}</h1>
              <p className="company-name">{job.company}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>

          <div className="job-info-grid">
            <div className="info-item">
              <strong>📍 Location:</strong>
              <span>{job.location}</span>
            </div>
            <div className="info-item">
              <strong>💼 Job Type:</strong>
              <span>{job.jobType}</span>
            </div>
            <div className="info-item">
              <strong>💰 Salary:</strong>
              <span>{job.salary}</span>
            </div>
            <div className="info-item">
              <strong>📅 Experience:</strong>
              <span>{job.experience}</span>
            </div>
            <div className="info-item">
              <strong>📂 Category:</strong>
              <span>{job.category}</span>
            </div>
            <div className="info-item">
              <strong>📅 Posted:</strong>
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="job-section">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="job-section">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div className="job-section">
            <h3>Recruiter Information</h3>
            <p><strong>Name:</strong> {job.recruiter.name}</p>
            <p><strong>Email:</strong> {job.recruiter.email}</p>
            {job.recruiter.companyName && <p><strong>Company:</strong> {job.recruiter.companyName}</p>}
          </div>

          <div className="job-actions">
            {user && user.role === 'user' && job.status === 'Active' && (
              <>
                {hasApplied ? (
                  <button className="btn btn-secondary" disabled>Already Applied</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setShowApplyForm(true)}>
                    Apply Now
                  </button>
                )}
              </>
            )}

            {isOwner && (
              <>
                <Link to={`/edit-job/${job._id}`} className="btn btn-primary">Edit Job</Link>
                <button className="btn btn-secondary" onClick={handleStatusToggle}>
                  {job.status === 'Active' ? 'Close Job' : 'Reopen Job'}
                </button>
                <Link to={`/job-applications/${job._id}`} className="btn btn-secondary">
                  View Applications
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Job</button>
              </>
            )}

            {!user && job.status === 'Active' && (
              <Link to="/login" className="btn btn-primary">Login to Apply</Link>
            )}
          </div>
        </div>

        {showApplyForm && (
          <div className="apply-form-modal">
            <div className="apply-form-card">
              <h2>Apply for {job.title}</h2>
              <form onSubmit={handleApply}>
                <div className="form-group">
                  <label>Resume URL *</label>
                  <input
                    type="url"
                    className="form-control"
                    value={applicationData.resume}
                    onChange={(e) => setApplicationData({...applicationData, resume: e.target.value})}
                    placeholder="https://example.com/your-resume.pdf"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={applying}>
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowApplyForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
