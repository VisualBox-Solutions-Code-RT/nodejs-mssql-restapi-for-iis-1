//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
const release = require('../../app/models/release');
const sql = require('mssql');
//referencing our config.js
const config = require('../../config');


module.exports = function(app, express) {

	// get an instance of the express router
	var apiRouter = express.Router();

	// test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res){
		res.json({message:'welcome to our api!'});
	});
	//
	// // on routes that end in /releases/:release_id
	// // ----------------------------------------------------
	// apiRouter.route('/releases/:release_id')
	//
	// 	// get the release with that id
	// 	// (accessed at GET http://localhost:8080/api/releases/:release_id)
	// 	.get(function(req, res){
	// 		release.findById(req.params.release_id, function(err, release){
	//
	// 			if(err) res.send(err);
	//
	// 			//return that release
	// 			res.json(release);
	// 		});
	//
	// 	})
	//
	// 	// update the release with this id
	// 	// (accessed at PUT http://localhost:8080/api/releases/:release_id)
	// 	.put(function(req, res){
	//
	// 		// use our release model to find the release we want
	// 		release.findById(req.params.release_id, function(err, release){
	//
	// 			if(err) res.send(err);
	//
	// 			//update each release's info only if its new
	// 			if(req.body.name) release.name = req.body.name;
	// 			if(req.body.releasename) release.releasename = req.body.releasename;
	// 			if(req.body.password) release.password = req.body.password;
	//
	// 			//save the release
	// 			release.save(function(err){
	// 				if(err) res.send(err);
	//
	// 				//return a message
	// 				res.json({
	// 					success: true,
	// 					message: 'release updated!'
	// 				});
	// 			});
	//
	// 		});
	//
	//
	// 	});

	return apiRouter;

}
