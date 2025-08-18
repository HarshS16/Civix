const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issues");
const { verifyToken, isAdmin } = require("../middlewares/validate");
const { upload } = require("../middlewares/multer.middleware");


router.post("/", upload.single("file"), issueController.createIssue);


router.patch("/:id/status", verifyToken, isAdmin, issueController.updateIssueStatus);

// GET: All issues
router.get("/", issueController.getAllIssues);
router.get("/:id",issueController.getIssueById)
router.delete("/issues/:id",verifyToken,isAdmin,issueController. deleteIssue);

module.exports = router;
