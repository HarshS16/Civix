const Issue = require('../models/issues');
const sendEmail = require('../utils/sendEmail');
const { asyncHandler } = require('../utils/asyncHandler'); 
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const createIssue = asyncHandler(async (req, res) => {
  const { title, description, phone, email, notifyByEmail } = req.body;

  if (!title || !description || !email) {
    return res.status(400).json({ error: "Title, description, and email are required" });
  }

  let fileUrl = null;

  if (req.file) {
    const localFilePath = req.file?.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    console.log(cloudinaryResponse);

    if (cloudinaryResponse) {
      fileUrl = cloudinaryResponse.secure_url;
    } else {
      return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
    }
  }

  const issue = await Issue.create({
    title,
    description,
    phone,
    email,
    notifyByEmail: notifyByEmail === 'true',
    fileUrl
  });

  return res.status(201).json({ message: 'Issue submitted successfully', issue });
});

const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  return res.json(issues);
});

const updateIssueStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  const issue = await Issue.findById(id);
  if (!issue) return res.status(404).json({ error: 'Issue not found' });

  issue.status = newStatus;
  await issue.save();

  if (issue.notifyByEmail && issue.email) {
    await sendEmail(
      issue.email,
      'Civix - Issue Status Update',
      `<p>Your issue <strong>${issue.title}</strong> is now <strong>${newStatus}</strong>.</p>`
    );
  }

  return res.json({ message: 'Status updated successfully.' });
});

const getIssueById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Optional: Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid issue ID format' });
  }

  const issue = await Issue.findById(id);

  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  return res.json(issue);
});

const deleteIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid issue ID format" });
  }

  const issue = await Issue.findByIdAndDelete(id);

  if (!issue) {
    return res.status(404).json({ error: "Issue not found" });
  }

  return res.json({ message: "Issue deleted successfully", issue });
});


module.exports = { createIssue, getAllIssues, updateIssueStatus,getIssueById,deleteIssue };
