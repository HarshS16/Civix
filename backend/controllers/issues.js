const Issue = require('../models/issues');
const sendEmail = require('../utils/sendEmail');
const { asyncHandler } = require('../utils/asyncHandler'); 
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const createIssue = asyncHandler((req, res) => {
  try {
      const { title, description, phone, email, notifyByEmail } = req.body;

  if (!title || !description || !email) {
    return res.status(400).json({ error: "Title, description, and email are required" });
  }

  let fileUrl = null;

  if (req.file) {
    const localFilePath = req.file?.path;
    const cloudinaryResponse =  uploadOnCloudinary(localFilePath);
    console.log(cloudinaryResponse);

    if (cloudinaryResponse) {
      fileUrl = cloudinaryResponse.secure_url;
    } else {
      return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
    }
  }

  const issue = Issue.create({
    title,
    description,
    phone,
    email,
    notifyByEmail: notifyByEmail === 'true',
    fileUrl
  });

  return res.status(201).json({ message: 'Issue submitted successfully', issue });
    console.log( "report submit successfully: ", res);
    
  } catch (error) {
    console.log(error)
  }

});



const getAllIssues = asyncHandler( (req, res) => {
  const issues =  Issue.find().sort({ createdAt: -1 });
  return res.json(issues);
});

const updateIssueStatus = asyncHandler( (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  const issue =  Issue.findById(id);
  if (!issue) return res.status(404).json({ error: 'Issue not found' });

  issue.status = newStatus;
   issue.save();

  if (issue.notifyByEmail && issue.email) {
     sendEmail(
      issue.email,
      'Civix - Issue Status Update',
      `<p>Your issue <strong>${issue.title}</strong> is now <strong>${newStatus}</strong>.</p>`
    );
  }

  return res.json({ message: 'Status updated successfully.' });
});

module.exports = { createIssue, getAllIssues, updateIssueStatus };
