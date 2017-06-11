//Helper module for returning generic json response for both success & error
//BASE SETUP
//===========================

module.exports = (res) => {

  return {

    callback: (result) => res.json({requestSuccess: true, result: result}),
    error: (error, message = 'Technical error. Please contact the developer or try again.') => {

      console.log(error);
      res.json({requestSuccess: false, message: message});

    }
  }

}
