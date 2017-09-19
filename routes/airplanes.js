var express = require('express');
var router = express.Router();
var Airplane = require('../models/airplane');

/* GET airplanes page. */
router.get('/', function(req, res, next) {
	Airplane.find(function(err, airplane) {
		if(err) res.send(err);
		res.send(airplane)
	})
});

router.get('/:brandName', function(req, res, next) {
	Airplane.find({brandName: req.params.brandName.toLowerCase()}, function(err, airplane) {
		if(err) res.send(err);
		res.send(airplane);
	})
})

module.exports = router;
