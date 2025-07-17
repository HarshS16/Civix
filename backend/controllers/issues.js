const Issue = require('../models/issues');
const sendEmail = require('../utils/sendEmail');

const createIssue = async (req, res) => {
  try {
    const { title, description, phone, email, notifyByEmail, category, severity, location } = req.body;

    if (!title || !description || !email) {
      return res.status(400).json({ error: "Title, description, and email are required" });
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const issue = await Issue.create({
      title,
      description,
      phone,
      email,
      notifyByEmail: notifyByEmail === 'true',
      fileUrl,
      category,
      severity,
      location
    });

    return res.status(201).json({ message: 'Issue submitted successfully', issue });
  } catch (err) {
    console.error('Error submitting issue:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    return res.json(issues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch issues.' });
  }
};

const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    issue.status = newStatus;
    if (newStatus === 'Resolved') {
      issue.resolvedAt = new Date();
    } else {
      issue.resolvedAt = undefined; // Clear resolvedAt if status changes from Resolved
    }
    await issue.save();

    if (issue.notifyByEmail && issue.email) {
      await sendEmail(
        issue.email,
        'Civix - Issue Status Update',
        `<p>Your issue <strong>${issue.title}</strong> is now <strong>${newStatus}</strong>.</p>`
      );
    }

    return res.json({ message: 'Status updated successfully.' });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ error: 'Failed to update status.' });
  }
};

const flagIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    issue.status = 'Flagged';
    await issue.save();
    return res.json({ message: 'Issue flagged successfully.' });
  } catch (err) {
    console.error('Error flagging issue:', err);
    return res.status(500).json({ error: 'Failed to flag issue.' });
  }
};

const archiveIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    issue.status = 'Archived';
    await issue.save();
    return res.json({ message: 'Issue archived successfully.' });
  } catch (err) {
    console.error('Error archiving issue:', err);
    return res.status(500).json({ error: 'Failed to archive issue.' });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });

    return res.json({ message: 'Issue deleted successfully.' });
  } catch (err) {
    console.error('Error deleting issue:', err);
    return res.status(500).json({ error: 'Failed to delete issue.' });
  }
};

module.exports = { createIssue, getAllIssues, updateIssueStatus, flagIssue, archiveIssue, deleteIssue };