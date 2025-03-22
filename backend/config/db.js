const mongoose = require('mongoose');
require('dotenv').config();  // Ensure this is at the top to load environment variables

function connectToDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('MongoDB URI is not defined in the .env file');
        return;
    }

    mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });
}

module.exports = connectToDB;
