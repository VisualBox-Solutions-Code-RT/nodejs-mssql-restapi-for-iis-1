//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
//referencing our config.js
const sqlHelper = require('../sqlHelper');
const jsonHelper = require('../jsonHelper');

module.exports = (app, express) => {

    // get an instance of the express router
    const apiRouter = express.Router();

    // test route to make sure everything is working
    // accessed at GET your_url/api
    apiRouter.get('/', (req, res) => {
        res.json({message: 'welcome to our api!'});
    });

		// FOR PROJECTS
    // routing for your_url/api/projects request
    apiRouter.route('/projects')

      // GET all requests your_url/api/requests
      .get((req, res) => {

        let query = 'select * from brm.dbo.projects';

        //connect to your database & return json response
        sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error);

      });


		// FOR RELEASES
    // routing for your_url/api/releases request
    apiRouter.route('/releases')

    // GET all requests your_url/api/requests
        .get((req, res) => {

          let query = 'select * from brm.dbo.releases';

          // if url has a query parameter
          // e.g. api/releases?projectID=2
          // append to the mssql query
          const projectID = req.query.projectID;

          if(projectID) {
            query += ' where projectID = ' + projectID;
            console.log(query);
          }

          //connect to your database & return json response
          sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error);
        });

    // FOR RELEASES
    // routing for your_url/api/releases request
    apiRouter.route('/releases/:release_id')

    // GET all requests your_url/api/requests
        .get((req, res) => {

          let query = 'select * from brm.dbo.releases where ID = ' + req.params.release_id;

          //connect to your database & return json response
          sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error);
        });

    return apiRouter;
}
