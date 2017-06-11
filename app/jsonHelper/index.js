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

      //checker for predefined error status codes
      if(res.statusCode != 400) {
         res.status(500);
      }

      res.send({requestSuccess: false, message: message});

      return;
    }
  }

}
