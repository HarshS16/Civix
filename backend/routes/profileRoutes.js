const express = require('express');
const router = express.Router();
const { getUserByEmail, updateUserByEmail } = require('../controllers/profileControllers.js');

router.get('/:email', getUserByEmail);
router.put('/:email', updateUserByEmail);

module.exports = router;
