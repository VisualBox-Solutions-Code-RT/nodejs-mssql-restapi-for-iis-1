//Helper module for querying the DB
//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
const config = require('../../config').DBConfig;
const sql = require("mssql");

module.exports = {

  queryDB: (query, callback, error) => {

    //to avoid Global connection if there is any
    sql.close();

    sql.connect(config, (err) => {

      if (err) {
        error(err);
        console.log(err);
        sql.close();
        return;
      }

      // create Request object
      let request = new sql.Request();

      // query to the database and get the records
      request.query(query, (err, result) => {

        if (err) {
          error(err);
          console.log(err);

        } else {
          callback(result.recordset);
        }

        sql.close();
      });
    })
  }
}
