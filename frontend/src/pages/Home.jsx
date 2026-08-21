import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import JobCard from '../components/JobCard';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const { data } = await api.get('/jobs?limit=6');
        setFeaturedJobs(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Find Your Dream Job Today</h1>
          <p>Thousands of jobs in technology, business, and more</p>
          <div className="hero-actions">
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
                <Link to="/jobs" className="btn btn-secondary btn-lg">Browse Jobs</Link>
              </>
            ) : user.role === 'user' ? (
              <Link to="/jobs" className="btn btn-primary btn-lg">Browse Jobs</Link>
            ) : (
              <Link to="/create-job" className="btn btn-primary btn-lg">Post a Job</Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Quality Jobs</h3>
              <p>Access to top companies and startups</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with one click</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Platform</h3>
              <p>Your data is safe with us</p>
            </div>
          </div>
        </div>
      </section>

      {featuredJobs.length > 0 && (
        <section className="featured-jobs">
          <div className="container">
            <h2>Featured Jobs</h2>
            <div className="grid grid-3">
              {featuredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link to="/jobs" className="btn btn-primary">View All Jobs</Link>
            </div>
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-box">
              <h3>For Job Seekers</h3>
              <p>Find your next opportunity</p>
              <Link to={user ? '/jobs' : '/register'} className="btn btn-primary">
                {user ? 'Browse Jobs' : 'Register Now'}
              </Link>
            </div>
            <div className="cta-box">
              <h3>For Recruiters</h3>
              <p>Find the best talent</p>
              <Link to={user?.role === 'recruiter' ? '/create-job' : '/register'} className="btn btn-primary">
                {user?.role === 'recruiter' ? 'Post a Job' : 'Register Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
