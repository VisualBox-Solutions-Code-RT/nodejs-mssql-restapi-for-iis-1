//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
const release = require('../../app/models/release');
//referencing our config.js
const config = require('../../config');
const sql = require("mssql");

module.exports = function(app, express) {

	// get an instance of the express router
	var apiRouter = express.Router();

	// test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res){
		res.json({message:'welcome to our api!'});
	});

	//routing for /api/releases request
	apiRouter.route('/releases')

		//get all requests
		// url/requests
		.get((req, res) => {

			// connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from brm.dbo.releases', function (err, recordset) {

            if (err) {
							console.log(err);
							sql.close();
						}

            // send records as a response
            res.json(recordset);
						sql.close();

        });
    });


	});

	return apiRouter;

}
