import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import './MyJobs.css';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const { data } = await api.get('/jobs/my-jobs');
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      alert('Job deleted successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="my-jobs-page">
      <div className="container">
        <div className="page-header">
          <h1>My Jobs</h1>
          <Link to="/create-job" className="btn btn-primary">Post New Job</Link>
        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs posted yet</h3>
            <p>Start by creating your first job posting</p>
            <Link to="/create-job" className="btn btn-primary">Post a Job</Link>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-item">
                <div className="job-item-content">
                  <div className="job-item-header">
                    <h3>{job.title}</h3>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="job-item-company">{job.company}</p>
                  <div className="job-item-details">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType}</span>
                    <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="job-item-actions">
                  <Link to={`/jobs/${job._id}`} className="btn btn-secondary btn-sm">View</Link>
                  <Link to={`/edit-job/${job._id}`} className="btn btn-primary btn-sm">Edit</Link>
                  <Link to={`/job-applications/${job._id}`} className="btn btn-secondary btn-sm">
                    Applications
                  </Link>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
