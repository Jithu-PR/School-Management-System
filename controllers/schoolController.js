const db = require('../config/db');


const addSchool = async (req, res)=> {
    console.log("addSchool");
    
    /*const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting school data', error: err });
        }
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });*/
}

const getSchoolList = async (req, res) => {
    console.log("getSchool");
    
    /*const { userLat, userLng } = req.query;

    if (!userLat || !userLng) {
        return res.status(400).json({ message: 'User latitude and longitude are required.' });
    }

    const query = 'SELECT * FROM schools';
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
    });*/
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = {addSchool, getSchoolList};