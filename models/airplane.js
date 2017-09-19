var mongoose = require('mongoose');
var AirplaneSchema = new mongoose.Schema({
	brandName: String,
	aircraftType: String,
	picture: String,
	maximumSpeed: String,
	klmFleet: Number
});

// the first parameter the name of the collection and add automitically a 's'
// Second parameter is the schema being passed
// The thirth parameter is to force the name of the collection
module.exports = mongoose.model('airplane', AirplaneSchema, 'airplane');