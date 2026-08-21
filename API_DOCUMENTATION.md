# API Documentation - Online Job Portal

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Routes

### 1. Register User

**POST** `/auth/register`

Creates a new user account (Job Seeker or Recruiter).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "user"
}
```

**Response:** `201 Created`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation:**
- All fields required
- Role must be "user" or "recruiter"
- Email must be unique
- Password minimum 6 characters

**Error Responses:**
- `400` - Missing fields, invalid role, or user already exists
- `500` - Server error

---

### 2. Login User

**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "profileImage": "",
  "phone": "",
  "location": "",
  "bio": "",
  "skills": [],
  "resume": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

---

### 3. Get Profile

**GET** `/auth/profile`

Returns the authenticated user's profile.

**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "profileImage": "",
  "phone": "9876543210",
  "location": "Delhi",
  "bio": "Full Stack Developer",
  "skills": ["React", "Node.js"],
  "resume": "https://example.com/resume.pdf",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - No token or invalid token
- `404` - User not found
- `500` - Server error

---

## User Routes

### 4. Update Profile

**PUT** `/users/profile`

Updates the authenticated user's profile.

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "9876543210",
  "location": "Mumbai",
  "bio": "Senior Full Stack Developer",
  "profileImage": "https://example.com/profile.jpg",
  "skills": ["React", "Node.js", "MongoDB"],
  "resume": "https://example.com/resume.pdf",
  "companyName": "Tech Corp",
  "companyWebsite": "https://techcorp.com"
}
```

**Note:** 
- `resume` is only for Job Seekers (role: "user")
- `companyName` and `companyWebsite` are only for Recruiters (role: "recruiter")

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe Updated",
  "email": "john@example.com",
  "role": "user",
  "profileImage": "https://example.com/profile.jpg",
  "phone": "9876543210",
  "location": "Mumbai",
  "bio": "Senior Full Stack Developer",
  "skills": ["React", "Node.js", "MongoDB"],
  "resume": "https://example.com/resume.pdf"
}
```

**Error Responses:**
- `401` - No token or invalid token
- `404` - User not found
- `500` - Server error

---

## Job Routes

### 5. Get All Jobs

**GET** `/jobs`

Returns all active jobs with optional filtering.

**Auth Required:** No

**Query Parameters:**
- `search` - Search in title and description
- `company` - Filter by company name
- `location` - Filter by location
- `category` - Filter by category
- `jobType` - Filter by job type (Full Time, Part Time, Internship, Contract, Remote)
- `experience` - Filter by experience

**Example:** `/jobs?location=Mohali&jobType=Full Time`

**Response:** `200 OK`
```json
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "title": "Frontend Developer",
    "description": "Build modern React applications",
    "company": "Tech Corp",
    "location": "Mohali",
    "jobType": "Full Time",
    "salary": "5-8 LPA",
    "experience": "0-2 Years",
    "skills": ["React", "JavaScript", "CSS"],
    "category": "Software Development",
    "recruiter": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "Tech Corp HR",
      "email": "hr@techcorp.com",
      "companyName": "Tech Corp"
    },
    "status": "Active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `500` - Server error

---

### 6. Get Job By ID

**GET** `/jobs/:id`

Returns a single job by ID.

**Auth Required:** No

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
  "title": "Frontend Developer",
  "description": "Build modern React applications...",
  "company": "Tech Corp",
  "location": "Mohali",
  "jobType": "Full Time",
  "salary": "5-8 LPA",
  "experience": "0-2 Years",
  "skills": ["React", "JavaScript", "CSS"],
  "category": "Software Development",
  "recruiter": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "Tech Corp HR",
    "email": "hr@techcorp.com",
    "phone": "9876540001",
    "companyName": "Tech Corp",
    "companyWebsite": "https://techcorp.com"
  },
  "status": "Active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Job not found
- `500` - Server error

---

### 7. Get Recruiter's Jobs

**GET** `/jobs/my-jobs`

Returns all jobs created by the authenticated recruiter.

**Auth Required:** Yes (Recruiter only)

**Response:** `200 OK`
```json
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "location": "Mohali",
    "jobType": "Full Time",
    "status": "Active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not a recruiter
- `500` - Server error

---

### 8. Create Job

**POST** `/jobs`

Creates a new job posting.

**Auth Required:** Yes (Recruiter only)

**Request Body:**
```json
{
  "title": "Frontend Developer",
  "description": "We are looking for a skilled Frontend Developer...",
  "company": "Tech Corp",
  "location": "Mohali",
  "jobType": "Full Time",
  "salary": "5-8 LPA",
  "experience": "0-2 Years",
  "skills": ["React", "JavaScript", "CSS"],
  "category": "Software Development"
}
```

**Response:** `201 Created`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
  "title": "Frontend Developer",
  "description": "We are looking for a skilled Frontend Developer...",
  "company": "Tech Corp",
  "location": "Mohali",
  "jobType": "Full Time",
  "salary": "5-8 LPA",
  "experience": "0-2 Years",
  "skills": ["React", "JavaScript", "CSS"],
  "category": "Software Development",
  "recruiter": "64f5a1b2c3d4e5f6a7b8c9d0",
  "status": "Active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400` - Missing required fields
- `401` - No token or invalid token
- `403` - Not a recruiter
- `500` - Server error

---

### 9. Update Job

**PUT** `/jobs/:id`

Updates an existing job. Only the job owner can update.

**Auth Required:** Yes (Recruiter only, owner)

