'use strict';

const sqlHelper = require(__base + '/app/sqlHelper');
const jsonHelper = require(__base + 'app/jsonHelper');

const requestMiddleware = (resultsArr) => {

  resultsArr.forEach((request) => {
    request.userPhoto = `http://gw.groupworld-stg.emirates.com/profile/User%20Photos/Profile&20Pictures/${request.userId}_LThumb.jpg`;
  });

}

module.exports = (apiRouter) => {

  // FOR PROJECTS
  // routing for your_url/api/projects request
  apiRouter.route('/requests')

  // GET all requests your_url/api/requests
    .get((req, res) => {

    let query = `SELECT
                  ID as requestID,
                  CreatedBy AS userId,
                  CreatedByFullName,
                  Description AS description,
                  Title AS requestTitle,
                  Type AS taskType,
                  CreatedOn AS submittedOn

                  FROM brm.dbo.Requests`;

    //connect to your database & return json response
    sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read', requestMiddleware);
  });
}
