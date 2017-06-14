'use strict';

if(process.env.NODE_ENV === 'production'){

	module.exports = {

    AppConfig: {
      url: process.env.HOST,
      port: process.env.PORT
    },

    DBConfig: {
      user: process.env.dbUser,
      password: process.env.dbPassword,
      server: process.env.dbServer,
      database: process.env.dbName
    }

	}
} else {
	//offer dev stage settings and data
	module.exports = require('./dev.json');
}
