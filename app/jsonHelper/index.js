//Helper module for returning generic json response for both success & error
//BASE SETUP
//===========================

module.exports = (res) => {

  return {

    callback: (operation, result) => {

      //successful post will give 201 - resource created
      if (operation === 'post') {
        res.status(201);
      } else {
        res.status(200);
      }
      res.send({requestSuccess: true, result: result})

    },
    error: (error, message = 'Technical error. Please contact the developer or try again.') => {

      console.log(error);

      // if error status is not defined, will give the default of 500 - internal server error.
      if (!res.status) {
        res.status(500);
      }

      res.send({requestSuccess: false, message: message});
    }
  }

}
