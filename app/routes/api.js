//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
const release = require('../../app/models/release');
//referencing our config.js
const config = require('../../config');
const sql = require("mssql");

module.exports = function(app, express) {

    // get an instance of the express router
    const apiRouter = express.Router();

    // test route to make sure everything is working
    // accessed at GET your_url/api
    apiRouter.get('/', function(req, res) {
        res.json({message: 'welcome to our api!'});
    });

		// FOR PROJECTS
    // routing for your_url/api/projects request
    apiRouter.route('/projects')

    // GET all requests your_url/api/requests
        .get((req, res) => {
        // connect to your database
        sql.connect(config, function(err) {

						if (err) console.log(err);

            // create Request object
            let request = new sql.Request();

						let query = 'select * from brm.dbo.projects';

            // query to the database and get the records
            request.query(query, function(err, recordset) {

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

		// FOR RELEASES
    // routing for your_url/api/releases request
    apiRouter.route('/releases')

    // GET all requests your_url/api/requests
        .get((req, res) => {
        // connect to your database
        sql.connect(config, function(err) {

						if (err) console.log(err);

            // create Request object
            let request = new sql.Request();

						// if url has a query parameter
						// e.g. api/releases?projectID=2
						// append to the mssql query
						const projectID = req.query.projectID;

						let query = 'select * from brm.dbo.releases';

						if(projectID) {
							query += ' where projectID = ' + projectID;
							console.log(query);
						}

            // query to the database and get the records
            request.query(query, function(err, recordset) {

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
