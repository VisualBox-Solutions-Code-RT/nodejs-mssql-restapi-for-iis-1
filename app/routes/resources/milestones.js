const sqlHelper = require(__base + '/app/sqlHelper');
const jsonHelper = require(__base + 'app/jsonHelper');

module.exports = (apiRouter) => {

  // FOR MILESTONES
  // routing for your_url/api/milestones/release_id
  apiRouter.route('/milestones')
    .get((req, res) => {

      // checker for invalid api requests
      if ("undefined" === typeof req.query.releaseID) {

        //set status code to 400 - bad request & send json response
        jsonHelper(res.status(400)).error(new Error('releaseID is not defined in the query ?releaseID = ...'), 'Invalid API Request');
        return;
      }

      let query = `SELECT ID, Title, Status, PlannedFinish, Notes FROM brm.dbo.Milestones WHERE ReleaseID = ${req.query.releaseID}`;

      //connect to your database & return json response
      sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');

    })

    //creating new release milestones
    .post((req, res) => {

    const {title, status, notes, releaseID, plannedFinish} = req.body;

    let query = `INSERT INTO Milestones (Title, Status, Notes, ReleaseID, PlannedFinish)
      VALUES ('${title}', '${status}', '${notes}', ${releaseID}, '${plannedFinish}');`

    //connect to your database & return json response
    sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'post');

    });

  //Update of existing milestones
  apiRouter.route('/milestones/:milestone_id')

    .get((req, res) => {

      let query = `SELECT Title, Status, Notes, ReleaseID, PlannedFinish FROM brm.dbo.Milestones WHERE ID = ${req.params.milestone_id}`;
      //connect to your database & return json response
      sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'read');
    })

    .put((req, res) => {

      const {title, status, notes, releaseID, plannedFinish} = req.body;

      let query = `UPDATE Milestones SET
            Title =  '${title}',
            PlannedFinish = '${plannedFinish}',
            Status = '${status}',
            Notes = '${notes}',
            ReleaseID = ' ${releaseID} '
            WHERE ID = ${req.params.milestone_id}`;

      //connect to your database & return json response
      sqlHelper.queryDB(query, jsonHelper(res).callback, jsonHelper(res).error, 'update');

    });
}
