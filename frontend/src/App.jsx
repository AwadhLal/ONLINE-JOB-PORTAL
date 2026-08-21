import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import MyJobs from './pages/MyJobs';
import MyApplications from './pages/MyApplications';
import Applications from './pages/Applications';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/my-applications" 
            element={
              <RoleRoute allowedRoles={['user']}>
                <MyApplications />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <RecruiterDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/create-job" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <CreateJob />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/edit-job/:id" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <EditJob />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/my-jobs" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <MyJobs />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/applications" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <Applications />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/job-applications/:jobId" 
            element={
              <RoleRoute allowedRoles={['recruiter']}>
                <Applications />
              </RoleRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
