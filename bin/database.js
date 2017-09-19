// load mongoose package
var mongoose = require('mongoose');
// Replace the native Promise with bluebird
mongoose.Promise = require('bluebird');
// set default settings for the connectivity
options = {
	useMongoClient: true
};
// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/xcalibur', options)
.then(() => console.log(' connection succesful'))
.catch((err) => console.error (err));

module.exports = mongoose;