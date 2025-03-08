const db = require('../config/db');
const { calculateDistance } = require('../utils/distanceCalculator');


const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const checkQuery = 'SELECT * FROM school_info WHERE name = ? AND address = ?';
    db.query(checkQuery, [name, address], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error checking existing school data', error: err });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'This school already exists.' });
        }

        const insertQuery = 'INSERT INTO school_info (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [name, address, latitude, longitude], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting school data', error: err });
            }
            res.status(201).json({ message: 'School added successfully', id: result.insertId });
        });
    });
};


const getSchoolList = async (req, res) => {
    
    const { userLat, userLng } = req.query;

    if (!userLat || !userLng) {
        return res.status(400).json({ message: 'User latitude and longitude are required.' });
    }

    const query = 'SELECT * FROM school_info';
    db.query(query, (err, schools) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching school data', error: err });
        }

        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school, distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
}

module.exports = {addSchool, getSchoolList};