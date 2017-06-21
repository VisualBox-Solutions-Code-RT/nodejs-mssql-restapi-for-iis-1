'use strict';

const sqlHelper = require(__base + '/app/sqlHelper');
const jsonHelper = require(__base + 'app/jsonHelper');

module.exports = (apiRouter) => {

  // FOR PROJECTS
  // routing for your_url/api/projects request
  apiRouter.route('/requests')

  // GET all requests your_url/api/requests
    .get((req, res) => {

    let query = 'SELECT * FROM brm.dbo.Requests';

    //connect to your database & return json response
    sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');
  });
}
