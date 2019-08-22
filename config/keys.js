dbConnection = 'mongodb://localhost:27017/hyphen';
module.exports = {
    mongoURI: dbConnection,
    PORT: process.env.PORT || 5000
}