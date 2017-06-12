//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
//referencing our config.js
const sqlHelper = require('../sqlHelper');
const jsonHelper = require('../jsonHelper');
const AppConfig = require('../../config').AppConfig;

module.exports = (app, express) => {

    // get an instance of the express router
    const apiRouter = express.Router();



    // test route to make sure everything is working
    // accessed at GET your_url/api
    apiRouter.get('/', (req, res) => {
        res.json({message: 'welcome to our api!'});
    });

  require('./resources/projects')(apiRouter, AppConfig);
  require('./resources/releases')(apiRouter, AppConfig);
  require('./resources/milestones')(apiRouter, AppConfig);
  require('./resources/components')(apiRouter, AppConfig);

  return apiRouter;
}
