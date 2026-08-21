import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';
import './Dashboard.css';

const RecruiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    totalApplications: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [jobsRes, applicationsRes] = await Promise.all([
        api.get('/jobs/my-jobs'),
        api.get('/applications/recruiter')
      ]);

      const jobs = jobsRes.data;
      const applications = applicationsRes.data;

      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.status === 'Active').length,
        closedJobs: jobs.filter(j => j.status === 'Closed').length,
        totalApplications: applications.length
      });

      setRecentJobs(jobs.slice(0, 5));
      setRecentApplications(applications.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Welcome back, {user?.name}!</h1>
        <p className="dashboard-subtitle">Here's what's happening with your job postings</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-content">
              <h3>{stats.totalJobs}</h3>
              <p>Total Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.activeJobs}</h3>
              <p>Active Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>{stats.closedJobs}</h3>
              <p>Closed Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>{stats.totalApplications}</h3>
              <p>Total Applications</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Jobs</h2>
              <Link to="/my-jobs" className="btn btn-secondary btn-sm">View All</Link>
            </div>
            {recentJobs.length === 0 ? (
              <p>No jobs posted yet</p>
            ) : (
              <div className="list-items">
                {recentJobs.map((job) => (
                  <div key={job._id} className="list-item">
                    <div>
                      <h4>{job.title}</h4>
                      <p>{job.company} • {job.location}</p>
                    </div>
                    <Link to={`/jobs/${job._id}`} className="btn btn-primary btn-sm">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Applications</h2>
              <Link to="/applications" className="btn btn-secondary btn-sm">View All</Link>
            </div>
            {recentApplications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              <div className="list-items">
                {recentApplications.map((app) => (
                  <div key={app._id} className="list-item">
                    <div>
                      <h4>{app.applicant.name}</h4>
                      <p>{app.job.title}</p>
                    </div>
                    <span className={`badge badge-${app.status === 'Applied' ? 'info' : 'success'}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/create-job" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Post New Job</h3>
              <p>Create a new job posting</p>
            </Link>
            <Link to="/my-jobs" className="action-card">
              <div className="action-icon">📋</div>
              <h3>Manage Jobs</h3>
              <p>View and edit your jobs</p>
            </Link>
            <Link to="/applications" className="action-card">
              <div className="action-icon">👥</div>
              <h3>View Applications</h3>
              <p>Review job applications</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
