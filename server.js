const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url).then(() => {
    console.log("Succcessfully connected to DB");
}).catch(err => {
    console.log("Could not connect");
    process.exit();
});

app.get('/', (req,res) => {
    res.json({"message": "Welcome to Sample App"});
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, () =>{
    console.log("Server is liseninh to port 3000");
});