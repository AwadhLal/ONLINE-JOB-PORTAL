const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full Time', 'Part Time', 'Internship', 'Contract', 'Remote']
  },
  salary: {
    type: String,
    required: [true, 'Salary is required']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required']
  },
  skills: [{
    type: String
  }],
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Closed'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