**Request Body:**
```json
{
  "title": "Senior Frontend Developer",
  "salary": "8-12 LPA",
  "experience": "2-4 Years"
}
```

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
  "title": "Senior Frontend Developer",
  "salary": "8-12 LPA",
  "experience": "2-4 Years",
  ...
}
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not authorized to update this job
- `404` - Job not found
- `500` - Server error

---

### 10. Delete Job

**DELETE** `/jobs/:id`

Deletes a job. Only the job owner can delete.

**Auth Required:** Yes (Recruiter only, owner)

**Response:** `200 OK`
```json
{
  "message": "Job removed successfully"
}
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not authorized to delete this job
- `404` - Job not found
- `500` - Server error

---

### 11. Update Job Status

**PATCH** `/jobs/:id/status`

Updates job status (Active/Closed). Only the job owner can update.

**Auth Required:** Yes (Recruiter only, owner)

**Request Body:**
```json
{
  "status": "Closed"
}
```

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
  "status": "Closed",
  ...
}
```

**Error Responses:**
- `400` - Invalid status
- `401` - No token or invalid token
- `403` - Not authorized to update this job
- `404` - Job not found
- `500` - Server error

---

## Application Routes

### 12. Apply for Job

**POST** `/applications`

Submit a job application.

**Auth Required:** Yes (Job Seeker only)

**Request Body:**
```json
{
  "jobId": "64f5a1b2c3d4e5f6a7b8c9d1",
  "resume": "https://example.com/resume.pdf",
  "coverLetter": "I am interested in this position..."
}
```

**Response:** `201 Created`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d2",
  "job": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "location": "Mohali"
  },
  "applicant": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "recruiter": "64f5a1b2c3d4e5f6a7b8c9d3",
  "resume": "https://example.com/resume.pdf",
  "coverLetter": "I am interested in this position...",
  "status": "Applied",
  "appliedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400` - Missing fields, job closed, or already applied
- `401` - No token or invalid token
- `403` - Not a job seeker
- `404` - Job not found
- `500` - Server error

---

### 13. Get My Applications

**GET** `/applications/my`

Returns all applications submitted by the authenticated job seeker.

**Auth Required:** Yes (Job Seeker only)

**Response:** `200 OK`
```json
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d2",
    "job": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
      "title": "Frontend Developer",
      "company": "Tech Corp",
      "location": "Mohali",
      "jobType": "Full Time",
      "salary": "5-8 LPA"
    },
    "recruiter": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d3",
      "name": "Tech Corp HR",
      "email": "hr@techcorp.com",
      "companyName": "Tech Corp"
    },
    "resume": "https://example.com/resume.pdf",
    "coverLetter": "I am interested...",
    "status": "Reviewing",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not a job seeker
- `500` - Server error

---

### 14. Get All Recruiter Applications

**GET** `/applications/recruiter`

Returns all applications for jobs posted by the authenticated recruiter.

**Auth Required:** Yes (Recruiter only)

**Response:** `200 OK`
```json
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d2",
    "applicant": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "location": "Delhi",
      "skills": ["React", "Node.js"]
    },
    "job": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
      "title": "Frontend Developer",
      "company": "Tech Corp",
      "location": "Mohali"
    },
    "resume": "https://example.com/resume.pdf",
    "coverLetter": "I am interested...",
    "status": "Applied",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not a recruiter
- `500` - Server error

---

### 15. Get Job Applications

**GET** `/applications/job/:jobId`

Returns all applications for a specific job. Only the job owner can view.

**Auth Required:** Yes (Recruiter only, owner)

**Response:** `200 OK`
```json
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d2",
    "applicant": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "location": "Delhi",
      "skills": ["React", "Node.js"],
      "resume": "https://example.com/resume.pdf"
    },
    "job": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
      "title": "Frontend Developer",
      "company": "Tech Corp"
    },
    "resume": "https://example.com/resume.pdf",
    "coverLetter": "I am interested...",
    "status": "Applied",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not authorized to view applications for this job
- `404` - Job not found
- `500` - Server error

---

### 16. Update Application Status

**PATCH** `/applications/:id/status`

Updates the status of an application. Only the recruiter who owns the job can update.

**Auth Required:** Yes (Recruiter only)

**Request Body:**
```json
{
  "status": "Shortlisted"
}
```

**Valid Status Values:**
- Applied
- Reviewing
- Shortlisted
- Rejected
- Hired

**Response:** `200 OK`
```json
{
  "_id": "64f5a1b2c3d4e5f6a7b8c9d2",
  "applicant": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "job": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "title": "Frontend Developer",
    "company": "Tech Corp"
  },
  "status": "Shortlisted",
  ...
}
```

**Error Responses:**
- `400` - Invalid status
- `401` - No token or invalid token
- `403` - Not authorized to update this application
- `404` - Application not found
- `500` - Server error

---

### 17. Delete Application

**DELETE** `/applications/:id`

Deletes an application. Only the applicant or recruiter can delete.

**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "message": "Application removed successfully"
}
```

**Error Responses:**
- `401` - No token or invalid token
- `403` - Not authorized to delete this application
- `404` - Application not found
- `500` - Server error

---

## Status Codes

- **200** - OK (Success)
- **201** - Created (Resource created successfully)
- **400** - Bad Request (Invalid input)
- **401** - Unauthorized (No token or invalid token)
- **403** - Forbidden (Insufficient permissions)
- **404** - Not Found (Resource not found)
- **500** - Internal Server Error

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "stack": "Error stack trace (only in development)"
}
```
