const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues');
const { verifyToken, isAdmin } = require('../middlewares/validate');
const upload = require('../middlewares/upload');
const xss = require('xss');

// POST create issue
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    req.body.title = xss(req.body.title);
    req.body.description = xss(req.body.description);
    req.body.location = xss(req.body.location);
    if (req.body.category) req.body.category = xss(req.body.category);

    await issueController.createIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// PATCH update status
router.patch('/:id/status', verifyToken, isAdmin, async (req, res, next) => {
  try {
    if (req.body.newStatus) {
      req.body.newStatus = xss(req.body.newStatus);
    }
    await issueController.updateIssueStatus(req, res);
  } catch (err) {
    next(err);
  }
});

const { upload } = require('../middlewares/upload');
// const { validate } = require('../middlewares/validate');
// PATCH flag issue
router.patch('/:id/flag', verifyToken, isAdmin, async (req, res, next) => {
  try {
    await issueController.flagIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// PATCH archive issue
router.patch('/:id/archive', verifyToken, isAdmin, async (req, res, next) => {
  try {
    await issueController.archiveIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// DELETE issue
router.delete('/:id', verifyToken, isAdmin, async (req, res, next) => {
  try {
    await issueController.deleteIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// GET all issues
router.get('/', issueController.getAllIssues);


module.exports = router;
