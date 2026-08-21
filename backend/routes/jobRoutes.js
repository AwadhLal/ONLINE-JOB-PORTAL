const express = require('express');
const router = express.Router();
const { 
  getAllJobs, 
  getJobById, 
  createJob, 
  updateJob, 
  deleteJob, 
  updateJobStatus,
  getRecruiterJobs 
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', getAllJobs);
router.get('/my-jobs', protect, requireRole('recruiter'), getRecruiterJobs);
router.get('/:id', getJobById);
router.post('/', protect, requireRole('recruiter'), createJob);
router.put('/:id', protect, requireRole('recruiter'), updateJob);
router.delete('/:id', protect, requireRole('recruiter'), deleteJob);
router.patch('/:id/status', protect, requireRole('recruiter'), updateJobStatus);

module.exports = router;
