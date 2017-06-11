//Helper module for returning generic json response for both success & error
//BASE SETUP
//===========================

module.exports = (res) => {

  return {

    callback: (result) => res.json({requestSuccess: true, result: result}),
    error: (error) => res.json({requestSuccess: false, message: 'Technical error - please contact developer or try again later.'})
  }

}
