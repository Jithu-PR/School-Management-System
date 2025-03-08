const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {addSchool, getSchoolList} = require('../controllers/schoolController')

router.post('/addSchool',addSchool);
router.get('/listSchools', getSchoolList);

module.exports = router;