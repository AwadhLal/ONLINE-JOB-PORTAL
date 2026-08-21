import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import './Applications.css';

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const url = jobId ? `/applications/job/${jobId}` : '/applications/recruiter';
      const { data } = await api.get(url);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await api.patch(`/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
      alert('Application status updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="applications-page">
      <div className="container">
        <h1>{jobId ? 'Job Applications' : 'All Applications'}</h1>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>Applications will appear here when job seekers apply to your jobs</p>
          </div>
        ) : (
          <div className="applications-table">
            {applications.map((app) => (
              <div key={app._id} className="application-row">
                <div className="applicant-info">
                  <h3>{app.applicant.name}</h3>
                  <p className="applicant-email">{app.applicant.email}</p>
                  <p className="applicant-phone">📞 {app.applicant.phone || 'N/A'}</p>
                  {app.applicant.location && <p>📍 {app.applicant.location}</p>}
                </div>

                <div className="job-info">
                  <h4>{app.job.title}</h4>
                  <p>{app.job.company}</p>
                </div>

                {app.applicant.skills && app.applicant.skills.length > 0 && (
                  <div className="skills-section">
                    <strong>Skills:</strong>
                    <div className="skills-tags">
                      {app.applicant.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="application-info">
                  <p><strong>Applied:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> <StatusBadge status={app.status} /></p>
                  
                  {app.resume && (
                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      View Resume
                    </a>
                  )}
                </div>

                {app.coverLetter && (
                  <div className="cover-letter-section">
                    <strong>Cover Letter:</strong>
                    <p>{app.coverLetter}</p>
                  </div>
                )}

                <div className="status-actions">
                  <label>Update Status:</label>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
