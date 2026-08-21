import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '72px', marginBottom: '20px', color: '#3b82f6' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
