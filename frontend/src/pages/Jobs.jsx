import { useState, useEffect } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    jobType: '',
    experience: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.location) params.append('location', filters.location);
      if (filters.category) params.append('category', filters.category);
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.experience) params.append('experience', filters.experience);

      const { data } = await api.get(`/jobs?${params.toString()}`);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      jobType: '',
      experience: ''
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="jobs-page">
      <div className="container">
        <h1>Browse Jobs</h1>

        <div className="jobs-filters">
          <input
            type="text"
            name="search"
            placeholder="Search by title or description"
            className="form-control"
            value={filters.search}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="form-control"
            value={filters.location}
            onChange={handleFilterChange}
          />

          <select
            name="jobType"
            className="form-control"
            value={filters.jobType}
            onChange={handleFilterChange}
          >
            <option value="">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-control"
            value={filters.category}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            className="form-control"
            value={filters.experience}
            onChange={handleFilterChange}
          />

          <button onClick={clearFilters} className="btn btn-secondary">
            Clear Filters
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="no-results">
            <h3>No jobs found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="results-count">{jobs.length} jobs found</p>
            <div className="grid grid-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
