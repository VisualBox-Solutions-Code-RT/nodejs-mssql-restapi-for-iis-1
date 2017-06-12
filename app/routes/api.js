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

  require('./resources/projects')(apiRouter);
  require('./resources/releases')(apiRouter);
  require('./resources/milestones')(apiRouter);
  require('./resources/components')(apiRouter);

  return apiRouter;
}
