//Helper module for querying the DB
//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
const config = require('../../config').DBConfig;
const sql = require("mssql");

module.exports = {

  queryDB: (query, callback, error, operation) => {

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
            if(operation === 'read'){
              callback(result.recordset);
            }

            else if(operation === 'update'){
              callback({rowsAffected: result.rowsAffected});
            }
        }
        sql.close();
      });
    })
  }
}
