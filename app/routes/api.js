'use strict';

//BASE SETUP
//===========================
module.exports = (app, express) => {

    // get an instance of the express router
    const apiRouter = express.Router();

    // test route to make sure everything is working
    // accessed at GET your_url/api
    apiRouter.get('/', (req, res) => {
        res.json({message: 'welcome to our api!'});
    });

  const resourceModules = [
    './resources/projects',
    './resources/releases',
    './resources/milestones',
    './resources/components',
    './resources/requests'
  ];

  //load api resources
  resourceModules.forEach((resource) => {
    require(resource)(apiRouter);
  });

  return apiRouter;
}
