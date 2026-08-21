# Online Job Portal - Novexa Technologies

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) job portal application with complete authentication, authorization, and CRUD operations for jobs and applications.

## 🎯 Project Overview

This is a fully functional job portal that connects job seekers with recruiters. The platform supports two user roles with distinct functionalities and includes real-time job management, application tracking, and profile management.

## ✨ Features

### For Job Seekers
- Browse and search jobs with advanced filtering
- Apply for jobs with resume and cover letter
- Track application status in real-time
- Manage personal profile and skills
- View application history

### For Recruiters
- Post and manage job listings
- View and manage applications
- Update application status (Applied, Reviewing, Shortlisted, Rejected, Hired)
- Close/reopen job postings
- Recruiter dashboard with statistics
- View applicant profiles and resumes

### General Features
- JWT-based authentication
- Role-based authorization (Job Seeker & Recruiter)
- Secure password hashing with bcryptjs
- Responsive design for mobile and desktop
- Real-time data updates
- MongoDB persistent storage

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
ONLINE-JOB-PORTAL/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── CreateJob.jsx
│   │   │   ├── EditJob.jsx
│   │   │   ├── MyJobs.jsx
│   │   │   ├── MyApplications.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── RecruiterDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedData.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🗄 Database Models

### User Model
- name, email, password (hashed)
- role (user/recruiter)
- profileImage, phone, location, bio, skills
- resume (for job seekers)
- companyName, companyWebsite (for recruiters)
- timestamps

### Job Model
- title, description, company, location
- jobType, salary, experience, skills, category
- recruiter (reference to User)
- status (Active/Closed)
- timestamps

### Application Model
- job (reference to Job)
- applicant (reference to User)
- recruiter (reference to User)
- resume, coverLetter
- status (Applied/Reviewing/Shortlisted/Rejected/Hired)
- appliedAt, timestamps
- Unique constraint on (job + applicant)

## 🔐 Authentication & Authorization

### Authentication Flow
1. User registers with email, password, and role
2. Password is hashed using bcryptjs
3. JWT token generated and returned
4. Token stored in localStorage
5. Token sent in Authorization header for protected routes

### Authorization Rules
- **Public routes**: Home, Jobs list, Job details (view only)
- **Job Seeker only**: Apply for jobs, My Applications
- **Recruiter only**: Create/Edit/Delete jobs, View applications, Update application status
- **Authenticated users**: Profile management

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/profile - Get current user profile (Protected)
```

### Users
```
PUT /api/users/profile - Update user profile (Protected)
```

### Jobs
```
GET /api/jobs - Get all active jobs (Public, with filters)
GET /api/jobs/:id - Get single job (Public)
GET /api/jobs/my-jobs - Get recruiter's jobs (Recruiter only)
POST /api/jobs - Create job (Recruiter only)
PUT /api/jobs/:id - Update job (Recruiter only, owner)
DELETE /api/jobs/:id - Delete job (Recruiter only, owner)
PATCH /api/jobs/:id/status - Update job status (Recruiter only, owner)
```

### Applications
```
POST /api/applications - Apply for job (Job Seeker only)
GET /api/applications/my - Get user's applications (Job Seeker only)
GET /api/applications/recruiter - Get all recruiter's applications (Recruiter only)
GET /api/applications/job/:jobId - Get job applications (Recruiter only, owner)
PATCH /api/applications/:id/status - Update application status (Recruiter only)
DELETE /api/applications/:id - Delete application (Protected)
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-job-portal
JWT_SECRET=novexa_job_portal_secret_key_2024
CLIENT_URL=http://localhost:5173
```

4. Seed sample data (optional but recommended):
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## 🧪 Sample Test Credentials

After running `npm run seed` in the backend, use these credentials:

### Job Seekers
- **Email**: rahul@example.com | **Password**: Password123
- **Email**: priya@example.com | **Password**: Password123
- **Email**: amit@example.com | **Password**: Password123
- **Email**: sneha@example.com | **Password**: Password123

### Recruiters
- **Email**: hr@techcorp.com | **Password**: Password123
- **Email**: hr@startuphub.com | **Password**: Password123
- **Email**: recruiter@infosys.com | **Password**: Password123
- **Email**: hr@digitalsolutions.com | **Password**: Password123

## 🧪 Testing the Application

1. **Register as Job Seeker**
   - Go to /register
   - Fill form with role "Job Seeker"
   - Login and browse jobs
   - Apply for a job

2. **Register as Recruiter**
   - Go to /register
   - Fill form with role "Recruiter"
   - Login and go to Dashboard
   - Create a new job
   - View applications

3. **Test Authentication**
   - Logout and try accessing protected routes
   - Should redirect to login

4. **Test Authorization**
   - Login as Job Seeker and try accessing /create-job
   - Should see 403 Access Denied

5. **Test Job Filtering**
   - Go to /jobs
   - Use search and filters
   - Verify results update

## 🔒 Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 30-day expiration
- Protected routes with authentication middleware
- Role-based access control
- CORS configured for specific client URL
- No passwords in API responses
- Environment variables for sensitive data
- Input validation on backend
- Duplicate application prevention
- Owner-only edit/delete for jobs

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint at 768px
- Flexible grid layouts
- Touch-friendly buttons and forms
- Hamburger menu for mobile (navbar)

## 🎨 UI/UX Features

- Clean, professional design
- Color-coded status badges
- Loading states
- Empty states with call-to-action
- Success/error notifications
- Confirmation dialogs for delete operations
- Modal forms for job application
- Smooth transitions and hover effects

## 🔄 Future Improvements

- File upload for resume (currently URL-based)
- Email notifications
- Advanced search with Elasticsearch
- Job recommendations based on skills
- Chat between recruiter and applicant
- Application analytics dashboard
- Social auth (Google, LinkedIn)
- Company profiles
- Job alerts and subscriptions
- Save jobs for later
- Export applications as PDF

## 📄 License

This project is developed for Novexa Technologies.

## 👨‍💻 Author

Developed as part of Full Stack Development Task 12

## 🤝 Contributing

This is a task project. For any issues or suggestions, please contact the development team.

---

**Note**: This is a fully functional application with real backend, database, and authentication. It's not a static UI or mock application.
