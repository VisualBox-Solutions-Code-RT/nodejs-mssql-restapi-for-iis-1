const sqlHelper = require(__base + '/app/sqlHelper');
const jsonHelper = require(__base + 'app/jsonHelper');

module.exports = (apiRouter) => {

  // FOR COMPONENTS
  //routing for your_url/api/components?releaseID=release_id
  apiRouter.route('/components')
    .get((req, res) => {

      // checker for invalid api requests
      if ("undefined" === typeof req.query.releaseID) {

        //set status code to 400 - bad request & send json response
        jsonHelper(res.status(400)).error(new Error('releaseID is not defined in the query ?releaseID = ...'), 'Invalid API Request');
        return;
      }

      let query = `SELECT ID, Title, Active FROM brm.dbo.Components WHERE ReleaseID = ${req.query.releaseID}`;

      //connect to your database & return json response
      sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');

    })

  // routing for your_url/api/components/component_id
  apiRouter.route('/components/:component_id')

    .get((req, res) => {

      let query = `SELECT Title, Active, ReleaseID FROM brm.dbo.Components WHERE ID = ${req.params.component_id}`;
      //connect to your database & return json response
      sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');

    });

}
