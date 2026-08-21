import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className={`badge badge-${job.status === 'Active' ? 'success' : 'danger'}`}>
          {job.status}
        </span>
      </div>

      <p className="job-company">{job.company}</p>

      <div className="job-details">
        <span>📍 {job.location}</span>
        <span>💼 {job.jobType}</span>
        <span>💰 {job.salary}</span>
      </div>

      <div className="job-meta">
        <span className="badge badge-info">{job.experience}</span>
        <span className="badge badge-primary">{job.category}</span>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="job-skills">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
          {job.skills.length > 3 && <span className="skill-tag">+{job.skills.length - 3}</span>}
        </div>
      )}

      <div className="job-card-footer">
        <span className="job-posted">{getTimeAgo(job.createdAt)}</span>
        <Link to={`/jobs/${job._id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
