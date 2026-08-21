const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String,
    required: [true, 'Resume is required']
  },
  coverLetter: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Applied', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'Applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
