const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const profileController = require('../controllers/profileController');

router.get('/', authentication.ensureAuthenticated, profileController.viewProfile);

module.exports = router;