import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1>403 - Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return children;
};

export default RoleRoute;
