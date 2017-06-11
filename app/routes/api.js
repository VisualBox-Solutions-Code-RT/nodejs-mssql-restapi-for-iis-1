//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
//referencing our config.js
const sqlHelper = require('../sqlHelper');
const jsonHelper = require('../jsonHelper');
const async =require('async');
const request = require('request');
const AppConfig = require('../../config').AppConfig;

module.exports = (app, express) => {

    // get an instance of the express router
    const apiRouter = express.Router();

    //http://localhost:8081
    const AppUrl = `${ AppConfig.url }:${ AppConfig.port }`;

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

        let query = 'SELECT * FROM brm.dbo.Projects';

        //connect to your database & return json response
        sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');
      });

		// FOR RELEASES
    // routing for your_url/api/releases request
    apiRouter.route('/releases')

    // GET all requests your_url/api/requests
      .get((req, res) => {

        let query = 'SELECT * FROM brm.dbo.Releases';

        // if url has a query parameter
        // e.g. api/releases?projectID=2
        // append to the mssql query
        const projectID = req.query.projectID;

        if(projectID) {
          query += ` WHERE projectID = ${ projectID }`;
        }

        //connect to your database & return json response
        sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');
      });

    // FOR RELEASES
    // routing for your_url/api/releases request
    apiRouter.route('/releases/:release_id')
      .get((req, res) => {

        let releaseId = req.params.release_id;

        // if url has a query parameter
        // e.g. api/releases/1?complete=true
        // append to the mssql query
        // This is to aggregate all Release values in one JSON response
        const isQueryForComplete = req.query.complete;

        if(isQueryForComplete === 'true') {

          async.series([
            function(callback){request.get(`${ AppUrl }/api/releases/${ releaseId }`, callback)},
            function(callback){request.get(`${ AppUrl }/api/components/${ releaseId }`, callback)},
            function(callback){request.get(`${ AppUrl }/api/milestones/${ releaseId }` ,callback)},
            ],

            //callback
            function(err, results){
              if(err) {
                jsonHelper(res).error();
                return;
              }

              let aggregatedData = {
                releaseInfo: JSON.parse(results[0][1]),
                components: JSON.parse(results[1][1]),
                milestones: JSON.parse(results[2][1])
              }

              //return json as response
              jsonHelper(res).callback(aggregatedData);
            }
          )
        }
        else {
          let query = `SELECT * FROM brm.dbo.Releases WHERE ID = ${ releaseId }`;

          //connect to your database & return json response
          sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'read');
        }

      })

      // PUT ENDPOINT
      // FOR UPDATING RELEASE INFO
      .put((req, res) => {

        let releaseId = req.params.release_id;

        const {title, RFCNumber, owner, goLiveDate, status} = req.body;

        let query = `UPDATE Releases SET
            Title =  '${ title }',
            RFCNumber = '${ RFCNumber }',
            Owner = '${ owner }',
            GoLiveDate = '${ goLiveDate }',
            Status = '${ status }'
            WHERE ID = ${ releaseId }`;

        //connect to your database & return json response
        sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'update');

      });

    // FOR MILESTONES
    // routing for your_url/api/milestones/release_id
    apiRouter.route('/milestones/')
      .get((req, res) => {

        // checker for invalid api requests
        if("undefined" === typeof req.query.releaseID){
          res.status(400);
          jsonHelper(res).error(new Error('releaseID is not defined in the query ?releaseID = ...'), 'Invalid API Request');
          return;
        }

        let query = `SELECT ID, Title, Status, PlannedFinish, Notes FROM brm.dbo.Milestones WHERE ReleaseID = ${ req.query.releaseID }`;

        //connect to your database & return json response
        sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'read');
      })

      //creating new release milestones
      .post((req, res) => {

        const {title, status, notes, releaseID, plannedFinish} = req.body;

        let query = `INSERT INTO Milestones (Title, Status, Notes, ReleaseID, PlannedFinish)
        VALUES ('${ title }', '${ status }', '${ notes }', ${ releaseID }, '${ plannedFinish }');`


        //connect to your database & return json response
        sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'post');

      });

    //Update of existing milestones
    apiRouter.route('/milestones/:milestone_id')
      .put((req, res) => {

        const {title, status, notes, releaseID, plannedFinish} = req.body;

        let query = `UPDATE Milestones SET
            Title =  '${ title }',
            PlannedFinish = '${ plannedFinish }',
            Status = '${ status }',
            Notes = '${ notes }',
            ReleaseID = ' ${ releaseID} '
            WHERE ID = ${ req.params.milestone_id }`;

        //connect to your database & return json response
        sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'update');

      });

    // FOR COMPONENTS
    // routing for your_url/api/components/release_id
    apiRouter.route('/components/:release_id')
      .get((req, res) => {

        let query = `SELECT ID, Title, Active FROM brm.dbo.Components WHERE ReleaseID = ${ req.params.release_id}`;

        //connect to your database & return json response
        sqlHelper.queryDB(query,jsonHelper(res).callback, jsonHelper(res).error, 'read');
      });


    return apiRouter;
}
