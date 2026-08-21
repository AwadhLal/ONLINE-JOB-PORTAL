const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');

const getAllJobs = asyncHandler(async (req, res) => {
  const { search, company, location, category, jobType, experience } = req.query;

  let query = { status: 'Active' };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (company) {
    query.company = { $regex: company, $options: 'i' };
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  if (jobType) {
    query.jobType = jobType;
  }

  if (experience) {
    query.experience = { $regex: experience, $options: 'i' };
  }

  const jobs = await Job.find(query)
    .populate('recruiter', 'name email companyName')
    .sort({ createdAt: -1 });

  res.json(jobs);
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('recruiter', 'name email phone companyName companyWebsite');

  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

const createJob = asyncHandler(async (req, res) => {
  const { title, description, company, location, jobType, salary, experience, skills, category } = req.body;

  if (!title || !description || !company || !location || !jobType || !salary || !experience || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const job = await Job.create({
    title,
    description,
    company,
    location,
    jobType,
    salary,
    experience,
    skills: skills || [],
    category,
    recruiter: req.user._id
  });

  res.status(201).json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this job');
  }

  const { title, description, company, location, jobType, salary, experience, skills, category } = req.body;

  job.title = title || job.title;
  job.description = description || job.description;
  job.company = company || job.company;
  job.location = location || job.location;
  job.jobType = jobType || job.jobType;
  job.salary = salary || job.salary;
  job.experience = experience || job.experience;
  job.skills = skills !== undefined ? skills : job.skills;
  job.category = category || job.category;

  const updatedJob = await job.save();
  res.json(updatedJob);
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this job');
  }

  await Job.deleteOne({ _id: req.params.id });
  res.json({ message: 'Job removed successfully' });
});

const updateJobStatus = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.recruiter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this job');
  }

  const { status } = req.body;

  if (!['Active', 'Closed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  job.status = status;
  const updatedJob = await job.save();
  res.json(updatedJob);
});

const getRecruiterJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
});

module.exports = { 
  getAllJobs, 
  getJobById, 
  createJob, 
  updateJob, 
  deleteJob, 
  updateJobStatus,
  getRecruiterJobs 
};
