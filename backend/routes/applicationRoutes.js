const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication,
  getRecruiterApplications
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.post('/', protect, requireRole('user'), applyForJob);
router.get('/my', protect, requireRole('user'), getMyApplications);
router.get('/recruiter', protect, requireRole('recruiter'), getRecruiterApplications);
router.get('/job/:jobId', protect, requireRole('recruiter'), getJobApplications);
router.patch('/:id/status', protect, requireRole('recruiter'), updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
