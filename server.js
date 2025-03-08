const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/db');
const schoolRoutes = require('./routes/schoolRoute')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', schoolRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database connected!");
        
    })
});
