const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database connected!");
        
    })
});
