const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = asyncHandler(async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;

  if (!jobId || !resume) {
    res.status(400);
    throw new Error('Job ID and resume are required');
  }

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.status === 'Closed') {
    res.status(400);
    throw new Error('This job is closed');
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: req.user._id
  });

  if (existingApplication) {
    res.status(400);
    throw new Error('You have already applied for this job');
  }

  const application = await Application.create({
    job: jobId,
    applicant: req.user._id,
    recruiter: job.recruiter,
    resume,
    coverLetter: coverLetter || ''
  });

  const populatedApplication = await Application.findById(application._id)
    .populate('job', 'title company location')
    .populate('applicant', 'name email phone');

  res.status(201).json(populatedApplication);
});

const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate('job', 'title company location jobType salary')
    .populate('recruiter', 'name email companyName')
    .sort({ appliedAt: -1 });

  res.json(applications);
});

const getJobApplications = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view applications for this job');
  }

  const applications = await Application.find({ job: req.params.jobId })
    .populate('applicant', 'name email phone location skills resume')
    .populate('job', 'title company')
    .sort({ appliedAt: -1 });

  res.json(applications);
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  if (application.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this application');
  }

  const { status } = req.body;

  if (!['Applied', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  application.status = status;
  const updatedApplication = await application.save();

  const populatedApplication = await Application.findById(updatedApplication._id)
    .populate('applicant', 'name email phone')
    .populate('job', 'title company');

  res.json(populatedApplication);
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  if (application.applicant.toString() !== req.user._id.toString() && 
      application.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this application');
  }

  await Application.deleteOne({ _id: req.params.id });
  res.json({ message: 'Application removed successfully' });
});

const getRecruiterApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ recruiter: req.user._id })
    .populate('applicant', 'name email phone location skills')
    .populate('job', 'title company location')
    .sort({ appliedAt: -1 });

  res.json(applications);
});

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication,
  getRecruiterApplications
};
