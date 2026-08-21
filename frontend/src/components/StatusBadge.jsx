const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'badge-info';
      case 'Reviewing':
        return 'badge-warning';
      case 'Shortlisted':
        return 'badge-primary';
      case 'Rejected':
        return 'badge-danger';
      case 'Hired':
        return 'badge-success';
      case 'Active':
        return 'badge-success';
      case 'Closed':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  return <span className={`badge ${getStatusClass(status)}`}>{status}</span>;
};

export default StatusBadge;
