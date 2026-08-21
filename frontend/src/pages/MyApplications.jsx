import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import './MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/applications/my');
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="my-applications-page">
      <div className="container">
        <h1>My Applications</h1>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>Start applying to jobs to see your applications here</p>
            <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app._id} className="application-card">
                <div className="application-header">
                  <div>
                    <h3>{app.job.title}</h3>
                    <p className="application-company">{app.job.company}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="application-details">
                  <div className="detail-item">
                    <strong>Location:</strong>
                    <span>{app.job.location}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Job Type:</strong>
                    <span>{app.job.jobType}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Salary:</strong>
                    <span>{app.job.salary}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Applied On:</strong>
                    <span>{new Date(app.appliedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {app.coverLetter && (
                  <div className="cover-letter">
                    <strong>Cover Letter:</strong>
                    <p>{app.coverLetter}</p>
                  </div>
                )}

                <div className="application-actions">
                  <Link to={`/jobs/${app.job._id}`} className="btn btn-primary btn-sm">
                    View Job
                  </Link>
                  {app.resume && (
                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      View Resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
