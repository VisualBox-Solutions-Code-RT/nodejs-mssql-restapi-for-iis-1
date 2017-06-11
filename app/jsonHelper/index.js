//Helper module for returning generic json response for both success & error
//BASE SETUP
//===========================

module.exports = (res) => {

  return {

    callback: (result) => res.status(200).send({requestSuccess: true, result: result}),
    error: (error, message = 'Technical error. Please contact the developer or try again.') => {

      console.log(error);

      if (!res.status) {
        res.status(500);
      }

      res.send({requestSuccess: false, message: message});
    }
  }

}
