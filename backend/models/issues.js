const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  phone:String,
  email: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending'
  },
  category: {
    type: String,
    enum: ['Infrastructure', 'Public Safety', 'Environment', 'Transportation', 'Other'],
    default: 'Other'
  },
  resolvedAt: {
    type: Date,
    required: false,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  },
  location: {
    type: String,
    required: false
  },
  notifyByEmail: {
    type: Boolean,
    default: false, // Default to false if not specified
  },
});

module.exports = mongoose.model('Issue', issueSchema);
